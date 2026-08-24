try:
    from fastapi import APIRouter
except ImportError:
    APIRouter = lambda *args, **kwargs: None

router = APIRouter(prefix="/mobile/v1", tags=["Mobile App API (iOS / Android / Flutter)"])

@router.get("/summary")
async def get_mobile_summary():
    return {
        "status": "success",
        "data": {
            "monitored_websites": 8,
            "tracked_keywords": 1240,
            "avg_health_score": 92,
            "ranking_changes_today": {
                "improved": 14,
                "declined": 3,
                "unchanged": 123
            },
            "recent_alerts": [
                {"title": "Organic traffic spike on acme.com", "time": "2 hours ago", "type": "traffic_surge"},
                {"title": "Audit score increased to 94%", "time": "5 hours ago", "type": "audit_passed"}
            ]
        }
    }
