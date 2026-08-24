from typing import Optional, List, Dict, Any
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel

class KeywordSearchRequest(BaseModel):
    keyword: str
    country_code: Optional[str] = "US"
    language_code: Optional[str] = "en"
    search_engine: Optional[str] = "google" # google, bing, youtube, amazon

class KeywordMetricsResponse(BaseModel):
    keyword: str
    country: str
    engine: str
    search_volume: int
    keyword_difficulty: int
    cpc: float
    competition_level: str
    search_intent: str
    intent_confidence: float
    serp_features: List[str]
    trend: List[int]

class KeywordGapRequest(BaseModel):
    your_domain: str
    competitor_domain: str
    country_code: Optional[str] = "US"

class ContentBriefRequest(BaseModel):
    target_keyword: str
    target_audience: Optional[str] = "Marketers & Agencies"

class ContentBriefResponse(BaseModel):
    target_keyword: str
    seo_title_suggestions: List[str]
    meta_description_suggestions: List[str]
    recommended_word_count: int
    heading_structure: List[Dict[str, Any]]
    questions_to_answer: List[str]
    suggested_schema_types: List[str]
