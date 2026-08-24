from typing import Dict, Any, Tuple
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.subscription import Subscription
from app.models.billing_models import CreditLedger

# Default credit deduction costs per feature
CREDIT_COSTS = {
    "ai_content_generation": 10,
    "ai_chat_message": 2,
    "bulk_audit_page": 5,
    "keyword_clustering": 5,
    "eeat_analysis": 15
}

class CreditService:
    """Manages AI Credits balance, ledger entries, and deduction logic."""

    @staticmethod
    async def get_balance(db: AsyncSession, organization_id: str) -> int:
        res = await db.execute(select(Subscription).where(Subscription.organization_id == organization_id))
        sub = res.scalar_one_or_none()
        return sub.ai_credits_balance if sub else 0

    @staticmethod
    async def deduct_credits(
        db: AsyncSession,
        organization_id: str,
        feature_category: str,
        amount: int,
        description: str
    ) -> Tuple[bool, str, int]:
        """Deducts credits if available, records in CreditLedger."""
        res = await db.execute(select(Subscription).where(Subscription.organization_id == organization_id))
        sub = res.scalar_one_or_none()

        if not sub:
            return False, "Subscription record not found", 0

        if sub.ai_credits_balance < amount:
            return False, f"Insufficient AI credits. Required: {amount}, Available: {sub.ai_credits_balance}", sub.ai_credits_balance

        sub.ai_credits_balance -= amount
        
        ledger_entry = CreditLedger(
            organization_id=sub.organization_id,
            amount=-amount,
            credit_type="deduction",
            feature_category=feature_category,
            description=description,
            balance_after=sub.ai_credits_balance
        )
        db.add(ledger_entry)
        await db.commit()
        await db.refresh(sub)
        return True, "Credits deducted successfully", sub.ai_credits_balance

    @staticmethod
    async def add_credits(
        db: AsyncSession,
        organization_id: str,
        amount: int,
        credit_type: str, # monthly_grant, purchased, bonus
        description: str
    ) -> Tuple[bool, str, int]:
        """Adds credits to the balance and logs in CreditLedger."""
        res = await db.execute(select(Subscription).where(Subscription.organization_id == organization_id))
        sub = res.scalar_one_or_none()

        if not sub:
            return False, "Subscription record not found", 0

        sub.ai_credits_balance += amount

        ledger_entry = CreditLedger(
            organization_id=sub.organization_id,
            amount=amount,
            credit_type=credit_type,
            feature_category=None,
            description=description,
            balance_after=sub.ai_credits_balance
        )
        db.add(ledger_entry)
        await db.commit()
        await db.refresh(sub)
        return True, "Credits added successfully", sub.ai_credits_balance
