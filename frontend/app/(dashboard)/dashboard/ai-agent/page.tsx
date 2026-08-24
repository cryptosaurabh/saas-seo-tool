"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AIChatInterface } from "@/components/ai-agent/ai-chat-interface";
import { AIRecommendationsPanel } from "@/components/ai-agent/ai-recommendations-panel";
import { WorkflowBuilderPanel } from "@/components/ai-agent/workflow-builder-panel";
import { PromptLibraryModal } from "@/components/ai-agent/prompt-library-modal";
import { 
  Bot, 
  Sparkles, 
  Layers, 
  BookOpen, 
  Zap, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AIAgentDashboardPage() {
  const [activeTab, setActiveTab] = useState<"chat" | "recs" | "workflows">("chat");
  const [isPromptLibraryOpen, setIsPromptLibraryOpen] = useState(false);

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="default" className="glow-primary mb-1">ENTERPRISE AI SEO AGENT & AUTOMATION ENGINE</Badge>
          <h1 className="text-3xl font-black text-foreground tracking-tight">
            AI SEO Agent & Automation Hub
          </h1>
          <p className="text-xs text-muted-foreground">Autonomous SEO reasoning engine analyzing Crawl, Rank, GSC, and Backlink data to generate actionable tasks & workflows.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => setIsPromptLibraryOpen(true)} className="gap-2">
            <BookOpen className="w-4 h-4 text-primary" /> Prompt Library
          </Button>
        </div>
      </div>

      {/* Overview Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center justify-between bg-gradient-to-tr from-card via-card to-primary/10 border-primary/20">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">AI Health Summary</div>
            <div className="text-3xl font-black text-primary mt-1">92 / 100</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">Optimal Project Context</div>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <Bot className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Active AI Recommendations</div>
            <div className="text-3xl font-black text-foreground mt-1">3 Priority</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">1 Critical Item</div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Automated Workflows</div>
            <div className="text-3xl font-black text-foreground mt-1">2 Active</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">100% Pipeline Health</div>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Zap className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">AI Reasoning Model</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">GPT-4o / Claude</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">SEO Fine-Tuned Memory</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Main Tabs Navigation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          {[
            { id: "chat", label: "Interactive AI Chat Stream", icon: Bot },
            { id: "recs", label: "Daily AI Recommendations", icon: Sparkles },
            { id: "workflows", label: "Workflow Automation Builder", icon: Layers }
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
        {activeTab === "chat" && (
          <AIChatInterface />
        )}

        {activeTab === "recs" && (
          <AIRecommendationsPanel />
        )}

        {activeTab === "workflows" && (
          <WorkflowBuilderPanel />
        )}
      </div>

      {/* Prompt Library Modal */}
      <PromptLibraryModal
        isOpen={isPromptLibraryOpen}
        onClose={() => setIsPromptLibraryOpen(false)}
      />
    </div>
  );
}
