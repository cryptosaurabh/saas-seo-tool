try:
    from fastapi import APIRouter
except ImportError:
    APIRouter = lambda *args, **kwargs: None

router = APIRouter(prefix="/search", tags=["Global Search"])

@router.get("")
async def global_search(q: str = ""):
    query = q.lower().strip()
    return {
        "status": "success",
        "query": query,
        "results": {
            "projects": [
                {"title": "Acme SaaS Main Site", "url": "/dashboard/projects/1", "type": "project"}
            ],
            "keywords": [
                {"title": "saas seo tool (Pos 2)", "url": "/dashboard/rankings", "type": "keyword"}
            ],
            "audits": [
                {"title": "Technical Audit Report #840 (Score 92%)", "url": "/dashboard/audit", "type": "audit"}
            ],
            "articles": [
                {"title": "Ultimate B2B SaaS Growth Checklist", "url": "/dashboard/content", "type": "article"}
            ]
        }
    }
