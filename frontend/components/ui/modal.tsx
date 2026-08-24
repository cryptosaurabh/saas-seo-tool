"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export function Modal({ isOpen, onClose, title, children, maxWidth = "md" }: ModalProps) {
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

  const maxWidths = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl"
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className={cn(
          "w-full rounded-2xl border border-border bg-popover p-6 shadow-2xl glass-panel space-y-4 animate-in fade-in zoom-in-95",
          maxWidths[maxWidth]
        )}
      >
        <div className="flex items-center justify-between">
          {title && <h3 className="font-bold text-base text-foreground">{title}</h3>}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export function Drawer({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-md h-full bg-popover border-l border-border p-6 shadow-2xl glass-panel flex flex-col justify-between animate-in slide-in-from-right duration-300">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
            {title && <h3 className="font-bold text-base text-foreground">{title}</h3>}
            <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
