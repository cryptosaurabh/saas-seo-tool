from typing import List, Dict, Any

class AuditEngine:
    def evaluate_page(self, page_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        issues = []
        url = page_data.get("url", "")

        # 1. Meta Title Checks
        title = page_data.get("title")
        title_len = page_data.get("title_length", 0)
        if not title:
            issues.append({
                "page_url": url,
                "category": "meta",
                "severity": "critical",
                "title": "Missing Meta Title Tag",
                "description": "Page lacks an HTML <title> tag, preventing search engines from understanding the page subject.",
                "recommendation": "Add a descriptive <title> tag between 30 and 60 characters containing targeted keywords.",
                "estimated_impact": "High SEO Impact",
                "ai_fix_prompt": f"Write an optimized HTML meta title tag for {url} based on its primary content."
            })
        elif title_len < 30 or title_len > 60:
            issues.append({
                "page_url": url,
                "category": "meta",
                "severity": "medium",
                "title": "Sub-optimal Meta Title Length",
                "description": f"Meta title length is {title_len} characters. Ideal length is 30-60 characters.",
                "recommendation": "Adjust meta title length to stay within 30 to 60 characters to avoid SERP truncation.",
                "estimated_impact": "Medium SEO Impact",
                "ai_fix_prompt": f"Rewrite title '{title}' to be between 30 and 60 characters."
            })

        # 2. Meta Description Checks
        meta_desc = page_data.get("meta_description")
        desc_len = page_data.get("meta_description_length", 0)
        if not meta_desc:
            issues.append({
                "page_url": url,
                "category": "meta",
                "severity": "high",
                "title": "Missing Meta Description Tag",
                "description": "Page is missing a meta description tag, leading to auto-generated SERP snippets.",
                "recommendation": "Add a compelling meta description between 120 and 160 characters with a clear CTA.",
                "estimated_impact": "High SEO Impact",
                "ai_fix_prompt": f"Generate a compelling meta description under 160 characters for URL: {url}."
            })
        elif desc_len < 70 or desc_len > 160:
            issues.append({
                "page_url": url,
                "category": "meta",
                "severity": "low",
                "title": "Meta Description Length Outside Recommended Range",
                "description": f"Meta description length is {desc_len} characters. Recommended range is 120-160 characters.",
                "recommendation": "Refactor meta description to fit 120-160 characters for optimal CTR.",
                "estimated_impact": "Low SEO Impact",
                "ai_fix_prompt": f"Shorten or expand meta description to 140 characters."
            })

        # 3. Headings H1 Analysis
        h1_count = page_data.get("h1_count", 0)
        if h1_count == 0:
            issues.append({
                "page_url": url,
                "category": "headings",
                "severity": "high",
                "title": "Missing H1 Heading Tag",
                "description": "Page contains zero <h1> heading tags.",
                "recommendation": "Include exactly one <h1> tag representing the primary page topic.",
                "estimated_impact": "High SEO Impact",
                "ai_fix_prompt": f"Generate a primary H1 heading for webpage {url}."
            })
        elif h1_count > 1:
            issues.append({
                "page_url": url,
                "category": "headings",
                "severity": "medium",
                "title": "Multiple H1 Headings Detected",
                "description": f"Page contains {h1_count} <h1> tags. Best practice requires a single <h1> per page.",
                "recommendation": "Demote secondary <h1> tags to <h2> or <h3> tags.",
                "estimated_impact": "Medium SEO Impact",
                "ai_fix_prompt": f"Refactor multiple H1 tags into proper H1 -> H2 hierarchy."
            })

        # 4. Image ALT Attribute Checks
        missing_alt = page_data.get("images_missing_alt", 0)
        if missing_alt > 0:
            issues.append({
                "page_url": url,
                "category": "images",
                "severity": "medium",
                "title": "Images Missing ALT Attributes",
                "description": f"{missing_alt} images are missing descriptive alt text for accessibility and image search.",
                "recommendation": "Add descriptive alt attributes to all <img> elements.",
                "estimated_impact": "Medium SEO Impact",
                "ai_fix_prompt": f"Generate image alt attributes for images on {url}."
            })

        # 5. Technical HTTP & SSL Checks
        status_code = page_data.get("status_code", 200)
        if status_code != 200:
            issues.append({
                "page_url": url,
                "category": "technical",
                "severity": "critical",
                "title": f"Non-200 HTTP Response Status ({status_code})",
                "description": f"Page returned HTTP status code {status_code}.",
                "recommendation": "Ensure active pages return HTTP 200 OK and broken links are fixed or redirected.",
                "estimated_impact": "Critical SEO Impact",
                "ai_fix_prompt": f"Fix HTTP {status_code} error response for {url}."
            })

        return issues

    def calculate_scores(self, issues: List[Dict[str, Any]], total_pages: int) -> Dict[str, int]:
        critical = sum(1 for i in issues if i["severity"] == "critical")
        high = sum(1 for i in issues if i["severity"] == "high")
        medium = sum(1 for i in issues if i["severity"] == "medium")
        low = sum(1 for i in issues if i["severity"] == "low")

        deductions = (critical * 15) + (high * 8) + (medium * 4) + (low * 1)
        overall_score = max(0, 100 - deductions)
        technical_score = max(0, 100 - (critical * 20 + high * 10))
        performance_score = max(0, 100 - (medium * 5 + low * 2))
        content_score = max(0, 100 - (high * 10 + medium * 5))
        accessibility_score = max(0, 100 - (medium * 8))
        security_score = 100 if critical == 0 else 75

        return {
            "overall_seo_score": overall_score,
            "technical_score": technical_score,
            "performance_score": performance_score,
            "content_score": content_score,
            "accessibility_score": accessibility_score,
            "security_score": security_score,
            "critical_issues_count": critical,
            "high_issues_count": high,
            "medium_issues_count": medium,
            "low_issues_count": low,
            "passed_checks_count": max(0, (total_pages * 10) - len(issues))
        }

audit_engine = AuditEngine()
