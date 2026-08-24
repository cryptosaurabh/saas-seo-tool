"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, ArrowRight, Sparkles, Check } from "lucide-react";

export function AIRecommendationsPanel() {
  const [recommendations, setRecommendations] = useState([
    {
      id: "rec-1",
      category: "Technical SEO",
      priority: "critical",
      title: "Fix Duplicate Meta Titles on 14 Blog Pages",
      description: "Crawl job #104 detected 14 blog posts sharing duplicate title tags.",
      reasoning: "Duplicate titles cause keyword cannibalization and reduce GSC CTR.",
      impactScore: 92,
      converted: false
    },
    {
      id: "rec-2",
      category: "Content Optimization",
      priority: "high",
      title: "Optimize EEAT Trustworthiness for High-Intent Page `/audit`",
      description: "Page `/audit` lacks author bio and organization schema credentials.",
      reasoning: "Google Search Quality Rater guidelines prioritize verified author credentials.",
      impactScore: 88,
      converted: false
    },
    {
      id: "rec-3",
      category: "Backlinks & Spam",
      priority: "medium",
      title: "Disavow 2 Toxic Spam Domains",
      description: "Domain `spammy-directory-xyz.net` has a 88% toxicity score.",
      reasoning: "Prevents algorithmic spam penalties on Google Search.",
      impactScore: 78,
      converted: false
    }
  ]);

  const handleConvert = (id: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, converted: true } : r))
    );
  };

  return (
    <div className="space-y-4 text-xs">
      <Card className="p-4 bg-primary/10 border-primary/20 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-foreground">AI Daily Recommendations Engine</h3>
          <p className="text-muted-foreground">Actionable SEO optimizations synthesized from real-time Crawl, Ranking, and GSC data.</p>
        </div>
        <Badge variant="default" className="glow-primary">3 Active Recommendations</Badge>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((r) => (
          <Card key={r.id} className="p-5 space-y-4 flex flex-col justify-between hover:border-primary/40 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant={r.priority === "critical" ? "destructive" : r.priority === "high" ? "warning" : "secondary"}>
                  {r.priority.toUpperCase()} PRIORITY
                </Badge>
                <span className="font-mono font-bold text-emerald-400">+{r.impactScore} Impact</span>
              </div>

              <span className="text-[10px] uppercase font-bold text-primary block">{r.category}</span>
              <h4 className="font-bold text-sm text-foreground">{r.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{r.description}</p>
              <div className="p-2.5 rounded-lg bg-accent/40 border border-border text-[11px] text-foreground font-mono">
                💡 {r.reasoning}
              </div>
            </div>

            <Button
              size="sm"
              variant={r.converted ? "outline" : "primary"}
              onClick={() => handleConvert(r.id)}
              disabled={r.converted}
              className="w-full gap-1.5 glow-primary"
            >
              {r.converted ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Sparkles className="w-3.5 h-3.5" />}
              {r.converted ? "Converted to Task" : "1-Click Create Task"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
