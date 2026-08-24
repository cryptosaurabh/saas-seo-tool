"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Building,
  Briefcase,
  Globe,
  FolderGit2,
  DollarSign,
  Zap,
  Activity,
  Cpu,
  Database,
  Layers,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  Clock
} from "lucide-react";

export default function SuperAdminDashboardPage() {
  const kpis = [
    { title: "Total Users", value: "1,420", sub: "+18% this month", icon: Users, color: "text-blue-500" },
    { title: "Organizations", value: "380", sub: "320 Active Subscriptions", icon: Building, color: "text-indigo-500" },
    { title: "Agencies", value: "45", sub: "100% White-Labeled", icon: Briefcase, color: "text-purple-500" },
    { title: "Monitored Websites", value: "890", sub: "12.4k Crawls completed", icon: Globe, color: "text-emerald-500" },
    { title: "Active Projects", value: "510", sub: "Across all workspaces", icon: FolderGit2, color: "text-cyan-500" },
    { title: "Monthly Recurring Revenue", value: "$34,850.00", sub: "+22.4% MoM growth", icon: DollarSign, color: "text-emerald-400" },
    { title: "AI Requests (30d)", value: "184.5k", sub: "14.2M Tokens consumed", icon: Zap, color: "text-amber-500" },
    { title: "Free / Trial Users", value: "1,100 / 60", sub: "Free plan conversion rate 8.4%", icon: Users, color: "text-rose-500" },
  ];

  return (
    <div className="space-y-6 text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="destructive" className="mb-1">SUPER ADMIN PANEL</Badge>
          <h1 className="text-3xl font-black tracking-tight">Platform Control Center</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Real-time overview of users, revenue, infrastructure, and background queues.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            Export Platform Snapshot
          </Button>
          <Button size="sm" className="glow-primary text-xs font-bold">
            Broadcast Announcement
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx} className="p-4 bg-card border-border flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-semibold">{kpi.title}</span>
                <div className={`p-2 rounded-lg bg-muted/60 ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-black tracking-tight">{kpi.value}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{kpi.sub}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Infrastructure & Queues Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Infrastructure Status */}
        <Card className="p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <h3 className="font-bold text-sm">System Infrastructure</h3>
            </div>
            <Badge variant="success">ALL OPERATIONAL</Badge>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-muted-foreground mb-1">
                <span>CPU Usage (FastAPI Async)</span>
                <span className="font-bold text-foreground">24.5%</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[24.5%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-muted-foreground mb-1">
                <span>RAM Utilization (Redis + App)</span>
                <span className="font-bold text-foreground">42.1% (6.7 GB / 16 GB)</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[42.1%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-muted-foreground mb-1">
                <span>PostgreSQL DB Latency</span>
                <span className="font-bold text-foreground">1.8 ms</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[15%]" />
              </div>
            </div>
          </div>
        </Card>

        {/* Celery Background Queue Status */}
        <Card className="p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-sm">Celery Background Workers</h3>
            </div>
            <Badge variant="outline">4 WORKERS ONLINE</Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 bg-muted/40 rounded-xl">
              <div className="text-xl font-black text-emerald-500">12</div>
              <div className="text-[10px] text-muted-foreground uppercase font-bold mt-0.5">Running Jobs</div>
            </div>
            <div className="p-3 bg-muted/40 rounded-xl">
              <div className="text-xl font-black text-amber-500">4</div>
              <div className="text-[10px] text-muted-foreground uppercase font-bold mt-0.5">Pending Queue</div>
            </div>
            <div className="p-3 bg-muted/40 rounded-xl">
              <div className="text-xl font-black text-foreground">1,420</div>
              <div className="text-[10px] text-muted-foreground uppercase font-bold mt-0.5">Completed (24h)</div>
            </div>
            <div className="p-3 bg-muted/40 rounded-xl">
              <div className="text-xl font-black text-rose-500">0</div>
              <div className="text-[10px] text-muted-foreground uppercase font-bold mt-0.5">Failed Jobs</div>
            </div>
          </div>
        </Card>

        {/* Live Admin Audit Feed */}
        <Card className="p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-500" />
              <h3 className="font-bold text-sm">Recent Audit Activities</h3>
            </div>
            <span className="text-[10px] text-muted-foreground">Live Feed</span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { title: "User Password Reset Forced", admin: "SuperAdmin", time: "5 mins ago", color: "bg-blue-500" },
              { title: "Feature Flag 'beta_ai_writer' enabled", admin: "SuperAdmin", time: "18 mins ago", color: "bg-emerald-500" },
              { title: "Organization 'Apex Media' upgraded to Agency", admin: "Stripe Webhook", time: "1 hour ago", color: "bg-indigo-500" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.color}`} />
                <div className="flex-1">
                  <div className="font-semibold text-foreground">{item.title}</div>
                  <div className="text-[10px] text-muted-foreground">by {item.admin} • {item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
