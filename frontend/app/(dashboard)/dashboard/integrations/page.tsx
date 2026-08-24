"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GSCPerformancePanel } from "@/components/integrations/gsc-performance-panel";
import { GA4AnalyticsPanel } from "@/components/integrations/ga4-analytics-panel";
import { PageSpeedVitalsPanel } from "@/components/integrations/pagespeed-vitals-panel";
import { IndexingAPIModal } from "@/components/integrations/indexing-api-modal";
import { 
  Globe, 
  BarChart, 
  Zap, 
  Send, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function IntegrationsDashboardPage() {
  const [activeTab, setActiveTab] = useState<"gsc" | "ga4" | "pagespeed" | "hub">("gsc");
  const [isIndexingModalOpen, setIsIndexingModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const services = [
    { name: "Google Search Console", status: "Connected", icon: Globe, key: "gsc" },
    { name: "Google Analytics 4", status: "Connected", icon: BarChart, key: "ga4" },
    { name: "PageSpeed Insights", status: "Connected", icon: Zap, key: "pagespeed" },
    { name: "Google Indexing API", status: "Connected", icon: Send, key: "indexing" }
  ];

  const handleSyncAll = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1200);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="default" className="glow-primary mb-1">INTEGRATIONS HUB & ANALYTICS CENTER</Badge>
          <h1 className="text-3xl font-black text-foreground tracking-tight">
            Integrations & Central Analytics
          </h1>
          <p className="text-xs text-muted-foreground">Unified data control hub syncing Search Console, GA4, PageSpeed Insights, and Instant Indexing APIs.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => setIsIndexingModalOpen(true)} className="gap-2">
            <Send className="w-4 h-4 text-primary" /> Instant Index URL
          </Button>
          <Button size="sm" onClick={handleSyncAll} className="gap-2 shadow-lg glow-primary" disabled={isSyncing}>
            <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Syncing All Data..." : "Sync All Services"}
          </Button>
        </div>
      </div>

      {/* Connection Status Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Card key={idx} className="p-5 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-foreground">{s.name}</div>
                <Badge variant="success" className="mt-1 gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {s.status}
                </Badge>
              </div>
              <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                <Icon className="w-5 h-5" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Tabs Navigation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          {[
            { id: "gsc", label: "Search Console Performance", icon: Globe },
            { id: "ga4", label: "GA4 Traffic Analytics", icon: BarChart },
            { id: "pagespeed", label: "PageSpeed & Core Web Vitals", icon: Zap }
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
        {activeTab === "gsc" && (
          <GSCPerformancePanel />
        )}

        {activeTab === "ga4" && (
          <GA4AnalyticsPanel />
        )}

        {activeTab === "pagespeed" && (
          <PageSpeedVitalsPanel />
        )}
      </div>

      {/* Instant Indexing Modal */}
      <IndexingAPIModal
        isOpen={isIndexingModalOpen}
        onClose={() => setIsIndexingModalOpen(false)}
      />
    </div>
  );
}
