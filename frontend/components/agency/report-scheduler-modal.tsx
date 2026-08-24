"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Mail, CheckCircle2, X } from "lucide-react";

export function ReportSchedulerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [reportType, setReportType] = useState("seo_summary");
  const [frequency, setFrequency] = useState("monthly");
  const [recipient, setRecipient] = useState("client@acme.com");
  const [isScheduled, setIsScheduled] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScheduled(true);
    setTimeout(() => {
      setIsScheduled(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-popover p-6 shadow-2xl glass-panel space-y-6 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base text-foreground">Schedule Client SEO Report</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground font-semibold"
            >
              <option value="seo_summary">Executive SEO Summary Report (PDF)</option>
              <option value="rankings">Keyword Ranking Position Movement (CSV/PDF)</option>
              <option value="backlinks">Backlink Audit & Toxicity Report (PDF)</option>
              <option value="technical_audit">Technical Crawl & PageSpeed Audit (PDF)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Delivery Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground font-semibold"
            >
              <option value="weekly">Weekly Every Monday</option>
              <option value="monthly">Monthly 1st Day</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Recipient Email Address</label>
            <Input
              placeholder="client@acme.com"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="gap-2 glow-primary" disabled={isScheduled}>
              {isScheduled ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Calendar className="w-4 h-4" />}
              {isScheduled ? "Report Scheduled!" : "Schedule Report"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
