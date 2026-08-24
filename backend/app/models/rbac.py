import uuid
from sqlalchemy import Column, String, ForeignKey, Table, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.base_class import BaseModel, Base

# Association Table for Role and Permission
role_permissions = Table(
    "role_permissions",
    Base.metadata,
    Column("role_id", UUID(as_uuid=True), ForeignKey("roles.id", ondelete="CASCADE"), primary_key=True),
    Column("permission_id", UUID(as_uuid=True), ForeignKey("permissions.id", ondelete="CASCADE"), primary_key=True)
)

class Role(BaseModel):
    __tablename__ = "roles"

    name = Column(String(64), unique=True, nullable=False) # Super Admin, Agency Owner, Business User, Team Member
    description = Column(String(255), nullable=True)
    is_system_role = Column(Boolean, default=True, nullable=False)

    permissions = relationship("Permission", secondary=role_permissions, back_populates="roles")
    team_memberships = relationship("TeamMember", back_populates="role")

class Permission(BaseModel):
    __tablename__ = "permissions"

    code = Column(String(128), unique=True, nullable=False, index=True) # e.g. org:manage, billing:view
    description = Column(String(255), nullable=True)
    module = Column(String(64), nullable=False)

    roles = relationship("Role", secondary=role_permissions, back_populates="permissions")

class TeamMember(BaseModel):
    __tablename__ = "team_members"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    role_id = Column(UUID(as_uuid=True), ForeignKey("roles.id", ondelete="CASCADE"), nullable=False, index=True)
    invited_by_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    # Relationships
    organization = relationship("Organization", back_populates="members")
    user = relationship("User", foreign_keys=[user_id], back_populates="team_memberships")
    role = relationship("Role", back_populates="team_memberships")
