from typing import Optional, List, Dict, Any
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, EmailStr

class AdminUserActionRequest(BaseModel):
    action: str # suspend, activate, reset_password, force_logout, assign_role
    reason: Optional[str] = None
    new_role: Optional[str] = None

class AdminOrgActionRequest(BaseModel):
    action: str # suspend, activate, delete, transfer_ownership
    new_owner_id: Optional[UUID] = None
    reason: Optional[str] = None

class FeatureFlagCreate(BaseModel):
    key: str
    name: str
    description: Optional[str] = None
    category: str = "modules"
    is_enabled: bool = True
    rollout_percentage: int = 100

class SupportTicketUpdate(BaseModel):
    status: Optional[str] = None
    priority: Optional[str] = None
    assigned_admin_id: Optional[UUID] = None
    reply_message: Optional[str] = None

class AnnouncementCreate(BaseModel):
    title: str
    content: str
    notice_type: str = "announcement"
    target_audience: str = "all"
    is_active: bool = True

class GlobalSettingsUpdate(BaseModel):
    platform_name: Optional[str] = None
    support_email: Optional[str] = None
    default_free_ai_credits: Optional[int] = None
    maintenance_mode: Optional[bool] = None
    allow_new_signups: Optional[bool] = None
