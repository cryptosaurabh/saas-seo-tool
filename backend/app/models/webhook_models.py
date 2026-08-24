import uuid
from datetime import datetime
from sqlalchemy import Column, String, ForeignKey, Integer, DateTime, JSON, Boolean, Text
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.base_class import BaseModel

class WebhookEndpoint(BaseModel):
    __tablename__ = "webhook_endpoints"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    target_url = Column(String(512), nullable=False)
    secret_key = Column(String(128), nullable=False) # Used for HMAC SHA-256 signature
    description = Column(String(255), nullable=True)
    subscribed_events = Column(JSON, default=["audit.completed", "ranking.changed", "payment.completed"], nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    failure_count = Column(Integer, default=0, nullable=False)

    organization = relationship("Organization", backref="webhook_endpoints")

class WebhookEventLog(BaseModel):
    __tablename__ = "webhook_event_logs"

    webhook_id = Column(UUID(as_uuid=True), ForeignKey("webhook_endpoints.id", ondelete="CASCADE"), nullable=False, index=True)
    event_name = Column(String(128), nullable=False, index=True) # audit.completed, ranking.changed, etc.
    payload = Column(JSON, nullable=False)
    http_status = Column(Integer, nullable=True)
    response_body = Column(Text, nullable=True)
    status = Column(String(32), default="delivered", nullable=False) # delivered, failed, retrying
    retry_count = Column(Integer, default=0, nullable=False)
    delivered_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

    webhook = relationship("WebhookEndpoint", backref="logs")
