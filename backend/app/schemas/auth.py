from typing import Optional, List
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class UserRegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    full_name: str
    organization_name: str

class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str

class RefreshTokenRequest(BaseModel):
    refresh_token: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str = Field(min_length=8)

class VerifyEmailRequest(BaseModel):
    token: str

class UserResponse(BaseModel):
    id: UUID
    email: EmailStr
    full_name: str
    avatar_url: Optional[str] = None
    is_verified: bool
    is_superadmin: bool
    auth_provider: str
    created_at: datetime

    class Config:
        from_attributes = True

class AuthStatusResponse(BaseModel):
    user: UserResponse
    active_organization_id: Optional[UUID] = None
    role: Optional[str] = None
