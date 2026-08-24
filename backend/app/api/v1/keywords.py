from typing import List, Optional
from uuid import UUID
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc

from app.database.session import get_db
from app.auth.deps import get_current_user, get_current_tenant_org
from app.models.user import User
from app.models.organization import Organization
from app.models.keywords import Keyword, KeywordSearchHistory, KeywordList, KeywordCluster, SERPSnapshot
from app.schemas.keywords import (
    KeywordSearchRequest,
    KeywordMetricsResponse,
    KeywordGapRequest,
    ContentBriefRequest,
    ContentBriefResponse
)
from app.services.keyword_research_service import keyword_research_service
from app.services.keyword_clustering_service import keyword_clustering_service
from app.utils.response import success_response, error_response

router = APIRouter(prefix="/keywords", tags=["AI Keyword Research Engine"])

@router.post("/search")
async def search_keyword(
    payload: KeywordSearchRequest,
    current_user: User = Depends(get_current_user),
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    # Track search history
    history = KeywordSearchHistory(
        organization_id=current_org.id,
        user_id=current_user.id,
        query_text=payload.keyword,
        country_code=payload.country_code or "US",
        search_engine=payload.search_engine or "google"
    )
    db.add(history)
    await db.commit()

    metrics = keyword_research_service.generate_keyword_metrics(
        keyword=payload.keyword,
        country=payload.country_code or "US",
        engine=payload.search_engine or "google"
    )
    variations = keyword_research_service.generate_keyword_variations(payload.keyword)

    return success_response(data={
        "metrics": metrics,
        "related": variations["related"],
        "questions": variations["questions"]
    })

@router.get("/serp")
async def get_serp_analysis(keyword: str):
    base_metrics = keyword_research_service.generate_keyword_metrics(keyword)
    
    serp_items = [
        {"position": 1, "url": "https://ahrefs.com/keywords-explorer", "title": "Ahrefs Keywords Explorer - Market Intelligence", "dr": 92, "traffic": 145000, "word_count": 3200, "schemas": ["SoftwareApplication", "FAQPage"]},
        {"position": 2, "url": "https://semrush.com/keyword-magic-tool", "title": "SEMrush Keyword Magic Tool", "dr": 91, "traffic": 128000, "word_count": 2800, "schemas": ["SoftwareApplication"]},
        {"position": 3, "url": "https://seopilot.ai/features/keyword-research", "title": "SEOPilot AI - AI Keyword Research Engine", "dr": 79, "traffic": 45000, "word_count": 2400, "schemas": ["SoftwareApplication", "FAQPage", "Organization"]},
        {"position": 4, "url": "https://moz.com/explorer", "title": "Moz Keyword Explorer Platform", "dr": 88, "traffic": 34000, "word_count": 1900, "schemas": ["Article"]},
        {"position": 5, "url": "https://answerthepublic.com", "title": "Answer The Public - Search Questions", "dr": 85, "traffic": 28000, "word_count": 1200, "schemas": ["WebSite"]}
    ]

    return success_response(data={
        "keyword": keyword,
        "serp_features": base_metrics["serp_features"],
        "rankings": serp_items
    })

@router.post("/cluster")
async def generate_topic_clusters(
    keyword: str = "seo software",
    current_org: Organization = Depends(get_current_tenant_org)
):
    base_metrics = keyword_research_service.generate_keyword_metrics(keyword)
    variations = keyword_research_service.generate_keyword_variations(keyword)
    
    flat_list = [{"keyword": v["keyword"], "volume": v["search_volume"], "kd": v["kd"]} for v in variations["related"]]
    clusters = keyword_clustering_service.cluster_keywords(flat_list)

    return success_response(data={
        "seed_keyword": keyword,
        "total_clusters": len(clusters),
        "clusters": clusters
    })

@router.post("/gap")
async def keyword_gap_analysis(payload: KeywordGapRequest):
    gap_results = [
        {"keyword": "ai technical audit", "volume": 18400, "kd": 45, "your_position": None, "competitor_position": 2, "status": "Missing Keyword"},
        {"keyword": "schema generator automation", "volume": 9200, "kd": 32, "your_position": 14, "competitor_position": 3, "status": "Weak Keyword"},
        {"keyword": "multi-tenant seo agency platform", "volume": 12500, "kd": 28, "your_position": 1, "competitor_position": 18, "status": "Shared Strong"}
    ]
    return success_response(data={
        "your_domain": payload.your_domain,
        "competitor_domain": payload.competitor_domain,
        "gap_keywords": gap_results
    })

@router.post("/content-brief")
async def generate_content_brief(payload: ContentBriefRequest):
    kw = payload.target_keyword
    return success_response(data={
        "target_keyword": kw,
        "recommended_word_count": 2400,
        "seo_title_suggestions": [
            f"The Complete Guide to {kw.title()} in 2026",
            f"How to Master {kw.title()} for Maximum Search Traffic",
            f"{kw.title()}: 7 Proven Strategies for Enterprise Growth"
        ],
        "meta_description_suggestions": [
            f"Master {kw} with our complete step-by-step guide. Learn technical strategies and real-time AI optimization tips.",
            f"Discover actionable {kw} tactics to boost organic rankings and dominate search engine results."
        ],
        "heading_structure": [
            {"level": "H1", "text": f"Mastering {kw.title()}"},
            {"level": "H2", "text": f"Why {kw.title()} Matters for SEO Strategy"},
            {"level": "H2", "text": f"5 Step Action Plan for {kw.title()}"},
            {"level": "H3", "text": "Step 1: Technical Foundation & Crawling"},
            {"level": "H3", "text": "Step 2: Content Optimization & SERP Intent"},
            {"level": "H2", "text": f"Frequently Asked Questions About {kw.title()}"}
        ],
        "questions_to_answer": [
            f"What is {kw}?",
            f"How much does {kw} cost?",
            f"How to implement {kw} step-by-step?"
        ],
        "suggested_schema_types": ["Article", "FAQPage", "SoftwareApplication"]
    })
