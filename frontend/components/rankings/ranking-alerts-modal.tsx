"use client";

import React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Bell, TrendingUp, TrendingDown, ShieldAlert, CheckCircle2, X } from "lucide-react";

export function RankingAlertsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const alerts = [
    { id: "1", type: "top_3_entered", title: "Rank #1 Achievement", message: "Keyword 'seo audit software' entered Rank #1 on Google Desktop!", time: "10 mins ago", isPositive: true },
    { id: "2", type: "position_drop", title: "Ranking Position Drop", message: "Keyword 'ai keyword research tool' dropped 3 positions to Rank #5.", time: "2 hours ago", isPositive: false },
    { id: "3", type: "top_10_entered", title: "Top 10 Position Reached", message: "Keyword 'technical seo crawler' entered Top 3 on Google Mobile!", time: "5 hours ago", isPositive: true }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-popover p-6 shadow-2xl glass-panel space-y-6 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base text-foreground">Live Ranking Movement Alerts</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          {alerts.map((a) => (
            <div key={a.id} className={`p-4 rounded-xl border space-y-1 ${a.isPositive ? "bg-emerald-500/10 border-emerald-500/20" : "bg-destructive/10 border-destructive/20"}`}>
              <div className="flex items-center justify-between">
                <span className={`font-bold ${a.isPositive ? "text-emerald-400" : "text-destructive"}`}>{a.title}</span>
                <span className="text-[10px] text-muted-foreground">{a.time}</span>
              </div>
              <p className="text-foreground">{a.message}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end pt-2">
          <Button variant="ghost" onClick={onClose}>Close Alerts</Button>
        </div>
      </div>
    </div>
  );
}
