"use client";

import React from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNav } from "@/components/dashboard/topnav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
