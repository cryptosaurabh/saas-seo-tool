"use client";

import React from "react";
import { WebsiteManager } from "@/components/dashboard/website-manager";

export default function WebsitesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">Website Domain Manager</h1>
        <p className="text-xs text-muted-foreground">Manage primary domains, secondary aliases, SSL certificates, and indexing parameters.</p>
      </div>
      <WebsiteManager />
    </div>
  );
}
