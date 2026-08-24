from typing import List, Optional
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import AnyHttpUrl, validator, Field

class Settings(BaseSettings):
    PROJECT_NAME: str = "SEOPilot AI"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = Field(default="development", env="ENVIRONMENT")

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://seopilot.ai"
    ]

    # Database
    POSTGRES_SERVER: str = Field(default="localhost", env="POSTGRES_SERVER")
    POSTGRES_USER: str = Field(default="seopilot", env="POSTGRES_USER")
    POSTGRES_PASSWORD: str = Field(default="seopilot_secret", env="POSTGRES_PASSWORD")
    POSTGRES_DB: str = Field(default="seopilot_db", env="POSTGRES_DB")
    POSTGRES_PORT: int = Field(default=5432, env="POSTGRES_PORT")
    DATABASE_URL: Optional[str] = None

    @property
    def async_database_url(self) -> str:
        if self.DATABASE_URL:
            return self.DATABASE_URL
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    @property
    def sync_database_url(self) -> str:
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    # JWT & Auth
    SECRET_KEY: str = Field(default="super_secret_jwt_key_change_in_production_32bytes_min", env="SECRET_KEY")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours for dev
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Redis & Celery
    REDIS_HOST: str = Field(default="localhost", env="REDIS_HOST")
    REDIS_PORT: int = Field(default=6379, env="REDIS_PORT")
    
    @property
    def redis_url(self) -> str:
        return f"redis://{self.REDIS_HOST}:{self.REDIS_PORT}/0"

    # Payment Integration Secrets
    STRIPE_API_KEY: Optional[str] = Field(default=None, env="STRIPE_API_KEY")
    STRIPE_WEBHOOK_SECRET: Optional[str] = Field(default=None, env="STRIPE_WEBHOOK_SECRET")
    RAZORPAY_KEY_ID: Optional[str] = Field(default=None, env="RAZORPAY_KEY_ID")
    RAZORPAY_KEY_SECRET: Optional[str] = Field(default=None, env="RAZORPAY_KEY_SECRET")

    # Storage
    S3_ENDPOINT_URL: Optional[str] = Field(default=None, env="S3_ENDPOINT_URL")
    S3_BUCKET: str = Field(default="seopilot-assets", env="S3_BUCKET")
    AWS_ACCESS_KEY_ID: Optional[str] = Field(default=None, env="AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY: Optional[str] = Field(default=None, env="AWS_SECRET_ACCESS_KEY")

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True, extra="ignore")

settings = Settings()
