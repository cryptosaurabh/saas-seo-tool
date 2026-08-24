"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Globe, Mail, Building, Plus, X } from "lucide-react";

export function ClientManagerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("https://");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-popover p-6 shadow-2xl glass-panel space-y-6 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base text-foreground">Onboard New Agency Client</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Client Contact Name</label>
            <Input placeholder="e.g. John Doe" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Company / Brand Name</label>
            <Input placeholder="Acme SaaS Corp" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Client Email Address</label>
            <Input placeholder="john@acme.com" value={email} onChange={(e) => setEmail(e.target.value)} icon={<Mail className="w-4 h-4" />} required />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Target Website Domain</label>
            <Input placeholder="https://acme.com" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} icon={<Globe className="w-4 h-4" />} required />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="gap-2 glow-primary">
              <Plus className="w-4 h-4" /> Onboard Client
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
