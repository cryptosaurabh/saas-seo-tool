"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, User } from "lucide-react";

export function ContentCalendarView() {
  const [currentMonth] = useState("July 2026");

  const events = [
    { day: 28, title: "Technical SEO Crawling Best Practices", author: "Alex Mercer", status: "Scheduled" },
    { day: 30, title: "AI Keyword Clustering Masterclass", author: "Sarah Jenkins", status: "Draft" },
    { day: 31, title: "EEAT Optimization Playbook", author: "David Kim", status: "Review" }
  ];

  return (
    <div className="space-y-6 text-xs">
      <Card className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-base text-foreground">{currentMonth} Content Schedule</h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">3 Articles Scheduled</Badge>
        </div>
      </Card>

      {/* Calendar Grid */}
      <Card className="p-4 overflow-x-auto">
        <div className="grid grid-cols-7 gap-2 text-center font-bold text-[10px] text-muted-foreground uppercase pb-2 border-b border-border">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-2">
          {Array.from({ length: 31 }, (_, i) => i + 1).map((dayNum) => {
            const dayEvents = events.filter((e) => e.day === dayNum);
            return (
              <div key={dayNum} className="min-h-[85px] p-2 rounded-xl bg-accent/20 border border-border/40 flex flex-col justify-between hover:bg-accent/40 transition-colors">
                <span className="font-bold text-foreground text-[10px]">{dayNum}</span>
                {dayEvents.map((ev, idx) => (
                  <div key={idx} className="p-1.5 rounded bg-primary/10 border border-primary/20 text-left space-y-0.5">
                    <div className="font-bold text-primary text-[10px] truncate">{ev.title}</div>
                    <div className="text-[9px] text-muted-foreground flex items-center gap-1">
                      <User className="w-2.5 h-2.5" /> {ev.author}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
