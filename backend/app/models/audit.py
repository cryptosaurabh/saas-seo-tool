import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime, JSON, Text, Integer, Float, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.base_class import BaseModel

class CrawlJob(BaseModel):
    __tablename__ = "crawl_jobs"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspaces.id", ondelete="CASCADE"), nullable=True, index=True)
    website_id = Column(UUID(as_uuid=True), ForeignKey("websites.id", ondelete="CASCADE"), nullable=True, index=True)
    
    target_url = Column(String(1024), nullable=False)
    max_pages = Column(Integer, default=500, nullable=False)
    max_depth = Column(Integer, default=5, nullable=False)
    crawl_speed = Column(String(32), default="normal", nullable=False) # slow, normal, fast
    user_agent = Column(String(255), default="SEOPilotBot/1.0", nullable=False)
    user_agent_type = Column(String(32), default="desktop", nullable=False) # desktop, mobile
    
    status = Column(String(32), default="queued", nullable=False, index=True) # queued, running, completed, failed, paused, cancelled
    progress_percentage = Column(Float, default=0.0, nullable=False)
    pages_crawled = Column(Integer, default=0, nullable=False)
    start_time = Column(DateTime(timezone=True), nullable=True)
    end_time = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    crawled_pages = relationship("CrawledPage", back_populates="crawl_job", cascade="all, delete-orphan")
    audit_report = relationship("AuditReport", back_populates="crawl_job", uselist=False, cascade="all, delete-orphan")

class CrawledPage(BaseModel):
    __tablename__ = "crawled_pages"

    crawl_job_id = Column(UUID(as_uuid=True), ForeignKey("crawl_jobs.id", ondelete="CASCADE"), nullable=False, index=True)
    url = Column(String(2048), nullable=False, index=True)
    status_code = Column(Integer, nullable=False, default=200)
    content_type = Column(String(128), default="text/html", nullable=False)
    load_time_ms = Column(Integer, default=0, nullable=False)
    depth = Column(Integer, default=0, nullable=False)
    
    title = Column(String(1024), nullable=True)
    title_length = Column(Integer, default=0, nullable=False)
    meta_description = Column(Text, nullable=True)
    meta_description_length = Column(Integer, default=0, nullable=False)
    
    h1_count = Column(Integer, default=0, nullable=False)
    h1_content = Column(Text, nullable=True)
    word_count = Column(Integer, default=0, nullable=False)
    canonical_url = Column(String(2048), nullable=True)
    is_indexable = Column(Boolean, default=True, nullable=False)
    
    images_count = Column(Integer, default=0, nullable=False)
    images_missing_alt = Column(Integer, default=0, nullable=False)
    internal_links_count = Column(Integer, default=0, nullable=False)
    external_links_count = Column(Integer, default=0, nullable=False)
    broken_links_count = Column(Integer, default=0, nullable=False)
    
    structured_data_types = Column(JSON, default=[], nullable=False) # e.g. ["Organization", "FAQPage"]

    crawl_job = relationship("CrawlJob", back_populates="crawled_pages")
    issues = relationship("SEOIssue", back_populates="crawled_page", cascade="all, delete-orphan")

class AuditReport(BaseModel):
    __tablename__ = "audit_reports"

    crawl_job_id = Column(UUID(as_uuid=True), ForeignKey("crawl_jobs.id", ondelete="CASCADE"), nullable=False, unique=True)
    
    overall_seo_score = Column(Integer, default=0, nullable=False) # 0 - 100
    technical_score = Column(Integer, default=0, nullable=False)
    performance_score = Column(Integer, default=0, nullable=False)
    content_score = Column(Integer, default=0, nullable=False)
    accessibility_score = Column(Integer, default=0, nullable=False)
    security_score = Column(Integer, default=0, nullable=False)
    
    critical_issues_count = Column(Integer, default=0, nullable=False)
    high_issues_count = Column(Integer, default=0, nullable=False)
    medium_issues_count = Column(Integer, default=0, nullable=False)
    low_issues_count = Column(Integer, default=0, nullable=False)
    passed_checks_count = Column(Integer, default=0, nullable=False)

    crawl_job = relationship("CrawlJob", back_populates="audit_report")
    issues = relationship("SEOIssue", back_populates="audit_report", cascade="all, delete-orphan")

class SEOIssue(BaseModel):
    __tablename__ = "seo_issues"

    audit_report_id = Column(UUID(as_uuid=True), ForeignKey("audit_reports.id", ondelete="CASCADE"), nullable=False, index=True)
    crawled_page_id = Column(UUID(as_uuid=True), ForeignKey("crawled_pages.id", ondelete="CASCADE"), nullable=True, index=True)
    
    page_url = Column(String(2048), nullable=False)
    category = Column(String(64), nullable=False, index=True) # meta, headings, links, images, technical, performance, security, schema
    severity = Column(String(32), nullable=False, index=True) # critical, high, medium, low
    
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    recommendation = Column(Text, nullable=False)
    estimated_impact = Column(String(64), default="Medium SEO Impact", nullable=False)
    
    # AI Auto-Fix Ready Fields
    ai_fix_prompt = Column(Text, nullable=True)
    ai_fix_suggestion = Column(Text, nullable=True)

    audit_report = relationship("AuditReport", back_populates="issues")
    crawled_page = relationship("CrawledPage", back_populates="issues")
