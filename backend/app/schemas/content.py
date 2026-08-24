from typing import Optional, List, Dict, Any
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel

class ArticleGenerateRequest(BaseModel):
    primary_keyword: str
    secondary_keywords: Optional[List[str]] = []
    article_type: Optional[str] = "blog" # blog, service, landing, product
    writing_tone: Optional[str] = "professional" # creative, balanced, professional, persuasive, technical
    target_word_count: Optional[int] = 2400

class ArticleOptimizeRequest(BaseModel):
    title: str
    content_markdown: str
    author_name: Optional[str] = "SEOPilot AI"

class ArticleRewriteRequest(BaseModel):
    text: str
    mode: str = "improve_seo" # expand, shorten, simplify, improve_seo

class ArticleResponse(BaseModel):
    id: UUID
    title: str
    slug: str
    primary_keyword: str
    article_type: str
    writing_tone: str
    actual_word_count: int
    content_markdown: str
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    content_score: int
    readability_score: int
    eeat_score: int
    status: str
