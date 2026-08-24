import uuid
from datetime import datetime, timedelta
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database.session import get_db
from app.auth.deps import get_current_user, get_current_tenant_org
from app.models.user import User
from app.models.organization import Organization
from app.models.subscription import Subscription, Invoice
from app.models.billing_models import (
    CreditLedger,
    Coupon,
    PaymentTransaction,
    RefundRequest,
    BillingAddress
)
from app.schemas.billing import (
    SubscriptionPlanResponse,
    BillingCheckoutRequest,
    VerifyPaymentRequest,
    ValidateCouponRequest,
    CreditTopupRequest,
    RefundRequestCreate,
    BillingAddressUpdate,
    PlanActionRequest
)
from app.services.payment_service import PaymentGatewayProvider
from app.services.credit_service import CreditService
from app.services.coupon_service import CouponService
from app.services.usage_service import UsageTrackerService
from app.services.invoice_service import InvoiceService
from app.utils.response import success_response, error_response

router = APIRouter(prefix="/billing", tags=["Billing & Subscriptions"])

PLANS = [
    {
        "code": "free",
        "name": "Free Tier",
        "description": "Essential SEO tools for individuals starting out.",
        "price_monthly": 0.0,
        "price_yearly": 0.0,
        "features": [
            "1 Monitored Website",
            "1 Project Workspace",
            "100 Tracked Keywords",
            "5 Audits / month",
            "50 AI Credits / month",
            "1 GB Storage",
            "1,000 API Requests",
            "2 Team Members",
            "Standard Reports"
        ],
        "max_websites": 1,
        "max_team_members": 2,
        "max_workspaces": 1,
        "max_keywords": 100,
        "max_audits": 5,
        "ai_credits_monthly": 50,
        "storage_gb": 1,
        "api_requests": 1000,
        "is_popular": False
    },
    {
        "code": "starter",
        "name": "Starter",
        "description": "Perfect for freelancers and growing sites.",
        "price_monthly": 29.0,
        "price_yearly": 278.0, # ~20% annual discount
        "features": [
            "5 Monitored Websites",
            "3 Project Workspaces",
            "500 Tracked Keywords",
            "25 Audits / month",
            "500 AI Credits / month",
            "10 GB Storage",
            "10,000 API Requests",
            "5 Team Members",
            "Standard Reports",
            "Email Alerts"
        ],
        "max_websites": 5,
        "max_team_members": 5,
        "max_workspaces": 3,
        "max_keywords": 500,
        "max_audits": 25,
        "ai_credits_monthly": 500,
        "storage_gb": 10,
        "api_requests": 10000,
        "is_popular": False
    },
    {
        "code": "professional",
        "name": "Professional",
        "description": "Advanced tools and high limits for growing businesses.",
        "price_monthly": 79.0,
        "price_yearly": 758.0,
        "features": [
            "20 Monitored Websites",
            "10 Project Workspaces",
            "2,500 Tracked Keywords",
            "100 Audits / month",
            "2,500 AI Credits / month",
            "50 GB Storage",
            "50,000 API Requests",
            "15 Team Members",
            "Advanced Reports",
            "API Access",
            "Priority Support"
        ],
        "max_websites": 20,
        "max_team_members": 15,
        "max_workspaces": 10,
        "max_keywords": 2500,
        "max_audits": 100,
        "ai_credits_monthly": 2500,
        "storage_gb": 50,
        "api_requests": 50000,
        "is_popular": True
    },
    {
        "code": "agency",
        "name": "Agency",
        "description": "Full agency suite with white-labeling and team management.",
        "price_monthly": 199.0,
        "price_yearly": 1910.0,
        "features": [
            "50 Monitored Websites",
            "25 Project Workspaces",
            "10,000 Tracked Keywords",
            "500 Audits / month",
            "10,000 AI Credits / month",
            "250 GB Storage",
            "250,000 API Requests",
            "Unlimited Team Members",
            "White Label PDF Reports",
            "Dedicated Account Manager",
            "Custom Integrations"
        ],
        "max_websites": 50,
        "max_team_members": 999,
        "max_workspaces": 25,
        "max_keywords": 10000,
        "max_audits": 500,
        "ai_credits_monthly": 10000,
        "storage_gb": 250,
        "api_requests": 250000,
        "is_popular": False
    },
    {
        "code": "enterprise",
        "name": "Enterprise",
        "description": "Custom scale, SLA, and dedicated infrastructure.",
        "price_monthly": 499.0,
        "price_yearly": 4790.0,
        "features": [
            "Unlimited Websites",
            "Unlimited Workspaces",
            "50,000+ Tracked Keywords",
            "Unlimited Audits",
            "50,000 AI Credits / month",
            "1 TB Storage",
            "Custom API Rate Limits",
            "Custom SLA & Contracts",
            "Dedicated Account Manager",
            "White Label Custom Portal"
        ],
        "max_websites": 9999,
        "max_team_members": 9999,
        "max_workspaces": 9999,
        "max_keywords": 50000,
        "max_audits": 9999,
        "ai_credits_monthly": 50000,
        "storage_gb": 1000,
        "api_requests": 1000000,
        "is_popular": False
    }
]

