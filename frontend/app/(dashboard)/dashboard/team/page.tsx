"use client";

import React from "react";
import { TeamTab } from "@/components/settings/team-tab";

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">Team Management</h1>
        <p className="text-xs text-muted-foreground">Invite members, assign roles, and configure organization permissions (RBAC).</p>
      </div>
      <TeamTab />
    </div>
  );
}
