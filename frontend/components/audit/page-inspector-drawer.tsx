"use client";

import React, { useState } from "react";
import { Drawer } from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Globe, 
  FileText, 
  Heading, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Code, 
  Zap, 
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

export function PageInspectorDrawer({ isOpen, onClose, pageUrl }: { isOpen: boolean; onClose: () => void; pageUrl: string | null }) {
  const [activeTab, setActiveTab] = useState("meta");

  if (!isOpen || !pageUrl) return null;

  const mockPageData = {
    url: pageUrl,
    statusCode: 200,
    loadTimeMs: 142,
    depth: 1,
    title: "Enterprise AI SEO Operating System - SEOPilot AI",
    titleLength: 52,
    metaDesc: "Automate technical site audits, keyword position tracking, and competitor intelligence in real time with SEOPilot AI.",
    metaDescLength: 138,
    h1: "Automate Your SEO Growth with AI",
    h2Count: 6,
    h3Count: 14,
    wordCount: 1850,
    canonicalUrl: pageUrl,
    isIndexable: true,
    imagesCount: 8,
    imagesMissingAlt: 0,
    internalLinks: 34,
    externalLinks: 12,
    structuredData: ["Organization", "FAQPage", "SoftwareApplication"]
  };

  const tabs = [
    { id: "meta", label: "Meta Tags", icon: FileText },
    { id: "headings", label: "Headings", icon: Heading },
    { id: "images", label: "Images", icon: ImageIcon },
    { id: "links", label: "Links", icon: LinkIcon },
    { id: "schema", label: "Structured Data", icon: Code }
  ];

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Page Analysis Inspector">
      <div className="space-y-6 text-xs">
        {/* Header Summary */}
        <div className="p-4 rounded-xl border border-border bg-card/60 space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="success">HTTP 200 OK</Badge>
            <span className="text-[10px] text-muted-foreground font-mono">{mockPageData.loadTimeMs}ms Load Speed</span>
          </div>
          <div className="font-mono text-primary font-semibold break-all">{mockPageData.url}</div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 border-b border-border overflow-x-auto pb-1 no-scrollbar">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold transition-all whitespace-nowrap text-xs",
                  isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Panels */}
        {activeTab === "meta" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-3 rounded-lg border border-border bg-accent/30 space-y-1">
              <div className="font-bold text-foreground flex items-center justify-between">
                <span>HTML Title Tag ({mockPageData.titleLength} chars)</span>
                <span className="text-emerald-400 font-normal">Optimal Length</span>
              </div>
              <p className="text-muted-foreground">{mockPageData.title}</p>
            </div>

            <div className="p-3 rounded-lg border border-border bg-accent/30 space-y-1">
              <div className="font-bold text-foreground flex items-center justify-between">
                <span>Meta Description ({mockPageData.metaDescLength} chars)</span>
                <span className="text-emerald-400 font-normal">Optimal Length</span>
              </div>
              <p className="text-muted-foreground">{mockPageData.metaDesc}</p>
            </div>

            <div className="p-3 rounded-lg border border-border bg-accent/30 space-y-1">
              <div className="font-bold text-foreground">Canonical URL</div>
              <p className="text-muted-foreground font-mono break-all">{mockPageData.canonicalUrl}</p>
            </div>
          </div>
        )}

        {activeTab === "headings" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-3 rounded-lg border border-border bg-accent/30 space-y-1">
              <div className="font-bold text-foreground">H1 Heading (1 Tag)</div>
              <p className="text-primary font-semibold">{mockPageData.h1}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-lg bg-card border border-border">
                <div className="text-lg font-bold text-foreground">{mockPageData.h2Count}</div>
                <div className="text-[10px] text-muted-foreground">H2 Subheadings</div>
              </div>
              <div className="p-3 rounded-lg bg-card border border-border">
                <div className="text-lg font-bold text-foreground">{mockPageData.h3Count}</div>
                <div className="text-[10px] text-muted-foreground">H3 Subheadings</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "images" && (
          <div className="space-y-3 animate-in fade-in">
            <div className="p-3 rounded-lg border border-border bg-emerald-500/10 text-emerald-400 flex items-center justify-between">
              <span className="font-bold">Total Images Scanned: {mockPageData.imagesCount}</span>
              <span>0 Missing ALT</span>
            </div>
          </div>
        )}

        {activeTab === "schema" && (
          <div className="space-y-3 animate-in fade-in">
            <div className="font-bold text-foreground">Detected JSON-LD Schemas:</div>
            <div className="flex flex-wrap gap-2">
              {mockPageData.structuredData.map((st, i) => (
                <Badge key={i} variant="default">{st}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
}
