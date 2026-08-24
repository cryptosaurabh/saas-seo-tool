from typing import List, Dict, Any

class LinkBuildingService:
    def get_backlink_gap(self, your_domain: str, competitor_domain: str) -> List[Dict[str, Any]]:
        return [
            {"source_domain": "techcrunch.com", "dr": 94, "your_status": "Missing Link", "competitor_has": True, "opportunity": "Guest Article / Press Release"},
            {"source_domain": "producthunt.com", "dr": 90, "your_status": "Shared Link", "competitor_has": True, "opportunity": "High Priority Profile"},
            {"source_domain": "venturebeat.com", "dr": 91, "your_status": "Missing Link", "competitor_has": True, "opportunity": "Resource Page Inclusion"}
        ]

link_building_service = LinkBuildingService()
