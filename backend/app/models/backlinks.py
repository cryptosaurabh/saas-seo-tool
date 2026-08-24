import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime, JSON, Text, Integer, Float, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.base_class import BaseModel

class Backlink(BaseModel):
    __tablename__ = "backlinks"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspaces.id", ondelete="CASCADE"), nullable=True, index=True)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=True, index=True)

    source_url = Column(String(2048), nullable=False)
    target_url = Column(String(2048), nullable=False)
    source_domain = Column(String(512), nullable=False, index=True)
    
    domain_authority = Column(Integer, default=50, nullable=False, index=True) # 0 - 100
    page_authority = Column(Integer, default=45, nullable=False)
    
    anchor_text = Column(String(512), default="", nullable=False)
    anchor_type = Column(String(32), default="branded", nullable=False) # exact, partial, branded, generic, naked
    link_type = Column(String(32), default="follow", nullable=False, index=True) # follow, nofollow, ugc, sponsored
    
    toxic_score = Column(Integer, default=0, nullable=False, index=True) # 0 - 100
    is_toxic = Column(Boolean, default=False, nullable=False)
    
    first_seen = Column(DateTime(timezone=True), nullable=True)
    last_seen = Column(DateTime(timezone=True), nullable=True)

class ReferringDomain(BaseModel):
    __tablename__ = "referring_domains"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=True, index=True)

    domain_name = Column(String(512), nullable=False, index=True)
    country_code = Column(String(8), default="US", nullable=False)
    ip_address = Column(String(64), nullable=True)
    domain_authority = Column(Integer, default=50, nullable=False)
    spam_score = Column(Integer, default=2, nullable=False)
    backlinks_count = Column(Integer, default=1, nullable=False)
    status = Column(String(32), default="active", nullable=False)

class CompetitorBacklink(BaseModel):
    __tablename__ = "competitor_backlinks"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=True, index=True)

    competitor_domain = Column(String(512), nullable=False, index=True)
    backlink_url = Column(String(2048), nullable=False)
    anchor_text = Column(String(512), nullable=True)
    domain_authority = Column(Integer, default=50, nullable=False)
    is_shared = Column(Boolean, default=False, nullable=False)

class DisavowEntry(BaseModel):
    __tablename__ = "disavow_entries"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    domain_or_url = Column(String(1024), nullable=False, index=True)
    is_domain_level = Column(Boolean, default=True, nullable=False)
    reason = Column(String(255), default="High toxic spam score", nullable=False)

class OutreachCampaign(BaseModel):
    __tablename__ = "outreach_campaigns"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    website_name = Column(String(255), nullable=False)
    contact_name = Column(String(255), nullable=True)
    contact_email = Column(String(255), nullable=True)
    opportunity_type = Column(String(64), default="guest_post", nullable=False) # guest_post, broken_link, brand_mention
    status = Column(String(32), default="prospect", nullable=False) # prospect, contacted, replied, acquired, declined
    notes = Column(Text, nullable=True)
    follow_up_date = Column(DateTime(timezone=True), nullable=True)
