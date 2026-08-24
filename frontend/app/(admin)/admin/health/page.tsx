"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Cpu, Database, RefreshCw, Play, XCircle, CheckCircle2 } from "lucide-react";

export default function SystemHealthPage() {
  const [jobs, setJobs] = useState([
    { id: "job_101", name: "app.tasks.audit_engine.crawl_website", status: "Pending", worker: "worker_01", time: "2 mins ago" },
    { id: "job_102", name: "app.tasks.billing_tasks.process_subscription_renewals", status: "Running", worker: "worker_02", time: "30s ago" },
    { id: "job_103", name: "app.tasks.rank_tracker.fetch_serp", status: "Running", worker: "worker_03", time: "10s ago" },
    { id: "job_104", name: "app.tasks.content_generator.generate_draft", status: "Completed", worker: "worker_04", time: "5 mins ago" },
  ]);

  const handleRetry = (id: string) => {
    alert(`Retrying job ${id}...`);
  };

  return (
    <div className="space-y-6 text-foreground">
      <div>
        <Badge variant="destructive" className="mb-1">INFRASTRUCTURE MONITORING</Badge>
        <h1 className="text-2xl font-black tracking-tight">System Health & Queue Control</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Real-time status of APIs, PostgreSQL, Redis cache, and Celery background workers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 flex items-center justify-between border-emerald-500/30 bg-emerald-500/5">
          <div>
            <div className="text-xs font-bold text-emerald-500">PostgreSQL Database</div>
            <div className="text-lg font-black text-foreground">1.8 ms Latency</div>
            <div className="text-[10px] text-muted-foreground">Connections: 42 / 200</div>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </Card>

        <Card className="p-4 flex items-center justify-between border-indigo-500/30 bg-indigo-500/5">
          <div>
            <div className="text-xs font-bold text-indigo-500">Redis Cache & PubSub</div>
            <div className="text-lg font-black text-foreground">Operational</div>
            <div className="text-[10px] text-muted-foreground">Memory: 240 MB / 4 GB</div>
          </div>
          <Activity className="w-8 h-8 text-indigo-500" />
        </Card>

        <Card className="p-4 flex items-center justify-between border-primary/30 bg-primary/5">
          <div>
            <div className="text-xs font-bold text-primary">Celery Queue Cluster</div>
            <div className="text-lg font-black text-foreground">4 Active Workers</div>
            <div className="text-[10px] text-muted-foreground">Queue Backlog: 4 Jobs</div>
          </div>
          <Cpu className="w-8 h-8 text-primary" />
        </Card>
      </div>

      {/* Queue Monitor Table */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="font-bold text-sm text-foreground">Background Queue Inspector</h3>
          <Button size="sm" variant="outline" className="text-xs">
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Refresh Queue Status
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-2 font-bold">Job ID</th>
                <th className="py-2.5 px-2 font-bold">Task Name</th>
                <th className="py-2.5 px-2 font-bold">Status</th>
                <th className="py-2.5 px-2 font-bold">Worker</th>
                <th className="py-2.5 px-2 font-bold">Age</th>
                <th className="py-2.5 px-2 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {jobs.map((j) => (
                <tr key={j.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-2 font-bold text-foreground">{j.id}</td>
                  <td className="py-3 px-2 font-mono text-[11px] text-primary">{j.name}</td>
                  <td className="py-3 px-2">
                    <Badge variant={j.status === "Running" ? "default" : j.status === "Completed" ? "success" : "secondary"}>
                      {j.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-muted-foreground">{j.worker}</td>
                  <td className="py-3 px-2 text-muted-foreground">{j.time}</td>
                  <td className="py-3 px-2 text-right">
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-[10px]" onClick={() => handleRetry(j.id)}>
                      <Play className="w-3.5 h-3.5 mr-1" /> Retry
                    </Button>
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
