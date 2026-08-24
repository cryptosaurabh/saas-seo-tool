from typing import List, Dict, Any

class ReportSchedulerService:
    def schedule_report(self, client_id: str, report_type: str, frequency: str, recipients: List[str]) -> Dict[str, Any]:
        return {
            "schedule_id": "sched-101",
            "client_id": client_id,
            "report_type": report_type,
            "frequency": frequency,
            "recipients": recipients,
            "next_run": "2026-08-01T00:00:00Z"
        }

report_scheduler_service = ReportSchedulerService()
