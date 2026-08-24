"use client";

import React, { useState } from "react";
import { Bell, Check, Info, ShieldAlert, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Security Token Issue Resolved",
      message: "JWT Refresh token rotation updated successfully.",
      time: "5m ago",
      type: "info",
      read: false
    },
    {
      id: "2",
      title: "Team Member Joined",
      message: "Sarah Jenkins joined Acme Agency as Team Member.",
      time: "1h ago",
      type: "success",
      read: false
    },
    {
      id: "3",
      title: "Subscription Renewal Notice",
      message: "Your Professional plan renews in 7 days.",
      time: "1d ago",
      type: "warning",
      read: true
    }
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus:outline-none"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-4 ring-background animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 z-50 rounded-2xl border border-border bg-popover p-4 shadow-2xl glass-panel animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-primary/10 text-primary font-bold">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[11px] text-primary hover:underline font-medium"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-3 space-y-2 max-h-80 overflow-y-auto pr-1">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 rounded-xl border text-xs transition-colors flex items-start gap-3 ${
                  n.read ? "bg-card/40 border-border opacity-70" : "bg-accent/60 border-primary/20"
                }`}
              >
                <div className="mt-0.5 p-1.5 rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground flex items-center justify-between">
                    <span>{n.title}</span>
                    <span className="text-[10px] text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                    {n.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
