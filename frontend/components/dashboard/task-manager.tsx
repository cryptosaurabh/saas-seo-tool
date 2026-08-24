"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Plus, Clock, CheckCircle2, AlertTriangle, Pin, Trash2, X } from "lucide-react";

export function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Fix missing canonical tags on product pages", category: "Technical SEO", priority: "High", status: "Upcoming", dueDate: "Today", pinned: true },
    { id: "2", title: "Generate JSON-LD FAQ schema for landing page", category: "Schema", priority: "Medium", status: "Upcoming", dueDate: "Tomorrow", pinned: false },
    { id: "3", title: "Audit 404 broken redirect links", category: "Audits", priority: "High", status: "Completed", dueDate: "Jul 22", pinned: false },
    { id: "4", title: "Submit updated XML sitemap to Google Search Console", category: "Indexing", priority: "Low", status: "Overdue", dueDate: "Jul 20", pinned: true }
  ]);

  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [category, setCategory] = useState("Technical SEO");

  const filtered = tasks.filter((t) => filter === "All" || t.status === filter);

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: t.status === "Completed" ? "Upcoming" : "Completed" } : t)));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks([
      ...tasks,
      { id: Date.now().toString(), title: taskTitle, category, priority: "Medium", status: "Upcoming", dueDate: "Today", pinned: false }
    ]);
    setTaskTitle("");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-foreground">SEO Action Tasks & Planner</h2>
          <p className="text-xs text-muted-foreground">Assign, track, and complete SEO technical recommendations.</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-10 rounded-lg border border-input bg-background px-3 text-xs focus:outline-none text-foreground"
          >
            <option value="All">All Tasks</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Overdue">Overdue</option>
            <option value="Completed">Completed</option>
          </select>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Add Task
          </Button>
        </div>
      </Card>

      {/* Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-popover p-6 shadow-2xl glass-panel space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-foreground">Create Task</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={addTask} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Task Title</label>
                <Input placeholder="e.g. Audit LCP web vitals score" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-xs focus:outline-none text-foreground">
                  <option value="Technical SEO">Technical SEO</option>
                  <option value="Schema">Schema & Metadata</option>
                  <option value="Content">Content Strategy</option>
                  <option value="Indexing">Indexing & Crawling</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">Save Task</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-3">
        {filtered.map((t) => (
          <Card key={t.id} className="p-4 flex items-center justify-between hover:bg-accent/40 transition-colors">
            <div className="flex items-center gap-3">
              <button onClick={() => toggleTask(t.id)} className="text-muted-foreground hover:text-primary">
                {t.status === "Completed" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <div className="w-5 h-5 rounded-md border border-border" />
                )}
              </button>
              <div>
                <div className={`font-semibold text-xs text-foreground ${t.status === "Completed" ? "line-through text-muted-foreground" : ""}`}>
                  {t.title}
                </div>
                <div className="text-[10px] text-muted-foreground flex items-center gap-2 mt-0.5">
                  <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">{t.category}</span>
                  <span>Due: {t.dueDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant={t.priority === "High" ? "destructive" : "secondary"}>{t.priority}</Badge>
              {t.pinned && <Pin className="w-3.5 h-3.5 text-primary fill-primary" />}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ReportsOverview() {
  const reports = [
    { id: "1", title: "Executive Technical SEO Audit", site: "acmeagency.com", date: "Jul 25, 2026", status: "Ready", size: "2.4 MB" },
    { id: "2", title: "Monthly Organic Keyword Growth", site: "techcorp.global", date: "Jul 01, 2026", status: "Ready", size: "1.8 MB" }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-4 font-semibold">Report Title</th>
              <th className="p-4 font-semibold">Domain</th>
              <th className="p-4 font-semibold">Date Generated</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {reports.map((r) => (
              <tr key={r.id} className="hover:bg-accent/40 transition-colors">
                <td className="p-4 font-bold text-foreground">{r.title}</td>
                <td className="p-4 text-muted-foreground font-mono">{r.site}</td>
                <td className="p-4 text-muted-foreground">{r.date}</td>
                <td className="p-4"><Badge variant="success">{r.status}</Badge></td>
                <td className="p-4 text-right">
                  <Button variant="outline" size="sm" className="gap-1">
                    Download PDF ({r.size})
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
