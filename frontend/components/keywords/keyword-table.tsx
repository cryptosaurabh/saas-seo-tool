"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Bookmark, 
  FileText, 
  TrendingUp, 
  ExternalLink, 
  Check, 
  Sparkles,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface KeywordRow {
  keyword: string;
  search_volume: number;
  keyword_difficulty: number;
  cpc: number;
  search_intent: "informational" | "commercial" | "transactional" | "navigational";
  serp_features?: string[];
}

export function KeywordTable({ 
  keywords = [], 
  onSelectKeyword, 
  onGenerateBrief 
}: { 
  keywords?: KeywordRow[]; 
  onSelectKeyword?: (kw: string) => void;
  onGenerateBrief?: (kw: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [intentFilter, setIntentFilter] = useState("all");
  const [savedKeywords, setSavedKeywords] = useState<string[]>([]);

  const defaultKeywords: KeywordRow[] = keywords.length > 0 ? keywords : [
    { keyword: "seo audit software", search_volume: 24500, keyword_difficulty: 58, cpc: 8.50, search_intent: "commercial", serp_features: ["featured_snippet", "people_also_ask"] },
    { keyword: "how to do technical seo audit", search_volume: 18200, keyword_difficulty: 32, cpc: 2.10, search_intent: "informational", serp_features: ["people_also_ask"] },
    { keyword: "buy agency seo platform", search_volume: 9800, keyword_difficulty: 74, cpc: 18.20, search_intent: "transactional", serp_features: ["shopping", "reviews"] },
    { keyword: "semrush alternative free", search_volume: 14600, keyword_difficulty: 46, cpc: 4.80, search_intent: "commercial", serp_features: ["featured_snippet"] },
    { keyword: "google search console integration", search_volume: 11200, keyword_difficulty: 28, cpc: 3.40, search_intent: "informational", serp_features: ["people_also_ask"] }
  ];

  const filtered = defaultKeywords.filter((k) => {
    const matchesSearch = k.keyword.toLowerCase().includes(query.toLowerCase());
    const matchesIntent = intentFilter === "all" || k.search_intent === intentFilter;
    return matchesSearch && matchesIntent;
  });

  const toggleSave = (kw: string) => {
    if (savedKeywords.includes(kw)) {
      setSavedKeywords(savedKeywords.filter((s) => s !== kw));
    } else {
      setSavedKeywords([...savedKeywords, kw]);
    }
  };

  const getKDBadge = (kd: number) => {
    if (kd <= 30) return <Badge variant="success" className="font-mono">{kd} Easy</Badge>;
    if (kd <= 60) return <Badge variant="secondary" className="font-mono text-amber-400 border-amber-500/20">{kd} Medium</Badge>;
    return <Badge variant="destructive" className="font-mono">{kd} Hard</Badge>;
  };

  const getIntentBadge = (intent: string) => {
    switch (intent) {
      case "transactional":
        return <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Transactional</span>;
      case "commercial":
        return <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Commercial</span>;
      case "navigational":
        return <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">Navigational</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-primary/10 text-primary border border-primary/20">Informational</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <Input
            placeholder="Filter keyword variations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar text-xs">
          {["all", "informational", "commercial", "transactional"].map((intent) => (
            <button
              key={intent}
              onClick={() => setIntentFilter(intent)}
              className={cn(
                "px-3 py-1.5 rounded-lg font-semibold capitalize transition-all whitespace-nowrap",
                intentFilter === intent
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card/40 text-muted-foreground hover:bg-accent hover:text-foreground border border-border/40"
              )}
            >
              {intent}
            </button>
          ))}
        </div>
      </Card>

      {/* Keywords Data Table */}
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-4 font-semibold">Keyword Phrase</th>
              <th className="p-4 font-semibold">Search Volume</th>
              <th className="p-4 font-semibold">Difficulty (KD)</th>
              <th className="p-4 font-semibold">CPC (USD)</th>
              <th className="p-4 font-semibold">Search Intent</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((k, idx) => {
              const isSaved = savedKeywords.includes(k.keyword);
              return (
                <tr key={idx} className="hover:bg-accent/40 transition-colors">
                  <td className="p-4 font-bold text-foreground">
                    <button
                      onClick={() => onSelectKeyword && onSelectKeyword(k.keyword)}
                      className="hover:text-primary transition-colors text-left flex items-center gap-1.5"
                    >
                      <span>{k.keyword}</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground opacity-50 hover:opacity-100" />
                    </button>
                  </td>
                  <td className="p-4 font-mono text-foreground font-semibold">{k.search_volume.toLocaleString()} / mo</td>
                  <td className="p-4">{getKDBadge(k.keyword_difficulty)}</td>
                  <td className="p-4 font-mono text-muted-foreground">${k.cpc.toFixed(2)}</td>
                  <td className="p-4">{getIntentBadge(k.search_intent)}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => toggleSave(k.keyword)}
                        title={isSaved ? "Saved to List" : "Save Keyword"}
                      >
                        <Bookmark className={cn("w-4 h-4", isSaved ? "text-primary fill-primary" : "text-muted-foreground")} />
                      </Button>
                      {onGenerateBrief && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onGenerateBrief(k.keyword)}
                          className="gap-1 text-[11px]"
                        >
                          <Sparkles className="w-3 h-3 text-primary" /> Content Brief
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
