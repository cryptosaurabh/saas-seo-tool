"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClientManagerModal } from "@/components/agency/client-manager-modal";
import { WhiteLabelSettingsPanel } from "@/components/agency/whitelabel-settings-panel";
import { TeamPermissionsPanel } from "@/components/agency/team-permissions-panel";
import { ReportSchedulerModal } from "@/components/agency/report-scheduler-modal";
import { 
  Building, 
  Users, 
  Palette, 
  FileText, 
  Calendar, 
  Plus, 
  Globe, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AgencyPortalDashboardPage() {
  const [activeTab, setActiveTab] = useState<"clients" | "whitelabel" | "team">("clients");
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const clients = [
    { id: "1", client_name: "Acme SaaS Corp", company_name: "Acme Inc", email: "contact@acme.com", website_url: "https://acme.com", industry: "SaaS", seo_score: 94, status: "active" },
    { id: "2", client_name: "Apex Digital Agency", company_name: "Apex Group", email: "hello@apex.io", website_url: "https://apex.io", industry: "Marketing", seo_score: 88, status: "active" }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="default" className="glow-primary mb-1">ENTERPRISE AGENCY PORTAL & WHITE LABEL</Badge>
          <h1 className="text-3xl font-black text-foreground tracking-tight">
            Agency Management & Client Portal
          </h1>
          <p className="text-xs text-muted-foreground">Manage unlimited client portals, custom white-label branding, automated report schedules, and team permission roles.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => setIsScheduleModalOpen(true)} className="gap-2">
            <Calendar className="w-4 h-4 text-primary" /> Schedule Client Report
          </Button>
          <Button size="sm" onClick={() => setIsClientModalOpen(true)} className="gap-2 shadow-lg glow-primary">
            <Plus className="w-4 h-4" /> Onboard New Client
          </Button>
        </div>
      </div>

      {/* Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center justify-between bg-gradient-to-tr from-card via-card to-primary/10 border-primary/20">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Total Onboarded Clients</div>
            <div className="text-3xl font-black text-foreground mt-1">{clients.length} Clients</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">100% Client Retention</div>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <Building className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Active Client Projects</div>
            <div className="text-3xl font-black text-foreground mt-1">28 Domains</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">Real-time GSC & GA4 Sync</div>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Globe className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Monthly Reports Sent</div>
            <div className="text-3xl font-black text-emerald-400 mt-1">42 Reports</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">Automated PDF/CSV</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <FileText className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Agency Team Members</div>
            <div className="text-3xl font-black text-foreground mt-1">8 Members</div>
            <div className="text-[10px] text-emerald-500 font-semibold mt-1">Granular Role Permissions</div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Users className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Main Tabs Navigation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          {[
            { id: "clients", label: "Agency Client Portals", icon: Building },
            { id: "whitelabel", label: "White Label Branding & Domain", icon: Palette },
            { id: "team", label: "Team Members & Permissions", icon: Users }
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm glow-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Panels */}
        {activeTab === "clients" && (
          <Card className="p-0 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4 font-semibold">Client & Company Name</th>
                  <th className="p-4 font-semibold">Website Domain</th>
                  <th className="p-4 font-semibold">Industry</th>
                  <th className="p-4 font-semibold">SEO Health Score</th>
                  <th className="p-4 font-semibold text-right">Client Portal Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {clients.map((c) => (
                  <tr key={c.id} className="hover:bg-accent/40 transition-colors">
                    <td className="p-4 font-bold text-foreground">
                      <div>{c.client_name}</div>
                      <div className="text-[10px] text-muted-foreground font-mono">{c.company_name}</div>
                    </td>
                    <td className="p-4 font-mono font-medium text-primary hover:underline cursor-pointer">{c.website_url}</td>
                    <td className="p-4">{c.industry}</td>
                    <td className="p-4 font-black text-emerald-400">{c.seo_score} / 100</td>
                    <td className="p-4 text-right">
                      <Button size="sm" variant="outline" className="gap-1 text-[11px]">
                        <ExternalLink className="w-3.5 h-3.5 text-primary" /> View Dedicated Dashboard
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {activeTab === "whitelabel" && (
          <WhiteLabelSettingsPanel />
        )}

        {activeTab === "team" && (
          <TeamPermissionsPanel />
        )}
      </div>

      {/* Client Onboarding Modal */}
      <ClientManagerModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
      />

      {/* Report Scheduler Modal */}
      <ReportSchedulerModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
    </div>
  );
}
