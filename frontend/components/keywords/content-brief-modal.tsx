"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FileText, Sparkles, Heading, Copy, Check, X } from "lucide-react";

export function ContentBriefModal({ isOpen, onClose, keyword }: { isOpen: boolean; onClose: () => void; keyword: string | null }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !keyword) return null;

  const brief = {
    targetKeyword: keyword,
    recommendedWordCount: 2400,
    seoTitles: [
      `The Complete Guide to ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} in 2026`,
      `How to Master ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} for Organic Ranking`,
      `${keyword.charAt(0).toUpperCase() + keyword.slice(1)}: 7 Proven Technical Strategies`
    ],
    metaDescriptions: [
      `Master ${keyword} with our complete step-by-step guide. Learn technical strategies and real-time AI optimization tips.`,
      `Discover actionable ${keyword} tactics to boost organic rankings and dominate search engine results.`
    ],
    headings: [
      { level: "H1", text: `Mastering ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}` },
      { level: "H2", text: `Why ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} Matters for SEO Strategy` },
      { level: "H2", text: `5 Step Action Plan for ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}` },
      { level: "H3", text: "Step 1: Technical Foundation & Crawling" },
      { level: "H3", text: "Step 2: Content Optimization & SERP Intent" },
      { level: "H2", text: `Frequently Asked Questions About ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}` }
    ],
    questions: [
      `What is ${keyword}?`,
      `How to calculate ${keyword} ROI?`,
      `How to implement ${keyword} step-by-step?`
    ],
    schemas: ["Article", "FAQPage", "SoftwareApplication"]
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(brief, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-popover p-6 shadow-2xl glass-panel space-y-6 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-bold text-base text-foreground">AI SEO Content Brief Generator</h3>
              <p className="text-xs text-muted-foreground">Target Keyword: <span className="text-primary font-bold">{brief.targetKeyword}</span></p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Target Word Count Card */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between">
            <div>
              <span className="font-bold text-foreground">Recommended Article Length</span>
              <p className="text-muted-foreground">Based on top 10 SERP competitor average</p>
            </div>
            <div className="text-xl font-black text-primary">{brief.recommendedWordCount.toLocaleString()} words</div>
          </div>

          {/* SEO Title Suggestions */}
          <div className="space-y-2">
            <span className="font-bold text-foreground block">Suggested SEO HTML Titles:</span>
            {brief.seoTitles.map((title, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-card border border-border text-foreground font-medium">
                {title}
              </div>
            ))}
          </div>

          {/* Meta Description Suggestions */}
          <div className="space-y-2">
            <span className="font-bold text-foreground block">Suggested Meta Descriptions:</span>
            {brief.metaDescriptions.map((desc, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-card border border-border text-muted-foreground leading-relaxed">
                {desc}
              </div>
            ))}
          </div>

          {/* Heading Structure */}
          <div className="space-y-2">
            <span className="font-bold text-foreground block">Heading Hierarchy Outline:</span>
            <div className="p-4 rounded-xl bg-accent/30 border border-border space-y-2">
              {brief.headings.map((h, i) => (
                <div key={i} className={`flex items-center gap-2 ${h.level === "H3" ? "ml-6 text-muted-foreground" : "font-bold text-foreground"}`}>
                  <Badge variant={h.level === "H1" ? "default" : "secondary"}>{h.level}</Badge>
                  <span>{h.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
          <Button variant="ghost" onClick={onClose}>Close</Button>
          <Button onClick={handleCopy} className="gap-2 glow-primary">
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied Content Brief!" : "Copy Full Brief JSON"}
          </Button>
        </div>
      </div>
    </div>
  );
}
