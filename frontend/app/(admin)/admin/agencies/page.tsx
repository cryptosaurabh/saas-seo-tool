"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, CheckCircle2, Globe, Shield, Sparkles } from "lucide-react";

export default function AgencyManagementPage() {
  const agencies = [
    { name: "Apex Marketing Group", owner: "marcus@apexmedia.com", clients: 18, whiteLabel: true, domain: "reports.apexmedia.com", mrr: "$199.00/mo" },
    { name: "Digital Boost Agency", owner: "sarah@digitalboost.io", clients: 32, whiteLabel: true, domain: "seo.digitalboost.io", mrr: "$199.00/mo" },
    { name: "Nexus Media Agency", owner: "kevin@nexusmedia.com", clients: 12, whiteLabel: true, domain: "portal.nexusmedia.com", mrr: "$199.00/mo" },
  ];

  return (
    <div className="space-y-6 text-foreground">
      <div>
        <Badge variant="destructive" className="mb-1">WHITE-LABEL AGENCY SUITE</Badge>
        <h1 className="text-2xl font-black tracking-tight">Agency & Client Overview</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Manage high-tier agency partners, white-label portals, and client limits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {agencies.map((a, i) => (
          <Card key={i} className="p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-base text-foreground">{a.name}</h3>
                <Badge variant="default">AGENCY</Badge>
              </div>
              <div className="text-xs text-muted-foreground">Owner: {a.owner}</div>
              <div className="text-xs font-semibold text-foreground">{a.clients} Client Portals Managed</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> White-label CNAME: {a.domain}
              </div>
            </div>

            <div className="pt-3 border-t border-border flex justify-between items-center text-xs">
              <span className="font-bold text-foreground">{a.mrr}</span>
              <Button size="sm" variant="outline" className="text-[10px]">Manage Agency</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
