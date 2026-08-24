"use client";

import React, { useState } from "react";
import { Plus, Building2, FolderKanban, Globe, CheckSquare, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function QuickCreateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeType, setActiveType] = useState<"workspace" | "project" | "website" | "task" | "report">("project");
  const [name, setName] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreated(true);
    setTimeout(() => {
      setIsCreated(false);
      setName("");
      setTargetUrl("");
      setIsOpen(false);
    }, 1000);
  };

  const types = [
    { id: "project", label: "Project", icon: FolderKanban, desc: "New SEO project boundary" },
    { id: "website", label: "Website", icon: Globe, desc: "Add domain or URL" },
    { id: "workspace", label: "Workspace", icon: Building2, desc: "Create new tenant group" },
    { id: "task", label: "Task", icon: CheckSquare, desc: "Assign task item" },
    { id: "report", label: "Report", icon: FileText, desc: "Generate PDF report" }
  ];

  return (
    <>
      {/* Floating Create Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-13 px-5 rounded-full bg-primary text-primary-foreground shadow-2xl glow-primary flex items-center gap-2 font-bold text-xs hover:scale-105 transition-all group"
      >
        <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
        <span>Quick Create</span>
      </button>

      {/* Creation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-popover p-6 shadow-2xl glass-panel space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-foreground">Quick Action Creator</h3>
                <p className="text-xs text-muted-foreground">Select resource type to generate</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Selector Pills */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {types.map((t) => {
                const Icon = t.icon;
                const isSelected = activeType === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveType(t.id as any)}
                    className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                      isSelected ? "border-primary bg-primary/10 text-primary font-bold shadow-sm" : "border-border/60 bg-card/40 text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px]">{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Creation Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  {activeType.charAt(0).toUpperCase() + activeType.slice(1)} Name
                </label>
                <Input
                  placeholder={`e.g. My New ${activeType.slice(0, 1).toUpperCase() + activeType.slice(1)}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {(activeType === "project" || activeType === "website") && (
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Primary Domain URL</label>
                  <Input
                    placeholder="https://example.com"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isCreated ? "Created!" : `Create ${activeType}`}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
