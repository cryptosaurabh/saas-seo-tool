from typing import Tuple, Optional, Dict, Any
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.billing_models import Coupon, CouponUsage

class CouponService:
    """Manages coupon validation, usage limits, and discount calculations."""

    @staticmethod
    async def validate_coupon(
        db: AsyncSession,
        code: str,
        purchase_amount: float,
        organization_id: Optional[str] = None
    ) -> Tuple[bool, str, Optional[Dict[str, Any]]]:
        res = await db.execute(select(Coupon).where(Coupon.code == code.upper().strip()))
        coupon = res.scalar_one_or_none()

        if not coupon:
            return False, "Invalid coupon code", None

        if not coupon.is_active:
            return False, "This coupon is no longer active", None

        if coupon.expires_at and coupon.expires_at < datetime.utcnow():
            return False, "This coupon has expired", None

        if coupon.max_uses > 0 and coupon.times_used >= coupon.max_uses:
            return False, "Coupon usage limit reached", None

        if purchase_amount < float(coupon.min_purchase_amount):
            return False, f"Minimum purchase amount of ${coupon.min_purchase_amount:.2f} required", None

        # Compute discount
        if coupon.discount_type == "percentage":
            discount = purchase_amount * (float(coupon.discount_value) / 100.0)
            if coupon.max_discount_amount and discount > float(coupon.max_discount_amount):
                discount = float(coupon.max_discount_amount)
        else: # flat
            discount = float(coupon.discount_value)

        discount = min(discount, purchase_amount) # Discount cannot exceed total price

        final_amount = max(0.0, purchase_amount - discount)

        return True, "Coupon applied successfully", {
            "code": coupon.code,
            "discount_type": coupon.discount_type,
            "discount_value": float(coupon.discount_value),
            "discount_amount": round(discount, 2),
            "final_amount": round(final_amount, 2)
        }

    @staticmethod
    async def record_coupon_usage(
        db: AsyncSession,
        code: str,
        organization_id: str,
        discount_applied: float
    ) -> bool:
        res = await db.execute(select(Coupon).where(Coupon.code == code.upper().strip()))
        coupon = res.scalar_one_or_none()
        if coupon:
            coupon.times_used += 1
            usage = CouponUsage(
                coupon_id=coupon.id,
                organization_id=organization_id,
                discount_applied=discount_applied
            )
            db.add(usage)
            await db.commit()
            return True
        return False
