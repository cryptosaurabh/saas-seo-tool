"use client";

import React from "react";
import { BillingTab } from "@/components/settings/billing-tab";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">Subscription & Billing</h1>
        <p className="text-xs text-muted-foreground">Manage your plan, check usage quotas, and download invoices.</p>
      </div>
      <BillingTab />
    </div>
  );
}
