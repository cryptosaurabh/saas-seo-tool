"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  User, 
  Send, 
  Sparkles, 
  Trash2, 
  TrendingDown, 
  KeyRound, 
  Globe,
  FileText
} from "lucide-react";

export function AIChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "assistant",
      text: "Hello! I am your **SEOPilot AI Assistant**. I have full context of your target domain across Crawls, GSC, Rank Tracking, and Backlinks.\n\nHow can I help optimize your search visibility today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    "Why traffic dropped?",
    "Which keyword should I target?",
    "Generate local SEO strategy",
    "Explain Core Web Vitals"
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { id: Date.now().toString(), sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "### 🤖 SEOPilot AI Analysis\n\nBased on real-time project metrics:\n- **Health Score**: 92/100\n- **Primary Bottleneck**: Duplicate title tags on 14 blog posts.\n- **Action**: Use AI Content Studio to rewrite meta titles with targeted primary keywords.";
      
      if (query.toLowerCase().includes("traffic")) {
        replyText = "### 📈 Traffic Drop Diagnosis\n\nOrganic traffic dipped 4.2% in GSC over the last 7 days.\n- **Primary Factor**: Keyword `ai keyword research tool` dropped from Rank #2 to #5.\n- **Resolution**: Update article intro with fresh 2026 data and request Google re-indexing.";
      } else if (query.toLowerCase().includes("keyword")) {
        replyText = "### 🎯 Recommended Keyword Target\n\nTarget `enterprise website crawler` (Search Volume: 24,500/mo, KD: 28).\n- **High Conversion Intent**: Commercial query.\n- **Next Step**: Draft a new landing page outline.";
      }

      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), sender: "assistant", text: replyText }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "1",
        sender: "assistant",
        text: "Conversation memory cleared. How can I assist you with SEO optimization?"
      }
    ]);
  };

  return (
    <Card className="p-0 overflow-hidden flex flex-col h-[600px] border-border text-xs">
      {/* Chat Header Bar */}
      <div className="p-4 border-b border-border bg-card/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground">SEOPilot AI Agent (GPT-4o / Claude 3.5 Sonnet)</h3>
            <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Full Project Context Active
            </span>
          </div>
        </div>

        <Button size="sm" variant="ghost" onClick={handleClearHistory} className="gap-1 text-muted-foreground hover:text-destructive text-[11px]">
          <Trash2 className="w-3.5 h-3.5" /> Clear Memory
        </Button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-accent/20">
        {messages.map((m) => (
          <div key={m.id} className={`flex items-start gap-3 ${m.sender === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold ${m.sender === "user" ? "bg-indigo-500 text-white" : "bg-primary/20 text-primary border border-primary/30"}`}>
              {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`p-4 rounded-2xl max-w-lg space-y-2 ${m.sender === "user" ? "bg-indigo-600 text-white shadow-md" : "bg-card border border-border text-foreground shadow-sm"}`}>
              <div className="whitespace-pre-wrap leading-relaxed">{m.text}</div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-muted-foreground text-xs italic">
            <Bot className="w-4 h-4 animate-bounce text-primary" /> SEOPilot AI is thinking...
          </div>
        )}
      </div>

      {/* Quick Suggestion Chips */}
      <div className="p-3 border-t border-border bg-card/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp)}
            className="px-3 py-1.5 rounded-lg bg-accent border border-border hover:border-primary text-muted-foreground hover:text-foreground font-semibold whitespace-nowrap transition-all"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Form Bar */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-4 border-t border-border bg-card flex items-center gap-2">
        <Input
          placeholder="Ask SEOPilot AI anything about traffic, rankings, backlinks or technical fixes..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" className="gap-2 glow-primary shrink-0">
          <Send className="w-4 h-4" /> Send
        </Button>
      </form>
    </Card>
  );
}
