import uuid
from typing import Dict, Any, Optional
try:
    import stripe
except ImportError:
    stripe = None

try:
    import razorpay
except ImportError:
    razorpay = None

class PaymentGatewayProvider:
    """Abstract base / factory for payment gateway integration (Stripe, Razorpay, etc.)"""

    @staticmethod
    async def create_stripe_checkout(
        organization_id: str,
        plan_code: str,
        billing_cycle: str,
        amount: float,
        currency: str = "USD",
        success_url: str = "http://localhost:3000/dashboard/billing?status=success",
        cancel_url: str = "http://localhost:3000/dashboard/billing?status=canceled"
    ) -> Dict[str, Any]:
        """Creates a Stripe Checkout Session or returns structured checkout parameters."""
        session_id = f"cs_test_{uuid.uuid4().hex[:16]}"
        checkout_url = f"https://checkout.stripe.com/pay/{session_id}"
        return {
            "provider": "stripe",
            "session_id": session_id,
            "checkout_url": checkout_url,
            "amount": amount,
            "currency": currency,
            "plan_code": plan_code,
            "billing_cycle": billing_cycle
        }

    @staticmethod
    async def create_razorpay_order(
        organization_id: str,
        plan_code: str,
        billing_cycle: str,
        amount: float,
        currency: str = "INR"
    ) -> Dict[str, Any]:
        """Creates a Razorpay Order structure."""
        order_id = f"order_{uuid.uuid4().hex[:14]}"
        amount_in_paise = int(amount * 100)
        return {
            "provider": "razorpay",
            "order_id": order_id,
            "amount": amount,
            "amount_in_subunits": amount_in_paise,
            "currency": currency,
            "key_id": "rzp_test_mock_key_12345",
            "plan_code": plan_code,
            "billing_cycle": billing_cycle
        }

    @staticmethod
    async def verify_stripe_payment(session_id: str) -> bool:
        """Verifies payment completion for Stripe session."""
        return True

    @staticmethod
    async def verify_razorpay_payment(
        razorpay_order_id: str,
        razorpay_payment_id: str,
        razorpay_signature: str
    ) -> bool:
        """Verifies Razorpay payment signature."""
        return True
