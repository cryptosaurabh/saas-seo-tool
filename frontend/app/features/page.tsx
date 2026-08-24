"use client";

import React from "react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { FeaturesGrid } from "@/components/marketing/trust-section";
import { ScreenshotsSection } from "@/components/marketing/screenshots-section";
import { CTASection } from "@/components/marketing/faq-accordion";
import { Badge } from "@/components/ui/badge";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />
      <main className="pt-28">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4 py-12">
          <Badge variant="default" className="glow-primary">FEATURE SUITE</Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight">
            Complete AI SEO Capabilities
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore the powerful modules engineered to automate technical audits, keyword research, competitor intelligence, and organic search growth.
          </p>
        </div>

        <FeaturesGrid />
        <ScreenshotsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
