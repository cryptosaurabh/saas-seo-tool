"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building,
  Briefcase,
  TrendingUp,
  Activity,
  FileText,
  Flag,
  HelpCircle,
  ShieldCheck,
  Settings,
  Sparkles,
  Zap,
  Lock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Super Admin Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Organizations", href: "/admin/organizations", icon: Building },
    { name: "Agencies & Clients", href: "/admin/agencies", icon: Briefcase },
    { name: "Platform Analytics", href: "/admin/analytics", icon: TrendingUp },
    { name: "System Health & Queues", href: "/admin/health", icon: Activity },
    { name: "Error Logs & Security", href: "/admin/logs", icon: FileText },
    { name: "Feature Flags", href: "/admin/feature-flags", icon: Flag },
    { name: "Support Center", href: "/admin/support", icon: HelpCircle },
    { name: "Global Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-card/95 border-r border-border min-h-screen flex flex-col justify-between p-4 shrink-0 text-foreground">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-lg glow-primary font-black text-sm">
            SA
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-foreground">SEOPilot AI</span>
              <Badge variant="destructive" className="text-[9px] px-1 py-0 font-bold uppercase">ADMIN</Badge>
            </div>
            <p className="text-[10px] text-muted-foreground">Platform Control Console</p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground font-bold shadow-md glow-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Security Banner */}
      <div className="p-3 bg-muted/40 rounded-xl border border-border space-y-2 text-[11px]">
        <div className="flex items-center gap-1.5 font-bold text-foreground">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Root Admin Mode</span>
        </div>
        <p className="text-[10px] text-muted-foreground">All actions are logged to the security audit trail.</p>
      </div>
    </aside>
  );
}
