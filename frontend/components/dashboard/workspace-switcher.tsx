"use client";

import React, { useState } from "react";
import { useTenantStore } from "@/store/tenant-store";
import { Building2, ChevronDown, Check, Plus, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function WorkspaceSwitcher() {
  const { activeOrg, organizations, setActiveOrg } = useTenantStore();
  const [isOpen, setIsOpen] = useState(false);

  const mockOrgs = organizations.length > 0 ? organizations : [
    { id: "1", name: "Acme Agency", slug: "acme-agency", plan_tier: "agency", is_owner: true },
    { id: "2", name: "TechCorp Global", slug: "techcorp", plan_tier: "starter", is_owner: false }
  ];

  const current = activeOrg || mockOrgs[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2.5 rounded-lg border border-border bg-card/50 hover:bg-card transition-all text-left group"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div className="truncate">
            <div className="text-xs font-semibold text-foreground truncate">{current.name}</div>
            <div className="text-[10px] text-muted-foreground flex items-center gap-1">
              <span className="capitalize">{current.plan_tier} Tier</span>
            </div>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-transform duration-200" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl border border-border bg-popover p-1.5 shadow-xl glass-panel animate-in fade-in slide-in-from-top-2">
          <div className="px-2 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Organizations
          </div>
          {mockOrgs.map((org) => (
            <button
              key={org.id}
              onClick={() => {
                setActiveOrg(org);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between p-2 rounded-lg text-xs hover:bg-accent text-left transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="font-medium text-foreground">{org.name}</span>
                <Badge variant={org.plan_tier === "agency" ? "default" : "secondary"}>
                  {org.plan_tier}
                </Badge>
              </div>
              {org.id === current.id && <Check className="w-4 h-4 text-primary" />}
            </button>
          ))}
          <div className="h-px bg-border my-1" />
          <button
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center gap-2 p-2 rounded-lg text-xs text-primary hover:bg-primary/10 font-medium transition-colors"
          >
            <Plus className="w-4 h-4" /> Create Organization
          </button>
        </div>
      )}
    </div>
  );
}
