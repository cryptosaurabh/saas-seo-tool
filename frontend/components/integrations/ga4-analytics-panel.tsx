"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/alert";
import { Users, Clock, PieChart, Activity, CheckCircle2 } from "lucide-react";

export function GA4AnalyticsPanel() {
  const ga4Data = {
    activeUsers: "34.2k",
    sessions: "48.9k",
    newUsers: "28.4k",
    bounceRate: "32.4%",
    avgEngagement: "2m 22s",
    channels: [
      { name: "Organic Search", sessions: 32100, pct: 65.6, color: "bg-emerald-500" },
      { name: "Direct Traffic", sessions: 9800, pct: 20.0, color: "bg-primary" },
      { name: "Referral Links", sessions: 4200, pct: 8.6, color: "bg-indigo-500" },
      { name: "Social Media", sessions: 2800, pct: 5.8, color: "bg-amber-500" }
    ]
  };

  return (
    <div className="space-y-6 text-xs">
      {/* GA4 Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Active Users</div>
            <div className="text-2xl font-black text-foreground mt-1">{ga4Data.activeUsers}</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">28.4k New Users</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Users className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Total Sessions</div>
            <div className="text-2xl font-black text-foreground mt-1">{ga4Data.sessions}</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">High Conversion Rate</div>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <Activity className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Avg Engagement Time</div>
            <div className="text-2xl font-black text-indigo-400 mt-1">{ga4Data.avgEngagement}</div>
            <div className="text-[10px] text-muted-foreground font-semibold mt-1">Deep Session Duration</div>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Clock className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Bounce Rate</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{ga4Data.bounceRate}</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">Optimal Retention</div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <PieChart className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Traffic Channel Breakdown Card */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-foreground">Traffic Acquisition Channel Breakdown</h3>
          <Badge variant="success">GA4 Real-Time Stream</Badge>
        </div>

        <div className="space-y-3">
          {ga4Data.channels.map((c, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between font-medium">
                <span className="text-foreground">{c.name}</span>
                <span className="font-mono text-muted-foreground">{c.sessions.toLocaleString()} sessions ({c.pct}%)</span>
              </div>
              <Progress value={c.pct} className="h-2" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
