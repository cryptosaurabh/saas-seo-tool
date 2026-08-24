import uuid
from sqlalchemy import Column, String, ForeignKey, Integer, Numeric, DateTime, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.base_class import BaseModel

class Subscription(BaseModel):
    __tablename__ = "subscriptions"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, unique=True)
    plan_code = Column(String(64), nullable=False, default="free") # free, starter, professional, agency, enterprise
    billing_cycle = Column(String(32), default="monthly", nullable=False) # monthly, yearly
    status = Column(String(32), default="active", nullable=False) # active, trialing, past_due, canceled, paused
    provider = Column(String(32), default="stripe", nullable=False) # stripe, razorpay
    provider_subscription_id = Column(String(255), nullable=True)
    current_period_start = Column(DateTime(timezone=True), nullable=True)
    current_period_end = Column(DateTime(timezone=True), nullable=True)
    trial_start = Column(DateTime(timezone=True), nullable=True)
    trial_end = Column(DateTime(timezone=True), nullable=True)
    cancel_at_period_end = Column(String(32), default="false", nullable=False)
    coupon_code = Column(String(64), nullable=True)
    ai_credits_balance = Column(Integer, default=50, nullable=False)

    # Limits metadata (e.g., max_websites: 5)
    limits = Column(JSON, default={
        "max_websites": 1,
        "max_team_members": 2,
        "max_workspaces": 1,
        "max_keywords": 100,
        "max_audits": 5,
        "ai_credits_monthly": 50,
        "storage_gb": 1,
        "api_requests": 1000,
        "api_access": False
    }, nullable=False)

    organization = relationship("Organization", back_populates="subscription")

class Invoice(BaseModel):
    __tablename__ = "invoices"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    invoice_number = Column(String(128), unique=True, nullable=False)
    subtotal = Column(Numeric(10, 2), nullable=False, default=0.0)
    tax_amount = Column(Numeric(10, 2), nullable=False, default=0.0)
    discount_amount = Column(Numeric(10, 2), nullable=False, default=0.0)
    amount = Column(Numeric(10, 2), nullable=False)
    currency = Column(String(8), default="USD", nullable=False)
    payment_status = Column(String(32), default="paid", nullable=False) # paid, pending, failed, refunded
    pdf_url = Column(String(1024), nullable=True)
    provider_invoice_id = Column(String(255), nullable=True)
    billing_reason = Column(String(64), default="subscription_cycle", nullable=True) # subscription_cycle, upgrade, topup
    line_items = Column(JSON, nullable=True) # Itemized details

    organization = relationship("Organization", back_populates="invoices")

