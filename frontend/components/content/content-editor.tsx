"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/alert";
import { 
  Sparkles, 
  FileText, 
  Check, 
  Copy, 
  Download, 
  Wand2, 
  Eye, 
  Edit3,
  Bot
} from "lucide-react";

export function ContentEditor({ 
  initialContent = "", 
  initialTitle = "Untitled Article",
  onOpenAIAssistant 
}: { 
  initialContent?: string;
  initialTitle?: string;
  onOpenAIAssistant?: () => void;
}) {
  const [content, setContent] = useState(
    initialContent || 
    "# Master Technical SEO Audits in 2026\n\nIn today's digital environment, mastering **technical SEO** is crucial for enterprise search rankings.\n\n## Key Audit Items\n- Clean XML sitemaps\n- 100% Valid Schema JSON-LD\n- Fast LCP and CLS Core Web Vitals"
  );
  const [title, setTitle] = useState(initialTitle);
  const [activeView, setActiveView] = useState<"edit" | "preview">("edit");
  const [copied, setCopied] = useState(false);

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const contentScore = Math.min(100, Math.max(65, Math.floor(wordCount / 10) + 70));

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Editor Header Bar */}
      <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-base font-bold bg-transparent text-foreground focus:outline-none w-full border-b border-transparent hover:border-border focus:border-primary transition-all"
            placeholder="Article Title..."
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex bg-card border border-border rounded-lg p-0.5 text-xs font-semibold">
            <button
              onClick={() => setActiveView("edit")}
              className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-all ${activeView === "edit" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Edit3 className="w-3.5 h-3.5" /> Write
            </button>
            <button
              onClick={() => setActiveView("preview")}
              className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-all ${activeView === "preview" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
          </div>

          {onOpenAIAssistant && (
            <Button size="sm" variant="outline" onClick={onOpenAIAssistant} className="gap-1.5 text-xs">
              <Bot className="w-4 h-4 text-primary" /> AI Assistant
            </Button>
          )}

          <Button size="sm" onClick={handleCopy} className="gap-1.5 text-xs glow-primary">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Export Markdown"}
          </Button>
        </div>
      </Card>

      {/* Main Split-Pane Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Editor Area */}
        <Card className="lg:col-span-3 p-6 min-h-[500px] flex flex-col justify-between space-y-4">
          {activeView === "edit" ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full min-h-[420px] bg-transparent text-sm text-foreground font-mono leading-relaxed focus:outline-none resize-y"
              placeholder="Write or paste your markdown content here..."
            />
          ) : (
            <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-4">
              <h1 className="text-2xl font-black text-foreground">{title}</h1>
              <div className="text-muted-foreground whitespace-pre-wrap">{content}</div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-muted-foreground font-mono">
            <span>{wordCount} Words • {content.length} Characters</span>
            <span className="text-emerald-500 font-bold">Auto-Saved Draft</span>
          </div>
        </Card>

        {/* Real-time Content Score Meter */}
        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground block">Real-time SEO Score</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-primary">{contentScore}</span>
              <span className="text-xs font-bold text-muted-foreground">/ 100</span>
            </div>
            <Progress value={contentScore} className="h-2" />
          </div>

          <div className="space-y-3 pt-2 text-xs border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Target Word Count</span>
              <span className="font-bold text-foreground">{wordCount} / 2,400</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Flesch Readability</span>
              <span className="font-bold text-emerald-400">72 (Easy)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Passive Voice</span>
              <span className="font-bold text-emerald-400">3.8%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Heading Density</span>
              <span className="font-bold text-foreground font-mono">1 H1 • 4 H2</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
