"use client";

import React from "react";
import { TaskManager } from "@/components/dashboard/task-manager";

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">SEO Action Tasks & Planner</h1>
        <p className="text-xs text-muted-foreground">Assign, track, and complete SEO technical action items across team members.</p>
      </div>
      <TaskManager />
    </div>
  );
}
