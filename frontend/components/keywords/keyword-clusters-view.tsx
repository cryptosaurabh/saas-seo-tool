"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, FolderKanban, TrendingUp, Sparkles } from "lucide-react";

export function KeywordClustersView() {
  const clusters = [
    {
      pillarTopic: "AI SEO Automation & Auditing",
      totalVolume: 48200,
      avgKD: 54,
      keywordsCount: 5,
      subtopics: [
        { name: "Technical Audit Automation", volume: 18400, kd: 58 },
        { name: "AI Web Crawling Engine", volume: 14200, kd: 48 },
        { name: "Real-time Core Web Vitals", volume: 15600, kd: 56 }
      ]
    },
    {
      pillarTopic: "Keyword Research & SERP Intelligence",
      totalVolume: 32600,
      avgKD: 62,
      keywordsCount: 4,
      subtopics: [
        { name: "Keyword Intent Classification", volume: 12800, kd: 64 },
        { name: "SERP Feature Detection", volume: 9800, kd: 58 },
        { name: "Competitor Keyword Gap", volume: 10000, kd: 64 }
      ]
    },
    {
      pillarTopic: "Multi-Tenant Agency Workspaces",
      totalVolume: 19400,
      avgKD: 42,
      keywordsCount: 3,
      subtopics: [
        { name: "White-Label PDF Reports", volume: 8400, kd: 38 },
        { name: "RBAC Team Permissions", volume: 11000, kd: 46 }
      ]
    }
  ];

  return (
    <div className="space-y-6 text-xs">
      <Card className="p-4 bg-gradient-to-r from-primary/10 via-card to-card border-primary/20 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-foreground">Topical Authority Silo Map</h3>
          <p className="text-muted-foreground">Automatically grouped keywords into Pillar Content and Supporting Subtopics for maximum search relevance.</p>
        </div>
        <Badge variant="default" className="glow-primary">3 Topical Clusters</Badge>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clusters.map((c, i) => (
          <Card key={i} className="p-6 space-y-4 flex flex-col justify-between hover:border-primary/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Layers className="w-5 h-5" />
                </div>
                <Badge variant="secondary" className="font-mono">KD {c.avgKD}</Badge>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground">Pillar Topic</span>
                <h4 className="font-bold text-base text-foreground mt-0.5">{c.pillarTopic}</h4>
                <p className="text-muted-foreground text-[11px] font-mono">{c.totalVolume.toLocaleString()} monthly volume • {c.keywordsCount} keywords</p>
              </div>

              <div className="pt-2 border-t border-border space-y-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Supporting Content Silos:</span>
                {c.subtopics.map((st, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-accent/30 border border-border flex items-center justify-between">
                    <span className="font-semibold text-foreground">{st.name}</span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">{st.volume.toLocaleString()} / mo</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
