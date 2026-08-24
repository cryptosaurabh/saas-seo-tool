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
from app.models.content import Article, ArticleDraft, EEATAudit, ContentCalendarEvent
from app.schemas.content import (
    ArticleGenerateRequest,
    ArticleOptimizeRequest,
    ArticleRewriteRequest
)
from app.services.content_generator_service import content_generator_service
from app.services.eeat_analyzer_service import eeat_analyzer_service
from app.services.nlp_optimizer_service import nlp_optimizer_service
from app.utils.response import success_response, error_response

router = APIRouter(prefix="/content", tags=["AI Content Writer & EEAT Engine"])

@router.post("/generate")
async def generate_article(
    payload: ArticleGenerateRequest,
    current_user: User = Depends(get_current_user),
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    gen = content_generator_service.generate_article(
        primary_keyword=payload.primary_keyword,
        article_type=payload.article_type or "blog",
        writing_tone=payload.writing_tone or "professional",
        target_word_count=payload.target_word_count or 2400
    )

    eeat = eeat_analyzer_service.evaluate_eeat(gen["content_markdown"], author=current_user.full_name)
    nlp = nlp_optimizer_service.analyze_readability(gen["content_markdown"])

    article = Article(
        organization_id=current_org.id,
        title=gen["title"],
        slug=gen["slug"],
        primary_keyword=payload.primary_keyword,
        secondary_keywords_json=payload.secondary_keywords or [],
        article_type=payload.article_type or "blog",
        writing_tone=payload.writing_tone or "professional",
        target_word_count=payload.target_word_count or 2400,
        actual_word_count=gen["actual_word_count"],
        content_markdown=gen["content_markdown"],
        content_html=gen["content_html"],
        meta_title=gen["meta_title"],
        meta_description=gen["meta_description"],
        content_score=nlp["content_score"],
        readability_score=nlp["readability_score"],
        eeat_score=eeat["overall_eeat_score"],
        status="draft",
        author_name=current_user.full_name or "SEOPilot AI"
    )
    db.add(article)
    await db.flush()

    eeat_record = EEATAudit(
        article_id=article.id,
        experience_score=eeat["experience_score"],
        expertise_score=eeat["expertise_score"],
        authority_score=eeat["authority_score"],
        trust_score=eeat["trust_score"],
        recommendations_json=eeat["recommendations"]
    )
    db.add(eeat_record)
    await db.commit()

    return success_response(
        data={
            "id": str(article.id),
            "title": article.title,
            "slug": article.slug,
            "content_markdown": article.content_markdown,
            "meta_title": article.meta_title,
            "meta_description": article.meta_description,
            "content_score": article.content_score,
            "readability_score": article.readability_score,
            "eeat_score": article.eeat_score,
            "faq_items": gen["faq_items"],
            "schema_json": gen["schema_json"]
        },
        message="AI Article generated successfully",
        status_code=201
    )

@router.post("/optimize")
async def optimize_content(payload: ArticleOptimizeRequest):
    eeat = eeat_analyzer_service.evaluate_eeat(payload.content_markdown, author=payload.author_name or "Author")
    nlp = nlp_optimizer_service.analyze_readability(payload.content_markdown)

    return success_response(data={
        "content_score": nlp["content_score"],
        "readability_score": nlp["readability_score"],
        "eeat_score": eeat["overall_eeat_score"],
        "word_count": nlp["word_count"],
        "avg_sentence_length": nlp["avg_sentence_length"],
        "passive_voice_percentage": nlp["passive_voice_percentage"],
        "entities": nlp["entities_detected"],
        "eeat_breakdown": {
            "experience": eeat["experience_score"],
            "expertise": eeat["expertise_score"],
            "authority": eeat["authority_score"],
            "trust": eeat["trust_score"],
            "recommendations": eeat["recommendations"]
        }
    })

@router.post("/rewrite")
async def rewrite_content(payload: ArticleRewriteRequest):
    rewritten = f"**Optimized**: {payload.text} (Refactored for maximum search engagement and technical clarity)."
    return success_response(data={
        "mode": payload.mode,
        "original": payload.text,
        "rewritten": rewritten
    })

@router.get("/articles")
async def list_articles(
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(Article).where(Article.organization_id == current_org.id).order_by(desc(Article.created_at)))
    articles = res.scalars().all()
    return success_response(data=[{
        "id": str(a.id),
        "title": a.title,
        "slug": a.slug,
        "primary_keyword": a.primary_keyword,
        "article_type": a.article_type,
        "actual_word_count": a.actual_word_count,
        "content_score": a.content_score,
        "eeat_score": a.eeat_score,
        "status": a.status,
        "author_name": a.author_name,
        "created_at": a.created_at.isoformat()
    } for a in articles])

@router.get("/calendar")
async def get_content_calendar(current_org: Organization = Depends(get_current_tenant_org)):
    events = [
        {"id": "1", "title": "Technical SEO Crawling Best Practices", "scheduled_date": "2026-07-28", "status": "scheduled", "author": "Alex Mercer"},
        {"id": "2", "title": "AI Keyword Clustering Masterclass", "scheduled_date": "2026-08-02", "status": "draft", "author": "Sarah Jenkins"}
    ]
    return success_response(data=events)