@router.get("/plans")
async def get_plans():
    return success_response(data=PLANS)

@router.get("/subscription")
async def get_current_subscription(
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(Subscription).where(Subscription.organization_id == current_org.id))
    sub = res.scalar_one_or_none()

    plan_code = sub.plan_code if sub else "free"
    plan_info = next((p for p in PLANS if p["code"] == plan_code), PLANS[0])

    return success_response(data={
        "organization_id": str(current_org.id),
        "plan": plan_info,
        "status": sub.status if sub else "active",
        "billing_cycle": sub.billing_cycle if sub else "monthly",
        "provider": sub.provider if sub else "stripe",
        "current_period_start": sub.current_period_start.isoformat() if sub and sub.current_period_start else None,
        "current_period_end": sub.current_period_end.isoformat() if sub and sub.current_period_end else (datetime.utcnow() + timedelta(days=30)).isoformat(),
        "trial_end": sub.trial_end.isoformat() if sub and sub.trial_end else None,
        "cancel_at_period_end": sub.cancel_at_period_end if sub else "false",
        "ai_credits_balance": sub.ai_credits_balance if sub else 50,
        "limits": sub.limits if (sub and sub.limits) else plan_info
    })

@router.post("/checkout")
async def create_checkout_session(
    payload: BillingCheckoutRequest,
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    plan_info = next((p for p in PLANS if p["code"] == payload.plan_code), None)
    if not plan_info:
        return error_response(message="Invalid subscription plan selected", status_code=400)

    base_price = plan_info["price_yearly"] if payload.billing_cycle == "yearly" else plan_info["price_monthly"]
    discount_amount = 0.0

    if payload.coupon_code:
        valid, msg, cdata = await CouponService.validate_coupon(db, payload.coupon_code, base_price, str(current_org.id))
        if valid and cdata:
            discount_amount = cdata["discount_amount"]

    final_price = max(0.0, base_price - discount_amount)

    if payload.payment_provider == "razorpay":
        order_data = await PaymentGatewayProvider.create_razorpay_order(
            organization_id=str(current_org.id),
            plan_code=payload.plan_code,
            billing_cycle=payload.billing_cycle,
            amount=final_price,
            currency="INR"
        )
        return success_response(data=order_data, message="Razorpay checkout order created")
    else:
        session_data = await PaymentGatewayProvider.create_stripe_checkout(
            organization_id=str(current_org.id),
            plan_code=payload.plan_code,
            billing_cycle=payload.billing_cycle,
            amount=final_price,
            currency="USD"
        )
        return success_response(data=session_data, message="Stripe checkout session created")

@router.post("/verify-payment")
async def verify_payment(
    payload: VerifyPaymentRequest,
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(Subscription).where(Subscription.organization_id == current_org.id))
    sub = res.scalar_one_or_none()

    plan_info = next((p for p in PLANS if p["code"] == payload.plan_code), PLANS[1])

    if not sub:
        sub = Subscription(
            organization_id=current_org.id,
            plan_code=payload.plan_code,
            billing_cycle=payload.billing_cycle,
            status="active",
            provider=payload.payment_provider,
            provider_subscription_id=payload.session_id or payload.razorpay_payment_id or f"sub_{uuid.uuid4().hex[:10]}",
            current_period_start=datetime.utcnow(),
            current_period_end=datetime.utcnow() + (timedelta(days=365) if payload.billing_cycle == "yearly" else timedelta(days=30)),
            ai_credits_balance=plan_info["ai_credits_monthly"],
            limits=plan_info
        )
        db.add(sub)
    else:
        sub.plan_code = payload.plan_code
        sub.billing_cycle = payload.billing_cycle
        sub.status = "active"
        sub.provider = payload.payment_provider
        sub.current_period_start = datetime.utcnow()
        sub.current_period_end = datetime.utcnow() + (timedelta(days=365) if payload.billing_cycle == "yearly" else timedelta(days=30))
        sub.ai_credits_balance += plan_info["ai_credits_monthly"]
        sub.limits = plan_info

    current_org.plan_tier = payload.plan_code

    # Create Invoice & Payment Transaction
    price = plan_info["price_yearly"] if payload.billing_cycle == "yearly" else plan_info["price_monthly"]
    await InvoiceService.create_invoice(
        db,
        organization_id=str(current_org.id),
        amount=price,
        currency="INR" if payload.payment_provider == "razorpay" else "USD",
        billing_reason=f"subscription_{payload.plan_code}"
    )

    txn = PaymentTransaction(
        organization_id=current_org.id,
        transaction_id=payload.session_id or payload.razorpay_payment_id or f"txn_{uuid.uuid4().hex[:12]}",
        provider=payload.payment_provider,
        amount=price,
        currency="INR" if payload.payment_provider == "razorpay" else "USD",
        payment_method="card" if payload.payment_provider == "stripe" else "upi",
        status="succeeded"
    )
    db.add(txn)
    await db.commit()

    return success_response(message=f"Successfully subscribed to {plan_info['name']} ({payload.billing_cycle})")

@router.post("/upgrade")
@router.post("/downgrade")
async def change_plan_tier(
    payload: PlanActionRequest,
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    if not payload.target_plan_code:
        return error_response(message="target_plan_code is required", status_code=400)

    res = await db.execute(select(Subscription).where(Subscription.organization_id == current_org.id))
    sub = res.scalar_one_or_none()

    plan_info = next((p for p in PLANS if p["code"] == payload.target_plan_code), None)
    if not plan_info:
        return error_response(message="Invalid plan code", status_code=400)

    if sub:
        sub.plan_code = payload.target_plan_code
        sub.limits = plan_info
    current_org.plan_tier = payload.target_plan_code
    await db.commit()

    return success_response(message=f"Plan updated to {plan_info['name']} successfully")

@router.post("/cancel")
async def cancel_subscription(
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(Subscription).where(Subscription.organization_id == current_org.id))
    sub = res.scalar_one_or_none()
    if sub:
        sub.cancel_at_period_end = "true"
        sub.status = "canceled"
        await db.commit()
    return success_response(message="Subscription canceled. Access will remain active until end of billing period.")

@router.post("/resume")
async def resume_subscription(
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(Subscription).where(Subscription.organization_id == current_org.id))
    sub = res.scalar_one_or_none()
    if sub:
        sub.cancel_at_period_end = "false"
        sub.status = "active"
        await db.commit()
    return success_response(message="Subscription resumed successfully.")

@router.post("/change-cycle")
async def change_billing_cycle(
    payload: PlanActionRequest,
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    cycle = payload.billing_cycle or "monthly"
    res = await db.execute(select(Subscription).where(Subscription.organization_id == current_org.id))
    sub = res.scalar_one_or_none()
    if sub:
        sub.billing_cycle = cycle
        await db.commit()
    return success_response(message=f"Billing cycle changed to {cycle}")

@router.post("/coupons/validate")
async def validate_coupon(
    payload: ValidateCouponRequest,
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    valid, msg, cdata = await CouponService.validate_coupon(db, payload.code, payload.amount, str(current_org.id))
    if not valid:
        return error_response(message=msg, status_code=400)
    return success_response(data=cdata, message=msg)

@router.get("/invoices")
async def get_invoices(
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(Invoice).where(Invoice.organization_id == current_org.id))
    invoices = res.scalars().all()

    if not invoices:
        # Return initial seed invoices for demo
        return success_response(data=[
            {
                "id": str(uuid.uuid4()),
                "invoice_number": "INV-202607-001",
                "subtotal": 79.0,
                "tax_amount": 14.22,
                "discount_amount": 0.0,
                "amount": 93.22,
                "currency": "USD",
                "status": "paid",
                "created_at": datetime.utcnow().isoformat(),
                "pdf_url": "/api/v1/billing/invoices/INV-202607-001/pdf"
            }
        ])

    return success_response(data=[{
        "id": str(i.id),
        "invoice_number": i.invoice_number,
        "subtotal": float(i.subtotal),
        "tax_amount": float(i.tax_amount),
        "discount_amount": float(i.discount_amount),
        "amount": float(i.amount),
        "currency": i.currency,
        "status": i.payment_status,
        "created_at": i.created_at.isoformat(),
        "pdf_url": i.pdf_url
    } for i in invoices])

@router.get("/invoices/{invoice_number}/pdf")
async def download_invoice_pdf(
    invoice_number: str,
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    return success_response(data={
        "invoice_number": invoice_number,
        "organization_name": current_org.name,
        "status": "paid",
        "download_url": f"https://seopilot-invoices.s3.amazonaws.com/{invoice_number}.pdf",
        "html_preview": f"<html><body><h1>Tax Invoice {invoice_number}</h1><p>Customer: {current_org.name}</p><p>Status: Paid</p></body></html>"
    })

@router.get("/credits")
async def get_credit_ledger(
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(Subscription).where(Subscription.organization_id == current_org.id))
    sub = res.scalar_one_or_none()
    balance = sub.ai_credits_balance if sub else 50

    ledger_res = await db.execute(select(CreditLedger).where(CreditLedger.organization_id == current_org.id))
    entries = ledger_res.scalars().all()

    return success_response(data={
        "balance": balance,
        "history": [{
            "id": str(e.id),
            "amount": e.amount,
            "credit_type": e.credit_type,
            "feature_category": e.feature_category,
            "description": e.description,
            "balance_after": e.balance_after,
            "created_at": e.created_at.isoformat()
        } for e in entries]
    })

@router.post("/credits/topup")
async def topup_credits(
    payload: CreditTopupRequest,
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    ok, msg, new_bal = await CreditService.add_credits(
        db,
        organization_id=str(current_org.id),
        amount=payload.credit_amount,
        credit_type="purchased",
        description=f"Purchased {payload.credit_amount:,} AI Credit pack"
    )
    return success_response(data={"new_balance": new_bal}, message=msg)

@router.get("/usage")
async def get_usage_metrics(
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    usage_data = await UsageTrackerService.get_organization_usage(db, str(current_org.id))
    return success_response(data=usage_data)

@router.post("/refunds")
async def request_refund(
    payload: RefundRequestCreate,
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    refund = RefundRequest(
        organization_id=current_org.id,
        transaction_id=payload.transaction_id,
        amount=payload.amount,
        reason=payload.reason,
        status="pending"
    )
    db.add(refund)
    await db.commit()
    return success_response(message="Refund request submitted. Our finance team will review it within 48 hours.")

@router.get("/address")
async def get_billing_address(
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(BillingAddress).where(BillingAddress.organization_id == current_org.id))
    addr = res.scalar_one_or_none()
    if not addr:
        return success_response(data=None)
    return success_response(data={
        "business_name": addr.business_name,
        "gst_number": addr.gst_number,
        "tax_id": addr.tax_id,
        "address_line1": addr.address_line1,
        "address_line2": addr.address_line2,
        "city": addr.city,
        "state": addr.state,
        "country": addr.country,
        "postal_code": addr.postal_code
    })

@router.post("/address")
async def update_billing_address(
    payload: BillingAddressUpdate,
    current_org: Organization = Depends(get_current_tenant_org),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(BillingAddress).where(BillingAddress.organization_id == current_org.id))
    addr = res.scalar_one_or_none()

    if not addr:
        addr = BillingAddress(
            organization_id=current_org.id,
            business_name=payload.business_name,
            gst_number=payload.gst_number,
            tax_id=payload.tax_id,
            address_line1=payload.address_line1,
            address_line2=payload.address_line2,
            city=payload.city,
            state=payload.state,
            country=payload.country,
            postal_code=payload.postal_code
        )
        db.add(addr)
    else:
        addr.business_name = payload.business_name
        addr.gst_number = payload.gst_number
        addr.tax_id = payload.tax_id
        addr.address_line1 = payload.address_line1
        addr.address_line2 = payload.address_line2
        addr.city = payload.city
        addr.state = payload.state
        addr.country = payload.country
        addr.postal_code = payload.postal_code

    await db.commit()
    return success_response(message="Billing address and GST profile updated successfully")
