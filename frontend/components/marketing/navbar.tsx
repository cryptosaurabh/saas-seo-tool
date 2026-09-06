"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "Solutions", href: "/solutions" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Documentation", href: "/docs" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-background/80 backdrop-blur-xl border-border/60 py-3 shadow-xl" : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-white/95 p-1 flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-105 transition-transform overflow-hidden">
            <img src="/logo.png" alt="PEXIS Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-foreground flex items-center gap-1.5">
            PEXIS <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-card/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-border/60 text-xs font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-full transition-colors hover:text-primary",
                  isActive ? "text-primary font-bold bg-primary/10" : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/login" className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
            Sign In
          </Link>
          <Link href="/signup">
            <Button size="sm" className="gap-2 shadow-lg glow-primary">
              Start Free Trial <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-background/95 backdrop-blur-2xl border-b border-border p-6 shadow-2xl space-y-4 animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="text-sm font-semibold text-foreground hover:text-primary py-2 border-b border-border/40"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <Link href="/login" onClick={() => setIsMobileOpen(false)}>
              <Button variant="outline" className="w-full">Sign In</Button>
            </Link>
            <Link href="/signup" onClick={() => setIsMobileOpen(false)}>
              <Button className="w-full gap-2">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
