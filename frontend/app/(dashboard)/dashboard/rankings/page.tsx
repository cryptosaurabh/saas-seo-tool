"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/alert";
import { ChartsPlaceholder } from "@/components/ui/tooltip";
import { RankingsTable } from "@/components/rankings/rankings-table";
import { CompetitorComparison } from "@/components/rankings/competitor-comparison";
import { SERPFeaturesGrid } from "@/components/rankings/serp-features-grid";
import { RankingAlertsModal } from "@/components/rankings/ranking-alerts-modal";
import { 
  TrendingUp, 
  TrendingDown, 
  Trophy, 
  Target, 
  Bell, 
  Globe, 
  Users, 
  Layers,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function RankTrackerDashboardPage() {
  const [activeTab, setActiveTab] = useState<"rankings" | "competitors" | "serp">("rankings");
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);

  const [metrics] = useState({
    visibilityScore: 84.5,
    avgPosition: 4.2,
    keywordsImproved: 8,
    keywordsDropped: 2,
    trafficEstimate: "48.5k / mo"
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="default" className="glow-primary mb-1">ENTERPRISE RANK TRACKER & SERP ENGINE</Badge>
          <h1 className="text-3xl font-black text-foreground tracking-tight">
            Rank Tracking & Competitor Intelligence
          </h1>
          <p className="text-xs text-muted-foreground">Monitor daily Google Desktop & Mobile keyword positions, Share of Voice, and SERP feature captures.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => setIsAlertsOpen(true)} className="gap-2">
            <Bell className="w-4 h-4 text-primary" /> Live Alerts (3)
          </Button>
        </div>
      </div>

      {/* Overview Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center justify-between bg-gradient-to-tr from-card via-card to-emerald-500/10 border-emerald-500/20">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">SERP Visibility Score</div>
            <div className="text-3xl font-black text-emerald-400 mt-1">{metrics.visibilityScore}%</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">+3.2% gain vs last week</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Trophy className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Average Position</div>
            <div className="text-3xl font-black text-foreground mt-1">Rank #{metrics.avgPosition}</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">Top 5 Average</div>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <Target className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Winners vs Losers</div>
            <div className="text-2xl font-black text-foreground mt-1 text-emerald-400">+{metrics.keywordsImproved} <span className="text-xs font-normal text-muted-foreground">/ -{metrics.keywordsDropped}</span></div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">Net Gain: +6 Positions</div>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <TrendingUp className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Est. Organic Traffic</div>
            <div className="text-2xl font-black text-foreground mt-1">{metrics.trafficEstimate}</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">High Intent Clicks</div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Globe className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Position Distribution Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
        <Card className="p-4 bg-emerald-500/10 border-emerald-500/20">
          <div className="text-2xl font-black text-emerald-400">42 Keywords</div>
          <div className="text-[10px] uppercase font-bold text-muted-foreground mt-1">Top 3 Rankings</div>
        </Card>
        <Card className="p-4 bg-primary/10 border-primary/20">
          <div className="text-2xl font-black text-primary">28 Keywords</div>
          <div className="text-[10px] uppercase font-bold text-muted-foreground mt-1">Top 10 Rankings</div>
        </Card>
        <Card className="p-4 bg-indigo-500/10 border-indigo-500/20">
          <div className="text-2xl font-black text-indigo-400">14 Keywords</div>
          <div className="text-[10px] uppercase font-bold text-muted-foreground mt-1">Top 20 Rankings</div>
        </Card>
        <Card className="p-4 bg-amber-500/10 border-amber-500/20">
          <div className="text-2xl font-black text-amber-400">6 Keywords</div>
          <div className="text-[10px] uppercase font-bold text-muted-foreground mt-1">Top 50 Rankings</div>
        </Card>
      </div>

      {/* Position Trend Graph */}
      <ChartsPlaceholder title="Daily Ranking Position Movement Trend (Last 30 Days)" type="line" />

      {/* Main Tabs Navigation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          {[
            { id: "rankings", label: "Tracked Keywords Matrix", icon: Target },
            { id: "competitors", label: "Competitor Share of Voice", icon: Users },
            { id: "serp", label: "SERP Features Won", icon: Sparkles }
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm glow-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Panels */}
        {activeTab === "rankings" && (
          <RankingsTable />
        )}

        {activeTab === "competitors" && (
          <CompetitorComparison />
        )}

        {activeTab === "serp" && (
          <SERPFeaturesGrid />
        )}
      </div>

      {/* Ranking Movement Alerts Modal */}
      <RankingAlertsModal
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
      />
    </div>
  );
}
