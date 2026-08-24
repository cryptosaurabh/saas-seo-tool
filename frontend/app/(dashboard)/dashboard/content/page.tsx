"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ContentEditor } from "@/components/content/content-editor";
import { EEATScorePanel } from "@/components/content/eeat-score-panel";
import { ContentCalendarView } from "@/components/content/content-calendar-view";
import { AIAssistantDrawer } from "@/components/content/ai-assistant-drawer";
import { 
  PenTool, 
  Sparkles, 
  BookOpen, 
  Calendar as CalendarIcon, 
  Bot, 
  Wand2, 
  FileText,
  Sliders
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AIContentStudioDashboardPage() {
  const [activeTab, setActiveTab] = useState<"editor" | "eeat" | "calendar" | "library">("editor");
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [keyword, setKeyword] = useState("technical seo audit");
  const [articleType, setArticleType] = useState("blog");
  const [writingTone, setWritingTone] = useState("professional");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div>
        <Badge variant="default" className="glow-primary mb-1">ENTERPRISE AI CONTENT WRITER & EEAT ENGINE</Badge>
        <h1 className="text-3xl font-black text-foreground tracking-tight">
          AI Content Studio & Optimizer
        </h1>
        <p className="text-xs text-muted-foreground">Generate SEO-optimized articles, analyze EEAT authority signals, and manage your content publishing calendar.</p>
      </div>

      {/* Generator Controls Card */}
      <Card className="p-6 space-y-4">
        <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <label className="text-xs font-semibold text-foreground mb-1 block">Primary Keyword Phrase</label>
            <Input
              placeholder="e.g. technical seo audit, keyword clustering..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              icon={<PenTool className="w-4 h-4" />}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Article Type</label>
            <select
              value={articleType}
              onChange={(e) => setArticleType(e.target.value)}
              className="w-full h-10 rounded-lg border border-input bg-background px-3 text-xs focus:outline-none text-foreground"
            >
              <option value="blog">Blog Post / Guide</option>
              <option value="service">Service Page</option>
              <option value="landing">Landing Page</option>
              <option value="product">Product Description</option>
              <option value="comparison">Comparison Article</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Writing Tone</label>
            <select
              value={writingTone}
              onChange={(e) => setWritingTone(e.target.value)}
              className="w-full h-10 rounded-lg border border-input bg-background px-3 text-xs focus:outline-none text-foreground"
            >
              <option value="professional">Professional & Authoritative</option>
              <option value="persuasive">Persuasive / Conversion</option>
              <option value="technical">Technical / Developer</option>
              <option value="conversational">Conversational & Friendly</option>
            </select>
          </div>

          <div className="lg:col-span-4 flex justify-end">
            <Button type="submit" className="gap-2 shadow-lg glow-primary" disabled={isGenerating}>
              <Wand2 className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
              {isGenerating ? "Generating Article..." : "Generate AI Article"}
            </Button>
          </div>
        </form>
      </Card>

      {/* Main Tabs Navigation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          {[
            { id: "editor", label: "Interactive Editor", icon: Edit3Icon },
            { id: "eeat", label: "EEAT Authority Audit", icon: BookOpen },
            { id: "calendar", label: "Content Calendar", icon: CalendarIcon }
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
        {activeTab === "editor" && (
          <ContentEditor onOpenAIAssistant={() => setIsAIAssistantOpen(true)} />
        )}

        {activeTab === "eeat" && (
          <EEATScorePanel />
        )}

        {activeTab === "calendar" && (
          <ContentCalendarView />
        )}
      </div>

      {/* AI Assistant Side Drawer */}
      <AIAssistantDrawer
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
      />
    </div>
  );
}

function Edit3Icon(props: any) {
  return <PenTool {...props} />;
}
