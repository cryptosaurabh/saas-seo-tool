"use client";

import React, { useState } from "react";
import { ProfileTab } from "@/components/settings/profile-tab";
import { SecurityTab } from "@/components/settings/security-tab";
import { BillingTab } from "@/components/settings/billing-tab";
import { TeamTab } from "@/components/settings/team-tab";
import { APIKeysTab } from "@/components/settings/apikeys-tab";
import { AppearanceTab, NotificationsTab } from "@/components/settings/appearance-tab";
import { User, Shield, CreditCard, Users, KeyRound, Monitor, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security & Password", icon: Shield },
  { id: "billing", label: "Billing & Plans", icon: CreditCard },
  { id: "team", label: "Team Members", icon: Users },
  { id: "apikeys", label: "API Keys", icon: KeyRound },
  { id: "appearance", label: "Appearance", icon: Monitor },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">Organization & User Settings</h1>
        <p className="text-xs text-muted-foreground">Manage your profile, security, subscription billing, team members, and API access.</p>
      </div>

      {/* Tab Navigation Controls */}
      <div className="flex items-center gap-1 border-b border-border overflow-x-auto pb-px no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap",
                isActive
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/40"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      <div className="pt-2">
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "security" && <SecurityTab />}
        {activeTab === "billing" && <BillingTab />}
        {activeTab === "team" && <TeamTab />}
        {activeTab === "apikeys" && <APIKeysTab />}
        {activeTab === "appearance" && <AppearanceTab />}
        {activeTab === "notifications" && <NotificationsTab />}
      </div>
    </div>
  );
}
