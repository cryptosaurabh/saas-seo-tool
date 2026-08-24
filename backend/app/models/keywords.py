import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime, JSON, Text, Integer, Float, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.base_class import BaseModel

class Keyword(BaseModel):
    __tablename__ = "keywords"

    keyword_text = Column(String(255), nullable=False, index=True)
    country_code = Column(String(8), default="US", nullable=False, index=True)
    language_code = Column(String(8), default="en", nullable=False)
    search_engine = Column(String(32), default="google", nullable=False, index=True) # google, bing, youtube, amazon
    
    search_volume = Column(Integer, default=0, nullable=False, index=True)
    keyword_difficulty = Column(Integer, default=0, nullable=False, index=True) # 0 - 100
    cpc = Column(Float, default=0.0, nullable=False)
    competition_level = Column(String(32), default="medium", nullable=False) # low, medium, high
    
    search_intent = Column(String(32), default="informational", nullable=False, index=True) # informational, commercial, transactional, navigational
    intent_confidence = Column(Float, default=0.95, nullable=False)
    
    trend_data_json = Column(JSON, default=[], nullable=False)
    serp_features_json = Column(JSON, default=[], nullable=False) # e.g. ["featured_snippet", "people_also_ask", "local_pack"]

    serp_snapshots = relationship("SERPSnapshot", back_populates="keyword", cascade="all, delete-orphan")

class KeywordSearchHistory(BaseModel):
    __tablename__ = "keyword_search_histories"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    query_text = Column(String(255), nullable=False)
    country_code = Column(String(8), default="US", nullable=False)
    search_engine = Column(String(32), default="google", nullable=False)

class KeywordList(BaseModel):
    __tablename__ = "keyword_lists"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspaces.id", ondelete="CASCADE"), nullable=True, index=True)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=True, index=True)
    
    list_name = Column(String(255), nullable=False)
    description = Column(String(512), nullable=True)
    keywords_count = Column(Integer, default=0, nullable=False)

    clusters = relationship("KeywordCluster", back_populates="keyword_list", cascade="all, delete-orphan")

class KeywordCluster(BaseModel):
    __tablename__ = "keyword_clusters"

    keyword_list_id = Column(UUID(as_uuid=True), ForeignKey("keyword_lists.id", ondelete="CASCADE"), nullable=False, index=True)
    pillar_topic = Column(String(255), nullable=False)
    total_keywords_count = Column(Integer, default=0, nullable=False)
    total_volume = Column(Integer, default=0, nullable=False)
    average_difficulty = Column(Integer, default=0, nullable=False)
    subtopics_json = Column(JSON, default=[], nullable=False)

    keyword_list = relationship("KeywordList", back_populates="clusters")

class SERPSnapshot(BaseModel):
    __tablename__ = "serp_snapshots"

    keyword_id = Column(UUID(as_uuid=True), ForeignKey("keywords.id", ondelete="CASCADE"), nullable=False, index=True)
    ranking_position = Column(Integer, nullable=False) # 1 - 10
    page_url = Column(String(2048), nullable=False)
    title = Column(String(1024), nullable=True)
    meta_description = Column(Text, nullable=True)
    domain_rating = Column(Integer, default=50, nullable=False)
    estimated_traffic = Column(Integer, default=0, nullable=False)
    word_count = Column(Integer, default=0, nullable=False)
    schema_types_json = Column(JSON, default=[], nullable=False)

    keyword = relationship("Keyword", back_populates="serp_snapshots")
