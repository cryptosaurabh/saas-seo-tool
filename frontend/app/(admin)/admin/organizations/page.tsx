"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Building, Search, ArrowRightLeft, Trash2, Power, Eye, Users } from "lucide-react";

export default function OrganizationManagementPage() {
  const [orgs, setOrgs] = useState([
    { id: "org_1", name: "SEOPilot Internal", slug: "seopilot-internal", owner: "alex@seopilot.ai", plan: "Enterprise", projects: 12, users: 8, status: "Active" },
    { id: "org_2", name: "Apex Media Agency", slug: "apex-media", owner: "marcus@apexmedia.com", plan: "Agency", projects: 25, users: 18, status: "Active" },
    { id: "org_3", name: "CloudScale SaaS", slug: "cloudscale", owner: "elena@cloudscale.io", plan: "Professional", projects: 8, users: 5, status: "Active" },
    { id: "org_4", name: "EcomBoost Inc", slug: "ecomboost", owner: "david@ecomboost.com", plan: "Starter", projects: 3, users: 2, status: "Active" },
    { id: "org_5", name: "Growth Labs LLC", slug: "growth-labs", owner: "test@growthlabs.io", plan: "Free", projects: 1, users: 1, status: "Suspended" },
  ]);

  return (
    <div className="space-y-6 text-foreground">
      <div className="flex justify-between items-center">
        <div>
          <Badge variant="destructive" className="mb-1">ORGANIZATION OVERSIGHT</Badge>
          <h1 className="text-2xl font-black tracking-tight">Organizations & Tenants</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Manage SaaS tenant accounts, subscription allocations, and transfer ownership.</p>
        </div>
      </div>

      <Card className="p-4 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-[11px] uppercase tracking-wider">
                <th className="py-3 px-2 font-bold">Organization</th>
                <th className="py-3 px-2 font-bold">Owner</th>
                <th className="py-3 px-2 font-bold">Plan Tier</th>
                <th className="py-3 px-2 font-bold">Projects / Users</th>
                <th className="py-3 px-2 font-bold">Status</th>
                <th className="py-3 px-2 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orgs.map((o) => (
                <tr key={o.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-2 font-medium">
                    <div className="font-bold text-foreground">{o.name}</div>
                    <div className="text-[10px] text-muted-foreground">{o.slug}</div>
                  </td>
                  <td className="py-3 px-2 text-muted-foreground">{o.owner}</td>
                  <td className="py-3 px-2">
                    <Badge variant={o.plan === "Agency" || o.plan === "Enterprise" ? "default" : "secondary"}>
                      {o.plan}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 font-semibold">
                    {o.projects} Projects • {o.users} Members
                  </td>
                  <td className="py-3 px-2">
                    <Badge variant={o.status === "Active" ? "success" : "secondary"}>
                      {o.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="sm" variant="ghost" className="h-7 px-2 text-[10px]" onClick={() => alert(`Transferring ownership for ${o.name}...`)}>
                        <ArrowRightLeft className="w-3.5 h-3.5 mr-1" /> Transfer
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 px-2 text-[10px] text-rose-400">
                        <Power className="w-3.5 h-3.5 mr-1" /> Suspend
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
