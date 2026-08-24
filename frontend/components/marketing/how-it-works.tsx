"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Link2, Search, Sparkles, TrendingUp, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Connect Your Domain",
      description: "Integrate your domain or Google Search Console in seconds. SEOPilot AI automatically sets up your isolated workspace tenant.",
      icon: Link2
    },
    {
      step: "02",
      title: "Run Autonomous AI Audit",
      description: "Our crawler scans your site architecture, technical health, keywords, and competitor SERPs in real time.",
      icon: Search
    },
    {
      step: "03",
      title: "AI Generates Action Plan",
      description: "Receive prioritized recommendations, automated schema code, and optimized content briefs tailored to your niche.",
      icon: Sparkles
    },
    {
      step: "04",
      title: "Dominate SERP Rankings",
      description: "Track position increases, organic traffic growth, and client ROI with white-label automated reporting.",
      icon: TrendingUp
    }
  ];

  return (
    <section className="py-24 bg-card/20 border-y border-border/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="default" className="glow-primary">SIMPLE 4-STEP WORKFLOW</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            How SEOPilot AI Drives Organic Growth
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            From setup to top #1 rankings in 4 seamless automated steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-border bg-card/60 glass-panel space-y-4 relative group hover:border-primary/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-primary/40 font-mono group-hover:text-primary transition-colors">
                    {s.step}
                  </span>
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-bold text-base text-foreground">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ComparisonGrid() {
  const comparisons = [
    { feature: "Audit Speed & Depth", traditional: "Hours of manual CSV exports", seopilot: "Instant AI crawler in seconds" },
    { feature: "Content Generation", traditional: "Manual writing & expensive writers", seopilot: "SERP-aligned AI SEO writer" },
    { feature: "Rank Tracking Frequency", traditional: "Weekly updates", seopilot: "Real-time daily tracking across SERPs" },
    { feature: "Schema Generation", traditional: "Manual code editing & validation", seopilot: "1-click automated JSON-LD schema" },
    { feature: "Multi-Tenant Security", traditional: "Single shared account risks", seopilot: "Enterprise RBAC & organization isolation" },
    { feature: "API & Webhooks", traditional: "Expensive add-on plans", seopilot: "Programmatic API keys included" }
  ];

  return (
    <section className="py-24 bg-background relative">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Badge variant="default" className="glow-primary">WHY CHOOSE US</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Traditional SEO Tools vs. SEOPilot AI
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            See how SEOPilot AI transforms manual SEO workflows into automated growth.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/40 glass-panel overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/60 border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4 font-bold">Capabilities</th>
                <th className="p-4 font-bold text-muted-foreground">Traditional Tools</th>
                <th className="p-4 font-bold text-primary">SEOPilot AI OS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {comparisons.map((c, i) => (
                <tr key={i} className="hover:bg-accent/40 transition-colors">
                  <td className="p-4 font-bold text-foreground">{c.feature}</td>
                  <td className="p-4 text-muted-foreground line-through opacity-70">{c.traditional}</td>
                  <td className="p-4 font-semibold text-emerald-400 bg-primary/5">{c.seopilot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
