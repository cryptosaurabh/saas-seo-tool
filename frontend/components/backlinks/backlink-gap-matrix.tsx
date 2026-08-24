"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Plus, Sparkles, ExternalLink } from "lucide-react";

export function BacklinkGapMatrix() {
  const gaps = [
    { sourceDomain: "techcrunch.com", dr: 94, yourStatus: "Missing Link", competitorHas: true, opportunity: "Guest Article / Press Release" },
    { sourceDomain: "producthunt.com", dr: 90, yourStatus: "Shared Link", competitorHas: true, opportunity: "High Priority Profile" },
    { sourceDomain: "venturebeat.com", dr: 91, yourStatus: "Missing Link", competitorHas: true, opportunity: "Resource Page Inclusion" }
  ];

  return (
    <div className="space-y-4 text-xs">
      <Card className="p-4 bg-primary/10 border-primary/20 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-foreground">Backlink Gap Intelligence</h3>
          <p className="text-muted-foreground">High-authority domains linking to competitors that your website has not acquired yet.</p>
        </div>
        <Badge variant="default" className="glow-primary">2 Missing Link Opportunities</Badge>
      </Card>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-4 font-semibold">High Authority Domain</th>
              <th className="p-4 font-semibold">Domain Rating (DR)</th>
              <th className="p-4 font-semibold">Your Link Status</th>
              <th className="p-4 font-semibold">Link Building Opportunity</th>
              <th className="p-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {gaps.map((g, i) => (
              <tr key={i} className="hover:bg-accent/40 transition-colors">
                <td className="p-4 font-bold text-foreground flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" /> {g.sourceDomain}
                </td>
                <td className="p-4 font-bold text-indigo-400">DR {g.dr}</td>
                <td className="p-4">
                  <Badge variant={g.yourStatus === "Shared Link" ? "success" : "destructive"}>
                    {g.yourStatus}
                  </Badge>
                </td>
                <td className="p-4 text-foreground font-medium">{g.opportunity}</td>
                <td className="p-4 text-right">
                  <Button size="sm" variant="outline" className="gap-1 text-[11px]">
                    <Plus className="w-3 h-3 text-primary" /> Add to Outreach CRM
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
