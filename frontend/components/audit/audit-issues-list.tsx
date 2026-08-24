"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion } from "@/components/ui/accordion";
import { 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  Search, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink,
  Bot
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SEOIssueItem {
  id: string;
  page_url: string;
  category: string;
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  recommendation: string;
  estimated_impact: string;
  ai_fix_prompt?: string;
}

export function AuditIssuesList({ issues = [], targetDomain, onInspectPage }: { issues?: SEOIssueItem[]; targetDomain?: string; onInspectPage?: (url: string) => void }) {
  const [query, setQuery] = useState("");
  const [activeSeverity, setActiveSeverity] = useState<string>("all");
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const domainBase = targetDomain ? (targetDomain.startsWith("http") ? targetDomain.replace(/\/$/, "") : `https://${targetDomain.replace(/\/$/, "")}`) : "https://acmeagency.com";

  const mockIssues: SEOIssueItem[] = issues.length > 0 ? issues : [
    {
      id: "1",
      page_url: `${domainBase}/products/seo-tool`,
      category: "meta",
      severity: "critical",
      title: "Missing HTML Meta Title Tag",
      description: "Page lacks an HTML <title> tag, preventing search engines from displaying an accurate SERP snippet.",
      recommendation: "Add a unique <title> tag between 30 and 60 characters containing targeted keywords.",
      estimated_impact: "High SEO Impact",
      ai_fix_prompt: `Write a high-converting 55-character HTML meta title for URL: ${domainBase}/products/seo-tool`
    },
    {
      id: "2",
      page_url: `${domainBase}/blog/technical-seo`,
      category: "headings",
      severity: "high",
      title: "Multiple H1 Headings Detected",
      description: "Page contains 3 separate <h1> heading tags. Best practice requires a single primary <h1> per page.",
      recommendation: "Retain one <h1> for the article title and convert secondary <h1> elements into <h2> tags.",
      estimated_impact: "High SEO Impact",
      ai_fix_prompt: `Refactor HTML headings structure for ${domainBase}/blog/technical-seo to use single H1.`
    },
    {
      id: "3",
      page_url: `${domainBase}/services`,
      category: "images",
      severity: "medium",
      title: "14 Images Missing ALT Attributes",
      description: "Images on this page lack descriptive alt attributes needed for image search ranking and screen readers.",
      recommendation: "Add descriptive alt attributes describing image context.",
      estimated_impact: "Medium SEO Impact",
      ai_fix_prompt: `Generate alt text descriptions for images on ${domainBase}/services`
    },
    {
      id: "4",
      page_url: `${domainBase}/terms`,
      category: "meta",
      severity: "low",
      title: "Meta Description Slightly Short (62 chars)",
      description: "Meta description is shorter than the recommended 120-160 character range.",
      recommendation: "Expand meta description to ~140 characters for improved SERP click-through rate.",
      estimated_impact: "Low SEO Impact",
      ai_fix_prompt: `Expand meta description for ${domainBase}/terms to 140 characters.`
    }
  ];

  const filtered = mockIssues.filter((i) => {
    const matchesSearch = i.title.toLowerCase().includes(query.toLowerCase()) || i.page_url.toLowerCase().includes(query.toLowerCase());
    const matchesSeverity = activeSeverity === "all" || i.severity === activeSeverity;
    return matchesSearch && matchesSeverity;
  });

  const copyAIFixPrompt = (id: string, promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive" className="uppercase font-bold">Critical Error</Badge>;
      case "high":
        return <Badge variant="warning" className="uppercase font-bold">High Issue</Badge>;
      case "medium":
        return <Badge variant="secondary" className="uppercase font-bold">Medium Notice</Badge>;
      default:
        return <Badge variant="outline" className="uppercase font-bold">Low Warning</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Severity Filter Tabs */}
      <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <Input
            placeholder="Search issues by title or URL..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: "all", label: "All Issues" },
            { id: "critical", label: "Critical" },
            { id: "high", label: "High" },
            { id: "medium", label: "Medium" },
            { id: "low", label: "Low" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSeverity(tab.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap",
                activeSeverity === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card/40 text-muted-foreground hover:bg-accent hover:text-foreground border border-border/40"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Issues List Cards */}
      <div className="space-y-4">
        {filtered.map((issue) => (
          <Card key={issue.id} className="p-6 space-y-4 hover:border-primary/40 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div className="flex items-center gap-3">
                {getSeverityBadge(issue.severity)}
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded bg-accent border border-border">
                  {issue.category}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> {issue.estimated_impact}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-base text-foreground">{issue.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{issue.description}</p>

              <div className="flex items-center gap-2 font-mono text-[11px] text-primary pt-1">
                <span className="truncate max-w-lg">{issue.page_url}</span>
                {onInspectPage && (
                  <button
                    onClick={() => onInspectPage(issue.page_url)}
                    className="hover:underline flex items-center gap-1 text-xs font-sans font-semibold shrink-0"
                  >
                    Inspect Page <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Recommendation & AI Auto-Fix Placeholder */}
            <div className="p-4 rounded-xl bg-accent/30 border border-border/60 space-y-3 text-xs">
              <div>
                <span className="font-bold text-foreground block mb-0.5">Recommended Action:</span>
                <p className="text-muted-foreground">{issue.recommendation}</p>
              </div>

              {issue.ai_fix_prompt && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border/40">
                  <div className="flex items-center gap-2 text-primary font-semibold text-[11px]">
                    <Bot className="w-4 h-4" /> AI Auto-Fix Prompt Ready
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyAIFixPrompt(issue.id, issue.ai_fix_prompt!)}
                    className="gap-1.5 text-xs"
                  >
                    {copiedPromptId === issue.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedPromptId === issue.id ? "Prompt Copied!" : "Copy AI Prompt"}
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
