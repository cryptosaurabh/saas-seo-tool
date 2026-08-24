from typing import Optional, List, Dict, Any
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel

class CreateClientRequest(BaseModel):
    client_name: str
    company_name: str
    email: str
    phone: Optional[str] = None
    website_url: str
    industry: Optional[str] = "SaaS"
    country_code: Optional[str] = "US"

class UpdateWhiteLabelRequest(BaseModel):
    agency_name: str
    logo_url: Optional[str] = None
    primary_color: Optional[str] = "#4f46e5"
    secondary_color: Optional[str] = "#10b981"
    custom_domain: Optional[str] = None

class ScheduleReportRequest(BaseModel):
    client_id: UUID
    report_type: str
    frequency: str
    recipients: List[str]
