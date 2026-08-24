"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartsPlaceholder } from "@/components/ui/tooltip";
import { MousePointer, Eye, TrendingUp, Target, CheckCircle2, AlertTriangle } from "lucide-react";

export function GSCPerformancePanel() {
  const gscData = {
    clicks: "48.5k",
    impressions: "1.24M",
    ctr: "3.9%",
    avgPosition: "4.2",
    queries: [
      { query: "seo audit software", clicks: 8400, impressions: 142000, ctr: "5.9%", position: 1.2 },
      { query: "ai technical crawler", clicks: 6200, impressions: 98000, ctr: "6.3%", position: 2.4 },
      { query: "keyword clustering tool", clicks: 5100, impressions: 84000, ctr: "6.0%", position: 3.1 }
    ],
    coverage: { valid: 485, excluded: 12, errors: 0 }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* GSC Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Total Organic Clicks</div>
            <div className="text-2xl font-black text-foreground mt-1">{gscData.clicks}</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">+12.4% vs last month</div>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <MousePointer className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Total Impressions</div>
            <div className="text-2xl font-black text-foreground mt-1">{gscData.impressions}</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">+8.6% reach expansion</div>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Eye className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Average CTR</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{gscData.ctr}</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">High SERP Snippet Appeal</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <TrendingUp className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Average SERP Position</div>
            <div className="text-2xl font-black text-foreground mt-1">Rank #{gscData.avgPosition}</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">Top 5 Dominance</div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Target className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Clicks & Impressions Performance Trend Graph */}
      <ChartsPlaceholder title="Google Search Console Clicks & Impressions Trend (30 Days)" type="line" />

      {/* Top Search Queries Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-border font-bold text-sm text-foreground flex items-center justify-between">
          <span>Top Performing Search Queries (Google Search Console)</span>
          <Badge variant="success" className="gap-1">
            <CheckCircle2 className="w-3 h-3" /> GSC Live Sync
          </Badge>
        </div>

        <table className="w-full text-left">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-4 font-semibold">Search Query</th>
              <th className="p-4 font-semibold">Clicks</th>
              <th className="p-4 font-semibold">Impressions</th>
              <th className="p-4 font-semibold">CTR %</th>
              <th className="p-4 font-semibold text-right">Avg Position</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {gscData.queries.map((q, idx) => (
              <tr key={idx} className="hover:bg-accent/40 transition-colors">
                <td className="p-4 font-bold text-foreground">{q.query}</td>
                <td className="p-4 font-bold text-emerald-400">{q.clicks.toLocaleString()}</td>
                <td className="p-4 text-muted-foreground font-mono">{q.impressions.toLocaleString()}</td>
                <td className="p-4 font-semibold text-foreground">{q.ctr}</td>
                <td className="p-4 text-right font-bold text-indigo-400">#{q.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
