"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code2, Key, Webhook, Download, Copy, Check, Terminal, Shield, Zap } from "lucide-react";

export default function DeveloperPortalPage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"explorer" | "webhooks" | "sdks">("explorer");

  const sampleApiKey = "seopilot_sec_live_9f821a4bc0912d7e";

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleApiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="default" className="glow-primary mb-1">DEVELOPER PORTAL</Badge>
          <h1 className="text-2xl font-black tracking-tight">API Documentation & Developer Hub</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Build custom integrations, register Webhooks, and access official SDKs for SEOPilot AI.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            <Download className="w-3.5 h-3.5 mr-1" /> Download OpenAPI Spec
          </Button>
          <Button size="sm" className="glow-primary text-xs font-bold">
            <Key className="w-3.5 h-3.5 mr-1" /> Generate Secret Key
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-2 text-xs">
        <Button
          size="sm"
          variant={activeTab === "explorer" ? "default" : "outline"}
          onClick={() => setActiveTab("explorer")}
        >
          <Terminal className="w-3.5 h-3.5 mr-1.5" /> API Explorer & Docs
        </Button>
        <Button
          size="sm"
          variant={activeTab === "webhooks" ? "default" : "outline"}
          onClick={() => setActiveTab("webhooks")}
        >
          <Webhook className="w-3.5 h-3.5 mr-1.5" /> Webhook Subscriptions
        </Button>
        <Button
          size="sm"
          variant={activeTab === "sdks" ? "default" : "outline"}
          onClick={() => setActiveTab("sdks")}
        >
          <Code2 className="w-3.5 h-3.5 mr-1.5" /> Official SDKs
        </Button>
      </div>

      {activeTab === "explorer" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-5 space-y-4 lg:col-span-2">
            <h3 className="font-bold text-sm text-foreground">Interactive REST API Reference</h3>
            
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-muted/40 rounded-xl border border-border space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-emerald-500">GET</Badge>
                  <span className="font-mono font-bold text-foreground">/api/v1/audit/crawl</span>
                </div>
                <p className="text-muted-foreground">Retrieve SEO audit reports, technical errors, and health scores.</p>
              </div>

              <div className="p-3 bg-muted/40 rounded-xl border border-border space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-blue-500">POST</Badge>
                  <span className="font-mono font-bold text-foreground">/api/v1/content/generate</span>
                </div>
                <p className="text-muted-foreground">Generate AI-optimized SEO articles with E-E-A-T guidelines compliance.</p>
              </div>

              <div className="p-3 bg-muted/40 rounded-xl border border-border space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-indigo-500">GET</Badge>
                  <span className="font-mono font-bold text-foreground">/api/v1/rankings</span>
                </div>
                <p className="text-muted-foreground">Fetch real-time keyword SERP rankings and position changes.</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 space-y-4">
            <h3 className="font-bold text-sm text-foreground">API Credentials</h3>
            <div className="space-y-2 text-xs">
              <label className="text-muted-foreground font-semibold">Active Secret Key</label>
              <div className="flex gap-2">
                <Input value={sampleApiKey} readOnly className="h-8 text-xs font-mono bg-muted/60" />
                <Button size="sm" variant="outline" onClick={handleCopy} className="h-8 px-2">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </Button>
              </div>
            </div>

            <div className="pt-3 border-t border-border space-y-2 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Rate Limit Allocation</span>
                <span className="font-bold text-foreground">50,000 req / mo</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[24%]" />
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "webhooks" && (
        <Card className="p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <h3 className="font-bold text-sm text-foreground">Registered Webhook Endpoints</h3>
            <Button size="sm" className="glow-primary text-xs font-bold">Register New Webhook</Button>
          </div>

          <div className="p-4 bg-muted/40 rounded-xl border border-border space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-foreground font-mono">https://api.acmeagency.com/webhooks/seopilot</span>
              <Badge variant="success">ACTIVE</Badge>
            </div>
            <div className="text-muted-foreground">Subscribed Events: audit.completed, ranking.changed, payment.completed</div>
            <div className="text-[10px] text-muted-foreground font-mono">HMAC Secret: whsec_89f021bc4a12</div>
          </div>
        </Card>
      )}

      {activeTab === "sdks" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { lang: "TypeScript / Node.js", command: "npm install @seopilot/sdk", tag: "Official" },
            { lang: "Python", command: "pip install seopilot-python-sdk", tag: "Official" },
            { lang: "PHP", command: "composer require seopilot/sdk", tag: "Official" },
            { lang: "Go", command: "go get github.com/seopilot/sdk-go", tag: "Official" }
          ].map((sdk, i) => (
            <Card key={i} className="p-4 space-y-3 flex flex-col justify-between">
              <div>
                <Badge variant="default" className="mb-1">{sdk.tag}</Badge>
                <h4 className="font-bold text-sm text-foreground">{sdk.lang}</h4>
                <div className="mt-2 p-2 bg-muted rounded font-mono text-[10px] text-primary">{sdk.command}</div>
              </div>
              <Button size="sm" variant="outline" className="w-full text-xs">View Docs</Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
