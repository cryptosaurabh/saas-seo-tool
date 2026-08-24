from typing import List, Dict, Any

class AgencyService:
    def get_agency_overview(self) -> Dict[str, Any]:
        return {
            "total_clients": 12,
            "active_projects": 28,
            "monthly_reports_sent": 42,
            "team_members_count": 8,
            "agency_health_score": 94,
            "whitelabel_enabled": True
        }

    def get_client_dashboard_metrics(self, client_id: str) -> Dict[str, Any]:
        return {
            "client_id": client_id,
            "seo_score": 92,
            "organic_traffic": "48.5k / mo",
            "ranked_keywords": 1420,
            "total_backlinks": 14200,
            "recent_reports": [
                {"id": "rep-1", "title": "Monthly SEO Executive Summary", "date": "2026-07-01", "format": "PDF"},
                {"id": "rep-2", "title": "Technical Audit & Health Report", "date": "2026-06-15", "format": "PDF"}
            ]
        }

agency_service = AgencyService()
