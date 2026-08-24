from typing import Optional, List
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, Field

class OrganizationCreate(BaseModel):
    name: str = Field(min_length=2, max_length=255)

class OrganizationUpdate(BaseModel):
    name: Optional[str] = None

class OrganizationResponse(BaseModel):
    id: UUID
    name: str
    slug: str
    owner_id: UUID
    plan_tier: str
    created_at: datetime
    status: str

    class Config:
        from_attributes = True

class WorkspaceCreate(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    description: Optional[str] = None

class WorkspaceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class WorkspaceResponse(BaseModel):
    id: UUID
    organization_id: UUID
    name: str
    slug: str
    description: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class ProjectCreate(BaseModel):
    workspace_id: UUID
    name: str
    target_domain: str

class ProjectResponse(BaseModel):
    id: UUID
    workspace_id: UUID
    name: str
    target_domain: str
    created_at: datetime

    class Config:
        from_attributes = True
