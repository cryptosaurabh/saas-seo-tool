from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager

from app.core.config import settings
from app.api.v1.router import api_v1_router
from app.database.session import engine
from app.models import Base
from app.utils.response import error_response

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Auto-create tables in development mode if database exists
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    except Exception as exc:
        print(f"[Notice] DB initialization skipped (PostgreSQL not active locally): {exc}")
    yield
    try:
        await engine.dispose()
    except Exception:
        pass

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# Set CORS middleware
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return error_response(
        message=f"An unhandled internal server error occurred: {str(exc)}",
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
    )

@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "online", "system": settings.PROJECT_NAME, "version": "1.0.0"}

app.include_router(api_v1_router, prefix=settings.API_V1_STR)
