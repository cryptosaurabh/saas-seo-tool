"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Search, Copy, Check, X } from "lucide-react";

export function PromptLibraryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const prompts = [
    { id: "1", category: "Technical SEO", title: "Core Web Vitals LCP Optimization Prompt", prompt_text: "Analyze LCP render delays and provide step-by-step image compression and CSS deferral rules." },
    { id: "2", category: "Content Writing", title: "EEAT Authoritativeness Expansion Prompt", prompt_text: "Draft an expert author bio and citation section following Google Search Quality Rater Guidelines." },
    { id: "3", category: "Schema", title: "JSON-LD FAQ & Organization Schema Prompt", prompt_text: "Generate valid schema.org JSON-LD code for FAQ and Organization with social profiles." }
  ];

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-popover p-6 shadow-2xl glass-panel space-y-6 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base text-foreground">SEO Prompt Library Templates</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          {prompts.map((p) => (
            <div key={p.id} className="p-4 rounded-xl border border-border bg-card space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{p.category}</Badge>
                <Button size="sm" variant="ghost" onClick={() => handleCopy(p.id, p.prompt_text)} className="gap-1 text-[10px]">
                  {copiedId === p.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  {copiedId === p.id ? "Copied!" : "Copy Prompt"}
                </Button>
              </div>
              <h4 className="font-bold text-sm text-foreground">{p.title}</h4>
              <p className="text-muted-foreground font-mono text-[11px] leading-relaxed bg-accent/40 p-2 rounded border border-border">
                {p.prompt_text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end pt-2">
          <Button variant="ghost" onClick={onClose}>Close Library</Button>
        </div>
      </div>
    </div>
  );
}
