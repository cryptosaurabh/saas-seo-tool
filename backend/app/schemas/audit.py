from typing import Optional, List, Any
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, HttpUrl

class CrawlStartRequest(BaseModel):
    target_url: str
    max_pages: Optional[int] = 500
    max_depth: Optional[int] = 5
    crawl_speed: Optional[str] = "normal" # slow, normal, fast
    user_agent_type: Optional[str] = "desktop" # desktop, mobile

class CrawlStatusResponse(BaseModel):
    job_id: UUID
    target_url: str
    status: str # queued, running, completed, failed, paused, cancelled
    progress_percentage: float
    pages_crawled: int
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

class SEOIssueResponse(BaseModel):
    id: UUID
    page_url: str
    category: str # meta, headings, links, images, technical, performance, security, schema
    severity: str # critical, high, medium, low
    title: str
    description: str
    recommendation: str
    estimated_impact: str
    ai_fix_prompt: Optional[str] = None

class AuditReportResponse(BaseModel):
    id: UUID
    crawl_job_id: UUID
    overall_seo_score: int
    technical_score: int
    performance_score: int
    content_score: int
    accessibility_score: int
    security_score: int
    critical_issues_count: int
    high_issues_count: int
    medium_issues_count: int
    low_issues_count: int
    passed_checks_count: int

class CrawledPageDetailResponse(BaseModel):
    id: UUID
    url: str
    status_code: int
    content_type: str
    load_time_ms: int
    depth: int
    title: Optional[str] = None
    title_length: int
    meta_description: Optional[str] = None
    meta_description_length: int
    h1_count: int
    h1_content: Optional[str] = None
    word_count: int
    canonical_url: Optional[str] = None
    is_indexable: bool
    images_count: int
    images_missing_alt: int
    internal_links_count: int
    external_links_count: int
    structured_data_types: List[str]
