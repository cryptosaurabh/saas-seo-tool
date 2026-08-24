from typing import List, Dict, Any

class RankTrackerService:
    def calculate_visibility_score(self, keywords: List[Dict[str, Any]]) -> Dict[str, Any]:
        if not keywords:
            return {"visibility_score": 0.0, "avg_position": 0.0}

        total_score = 0.0
        total_pos = 0

        for kw in keywords:
            pos = kw.get("current_position", 100)
            total_pos += pos
            # Standard SEO Visibility weighting formula
            if pos == 1:
                total_score += 100.0
            elif pos <= 3:
                total_score += 75.0
            elif pos <= 10:
                total_score += 40.0
            elif pos <= 20:
                total_score += 15.0
            else:
                total_score += 2.0

        avg_visibility = round(total_score / len(keywords), 1)
        avg_pos = round(total_pos / len(keywords), 1)

        return {
            "visibility_score": avg_visibility,
            "avg_position": avg_pos
        }

    def get_position_distribution(self, keywords: List[Dict[str, Any]]) -> Dict[str, int]:
        top3 = sum(1 for k in keywords if k.get("current_position", 100) <= 3)
        top10 = sum(1 for k in keywords if 3 < k.get("current_position", 100) <= 10)
        top20 = sum(1 for k in keywords if 10 < k.get("current_position", 100) <= 20)
        top50 = sum(1 for k in keywords if 20 < k.get("current_position", 100) <= 50)
        top100 = sum(1 for k in keywords if 50 < k.get("current_position", 100) <= 100)

        return {
            "top_3": top3,
            "top_10": top10,
            "top_20": top20,
            "top_50": top50,
            "top_100": top100
        }

rank_tracker_service = RankTrackerService()
