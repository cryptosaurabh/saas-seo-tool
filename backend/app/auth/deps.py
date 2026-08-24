from typing import Optional, List
import uuid
from fastapi import Depends, HTTPException, status, Header, Request
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database.session import get_db
from app.auth.security import decode_token
from app.models.user import User
from app.models.organization import Organization
from app.models.rbac import TeamMember, Role, Permission, role_permissions

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl="/api/v1/auth/login"
)

async def get_current_user(
    db: AsyncSession = Depends(get_db),
    token: str = Depends(reusable_oauth2)
) -> User:
    payload = decode_token(token)
    if not payload or payload.get("type") != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")

    result = await db.execute(select(User).where(User.id == uuid.UUID(user_id), User.status == "active"))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found or account inactive")
    return user

async def get_current_tenant_org(
    x_organization_id: Optional[str] = Header(None, alias="X-Organization-ID"),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> Organization:
    """Enforces multi-tenant organization context and verifies access"""
    if not x_organization_id:
        # Fallback to user's first owned or joined organization
        result = await db.execute(
            select(Organization)
            .join(TeamMember, TeamMember.organization_id == Organization.id)
            .where(TeamMember.user_id == current_user.id)
            .limit(1)
        )
        org = result.scalar_one_or_none()
        if not org:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No active organization context found. Header X-Organization-ID required.")
        return org

    try:
        org_uuid = uuid.UUID(x_organization_id)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Organization ID format")

    # Verify user belongs to org or is Super Admin
    if current_user.is_superadmin:
        result = await db.execute(select(Organization).where(Organization.id == org_uuid))
        org = result.scalar_one_or_none()
    else:
        result = await db.execute(
            select(Organization)
            .join(TeamMember, TeamMember.organization_id == Organization.id)
            .where(Organization.id == org_uuid, TeamMember.user_id == current_user.id)
        )
        org = result.scalar_one_or_none()

    if not org:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied to requested organization tenant")

    return org

class PermissionChecker:
    """RBAC Permission Dependency Evaluator"""
    def __init__(self, required_permissions: List[str]):
        self.required_permissions = required_permissions

    async def __call__(
        self,
        current_user: User = Depends(get_current_user),
        current_org: Organization = Depends(get_current_tenant_org),
        db: AsyncSession = Depends(get_db)
    ) -> bool:
        if current_user.is_superadmin:
            return True

        # Check user role in organization
        result = await db.execute(
            select(Role)
            .join(TeamMember, TeamMember.role_id == Role.id)
            .where(TeamMember.organization_id == current_org.id, TeamMember.user_id == current_user.id)
        )
        role = result.scalar_one_or_none()
        if not role:
            raise HTTPException(status_code=403, detail="No assigned role in current organization")

        if role.name in ["Super Admin", "Agency Owner"]:
            return True

        # Fetch permissions assigned to role
        perm_result = await db.execute(
            select(Permission.code)
            .join(role_permissions, role_permissions.c.permission_id == Permission.id)
            .where(role_permissions.c.role_id == role.id)
        )
        user_perms = [p for p in perm_result.scalars().all()]

        for req in self.required_permissions:
            if req not in user_perms:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Permission denied: Missing required permission '{req}'"
                )
        return True
