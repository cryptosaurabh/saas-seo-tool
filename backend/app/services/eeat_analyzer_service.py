from typing import Dict, Any, List

class EEATAnalyzerService:
    def evaluate_eeat(self, text: str, author: str = "") -> Dict[str, Any]:
        has_author = bool(author)
        has_citations = "http" in text or "source" in text.lower()
        has_data = any(char.isdigit() for char in text)

        experience = 90 if has_author else 75
        expertise = 92 if has_data else 80
        authoritativeness = 88 if has_citations else 70
        trustworthiness = 95 if (has_author and has_citations) else 82

        overall_eeat = int((experience + expertise + authoritativeness + trustworthiness) / 4)

        recommendations = []
        if not has_author:
            recommendations.append("Add verified author bio and credentials to increase Experience & Trust score.")
        if not has_citations:
            recommendations.append("Include authoritative external references (.edu, .gov, or high DR sources).")

        return {
            "overall_eeat_score": overall_eeat,
            "experience_score": experience,
            "expertise_score": expertise,
            "authority_score": authoritativeness,
            "trust_score": trustworthiness,
            "recommendations": recommendations
        }

eeat_analyzer_service = EEATAnalyzerService()
