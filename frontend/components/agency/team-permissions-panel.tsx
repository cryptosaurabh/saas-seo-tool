"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Shield, Check, Lock } from "lucide-react";

export function TeamPermissionsPanel() {
  const members = [
    { id: "1", name: "Yash Nathan", email: "yash@apexagency.com", role: "Agency Owner", permissions: ["All Access"] },
    { id: "2", name: "Sarah Jenkins", email: "sarah@apexagency.com", role: "SEO Executive", permissions: ["Run Audits", "Manage Clients", "Export Reports"] },
    { id: "3", name: "Marcus Vance", email: "marcus@apexagency.com", role: "Content Writer", permissions: ["AI Content Studio", "View Keywords"] }
  ];

  return (
    <div className="space-y-4 text-xs">
      <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-foreground">Agency Team & Granular Permissions</h3>
          <p className="text-muted-foreground">Manage agency team members, role assignments (Manager, Executive, Writer, Analyst), and access controls.</p>
        </div>
        <Button className="gap-2 shadow-lg glow-primary shrink-0">
          <UserPlus className="w-4 h-4" /> Invite Team Member
        </Button>
      </Card>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-4 font-semibold">Team Member Name</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Agency Role</th>
              <th className="p-4 font-semibold">Granted Permissions</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-accent/40 transition-colors">
                <td className="p-4 font-bold text-foreground flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" /> {m.name}
                </td>
                <td className="p-4 text-muted-foreground font-mono">{m.email}</td>
                <td className="p-4">
                  <Badge variant={m.role === "Agency Owner" ? "success" : "default"}>
                    {m.role}
                  </Badge>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {m.permissions.map((p, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-accent border border-border text-muted-foreground text-[10px]">
                        {p}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <Button size="sm" variant="ghost" className="text-[11px]">Edit Role</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
