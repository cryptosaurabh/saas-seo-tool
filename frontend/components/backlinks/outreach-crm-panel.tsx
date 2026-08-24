"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Plus, CheckCircle2, Clock, User, ExternalLink } from "lucide-react";

export function OutreachCRMPanel() {
  const prospects = [
    { id: "1", website_name: "SearchEngineJournal", contact_name: "Editor Team", contact_email: "editor@searchenginejournal.com", opportunity_type: "Guest Post", status: "Contacted", notes: "Submitted draft pitch for AI SEO workflow." },
    { id: "2", website_name: "Backlinko", contact_name: "Brian Dean", contact_email: "brian@backlinko.com", opportunity_type: "Broken Link", status: "Prospect", notes: "Reaching out for broken link replacement." }
  ];

  return (
    <div className="space-y-4 text-xs">
      <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-foreground">Link Building Outreach CRM</h3>
          <p className="text-muted-foreground">Manage outreach prospects for guest posting, broken link replacement, and brand mentions.</p>
        </div>
        <Button className="gap-2 shadow-lg glow-primary shrink-0">
          <Plus className="w-4 h-4" /> Add Outreach Prospect
        </Button>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prospects.map((p) => (
          <Card key={p.id} className="p-5 space-y-3 flex flex-col justify-between hover:border-primary/40 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant={p.status === "Contacted" ? "default" : "secondary"}>
                  {p.status}
                </Badge>
                <span className="text-[10px] font-bold uppercase text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                  {p.opportunity_type}
                </span>
              </div>

              <h4 className="font-bold text-base text-foreground">{p.website_name}</h4>
              <div className="text-[11px] text-muted-foreground flex items-center gap-1 font-mono">
                <User className="w-3.5 h-3.5" /> {p.contact_name} • {p.contact_email}
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed pt-1 border-t border-border">{p.notes}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <Button size="sm" variant="outline" className="gap-1.5 text-[11px]">
                <Mail className="w-3.5 h-3.5" /> Send Follow-up Email
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
