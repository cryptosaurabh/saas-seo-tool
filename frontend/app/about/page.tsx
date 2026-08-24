"use client";

import React from "react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CTASection } from "@/components/marketing/faq-accordion";
import { Target, Eye, ShieldCheck, Heart, Users, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />
      <main className="pt-28 space-y-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <Badge variant="default" className="glow-primary">ABOUT OUR MISSION</Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight">
            Democratizing Enterprise SEO Automation
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We are building the AI operating system that empowers agencies, brands, and creators to achieve sustainable organic growth.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 space-y-4 bg-card/60">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary w-fit">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Our Mission</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              To eliminate tedious manual CSV exports and repetitive SEO tasks through autonomous AI agents and real-time SERP intelligence.
            </p>
          </Card>

          <Card className="p-8 space-y-4 bg-card/60">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 w-fit">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Our Vision</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              To become the world's most trusted, multi-tenant AI operating system for search engine optimization and digital marketing analytics.
            </p>
          </Card>
        </div>

        {/* Leadership Team Placeholders */}
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Leadership & Engineers</h2>
            <p className="text-xs text-muted-foreground">The team behind SEOPilot AI OS</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Alex Mercer", role: "CEO & Co-Founder", bio: "Former Head of SEO & Product Lead" },
              { name: "Elena Rostova", role: "CTO & AI Architect", bio: "Ex-Google AI Research Engineer" },
              { name: "David Kim", role: "VP of Engineering", bio: "Distributed Systems & FastAPI Lead" },
              { name: "Sarah Jenkins", role: "Head of Product UX", bio: "Design System & Frontend Architect" }
            ].map((member, i) => (
              <Card key={i} className="p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-purple-600 mx-auto flex items-center justify-center font-bold text-white text-xl">
                  {member.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground">{member.name}</h3>
                  <div className="text-xs text-primary font-medium">{member.role}</div>
                  <p className="text-[10px] text-muted-foreground mt-2">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
