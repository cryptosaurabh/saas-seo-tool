import uuid
from datetime import datetime
from sqlalchemy import Column, String, ForeignKey, Integer, Numeric, DateTime, JSON, Boolean, Text
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.base_class import BaseModel

class SubscriptionPlan(BaseModel):
    __tablename__ = "subscription_plans"

    code = Column(String(64), unique=True, nullable=False, index=True) # free, starter, professional, agency, enterprise
    name = Column(String(128), nullable=False)
    description = Column(Text, nullable=True)
    price_monthly = Column(Numeric(10, 2), nullable=False, default=0.0)
    price_yearly = Column(Numeric(10, 2), nullable=False, default=0.0)
    is_active = Column(Boolean, default=True, nullable=False)
    is_popular = Column(Boolean, default=False, nullable=False)
    
    # Feature Quotas & Limits
    projects_limit = Column(Integer, default=1, nullable=False)
    websites_limit = Column(Integer, default=1, nullable=False)
    keywords_limit = Column(Integer, default=100, nullable=False)
    audits_limit = Column(Integer, default=5, nullable=False)
    ai_credits_monthly = Column(Integer, default=50, nullable=False)
    storage_gb_limit = Column(Integer, default=1, nullable=False)
    api_requests_limit = Column(Integer, default=1000, nullable=False)
    team_members_limit = Column(Integer, default=2, nullable=False)
    
    # Feature Flags
    reports_access = Column(String(64), default="standard", nullable=False) # standard, advanced, white_label
    white_label = Column(Boolean, default=False, nullable=False)
    priority_support = Column(Boolean, default=False, nullable=False)

class PaymentTransaction(BaseModel):
    __tablename__ = "payment_transactions"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    transaction_id = Column(String(255), unique=True, nullable=False, index=True)
    provider = Column(String(32), default="stripe", nullable=False) # stripe, razorpay, paypal, paddle, lemonsqueezy
    amount = Column(Numeric(10, 2), nullable=False)
    currency = Column(String(8), default="USD", nullable=False)
    payment_method = Column(String(64), default="card", nullable=False) # card, upi, netbanking, wallet, bank_transfer
    status = Column(String(32), default="succeeded", nullable=False) # succeeded, pending, failed, refunded
    invoice_id = Column(UUID(as_uuid=True), ForeignKey("invoices.id", ondelete="SET NULL"), nullable=True)
    gateway_response = Column(JSON, nullable=True)

    organization = relationship("Organization", backref="transactions")

class Coupon(BaseModel):
    __tablename__ = "coupons"

    code = Column(String(64), unique=True, nullable=False, index=True)
    description = Column(String(255), nullable=True)
    discount_type = Column(String(32), default="percentage", nullable=False) # percentage, flat
    discount_value = Column(Numeric(10, 2), nullable=False) # e.g. 20.0 for 20% or 20.00 for $20 off
    currency = Column(String(8), default="USD", nullable=False)
    max_uses = Column(Integer, default=100, nullable=False)
    times_used = Column(Integer, default=0, nullable=False)
    min_purchase_amount = Column(Numeric(10, 2), default=0.0, nullable=False)
    max_discount_amount = Column(Numeric(10, 2), nullable=True)
    expires_at = Column(DateTime(timezone=True), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)

class CouponUsage(BaseModel):
    __tablename__ = "coupon_usages"

    coupon_id = Column(UUID(as_uuid=True), ForeignKey("coupons.id", ondelete="CASCADE"), nullable=False)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    used_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    discount_applied = Column(Numeric(10, 2), nullable=False)

class CreditLedger(BaseModel):
    __tablename__ = "credit_ledgers"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    amount = Column(Integer, nullable=False) # Positive for additions, negative for deductions
    credit_type = Column(String(32), default="monthly_grant", nullable=False) # monthly_grant, purchased, bonus, deduction
    feature_category = Column(String(64), nullable=True) # ai_content, ai_chat, bulk_audit, keyword_research
    description = Column(String(255), nullable=False)
    balance_after = Column(Integer, nullable=False)

    organization = relationship("Organization", backref="credit_ledger_entries")

class UsageLog(BaseModel):
    __tablename__ = "usage_logs"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    metric_name = Column(String(64), nullable=False) # projects, websites, audits, keywords, ai_requests, storage_gb, api_requests
    usage_count = Column(Integer, default=1, nullable=False)
    period_start = Column(DateTime(timezone=True), nullable=False)
    period_end = Column(DateTime(timezone=True), nullable=False)

class RefundRequest(BaseModel):
    __tablename__ = "refund_requests"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    transaction_id = Column(String(255), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    reason = Column(Text, nullable=False)
    status = Column(String(32), default="pending", nullable=False) # pending, approved, rejected, processed
    admin_notes = Column(Text, nullable=True)
    processed_at = Column(DateTime(timezone=True), nullable=True)

class BillingAddress(BaseModel):
    __tablename__ = "billing_addresses"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, unique=True)
    business_name = Column(String(255), nullable=True)
    gst_number = Column(String(64), nullable=True)
    tax_id = Column(String(64), nullable=True)
    address_line1 = Column(String(255), nullable=False)
    address_line2 = Column(String(255), nullable=True)
    city = Column(String(128), nullable=False)
    state = Column(String(128), nullable=False)
    country = Column(String(128), nullable=False, default="US")
    postal_code = Column(String(32), nullable=False)

    organization = relationship("Organization", backref="billing_address")
