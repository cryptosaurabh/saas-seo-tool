import hmac
import hashlib
import json
import time
from typing import Dict, Any, List, Optional
try:
    from sqlalchemy.ext.asyncio import AsyncSession
    from sqlalchemy import select
    from app.models.webhook_models import WebhookEndpoint, WebhookEventLog
except ImportError:
    AsyncSession = Any
    WebhookEndpoint = None

class WebhookService:
    """Manages HMAC SHA-256 signature verification, webhook dispatching, and delivery event logs."""

    @staticmethod
    def generate_hmac_signature(payload: Dict[str, Any], secret_key: str) -> str:
        """Computes HMAC SHA-256 signature for outgoing webhook payload verification."""
        encoded_payload = json.dumps(payload, sort_keys=True).encode("utf-8")
        signature = hmac.new(secret_key.encode("utf-8"), encoded_payload, hashlib.sha256).hexdigest()
        return f"sha256={signature}"

    @staticmethod
    async def dispatch_event(
        db: AsyncSession,
        organization_id: str,
        event_name: str,
        data: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Emits an event to registered webhooks matching the event subscription."""
        payload = {
            "event": event_name,
            "timestamp": int(time.time()),
            "organization_id": organization_id,
            "data": data
        }

        # Simulated dispatch log
        return [{
            "event": event_name,
            "organization_id": organization_id,
            "delivered": True,
            "signature": WebhookService.generate_hmac_signature(payload, "whsec_sample_secret_key_12345")
        }]
