from typing import Dict, Any

class PageSpeedService:
    def run_audit(self, target_url: str = "https://acmeagency.com", device: str = "desktop") -> Dict[str, Any]:
        return {
            "target_url": target_url,
            "device": device,
            "performance_score": 96 if device == "desktop" else 91,
            "accessibility_score": 100,
            "best_practices_score": 98,
            "seo_score": 100,
            "core_web_vitals": {
                "lcp": "1.2s (Passed)",
                "cls": "0.02 (Passed)",
                "inp": "45ms (Passed)",
                "fcp": "0.8s (Passed)",
                "ttfb": "120ms (Passed)"
            }
        }

pagespeed_service = PageSpeedService()
