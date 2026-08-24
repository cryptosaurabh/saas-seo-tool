from typing import Optional
try:
    from fastapi import APIRouter, Response
except ImportError:
    APIRouter = lambda *args, **kwargs: None
    Response = lambda content, media_type, headers: content
from app.services.data_transfer_service import DataTransferService

router = APIRouter(prefix="/data", tags=["Data Import & Export"])

@router.get("/export")
async def export_data(format: str = "json", type: str = "keywords"):
    sample_data = [
        {"keyword": "saas seo tool", "volume": 14200, "position": 2, "difficulty": 68},
        {"keyword": "ai content generator", "volume": 28400, "position": 4, "difficulty": 74},
        {"keyword": "automated site audit", "volume": 8900, "position": 1, "difficulty": 52}
    ]

    if format == "csv":
        csv_str = DataTransferService.export_to_csv(sample_data)
        return Response(content=csv_str, media_type="text/csv", headers={"Content-Disposition": "attachment; filename=seopilot_keywords_export.csv"})
    else:
        json_str = DataTransferService.export_to_json(sample_data)
        return Response(content=json_str, media_type="application/json", headers={"Content-Disposition": "attachment; filename=seopilot_keywords_export.json"})
