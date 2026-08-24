from typing import List, Optional
from uuid import UUID
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, desc

from app.database.session import get_db
from app.auth.deps import get_current_user, get_current_tenant_org
from app.models.user import User
from app.models.organization import Organization
from app.models.audit import CrawlJob, CrawledPage, AuditReport, SEOIssue
from app.schemas.audit import (
    CrawlStartRequest,
    CrawlStatusResponse,
    AuditReportResponse,
    SEOIssueResponse,
    CrawledPageDetailResponse
)
from app.services.crawler_service import crawler_service
from app.services.audit_engine import audit_engine
from app.utils.response import success_response, error_response

router = APIRouter(prefix="/audit", tags=["SEO Audit & Website Crawler Engine"])

@router.post("/crawl/start")
async def start_crawl_job(
    payload: CrawlStartRequest,
    current_user: User = Depends(get_current_user),
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    # Create CrawlJob
    job = CrawlJob(
        organization_id=current_org.id,
        target_url=payload.target_url,
        max_pages=payload.max_pages or 500,
        max_depth=payload.max_depth or 5,
        crawl_speed=payload.crawl_speed or "normal",
        user_agent_type=payload.user_agent_type or "desktop",
        status="running",
        start_time=datetime.now(timezone.utc),
        progress_percentage=15.0,
        pages_crawled=1
    )
    db.add(job)
    await db.flush()

    # Simulate immediate homepage crawl & evaluation
    fetched = await crawler_service.fetch_page(payload.target_url)
    parsed = crawler_service.parse_page_seo(
        url=payload.target_url,
        html=fetched.get("html", ""),
        status_code=fetched.get("status_code", 200),
        load_time_ms=fetched.get("load_time_ms", 120)
    )

    crawled_page = CrawledPage(
        crawl_job_id=job.id,
        url=parsed["url"],
        status_code=parsed["status_code"],
        content_type="text/html",
        load_time_ms=parsed["load_time_ms"],
        depth=0,
        title=parsed["title"],
        title_length=parsed["title_length"],
        meta_description=parsed["meta_description"],
        meta_description_length=parsed["meta_description_length"],
        h1_count=parsed["h1_count"],
        h1_content=parsed["h1_content"],
        word_count=parsed["word_count"],
        canonical_url=parsed["canonical_url"],
        is_indexable=parsed["is_indexable"],
        images_count=parsed["images_count"],
        images_missing_alt=parsed["images_missing_alt"],
        internal_links_count=parsed["internal_links_count"],
        external_links_count=parsed["external_links_count"],
        structured_data_types=parsed["structured_data_types"]
    )
    db.add(crawled_page)
    await db.flush()

    # Evaluate Issues
    issues_list = audit_engine.evaluate_page(parsed)
    scores = audit_engine.calculate_scores(issues_list, total_pages=1)

    report = AuditReport(
        crawl_job_id=job.id,
        overall_seo_score=scores["overall_seo_score"],
        technical_score=scores["technical_score"],
        performance_score=scores["performance_score"],
        content_score=scores["content_score"],
        accessibility_score=scores["accessibility_score"],
        security_score=scores["security_score"],
        critical_issues_count=scores["critical_issues_count"],
        high_issues_count=scores["high_issues_count"],
        medium_issues_count=scores["medium_issues_count"],
        low_issues_count=scores["low_issues_count"],
        passed_checks_count=scores["passed_checks_count"]
    )
    db.add(report)
    await db.flush()

    for issue_item in issues_list:
        seo_issue = SEOIssue(
            audit_report_id=report.id,
            crawled_page_id=crawled_page.id,
            page_url=issue_item["page_url"],
            category=issue_item["category"],
            severity=issue_item["severity"],
            title=issue_item["title"],
            description=issue_item["description"],
            recommendation=issue_item["recommendation"],
            estimated_impact=issue_item["estimated_impact"],
            ai_fix_prompt=issue_item.get("ai_fix_prompt")
        )
        db.add(seo_issue)

    job.status = "completed"
    job.progress_percentage = 100.0
    job.end_time = datetime.now(timezone.utc)
    await db.commit()

    return success_response(
        data={
            "job_id": str(job.id),
            "report_id": str(report.id),
            "status": job.status,
            "overall_seo_score": report.overall_seo_score,
            "issues_count": len(issues_list)
        },
        message="SEO Audit crawl initiated and evaluated successfully",
        status_code=201
    )

@router.get("/crawl/{job_id}/status")
async def get_crawl_status(
    job_id: UUID,
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(CrawlJob).where(CrawlJob.id == job_id, CrawlJob.organization_id == current_org.id))
    job = res.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=404, detail="Crawl job not found")

    return success_response(data={
        "job_id": str(job.id),
        "target_url": job.target_url,
        "status": job.status,
        "progress_percentage": job.progress_percentage,
        "pages_crawled": job.pages_crawled,
        "start_time": job.start_time.isoformat() if job.start_time else None,
        "end_time": job.end_time.isoformat() if job.end_time else None
    })

