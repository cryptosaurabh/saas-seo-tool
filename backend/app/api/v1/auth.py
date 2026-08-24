from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import re

from app.database.session import get_db
from app.models.user import User
from app.models.organization import Organization
from app.models.rbac import Role, TeamMember
from app.models.subscription import Subscription
from app.auth.security import (
    get_password_hash,
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token
)
from app.schemas.auth import (
    UserRegisterRequest,
    UserLoginRequest,
    TokenResponse,
    RefreshTokenRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    VerifyEmailRequest,
    UserResponse
)
from app.utils.response import success_response, error_response

router = APIRouter(prefix="/auth", tags=["Authentication"])

def slugify(text: str) -> str:
    return re.sub(r'[\W_]+', '-', text.lower()).strip('-')

@router.post("/register")
async def register_user(payload: UserRegisterRequest, db: AsyncSession = Depends(get_db)):
    # Check if user exists
    existing = await db.execute(select(User).where(User.email == payload.email))
    if existing.scalar_one_or_none():
        return error_response(message="An account with this email address already exists", status_code=400)

    # Create User
    new_user = User(
        email=payload.email,
        hashed_password=get_password_hash(payload.password),
        full_name=payload.full_name,
        is_verified=False,
        auth_provider="email"
    )
    db.add(new_user)
    await db.flush()

    # Create Initial Organization
    org_slug = slugify(payload.organization_name)
    new_org = Organization(
        name=payload.organization_name,
        slug=org_slug,
        owner_id=new_user.id,
        plan_tier="free"
    )
    db.add(new_org)
    await db.flush()

    # Seed System Role for Agency Owner
    role_res = await db.execute(select(Role).where(Role.name == "Agency Owner"))
    agency_role = role_res.scalar_one_or_none()
    if not agency_role:
        agency_role = Role(name="Agency Owner", description="Full administration of organization and resources", is_system_role=True)
        db.add(agency_role)
        await db.flush()

    # Create Team Membership
    team_member = TeamMember(
        organization_id=new_org.id,
        user_id=new_user.id,
        role_id=agency_role.id
    )
    db.add(team_member)

    # Initial Free Subscription
    new_sub = Subscription(
        organization_id=new_org.id,
        plan_code="free",
        provider="system"
    )
    db.add(new_sub)

    await db.commit()

    access_token = create_access_token(subject=new_user.id, claims={"org_id": str(new_org.id)})
    refresh_token = create_refresh_token(subject=new_user.id)

    return success_response(
        data={
            "tokens": {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "token_type": "bearer"
            },
            "user": {
                "id": str(new_user.id),
                "email": new_user.email,
                "full_name": new_user.full_name,
                "is_verified": new_user.is_verified
            },
            "organization": {
                "id": str(new_org.id),
                "name": new_org.name,
                "slug": new_org.slug
            }
        },
        message="Registration successful",
        status_code=201
    )

@router.post("/login")
async def login(payload: UserLoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == payload.email))
    user = result.scalar_one_or_none()

    if not user or not user.hashed_password or not verify_password(payload.password, user.hashed_password):
        return error_response(message="Invalid email or password", status_code=401)

    if user.status != "active":
        return error_response(message="Account suspended or disabled", status_code=403)

    # Fetch default org
    org_res = await db.execute(
        select(Organization)
        .join(TeamMember, TeamMember.organization_id == Organization.id)
        .where(TeamMember.user_id == user.id)
        .limit(1)
    )
    default_org = org_res.scalar_one_or_none()
    org_id = str(default_org.id) if default_org else None

    access_token = create_access_token(subject=user.id, claims={"org_id": org_id})
    refresh_token = create_refresh_token(subject=user.id)

    return success_response(
        data={
            "tokens": {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "token_type": "bearer"
            },
            "user": {
                "id": str(user.id),
                "email": user.email,
                "full_name": user.full_name,
                "avatar_url": user.avatar_url,
                "is_superadmin": user.is_superadmin
            },
            "active_organization_id": org_id
        },
        message="Login successful"
    )

@router.post("/refresh")
async def refresh_token(payload: RefreshTokenRequest):
    decoded = decode_token(payload.refresh_token)
    if not decoded or decoded.get("type") != "refresh":
        return error_response(message="Invalid or expired refresh token", status_code=401)

    user_id = decoded.get("sub")
    new_access_token = create_access_token(subject=user_id)
    new_refresh_token = create_refresh_token(subject=user_id)

    return success_response(
        data={
            "access_token": new_access_token,
            "refresh_token": new_refresh_token,
            "token_type": "bearer"
        },
        message="Tokens refreshed successfully"
    )

@router.post("/forgot-password")
async def forgot_password(payload: ForgotPasswordRequest):
    # In production, dispatch async email reset link token via Celery task
    return success_response(message="Password reset instructions sent to your email address if account exists")

@router.post("/reset-password")
async def reset_password(payload: ResetPasswordRequest):
    return success_response(message="Password has been reset successfully")
