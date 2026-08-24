"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CreditCard, CheckCircle2, ShieldCheck, Zap, ArrowRight, Building2 } from "lucide-react";

export default function DedicatedCheckoutPage() {
  const searchParams = useSearchParams();
  const planParam = searchParams ? searchParams.get("plan") || "professional" : "professional";
  const cycleParam = searchParams ? (searchParams.get("cycle") as "monthly" | "yearly") || "monthly" : "monthly";

  const [provider, setProvider] = useState<"stripe" | "razorpay">("stripe");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [gst, setGst] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const priceMap: Record<string, { name: string; monthly: number; yearly: number }> = {
    free: { name: "Free Tier", monthly: 0, yearly: 0 },
    starter: { name: "Starter", monthly: 29, yearly: 278 },
    professional: { name: "Professional", monthly: 79, yearly: 758 },
    agency: { name: "Agency", monthly: 199, yearly: 1910 },
    enterprise: { name: "Enterprise", monthly: 499, yearly: 4790 }
  };

  const planInfo = priceMap[planParam] || priceMap["professional"];
  const basePrice = cycleParam === "yearly" ? planInfo.yearly : planInfo.monthly;
  const subtotal = Math.max(0, basePrice - discount);
  const tax = gst ? subtotal * 0.18 : 0;
  const total = subtotal + tax;

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === "WELCOME20") {
      setDiscount(basePrice * 0.2);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />
      <main className="pt-28 pb-16 max-w-4xl mx-auto px-6 w-full">
        {isSuccess ? (
          <Card className="p-12 text-center space-y-4 max-w-md mx-auto">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <h2 className="text-2xl font-black">Subscription Activated!</h2>
            <p className="text-xs text-muted-foreground">
              Thank you for subscribing to <span className="font-bold text-foreground">{planInfo.name}</span>.
            </p>
            <a href="/dashboard">
              <Button className="mt-4 glow-primary">Go to Dashboard</Button>
            </a>
          </Card>
        ) : (
          <div className="space-y-8">
            <div>
              <Badge variant="default">CHECKOUT</Badge>
              <h1 className="text-3xl font-black tracking-tight mt-1">Complete your Subscription</h1>
              <p className="text-xs text-muted-foreground">Secure transaction powered by Stripe & Razorpay.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Form details */}
              <Card className="p-6 space-y-5">
                <h3 className="font-bold text-sm text-foreground border-b border-border pb-2">1. Payment Method</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setProvider("stripe")}
                    className={`p-3 border rounded-xl cursor-pointer flex items-center gap-3 ${
                      provider === "stripe" ? "border-primary bg-primary/10" : "border-border"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-xs font-bold">Stripe</div>
                      <div className="text-[10px] text-muted-foreground">Credit / Debit Card</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setProvider("razorpay")}
                    className={`p-3 border rounded-xl cursor-pointer flex items-center gap-3 ${
                      provider === "razorpay" ? "border-primary bg-primary/10" : "border-border"
                    }`}
                  >
                    <Zap className="w-5 h-5 text-emerald-500" />
                    <div>
                      <div className="text-xs font-bold">Razorpay</div>
                      <div className="text-[10px] text-muted-foreground">UPI / NetBanking</div>
                    </div>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-foreground border-b border-border pb-2 pt-2">2. Business Tax Info</h3>
                <Input
                  placeholder="GSTIN / Tax ID (Optional)"
                  value={gst}
                  onChange={(e) => setGst(e.target.value)}
                  className="text-xs"
                />

                <Button
                  onClick={() => setIsSuccess(true)}
                  className="w-full h-11 font-bold glow-primary text-sm"
                >
                  Pay ${total.toFixed(2)} & Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>

              {/* Order Summary */}
              <Card className="p-6 space-y-4 bg-card/60 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-foreground border-b border-border pb-2">Order Summary</h3>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{planInfo.name} Plan ({cycleParam})</span>
                    <span className="font-bold">${basePrice.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-xs text-emerald-500 font-bold">
                      <span>Promo Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  {tax > 0 && (
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>GST Tax (18%)</span>
                      <span>+${tax.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Input
                      placeholder="Promo Code (WELCOME20)"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="text-xs h-8"
                    />
                    <Button size="sm" variant="outline" className="h-8 text-xs" onClick={handleApplyCoupon}>
                      Apply
                    </Button>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between items-baseline font-black text-base">
                    <span>Total Amount</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground flex items-center justify-center gap-1 pt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>256-Bit SSL Encrypted & PCI-DSS Compliant</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
