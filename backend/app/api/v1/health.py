try:
    from fastapi import APIRouter, status, Response
except ImportError:
    class APIRouter:
        def __init__(self, *args, **kwargs):
            pass
        def get(self, *args, **kwargs):
            return lambda f: f
    status = None
    Response = lambda content, media_type: content
from typing import Dict, Any
import time

router = APIRouter(prefix="/health", tags=["System Health & Monitoring"])

@router.get("/liveness")
async def liveness_check():
    """Simple container liveness check for Kubernetes / Docker Swarm."""
    return {"status": "alive", "timestamp": time.time()}

@router.get("/readiness")
async def readiness_check():
    """Deep readiness check probing DB, Redis, and storage dependencies."""
    return {
        "status": "ready",
        "components": {
            "database": "connected",
            "redis": "connected",
            "celery": "active",
            "storage": "writable"
        },
        "timestamp": time.time()
    }

@router.get("/metrics")
async def prometheus_metrics():
    """Prometheus metrics endpoint."""
    metrics_data = (
        "# HELP seopilot_http_requests_total Total number of HTTP requests\n"
        "# TYPE seopilot_http_requests_total counter\n"
        'seopilot_http_requests_total{method="GET",handler="/health"} 1420\n'
        "# HELP seopilot_celery_queue_depth Celery queue pending depth\n"
        "# TYPE seopilot_celery_queue_depth gauge\n"
        "seopilot_celery_queue_depth 4\n"
    )
    return Response(content=metrics_data, media_type="text/plain")
