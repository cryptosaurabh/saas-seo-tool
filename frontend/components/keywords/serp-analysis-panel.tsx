"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Award, FileText, Code, Sparkles, ExternalLink, HelpCircle } from "lucide-react";

export function SERPAnalysisPanel({ keyword = "seo audit software" }: { keyword?: string }) {
  const serpItems = [
    { position: 1, url: "https://ahrefs.com/keywords-explorer", title: "Ahrefs Keywords Explorer - Market Intelligence", dr: 92, traffic: "145k", wordCount: 3200, schemas: ["SoftwareApplication", "FAQPage"] },
    { position: 2, url: "https://semrush.com/keyword-magic-tool", title: "SEMrush Keyword Magic Tool", dr: 91, traffic: "128k", wordCount: 2800, schemas: ["SoftwareApplication"] },
    { position: 3, url: "https://seopilot.ai/features/keyword-research", title: "SEOPilot AI - AI Keyword Research Engine", dr: 79, traffic: "45k", wordCount: 2400, schemas: ["SoftwareApplication", "FAQPage", "Organization"] },
    { position: 4, url: "https://moz.com/explorer", title: "Moz Keyword Explorer Platform", dr: 88, traffic: "34k", wordCount: 1900, schemas: ["Article"] }
  ];

  const peopleAlsoAsk = [
    "What is the best AI tool for keyword research?",
    "How to calculate keyword difficulty in 2026?",
    "What is the difference between commercial and transactional intent?"
  ];

  return (
    <div className="space-y-6 text-xs">
      {/* PAA Questions Box */}
      <Card className="p-4 bg-primary/10 border-primary/20 space-y-3">
        <div className="flex items-center gap-2 font-bold text-foreground">
          <HelpCircle className="w-4 h-4 text-primary" /> People Also Ask (PAA Questions)
        </div>
        <div className="space-y-2">
          {peopleAlsoAsk.map((q, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-card border border-border text-foreground font-medium flex items-center justify-between">
              <span>{q}</span>
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>
          ))}
        </div>
      </Card>

      {/* Top Ranking Pages Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-border font-bold text-sm text-foreground flex items-center justify-between">
          <span>Top SERP Ranking Competitors for "{keyword}"</span>
          <Badge variant="default">SERP Live Snapshot</Badge>
        </div>

        <table className="w-full text-left">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-4 font-semibold">Pos</th>
              <th className="p-4 font-semibold">Page Title & URL</th>
              <th className="p-4 font-semibold">Domain Rating (DR)</th>
              <th className="p-4 font-semibold">Est. Monthly Traffic</th>
              <th className="p-4 font-semibold">Word Count</th>
              <th className="p-4 font-semibold">JSON-LD Schemas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {serpItems.map((item) => (
              <tr key={item.position} className="hover:bg-accent/40 transition-colors">
                <td className="p-4 font-black text-foreground">#{item.position}</td>
                <td className="p-4">
                  <div className="font-bold text-foreground hover:text-primary transition-colors cursor-pointer">{item.title}</div>
                  <div className="text-[10px] text-muted-foreground font-mono truncate max-w-sm">{item.url}</div>
                </td>
                <td className="p-4 font-bold text-indigo-400">DR {item.dr}</td>
                <td className="p-4 font-bold text-emerald-400">{item.traffic} visits</td>
                <td className="p-4 text-muted-foreground">{item.wordCount} words</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {item.schemas.map((s, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-accent border border-border text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