@router.post("/crawl/{job_id}/pause")
async def pause_crawl(job_id: UUID, db: AsyncSession = Depends(get_db)):
    await db.execute(update(CrawlJob).where(CrawlJob.id == job_id).values(status="paused"))
    await db.commit()
    return success_response(message="Crawl job paused")

@router.post("/crawl/{job_id}/cancel")
async def cancel_crawl(job_id: UUID, db: AsyncSession = Depends(get_db)):
    await db.execute(update(CrawlJob).where(CrawlJob.id == job_id).values(status="cancelled"))
    await db.commit()
    return success_response(message="Crawl job cancelled")

@router.get("/reports/latest")
async def get_latest_report(
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(
        select(AuditReport, CrawlJob)
        .join(CrawlJob, AuditReport.crawl_job_id == CrawlJob.id)
        .where(CrawlJob.organization_id == current_org.id)
        .order_by(desc(AuditReport.created_at))
        .limit(1)
    )
    row = res.first()
    if not row:
        return success_response(data=None, message="No audit reports found for active tenant")

    report, job = row
    return success_response(data={
        "report_id": str(report.id),
        "job_id": str(job.id),
        "target_url": job.target_url,
        "overall_seo_score": report.overall_seo_score,
        "technical_score": report.technical_score,
        "performance_score": report.performance_score,
        "content_score": report.content_score,
        "accessibility_score": report.accessibility_score,
        "security_score": report.security_score,
        "critical_issues_count": report.critical_issues_count,
        "high_issues_count": report.high_issues_count,
        "medium_issues_count": report.medium_issues_count,
        "low_issues_count": report.low_issues_count,
        "passed_checks_count": report.passed_checks_count,
        "created_at": report.created_at.isoformat()
    })

@router.get("/reports/{report_id}/issues")
async def list_report_issues(
    report_id: UUID,
    severity: Optional[str] = None,
    category: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(SEOIssue).where(SEOIssue.audit_report_id == report_id)
    if severity:
        query = query.where(SEOIssue.severity == severity)
    if category:
        query = query.where(SEOIssue.category == category)

    res = await db.execute(query)
    issues = res.scalars().all()
    return success_response(data=[{
        "id": str(i.id),
        "page_url": i.page_url,
        "category": i.category,
        "severity": i.severity,
        "title": i.title,
        "description": i.description,
        "recommendation": i.recommendation,
        "estimated_impact": i.estimated_impact,
        "ai_fix_prompt": i.ai_fix_prompt
    } for i in issues])

@router.get("/pages/{page_id}")
async def get_page_details(page_id: UUID, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(CrawledPage).where(CrawledPage.id == page_id))
    page = res.scalar_one_or_none()
    if not page:
        raise HTTPException(status_code=404, detail="Crawled page not found")

    return success_response(data={
        "id": str(page.id),
        "url": page.url,
        "status_code": page.status_code,
        "content_type": page.content_type,
        "load_time_ms": page.load_time_ms,
        "depth": page.depth,
        "title": page.title,
        "title_length": page.title_length,
        "meta_description": page.meta_description,
        "meta_description_length": page.meta_description_length,
        "h1_count": page.h1_count,
        "h1_content": page.h1_content,
        "word_count": page.word_count,
        "canonical_url": page.canonical_url,
        "is_indexable": page.is_indexable,
        "images_count": page.images_count,
        "images_missing_alt": page.images_missing_alt,
        "internal_links_count": page.internal_links_count,
        "external_links_count": page.external_links_count,
        "structured_data_types": page.structured_data_types
    })
