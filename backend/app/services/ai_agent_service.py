from typing import List, Dict, Any

class AIAgentService:
    def generate_chat_response(self, user_query: str, project_context: Dict[str, Any] = None) -> Dict[str, Any]:
        query_lower = user_query.lower()

        if "traffic" in query_lower:
            reply = (
                "### 📈 Traffic Analysis Insight\n\n"
                "Based on Search Console & GA4 data, organic traffic dipped by 4.2% primarily due to a position drop for 2 high-volume queries:\n"
                "1. **'ai keyword research tool'**: Dropped from Rank #2 to #5 (-3 positions).\n"
                "2. **'technical crawler'**: CTR decreased by 0.8%.\n\n"
                "**Recommended Action**: Refresh content EEAT section and submit URL for instant Google indexing."
            )
        elif "keyword" in query_lower:
            reply = (
                "### 🎯 Keyword Target Recommendation\n\n"
                "We detected a high-intent keyword opportunity with **24,500 monthly searches** and low difficulty (KD 28):\n"
                "- **Keyword**: `enterprise website crawler` (CPC $8.50)\n"
                "- **Search Intent**: Commercial / High Conversion\n\n"
                "**Action**: Create a targeted landing page using the AI Content Studio."
            )
        else:
            reply = (
                "### 🤖 SEOPilot AI Assistant\n\n"
                f"I analyzed your site `acmeagency.com` across Crawl Data, Rank Tracking, Backlinks, and GSC.\n\n"
                "**Top 3 Immediate Priority Actions**:\n"
                "1. **Fix Missing Meta Titles**: 14 internal pages have duplicate H1 tags.\n"
                "2. **Disavow Toxic Links**: 2 spammy directory domains identified.\n"
                "3. **Add Schema Markup**: Implement FAQ & Organization JSON-LD Schema."
            )

        return {
            "reply": reply,
            "tokens_used": 284,
            "suggested_actions": ["Convert to Task", "Run Full Crawl", "Generate Outline"]
        }

    def get_daily_recommendations(self) -> List[Dict[str, Any]]:
        return [
            {
                "id": "rec-1",
                "category": "technical",
                "priority": "critical",
                "title": "Fix Duplicate Meta Titles on 14 Pages",
                "description": "Crawl job #104 detected 14 blog posts sharing duplicate title tags.",
                "reasoning": "Duplicate titles cause keyword cannibalization and reduce GSC CTR.",
                "impact_score": 92
            },
            {
                "id": "rec-2",
                "category": "content",
                "priority": "high",
                "title": "Optimize EEAT Trustworthiness for High-Intent Page",
                "description": "Page `/audit` lacks author bio and organization schema credentials.",
                "reasoning": "Google Search Quality Rater guidelines prioritize verified author credentials.",
                "impact_score": 88
            },
            {
                "id": "rec-3",
                "category": "backlinks",
                "priority": "medium",
                "title": "Disavow 2 Toxic Spam Domains",
                "description": "Domain `spammy-directory-xyz.net` has a 88% toxicity score.",
                "reasoning": "Prevents algorithmic spam penalties on Google Search.",
                "impact_score": 78
            }
        ]

ai_agent_service = AIAgentService()
