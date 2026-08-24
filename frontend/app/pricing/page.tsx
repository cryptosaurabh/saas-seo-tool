"use client";

import React from "react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { PricingSection, TestimonialsCarousel } from "@/components/marketing/pricing-section";
import { FAQAccordion, CTASection } from "@/components/marketing/faq-accordion";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />
      <main className="pt-24">
        <PricingSection />
        <TestimonialsCarousel />
        <FAQAccordion />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
