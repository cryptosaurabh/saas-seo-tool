import uuid
from typing import List, Optional, Dict, Any
try:
    from fastapi import APIRouter, Depends, HTTPException
    from pydantic import BaseModel
except ImportError:
    APIRouter = lambda *args, **kwargs: None
    Depends = lambda f: f
    HTTPException = Exception
    BaseModel = object

router = APIRouter(prefix="/webhooks", tags=["Webhooks & Event Subscriptions"])

class WebhookCreateRequest(BaseModel):
    target_url: str
    description: Optional[str] = None
    subscribed_events: List[str] = ["audit.completed", "ranking.changed", "payment.completed"]

@router.get("")
async def list_webhooks():
    return {
        "status": "success",
        "data": [
            {
                "id": "wh_101",
                "target_url": "https://api.acmeagency.com/webhooks/seopilot",
                "secret_key": "whsec_89f021bc4a12",
                "description": "Production Slack & CRM Sync Webhook",
                "subscribed_events": ["audit.completed", "ranking.changed", "payment.completed"],
                "is_active": True,
                "failure_count": 0
            }
        ]
    }

@router.post("")
async def create_webhook(payload: WebhookCreateRequest):
    return {
        "status": "success",
        "message": "Webhook endpoint registered successfully",
        "data": {
            "id": f"wh_{uuid.uuid4().hex[:8]}",
            "target_url": payload.target_url,
            "secret_key": f"whsec_{uuid.uuid4().hex[:16]}",
            "description": payload.description,
            "subscribed_events": payload.subscribed_events,
            "is_active": True
        }
    }

@router.post("/{webhook_id}/test")
async def test_webhook(webhook_id: str):
    return {
        "status": "success",
        "message": f"Test ping event dispatched to webhook {webhook_id}",
        "http_status": 200,
        "signature_sent": "sha256=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    }

@router.get("/logs")
async def get_webhook_logs():
    return {
        "status": "success",
        "data": [
            {
                "id": "log_501",
                "event_name": "audit.completed",
                "http_status": 200,
                "status": "delivered",
                "delivered_at": "10 mins ago"
            }
        ]
    }
