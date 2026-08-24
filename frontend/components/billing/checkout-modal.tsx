"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Percent,
  Receipt,
  Building2,
  ArrowRight,
  Zap
} from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planCode: string;
  planName: string;
  monthlyPrice: number;
  yearlyPrice: number;
  billingCycle: "monthly" | "yearly";
}

export function CheckoutModal({
  isOpen,
  onClose,
  planCode,
  planName,
  monthlyPrice,
  yearlyPrice,
  billingCycle: initialCycle,
}: CheckoutModalProps) {
  const [cycle, setCycle] = useState<"monthly" | "yearly">(initialCycle);
  const [provider, setProvider] = useState<"stripe" | "razorpay">("stripe");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [gstNumber, setGstNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const basePrice = cycle === "yearly" ? yearlyPrice : monthlyPrice;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const subtotal = Math.max(0, basePrice - discountAmount);
  const taxRate = provider === "razorpay" || gstNumber.length > 0 ? 0.18 : 0.0;
  const taxAmount = Math.round(subtotal * taxRate * 100) / 100;
  const finalTotal = Math.round((subtotal + taxAmount) * 100) / 100;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "WELCOME20" || couponCode.toUpperCase() === "PROMO50") {
      const disc = couponCode.toUpperCase() === "PROMO50" ? basePrice * 0.5 : basePrice * 0.2;
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount: disc });
    } else if (couponCode.trim().length > 0) {
      alert("Invalid coupon code. Try WELCOME20 or PROMO50");
    }
  };

  const handleCompletePayment = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-card border-border sm:rounded-2xl p-0 overflow-hidden text-foreground">
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black tracking-tight">Payment Successful!</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Your subscription to <span className="font-bold text-foreground">{planName}</span> ({cycle}) has been activated.
              Welcome to enterprise-grade AI SEO workflows!
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <Button onClick={() => { setIsSuccess(false); onClose(); }}>
                Go to Billing Dashboard
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header Banner */}
            <div className="p-6 bg-gradient-to-r from-primary/20 via-background to-background border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="default" className="mb-2">SECURE CHECKOUT</Badge>
                  <DialogTitle className="text-2xl font-black">Upgrade to {planName}</DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                    Unlock full AI search intelligence, rank tracking, and site audit limits.
                  </DialogDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-primary">${finalTotal.toFixed(2)}</div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    {cycle} billing
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Payment & Billing Info */}
              <div className="space-y-4">
                {/* Billing Cycle Selector */}
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                    Billing Cycle
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
                    <button
                      type="button"
                      onClick={() => setCycle("monthly")}
                      className={`py-2 text-xs font-bold rounded-md transition-all ${
                        cycle === "monthly" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setCycle("yearly")}
                      className={`py-2 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1 ${
                        cycle === "yearly" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
                      }`}
                    >
                      Yearly <Badge variant="secondary" className="text-[9px] px-1 py-0 bg-emerald-500 text-white">SAVE 20%</Badge>
                    </button>
                  </div>
                </div>

                {/* Gateway Selection */}
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                    Payment Provider
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      onClick={() => setProvider("stripe")}
                      className={`p-3 border rounded-xl cursor-pointer transition-all flex items-center gap-3 ${
                        provider === "stripe" ? "border-primary bg-primary/10" : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-xs font-bold">Stripe / Cards</div>
                        <div className="text-[10px] text-muted-foreground">Visa, Mastercard, Amex</div>
                      </div>
                    </div>

                    <div
                      onClick={() => setProvider("razorpay")}
                      className={`p-3 border rounded-xl cursor-pointer transition-all flex items-center gap-3 ${
                        provider === "razorpay" ? "border-primary bg-primary/10" : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <Zap className="w-5 h-5 text-emerald-500" />
                      <div>
                        <div className="text-xs font-bold">Razorpay / UPI</div>
                        <div className="text-[10px] text-muted-foreground">UPI, GPay, NetBanking</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tax / GST Details */}
                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <Building2 className="w-4 h-4 text-primary" />
                    <span>Business GST & Tax Details (Optional)</span>
                  </div>
                  <Input
                    placeholder="Business Name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="h-8 text-xs bg-muted/40"
                  />
                  <Input
                    placeholder="GSTIN / Tax Registration No."
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    className="h-8 text-xs bg-muted/40"
                  />
                </div>
              </div>

              {/* Right Column: Order Summary & Coupons */}
              <div className="space-y-4 bg-muted/30 p-4 rounded-xl border border-border flex flex-col justify-between">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Order Summary
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{planName} Plan ({cycle})</span>
                      <span className="font-semibold">${basePrice.toFixed(2)}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-emerald-500 font-semibold">
                        <span className="flex items-center gap-1">
                          <Percent className="w-3.5 h-3.5" /> Coupon ({appliedCoupon.code})
                        </span>
                        <span>-${appliedCoupon.discount.toFixed(2)}</span>
                      </div>
                    )}

                    {taxAmount > 0 && (
                      <div className="flex justify-between text-muted-foreground">
                        <span>Tax / GST (18%)</span>
                        <span>+${taxAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-border flex justify-between items-baseline font-bold text-sm">
                      <span>Total Due Today</span>
                      <span className="text-primary text-base">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Coupon Code Input */}
                  <div className="pt-3 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Promo Code (e.g. WELCOME20)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="h-8 text-xs bg-background"
                      />
                      <Button size="sm" variant="outline" onClick={handleApplyCoupon} className="h-8 text-xs">
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Button
                    onClick={handleCompletePayment}
                    disabled={isProcessing}
                    className="w-full h-11 font-bold text-sm glow-primary"
                  >
                    {isProcessing ? "Processing Payment..." : `Pay $${finalTotal.toFixed(2)} & Activate`}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>256-Bit SSL Encryption • PCI-DSS Compliant • Cancel Anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
