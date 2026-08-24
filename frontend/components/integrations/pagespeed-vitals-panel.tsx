"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Zap, Monitor, Smartphone, CheckCircle2, RefreshCw } from "lucide-react";

export function PageSpeedVitalsPanel() {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [isAuditing, setIsAuditing] = useState(false);

  const scores = {
    performance: device === "desktop" ? 96 : 91,
    accessibility: 100,
    bestPractices: 98,
    seo: 100,
    vitals: {
      lcp: "1.2s",
      cls: "0.02",
      inp: "45ms",
      fcp: "0.8s",
      ttfb: "120ms"
    }
  };

  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => setIsAuditing(false), 1200);
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Device Selector & Run Button */}
      <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDevice("desktop")}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${device === "desktop" ? "bg-primary text-primary-foreground shadow-sm" : "bg-card text-muted-foreground hover:text-foreground"}`}
          >
            <Monitor className="w-4 h-4" /> Desktop Engine
          </button>
          <button
            onClick={() => setDevice("mobile")}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${device === "mobile" ? "bg-primary text-primary-foreground shadow-sm" : "bg-card text-muted-foreground hover:text-foreground"}`}
          >
            <Smartphone className="w-4 h-4" /> Mobile Engine
          </button>
        </div>

        <Button onClick={handleRunAudit} className="gap-2 shadow-lg glow-primary shrink-0" disabled={isAuditing}>
          <RefreshCw className={`w-4 h-4 ${isAuditing ? "animate-spin" : ""}`} />
          {isAuditing ? "Auditing Vitals..." : "Run PageSpeed Audit"}
        </Button>
      </Card>

      {/* Scores Gauges Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <Card className="p-5 space-y-2">
          <span className="text-muted-foreground font-semibold">Performance</span>
          <div className="text-3xl font-black text-emerald-400">{scores.performance} / 100</div>
          <Progress value={scores.performance} className="h-1.5" />
        </Card>

        <Card className="p-5 space-y-2">
          <span className="text-muted-foreground font-semibold">Accessibility</span>
          <div className="text-3xl font-black text-emerald-400">{scores.accessibility} / 100</div>
          <Progress value={scores.accessibility} className="h-1.5" />
        </Card>

        <Card className="p-5 space-y-2">
          <span className="text-muted-foreground font-semibold">Best Practices</span>
          <div className="text-3xl font-black text-emerald-400">{scores.bestPractices} / 100</div>
          <Progress value={scores.bestPractices} className="h-1.5" />
        </Card>

        <Card className="p-5 space-y-2">
          <span className="text-muted-foreground font-semibold">SEO Score</span>
          <div className="text-3xl font-black text-emerald-400">{scores.seo} / 100</div>
          <Progress value={scores.seo} className="h-1.5" />
        </Card>
      </div>

      {/* Core Web Vitals Metrics */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-foreground">Core Web Vitals Assessment</h3>
          <Badge variant="success" className="gap-1">
            <CheckCircle2 className="w-3 h-3" /> ALL VITALS PASSED
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-0.5">
            <div className="text-[10px] text-muted-foreground uppercase font-bold">LCP (Largest Contentful)</div>
            <div className="text-base font-black text-emerald-400">{scores.vitals.lcp}</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-0.5">
            <div className="text-[10px] text-muted-foreground uppercase font-bold">CLS (Cumulative Shift)</div>
            <div className="text-base font-black text-emerald-400">{scores.vitals.cls}</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-0.5">
            <div className="text-[10px] text-muted-foreground uppercase font-bold">INP (Interaction to Next)</div>
            <div className="text-base font-black text-emerald-400">{scores.vitals.inp}</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-0.5">
            <div className="text-[10px] text-muted-foreground uppercase font-bold">FCP (First Contentful)</div>
            <div className="text-base font-black text-emerald-400">{scores.vitals.fcp}</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-0.5">
            <div className="text-[10px] text-muted-foreground uppercase font-bold">TTFB (Time to First Byte)</div>
            <div className="text-base font-black text-emerald-400">{scores.vitals.ttfb}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
