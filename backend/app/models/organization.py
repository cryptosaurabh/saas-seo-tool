import uuid
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.base_class import BaseModel

class Organization(BaseModel):
    __tablename__ = "organizations"

    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    plan_tier = Column(String(32), default="free", nullable=False) # free, starter, professional, agency, enterprise
    stripe_customer_id = Column(String(255), nullable=True)

    # Relationships
    owner = relationship("User", back_populates="owned_organizations")
    workspaces = relationship("Workspace", back_populates="organization", cascade="all, delete-orphan")
    members = relationship("TeamMember", back_populates="organization", cascade="all, delete-orphan")
    subscription = relationship("Subscription", back_populates="organization", uselist=False, cascade="all, delete-orphan")
    api_keys = relationship("APIKey", back_populates="organization", cascade="all, delete-orphan")
    invoices = relationship("Invoice", back_populates="organization", cascade="all, delete-orphan")
