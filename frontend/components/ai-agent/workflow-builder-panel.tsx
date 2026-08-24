"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layers, ArrowRight, Play, Plus, Zap, CheckCircle2 } from "lucide-react";

export function WorkflowBuilderPanel() {
  const workflows = [
    {
      id: "wf-1",
      name: "Post-Crawl Automated Task Generator",
      trigger: "When Website Crawl Finishes",
      steps: ["Generate AI Summary Report", "Create Actionable Task List", "Send Team Notification"],
      active: true
    },
    {
      id: "wf-2",
      name: "Rank Drop Rescue & Recovery Workflow",
      trigger: "When Keyword Drops > 3 Positions",
      steps: ["Analyze Competitor SERP Changes", "Draft Content Optimization Plan", "Notify SEO Manager"],
      active: true
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-foreground">Visual Workflow Automation Builder</h3>
          <p className="text-muted-foreground">Automate post-crawl audits, rank drop alerts, and task list generation using visual triggers & actions.</p>
        </div>
        <Button className="gap-2 shadow-lg glow-primary shrink-0">
          <Plus className="w-4 h-4" /> Create New Workflow
        </Button>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workflows.map((wf) => (
          <Card key={wf.id} className="p-6 space-y-4 border-border">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-base text-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" /> {wf.name}
              </h4>
              <Badge variant="success">ACTIVE</Badge>
            </div>

            {/* Visual Node Pipeline */}
            <div className="space-y-2 pt-2">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 font-mono text-primary font-bold">
                ⚡ TRIGGER: {wf.trigger}
              </div>

              {wf.steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2 pl-4">
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <div className="p-3 rounded-xl bg-card border border-border text-foreground font-medium flex-1">
                    {step}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-border">
              <Button size="sm" variant="outline" className="gap-1 text-[11px]">
                <Play className="w-3 h-3 text-emerald-400" /> Test Run
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
