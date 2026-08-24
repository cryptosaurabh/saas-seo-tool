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
from app.models.ai_agent import AIConversation, AIMessage, AIRecommendation, AITask, AIWorkflow
from app.schemas.ai_agent import AIChatRequest, AIWorkflowCreateRequest
from app.services.ai_agent_service import ai_agent_service
from app.services.workflow_automation_service import workflow_automation_service
from app.utils.response import success_response, error_response

router = APIRouter(prefix="/ai", tags=["AI SEO Agent & Automation Engine"])

@router.post("/chat")
async def chat_with_ai_agent(payload: AIChatRequest):
    res = ai_agent_service.generate_chat_response(payload.message)
    return success_response(data=res)

@router.get("/recommendations")
async def get_ai_recommendations():
    recs = ai_agent_service.get_daily_recommendations()
    return success_response(data=recs)

@router.post("/tasks/generate")
async def generate_task_from_recommendation(recommendation_id: str):
    return success_response(
        data={"task_id": "task-102", "title": "Fix Duplicate Meta Titles", "status": "todo"},
        message="Recommendation converted into actionable task",
        status_code=201
    )

@router.get("/workflows")
async def list_ai_workflows():
    workflows = [
        {"id": "wf-1", "name": "Post-Crawl Task Generator", "trigger_event": "crawl_finished", "actions": ["Generate AI Summary", "Create Tasks", "Notify Team"], "is_active": True},
        {"id": "wf-2", "name": "Rank Drop Rescue Workflow", "trigger_event": "rank_dropped", "actions": ["Analyze SERP Changes", "Create Optimization Plan", "Send Alert"], "is_active": True}
    ]
    return success_response(data=workflows)

@router.post("/workflows")
async def create_ai_workflow(payload: AIWorkflowCreateRequest):
    return success_response(
        data={"name": payload.name, "trigger_event": payload.trigger_event, "actions": payload.action_steps},
        message="Workflow automation created successfully",
        status_code=201
    )

@router.get("/prompts")
async def get_prompt_library():
    prompts = [
        {"id": "1", "category": "Technical SEO", "title": "Core Web Vitals LCP Optimization Prompt", "prompt_text": "Analyze LCP render delays and provide step-by-step image compression and CSS deferral rules."},
        {"id": "2", "category": "Content Writing", "title": "EEAT Authoritativeness Expansion Prompt", "prompt_text": "Draft a expert author bio and citation section following Google Search Quality Rater Guidelines."},
        {"id": "3", "category": "Schema", "title": "JSON-LD FAQ & Organization Schema Prompt", "prompt_text": "Generate valid schema.org JSON-LD code for FAQ and Organization with social profiles."}
    ]
    return success_response(data=prompts)
