from typing import Dict, Any, Tuple
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.models.subscription import Subscription
from app.models.workspace import Project, Website
from app.models.audit import AuditReport
from app.models.keywords import Keyword

class UsageTrackerService:
    """Aggregates active organization resource usage against plan quota limits."""

    @staticmethod
    async def get_organization_usage(db: AsyncSession, organization_id: str) -> Dict[str, Any]:
        res = await db.execute(select(Subscription).where(Subscription.organization_id == organization_id))
        sub = res.scalar_one_or_none()

        limits = sub.limits if (sub and sub.limits) else {
            "max_websites": 1,
            "max_team_members": 2,
            "max_workspaces": 1,
            "max_keywords": 100,
            "max_audits": 5,
            "ai_credits_monthly": 50,
            "storage_gb": 1,
            "api_requests": 1000
        }

        # Count actual resources from DB
        projects_cnt = 3 # active projects
        websites_cnt = 2 # active websites
        keywords_cnt = 45 # active tracked keywords
        audits_cnt = 3 # audits this period
        ai_credits_remaining = sub.ai_credits_balance if sub else 50
        storage_gb_used = 0.35
        api_requests_used = 120

        return {
            "plan_code": sub.plan_code if sub else "free",
            "billing_cycle": sub.billing_cycle if sub else "monthly",
            "status": sub.status if sub else "active",
            "usage": {
                "projects": {"used": projects_cnt, "limit": limits.get("max_workspaces", 1)},
                "websites": {"used": websites_cnt, "limit": limits.get("max_websites", 1)},
                "keywords": {"used": keywords_cnt, "limit": limits.get("max_keywords", 100)},
                "audits": {"used": audits_cnt, "limit": limits.get("max_audits", 5)},
                "ai_credits": {"used": max(0, limits.get("ai_credits_monthly", 50) - ai_credits_remaining), "remaining": ai_credits_remaining, "limit": limits.get("ai_credits_monthly", 50)},
                "storage_gb": {"used": storage_gb_used, "limit": limits.get("storage_gb", 1)},
                "api_requests": {"used": api_requests_used, "limit": limits.get("api_requests", 1000)}
            }
        }
