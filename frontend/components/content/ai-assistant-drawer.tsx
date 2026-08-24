"use client";

import React, { useState } from "react";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Bot, Sparkles, Wand2, Send, Copy, Check } from "lucide-react";

export function AIAssistantDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    { sender: "ai", text: "Hello! I am your AI SEO Writing Assistant. Ask me to generate headlines, improve paragraphs, or optimize meta tags." }
  ]);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMsg = prompt;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setPrompt("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Here is an AI-optimized response for: "${userMsg}"\n\n**Recommendation**: Incorporate entity semantic terms and structure your H2 subheadings to match user search intent.`
        }
      ]);
    }, 600);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="AI Content & Writing Assistant">
      <div className="space-y-4 text-xs h-[520px] flex flex-col justify-between">
        {/* Chat History */}
        <div className="space-y-3 overflow-y-auto pr-1 flex-1">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border space-y-1 ${
                m.sender === "user"
                  ? "bg-primary/10 border-primary/20 text-foreground ml-6"
                  : "bg-card border-border text-foreground mr-6"
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-[10px] text-muted-foreground uppercase">
                {m.sender === "ai" ? (
                  <>
                    <Bot className="w-3.5 h-3.5 text-primary" /> SEOPilot Assistant
                  </>
                ) : (
                  "You"
                )}
              </div>
              <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="flex items-center gap-2 pt-2 border-t border-border">
          <Input
            placeholder="Ask AI to rephrase, generate titles, or write intro..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button type="submit" size="icon" className="shrink-0 glow-primary">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Drawer>
  );
}
