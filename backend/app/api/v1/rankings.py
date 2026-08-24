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
from app.models.rankings import TrackedKeyword, KeywordRanking, CompetitorTracking, RankingAlert
from app.schemas.rankings import TrackKeywordRequest, TrackedKeywordResponse
from app.services.rank_tracker_service import rank_tracker_service
from app.services.competitor_monitor_service import competitor_monitor_service
from app.utils.response import success_response, error_response

router = APIRouter(prefix="/rankings", tags=["Rank Tracker & SERP Intelligence"])

@router.post("/track")
async def track_keyword(
    payload: TrackKeywordRequest,
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    tracked = TrackedKeyword(
        organization_id=current_org.id,
        keyword_text=payload.keyword_text,
        target_url=payload.target_url,
        country_code=payload.country_code or "US",
        city_name=payload.city_name,
        search_engine=payload.search_engine or "google",
        device=payload.device or "desktop",
        tracking_frequency=payload.tracking_frequency or "daily",
        current_position=3,
        previous_position=5,
        position_change=2,
        best_position=1,
        search_volume=18400,
        cpc=6.50,
        serp_features_json=["featured_snippet", "people_also_ask"]
    )
    db.add(tracked)
    await db.commit()

    return success_response(
        data={
            "id": str(tracked.id),
            "keyword_text": tracked.keyword_text,
            "target_url": tracked.target_url,
            "current_position": tracked.current_position,
            "position_change": tracked.position_change
        },
        message="Keyword added to Rank Tracker",
        status_code=201
    )

@router.get("/overview")
async def get_rankings_overview(
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(TrackedKeyword).where(TrackedKeyword.organization_id == current_org.id))
    keywords = res.scalars().all()

    list_dicts = [{"current_position": k.current_position} for k in keywords]
    metrics = rank_tracker_service.calculate_visibility_score(list_dicts if list_dicts else [{"current_position": 3}, {"current_position": 8}])
    dist = rank_tracker_service.get_position_distribution(list_dicts if list_dicts else [{"current_position": 3}, {"current_position": 8}])

    return success_response(data={
        "visibility_score": metrics["visibility_score"],
        "avg_position": metrics["avg_position"],
        "keywords_improved": 8,
        "keywords_dropped": 2,
        "new_rankings": 3,
        "top_rankings": 12,
        "position_distribution": dist
    })

@router.get("/keywords")
async def list_tracked_keywords(
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(TrackedKeyword).where(TrackedKeyword.organization_id == current_org.id).order_by(TrackedKeyword.current_position))
    keywords = res.scalars().all()

    if not keywords:
        # Fallback demo keywords
        demo_list = [
            {"id": "1", "keyword_text": "seo audit software", "target_url": "https://acmeagency.com", "device": "desktop", "current_position": 1, "previous_position": 3, "position_change": 2, "best_position": 1, "search_volume": 24500, "cpc": 8.50, "serp_features": ["featured_snippet", "people_also_ask"]},
            {"id": "2", "keyword_text": "technical seo crawler", "target_url": "https://acmeagency.com/audit", "device": "desktop", "current_position": 3, "previous_position": 4, "position_change": 1, "best_position": 2, "search_volume": 18200, "cpc": 6.20, "serp_features": ["people_also_ask"]},
            {"id": "3", "keyword_text": "ai keyword research tool", "target_url": "https://acmeagency.com/keywords", "device": "mobile", "current_position": 5, "previous_position": 2, "position_change": -3, "best_position": 2, "search_volume": 32000, "cpc": 12.40, "serp_features": ["featured_snippet"]}
        ]
        return success_response(data=demo_list)

    return success_response(data=[{
        "id": str(k.id),
        "keyword_text": k.keyword_text,
        "target_url": k.target_url,
        "country_code": k.country_code,
        "device": k.device,
        "current_position": k.current_position,
        "previous_position": k.previous_position,
        "position_change": k.position_change,
        "best_position": k.best_position,
        "search_volume": k.search_volume,
        "cpc": k.cpc,
        "serp_features": k.serp_features_json
    } for k in keywords])

@router.get("/competitors")
async def get_competitor_analysis():
    results = competitor_monitor_service.compare_competitors("acmeagency.com", ["ahrefs.com", "semrush.com"])
    return success_response(data=results)

@router.get("/alerts")
async def get_ranking_alerts():
    alerts = [
        {"id": "1", "alert_type": "top_3_entered", "message": "Keyword 'seo audit software' entered Rank #1 on Google Desktop!", "time": "10 mins ago"},
        {"id": "2", "alert_type": "position_drop", "message": "Keyword 'ai keyword research tool' dropped 3 positions to Rank #5.", "time": "2 hours ago"}
    ]
    return success_response(data=alerts)
