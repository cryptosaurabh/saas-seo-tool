"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function Tooltip({ text, children, position = "top" }: { text: string; children: React.ReactNode; position?: "top" | "bottom" | "left" | "right" }) {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: "-top-8 left-1/2 -translate-x-1/2",
    bottom: "-bottom-8 left-1/2 -translate-x-1/2",
    left: "top-1/2 -left-20 -translate-y-1/2",
    right: "top-1/2 -right-20 -translate-y-1/2"
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 px-2 py-1 text-[10px] font-semibold text-white bg-slate-900 rounded-md shadow-lg whitespace-nowrap pointer-events-none animate-in fade-in duration-150",
            positions[position]
          )}
        >
          {text}
        </div>
      )}
    </div>
  );
}

export function ChartsPlaceholder({ title, type = "line" }: { title: string; type?: "line" | "bar" | "pie" }) {
  return (
    <div className="p-4 rounded-xl border border-border bg-card/60 space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-foreground">{title}</span>
        <span className="text-[10px] text-muted-foreground uppercase font-mono">{type} chart</span>
      </div>

      <div className="h-36 w-full flex items-end justify-between gap-2 pt-4 px-2 bg-accent/20 rounded-lg">
        {[40, 65, 50, 85, 70, 95, 80, 100].map((h, idx) => (
          <div key={idx} className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t transition-all" style={{ height: `${h}%` }}>
            <div className="w-full bg-primary rounded-t glow-primary" style={{ height: `${h * 0.7}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-xs text-muted-foreground">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="text-border">/</span>}
          {item.href ? (
            <a href={item.href} className="hover:text-foreground transition-colors">{item.label}</a>
          ) : (
            <span className="font-bold text-foreground">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
