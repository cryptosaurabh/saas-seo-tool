"use client";

import React from "react";
import { Navbar } from "@/components/marketing/navbar";
import { HeroSection } from "@/components/marketing/hero-section";
import { TrustSection } from "@/components/marketing/trust-section";
import { FeaturesGrid } from "@/components/marketing/trust-section";
import { HowItWorks, ComparisonGrid } from "@/components/marketing/how-it-works";
import { ScreenshotsSection, UseCasesGrid } from "@/components/marketing/screenshots-section";
import { PricingSection, TestimonialsCarousel } from "@/components/marketing/pricing-section";
import { FAQAccordion, CTASection } from "@/components/marketing/faq-accordion";
import { Footer } from "@/components/marketing/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main>
        <HeroSection />
        <TrustSection />
        <FeaturesGrid />
        <HowItWorks />
        <ComparisonGrid />
        <ScreenshotsSection />
        <UseCasesGrid />
        <PricingSection />
        <TestimonialsCarousel />
        <FAQAccordion />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
