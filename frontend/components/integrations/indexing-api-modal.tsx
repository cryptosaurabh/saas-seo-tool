"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Globe, Send, CheckCircle2, X } from "lucide-react";

export function IndexingAPIModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [url, setUrl] = useState("https://acmeagency.com/blog/new-article");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-popover p-6 shadow-2xl glass-panel space-y-6 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base text-foreground">Google Instant Indexing API</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">URL to Submit for Instant Crawling</label>
            <Input
              placeholder="https://example.com/new-page"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              icon={<Globe className="w-4 h-4" />}
              required
            />
          </div>

          <div className="p-3 rounded-xl bg-accent/30 border border-border text-muted-foreground leading-relaxed">
            Submitting a URL triggers Google's indexing bot to crawl and update the SERP snippet within minutes.
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="gap-2 glow-primary" disabled={isSubmitted}>
              {isSubmitted ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Send className="w-4 h-4" />}
              {isSubmitted ? "Submitted to Google!" : "Submit URL Now"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
