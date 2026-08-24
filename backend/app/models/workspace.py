import uuid
from sqlalchemy import Column, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.base_class import BaseModel

class Workspace(BaseModel):
    __tablename__ = "workspaces"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), nullable=False, index=True)
    description = Column(String(512), nullable=True)

    # Relationships
    organization = relationship("Organization", back_populates="workspaces")
    projects = relationship("Project", back_populates="workspace", cascade="all, delete-orphan")

class Project(BaseModel):
    __tablename__ = "projects"

    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspaces.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    target_domain = Column(String(255), nullable=False)
    settings = Column(JSON, default={}, nullable=False)

    # Relationships
    workspace = relationship("Workspace", back_populates="projects")
    websites = relationship("Website", back_populates="project", cascade="all, delete-orphan")

class Website(BaseModel):
    __tablename__ = "websites"

    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    domain_url = Column(String(512), nullable=False)
    favicon_url = Column(String(1024), nullable=True)
    verification_status = Column(String(32), default="pending", nullable=False)

    # Relationships
    project = relationship("Project", back_populates="websites")
