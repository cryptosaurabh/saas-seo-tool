"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Sliders, Play, X, Monitor, Smartphone, Zap } from "lucide-react";

export function CrawlConfigModal({ isOpen, onClose, onStart }: { isOpen: boolean; onClose: () => void; onStart: (config: any) => void }) {
  const [targetUrl, setTargetUrl] = useState("");
  const [maxPages, setMaxPages] = useState(500);
  const [maxDepth, setMaxDepth] = useState(5);
  const [crawlSpeed, setCrawlSpeed] = useState("normal");
  const [userAgentType, setUserAgentType] = useState("desktop");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart({
      target_url: targetUrl,
      max_pages: Number(maxPages),
      max_depth: Number(maxDepth),
      crawl_speed: crawlSpeed,
      user_agent_type: userAgentType
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-popover p-6 shadow-2xl glass-panel space-y-6 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base text-foreground">Configure Crawl Engine</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Target Website URL</label>
            <Input
              placeholder="https://example.com"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              icon={<Globe className="w-4 h-4" />}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Max Crawl Pages</label>
              <select
                value={maxPages}
                onChange={(e) => setMaxPages(Number(e.target.value))}
                className="w-full h-10 rounded-lg border border-input bg-background px-3 text-xs focus:outline-none text-foreground"
              >
                <option value={100}>100 Pages (Fast)</option>
                <option value={500}>500 Pages (Standard)</option>
                <option value={2000}>2,000 Pages (Deep Audit)</option>
                <option value={10000}>10,000 Pages (Enterprise)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Max Crawl Depth</label>
              <select
                value={maxDepth}
                onChange={(e) => setMaxDepth(Number(e.target.value))}
                className="w-full h-10 rounded-lg border border-input bg-background px-3 text-xs focus:outline-none text-foreground"
              >
                <option value={2}>Depth 2</option>
                <option value={5}>Depth 5 (Default)</option>
                <option value={10}>Depth 10</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">User-Agent Bot</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setUserAgentType("desktop")}
                  className={`flex-1 p-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    userAgentType === "desktop" ? "border-primary bg-primary/10 text-primary" : "border-border/60 bg-card/40 text-muted-foreground"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setUserAgentType("mobile")}
                  className={`flex-1 p-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    userAgentType === "mobile" ? "border-primary bg-primary/10 text-primary" : "border-border/60 bg-card/40 text-muted-foreground"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Crawl Speed</label>
              <select
                value={crawlSpeed}
                onChange={(e) => setCrawlSpeed(e.target.value)}
                className="w-full h-10 rounded-lg border border-input bg-background px-3 text-xs focus:outline-none text-foreground"
              >
                <option value="slow">Slow (1 req/sec)</option>
                <option value="normal">Normal (5 req/sec)</option>
                <option value="fast">Fast (20 req/sec)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="gap-2 glow-primary">
              <Play className="w-4 h-4 fill-current" /> Launch Crawler
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
