"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Drawer({ isOpen, onClose, title, children }: DrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-md h-full bg-popover border-l border-border p-6 shadow-2xl glass-panel flex flex-col justify-between animate-in slide-in-from-right duration-300 overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
            {title && <h3 className="font-bold text-base text-foreground">{title}</h3>}
            <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
