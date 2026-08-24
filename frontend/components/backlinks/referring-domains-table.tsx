"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, ShieldCheck, Server } from "lucide-react";

export function ReferringDomainsTable() {
  const domains = [
    { domain_name: "techcrunch.com", country_code: "US", ip_address: "192.0.2.1", domain_authority: 94, spam_score: 1, backlinks_count: 24 },
    { domain_name: "producthunt.com", country_code: "US", ip_address: "198.51.100.4", domain_authority: 90, spam_score: 2, backlinks_count: 18 },
    { domain_name: "venturebeat.com", country_code: "US", ip_address: "203.0.113.8", domain_authority: 91, spam_score: 1, backlinks_count: 12 }
  ];

  return (
    <Card className="p-0 overflow-hidden text-xs">
      <table className="w-full text-left">
        <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
          <tr>
            <th className="p-4 font-semibold">Referring Root Domain</th>
            <th className="p-4 font-semibold">Country & IP</th>
            <th className="p-4 font-semibold">Domain Rating (DR)</th>
            <th className="p-4 font-semibold">Spam Score</th>
            <th className="p-4 font-semibold text-right">Backlinks Count</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {domains.map((d, i) => (
            <tr key={i} className="hover:bg-accent/40 transition-colors">
              <td className="p-4 font-bold text-foreground flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" /> {d.domain_name}
              </td>
              <td className="p-4 text-muted-foreground font-mono">
                {d.country_code} • {d.ip_address}
              </td>
              <td className="p-4 font-bold text-indigo-400">DR {d.domain_authority}</td>
              <td className="p-4 font-semibold text-emerald-400">{d.spam_score}% Spam</td>
              <td className="p-4 text-right font-bold text-foreground">{d.backlinks_count} links</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
