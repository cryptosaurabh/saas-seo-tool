"use client";

import React from "react";
import { Building2, ShieldCheck, Star, Users, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TrustSection() {
  const companies = [
    "ACME AGENCY",
    "TECHCORP GLOBAL",
    "NEXUS MARKETING",
    "STRATOSPHERE MEDIA",
    "HYPERGROWTH INC",
    "APEX DIGITAL"
  ];

  return (
    <section className="py-12 border-y border-border/60 bg-card/20 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-8 text-center">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Trusted by 10,000+ SEO Experts, Agencies & Global Enterprise Teams
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center opacity-70 grayscale hover:grayscale-0 transition-all">
          {companies.map((company, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-border/40 bg-card/40 font-mono font-bold text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all text-center tracking-wider"
            >
              {company}
            </div>
          ))}
        </div>

        {/* Rating Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-border/40 text-center">
          <div>
            <div className="text-2xl font-black text-foreground">4.9 / 5.0</div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>G2 & Capterra Leader</span>
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-foreground">10M+</div>
            <div className="text-xs text-muted-foreground mt-1">Keywords Tracked Daily</div>
          </div>
          <div>
            <div className="text-2xl font-black text-foreground">99.9%</div>
            <div className="text-xs text-muted-foreground mt-1">Platform Uptime SLA</div>
          </div>
          <div>
            <div className="text-2xl font-black text-foreground">500K+</div>
            <div className="text-xs text-muted-foreground mt-1">Automated SEO Audits</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesGrid() {
  const features = [
    {
      title: "AI SEO Technical Audit",
      description: "Scan millions of pages in seconds. Detect broken links, missing meta tags, redirect loops, and indexability issues automatically.",
      category: "Audits"
    },
    {
      title: "Keyword Research Engine",
      description: "Discover high-intent longtail keywords with live search volume, keyword difficulty, and CPC competitive data.",
      category: "Keywords"
    },
    {
      title: "Competitor Intelligence",
      description: "Reverse engineer competitor backlink profiles, top ranking pages, and content gap strategies.",
      category: "Intelligence"
    },
    {
      title: "Technical SEO & Schema",
      description: "Automate JSON-LD structured data schema generation for FAQ, HowTo, Product, and Article schemas.",
      category: "Technical"
    },
    {
      title: "Real-Time Rank Tracking",
      description: "Monitor daily keyword ranking movements across Google Mobile, Desktop, and Local Search packs.",
      category: "Tracking"
    },
    {
      title: "AI SEO Content Writer",
      description: "Generate SERP-optimized articles and landing page copy structured to match top Google ranking signals.",
      category: "AI Copy"
    },
    {
      title: "Core Web Vitals Suite",
      description: "Track LCP, CLS, and FID performance scores with actionable code fixes for speed optimization.",
      category: "Performance"
    },
    {
      title: "Google Search Console Sync",
      description: "Seamlessly import impressions, CTR, and indexing data directly into your multi-tenant dashboards.",
      category: "Integrations"
    },
    {
      title: "Google Analytics 4 Sync",
      description: "Correlate organic rankings directly with revenue conversions and traffic growth metrics.",
      category: "Integrations"
    },
    {
      title: "Automated Agency Reports",
      description: "Generate white-label PDF reports scheduled weekly or monthly with custom client branding.",
      category: "Reporting"
    },
    {
      title: "AI SEO Co-Pilot Assistant",
      description: "Ask natural language questions to analyze complex site architecture and receive instant fixes.",
      category: "AI Agent"
    },
    {
      title: "Multi-Tenant Enterprise Security",
      description: "Role-based access control (RBAC), team permissions, audit logs, and scoped API key management.",
      category: "Security"
    }
  ];

  return (
    <section className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="default" className="glow-primary">ALL-IN-ONE PLATFORM</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Everything You Need to Dominate Organic Search
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Replace dozens of disconnected SEO tools with one unified AI operating system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-border bg-card/40 glass-panel hover:border-primary/40 transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
                    {feat.category}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
