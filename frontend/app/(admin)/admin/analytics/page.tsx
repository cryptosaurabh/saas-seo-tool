"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, Activity, Zap, HardDrive } from "lucide-react";

export default function PlatformAnalyticsPage() {
  return (
    <div className="space-y-6 text-foreground">
      <div>
        <Badge variant="destructive" className="mb-1">EXECUTIVE INSIGHTS</Badge>
        <h1 className="text-2xl font-black tracking-tight">Platform & Revenue Analytics</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Track user retention, monthly active users, revenue trajectories, and system resource consumption.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-card">
          <div className="text-xs text-muted-foreground font-semibold">Daily Active Users (DAU)</div>
          <div className="text-2xl font-black text-foreground mt-1">840</div>
          <div className="text-[10px] text-emerald-400 font-bold mt-1">+14% vs last week</div>
        </Card>

        <Card className="p-4 bg-card">
          <div className="text-xs text-muted-foreground font-semibold">Monthly Active Users (MAU)</div>
          <div className="text-2xl font-black text-foreground mt-1">3,200</div>
          <div className="text-[10px] text-emerald-400 font-bold mt-1">+18.4% growth rate</div>
        </Card>

        <Card className="p-4 bg-card">
          <div className="text-xs text-muted-foreground font-semibold">New Signups (30d)</div>
          <div className="text-2xl font-black text-foreground mt-1">240</div>
          <div className="text-[10px] text-muted-foreground mt-1">Organic conversion 8.4%</div>
        </Card>

        <Card className="p-4 bg-card">
          <div className="text-xs text-muted-foreground font-semibold">Storage Utilization</div>
          <div className="text-2xl font-black text-foreground mt-1">482.5 GB</div>
          <div className="text-[10px] text-muted-foreground mt-1">Report PDFs & SERP Caches</div>
        </Card>
      </div>

      {/* Revenue Trajectory */}
      <Card className="p-6 space-y-4">
        <h3 className="font-bold text-sm text-foreground">Monthly Recurring Revenue (MRR) Growth</h3>
        <div className="grid grid-cols-6 gap-2 pt-4">
          {[
            { month: "Feb", mrr: "$24.5k", height: "h-20" },
            { month: "Mar", mrr: "$27.2k", height: "h-24" },
            { month: "Apr", mrr: "$29.8k", height: "h-28" },
            { month: "May", mrr: "$31.4k", height: "h-32" },
            { month: "Jun", mrr: "$33.1k", height: "h-36" },
            { month: "Jul", mrr: "$34.8k", height: "h-40" }
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="text-xs font-bold text-foreground">{bar.mrr}</div>
              <div className={`w-full bg-primary/20 hover:bg-primary rounded-t-lg transition-all ${bar.height}`} />
              <div className="text-[10px] font-semibold text-muted-foreground">{bar.month}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
