import json
import csv
import io
from typing import Dict, Any, List

class DataTransferService:
    """Handles structured data export and import for site audits, rank tracking, and backlink data."""

    @staticmethod
    def export_to_json(data: List[Dict[str, Any]]) -> str:
        return json.dumps(data, indent=2)

    @staticmethod
    def export_to_csv(data: List[Dict[str, Any]]) -> str:
        if not data:
            return ""
        output = io.StringIO()
        writer = csv.DictWriter(output, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)
        return output.getvalue()

    @staticmethod
    def import_from_csv(csv_content: str) -> List[Dict[str, Any]]:
        output = io.StringIO(csv_content)
        reader = csv.DictReader(output)
        return list(reader)
