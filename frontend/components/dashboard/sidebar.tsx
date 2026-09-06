"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Globe, 
  SearchCheck, 
  KeyRound, 
  TrendingUp, 
  Target, 
  PenTool, 
  FileText, 
  Boxes, 
  Users, 
  CreditCard, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Code2
} from "lucide-react";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
  tag?: string;
}

const mainNavigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban, badge: "3 Active" },
  { name: "Websites", href: "/dashboard/websites", icon: Globe, badge: "8 Domains" },
  { name: "SEO Audit", href: "/dashboard/audit", icon: SearchCheck, badge: "Engine" },
  { name: "Keyword Research", href: "/dashboard/keywords", icon: KeyRound, badge: "AI Engine" },
  { name: "Rank Tracker", href: "/dashboard/rankings", icon: TrendingUp, badge: "Live Tracker" },
  { name: "Competitor Analysis", href: "/dashboard/backlinks", icon: Target, badge: "Backlinks" },
  { name: "AI Content", href: "/dashboard/content", icon: PenTool, badge: "AI Writer" },
  { name: "AI SEO Agent", href: "/dashboard/ai-agent", icon: Sparkles, badge: "GPT-4o" },
  { name: "Reports", href: "/dashboard/reports", icon: FileText, badge: "New" },
  { name: "Tasks", href: "/dashboard/tasks", icon: Boxes },
  { name: "Integrations", href: "/dashboard/integrations", icon: Boxes, badge: "Connected" },
];

const systemNavigation = [
  { name: "Agency & Team", href: "/dashboard/agency", icon: Users, badge: "Agency" },
  { name: "Marketplace & Apps", href: "/dashboard/marketplace", icon: Boxes, badge: "New" },
  { name: "Developer Portal", href: "/dashboard/developer", icon: Code2, badge: "API" },
  { name: "Billing & Plans", href: "/dashboard/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help Center", href: "/dashboard/help", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("sp_access_token");
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 border-r border-border bg-card/40 backdrop-blur-xl flex flex-col justify-between h-screen sticky top-0 z-40 select-none">
      <div className="p-4 space-y-6 overflow-y-auto">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-white/95 p-1 flex items-center justify-center shadow-md border border-white/20 overflow-hidden shrink-0">
            <img src="/logo.png" alt="PEXIS Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-foreground tracking-tight flex items-center gap-1.5">
              PEXIS <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            </h1>
            <p className="text-[10px] text-muted-foreground font-medium">Scale Company OS</p>
          </div>
        </div>

        {/* Tenant Organization Switcher */}
        <WorkspaceSwitcher />

        {/* Core Navigation Links */}
        <nav className="space-y-1">
          <div className="px-2 pb-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Workspace Apps
          </div>
          {mainNavigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm glow-primary font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                )}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className={cn("w-4 h-4 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                  <span className="truncate">{item.name}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.badge && (
                    <span className={cn("px-1.5 py-0.5 rounded-md text-[9px] font-bold", isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary")}>
                      {item.badge}
                    </span>
                  )}
                  {item.tag && (
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-accent border border-border text-muted-foreground">
                      {item.tag}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* System Settings Links */}
        <nav className="space-y-1 pt-2 border-t border-border/60">
          <div className="px-2 pb-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Administration
          </div>
          {systemNavigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm glow-primary font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout & Security Footer */}
      <div className="p-4 border-t border-border bg-card/20 space-y-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out Session
        </button>

        <div className="flex items-center justify-between p-2 rounded-xl bg-accent/30 border border-border text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>RBAC Enforced</span>
          </div>
          <span className="font-mono">v1.2</span>
        </div>
      </div>
    </aside>
  );
}
