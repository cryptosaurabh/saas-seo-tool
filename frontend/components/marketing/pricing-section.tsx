"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check, Sparkles, ArrowRight, Star, Quote } from "lucide-react";

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      name: "Starter",
      code: "starter",
      priceMonthly: 29,
      priceYearly: 24,
      desc: "Perfect for freelancers and small website owners.",
      features: [
        "5 Websites Monitored",
        "5 Team Members",
        "3 Workspaces",
        "Weekly Automated Audits",
        "Email & In-App Notifications",
        "Standard PDF Reports"
      ],
      popular: false,
      cta: "Start 14-Day Trial"
    },
    {
      name: "Professional",
      code: "professional",
      priceMonthly: 79,
      priceYearly: 65,
      desc: "Designed for growing SaaS teams and marketing agencies.",
      features: [
        "20 Websites Monitored",
        "15 Team Members",
        "10 Workspaces",
        "Daily Real-time Audits",
        "Scoped API Key Access",
        "White-Label Reports",
        "Google Search Console Sync"
      ],
      popular: true,
      cta: "Start Free Trial"
    },
    {
      name: "Agency",
      code: "agency",
      priceMonthly: 199,
      priceYearly: 165,
      desc: "Unlimited power for high-volume SEO & digital agencies.",
      features: [
        "Unlimited Websites",
        "Unlimited Team Members",
        "Unlimited Workspaces",
        "Real-time SERP Monitoring",
        "Dedicated Account Manager",
        "Custom Webhook Integration",
        "99.9% Uptime SLA Guarantee"
      ],
      popular: false,
      cta: "Contact Enterprise"
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="default" className="glow-primary">TRANSPARENT PRICING</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Simple Plans for Every Stage of Growth
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            No long-term contracts. Switch or cancel anytime. All plans include 14 days free.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs font-semibold ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                isYearly ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isYearly ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-xs font-semibold ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Yearly Billing <span className="text-emerald-400 font-bold text-[10px] ml-1">(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => {
            const price = isYearly ? p.priceYearly : p.priceMonthly;
            return (
              <Card
                key={p.code}
                className={`relative flex flex-col justify-between p-8 transition-all duration-300 ${
                  p.popular ? "border-primary glow-primary bg-card/90 shadow-2xl scale-105 z-10" : "border-border/80 bg-card/40"
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-extrabold uppercase tracking-widest shadow-lg">
                    MOST POPULAR CHOICE
                  </div>
                )}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-extrabold text-xl text-foreground">{p.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{p.desc}</p>
                  </div>

                  <div className="flex items-baseline gap-1 border-b border-border/60 pb-6">
                    <span className="text-4xl font-black text-foreground">${price}</span>
                    <span className="text-xs text-muted-foreground">/ month</span>
                    {isYearly && <span className="text-[10px] text-emerald-400 ml-2 font-semibold">billed annually</span>}
                  </div>

                  <ul className="space-y-3 text-xs">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-muted-foreground">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Link href="/signup">
                    <Button
                      variant={p.popular ? "primary" : "outline"}
                      className="w-full h-11"
                    >
                      {p.cta} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsCarousel() {
  const reviews = [
    {
      name: "Marcus Vance",
      role: "VP of Marketing",
      company: "Apex Media Agency",
      review: "SEOPilot AI replaced 4 separate tools for our agency. We manage 40 client sites with automated weekly white-label reporting. It saved us 20 hours a week.",
      rating: 5
    },
    {
      name: "Elena Rostova",
      role: "Head of Growth",
      company: "CloudScale SaaS",
      review: "The competitor intelligence and real-time SERP position tracking helped us grow organic traffic by 180% in 90 days.",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Founder",
      company: "EcomBoost",
      review: "The schema generator and technical audit engine caught errors our previous tools completely missed. Essential for any enterprise site.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-card/20 border-y border-border/60 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="default" className="glow-primary">CUSTOMER STORIES</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Loved by SEO Leaders Worldwide
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            See how top agencies and marketing teams scale their organic search results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="p-6 rounded-2xl border border-border bg-card/60 glass-panel flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  "{r.review}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-indigo-500 font-bold text-white flex items-center justify-center text-xs">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-bold text-xs text-foreground">{r.name}</div>
                  <div className="text-[10px] text-muted-foreground">{r.role} • {r.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
