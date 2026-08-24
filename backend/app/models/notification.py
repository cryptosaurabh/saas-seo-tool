import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime, JSON, Text
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.base_class import BaseModel

class Notification(BaseModel):
    __tablename__ = "notifications"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    category = Column(String(64), default="system", nullable=False) # system, billing, security, activity
    read_at = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User", back_populates="notifications")

class AuditLog(BaseModel):
    __tablename__ = "audit_logs"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=True, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    action = Column(String(128), nullable=False, index=True) # e.g. user.login, org.updated, key.created
    resource = Column(String(128), nullable=False)
    ip_address = Column(String(64), nullable=True)
    user_agent = Column(String(512), nullable=True)
    metadata_payload = Column(JSON, default={}, nullable=False)

class APIKey(BaseModel):
    __tablename__ = "api_keys"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(128), nullable=False)
    key_prefix = Column(String(16), nullable=False)
    key_hash = Column(String(255), unique=True, nullable=False, index=True)
    scopes = Column(JSON, default=["read"], nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=True)
    last_used_at = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User", back_populates="api_keys")
    organization = relationship("Organization", back_populates="api_keys")
