from typing import List, Dict, Any

class GSCService:
    def get_search_performance(self, site_url: str = "https://acmeagency.com") -> Dict[str, Any]:
        return {
            "site_url": site_url,
            "total_clicks": 48500,
            "total_impressions": 1240000,
            "average_ctr": 3.9,
            "average_position": 4.2,
            "top_queries": [
                {"query": "seo audit software", "clicks": 8400, "impressions": 142000, "ctr": 5.9, "position": 1.2},
                {"query": "ai technical crawler", "clicks": 6200, "impressions": 98000, "ctr": 6.3, "position": 2.4},
                {"query": "keyword clustering tool", "clicks": 5100, "impressions": 84000, "ctr": 6.0, "position": 3.1}
            ],
            "index_coverage": {
                "valid": 485,
                "excluded": 12,
                "errors": 0,
                "warnings": 2
            }
        }

gsc_service = GSCService()
