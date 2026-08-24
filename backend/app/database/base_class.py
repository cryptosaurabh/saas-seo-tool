import uuid
from datetime import datetime, timezone
from typing import Any
from sqlalchemy import Column, DateTime, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase, declared_attr

class Base(DeclarativeBase):
    id: Any
    __name__: str

    # Automatically generate table name from class name if not specified
    @declared_attr.directive
    def __tablename__(cls) -> str:
        # Convert CamelCase to snake_case table name
        name = cls.__name__
        return "".join(["_" + c.lower() if c.isupper() else c.lower() for c in name]).lstrip("_") + "s"

class BaseModel(Base):
    __abstract__ = True

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
    deleted_at = Column(DateTime(timezone=True), nullable=True)
    status = Column(String(32), default="active", nullable=False, index=True)
