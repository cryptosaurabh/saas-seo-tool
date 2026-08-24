import uuid
from datetime import datetime
from typing import Dict, Any, List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.subscription import Invoice

class InvoiceService:
    """Handles Invoice generation, line item tax calculation, and PDF url generation."""

    @staticmethod
    async def create_invoice(
        db: AsyncSession,
        organization_id: str,
        amount: float,
        currency: str = "USD",
        billing_reason: str = "subscription_cycle",
        line_items: Optional[List[Dict[str, Any]]] = None,
        discount_amount: float = 0.0,
        tax_rate: float = 0.18 # e.g. 18% GST if applicable
    ) -> Invoice:
        invoice_num = f"INV-{datetime.utcnow().strftime('%Y%m')}-{uuid.uuid4().hex[:6].upper()}"
        
        subtotal = amount
        tax = round((subtotal - discount_amount) * tax_rate, 2) if tax_rate > 0 else 0.0
        final_total = round((subtotal - discount_amount) + tax, 2)

        if not line_items:
            line_items = [{
                "description": f"SEOPilot AI Subscription - {billing_reason.replace('_', ' ').title()}",
                "amount": amount,
                "quantity": 1
            }]

        inv = Invoice(
            organization_id=organization_id,
            invoice_number=invoice_num,
            subtotal=subtotal,
            tax_amount=tax,
            discount_amount=discount_amount,
            amount=final_total,
            currency=currency,
            payment_status="paid",
            pdf_url=f"/api/v1/billing/invoices/{invoice_num}/pdf",
            provider_invoice_id=f"in_{uuid.uuid4().hex[:12]}",
            billing_reason=billing_reason,
            line_items=line_items
        )

        db.add(inv)
        await db.commit()
        await db.refresh(inv)
        return inv
