"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ShieldCheck, User } from "lucide-react";

export default function AuditLogsPage() {
  const logs = [
    { id: "1", action: "user.login", resource: "Auth Service", ip: "192.168.1.100", user: "alex.mercer@acmeagency.com", time: "2 mins ago" },
    { id: "2", action: "apikey.created", resource: "API Keys", ip: "192.168.1.100", user: "alex.mercer@acmeagency.com", time: "1 hour ago" },
    { id: "3", action: "team.invited", resource: "Team Management", ip: "192.168.1.100", user: "alex.mercer@acmeagency.com", time: "3 hours ago" },
    { id: "4", action: "org.updated", resource: "Organization Settings", ip: "192.168.1.100", user: "alex.mercer@acmeagency.com", time: "1 day ago" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">Security Audit Logs</h1>
        <p className="text-xs text-muted-foreground">Immutable activity trail tracking tenant security and user actions.</p>
      </div>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-4 font-semibold">Action</th>
              <th className="p-4 font-semibold">Resource</th>
              <th className="p-4 font-semibold">User</th>
              <th className="p-4 font-semibold">IP Address</th>
              <th className="p-4 font-semibold text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {logs.map((l) => (
              <tr key={l.id} className="hover:bg-accent/40 transition-colors">
                <td className="p-4 font-mono font-bold text-primary">{l.action}</td>
                <td className="p-4 text-foreground">{l.resource}</td>
                <td className="p-4 text-muted-foreground">{l.user}</td>
                <td className="p-4 font-mono text-muted-foreground">{l.ip}</td>
                <td className="p-4 text-right text-muted-foreground">{l.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
