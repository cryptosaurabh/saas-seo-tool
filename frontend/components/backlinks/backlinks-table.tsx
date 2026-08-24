"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Link as LinkIcon, 
  ExternalLink, 
  Search, 
  ShieldAlert, 
  Check, 
  Download,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface BacklinkRow {
  id: string;
  source_url: string;
  target_url: string;
  source_domain: string;
  domain_authority: number;
  anchor_text: string;
  link_type: string;
  toxic_score: number;
  is_toxic: boolean;
}

export function BacklinksTable({ 
  backlinks = [], 
  onDisavow 
}: { 
  backlinks?: BacklinkRow[]; 
  onDisavow?: (domain: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const defaultBacklinks: BacklinkRow[] = backlinks.length > 0 ? backlinks : [
    { id: "1", source_url: "https://techcrunch.com/2026/top-seo-platforms", target_url: "https://acmeagency.com", source_domain: "techcrunch.com", domain_authority: 94, anchor_text: "SEOPilot AI Operating System", link_type: "follow", toxic_score: 2, is_toxic: false },
    { id: "2", source_url: "https://producthunt.com/posts/seopilot-ai", target_url: "https://acmeagency.com", source_domain: "producthunt.com", domain_authority: 90, anchor_text: "AI SEO Tool for Agencies", link_type: "nofollow", toxic_score: 1, is_toxic: false },
    { id: "3", source_url: "https://spammy-directory-xyz.net/links", target_url: "https://acmeagency.com", source_domain: "spammy-directory-xyz.net", domain_authority: 12, anchor_text: "click here cheap seo", link_type: "follow", toxic_score: 88, is_toxic: true }
  ];

  const filtered = defaultBacklinks.filter((b) => {
    const matchesSearch = b.source_url.toLowerCase().includes(query.toLowerCase()) || b.anchor_text.toLowerCase().includes(query.toLowerCase());
    const matchesType = typeFilter === "all" || b.link_type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4 text-xs">
      {/* Search & Filter Controls */}
      <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <Input
            placeholder="Search backlinks by domain, URL or anchor..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
          {["all", "follow", "nofollow"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                "px-3 py-1.5 rounded-lg font-semibold capitalize transition-all whitespace-nowrap",
                typeFilter === t
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card/40 text-muted-foreground hover:bg-accent hover:text-foreground border border-border/40"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </Card>

      {/* Backlinks Table */}
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-4 font-semibold">Source Page URL & Domain</th>
              <th className="p-4 font-semibold">Anchor Text</th>
              <th className="p-4 font-semibold">Domain Rating (DR)</th>
              <th className="p-4 font-semibold">Link Type</th>
              <th className="p-4 font-semibold">Toxicity Score</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((b) => (
              <tr key={b.id} className="hover:bg-accent/40 transition-colors">
                <td className="p-4 font-bold text-foreground">
                  <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                    <span className="truncate max-w-xs">{b.source_url}</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{b.source_domain}</div>
                </td>
                <td className="p-4 text-foreground font-medium">
                  <span className="px-2 py-1 rounded bg-accent border border-border font-mono">{b.anchor_text}</span>
                </td>
                <td className="p-4 font-bold text-indigo-400">DR {b.domain_authority}</td>
                <td className="p-4">
                  <Badge variant={b.link_type === "follow" ? "success" : "secondary"}>
                    {b.link_type}
                  </Badge>
                </td>
                <td className="p-4">
                  {b.toxic_score > 50 ? (
                    <span className="font-bold text-destructive flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> {b.toxic_score}% High Risk
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-semibold">{b.toxic_score}% Safe</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  {b.is_toxic && onDisavow && (
                    <Button size="sm" variant="danger" onClick={() => onDisavow(b.source_domain)} className="gap-1 text-[11px]">
                      <ShieldAlert className="w-3 h-3" /> Disavow
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
