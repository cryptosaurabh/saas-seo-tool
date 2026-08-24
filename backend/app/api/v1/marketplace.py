import uuid
from typing import List, Optional
try:
    from fastapi import APIRouter
    from pydantic import BaseModel
except ImportError:
    APIRouter = lambda *args, **kwargs: None
    BaseModel = object

router = APIRouter(prefix="/marketplace", tags=["Plugin Marketplace & Extensions"])

class PluginInstallRequest(BaseModel):
    plugin_id: str
    configuration: Optional[dict] = {}

@router.get("/plugins")
async def list_marketplace_plugins():
    return {
        "status": "success",
        "data": [
            {
                "plugin_id": "google_search_console",
                "name": "Google Search Console Sync",
                "description": "Auto-sync impression, CTR, and search queries directly to SEOPilot dashboard.",
                "category": "integrations",
                "author": "SEOPilot Core Team",
                "is_official": True,
                "installs": 1420,
                "rating": 4.9,
                "installed": True
            },
            {
                "plugin_id": "slack_alerts",
                "name": "Slack SERP & Audit Alerts",
                "description": "Receive real-time Slack channel notifications when rank drop or crawl errors occur.",
                "category": "integrations",
                "author": "SEOPilot Core Team",
                "is_official": True,
                "installs": 890,
                "rating": 4.8,
                "installed": True
            },
            {
                "plugin_id": "eeat_ai_optimizer",
                "name": "E-E-A-T Quality Enhancer Prompt Pack",
                "description": "Pre-built prompt templates for Google Quality Rater guidelines compliance.",
                "category": "ai_prompts",
                "author": "SEO Master Community",
                "is_official": False,
                "installs": 650,
                "rating": 4.7,
                "installed": False
            }
        ]
    }

@router.post("/install")
async def install_plugin(payload: PluginInstallRequest):
    return {
        "status": "success",
        "message": f"Plugin '{payload.plugin_id}' installed successfully!"
    }
