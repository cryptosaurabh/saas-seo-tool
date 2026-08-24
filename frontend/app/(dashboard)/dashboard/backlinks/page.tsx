"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/alert";
import { ChartsPlaceholder } from "@/components/ui/tooltip";
import { BacklinksTable } from "@/components/backlinks/backlinks-table";
import { ReferringDomainsTable } from "@/components/backlinks/referring-domains-table";
import { BacklinkGapMatrix } from "@/components/backlinks/backlink-gap-matrix";
import { DisavowManagerModal } from "@/components/backlinks/disavow-manager-modal";
import { OutreachCRMPanel } from "@/components/backlinks/outreach-crm-panel";
import { 
  Link as LinkIcon, 
  Globe, 
  ShieldAlert, 
  TrendingUp, 
  Award, 
  Users, 
  Mail, 
  Download,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BacklinkDashboardPage() {
  const [activeTab, setActiveTab] = useState<"backlinks" | "domains" | "gap" | "crm">("backlinks");
  const [isDisavowOpen, setIsDisavowOpen] = useState(false);

  const [metrics] = useState({
    domainAuthority: 84,
    totalBacklinks: 14200,
    referringDomains: 1850,
    followRatio: 82,
    toxicCount: 8
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="default" className="glow-primary mb-1">ENTERPRISE BACKLINK INTELLIGENCE & CRM</Badge>
          <h1 className="text-3xl font-black text-foreground tracking-tight">
            Competitor Intelligence & Backlinks
          </h1>
          <p className="text-xs text-muted-foreground">Domain Authority (DR) profiling, toxic link detection, disavow exporter, backlink gap matrix, and outreach CRM.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="danger" onClick={() => setIsDisavowOpen(true)} className="gap-2">
            <ShieldAlert className="w-4 h-4" /> Disavow Manager ({metrics.toxicCount})
          </Button>
        </div>
      </div>

      {/* Metrics Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center justify-between bg-gradient-to-tr from-card via-card to-indigo-500/10 border-indigo-500/20">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Domain Authority (DR)</div>
            <div className="text-3xl font-black text-indigo-400 mt-1">DR {metrics.domainAuthority}</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">Top 2% Authority Score</div>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Award className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Total Backlinks</div>
            <div className="text-3xl font-black text-foreground mt-1">{metrics.totalBacklinks.toLocaleString()}</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">+340 links in last 30 days</div>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <LinkIcon className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Referring Domains</div>
            <div className="text-3xl font-black text-foreground mt-1">{metrics.referringDomains.toLocaleString()}</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">100% Unique Root IPs</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Globe className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Follow vs NoFollow Ratio</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{metrics.followRatio}% Follow</div>
            <div className="text-[10px] text-muted-foreground font-semibold mt-1">Natural Link Profile</div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <TrendingUp className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Backlink Growth Curve Graph */}
      <ChartsPlaceholder title="Referring Domains & Backlink Velocity Growth (Last 12 Months)" type="line" />

      {/* Main Tabs Navigation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          {[
            { id: "backlinks", label: "Backlinks Profile Data", icon: LinkIcon },
            { id: "domains", label: "Referring Domains", icon: Globe },
            { id: "gap", label: "Backlink Gap Matrix", icon: Sparkles },
            { id: "crm", label: "Outreach Link CRM", icon: Mail }
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
        {activeTab === "backlinks" && (
          <BacklinksTable onDisavow={() => setIsDisavowOpen(true)} />
        )}

        {activeTab === "domains" && (
          <ReferringDomainsTable />
        )}

        {activeTab === "gap" && (
          <BacklinkGapMatrix />
        )}

        {activeTab === "crm" && (
          <OutreachCRMPanel />
        )}
      </div>

      {/* Google Disavow Manager Modal */}
      <DisavowManagerModal
        isOpen={isDisavowOpen}
        onClose={() => setIsDisavowOpen(false)}
      />
    </div>
  );
}
