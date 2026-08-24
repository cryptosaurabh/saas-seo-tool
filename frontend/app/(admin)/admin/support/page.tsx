"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";

export default function SupportCenterPage() {
  const tickets = [
    { id: "TICKET-1001", user: "david@ecomboost.com", title: "Assistance required with GSC OAuth token refresh error", category: "integrations", priority: "High", status: "Open", time: "1 hour ago" },
    { id: "TICKET-1002", user: "elena@cloudscale.io", title: "Custom CNAME white-label reporting domain configuration", category: "agency", priority: "Medium", status: "In Progress", time: "4 hours ago" },
    { id: "TICKET-1003", user: "marcus@apexmedia.com", title: "API rate limit upgrade request for bulk audits", category: "billing", priority: "Low", status: "Resolved", time: "1 day ago" },
  ];

  return (
    <div className="space-y-6 text-foreground">
      <div>
        <Badge variant="destructive" className="mb-1">CUSTOMER SUCCESS</Badge>
        <h1 className="text-2xl font-black tracking-tight">Support Tickets & Inquiry Desk</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Manage incoming customer tickets, bug reports, and technical assistance inquiries.</p>
      </div>

      <Card className="p-4 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-[11px] uppercase tracking-wider">
                <th className="py-3 px-2 font-bold">Ticket ID</th>
                <th className="py-3 px-2 font-bold">User</th>
                <th className="py-3 px-2 font-bold">Subject</th>
                <th className="py-3 px-2 font-bold">Priority</th>
                <th className="py-3 px-2 font-bold">Status</th>
                <th className="py-3 px-2 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-2 font-bold text-primary">{t.id}</td>
                  <td className="py-3 px-2 font-medium">{t.user}</td>
                  <td className="py-3 px-2 font-semibold text-foreground">{t.title}</td>
                  <td className="py-3 px-2">
                    <Badge variant={t.priority === "High" ? "destructive" : "secondary"}>{t.priority}</Badge>
                  </td>
                  <td className="py-3 px-2">
                    <Badge variant={t.status === "Open" ? "default" : t.status === "Resolved" ? "success" : "secondary"}>
                      {t.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <Button size="sm" variant="outline" className="text-[10px] h-7">Reply & Resolve</Button>
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
