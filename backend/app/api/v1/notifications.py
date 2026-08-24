from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, desc
from datetime import datetime, timezone

from app.database.session import get_db
from app.auth.deps import get_current_user, get_current_tenant_org
from app.models.user import User
from app.models.organization import Organization
from app.models.notification import Notification, AuditLog
from app.utils.response import success_response

router = APIRouter(prefix="", tags=["Notifications & Audit Logs"])

@router.get("/notifications")
async def list_notifications(
    current_user: User = Depends(get_current_user),
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(
        select(Notification)
        .where(Notification.organization_id == current_org.id, Notification.user_id == current_user.id)
        .order_by(desc(Notification.created_at))
        .limit(20)
    )
    items = res.scalars().all()
    return success_response(data=[{
        "id": str(n.id),
        "title": n.title,
        "message": n.message,
        "category": n.category,
        "read": n.read_at is not None,
        "created_at": n.created_at.isoformat()
    } for n in items])

@router.post("/notifications/read-all")
async def mark_notifications_read(
    current_user: User = Depends(get_current_user),
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    await db.execute(
        update(Notification)
        .where(Notification.organization_id == current_org.id, Notification.user_id == current_user.id, Notification.read_at.is_(None))
        .values(read_at=datetime.now(timezone.utc))
    )
    await db.commit()
    return success_response(message="All notifications marked as read")

@router.get("/audit-logs")
async def list_audit_logs(
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(
        select(AuditLog)
        .where(AuditLog.organization_id == current_org.id)
        .order_by(desc(AuditLog.created_at))
        .limit(50)
    )
    logs = res.scalars().all()
    return success_response(data=[{
        "id": str(l.id),
        "action": l.action,
        "resource": l.resource,
        "ip_address": l.ip_address,
        "user_agent": l.user_agent,
        "created_at": l.created_at.isoformat()
    } for l in logs])
