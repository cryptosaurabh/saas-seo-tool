"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Monitor, 
  Smartphone, 
  Plus, 
  Search, 
  Globe, 
  Sparkles,
  X
} from "lucide-react";

export interface TrackedKeywordRow {
  id: string;
  keyword_text: string;
  target_url: string;
  device: string;
  current_position: number;
  previous_position: number;
  position_change: number;
  best_position: number;
  search_volume: number;
  cpc: number;
  serp_features?: string[];
}

export function RankingsTable({ keywords = [] }: { keywords?: TrackedKeywordRow[] }) {
  const [query, setQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");
  const [targetUrl, setTargetUrl] = useState("");

  const [items, setItems] = useState<TrackedKeywordRow[]>(
    keywords.length > 0 ? keywords : [
      { id: "1", keyword_text: "seo audit software", target_url: "https://acmeagency.com", device: "desktop", current_position: 1, previous_position: 3, position_change: 2, best_position: 1, search_volume: 24500, cpc: 8.50, serp_features: ["featured_snippet", "people_also_ask"] },
      { id: "2", keyword_text: "technical seo crawler", target_url: "https://acmeagency.com/audit", device: "desktop", current_position: 3, previous_position: 4, position_change: 1, best_position: 2, search_volume: 18200, cpc: 6.20, serp_features: ["people_also_ask"] },
      { id: "3", keyword_text: "ai keyword research tool", target_url: "https://acmeagency.com/keywords", device: "mobile", current_position: 5, previous_position: 2, position_change: -3, best_position: 2, search_volume: 32000, cpc: 12.40, serp_features: ["featured_snippet"] },
      { id: "4", keyword_text: "enterprise rank tracker", target_url: "https://acmeagency.com/rankings", device: "desktop", current_position: 2, previous_position: 2, position_change: 0, best_position: 2, search_volume: 14500, cpc: 9.80, serp_features: ["people_also_ask"] }
    ]
  );

  const filtered = items.filter((k) => k.keyword_text.toLowerCase().includes(query.toLowerCase()));

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: TrackedKeywordRow = {
      id: Date.now().toString(),
      keyword_text: newKeyword,
      target_url: targetUrl,
      device: "desktop",
      current_position: 4,
      previous_position: 7,
      position_change: 3,
      best_position: 4,
      search_volume: 12000,
      cpc: 5.40,
      serp_features: ["people_also_ask"]
    };
    setItems([newItem, ...items]);
    setNewKeyword("");
    setIsAddModalOpen(false);
  };

  const renderChangeBadge = (change: number) => {
    if (change > 0) {
      return (
        <span className="font-bold text-emerald-400 flex items-center gap-0.5">
          <TrendingUp className="w-3.5 h-3.5" /> +{change}
        </span>
      );
    }
    if (change < 0) {
      return (
        <span className="font-bold text-destructive flex items-center gap-0.5">
          <TrendingDown className="w-3.5 h-3.5" /> {change}
        </span>
      );
    }
    return (
      <span className="text-muted-foreground flex items-center gap-0.5 font-semibold">
        <Minus className="w-3.5 h-3.5" /> 0
      </span>
    );
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Search & Add Action Bar */}
      <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <Input
            placeholder="Search tracked keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>

        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2 shadow-lg glow-primary shrink-0">
          <Plus className="w-4 h-4" /> Track New Keyword
        </Button>
      </Card>

      {/* Track Keyword Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-popover p-6 shadow-2xl glass-panel space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-foreground">Track Keyword in SERP</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddKeyword} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Keyword Phrase</label>
                <Input placeholder="e.g. local seo software" value={newKeyword} onChange={(e) => setNewKeyword(e.target.value)} required />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Target URL</label>
                <Input placeholder="https://acmeagency.com" value={targetUrl} onChange={(e) => setTargetUrl(e.target.value)} icon={<Globe className="w-4 h-4" />} required />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button type="submit">Start Tracking</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tracked Keywords Table */}
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-4 font-semibold">Tracked Keyword</th>
              <th className="p-4 font-semibold">Current Rank</th>
              <th className="p-4 font-semibold">Rank Change</th>
              <th className="p-4 font-semibold">Best Rank</th>
              <th className="p-4 font-semibold">Volume</th>
              <th className="p-4 font-semibold">Device</th>
              <th className="p-4 font-semibold">SERP Features</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((k) => (
              <tr key={k.id} className="hover:bg-accent/40 transition-colors">
                <td className="p-4 font-bold text-foreground">
                  <div>{k.keyword_text}</div>
                  <div className="text-[10px] text-muted-foreground font-mono truncate max-w-xs">{k.target_url}</div>
                </td>
                <td className="p-4 font-black text-sm text-foreground">
                  <Badge variant={k.current_position <= 3 ? "success" : "default"}>
                    Rank #{k.current_position}
                  </Badge>
                </td>
                <td className="p-4">{renderChangeBadge(k.position_change)}</td>
                <td className="p-4 font-semibold text-indigo-400">#{k.best_position}</td>
                <td className="p-4 font-mono font-semibold text-foreground">{k.search_volume.toLocaleString()} / mo</td>
                <td className="p-4">
                  <span className="flex items-center gap-1 text-muted-foreground font-semibold">
                    {k.device === "mobile" ? <Smartphone className="w-3.5 h-3.5 text-primary" /> : <Monitor className="w-3.5 h-3.5 text-indigo-400" />}
                    <span className="capitalize">{k.device}</span>
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {k.serp_features?.map((f, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-accent border border-border text-muted-foreground capitalize">
                        {f.replace("_", " ")}
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
