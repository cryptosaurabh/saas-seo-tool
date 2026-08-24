import asyncio
import re
from typing import List, Dict, Any, Optional
from urllib.parse import urlparse, urljoin
import httpx
from bs4 import BeautifulSoup

class CrawlerService:
    def __init__(self, user_agent: str = "SEOPilotBot/1.0", max_pages: int = 500, max_depth: int = 5):
        self.user_agent = user_agent
        self.max_pages = max_pages
        self.max_depth = max_depth
        self.headers = {"User-Agent": self.user_agent}

    async def fetch_page(self, url: str) -> Optional[Dict[str, Any]]:
        async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as client:
            try:
                start_time = asyncio.get_event_loop().time()
                response = await client.get(url, headers=self.headers)
                load_time_ms = int((asyncio.get_event_loop().time() - start_time) * 1000)
                
                content_type = response.headers.get("content-type", "")
                if "text/html" not in content_type:
                    return {
                        "url": url,
                        "status_code": response.status_code,
                        "content_type": content_type,
                        "load_time_ms": load_time_ms,
                        "html": ""
                    }

                return {
                    "url": str(response.url),
                    "status_code": response.status_code,
                    "content_type": content_type,
                    "load_time_ms": load_time_ms,
                    "html": response.text
                }
            except Exception as e:
                return {
                    "url": url,
                    "status_code": 500,
                    "content_type": "error",
                    "load_time_ms": 0,
                    "html": "",
                    "error": str(e)
                }

    def parse_page_seo(self, url: str, html: str, status_code: int, load_time_ms: int) -> Dict[str, Any]:
        soup = BeautifulSoup(html, "html.parser") if html else None
        
        title = soup.title.string.strip() if (soup and soup.title and soup.title.string) else None
        title_length = len(title) if title else 0
        
        meta_desc = None
        if soup:
            meta_tag = soup.find("meta", attrs={"name": re.compile(r"^description$", re.I)})
            if meta_tag and meta_tag.get("content"):
                meta_desc = meta_tag.get("content").strip()
        meta_desc_length = len(meta_desc) if meta_desc else 0

        h1_tags = soup.find_all("h1") if soup else []
        h1_count = len(h1_tags)
        h1_content = h1_tags[0].get_text().strip() if h1_count > 0 else None

        word_count = len(soup.get_text().split()) if soup else 0

        canonical_tag = soup.find("link", attrs={"rel": "canonical"}) if soup else None
        canonical_url = canonical_tag.get("href") if (canonical_tag and canonical_tag.get("href")) else None

        images = soup.find_all("img") if soup else []
        images_count = len(images)
        images_missing_alt = sum(1 for img in images if not img.get("alt") or not img.get("alt").strip())

        links = soup.find_all("a", href=True) if soup else []
        internal_links = 0
        external_links = 0
        domain = urlparse(url).netloc

        for link in links:
            href = link.get("href")
            link_domain = urlparse(href).netloc
            if not link_domain or link_domain == domain:
                internal_links += 1
            else:
                external_links += 1

        # Detect Structured Data (JSON-LD)
        structured_types = []
        if soup:
            scripts = soup.find_all("script", attrs={"type": "application/ld+json"})
            for script in scripts:
                content = script.string
                if content:
                    for schema_type in ["Organization", "FAQPage", "Article", "Product", "Review", "BreadcrumbList", "LocalBusiness"]:
                        if schema_type in content and schema_type not in structured_types:
                            structured_types.append(schema_type)

        return {
            "url": url,
            "status_code": status_code,
            "load_time_ms": load_time_ms,
            "title": title,
            "title_length": title_length,
            "meta_description": meta_desc,
            "meta_description_length": meta_desc_length,
            "h1_count": h1_count,
            "h1_content": h1_content,
            "word_count": word_count,
            "canonical_url": canonical_url,
            "is_indexable": status_code == 200 and "noindex" not in (html or "").lower(),
            "images_count": images_count,
            "images_missing_alt": images_missing_alt,
            "internal_links_count": internal_links,
            "external_links_count": external_links,
            "broken_links_count": 0,
            "structured_data_types": structured_types
        }

crawler_service = CrawlerService()
