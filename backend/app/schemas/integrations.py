from typing import Optional, List, Dict, Any
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel

class InstantIndexingRequest(BaseModel):
    url: str
    action: Optional[str] = "URL_UPDATED" # URL_UPDATED, URL_DELETED

class PageSpeedAuditRequest(BaseModel):
    url: str
    device: Optional[str] = "desktop" # desktop, mobile

class IntegrationStatusResponse(BaseModel):
    service_name: str
    is_connected: bool
    last_sync: Optional[datetime] = None
    api_health: str
