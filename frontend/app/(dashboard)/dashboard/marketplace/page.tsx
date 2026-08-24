"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Store, Search, CheckCircle2, Star, Sparkles, Download, ShieldCheck } from "lucide-react";

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [installed, setInstalled] = useState<Record<string, boolean>>({
    google_search_console: true,
    slack_alerts: true
  });

  const plugins = [
    { id: "google_search_console", name: "Google Search Console Sync", category: "Integrations", author: "SEOPilot Core", rating: "4.9", installs: "1.4k", desc: "Auto-sync GSC search query performance and impressions directly into dashboard." },
    { id: "slack_alerts", name: "Slack SERP & Audit Alerts", category: "Integrations", author: "SEOPilot Core", rating: "4.8", installs: "890", desc: "Real-time Slack notifications for ranking drops and audit errors." },
    { id: "eeat_ai_optimizer", name: "E-E-A-T Quality Enhancer Pack", category: "AI Templates", author: "SEO Master Community", rating: "4.7", installs: "650", desc: "Prompt library designed for Google Search Quality Rater Guidelines." },
    { id: "hubspot_crm_sync", name: "HubSpot Lead & Report Sync", category: "CRM", author: "HubSpot Partner", rating: "4.6", installs: "420", desc: "Sync generated white-label audit reports to HubSpot contacts." },
  ];

  const handleInstallToggle = (id: string) => {
    setInstalled(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="default" className="glow-primary mb-1">MARKETPLACE & EXTENSIONS</Badge>
          <h1 className="text-2xl font-black tracking-tight">Plugin Store & Integrations</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Extend SEOPilot AI with official integrations, community prompt templates, and CRM connectors.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search plugins & templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plugins.map((p) => {
          const isInst = installed[p.id];
          return (
            <Card key={p.id} className="p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{p.category}</Badge>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{p.rating}</span>
                    <span className="text-muted-foreground text-[10px]">({p.installs})</span>
                  </div>
                </div>

                <h3 className="font-bold text-base text-foreground">{p.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                <div className="text-[10px] text-muted-foreground">Author: <span className="font-bold text-foreground">{p.author}</span></div>
              </div>

              <div className="pt-3 border-t border-border flex justify-between items-center">
                {isInst && (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Installed & Active
                  </span>
                )}
                <Button
                  size="sm"
                  variant={isInst ? "outline" : "default"}
                  onClick={() => handleInstallToggle(p.id)}
                  className="text-xs font-bold ml-auto"
                >
                  {isInst ? "Uninstall Plugin" : "Install Extension"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
