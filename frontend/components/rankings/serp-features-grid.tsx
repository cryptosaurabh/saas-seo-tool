"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, HelpCircle, Image as ImageIcon, Video, MapPin, Star } from "lucide-react";

export function SERPFeaturesGrid() {
  const features = [
    { title: "Featured Snippets", won: 14, opportunity: 6, icon: Sparkles, color: "text-amber-400" },
    { title: "People Also Ask (PAA)", won: 28, opportunity: 12, icon: HelpCircle, color: "text-primary" },
    { title: "Google Local Pack & Maps", won: 8, opportunity: 2, icon: MapPin, color: "text-emerald-400" },
    { title: "Video & Image Carousels", won: 19, opportunity: 5, icon: Video, color: "text-indigo-400" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
      {features.map((f, idx) => {
        const Icon = f.icon;
        return (
          <Card key={idx} className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-muted-foreground">{f.title}</div>
              <div className="text-2xl font-black text-foreground mt-1">{f.won} Won</div>
              <div className="text-[10px] text-emerald-500 font-semibold mt-1">
                {f.opportunity} Opportunities
              </div>
            </div>
            <div className={`p-3 rounded-2xl bg-card border border-border ${f.color}`}>
              <Icon className="w-5 h-5" />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
