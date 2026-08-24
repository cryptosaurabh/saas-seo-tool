from typing import Optional, List, Dict, Any
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel

class BacklinkItemResponse(BaseModel):
    id: UUID
    source_url: str
    target_url: str
    source_domain: str
    domain_authority: int
    page_authority: int
    anchor_text: str
    anchor_type: str
    link_type: str
    toxic_score: int
    is_toxic: bool

class DisavowCreateRequest(BaseModel):
    domain_or_url: str
    is_domain_level: Optional[bool] = True
    reason: Optional[str] = "High toxic spam score"

class OutreachCreateRequest(BaseModel):
    website_name: str
    contact_name: Optional[str] = None
    contact_email: Optional[str] = None
    opportunity_type: Optional[str] = "guest_post" # guest_post, broken_link, brand_mention
