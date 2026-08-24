"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  FileText, 
  Search, 
  PenTool, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles 
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ScreenshotsSection() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "Executive Dashboard", icon: LayoutDashboard },
    { id: "audit", label: "Technical AI Audit", icon: FileText },
    { id: "keywords", label: "Keyword Research", icon: Search },
    { id: "writer", label: "AI SEO Writer", icon: PenTool },
    { id: "competitors", label: "Competitor Intel", icon: Target }
  ];

  return (
    <section className="py-24 bg-card/20 border-y border-border/60 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="default" className="glow-primary">PRODUCT INTERFACE SHOWCASE</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Designed for Speed, Precision & Clarity
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Experience an enterprise UI built with modern glassmorphism, instant search, and real-time data visualizations.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-lg glow-primary"
                    : "border-border/60 bg-card/40 text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Mockup Container */}
        <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-2xl p-6 shadow-2xl glass-panel relative overflow-hidden">
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="font-bold text-base text-foreground">Multi-Tenant Overview Console</h3>
                  <p className="text-xs text-muted-foreground">Org: Acme Agency • 20 Monitored Websites</p>
                </div>
                <Badge variant="success" className="gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> All Crawlers Active
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-accent/40 border border-border">
                  <div className="text-[10px] text-muted-foreground font-semibold">TOTAL KEYWORDS</div>
                  <div className="text-2xl font-black text-foreground mt-1">14,890</div>
                  <div className="text-[10px] text-emerald-400 mt-1">+1,200 this week</div>
                </div>
                <div className="p-4 rounded-xl bg-accent/40 border border-border">
                  <div className="text-[10px] text-muted-foreground font-semibold">AVERAGE POSITION</div>
                  <div className="text-2xl font-black text-foreground mt-1">#4.2</div>
                  <div className="text-[10px] text-emerald-400 mt-1">Top 3 Average</div>
                </div>
                <div className="p-4 rounded-xl bg-accent/40 border border-border">
                  <div className="text-[10px] text-muted-foreground font-semibold">SITE HEALTH</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">98 / 100</div>
                  <div className="text-[10px] text-emerald-400 mt-1">0 Critical Errors</div>
                </div>
                <div className="p-4 rounded-xl bg-accent/40 border border-border">
                  <div className="text-[10px] text-muted-foreground font-semibold">MONTHLY TRAFFIC</div>
                  <div className="text-2xl font-black text-primary mt-1">1.2M</div>
                  <div className="text-[10px] text-primary mt-1">+34% vs Last Month</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "audit" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="font-bold text-base text-foreground">AI Technical Audit Module</h3>
                  <p className="text-xs text-muted-foreground">Scanned 14,200 Pages for domain: acmeagency.com</p>
                </div>
                <Badge variant="default">Audit Clean</Badge>
              </div>

              <div className="p-4 rounded-xl bg-card border border-border space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Canonical Tag Validation</span>
                  <span className="text-emerald-400">100% Passed</span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>SSL & HTTPS Security Checks</span>
                  <span className="text-emerald-400">100% Passed</span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Core Web Vitals LCP Indexing</span>
                  <span className="text-emerald-400">0.9s (Fast)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "keywords" && (
            <div className="p-6 text-center text-xs text-muted-foreground space-y-2 animate-in fade-in">
              <Search className="w-8 h-8 text-primary mx-auto" />
              <div className="font-bold text-sm text-foreground">High-Intent Longtail Keyword Discovery</div>
              <p>Explore volume, CPC, and intent filters across 150+ countries.</p>
            </div>
          )}

          {activeTab === "writer" && (
            <div className="p-6 text-center text-xs text-muted-foreground space-y-2 animate-in fade-in">
              <PenTool className="w-8 h-8 text-indigo-400 mx-auto" />
              <div className="font-bold text-sm text-foreground">SERP-Aligned AI Article Generator</div>
              <p>Generate 2,500-word structured articles tuned for Google's Helpful Content System.</p>
            </div>
          )}

          {activeTab === "competitors" && (
            <div className="p-6 text-center text-xs text-muted-foreground space-y-2 animate-in fade-in">
              <Target className="w-8 h-8 text-amber-400 mx-auto" />
              <div className="font-bold text-sm text-foreground">Real-Time Competitor Gap Analysis</div>
              <p>Compare ranking gaps and backlink profiles against top 5 market rivals.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function UseCasesGrid() {
  const useCases = [
    { title: "SEO & Marketing Agencies", desc: "Manage 50+ client accounts with isolated multi-tenant workspaces, white-label PDF reports, and team RBAC permissions." },
    { title: "SaaS & Tech Companies", desc: "Scale organic acquisition for high-margin SaaS keywords with automated technical audits and competitor gap tracking." },
    { title: "eCommerce Brands", desc: "Audit millions of product URLs, generate schema markup, and fix duplicate content canonical issues automatically." },
    { title: "SEO Consultants & Freelancers", desc: "Run instant audits, deliver professional audits in minutes, and manage client projects seamlessly." }
  ];

  return (
    <section className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="default" className="glow-primary">SOLUTIONS FOR EVERY TEAM</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Tailored Solutions for Your Scale
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Whether you manage 1 domain or 500 client sites, SEOPilot AI scales effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((uc, i) => (
            <div key={i} className="p-6 rounded-2xl border border-border bg-card/40 glass-panel space-y-3 hover:border-primary/40 transition-all">
              <h3 className="font-bold text-lg text-foreground">{uc.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{uc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
