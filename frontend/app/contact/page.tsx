"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />
      <main className="pt-28 space-y-16">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <Badge variant="default" className="glow-primary">24/7 SUPPORT & SALES</Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight">
            We'd Love to Hear From You
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have questions about enterprise custom plans, API access, or agency white-label reports? Reach out to our technical team.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Information & Map Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 space-y-4">
              <h2 className="font-bold text-base text-foreground">Direct Contacts</h2>
              
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span>support@seopilot.ai</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>+1 (800) 555-SEOPILOT</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>500 Howard Street, San Francisco, CA 94105</span>
                </div>
              </div>
            </Card>

            {/* Interactive Map Placeholder Graphic */}
            <Card className="p-6 h-64 flex flex-col items-center justify-center text-center space-y-2 bg-accent/30 border-dashed border-border">
              <MapPin className="w-8 h-8 text-primary animate-bounce" />
              <div className="font-bold text-sm text-foreground">San Francisco Headquarters Map</div>
              <p className="text-[10px] text-muted-foreground">Global Engineering & Product Hub</p>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-7 p-8 space-y-6">
            <div>
              <h2 className="font-bold text-base text-foreground">Send Us a Message</h2>
              <p className="text-xs text-muted-foreground">Our team responds within 2 hours during business operations.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Your Name</label>
                <Input
                  placeholder="Alex Mercer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Work Email</label>
                <Input
                  type="email"
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-4 h-4" />}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we help your agency or business grow?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background p-3 text-xs focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                  required
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <Button type="submit" className="gap-2">
                  Send Message <Send className="w-4 h-4" />
                </Button>
                {isSent && (
                  <span className="text-xs font-medium text-emerald-500 flex items-center gap-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4" /> Message sent successfully!
                  </span>
                )}
              </div>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
