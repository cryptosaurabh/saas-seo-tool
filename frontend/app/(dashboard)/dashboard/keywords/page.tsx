"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChartsPlaceholder } from "@/components/ui/tooltip";
import { KeywordTable } from "@/components/keywords/keyword-table";
import { SERPAnalysisPanel } from "@/components/keywords/serp-analysis-panel";
import { KeywordClustersView } from "@/components/keywords/keyword-clusters-view";
import { ContentBriefModal } from "@/components/keywords/content-brief-modal";
import { 
  Search, 
  Globe, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Layers, 
  FileText,
  Sliders
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function KeywordResearchDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("seo audit software");
  const [country, setCountry] = useState("US");
  const [engine, setEngine] = useState("google");
  const [activeTab, setActiveTab] = useState<"variations" | "serp" | "clusters">("variations");
  const [briefKeyword, setBriefKeyword] = useState<string | null>(null);

  const [currentMetrics] = useState({
    keyword: "seo audit software",
    volume: 24500,
    kd: 58,
    cpc: 8.50,
    intent: "Commercial Intent"
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div>
        <Badge variant="default" className="glow-primary mb-1">ENTERPRISE KEYWORD EXPLORER & CLUSTERING</Badge>
        <h1 className="text-3xl font-black text-foreground tracking-tight">
          AI Keyword Research & SERP Intelligence
        </h1>
        <p className="text-xs text-muted-foreground">Search volume metrics, keyword difficulty, intent classification, topical clusters, and AI content briefs.</p>
      </div>

      {/* Search Bar Bar */}
      <Card className="p-4 space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-3">
          <div className="flex-1 w-full">
            <Input
              placeholder="Enter seed keyword (e.g. seo audit, technical audit, SaaS software)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="h-10 rounded-lg border border-input bg-background px-3 text-xs focus:outline-none text-foreground"
            >
              <option value="US">🇺🇸 United States</option>
              <option value="UK">🇬🇧 United Kingdom</option>
              <option value="CA">🇨🇦 Canada</option>
              <option value="IN">🇮🇳 India</option>
              <option value="AU">🇦🇺 Australia</option>
            </select>

            <select
              value={engine}
              onChange={(e) => setEngine(e.target.value)}
              className="h-10 rounded-lg border border-input bg-background px-3 text-xs focus:outline-none text-foreground"
            >
              <option value="google">Google Search</option>
              <option value="bing">Bing Search</option>
              <option value="youtube">YouTube Engine</option>
              <option value="amazon">Amazon Store</option>
            </select>

            <Button type="submit" className="gap-2 shadow-lg glow-primary shrink-0">
              <Sparkles className="w-4 h-4" /> Explore Keywords
            </Button>
          </div>
        </form>
      </Card>

      {/* Primary Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Monthly Search Volume</div>
            <div className="text-2xl font-black text-foreground mt-1">{currentMetrics.volume.toLocaleString()} / mo</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">High Organic Demand</div>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <TrendingUp className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Keyword Difficulty (KD)</div>
            <div className="text-2xl font-black text-amber-400 mt-1">{currentMetrics.kd} / 100</div>
            <div className="text-[10px] text-muted-foreground font-semibold mt-1">Moderate Competition</div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Target className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Average CPC (USD)</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">${currentMetrics.cpc.toFixed(2)}</div>
            <div className="text-[10px] text-muted-foreground font-semibold mt-1">Commercial Value</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <DollarSign className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Search Intent</div>
            <div className="text-lg font-black text-indigo-400 mt-1">{currentMetrics.intent}</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">98% Confidence</div>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Search Volume Trend Graph */}
      <ChartsPlaceholder title={`Search Volume Trend for "${searchTerm}"`} type="line" />

      {/* Main Tabs Navigation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          {[
            { id: "variations", label: "Keyword Variations & Questions", icon: Search },
            { id: "serp", label: "SERP Competitor Analysis", icon: Globe },
            { id: "clusters", label: "AI Topic Clusters & Silos", icon: Layers }
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

        {/* Active Tab Panel */}
        {activeTab === "variations" && (
          <KeywordTable onGenerateBrief={(kw) => setBriefKeyword(kw)} />
        )}

        {activeTab === "serp" && (
          <SERPAnalysisPanel keyword={searchTerm} />
        )}

        {activeTab === "clusters" && (
          <KeywordClustersView />
        )}
      </div>

      {/* Content Brief Generator Modal */}
      <ContentBriefModal
        isOpen={!!briefKeyword}
        onClose={() => setBriefKeyword(null)}
        keyword={briefKeyword}
      />
    </div>
  );
}
