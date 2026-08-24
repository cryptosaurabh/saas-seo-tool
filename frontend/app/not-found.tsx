"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center relative overflow-hidden select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-md space-y-6 relative z-10">
        <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-xl glow-primary">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <Badge variant="default" className="glow-primary">ERROR 404</Badge>
          <h1 className="text-4xl font-black tracking-tight text-foreground">Page Not Found</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The page or workspace endpoint you are trying to access does not exist or has been moved.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/">
            <Button size="lg" className="gap-2 shadow-xl glow-primary">
              <ArrowLeft className="w-4 h-4" /> Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
