import uuid
from datetime import datetime
from sqlalchemy import Column, String, ForeignKey, Integer, Numeric, DateTime, JSON, Boolean, Text
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.base_class import BaseModel

class MarketplacePlugin(BaseModel):
    __tablename__ = "marketplace_plugins"

    plugin_id = Column(String(128), unique=True, nullable=False, index=True) # google_search_console, slack_alerts, hubspot_crm
    name = Column(String(128), nullable=False)
    description = Column(Text, nullable=False)
    author = Column(String(128), default="SEOPilot Core Team", nullable=False)
    category = Column(String(64), default="integrations", nullable=False) # integrations, templates, ai_prompts, automation
    version = Column(String(32), default="1.0.0", nullable=False)
    icon_url = Column(String(512), nullable=True)
    price_monthly = Column(Numeric(10, 2), default=0.0, nullable=False)
    installs_count = Column(Integer, default=0, nullable=False)
    rating = Column(Numeric(3, 2), default=5.0, nullable=False)
    is_official = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=True, nullable=False)
    manifest = Column(JSON, nullable=True) # Permissions, webhooks, scopes required

class PluginInstallation(BaseModel):
    __tablename__ = "plugin_installations"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    plugin_id = Column(String(128), ForeignKey("marketplace_plugins.plugin_id", ondelete="CASCADE"), nullable=False)
    installed_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    status = Column(String(32), default="active", nullable=False) # active, disabled
    configuration = Column(JSON, default={}, nullable=False)

    organization = relationship("Organization", backref="plugin_installations")
    plugin = relationship("MarketplacePlugin", backref="installations")
