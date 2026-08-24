"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, Shield, Mail, Database, Save, CheckCircle2 } from "lucide-react";

export default function GlobalSettingsPage() {
  const [platformName, setPlatformName] = useState("SEOPilot AI");
  const [supportEmail, setSupportEmail] = useState("support@seopilot.ai");
  const [defaultAiCredits, setDefaultAiCredits] = useState("50");
  const [allowSignups, setAllowSignups] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 text-foreground max-w-3xl">
      <div>
        <Badge variant="destructive" className="mb-1">GLOBAL CONFIGURATION</Badge>
        <h1 className="text-2xl font-black tracking-tight">System Settings & Defaults</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Configure platform branding, default AI credit quotas, email dispatchers, and maintenance state.</p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Platform global settings saved successfully!</span>
        </div>
      )}

      <Card className="p-6">
        <form onSubmit={handleSave} className="space-y-5 text-xs">
          <div>
            <label className="font-bold text-foreground block mb-1">Platform Branding Name</label>
            <Input
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              className="h-9 text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-foreground block mb-1">System Support Contact Email</label>
            <Input
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="h-9 text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-foreground block mb-1">Default Free Plan Monthly AI Credits</label>
            <Input
              value={defaultAiCredits}
              onChange={(e) => setDefaultAiCredits(e.target.value)}
              className="h-9 text-xs"
            />
          </div>

          <div className="pt-2 border-t border-border space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-foreground">Allow New User Registration</div>
                <div className="text-[10px] text-muted-foreground">Permit new user signups on public landing pages.</div>
              </div>
              <input
                type="checkbox"
                checked={allowSignups}
                onChange={(e) => setAllowSignups(e.target.checked)}
                className="w-4 h-4 rounded text-primary"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-rose-400">System Maintenance Mode</div>
                <div className="text-[10px] text-muted-foreground">Display maintenance notice to non-admin users.</div>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-4 h-4 rounded text-rose-500"
              />
            </div>
          </div>

          <Button type="submit" className="glow-primary font-bold h-10 w-full text-xs">
            <Save className="w-4 h-4 mr-1.5" /> Save Global Configuration
          </Button>
        </form>
      </Card>
    </div>
  );
}
