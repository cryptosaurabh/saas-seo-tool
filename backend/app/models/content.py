import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime, JSON, Text, Integer, Float, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.base_class import BaseModel

class Article(BaseModel):
    __tablename__ = "articles"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspaces.id", ondelete="CASCADE"), nullable=True, index=True)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=True, index=True)

    title = Column(String(512), nullable=False)
    slug = Column(String(512), nullable=False, index=True)
    primary_keyword = Column(String(255), nullable=False, index=True)
    secondary_keywords_json = Column(JSON, default=[], nullable=False)
    
    article_type = Column(String(64), default="blog", nullable=False) # blog, service, landing, product, guide
    writing_tone = Column(String(64), default="professional", nullable=False)
    target_word_count = Column(Integer, default=2400, nullable=False)
    actual_word_count = Column(Integer, default=0, nullable=False)

    content_markdown = Column(Text, nullable=True)
    content_html = Column(Text, nullable=True)
    
    meta_title = Column(String(255), nullable=True)
    meta_description = Column(Text, nullable=True)
    
    content_score = Column(Integer, default=0, nullable=False) # 0 - 100
    readability_score = Column(Integer, default=0, nullable=False)
    eeat_score = Column(Integer, default=0, nullable=False)
    
    status = Column(String(32), default="draft", nullable=False, index=True) # draft, scheduled, published, archived
    scheduled_publish_date = Column(DateTime(timezone=True), nullable=True)
    author_name = Column(String(255), default="SEOPilot AI", nullable=False)

    drafts = relationship("ArticleDraft", back_populates="article", cascade="all, delete-orphan")
    eeat_audit = relationship("EEATAudit", back_populates="article", uselist=False, cascade="all, delete-orphan")

class ArticleDraft(BaseModel):
    __tablename__ = "article_drafts"

    article_id = Column(UUID(as_uuid=True), ForeignKey("articles.id", ondelete="CASCADE"), nullable=False, index=True)
    draft_version = Column(Integer, default=1, nullable=False)
    title = Column(String(512), nullable=False)
    content_markdown = Column(Text, nullable=False)

    article = relationship("Article", back_populates="drafts")

class ContentTemplate(BaseModel):
    __tablename__ = "content_templates"

    template_name = Column(String(255), nullable=False)
    category = Column(String(64), nullable=False) # blog, service, ecommerce, local_seo
    default_tone = Column(String(64), default="professional", nullable=False)
    default_headings_json = Column(JSON, default=[], nullable=False)

class ContentCalendarEvent(BaseModel):
    __tablename__ = "content_calendar_events"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    article_id = Column(UUID(as_uuid=True), ForeignKey("articles.id", ondelete="CASCADE"), nullable=True, index=True)
    title = Column(String(512), nullable=False)
    scheduled_date = Column(DateTime(timezone=True), nullable=False)
    status = Column(String(32), default="scheduled", nullable=False)

class EEATAudit(BaseModel):
    __tablename__ = "eeat_audits"

    article_id = Column(UUID(as_uuid=True), ForeignKey("articles.id", ondelete="CASCADE"), nullable=False, unique=True)
    experience_score = Column(Integer, default=85, nullable=False)
    expertise_score = Column(Integer, default=90, nullable=False)
    authority_score = Column(Integer, default=88, nullable=False)
    trust_score = Column(Integer, default=95, nullable=False)
    recommendations_json = Column(JSON, default=[], nullable=False)

    article = relationship("Article", back_populates="eeat_audit")
