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
from app.models.agency import AgencyClient, WhiteLabelSetting, ReportSchedule, AgencyTeamMember
from app.schemas.agency import CreateClientRequest, UpdateWhiteLabelRequest, ScheduleReportRequest
from app.services.agency_service import agency_service
from app.services.report_scheduler_service import report_scheduler_service
from app.utils.response import success_response, error_response

router = APIRouter(prefix="/agency", tags=["Agency Portal & White Label System"])

@router.get("/overview")
async def get_agency_overview(
    current_org: Organization = Depends(get_current_tenant_org)
):
    stats = agency_service.get_agency_overview()
    return success_response(data=stats)

@router.get("/clients")
async def list_agency_clients(
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    clients = [
        {"id": "1", "client_name": "Acme SaaS Corp", "company_name": "Acme Inc", "email": "contact@acme.com", "website_url": "https://acme.com", "industry": "SaaS", "seo_score": 94, "status": "active"},
        {"id": "2", "client_name": "Apex Digital Agency", "company_name": "Apex Group", "email": "hello@apex.io", "website_url": "https://apex.io", "industry": "Marketing", "seo_score": 88, "status": "active"}
    ]
    return success_response(data=clients)

@router.post("/clients")
async def create_agency_client(
    payload: CreateClientRequest,
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    client = AgencyClient(
        organization_id=current_org.id,
        client_name=payload.client_name,
        company_name=payload.company_name,
        email=payload.email,
        phone=payload.phone,
        website_url=payload.website_url,
        industry=payload.industry or "SaaS",
        country_code=payload.country_code or "US"
    )
    db.add(client)
    await db.commit()
    return success_response(message="New agency client onboarding complete", status_code=201)

@router.get("/clients/{client_id}/dashboard")
async def get_client_dashboard(client_id: str):
    data = agency_service.get_client_dashboard_metrics(client_id)
    return success_response(data=data)

@router.get("/whitelabel")
async def get_whitelabel_settings():
    settings = {
        "agency_name": "Apex SEO Agency",
        "logo_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120",
        "primary_color": "#4f46e5",
        "secondary_color": "#10b981",
        "custom_domain": "seo.apexagency.com",
        "is_verified": True
    }
    return success_response(data=settings)

@router.post("/whitelabel")
async def update_whitelabel_settings(payload: UpdateWhiteLabelRequest):
    return success_response(message="White Label branding configuration updated", status_code=200)

@router.get("/team")
async def list_agency_team_members():
    members = [
        {"id": "1", "name": "Yash Nathan", "email": "yash@apexagency.com", "role": "Agency Owner", "permissions": ["All Access"]},
        {"id": "2", "name": "Sarah Jenkins", "email": "sarah@apexagency.com", "role": "SEO Executive", "permissions": ["Run Audits", "Manage Clients", "Export Reports"]}
    ]
    return success_response(data=members)
