"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ShieldAlert, AlertTriangle, CheckCircle2, Lock, Filter } from "lucide-react";

export default function ErrorLogsSecurityPage() {
  const [activeTab, setActiveTab] = useState<"logs" | "security">("logs");

  return (
    <div className="space-y-6 text-foreground">
      <div>
        <Badge variant="destructive" className="mb-1">SECURITY & LOG AUDIT</Badge>
        <h1 className="text-2xl font-black tracking-tight">Error Logs & Security Center</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Inspect application exceptions, API error tracebacks, blocked IP addresses, and administrative audit trails.</p>
      </div>

      <div className="flex gap-2 border-b border-border pb-2">
        <Button
          size="sm"
          variant={activeTab === "logs" ? "default" : "outline"}
          onClick={() => setActiveTab("logs")}
          className="text-xs"
        >
          <FileText className="w-3.5 h-3.5 mr-1.5" /> System Logs (24h)
        </Button>
        <Button
          size="sm"
          variant={activeTab === "security" ? "default" : "outline"}
          onClick={() => setActiveTab("security")}
          className="text-xs"
        >
          <ShieldAlert className="w-3.5 h-3.5 mr-1.5" /> Security & Blocked IPs
        </Button>
      </div>

      {activeTab === "logs" ? (
        <Card className="p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-bold text-sm text-foreground">Application & API Traceback Logs</h3>
            <Badge variant="secondary">2 ERRORS LOGGED TODAY</Badge>
          </div>

          <div className="space-y-3">
            {[
              { level: "WARNING", cat: "billing", msg: "Stripe webhook event signature timestamp offset (+12s)", time: "15 mins ago" },
              { level: "ERROR", cat: "audit_engine", msg: "HTTP Timeout 504 reaching target website host domain", time: "1 hour ago" },
              { level: "INFO", cat: "auth", msg: "User login succeeded for alex@seopilot.ai", time: "2 hours ago" }
            ].map((log, i) => (
              <div key={i} className="p-3 bg-muted/40 rounded-xl border border-border space-y-1 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={log.level === "ERROR" ? "destructive" : log.level === "WARNING" ? "default" : "secondary"} className="text-[9px]">
                      {log.level}
                    </Badge>
                    <span className="font-bold text-foreground">[{log.cat}]</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{log.time}</span>
                </div>
                <div className="text-muted-foreground text-[11px] pt-1">{log.msg}</div>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Card className="p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-bold text-sm text-foreground">Security Threats & IP Blocklist</h3>
            <Badge variant="destructive">2 BLOCKED IPS</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-muted/40 rounded-xl border border-border space-y-2">
              <div className="font-bold text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4 text-rose-500" />
                <span>Blocked IP: 185.220.101.4</span>
              </div>
              <div className="text-muted-foreground">Reason: 25+ failed login attempts within 60 seconds (Brute-force protection).</div>
              <Button size="sm" variant="outline" className="text-[10px] h-7">Unblock IP Address</Button>
            </div>

            <div className="p-4 bg-muted/40 rounded-xl border border-border space-y-2">
              <div className="font-bold text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4 text-rose-500" />
                <span>Blocked IP: 45.142.214.2</span>
              </div>
              <div className="text-muted-foreground">Reason: Suspicious crawler rate-limit violation.</div>
              <Button size="sm" variant="outline" className="text-[10px] h-7">Unblock IP Address</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
