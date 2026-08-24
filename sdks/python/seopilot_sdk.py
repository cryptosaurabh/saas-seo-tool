import urllib.request
import json
from typing import Dict, Any, Optional

class SEOPilotClient:
    """Official Python SDK for SEOPilot AI REST API."""

    def __init__(self, api_key: str, base_url: str = "https://api.seopilot.ai/api/v1"):
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")

    def _request(self, endpoint: str, method: str = "GET", payload: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        url = f"{self.base_url}{endpoint}"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        data = json.dumps(payload).encode("utf-8") if payload else None
        req = urllib.request.Request(url, data=data, headers=headers, method=method)
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode("utf-8"))

    def get_audit(self, audit_id: str) -> Dict[str, Any]:
        return self._request(f"/audit/{audit_id}")

    def get_rankings(self) -> Dict[str, Any]:
        return self._request("/rankings")

    def trigger_crawl(self, website_url: str) -> Dict[str, Any]:
        return self._request("/audit/crawl", method="POST", payload={"url": website_url})
