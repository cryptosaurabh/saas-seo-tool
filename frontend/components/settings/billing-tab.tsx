"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Check,
  CreditCard,
  Download,
  Sparkles,
  Zap,
  RotateCcw,
  Building2,
  Receipt,
  Eye,
  Percent,
  Calendar,
  AlertCircle
} from "lucide-react";

import { CheckoutModal } from "@/components/billing/checkout-modal";
import { CreditTopupModal } from "@/components/billing/credit-topup-modal";
import { InvoiceViewModal } from "@/components/billing/invoice-view-modal";
import { RefundRequestModal } from "@/components/billing/refund-request-modal";

export function BillingTab() {
  const [activePlan, setActivePlan] = useState("professional");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [aiCredits, setAiCredits] = useState(2500);
  const [isSubCanceled, setIsSubCanceled] = useState(false);

  // Modals state
  const [checkoutPlan, setCheckoutPlan] = useState<{
    code: string;
    name: string;
    monthlyPrice: number;
    yearlyPrice: number;
  } | null>(null);
  const [isCreditTopupOpen, setIsCreditTopupOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isRefundOpen, setIsRefundOpen] = useState(false);

  // GST State
  const [businessName, setBusinessName] = useState("Acme Agency Inc.");
  const [gstNumber, setGstNumber] = useState("27AABCU9603R1ZN");
  const [address, setAddress] = useState("100 Market St, San Francisco, CA");
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const plans = [
    {
      code: "free",
      name: "Free Tier",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: ["1 Website", "1 Project", "100 Keywords", "5 Audits", "50 AI Credits"],
      current: activePlan === "free"
    },
    {
      code: "starter",
      name: "Starter",
      monthlyPrice: 29,
      yearlyPrice: 278,
      features: ["5 Websites", "3 Projects", "500 Keywords", "25 Audits", "500 AI Credits"],
      current: activePlan === "starter"
    },
    {
      code: "professional",
      name: "Professional",
      monthlyPrice: 79,
      yearlyPrice: 758,
      features: ["20 Websites", "10 Projects", "2,500 Keywords", "100 Audits", "2,500 AI Credits", "API Access"],
      current: activePlan === "professional",
      popular: true
    },
    {
      code: "agency",
      name: "Agency",
      monthlyPrice: 199,
      yearlyPrice: 1910,
      features: ["50 Websites", "25 Projects", "10,000 Keywords", "500 Audits", "10,000 AI Credits", "White Labeling"],
      current: activePlan === "agency"
    },
    {
      code: "enterprise",
      name: "Enterprise",
      monthlyPrice: 499,
      yearlyPrice: 4790,
      features: ["Unlimited Websites", "Unlimited Projects", "50,000 Keywords", "Unlimited Audits", "50,000 AI Credits", "Dedicated SLA"],
      current: activePlan === "enterprise"
    }
  ];

  return (
    <div className="space-y-6 text-foreground">
      {/* Active Subscription Banner */}
      <Card className="p-6 bg-gradient-to-r from-primary/15 via-card to-card border-primary/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={isSubCanceled ? "secondary" : "default"} className="glow-primary">
                {isSubCanceled ? "CANCELED AT PERIOD END" : "ACTIVE SUBSCRIPTION"}
              </Badge>
              <Badge variant="outline">{billingCycle.toUpperCase()}</Badge>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-foreground">
              {activePlan.toUpperCase()} PLAN
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {isSubCanceled
                ? "Your subscription will end on August 25, 2026. Access remains active until then."
                : `Next billing date: August 25, 2026 ($${billingCycle === "yearly" ? 758 : 79}.00/${billingCycle === "yearly" ? "yr" : "mo"})`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
            >
              Switch to {billingCycle === "monthly" ? "Yearly (Save 20%)" : "Monthly"}
            </Button>

            {isSubCanceled ? (
              <Button size="sm" onClick={() => setIsSubCanceled(false)}>
                Resume Subscription
              </Button>
            ) : (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsSubCanceled(true)}
              >
                Cancel Subscription
              </Button>
            )}

            <Button
              size="sm"
              className="glow-primary"
              onClick={() => setCheckoutPlan(plans[3])}
            >
              Upgrade Tier
            </Button>
          </div>
        </div>

        {/* Live Quota & Usage Meters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/80">
          <div>
            <div className="text-xs text-muted-foreground">Websites Monitored</div>
            <div className="text-lg font-black mt-0.5">8 / 20</div>
            <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-primary w-[40%]" />
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground">Keywords Tracked</div>
            <div className="text-lg font-black mt-0.5">1,240 / 2,500</div>
            <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-emerald-500 w-[49.6%]" />
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground">Audits Used</div>
            <div className="text-lg font-black mt-0.5">38 / 100</div>
            <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-amber-500 w-[38%]" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>AI Credits Balance</span>
              <button
                onClick={() => setIsCreditTopupOpen(true)}
                className="text-[10px] font-bold text-primary hover:underline flex items-center gap-0.5"
              >
                <Zap className="w-3 h-3" /> Top Up
              </button>
            </div>
            <div className="text-lg font-black text-primary mt-0.5">
              {aiCredits.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">credits</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-primary w-[75%]" />
            </div>
          </div>
        </div>
      </Card>

      {/* Available Tiers Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-foreground">Available Subscription Plans</h3>
            <p className="text-xs text-muted-foreground">Scale your SEO capabilities as your site traffic grows.</p>
          </div>

          {/* Toggle */}
          <div className="p-1 bg-muted rounded-lg flex items-center gap-1 text-xs">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-3 py-1 font-bold rounded-md transition-all ${
                billingCycle === "monthly" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-3 py-1 font-bold rounded-md transition-all ${
                billingCycle === "yearly" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              Yearly (20% OFF)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {plans.map((p) => {
            const price = billingCycle === "yearly" ? p.yearlyPrice : p.monthlyPrice;
            return (
              <Card
                key={p.code}
                className={`relative flex flex-col justify-between p-4 transition-all ${
                  p.popular ? "border-primary glow-primary bg-card/90" : "border-border"
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[9px] font-black uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-sm text-foreground">{p.name}</h4>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl font-black text-foreground">${price}</span>
                    <span className="text-[10px] text-muted-foreground">/{billingCycle === "yearly" ? "yr" : "mo"}</span>
                  </div>

                  <ul className="mt-4 space-y-1.5 text-[11px]">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-muted-foreground">
                        <Check className="w-3 h-3 text-primary shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <Button
                    variant={p.current ? "outline" : p.popular ? "primary" : "secondary"}
                    size="sm"
                    className="w-full text-xs"
                    disabled={p.current}
                    onClick={() => setCheckoutPlan(p)}
                  >
                    {p.current ? "Current Plan" : "Select " + p.name}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Tax & GST Profile Card */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-bold text-foreground">GST & Billing Address Profile</h3>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsEditingAddress(!isEditingAddress)}
          >
            {isEditingAddress ? "Save Profile" : "Edit Profile"}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="text-muted-foreground font-medium">Business Name</label>
            {isEditingAddress ? (
              <Input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="h-8 text-xs mt-1"
              />
            ) : (
              <div className="font-bold text-foreground mt-0.5">{businessName}</div>
            )}
          </div>

          <div>
            <label className="text-muted-foreground font-medium">GSTIN / Tax ID</label>
            {isEditingAddress ? (
              <Input
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
                className="h-8 text-xs mt-1"
              />
            ) : (
              <div className="font-bold text-foreground mt-0.5">{gstNumber}</div>
            )}
          </div>

          <div>
            <label className="text-muted-foreground font-medium">Billing Address</label>
            {isEditingAddress ? (
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="h-8 text-xs mt-1"
              />
            ) : (
              <div className="font-bold text-foreground mt-0.5">{address}</div>
            )}
          </div>
        </div>
      </Card>

      {/* Billing History & Invoices Table */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Billing History & Tax Invoices</h3>
          </div>

          <Button size="sm" variant="ghost" className="text-xs text-muted-foreground" onClick={() => setIsRefundOpen(true)}>
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> Request Refund
          </Button>
        </div>

        <div className="divide-y divide-border text-xs">
          {[
            { id: "INV-2026-001", date: "Jul 25, 2026", amount: "$93.22", subtotal: "$79.00", tax: "$14.22", status: "Paid" },
            { id: "INV-2026-002", date: "Jun 25, 2026", amount: "$93.22", subtotal: "$79.00", tax: "$14.22", status: "Paid" },
            { id: "INV-2026-003", date: "May 25, 2026", amount: "$93.22", subtotal: "$79.00", tax: "$14.22", status: "Paid" }
          ].map((inv) => (
            <div key={inv.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-foreground">{inv.id}</div>
                  <div className="text-[10px] text-muted-foreground">{inv.date} • Card ending in 4242</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="success">{inv.status}</Badge>
                <span className="font-extrabold text-foreground text-sm">{inv.amount}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedInvoice(inv)}
                  className="h-8 text-xs"
                >
                  <Eye className="w-3.5 h-3.5 mr-1" /> Invoice
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Render Modals */}
      {checkoutPlan && (
        <CheckoutModal
          isOpen={!!checkoutPlan}
          onClose={() => setCheckoutPlan(null)}
          planCode={checkoutPlan.code}
          planName={checkoutPlan.name}
          monthlyPrice={checkoutPlan.monthlyPrice}
          yearlyPrice={checkoutPlan.yearlyPrice}
          billingCycle={billingCycle}
        />
      )}

      <CreditTopupModal
        isOpen={isCreditTopupOpen}
        onClose={() => setIsCreditTopupOpen(false)}
        onSuccess={(newBal) => setAiCredits(newBal)}
        currentBalance={aiCredits}
      />

      <InvoiceViewModal
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        invoice={selectedInvoice}
      />

      <RefundRequestModal
        isOpen={isRefundOpen}
        onClose={() => setIsRefundOpen(false)}
      />
    </div>
  );
}
