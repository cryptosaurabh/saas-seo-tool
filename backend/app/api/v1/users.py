from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update

from app.database.session import get_db
from app.auth.deps import get_current_user, get_current_tenant_org
from app.auth.security import generate_api_key_secret, get_password_hash, verify_password
from app.models.user import User
from app.models.organization import Organization
from app.models.rbac import TeamMember, Role
from app.models.notification import APIKey
from app.schemas.billing import APIKeyCreateRequest, TeamMemberInviteRequest
from app.utils.response import success_response, error_response

router = APIRouter(prefix="/users", tags=["Users & Settings"])

@router.get("/me")
async def get_me(
    current_user: User = Depends(get_current_user),
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    # Fetch role in current org
    res = await db.execute(
        select(Role)
        .join(TeamMember, TeamMember.role_id == Role.id)
        .where(TeamMember.organization_id == current_org.id, TeamMember.user_id == current_user.id)
    )
    role = res.scalar_one_or_none()

    return success_response(data={
        "id": str(current_user.id),
        "email": current_user.email,
        "full_name": current_user.full_name,
        "avatar_url": current_user.avatar_url,
        "is_verified": current_user.is_verified,
        "is_superadmin": current_user.is_superadmin,
        "active_organization": {
            "id": str(current_org.id),
            "name": current_org.name,
            "slug": current_org.slug,
            "plan_tier": current_org.plan_tier,
            "role": role.name if role else "Member"
        }
    })

@router.put("/me")
async def update_profile(
    full_name: Optional[str] = None,
    avatar_url: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if full_name:
        current_user.full_name = full_name
    if avatar_url:
        current_user.avatar_url = avatar_url

    await db.commit()
    return success_response(message="Profile updated successfully")

@router.get("/team")
async def list_team_members(
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(TeamMember, User, Role)
        .join(User, TeamMember.user_id == User.id)
        .join(Role, TeamMember.role_id == Role.id)
        .where(TeamMember.organization_id == current_org.id)
    )
    members = []
    for tm, u, r in result.all():
        members.append({
            "id": str(tm.id),
            "user_id": str(u.id),
            "full_name": u.full_name,
            "email": u.email,
            "role_name": r.name,
            "avatar_url": u.avatar_url,
            "status": tm.status,
            "created_at": tm.created_at.isoformat()
        })
    return success_response(data=members)

@router.post("/team/invite")
async def invite_team_member(
    payload: TeamMemberInviteRequest,
    current_user: User = Depends(get_current_user),
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    # Check if target user exists or create placeholder
    res = await db.execute(select(User).where(User.email == payload.email))
    target_user = res.scalar_one_or_none()

    if not target_user:
        target_user = User(
            email=payload.email,
            full_name=payload.email.split('@')[0].capitalize(),
            is_verified=False
        )
        db.add(target_user)
        await db.flush()

    role_res = await db.execute(select(Role).where(Role.name == payload.role_name))
    role = role_res.scalar_one_or_none()
    if not role:
        return error_response(message=f"Invalid role: {payload.role_name}", status_code=400)

    # Add team membership
    tm = TeamMember(
        organization_id=current_org.id,
        user_id=target_user.id,
        role_id=role.id,
        invited_by_id=current_user.id
    )
    db.add(tm)
    await db.commit()

    return success_response(message=f"Invitation sent to {payload.email}", status_code=201)

@router.get("/api-keys")
async def list_api_keys(
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(APIKey).where(APIKey.organization_id == current_org.id))
    keys = res.scalars().all()
    return success_response(data=[{
        "id": str(k.id),
        "name": k.name,
        "key_prefix": k.key_prefix,
        "scopes": k.scopes,
        "created_at": k.created_at.isoformat(),
        "last_used_at": k.last_used_at.isoformat() if k.last_used_at else None
    } for k in keys])

@router.post("/api-keys")
async def create_api_key(
    payload: APIKeyCreateRequest,
    current_user: User = Depends(get_current_user),
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    raw_key, prefix, hashed_key = generate_api_key_secret()
    key_obj = APIKey(
        organization_id=current_org.id,
        user_id=current_user.id,
        name=payload.name,
        key_prefix=prefix,
        key_hash=hashed_key,
        scopes=payload.scopes
    )
    db.add(key_obj)
    await db.commit()

    return success_response(data={
        "id": str(key_obj.id),
        "name": key_obj.name,
        "key_prefix": prefix,
        "secret_key": raw_key, # Returned ONLY once
        "created_at": key_obj.created_at.isoformat()
    }, message="API Key created successfully", status_code=201)
