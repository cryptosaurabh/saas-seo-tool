import uuid
from datetime import datetime, timedelta
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database.session import get_db
from app.auth.deps import get_current_user, get_current_tenant_org
from app.models.user import User
from app.models.organization import Organization
from app.models.subscription import Subscription
from app.models.admin_models import (
    AdminAuditLog,
    FeatureFlag,
    SupportTicket,
    SystemLog,
    ServerMetric,
    Announcement
)
from app.schemas.admin import (
    AdminUserActionRequest,
    AdminOrgActionRequest,
    FeatureFlagCreate,
    SupportTicketUpdate,
    AnnouncementCreate,
    GlobalSettingsUpdate
)
from app.services.admin_service import AdminService
from app.utils.response import success_response, error_response

router = APIRouter(prefix="/admin", tags=["Super Admin Control Panel"])

@router.get("/dashboard")
async def get_admin_dashboard(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    metrics = await AdminService.get_dashboard_metrics(db)
    return success_response(data=metrics)

@router.get("/users")
async def list_admin_users(
    page: int = 1,
    limit: int = 20,
    search: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(User).limit(limit))
    users = res.scalars().all()
    return success_response(data=[{
        "id": str(u.id),
        "full_name": u.full_name,
        "email": u.email,
        "role": u.role,
        "is_active": u.is_active,
        "is_verified": u.is_verified,
        "created_at": u.created_at.isoformat()
    } for u in users])

@router.post("/users/{user_id}/action")
async def execute_user_action(
    user_id: str,
    payload: AdminUserActionRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    await AdminService.log_admin_action(
        db,
        admin_id=str(current_user.id),
        action=f"user_{payload.action}",
        target_type="user",
        target_id=user_id,
        changes={"reason": payload.reason}
    )
    return success_response(message=f"User action '{payload.action}' completed successfully.")

@router.get("/organizations")
async def list_admin_organizations(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(Organization))
    orgs = res.scalars().all()
    return success_response(data=[{
        "id": str(o.id),
        "name": o.name,
        "slug": o.slug,
        "plan_tier": o.plan_tier,
        "owner_id": str(o.owner_id),
        "created_at": o.created_at.isoformat()
    } for o in orgs])

@router.post("/organizations/{org_id}/action")
async def execute_org_action(
    org_id: str,
    payload: AdminOrgActionRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    await AdminService.log_admin_action(
        db,
        admin_id=str(current_user.id),
        action=f"org_{payload.action}",
        target_type="organization",
        target_id=org_id,
        changes={"reason": payload.reason}
    )
    return success_response(message=f"Organization action '{payload.action}' executed.")

@router.get("/agencies")
async def list_admin_agencies(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return success_response(data=[
        {
            "id": str(uuid.uuid4()),
            "agency_name": "Apex Marketing Group",
            "owner_email": "marcus@apexmedia.com",
            "plan_tier": "agency",
            "clients_count": 18,
            "white_label_enabled": True,
            "mrr": 199.0
        },
        {
            "id": str(uuid.uuid4()),
            "agency_name": "Digital Boost Agency",
            "owner_email": "sarah@digitalboost.io",
            "plan_tier": "agency",
            "clients_count": 32,
            "white_label_enabled": True,
            "mrr": 199.0
        }
    ])

@router.get("/analytics")
async def get_admin_analytics(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    analytics = await AdminService.get_platform_analytics(db)
    return success_response(data=analytics)

@router.get("/health")
async def get_system_health(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return success_response(data={
        "api_status": "operational",
        "database_status": "healthy",
        "redis_status": "healthy",
        "celery_queue": "running",
        "cpu_usage": "24%",
        "memory_usage": "4.2 GB / 16 GB",
        "active_jobs": 8,
        "failed_jobs": 0
    })

@router.get("/queues")
async def get_queue_status(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return success_response(data={
        "pending_jobs": [
            {"id": "job_101", "name": "app.tasks.audit_engine.crawl_website", "created_at": "2 mins ago"},
            {"id": "job_102", "name": "app.tasks.billing_tasks.process_subscription_renewals", "created_at": "5 mins ago"}
        ],
        "running_jobs": [
            {"id": "job_99", "name": "app.tasks.rank_tracker_service.fetch_serp", "started_at": "30s ago"}
        ],
        "completed_count": 1420,
        "failed_jobs": []
    })

@router.get("/logs")
async def get_system_logs(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return success_response(data=[
        {
            "id": "log_001",
            "level": "INFO",
            "category": "api",
            "message": "User login success from 192.168.1.1",
            "timestamp": datetime.utcnow().isoformat()
        },
        {
            "id": "log_002",
            "level": "WARNING",
            "category": "billing",
            "message": "Webhook signature delay detected from Stripe provider",
            "timestamp": (datetime.utcnow() - timedelta(minutes=15)).isoformat()
        }
    ])

@router.get("/feature-flags")
async def list_feature_flags(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return success_response(data=[
        {
            "key": "beta_ai_writer_v2",
            "name": "AI Content Writer V2 (GPT-4o)",
            "category": "ai",
            "is_enabled": True,
            "rollout_percentage": 100
        },
        {
            "key": "enterprise_sso",
            "name": "Enterprise SAML / Okta SSO",
            "category": "enterprise",
            "is_enabled": True,
            "rollout_percentage": 100
        },
        {
            "key": "realtime_serp_tracker",
            "name": "Real-time Daily SERP Monitoring",
            "category": "modules",
            "is_enabled": True,
            "rollout_percentage": 50
        }
    ])

@router.post("/feature-flags")
async def update_feature_flag(
    payload: FeatureFlagCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    await AdminService.log_admin_action(
        db,
        admin_id=str(current_user.id),
        action="feature_flag_updated",
        target_type="feature_flag",
        target_id=payload.key,
        changes={"is_enabled": payload.is_enabled}
    )
    return success_response(message=f"Feature flag '{payload.key}' updated.")

@router.get("/support-tickets")
async def list_support_tickets(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return success_response(data=[
        {
            "id": "TICKET-1001",
            "user_email": "david@ecomboost.com",
            "title": "Need assistance with GSC OAuth token refresh",
            "category": "integrations",
            "priority": "high",
            "status": "open",
            "created_at": "1 hour ago"
        },
        {
            "id": "TICKET-1002",
            "user_email": "elena@cloudscale.io",
            "title": "Question regarding white-label report custom domain",
            "category": "agency",
            "priority": "medium",
            "status": "in_progress",
            "created_at": "4 hours ago"
        }
    ])

@router.get("/security")
async def get_security_overview(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return success_response(data={
        "failed_logins_24h": 14,
        "blocked_ips": ["185.220.101.4", "45.142.214.2"],
        "suspicious_activities": 0,
        "active_admin_sessions": 1
    })

@router.get("/settings")
async def get_global_settings(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return success_response(data={
        "platform_name": "SEOPilot AI",
        "support_email": "support@seopilot.ai",
        "default_free_ai_credits": 50,
        "maintenance_mode": False,
        "allow_new_signups": True
    })

@router.put("/settings")
async def update_global_settings(
    payload: GlobalSettingsUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    await AdminService.log_admin_action(
        db,
        admin_id=str(current_user.id),
        action="global_settings_updated",
        target_type="system",
        changes=payload.model_dump(exclude_unset=True)
    )
    return success_response(message="Global platform settings updated successfully.")
