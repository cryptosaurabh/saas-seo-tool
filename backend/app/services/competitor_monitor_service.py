from typing import List, Dict, Any

class CompetitorMonitorService:
    def compare_competitors(self, your_domain: str, competitors: List[str]) -> List[Dict[str, Any]]:
        results = [
            {"domain": your_domain, "visibility_score": 84.5, "avg_position": 4.2, "top3_keywords": 42, "share_of_voice": "44%"},
            {"domain": competitors[0] if len(competitors) > 0 else "ahrefs.com", "visibility_score": 78.2, "avg_position": 5.8, "top3_keywords": 35, "share_of_voice": "32%"},
            {"domain": competitors[1] if len(competitors) > 1 else "semrush.com", "visibility_score": 62.0, "avg_position": 8.4, "top3_keywords": 21, "share_of_voice": "24%"}
        ]
        return results

competitor_monitor_service = CompetitorMonitorService()
