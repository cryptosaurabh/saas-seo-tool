"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, ShieldCheck, Mail, Check, Github, Twitter, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 4000);
  };

  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-xl relative overflow-hidden pt-16 pb-12">
      {/* Glow background pill */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 space-y-12 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-lg glow-primary">
                S
              </div>
              <span className="font-extrabold text-base tracking-tight text-foreground flex items-center gap-1.5">
                SEOPilot AI <Sparkles className="w-4 h-4 text-primary" />
              </span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
              The AI-Powered SEO Operating System designed for agencies, enterprises, SaaS companies, and digital marketers. Automate technical audits, rank tracking, and content generation.
            </p>

            {/* Newsletter Subscription */}
            <form onSubmit={handleNewsletter} className="space-y-2 pt-2 max-w-sm">
              <label className="text-xs font-semibold text-foreground block">Subscribe to Product Updates</label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-4 h-4" />}
                  required
                />
                <Button type="submit" size="sm" className="shrink-0">
                  Subscribe
                </Button>
              </div>
              {isSubscribed && (
                <p className="text-[11px] text-emerald-500 font-medium flex items-center gap-1 animate-in fade-in">
                  <Check className="w-3.5 h-3.5" /> Subscribed successfully!
                </p>
              )}
            </form>
          </div>

          {/* Product Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-foreground uppercase tracking-wider text-[11px]">Product & Solutions</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/features" className="hover:text-foreground transition-colors">AI Technical Audits</Link></li>
              <li><Link href="/features" className="hover:text-foreground transition-colors">Keyword Research Engine</Link></li>
              <li><Link href="/features" className="hover:text-foreground transition-colors">Competitor Intelligence</Link></li>
              <li><Link href="/features" className="hover:text-foreground transition-colors">Rank Tracker</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition-colors">Enterprise Plans</Link></li>
            </ul>
          </div>

          {/* Resources & Docs */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-foreground uppercase tracking-wider text-[11px]">Resources & Docs</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/docs" className="hover:text-foreground transition-colors">Documentation Portal</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">SEO Insights Blog</Link></li>
              <li><Link href="/solutions" className="hover:text-foreground transition-colors">Agency Use Cases</Link></li>
              <li><Link href="/docs" className="hover:text-foreground transition-colors">API Reference</Link></li>
              <li><Link href="/maintenance" className="hover:text-foreground transition-colors">System Status</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-foreground uppercase tracking-wider text-[11px]">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About Our Mission</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Support</Link></li>
              <li><Link href="/about" className="hover:text-foreground transition-colors">Careers (We're Hiring)</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© 2026 SEOPilot AI Inc. All rights reserved. Enterprise SEO Operating System.</div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-emerald-500 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> All Systems Operational
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="p-1.5 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-1.5 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"><Github className="w-4 h-4" /></a>
              <a href="#" className="p-1.5 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="p-1.5 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
