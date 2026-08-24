"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wrench, ShieldCheck, ArrowLeft } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center relative overflow-hidden select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-md space-y-6 relative z-10">
        <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto shadow-xl">
          <Wrench className="w-8 h-8 animate-spin duration-[5000ms]" />
        </div>

        <div className="space-y-2">
          <Badge variant="default">SYSTEM MAINTENANCE</Badge>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Scheduled System Optimization</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We are performing scheduled database upgrades to enhance multi-tenant search indexing speed. All API services will resume shortly.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-accent/40 text-xs text-emerald-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4" /> Data & Tenant Backups Verified Safe
        </div>

        <div className="pt-2">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
