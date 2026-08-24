"use client";

import React from "react";
import { APIKeysTab } from "@/components/settings/apikeys-tab";

export default function APIKeysPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">API Keys & Tokens</h1>
        <p className="text-xs text-muted-foreground">Manage programmatic secret tokens for external API integration.</p>
      </div>
      <APIKeysTab />
    </div>
  );
}
