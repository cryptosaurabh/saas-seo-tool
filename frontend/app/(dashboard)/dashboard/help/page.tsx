"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, Search, BookOpen, MessageSquare, CheckCircle2 } from "lucide-react";

export default function HelpCenterPage() {
  const [query, setQuery] = useState("");
  const [ticketSent, setTicketSent] = useState(false);

  const articles = [
    { title: "How to set up multi-tenant organization workspaces", views: "1.2k views" },
    { title: "Connecting Google Search Console OAuth credentials", views: "3.4k views" },
    { title: "Generating white-label PDF reports for agency clients", views: "2.1k views" },
    { title: "Managing RBAC permissions and team roles", views: "980 views" }
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">Help Center & Knowledge Base</h1>
        <p className="text-xs text-muted-foreground">Search technical documentation or contact developer support.</p>
      </div>

      <Card className="p-6 space-y-4">
        <Input
          placeholder="Search guides, API docs, tutorials..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          icon={<Search className="w-4 h-4" />}
        />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-foreground">
            <BookOpen className="w-4 h-4 text-primary" /> Popular Help Guides
          </div>
          <ul className="space-y-2 text-xs">
            {articles.map((a, i) => (
              <li key={i} className="py-2 border-b border-border/40 last:border-0 flex items-center justify-between">
                <a href="#" className="hover:text-primary transition-colors text-foreground">{a.title}</a>
                <span className="text-[10px] text-muted-foreground">{a.views}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-foreground">
            <MessageSquare className="w-4 h-4 text-emerald-500" /> Submit Support Ticket
          </div>
          <p className="text-xs text-muted-foreground">Dedicated 24/7 technical support for Enterprise and Agency accounts.</p>
          <Button
            onClick={() => {
              setTicketSent(true);
              setTimeout(() => setTicketSent(false), 3000);
            }}
            className="w-full"
          >
            {ticketSent ? "Ticket Submitted!" : "Open Support Ticket"}
          </Button>
        </Card>
      </div>
    </div>
  );
}
