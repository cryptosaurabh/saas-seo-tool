from fastapi import APIRouter
from app.api.v1.auth import router as auth_router
from app.api.v1.organizations import router as org_router
from app.api.v1.users import router as user_router
from app.api.v1.billing import router as billing_router
from app.api.v1.notifications import router as notification_router
from app.api.v1.audit import router as audit_router
from app.api.v1.keywords import router as keywords_router
from app.api.v1.content import router as content_router
from app.api.v1.rankings import router as rankings_router
from app.api.v1.backlinks import router as backlinks_router
from app.api.v1.integrations import router as integrations_router
from app.api.v1.ai_agent import router as ai_agent_router
from app.api.v1.agency import router as agency_router
from app.api.v1.admin import router as admin_router
from app.api.v1.health import router as health_router
from app.api.v1.webhooks import router as webhooks_router
from app.api.v1.marketplace import router as marketplace_router
from app.api.v1.mobile import router as mobile_router
from app.api.v1.data_transfer import router as data_transfer_router
from app.api.v1.search import router as search_router

api_v1_router = APIRouter()

api_v1_router.include_router(auth_router)
api_v1_router.include_router(org_router)
api_v1_router.include_router(user_router)
api_v1_router.include_router(billing_router)
api_v1_router.include_router(notification_router)
api_v1_router.include_router(audit_router)
api_v1_router.include_router(keywords_router)
api_v1_router.include_router(content_router)
api_v1_router.include_router(rankings_router)
api_v1_router.include_router(backlinks_router)
api_v1_router.include_router(integrations_router)
api_v1_router.include_router(ai_agent_router)
api_v1_router.include_router(agency_router)
api_v1_router.include_router(admin_router)
api_v1_router.include_router(health_router)
api_v1_router.include_router(webhooks_router)
api_v1_router.include_router(marketplace_router)
api_v1_router.include_router(mobile_router)
api_v1_router.include_router(data_transfer_router)
api_v1_router.include_router(search_router)



