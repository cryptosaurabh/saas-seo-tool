"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/alert";
import { CrawlConfigModal } from "@/components/audit/crawl-config-modal";
import { AuditIssuesList } from "@/components/audit/audit-issues-list";
import { PageInspectorDrawer } from "@/components/audit/page-inspector-drawer";
import { 
  Play, 
  Pause, 
  XSquare, 
  RotateCw, 
  ShieldCheck, 
  AlertCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  SearchCheck,
  Zap,
  Globe
} from "lucide-react";

export default function SEOAuditDashboardPage() {
  const [isCrawlConfigOpen, setIsCrawlConfigOpen] = useState(false);
  const [isCrawling, setIsCrawling] = useState(false);
  const [hasAudited, setHasAudited] = useState(false);
  const [crawlProgress, setCrawlProgress] = useState(0);
  const [inspectedUrl, setInspectedUrl] = useState<string | null>(null);
  const [targetDomain, setTargetDomain] = useState<string>("");

  const [auditScores, setAuditScores] = useState({
    overall: 0,
    technical: 0,
    performance: 0,
    content: 0,
    accessibility: 0,
    security: 0,
    criticalCount: 0,
    highCount: 0,
    mediumCount: 0,
    lowCount: 0,
    passedChecks: 0
  });

  const handleStartCrawl = (config: any) => {
    if (config.target_url) {
      setTargetDomain(config.target_url);
    }
    setIsCrawling(true);
    setCrawlProgress(15);
    const interval = setInterval(() => {
      setCrawlProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCrawling(false);
          setHasAudited(true);
          setAuditScores({
            overall: 84,
            technical: 88,
            performance: 79,
            content: 86,
            accessibility: 95,
            security: 98,
            criticalCount: 2,
            highCount: 3,
            mediumCount: 4,
            lowCount: 2,
            passedChecks: 342
          });
          return 100;
        }
        return prev + 25;
      });
    }, 800);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="default" className="glow-primary mb-1">ENTERPRISE CRAWLER & AUDIT ENGINE</Badge>
          <h1 className="text-3xl font-black text-foreground tracking-tight">
            SEO Audit & Technical Analyzer
          </h1>
          <p className="text-xs text-muted-foreground">Automated deep crawling, HTML tag analysis, Core Web Vitals, and AI auto-fix prompts.</p>
        </div>

        <div className="flex items-center gap-2">
          {isCrawling ? (
            <Button variant="danger" size="sm" onClick={() => setIsCrawling(false)} className="gap-2">
              <Pause className="w-4 h-4" /> Pause Crawl
            </Button>
          ) : (
            <Button size="sm" onClick={() => setIsCrawlConfigOpen(true)} className="gap-2 shadow-lg glow-primary">
              <Play className="w-4 h-4 fill-current" /> New Crawl Audit
            </Button>
          )}
        </div>
      </div>

      {/* Real-time Live Crawl Progress Indicator */}
      {isCrawling && (
        <Card className="p-4 bg-gradient-to-r from-primary/10 via-card to-card border-primary/30 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-2 text-foreground">
              <RotateCw className="w-4 h-4 text-primary animate-spin" /> Crawling domain: {targetDomain || "Selected Domain"}
            </span>
            <span className="text-primary font-bold">{crawlProgress}% Complete</span>
          </div>
          <Progress value={crawlProgress} />
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Pages Crawled: {Math.floor((crawlProgress / 100) * 450)} / 450</span>
            <span>Speed: Normal (5 req/sec)</span>
          </div>
        </Card>
      )}

      {/* SEO Health Score Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="p-5 flex flex-col justify-between lg:col-span-2 bg-gradient-to-tr from-card via-card to-emerald-500/10 border-emerald-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Overall SEO Health</span>
            <Badge variant={hasAudited ? "success" : "secondary"}>
              {hasAudited ? "AUDITED" : "PENDING CRAWL"}
            </Badge>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-4xl font-black text-emerald-500">
              {hasAudited ? auditScores.overall : "--"}
            </span>
            <span className="text-sm font-bold text-muted-foreground">/ 100</span>
          </div>
          <div className="text-[10px] text-muted-foreground font-semibold">
            {hasAudited ? "+4 points score gain vs last crawl" : "Launch new crawl to calculate score"}
          </div>
        </Card>

        {[
          { label: "Technical", score: auditScores.technical, color: "text-primary" },
          { label: "Performance", score: auditScores.performance, color: "text-indigo-400" },
          { label: "Content", score: auditScores.content, color: "text-emerald-400" },
          { label: "Security", score: auditScores.security, color: "text-amber-400" }
        ].map((item, idx) => (
          <Card key={idx} className="p-4 text-center flex flex-col justify-between">
            <span className="text-xs text-muted-foreground font-semibold">{item.label}</span>
            <div className={`text-2xl font-black ${item.color} my-1`}>
              {hasAudited ? `${item.score}%` : "--"}
            </div>
            <Progress value={hasAudited ? item.score : 0} className="h-1.5" />
          </Card>
        ))}
      </div>

      {/* Issue Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-destructive/10 border-destructive/20 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-destructive">Critical Errors</div>
            <div className="text-2xl font-black text-foreground mt-0.5">{auditScores.criticalCount}</div>
          </div>
          <AlertCircle className="w-6 h-6 text-destructive" />
        </Card>

        <Card className="p-4 bg-amber-500/10 border-amber-500/20 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-amber-500">High Issues</div>
            <div className="text-2xl font-black text-foreground mt-0.5">{auditScores.highCount}</div>
          </div>
          <AlertTriangle className="w-6 h-6 text-amber-500" />
        </Card>

        <Card className="p-4 bg-blue-500/10 border-blue-500/20 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-blue-400">Medium Notices</div>
            <div className="text-2xl font-black text-foreground mt-0.5">{auditScores.mediumCount}</div>
          </div>
          <SearchCheck className="w-6 h-6 text-blue-400" />
        </Card>

        <Card className="p-4 bg-emerald-500/10 border-emerald-500/20 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-emerald-400">Passed Checks</div>
            <div className="text-2xl font-black text-foreground mt-0.5">{auditScores.passedChecks}</div>
          </div>
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
        </Card>
      </div>

      {/* Categorized Audit Issues & AI Auto-Fix List */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4">Detected SEO Audit Issues</h2>
        <AuditIssuesList targetDomain={targetDomain} onInspectPage={(url) => setInspectedUrl(url)} />
      </div>

      {/* Modals & Drawers */}
      <CrawlConfigModal
        isOpen={isCrawlConfigOpen}
        onClose={() => setIsCrawlConfigOpen(false)}
        onStart={handleStartCrawl}
      />

      <PageInspectorDrawer
        isOpen={!!inspectedUrl}
        onClose={() => setInspectedUrl(null)}
        pageUrl={inspectedUrl}
      />
    </div>
  );
}
