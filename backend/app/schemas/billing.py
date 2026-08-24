from typing import Optional, List, Dict, Any
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, EmailStr

class SubscriptionPlanResponse(BaseModel):
    code: str
    name: str
    description: Optional[str] = None
    price_monthly: float
    price_yearly: float
    features: List[str]
    max_websites: int
    max_team_members: int
    max_workspaces: int
    max_keywords: int
    max_audits: int
    ai_credits_monthly: int
    storage_gb: int
    api_requests: int
    is_popular: bool = False

class BillingCheckoutRequest(BaseModel):
    plan_code: str
    billing_cycle: str = "monthly" # monthly or yearly
    payment_provider: str = "stripe" # stripe or razorpay
    coupon_code: Optional[str] = None
    gst_number: Optional[str] = None
    business_name: Optional[str] = None

class VerifyPaymentRequest(BaseModel):
    payment_provider: str
    session_id: Optional[str] = None
    razorpay_order_id: Optional[str] = None
    razorpay_payment_id: Optional[str] = None
    razorpay_signature: Optional[str] = None
    plan_code: str
    billing_cycle: str = "monthly"

class ValidateCouponRequest(BaseModel):
    code: str
    amount: float

class CreditTopupRequest(BaseModel):
    credit_amount: int # e.g. 1000, 5000, 20000
    payment_provider: str = "stripe"

class RefundRequestCreate(BaseModel):
    transaction_id: str
    reason: str
    amount: float

class BillingAddressUpdate(BaseModel):
    business_name: Optional[str] = None
    gst_number: Optional[str] = None
    tax_id: Optional[str] = None
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: str
    country: str = "US"
    postal_code: str

class PlanActionRequest(BaseModel):
    target_plan_code: Optional[str] = None
    billing_cycle: Optional[str] = None # monthly or yearly
    reason: Optional[str] = None

class APIKeyCreateRequest(BaseModel):
    name: str
    scopes: List[str] = ["read"]

class APIKeyCreatedResponse(BaseModel):
    id: UUID
    name: str
    key_prefix: str
    secret_key: str # Returned ONLY ONCE upon creation
    created_at: datetime

class TeamMemberInviteRequest(BaseModel):
    email: EmailStr
    role_name: str # Agency Owner, Business User, Team Member

class TeamMemberResponse(BaseModel):
    id: UUID
    user_id: UUID
    full_name: str
    email: str
    role_name: str
    avatar_url: Optional[str] = None
    created_at: datetime
