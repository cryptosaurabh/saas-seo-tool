from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import re

from app.database.session import get_db
from app.auth.deps import get_current_user, get_current_tenant_org, PermissionChecker
from app.models.user import User
from app.models.organization import Organization
from app.models.workspace import Workspace, Project, Website
from app.models.rbac import TeamMember, Role
from app.schemas.organization import OrganizationCreate, WorkspaceCreate, ProjectCreate
from app.utils.response import success_response, error_response

router = APIRouter(prefix="/organizations", tags=["Organizations & Workspaces"])

def slugify(text: str) -> str:
    return re.sub(r'[\W_]+', '-', text.lower()).strip('-')

@router.get("")
async def list_user_organizations(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Organization)
        .join(TeamMember, TeamMember.organization_id == Organization.id)
        .where(TeamMember.user_id == current_user.id)
    )
    orgs = result.scalars().all()
    org_list = [
        {
            "id": str(o.id),
            "name": o.name,
            "slug": o.slug,
            "plan_tier": o.plan_tier,
            "is_owner": o.owner_id == current_user.id
        }
        for o in orgs
    ]
    return success_response(data=org_list)

@router.post("")
async def create_organization(
    payload: OrganizationCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    slug = slugify(payload.name)
    org = Organization(name=payload.name, slug=slug, owner_id=current_user.id)
    db.add(org)
    await db.flush()

    role_res = await db.execute(select(Role).where(Role.name == "Agency Owner"))
    agency_role = role_res.scalar_one()

    team_member = TeamMember(organization_id=org.id, user_id=current_user.id, role_id=agency_role.id)
    db.add(team_member)
    await db.commit()

    return success_response(
        data={"id": str(org.id), "name": org.name, "slug": org.slug},
        message="Organization created successfully",
        status_code=201
    )

@router.get("/workspaces")
async def list_workspaces(
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Workspace).where(Workspace.organization_id == current_org.id))
    workspaces = result.scalars().all()
    return success_response(data=[{"id": str(w.id), "name": w.name, "slug": w.slug, "description": w.description} for w in workspaces])

@router.post("/workspaces")
async def create_workspace(
    payload: WorkspaceCreate,
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    slug = slugify(payload.name)
    ws = Workspace(organization_id=current_org.id, name=payload.name, slug=slug, description=payload.description)
    db.add(ws)
    await db.commit()
    return success_response(data={"id": str(ws.id), "name": ws.name, "slug": ws.slug}, message="Workspace created", status_code=201)

@router.get("/projects")
async def list_projects(
    workspace_id: Optional[UUID] = None,
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    query = select(Project).join(Workspace, Project.workspace_id == Workspace.id).where(Workspace.organization_id == current_org.id)
    if workspace_id:
        query = query.where(Project.workspace_id == workspace_id)
    result = await db.execute(query)
    projects = result.scalars().all()
    return success_response(data=[{"id": str(p.id), "workspace_id": str(p.workspace_id), "name": p.name, "target_domain": p.target_domain} for p in projects])

@router.post("/projects")
async def create_project(
    payload: ProjectCreate,
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    proj = Project(workspace_id=payload.workspace_id, name=payload.name, target_domain=payload.target_domain)
    db.add(proj)
    await db.commit()
    return success_response(data={"id": str(proj.id), "name": proj.name, "target_domain": proj.target_domain}, message="Project created", status_code=201)
