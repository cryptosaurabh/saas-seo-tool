import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime, JSON, Text, Integer, Float, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.base_class import BaseModel

class GoogleOAuthToken(BaseModel):
    __tablename__ = "google_oauth_tokens"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=True, index=True)
    
    service_type = Column(String(32), default="gsc", nullable=False, index=True) # gsc, ga4
    access_token = Column(Text, nullable=False)
    refresh_token = Column(Text, nullable=True)
    token_expiry = Column(DateTime(timezone=True), nullable=True)
    scope = Column(Text, nullable=True)
    is_connected = Column(Boolean, default=True, nullable=False)

class SearchConsolePerformance(BaseModel):
    __tablename__ = "search_console_performances"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    site_url = Column(String(1024), nullable=False, index=True)
    date = Column(DateTime(timezone=True), nullable=False, index=True)
    
    clicks = Column(Integer, default=0, nullable=False)
    impressions = Column(Integer, default=0, nullable=False)
    ctr = Column(Float, default=0.0, nullable=False)
    average_position = Column(Float, default=0.0, nullable=False)
    
    query_text = Column(String(255), nullable=True, index=True)
    page_url = Column(String(2048), nullable=True)
    country_code = Column(String(8), default="US", nullable=False)
    device = Column(String(32), default="desktop", nullable=False)

class GA4Metric(BaseModel):
    __tablename__ = "ga4_metrics"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    property_id = Column(String(128), nullable=False, index=True)
    date = Column(DateTime(timezone=True), nullable=False, index=True)
    
    users_count = Column(Integer, default=0, nullable=False)
    sessions_count = Column(Integer, default=0, nullable=False)
    new_users = Column(Integer, default=0, nullable=False)
    engaged_sessions = Column(Integer, default=0, nullable=False)
    bounce_rate = Column(Float, default=0.0, nullable=False)
    
    organic_sessions = Column(Integer, default=0, nullable=False)
    direct_sessions = Column(Integer, default=0, nullable=False)
    referral_sessions = Column(Integer, default=0, nullable=False)

class PageSpeedReport(BaseModel):
    __tablename__ = "pagespeed_reports"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    target_url = Column(String(2048), nullable=False, index=True)
    device = Column(String(32), default="desktop", nullable=False) # desktop, mobile
    
    performance_score = Column(Integer, default=95, nullable=False)
    accessibility_score = Column(Integer, default=100, nullable=False)
    best_practices_score = Column(Integer, default=98, nullable=False)
    seo_score = Column(Integer, default=100, nullable=False)
    
    lcp_seconds = Column(Float, default=1.2, nullable=False)
    cls_score = Column(Float, default=0.02, nullable=False)
    inp_ms = Column(Integer, default=45, nullable=False)
    fcp_seconds = Column(Float, default=0.8, nullable=False)
    ttfb_ms = Column(Integer, default=120, nullable=False)

class SyncLog(BaseModel):
    __tablename__ = "sync_logs"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    service_name = Column(String(64), nullable=False, index=True) # gsc, ga4, pagespeed
    sync_type = Column(String(32), default="manual", nullable=False) # manual, scheduled
    status = Column(String(32), default="success", nullable=False) # success, failed
    records_imported = Column(Integer, default=0, nullable=False)
    error_message = Column(Text, nullable=True)
    sync_duration_ms = Column(Integer, default=0, nullable=False)
