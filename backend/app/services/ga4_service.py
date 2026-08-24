from typing import List, Dict, Any

class GA4Service:
    def get_traffic_analytics(self, property_id: str = "GA4-3948201") -> Dict[str, Any]:
        return {
            "property_id": property_id,
            "active_users": 34200,
            "total_sessions": 48900,
            "new_users": 28400,
            "avg_engagement_time_sec": 142,
            "bounce_rate": 32.4,
            "channels": [
                {"name": "Organic Search", "sessions": 32100, "percentage": 65.6},
                {"name": "Direct Traffic", "sessions": 9800, "percentage": 20.0},
                {"name": "Referral Links", "sessions": 4200, "percentage": 8.6},
                {"name": "Social Media", "sessions": 2800, "percentage": 5.8}
            ]
        }

ga4_service = GA4Service()
