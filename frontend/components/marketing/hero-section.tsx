"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Search, 
  CheckCircle2, 
  Zap, 
  ShieldCheck,
  BarChart3,
  Globe,
  Award,
  ArrowUpRight
} from "lucide-react";

export function HeroSection() {
  const [activeMetric, setActiveMetric] = useState("traffic");

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-background">
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-primary/30 via-purple-600/20 to-indigo-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column Text & CTAs */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <Badge variant="default" className="glow-primary px-4 py-1 text-xs gap-2 border-primary/30">
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" /> NEXT-GEN AI SEO OPERATING SYSTEM
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground leading-[1.08]">
            Automate Your <span className="bg-gradient-to-r from-primary via-indigo-400 to-purple-400 bg-clip-text text-transparent">SEO Growth</span> with AI
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
            The enterprise AI-powered platform for agencies, SaaS teams, and marketers. Automate technical site audits, keyword position tracking, competitor intelligence, and content strategy in real time.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-sm gap-2 glow-primary shadow-xl">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-sm gap-2">
                Book Live Demo
              </Button>
            </Link>
          </div>

          {/* Micro trust indicators */}
          <div className="pt-4 flex items-center gap-6 text-xs text-muted-foreground border-t border-border/40">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Instant setup</span>
            </div>
          </div>
        </div>

        {/* Right Column Interactive Glass Dashboard Visual */}
        <div className="lg:col-span-6 relative p-3 sm:p-6">
          {/* Micro Floating Graphic Pills (Positioned on outer relative container) */}
          <div className="absolute -top-2 right-2 sm:top-0 sm:right-2 z-20 p-3 rounded-2xl border border-border/80 bg-card/95 shadow-2xl glass-panel hidden sm:flex items-center gap-3 animate-bounce duration-[3000ms]">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Top Keyword #1</div>
              <div className="text-[10px] text-muted-foreground">"ai seo platform"</div>
            </div>
          </div>

          <div className="absolute -bottom-2 left-2 sm:bottom-0 sm:left-2 z-20 p-3 rounded-2xl border border-border/80 bg-card/95 shadow-2xl glass-panel hidden sm:flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">AI Audit Engine</div>
              <div className="text-[10px] text-emerald-400">0 Critical Errors Found</div>
            </div>
          </div>

          {/* Main Glass Card Preview Wrapper */}
          <div className="rounded-3xl border border-border/80 bg-card/60 backdrop-blur-2xl p-6 shadow-2xl glass-panel space-y-6 relative group overflow-hidden mt-4 mb-4">
            {/* Top Interactive Metric Bar */}
            <div className="flex items-center justify-between border-b border-border/60 pb-4 pr-0 sm:pr-40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-indigo-500 flex items-center justify-center text-white font-bold text-base shadow-md">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">Live Tenant Audit</div>
                  <div className="text-[10px] text-muted-foreground">Updated 1 minute ago</div>
                </div>
              </div>
              <Badge variant="success" className="gap-1">
                <TrendingUp className="w-3 h-3" /> +142.8% Organic Traffic
              </Badge>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-accent/40 border border-border/60 text-left">
                <div className="text-[10px] text-muted-foreground font-semibold uppercase">SEO Health</div>
                <div className="text-xl font-black text-emerald-500 mt-1">98 / 100</div>
                <div className="text-[9px] text-emerald-400 mt-0.5">Top 1% Score</div>
              </div>
              <div className="p-3 rounded-2xl bg-accent/40 border border-border/60 text-left">
                <div className="text-[10px] text-muted-foreground font-semibold uppercase">Rankings #1</div>
                <div className="text-xl font-black text-foreground mt-1">1,480</div>
                <div className="text-[9px] text-primary mt-0.5">+42 positions this week</div>
              </div>
              <div className="p-3 rounded-2xl bg-accent/40 border border-border/60 text-left">
                <div className="text-[10px] text-muted-foreground font-semibold uppercase">Domain Rating</div>
                <div className="text-xl font-black text-indigo-400 mt-1">79 DR</div>
                <div className="text-[9px] text-indigo-300 mt-0.5">Enterprise Tier</div>
              </div>
            </div>

            {/* Simulated Animated Graph Area */}
            <div className="p-4 rounded-2xl bg-card/80 border border-border/60 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">Organic Growth Trajectory</span>
                <span className="text-[10px] text-muted-foreground">Past 30 Days</span>
              </div>
              <div className="h-32 w-full flex items-end justify-between gap-2 pt-4 px-2">
                {[35, 45, 40, 60, 55, 75, 70, 90, 85, 100].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group/bar">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-primary/30 to-primary transition-all duration-500 group-hover/bar:brightness-125 glow-primary"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
