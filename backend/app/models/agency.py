import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime, JSON, Text, Integer, Float, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.base_class import BaseModel

class AgencyClient(BaseModel):
    __tablename__ = "agency_clients"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)

    client_name = Column(String(255), nullable=False)
    company_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(64), nullable=True)
    website_url = Column(String(2048), nullable=False)
    industry = Column(String(128), default="SaaS", nullable=False)
    country_code = Column(String(8), default="US", nullable=False)
    time_zone = Column(String(64), default="UTC", nullable=False)
    notes = Column(Text, nullable=True)
    status = Column(String(32), default="active", nullable=False) # active, archived

class WhiteLabelSetting(BaseModel):
    __tablename__ = "whitelabel_settings"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, unique=True, index=True)

    agency_name = Column(String(255), default="SEOPilot Agency", nullable=False)
    logo_url = Column(String(2048), nullable=True)
    favicon_url = Column(String(2048), nullable=True)
    primary_color = Column(String(32), default="#4f46e5", nullable=False)
    secondary_color = Column(String(32), default="#10b981", nullable=False)
    custom_domain = Column(String(255), nullable=True)
    email_footer_text = Column(Text, nullable=True)
    custom_css = Column(Text, nullable=True)

class ReportSchedule(BaseModel):
    __tablename__ = "report_schedules"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    client_id = Column(UUID(as_uuid=True), ForeignKey("agency_clients.id", ondelete="CASCADE"), nullable=False, index=True)

    report_type = Column(String(64), default="seo_summary", nullable=False) # seo_summary, rankings, backlinks, technical_audit
    frequency = Column(String(32), default="monthly", nullable=False) # daily, weekly, monthly, quarterly
    recipients_json = Column(JSON, default=[], nullable=False)
    next_run_at = Column(DateTime(timezone=True), nullable=True)
    last_sent_at = Column(DateTime(timezone=True), nullable=True)

class ClientNote(BaseModel):
    __tablename__ = "client_notes"

    client_id = Column(UUID(as_uuid=True), ForeignKey("agency_clients.id", ondelete="CASCADE"), nullable=False, index=True)
    author_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    note_text = Column(Text, nullable=False)
    is_client_visible = Column(Boolean, default=False, nullable=False)

class AgencyTeamMember(BaseModel):
    __tablename__ = "agency_team_members"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    role_name = Column(String(64), default="manager", nullable=False) # owner, manager, seo_executive, writer, analyst, viewer
    permissions_json = Column(JSON, default=[], nullable=False)
