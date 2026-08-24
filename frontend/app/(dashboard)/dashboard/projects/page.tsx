"use client";

import React from "react";
import { ProjectManager } from "@/components/dashboard/project-manager";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">Project Management Console</h1>
        <p className="text-xs text-muted-foreground">Manage your workspace SEO projects, target domains, and ranking parameters.</p>
      </div>
      <ProjectManager />
    </div>
  );
}
