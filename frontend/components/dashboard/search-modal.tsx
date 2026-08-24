"use client";

import React, { useState, useEffect } from "react";
import { Search, Command, Users, Settings, CreditCard, Key, ArrowRight, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { name: "Manage Team Members", href: "/dashboard/team", icon: Users, category: "Quick Action" },
    { name: "Billing & Subscriptions", href: "/dashboard/billing", icon: CreditCard, category: "Account" },
    { name: "Generate API Key", href: "/dashboard/api-keys", icon: Key, category: "Developer" },
    { name: "Security & Passwords", href: "/dashboard/settings", icon: Settings, category: "Settings" }
  ];

  const filtered = actions.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-popover shadow-2xl glass-panel overflow-hidden animate-in fade-in zoom-in-95">
        <div className="flex items-center px-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground mr-3" />
          <input
            type="text"
            placeholder="Search commands, pages, settings... (CMD+K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground text-foreground"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-2 max-h-80 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground">No matching actions found</div>
          ) : (
            filtered.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(action.href)}
                  className="w-full flex items-center justify-between p-3 rounded-xl text-xs hover:bg-accent text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{action.name}</div>
                      <div className="text-[10px] text-muted-foreground">{action.category}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-1" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
