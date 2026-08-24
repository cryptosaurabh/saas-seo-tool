"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, CheckCircle2, Zap, CreditCard } from "lucide-react";

interface CreditTopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newBalance: number) => void;
  currentBalance: number;
}

export function CreditTopupModal({
  isOpen,
  onClose,
  onSuccess,
  currentBalance,
}: CreditTopupModalProps) {
  const [selectedPack, setSelectedPack] = useState<number>(5000);
  const [isProcessing, setIsProcessing] = useState(false);

  const packs = [
    { credits: 1000, price: "$15", priceVal: 15, tag: "Starter Pack" },
    { credits: 5000, price: "$49", priceVal: 49, tag: "Most Popular", popular: true },
    { credits: 20000, price: "$149", priceVal: 149, tag: "Best Value" },
  ];

  const handlePurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(currentBalance + selectedPack);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-card border-border sm:rounded-2xl p-6 text-foreground">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-primary" />
            <DialogTitle className="text-xl font-bold">Top Up AI Credits</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Current balance: <span className="font-bold text-foreground">{currentBalance.toLocaleString()} credits</span>. Credits never expire.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-4">
          {packs.map((p) => (
            <div
              key={p.credits}
              onClick={() => setSelectedPack(p.credits)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                selectedPack === p.credits
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-border hover:bg-muted/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${p.popular ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base text-foreground">
                      +{p.credits.toLocaleString()} Credits
                    </span>
                    <Badge variant={p.popular ? "default" : "secondary"} className="text-[10px]">
                      {p.tag}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">Use for AI Content, Chat, and Audits</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-black text-foreground">{p.price}</div>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={handlePurchase} disabled={isProcessing} className="w-full font-bold h-11 glow-primary">
          {isProcessing ? "Processing Top-up..." : `Purchase ${selectedPack.toLocaleString()} AI Credits`}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
