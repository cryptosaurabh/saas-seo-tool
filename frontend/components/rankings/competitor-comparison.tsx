"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/alert";
import { Users, Trophy, Award, TrendingUp } from "lucide-react";

export function CompetitorComparison() {
  const competitors = [
    { domain: "acmeagency.com (Your Domain)", visibility: 84.5, avgPos: 4.2, top3: 42, shareOfVoice: 44, isUser: true },
    { domain: "ahrefs.com", visibility: 78.2, avgPos: 5.8, top3: 35, shareOfVoice: 32, isUser: false },
    { domain: "semrush.com", visibility: 62.0, avgPos: 8.4, top3: 21, shareOfVoice: 24, isUser: false }
  ];

  return (
    <div className="space-y-6 text-xs">
      <Card className="p-6 bg-gradient-to-r from-primary/10 via-card to-card border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="default" className="glow-primary">SHARE OF VOICE & MARKET SHARE</Badge>
          <h3 className="font-bold text-base text-foreground mt-1">Head-to-Head SERP Competitor Intelligence</h3>
          <p className="text-muted-foreground">Compare your domain's organic ranking visibility against top market competitors in real time.</p>
        </div>
        <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
          <Trophy className="w-5 h-5" /> Market Leader (44% Share)
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {competitors.map((c, i) => (
          <Card key={i} className={`p-6 space-y-4 flex flex-col justify-between ${c.isUser ? "border-primary shadow-lg glass-panel" : ""}`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant={c.isUser ? "success" : "secondary"}>
                  {c.isUser ? "YOUR DOMAIN" : `COMPETITOR #${i}`}
                </Badge>
                <span className="font-mono text-muted-foreground">Avg Rank #{c.avgPos}</span>
              </div>

              <div>
                <h4 className="font-bold text-base text-foreground">{c.domain}</h4>
                <div className="text-[10px] text-muted-foreground font-mono">{c.top3} Top-3 Keywords</div>
              </div>

              <div className="space-y-1 pt-2 border-t border-border">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-muted-foreground">SERP Visibility Score</span>
                  <span className="font-bold text-primary">{c.visibility}%</span>
                </div>
                <Progress value={c.visibility} className="h-1.5" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-muted-foreground">Organic Share of Voice</span>
                  <span className="font-bold text-emerald-400">{c.shareOfVoice}%</span>
                </div>
                <Progress value={c.shareOfVoice} className="h-1.5" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
