import pytest
from app.services.coupon_service import CouponService
from app.services.payment_service import PaymentGatewayProvider
from app.services.invoice_service import InvoiceService

@pytest.mark.asyncio
async def test_stripe_checkout_creation():
    session = await PaymentGatewayProvider.create_stripe_checkout(
        organization_id="test_org_123",
        plan_code="professional",
        billing_cycle="yearly",
        amount=758.0
    )
    assert session["provider"] == "stripe"
    assert "checkout_url" in session
    assert session["amount"] == 758.0

@pytest.mark.asyncio
async def test_razorpay_order_creation():
    order = await PaymentGatewayProvider.create_razorpay_order(
        organization_id="test_org_123",
        plan_code="starter",
        billing_cycle="monthly",
        amount=29.0
    )
    assert order["provider"] == "razorpay"
    assert order["amount_in_subunits"] == 2900
    assert "order_id" in order
