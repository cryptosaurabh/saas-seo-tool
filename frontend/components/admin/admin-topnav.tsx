"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShieldAlert,
  Search,
  Bell,
  RefreshCw,
  ExternalLink,
  Activity,
  UserCheck
} from "lucide-react";

export function AdminTopnav() {
  return (
    <header className="h-16 border-b border-border bg-card/60 backdrop-blur-md px-6 flex items-center justify-between shrink-0 text-foreground">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search users, orgs, invoices, logs, tickets..."
            className="pl-9 h-9 text-xs bg-muted/40 border-border/80"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-xs font-bold">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>System Healthy • 24.5ms</span>
        </div>

        <Link href="/dashboard">
          <Button size="sm" variant="outline" className="text-xs">
            <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Back to App
          </Button>
        </Link>

        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-indigo-600 font-bold text-white flex items-center justify-center text-xs shadow-sm">
          SA
        </div>
      </div>
    </header>
  );
}
