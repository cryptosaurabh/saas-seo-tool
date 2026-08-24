from typing import Optional, List, Dict, Any
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel

class TrackKeywordRequest(BaseModel):
    keyword_text: str
    target_url: str
    country_code: Optional[str] = "US"
    city_name: Optional[str] = None
    search_engine: Optional[str] = "google" # google, bing, maps
    device: Optional[str] = "desktop" # desktop, mobile
    tracking_frequency: Optional[str] = "daily"

class TrackedKeywordResponse(BaseModel):
    id: UUID
    keyword_text: str
    target_url: str
    country_code: str
    device: str
    current_position: int
    previous_position: int
    position_change: int
    best_position: int
    search_volume: int
    cpc: float
    serp_features: List[str]
