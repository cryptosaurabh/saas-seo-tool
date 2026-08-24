"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/alert";
import { ShieldCheck, Award, BookOpen, UserCheck, Sparkles } from "lucide-react";

export function EEATScorePanel({ 
  scores = { experience: 90, expertise: 92, authority: 88, trust: 95 }
}: {
  scores?: { experience: number; expertise: number; authority: number; trust: number };
}) {
  const overall = Math.floor((scores.experience + scores.expertise + scores.authority + scores.trust) / 4);

  const metrics = [
    { label: "Experience", score: scores.experience, desc: "First-hand user experience & original insights", icon: UserCheck, color: "text-primary" },
    { label: "Expertise", score: scores.expertise, desc: "Technical accuracy & subject matter depth", icon: BookOpen, color: "text-indigo-400" },
    { label: "Authoritativeness", score: scores.authority, desc: "Author citations & external high-DR references", icon: Award, color: "text-emerald-400" },
    { label: "Trustworthiness", score: scores.trust, desc: "Factual integrity, HTTPS security & publisher transparency", icon: ShieldCheck, color: "text-amber-400" }
  ];

  return (
    <div className="space-y-6 text-xs">
      <Card className="p-6 bg-gradient-to-r from-primary/10 via-card to-card border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Badge variant="default" className="glow-primary">GOOGLE EEAT ALGORITHM AUDIT</Badge>
          <h3 className="font-bold text-base text-foreground">Topical Authority & Quality Metrics</h3>
          <p className="text-muted-foreground">Evaluates Experience, Expertise, Authoritativeness, and Trustworthiness against Google Search Quality Rater Guidelines.</p>
        </div>
        <div className="flex items-baseline gap-2 text-right shrink-0">
          <span className="text-4xl font-black text-emerald-400">{overall}</span>
          <span className="text-xs font-bold text-muted-foreground">/ 100</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Card key={idx} className="p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground text-sm">{m.label}</span>
                  <div className={`p-2 rounded-lg bg-card border border-border ${m.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>

              <div className="space-y-1 pt-2 border-t border-border">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-muted-foreground">Score</span>
                  <span className={`font-bold ${m.color}`}>{m.score}%</span>
                </div>
                <Progress value={m.score} className="h-1.5" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
