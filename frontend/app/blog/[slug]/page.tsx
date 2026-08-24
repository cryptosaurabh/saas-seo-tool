"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";

export default function BlogArticlePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />
      <main className="pt-28 space-y-12">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </Link>

          <Badge variant="default" className="glow-primary">AI & SEO STRATEGY</Badge>

          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
            How AI Agents Are Reshaping Technical SEO Audits in 2026
          </h1>

          <div className="flex items-center gap-6 text-xs text-muted-foreground border-y border-border py-3">
            <span className="flex items-center gap-1.5 font-semibold text-foreground"><User className="w-4 h-4 text-primary" /> Alex Mercer</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Published July 24, 2026</span>
            <span>6 min read</span>
          </div>

          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-muted-foreground space-y-6 leading-relaxed">
            <p>
              Traditional SEO crawlers have long relied on static HTML analysis to report broken links and missing meta tags. However, as web applications transition toward JavaScript-heavy frameworks (Next.js, React 19, Single Page Apps), traditional crawlers leave massive indexing blind spots.
            </p>

            <h2 className="text-xl font-bold text-foreground pt-4">The Shift to Autonomous AI Crawling</h2>
            <p>
              SEOPilot AI introduces real-time browser rendering engines powered by LLM agents. Instead of simply checking status codes, our crawler executes full client-side JavaScript, validates dynamic canonical URLs, and computes real-time Core Web Vitals (LCP, CLS, FID) directly from Google SERP ranking models.
            </p>

            <Card className="p-6 bg-accent/40 border-primary/30 space-y-2 my-6">
              <h3 className="font-bold text-sm text-foreground">Key Takeaway for Marketing Agencies:</h3>
              <p className="text-xs text-muted-foreground">
                Automating technical audit reporting allows your agency team to focus on strategic execution and client revenue growth rather than spending hours manually building spreadsheets.
              </p>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
