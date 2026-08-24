import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime, JSON, Text, Integer, Float, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.base_class import BaseModel

class TrackedKeyword(BaseModel):
    __tablename__ = "tracked_keywords"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspaces.id", ondelete="CASCADE"), nullable=True, index=True)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=True, index=True)
    website_id = Column(UUID(as_uuid=True), ForeignKey("websites.id", ondelete="CASCADE"), nullable=True, index=True)

    keyword_text = Column(String(255), nullable=False, index=True)
    target_url = Column(String(2048), nullable=False)
    country_code = Column(String(8), default="US", nullable=False)
    city_name = Column(String(128), nullable=True)
    search_engine = Column(String(32), default="google", nullable=False) # google, bing, maps
    device = Column(String(32), default="desktop", nullable=False) # desktop, mobile
    tracking_frequency = Column(String(32), default="daily", nullable=False) # daily, weekly

    current_position = Column(Integer, default=1, nullable=False, index=True)
    previous_position = Column(Integer, default=1, nullable=False)
    position_change = Column(Integer, default=0, nullable=False) # +3, -1, 0
    best_position = Column(Integer, default=1, nullable=False)

    search_volume = Column(Integer, default=0, nullable=False)
    cpc = Column(Float, default=0.0, nullable=False)
    serp_features_json = Column(JSON, default=[], nullable=False)

    rankings = relationship("KeywordRanking", back_populates="tracked_keyword", cascade="all, delete-orphan")

class KeywordRanking(BaseModel):
    __tablename__ = "keyword_rankings"

    tracked_keyword_id = Column(UUID(as_uuid=True), ForeignKey("tracked_keywords.id", ondelete="CASCADE"), nullable=False, index=True)
    position = Column(Integer, nullable=False)
    ranking_date = Column(DateTime(timezone=True), nullable=False, index=True)
    url_found = Column(String(2048), nullable=True)

    tracked_keyword = relationship("TrackedKeyword", back_populates="rankings")

class CompetitorTracking(BaseModel):
    __tablename__ = "competitor_trackings"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=True, index=True)

    competitor_name = Column(String(255), nullable=False)
    competitor_domain = Column(String(512), nullable=False, index=True)
    visibility_score = Column(Float, default=0.0, nullable=False)
    average_position = Column(Float, default=0.0, nullable=False)
    keywords_count = Column(Integer, default=0, nullable=False)

class RankingAlert(BaseModel):
    __tablename__ = "ranking_alerts"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    tracked_keyword_id = Column(UUID(as_uuid=True), ForeignKey("tracked_keywords.id", ondelete="CASCADE"), nullable=True, index=True)
    
    alert_type = Column(String(64), nullable=False) # top_3_entered, top_10_entered, position_drop, competitor_outrank
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False, nullable=False)
