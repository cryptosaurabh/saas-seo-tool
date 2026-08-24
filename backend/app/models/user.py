import uuid
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.base_class import BaseModel

class User(BaseModel):
    __tablename__ = "users"

    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=True) # Nullable for OAuth users
    full_name = Column(String(255), nullable=False)
    avatar_url = Column(String(1024), nullable=True)
    is_verified = Column(Boolean, default=False, nullable=False)
    is_superadmin = Column(Boolean, default=False, nullable=False)
    auth_provider = Column(String(32), default="email", nullable=False) # email, google, github
    last_login_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    owned_organizations = relationship("Organization", back_populates="owner")
    team_memberships = relationship("TeamMember", back_populates="user", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")
    api_keys = relationship("APIKey", back_populates="user", cascade="all, delete-orphan")
