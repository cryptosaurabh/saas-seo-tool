from typing import List, Optional
from uuid import UUID
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc

from app.database.session import get_db
from app.auth.deps import get_current_user, get_current_tenant_org
from app.models.user import User
from app.models.organization import Organization
from app.models.backlinks import Backlink, ReferringDomain, CompetitorBacklink, DisavowEntry, OutreachCampaign
from app.schemas.backlinks import DisavowCreateRequest, OutreachCreateRequest
from app.services.backlink_analysis_service import backlink_analysis_service
from app.services.link_building_service import link_building_service
from app.utils.response import success_response, error_response

router = APIRouter(prefix="/backlinks", tags=["Competitor Intelligence & Backlink Engine"])

@router.get("/overview")
async def get_backlinks_overview(
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    return success_response(data={
        "domain_authority": 84,
        "total_backlinks": 14200,
        "referring_domains": 1850,
        "follow_links": 11644,
        "nofollow_links": 2556,
        "new_backlinks_30d": 340,
        "lost_backlinks_30d": 42,
        "toxic_backlinks_count": 8,
        "follow_ratio": "82%"
    })

@router.get("/list")
async def list_backlinks(
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    backlinks = [
        {"id": "1", "source_url": "https://techcrunch.com/2026/top-seo-platforms", "target_url": "https://acmeagency.com", "source_domain": "techcrunch.com", "domain_authority": 94, "page_authority": 88, "anchor_text": "SEOPilot AI Operating System", "anchor_type": "branded", "link_type": "follow", "toxic_score": 2, "is_toxic": False},
        {"id": "2", "source_url": "https://producthunt.com/posts/seopilot-ai", "target_url": "https://acmeagency.com", "source_domain": "producthunt.com", "domain_authority": 90, "page_authority": 82, "anchor_text": "AI SEO Tool for Agencies", "anchor_type": "partial", "link_type": "nofollow", "toxic_score": 1, "is_toxic": False},
        {"id": "3", "source_url": "https://spammy-directory-xyz.net/links", "target_url": "https://acmeagency.com", "source_domain": "spammy-directory-xyz.net", "domain_authority": 12, "page_authority": 10, "anchor_text": "click here cheap seo", "anchor_type": "generic", "link_type": "follow", "toxic_score": 88, "is_toxic": True}
    ]
    return success_response(data=backlinks)

@router.get("/domains")
async def list_referring_domains():
    domains = [
        {"domain_name": "techcrunch.com", "country_code": "US", "ip_address": "192.0.2.1", "domain_authority": 94, "spam_score": 1, "backlinks_count": 24},
        {"domain_name": "producthunt.com", "country_code": "US", "ip_address": "198.51.100.4", "domain_authority": 90, "spam_score": 2, "backlinks_count": 18},
        {"domain_name": "venturebeat.com", "country_code": "US", "ip_address": "203.0.113.8", "domain_authority": 91, "spam_score": 1, "backlinks_count": 12}
    ]
    return success_response(data=domains)

@router.post("/gap")
async def get_backlink_gap(your_domain: str = "acmeagency.com", competitor_domain: str = "ahrefs.com"):
    gap = link_building_service.get_backlink_gap(your_domain, competitor_domain)
    return success_response(data=gap)

@router.post("/disavow")
async def add_disavow_entry(
    payload: DisavowCreateRequest,
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    entry = DisavowEntry(
        organization_id=current_org.id,
        domain_or_url=payload.domain_or_url,
        is_domain_level=payload.is_domain_level if payload.is_domain_level is not None else True,
        reason=payload.reason or "High toxic spam score"
    )
    db.add(entry)
    await db.commit()
    return success_response(message="Domain added to Google Disavow list", status_code=201)

@router.get("/disavow/export")
async def export_disavow_file(
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(DisavowEntry).where(DisavowEntry.organization_id == current_org.id))
    entries = res.scalars().all()
    dicts = [{"domain_or_url": e.domain_or_url, "is_domain_level": e.is_domain_level} for e in entries]
    txt_content = backlink_analysis_service.generate_disavow_txt(dicts if dicts else [{"domain_or_url": "spammy-directory-xyz.net", "is_domain_level": True}])
    return Response(content=txt_content, media_type="text/plain", headers={"Content-Disposition": 'attachment; filename="disavow.txt"'})

@router.get("/outreach")
async def list_outreach_prospects():
    prospects = [
        {"id": "1", "website_name": "SearchEngineJournal", "contact_name": "Editor Team", "contact_email": "editor@searchenginejournal.com", "opportunity_type": "guest_post", "status": "contacted", "notes": "Submitted draft pitch for AI SEO workflow."},
        {"id": "2", "website_name": "Backlinko", "contact_name": "Brian Dean", "contact_email": "brian@backlinko.com", "opportunity_type": "broken_link", "status": "prospect", "notes": "Reaching out for broken link replacement."}
    ]
    return success_response(data=prospects)
