"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Search, BookOpen, Key, Layers, Terminal, Copy, Check } from "lucide-react";

export default function DocumentationPage() {
  const [query, setQuery] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const docSections = [
    { title: "Getting Started", items: ["Quickstart Guide", "Authentication", "Tenant Organization Context", "Multi-Tenant Workspaces"] },
    { title: "API Reference", items: ["Authentication & JWT Tokens", "Workspace API Endpoints", "Technical Audit Endpoints", "API Key Scopes & Webhooks"] },
    { title: "SDKs & Integrations", items: ["Google Search Console Sync", "Google Analytics 4 Setup", "Stripe & Billing Webhooks", "Python & Node.js SDKs"] }
  ];

  const codeSnippet = `curl -X GET "https://api.seopilot.ai/v1/organizations/workspaces" \\
  -H "Authorization: Bearer sp_live_secret_token_key" \\
  -H "X-Organization-ID: 123e4567-e89b-12d3-a456-426614174000"`;

  const handleCopy = (idx: number) => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />
      <main className="pt-24 flex-1 flex max-w-7xl w-full mx-auto px-6 gap-8">
        {/* Docs Sidebar Nav */}
        <aside className="hidden lg:block w-64 pt-8 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto space-y-6 select-none border-r border-border pr-6">
          <div className="font-bold text-xs text-foreground uppercase tracking-wider">Documentation</div>
          {docSections.map((sec, i) => (
            <div key={i} className="space-y-2 text-xs">
              <div className="font-bold text-foreground">{sec.title}</div>
              <ul className="space-y-1 text-muted-foreground pl-2">
                {sec.items.map((item, idx) => (
                  <li key={idx}>
                    <a href="#" className="hover:text-primary transition-colors block py-1">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Main Docs Content Area */}
        <div className="flex-1 pt-8 space-y-8 pb-16">
          <div className="space-y-4">
            <Badge variant="default" className="glow-primary">DEVELOPER & API PORTAL</Badge>
            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
              SEOPilot AI Developer Documentation
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Integrate SEOPilot AI capabilities programmatically into your agency dashboards, custom webhooks, and internal tools.
            </p>

            <div className="max-w-md pt-2">
              <Input
                placeholder="Search API docs, endpoints, guides..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
          </div>

          {/* Quickstart Code Example */}
          <Card className="p-6 space-y-4 bg-card/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground font-mono">
                <Terminal className="w-4 h-4 text-primary" /> GET /v1/organizations/workspaces
              </div>
              <button
                onClick={() => handleCopy(1)}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 p-1 rounded hover:bg-accent"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 1 ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-black/80 font-mono text-xs text-emerald-400 overflow-x-auto border border-border">
              {codeSnippet}
            </pre>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
