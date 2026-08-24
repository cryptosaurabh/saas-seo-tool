from typing import List, Dict, Any, Optional

class KeywordResearchService:
    def classify_intent(self, keyword: str) -> Dict[str, Any]:
        kw = keyword.lower()
        if any(w in kw for w in ["buy", "price", "cost", "cheap", "order", "discount", "coupon"]):
            return {"intent": "transactional", "confidence": 0.98}
        elif any(w in kw for w in ["best", "top", "vs", "review", "comparison", "alternative"]):
            return {"intent": "commercial", "confidence": 0.95}
        elif any(w in kw for w in ["login", "sign in", "portal", "website", "official site"]):
            return {"intent": "navigational", "confidence": 0.96}
        else:
            return {"intent": "informational", "confidence": 0.92}

    def generate_keyword_metrics(self, keyword: str, country: str = "US", engine: str = "google") -> Dict[str, Any]:
        intent_info = self.classify_intent(keyword)
        
        # Hash seed for consistent deterministic demo metrics
        seed = sum(ord(c) for c in keyword)
        volume = ((seed * 142) % 45000) + 1200
        kd = (seed * 37) % 85 + 10
        cpc = round(((seed * 19) % 1500) / 100.0, 2)
        
        features = ["people_also_ask"]
        if kd > 40:
            features.append("featured_snippet")
        if intent_info["intent"] == "commercial":
            features.append("reviews")
        if intent_info["intent"] == "transactional":
            features.append("shopping")

        trend = [int(volume * (0.8 + ((i * seed) % 40) / 100.0)) for i in range(12)]

        return {
            "keyword": keyword,
            "country": country,
            "engine": engine,
            "search_volume": volume,
            "keyword_difficulty": kd,
            "cpc": cpc,
            "competition_level": "High" if kd > 65 else "Medium" if kd > 35 else "Low",
            "search_intent": intent_info["intent"],
            "intent_confidence": intent_info["confidence"],
            "serp_features": features,
            "trend": trend
        }

    def generate_keyword_variations(self, keyword: str) -> Dict[str, List[Dict[str, Any]]]:
        metrics_base = self.generate_keyword_metrics(keyword)
        
        related = [
            {"keyword": f"best {keyword}", "search_volume": int(metrics_base["search_volume"] * 0.7), "kd": max(10, metrics_base["keyword_difficulty"] - 12), "cpc": metrics_base["cpc"], "intent": "commercial"},
            {"keyword": f"{keyword} software", "search_volume": int(metrics_base["search_volume"] * 0.5), "kd": metrics_base["keyword_difficulty"], "cpc": metrics_base["cpc"] + 1.5, "intent": "commercial"},
            {"keyword": f"{keyword} free trial", "search_volume": int(metrics_base["search_volume"] * 0.3), "kd": max(15, metrics_base["keyword_difficulty"] - 20), "cpc": metrics_base["cpc"] + 0.8, "intent": "transactional"},
            {"keyword": f"how to use {keyword}", "search_volume": int(metrics_base["search_volume"] * 0.4), "kd": max(10, metrics_base["keyword_difficulty"] - 25), "cpc": 0.50, "intent": "informational"}
        ]

        questions = [
            {"keyword": f"what is {keyword}?", "search_volume": int(metrics_base["search_volume"] * 0.6), "kd": max(10, metrics_base["keyword_difficulty"] - 30), "intent": "informational"},
            {"keyword": f"how much does {keyword} cost?", "search_volume": int(metrics_base["search_volume"] * 0.25), "kd": max(15, metrics_base["keyword_difficulty"] - 15), "intent": "commercial"},
            {"keyword": f"why use {keyword} for agency?", "search_volume": int(metrics_base["search_volume"] * 0.15), "kd": max(10, metrics_base["keyword_difficulty"] - 20), "intent": "informational"}
        ]

        return {
            "related": related,
            "questions": questions
        }

keyword_research_service = KeywordResearchService()
