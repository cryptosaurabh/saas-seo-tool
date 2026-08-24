"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Moon, Sun, Monitor, Check } from "lucide-react";

export function AppearanceTab() {
  const [selected, setSelected] = useState("dark");

  return (
    <Card className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-base font-bold text-foreground">Interface Appearance</h2>
        <p className="text-xs text-muted-foreground">Customize how SEOPilot AI looks on your device</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { id: "dark", title: "Dark Mode", icon: Moon, desc: "Default dark SaaS glass UI" },
          { id: "light", title: "Light Mode", icon: Sun, desc: "High contrast clean layout" },
          { id: "system", title: "System Sync", icon: Monitor, desc: "Adapts to OS settings" }
        ].map((item) => {
          const Icon = item.icon;
          const isSelected = selected === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between h-32 ${
                isSelected ? "border-primary bg-primary/10 glow-primary" : "border-border bg-card/40 hover:bg-accent"
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                {isSelected && <Check className="w-4 h-4 text-primary" />}
              </div>
              <div>
                <div className="text-xs font-bold text-foreground">{item.title}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

export function NotificationsTab() {
  const [preferences, setPreferences] = useState({
    securityAlerts: true,
    weeklyDigest: true,
    billingInvoices: true,
    teamInvites: true
  });

  const toggle = (key: keyof typeof preferences) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  return (
    <Card className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-base font-bold text-foreground">Notification Preferences</h2>
        <p className="text-xs text-muted-foreground">Manage email alerts and in-app notifications</p>
      </div>

      <div className="space-y-4 divide-y divide-border text-xs">
        {[
          { key: "securityAlerts", title: "Security & Login Alerts", desc: "Get notified when a new device logs into your account" },
          { key: "billingInvoices", title: "Billing & Payment Receipts", desc: "Receive invoice receipts and plan renewal reminders" },
          { key: "weeklyDigest", title: "Weekly Executive Digest", desc: "Automated summary of project activity and team performance" },
          { key: "teamInvites", title: "Team Collaboration Alerts", desc: "Notifications when team members accept invites or make edits" }
        ].map((item) => (
          <div key={item.key} className="pt-4 first:pt-0 flex items-center justify-between">
            <div>
              <div className="font-semibold text-foreground">{item.title}</div>
              <div className="text-[10px] text-muted-foreground">{item.desc}</div>
            </div>
            <button
              onClick={() => toggle(item.key as keyof typeof preferences)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                preferences[item.key as keyof typeof preferences] ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  preferences[item.key as keyof typeof preferences] ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
