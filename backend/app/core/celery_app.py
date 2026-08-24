from celery import Celery
from app.core.config import settings

celery_app = Celery(
    "seopilot_tasks",
    broker=settings.redis_url,
    backend=settings.redis_url
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True
)

@celery_app.task(name="send_email_notification")
def send_email_notification_task(to_email: str, subject: str, body: str):
    # Simulated email dispatch via SMTP / SendGrid / Amazon SES
    print(f"[Celery] Sending email to {to_email} with subject: {subject}")
    return {"status": "sent", "to": to_email}
