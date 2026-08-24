"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function FAQAccordion() {
  const faqItems = [
    {
      id: "faq-1",
      title: "What is SEOPilot AI?",
      content: "SEOPilot AI is an enterprise AI-powered SEO operating system designed for marketing agencies, SaaS companies, eCommerce brands, and freelancers. It automates technical audits, keyword tracking, competitor intelligence, and SERP content generation in one platform."
    },
    {
      id: "faq-2",
      title: "Is there a free trial available?",
      content: "Yes! All plans include a 14-day free trial with full access to technical audits, keyword tracking, and multi-tenant workspace management. No credit card is required to start."
    },
    {
      id: "faq-3",
      title: "How does multi-tenant isolation work?",
      content: "Every organization on SEOPilot AI gets a completely isolated database boundary. Your client data, workspaces, projects, and keywords are strictly isolated and secured with Role-Based Access Control (RBAC)."
    },
    {
      id: "faq-4",
      title: "Can I generate white-label PDF reports for clients?",
      content: "Yes! The Professional and Agency plans allow you to generate custom branded white-label PDF reports with your agency logo, color themes, and automated weekly/monthly email scheduling."
    },
    {
      id: "faq-5",
      title: "How often are keyword rankings updated?",
      content: "Keyword rank tracking updates daily across Google Desktop, Mobile, and Local Pack search results. Enterprise accounts receive real-time rank updates."
    },
    {
      id: "faq-6",
      title: "What search engines are supported?",
      content: "SEOPilot AI supports Google Desktop, Google Mobile, Google Maps Local Pack, Bing, and Youtube search indices across 150+ countries."
    },
    {
      id: "faq-7",
      title: "Can I invite my team members?",
      content: "Yes, you can invite team members and assign custom RBAC roles: Agency Owner, Business User, or Team Member."
    },
    {
      id: "faq-8",
      title: "Does SEOPilot AI integrate with Google Search Console?",
      content: "Yes, 1-click OAuth integration with Google Search Console and Google Analytics 4 is included out-of-the-box."
    },
    {
      id: "faq-9",
      title: "Are there API keys for developers?",
      content: "Yes, Professional and Agency plans include programmatic API keys with customizable scopes for custom integrations and webhooks."
    },
    {
      id: "faq-10",
      title: "Can I upgrade or downgrade my plan at any time?",
      content: "Yes, you can upgrade, downgrade, or cancel your subscription anytime directly from your Billing Settings page."
    }
  ];

  return (
    <section className="py-24 bg-background relative">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4">
          <Badge variant="default" className="glow-primary">FREQUENTLY ASKED QUESTIONS</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Got Questions? We've Got Answers.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Everything you need to know about the platform, pricing, and enterprise security.
          </p>
        </div>

        <Accordion items={faqItems} />
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-r from-primary via-indigo-600 to-purple-700 text-white shadow-2xl relative overflow-hidden text-center space-y-6 glow-primary">
          <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> GET STARTED TODAY
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Ready to Automate Your SEO & Dominate SERPs?
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Join 10,000+ marketers and agencies scaling organic traffic with SEOPilot AI. Setup takes less than 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-12 px-8 font-bold shadow-xl">
                  Start Free Trial <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-12 px-8">
                  Book Live Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
