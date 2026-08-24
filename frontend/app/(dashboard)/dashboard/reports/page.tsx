"use client";

import React from "react";
import { ReportsOverview } from "@/components/dashboard/task-manager";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">Reports & PDF Export Center</h1>
        <p className="text-xs text-muted-foreground">Download, schedule, and share automated client reports.</p>
      </div>
      <ReportsOverview />
    </div>
  );
}
