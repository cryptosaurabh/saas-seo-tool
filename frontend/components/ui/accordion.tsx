"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemProps {
  id: string;
  title: string;
  content: React.ReactNode;
}

export function Accordion({ items, allowMultiple = false }: { items: AccordionItemProps[]; allowMultiple?: boolean }) {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || ""]);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds(openIds.includes(id) ? openIds.filter((item) => item !== id) : [...openIds, id]);
    } else {
      setOpenIds(openIds.includes(id) ? [] : [id]);
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className="rounded-2xl border border-border bg-card/40 glass-panel overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm text-foreground hover:bg-accent/40 transition-colors"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn("w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0 ml-4", isOpen && "rotate-180 text-primary")}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-xs text-muted-foreground leading-relaxed animate-in fade-in duration-200 border-t border-border/40 pt-3">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
