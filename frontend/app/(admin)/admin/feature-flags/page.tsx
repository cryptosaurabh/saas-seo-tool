"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flag, Plus, CheckCircle2, XCircle, Sliders } from "lucide-react";

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState([
    { key: "beta_ai_writer_v2", name: "AI Content Writer V2 (GPT-4o)", category: "AI Features", is_enabled: true, rollout: 100 },
    { key: "enterprise_sso", name: "Enterprise Okta & SAML SSO", category: "Enterprise", is_enabled: true, rollout: 100 },
    { key: "realtime_serp_tracker", name: "Real-time Daily SERP Monitoring", category: "Modules", is_enabled: true, rollout: 50 },
    { key: "custom_webhooks", name: "Outgoing Custom Webhooks", category: "Modules", is_enabled: false, rollout: 0 },
  ]);

  const toggleFlag = (key: string) => {
    setFlags(flags.map(f => f.key === key ? { ...f, is_enabled: !f.is_enabled } : f));
  };

  return (
    <div className="space-y-6 text-foreground">
      <div className="flex justify-between items-center">
        <div>
          <Badge variant="destructive" className="mb-1">PLATFORM CONTROLS</Badge>
          <h1 className="text-2xl font-black tracking-tight">Feature Flags & Beta Modules</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Enable, disable, or gradually rollout platform features without code deployments.</p>
        </div>

        <Button size="sm" className="glow-primary text-xs font-bold">
          <Plus className="w-4 h-4 mr-1" /> New Feature Flag
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {flags.map((f) => (
          <Card key={f.key} className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{f.category}</Badge>
                <h3 className="font-bold text-sm text-foreground">{f.name}</h3>
                <span className="font-mono text-[10px] text-muted-foreground">({f.key})</span>
              </div>
              <p className="text-xs text-muted-foreground">Target Rollout: <span className="font-bold text-foreground">{f.rollout}% of users</span></p>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant={f.is_enabled ? "success" : "secondary"}>
                {f.is_enabled ? "ENABLED" : "DISABLED"}
              </Badge>
              <Button
                size="sm"
                variant={f.is_enabled ? "outline" : "default"}
                onClick={() => toggleFlag(f.key)}
                className="text-xs font-bold"
              >
                {f.is_enabled ? "Disable Feature" : "Enable Feature"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
