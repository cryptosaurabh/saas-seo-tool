"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuickCreateModal } from "@/components/dashboard/quick-create-modal";
import { 
  Building2, 
  Globe, 
  Users, 
  Key, 
  Activity, 
  Sparkles, 
  ArrowUpRight, 
  Plus, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  FileText,
  Boxes
} from "lucide-react";

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8 relative pb-16">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-primary/20 via-card to-purple-600/10 border border-primary/20 relative overflow-hidden glass-panel">
        <div className="relative z-10 space-y-2">
          <Badge variant="default" className="glow-primary">ACTIVE TENANT: ACME AGENCY</Badge>
          <h1 className="text-3xl font-black text-foreground tracking-tight">
            SEOPilot AI Executive Console
          </h1>
          <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
            Multi-tenant workspace isolation active. Manage projects, website domains, task items, automated client reports, and team permissions in real time.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Active Workspaces", value: "3", change: "Multi-Tenant Isolated", icon: Building2, color: "text-primary" },
          { title: "Monitored Domains", value: "8 / 20", change: "Professional Tier", icon: Globe, color: "text-emerald-500" },
          { title: "Team Members", value: "4 Users", change: "RBAC Enforced", icon: Users, color: "text-indigo-500" },
          { title: "Scoped API Keys", value: "2 Secrets", change: "Active Webhooks", icon: Key, color: "text-amber-500" }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="p-5 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-muted-foreground">{stat.title}</div>
                <div className="text-2xl font-bold text-foreground mt-1">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground mt-1 font-semibold text-emerald-500">
                  {stat.change}
                </div>
              </div>
              <div className={`p-3 rounded-2xl bg-card border border-border ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Workspaces & Recent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground">Projects Overview</h2>
              <p className="text-xs text-muted-foreground">Active projects in current workspace</p>
            </div>
            <Button size="sm" className="gap-1.5" onClick={() => window.location.href = "/dashboard/projects"}>
              Manage Projects <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="p-6 rounded-xl border border-dashed border-border text-center space-y-2">
            <Boxes className="w-8 h-8 mx-auto text-muted-foreground/60" />
            <div className="font-semibold text-xs text-foreground">No active projects created</div>
            <p className="text-[11px] text-muted-foreground">Click "Manage Projects" or bottom "+ Quick Create" button to add your first project.</p>
            <Button size="sm" variant="outline" className="text-xs mt-2" onClick={() => window.location.href = "/dashboard/projects"}>
              + Create First Project
            </Button>
          </div>
        </Card>

        {/* Security Audit Feed */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">Recent Activity</h2>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </div>

          <div className="space-y-3 text-xs">
            {[
              { action: "User Session Authenticated", user: "alex.mercer@acmeagency.com", time: "2 mins ago" },
              { action: "API Key Generated", user: "Production Webhook", time: "1 hour ago" },
              { action: "Team Member Invited", user: "david@acmeagency.com", time: "3 hours ago" }
            ].map((log, i) => (
              <div key={i} className="p-3 rounded-xl bg-accent/30 border border-border space-y-1">
                <div className="font-semibold text-foreground">{log.action}</div>
                <div className="text-[10px] text-muted-foreground flex items-center justify-between">
                  <span>{log.user}</span>
                  <span>{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Floating Quick Action Button */}
      <QuickCreateModal />
    </div>
  );
}
