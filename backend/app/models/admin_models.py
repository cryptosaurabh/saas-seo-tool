import uuid
from datetime import datetime
from sqlalchemy import Column, String, ForeignKey, Integer, Numeric, DateTime, JSON, Boolean, Text
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.base_class import BaseModel

class AdminAuditLog(BaseModel):
    __tablename__ = "admin_audit_logs"

    admin_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    action = Column(String(128), nullable=False, index=True) # user_suspended, org_deleted, feature_flag_updated, etc.
    target_type = Column(String(64), nullable=False) # user, organization, system, feature_flag, support_ticket
    target_id = Column(String(255), nullable=True)
    ip_address = Column(String(64), nullable=True)
    user_agent = Column(String(255), nullable=True)
    changes = Column(JSON, nullable=True)
    timestamp = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

    admin_user = relationship("User", backref="admin_audit_actions")

class FeatureFlag(BaseModel):
    __tablename__ = "feature_flags"

    key = Column(String(128), unique=True, nullable=False, index=True) # beta_ai_writer, enterprise_sso, advanced_audits
    name = Column(String(128), nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String(64), default="modules", nullable=False) # modules, beta, ai, enterprise
    is_enabled = Column(Boolean, default=True, nullable=False)
    rollout_percentage = Column(Integer, default=100, nullable=False)
    target_plans = Column(JSON, default=["starter", "professional", "agency", "enterprise"], nullable=False)
    target_roles = Column(JSON, default=["owner", "admin", "member"], nullable=False)

class SupportTicket(BaseModel):
    __tablename__ = "support_tickets"

    ticket_number = Column(String(64), unique=True, nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=True)
    title = Column(String(255), nullable=False)
    category = Column(String(64), default="billing", nullable=False) # billing, bug, feature_request, API, general
    priority = Column(String(32), default="medium", nullable=False) # low, medium, high, urgent
    status = Column(String(32), default="open", nullable=False) # open, in_progress, resolved, closed
    assigned_admin_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    messages = Column(JSON, default=[], nullable=False) # array of {sender_id, message, created_at}

    user = relationship("User", foreign_keys=[user_id], backref="support_tickets")
    organization = relationship("Organization", backref="support_tickets")
    assigned_admin = relationship("User", foreign_keys=[assigned_admin_id])

class SystemLog(BaseModel):
    __tablename__ = "system_logs"

    log_level = Column(String(32), default="ERROR", nullable=False, index=True) # INFO, WARNING, ERROR, CRITICAL
    category = Column(String(64), default="api", nullable=False) # api, database, celery_queue, auth, ai_agent
    message = Column(Text, nullable=False)
    traceback = Column(Text, nullable=True)
    endpoint = Column(String(255), nullable=True)
    status_code = Column(Integer, nullable=True)
    timestamp = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

class ServerMetric(BaseModel):
    __tablename__ = "server_metrics"

    cpu_usage_pct = Column(Numeric(5, 2), nullable=False, default=0.0)
    memory_usage_pct = Column(Numeric(5, 2), nullable=False, default=0.0)
    disk_usage_pct = Column(Numeric(5, 2), nullable=False, default=0.0)
    db_latency_ms = Column(Numeric(8, 2), nullable=False, default=0.0)
    redis_status = Column(String(32), default="healthy", nullable=False)
    celery_pending_jobs = Column(Integer, default=0, nullable=False)
    celery_running_jobs = Column(Integer, default=0, nullable=False)
    celery_failed_jobs = Column(Integer, default=0, nullable=False)
    active_ws_connections = Column(Integer, default=0, nullable=False)
    timestamp = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

class Announcement(BaseModel):
    __tablename__ = "announcements"

    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    notice_type = Column(String(32), default="announcement", nullable=False) # announcement, maintenance, security_alert
    target_audience = Column(String(64), default="all", nullable=False) # all, free, paid, agencies
    is_active = Column(Boolean, default=True, nullable=False)
    starts_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    ends_at = Column(DateTime(timezone=True), nullable=True)
