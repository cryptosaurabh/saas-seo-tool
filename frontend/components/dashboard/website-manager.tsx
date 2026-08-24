"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Globe, Lock, CheckCircle2, AlertTriangle, RefreshCw, Server, Code, Plus, X } from "lucide-react";

export function WebsiteManager() {
  const [websites, setWebsites] = useState<any[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [cms, setCms] = useState("WordPress");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setWebsites([
      ...websites,
      {
        id: Date.now().toString(),
        name,
        domain,
        secondaryDomains: [],
        cms,
        hosting: "Cloudflare Pages",
        https: true,
        robotsStatus: "OK (200)",
        sitemapStatus: "OK (Valid)",
        verification: "Verified"
      }
    ]);
    setName("");
    setDomain("");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-foreground">Website Domain Manager</h2>
          <p className="text-xs text-muted-foreground">Manage primary domains, secondary aliases, SSL certificates, robots.txt, and XML sitemaps.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Add Website
        </Button>
      </Card>

      {/* Add Website Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-popover p-6 shadow-2xl glass-panel space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-foreground">Add New Monitored Website</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Website Name</label>
                <Input placeholder="e.g. My Online Store" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Primary Domain URL</label>
                <Input placeholder="https://mywebsite.com" value={domain} onChange={(e) => setDomain(e.target.value)} icon={<Globe className="w-4 h-4" />} required />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">CMS Engine</label>
                <select value={cms} onChange={(e) => setCms(e.target.value)} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-xs focus:outline-none text-foreground">
                  <option value="Next.js">Next.js / React</option>
                  <option value="WordPress">WordPress</option>
                  <option value="Shopify">Shopify</option>
                  <option value="Webflow">Webflow</option>
                  <option value="Custom HTML">Custom HTML/JS</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">Add Domain</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Website Cards Grid */}
      {websites.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground border-dashed">
          <Globe className="w-8 h-8 mx-auto mb-2 text-muted-foreground/60" />
          <div className="font-semibold text-sm text-foreground">No websites registered yet</div>
          <p className="text-xs text-muted-foreground mt-0.5">Click "+ Add Website" to start monitoring your domain.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {websites.map((w) => (
            <Card key={w.id} className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground">{w.name}</h3>
                    <a href={w.domain} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline font-mono">
                      {w.domain}
                    </a>
                  </div>
                </div>
                <Badge variant="success" className="gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {w.verification}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-border">
                <div>
                  <span className="text-muted-foreground block text-[10px]">CMS Engine</span>
                  <span className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                    <Code className="w-3.5 h-3.5 text-indigo-400" /> {w.cms}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">Hosting Provider</span>
                  <span className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                    <Server className="w-3.5 h-3.5 text-primary" /> {w.hosting}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">Robots.txt</span>
                  <span className="font-semibold text-emerald-400 mt-0.5 block">{w.robotsStatus}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">XML Sitemap</span>
                  <span className="font-semibold text-emerald-400 mt-0.5 block">{w.sitemapStatus}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
