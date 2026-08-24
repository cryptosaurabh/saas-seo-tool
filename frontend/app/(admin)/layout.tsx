"use client";

import React from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopnav } from "@/components/admin/admin-topnav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AdminTopnav />
        <main className="p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
