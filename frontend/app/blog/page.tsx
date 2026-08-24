"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, ArrowRight, Calendar, User } from "lucide-react";

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const posts = [
    {
      slug: "how-ai-is-reshaping-technical-seo-in-2026",
      title: "How AI Agents Are Reshaping Technical SEO Audits in 2026",
      category: "AI & SEO Strategy",
      date: "Jul 24, 2026",
      author: "Alex Mercer",
      excerpt: "Discover how autonomous AI crawlers analyze JavaScript rendering, indexability traps, and Core Web Vitals in real time."
    },
    {
      slug: "mastering-multi-tenant-seo-for-marketing-agencies",
      title: "Mastering Multi-Tenant SEO Workspaces for Scaling Agencies",
      category: "Agency Growth",
      date: "Jul 18, 2026",
      author: "Sarah Jenkins",
      excerpt: "Learn how to organize 50+ client accounts with role-based permissions, automated PDF reports, and zero cross-tenant leakage."
    },
    {
      slug: "the-ultimate-guide-to-json-ld-schema-automation",
      title: "The Ultimate Guide to Automated JSON-LD Schema Generation",
      category: "Technical SEO",
      date: "Jul 10, 2026",
      author: "Elena Rostova",
      excerpt: "Step-by-step tutorial on implementing Product, FAQ, and HowTo schema code to capture rich SERP snippets."
    }
  ];

  const filtered = posts.filter(
    (p) => p.title.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />
      <main className="pt-28 space-y-12">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <Badge variant="default" className="glow-primary">SEOPILOT AI INSIGHTS</Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight">
            SEO & AI Engineering Blog
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Latest strategies, technical guides, and product announcements from our engineering team.
          </p>

          <div className="max-w-md mx-auto pt-4">
            <Input
              placeholder="Search articles & topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <Card key={post.slug} className="flex flex-col justify-between p-6 space-y-4 group hover:border-primary/50 transition-all">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
                  {post.category}
                </span>
                <h2 className="font-bold text-base text-foreground group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {post.author}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
              </div>

              <Link href={`/blog/${post.slug}`} className="text-xs font-bold text-primary hover:underline flex items-center gap-1 pt-1">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
