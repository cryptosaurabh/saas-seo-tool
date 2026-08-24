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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, RotateCcw } from "lucide-react";

interface RefundRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RefundRequestModal({ isOpen, onClose }: RefundRequestModalProps) {
  const [transactionId, setTransactionId] = useState("INV-2026-001");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-card border-border sm:rounded-2xl p-6 text-foreground">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-2 mb-1">
            <RotateCcw className="w-5 h-5 text-primary" />
            <DialogTitle className="text-xl font-bold">Request a Refund</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Refunds are processed in accordance with our 14-day money-back guarantee policy.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold">Refund Request Submitted</h3>
            <p className="text-xs text-muted-foreground">
              Our billing team will review transaction <span className="font-semibold text-foreground">{transactionId}</span> and issue the refund to your original payment method.
            </p>
            <Button size="sm" className="mt-2" onClick={() => { setSubmitted(false); onClose(); }}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 my-2">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Transaction / Invoice ID</label>
              <Input
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                required
                className="h-9 text-xs bg-muted/40"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Reason for Refund</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please describe why you are requesting a refund..."
                required
                rows={3}
                className="w-full rounded-md border border-input bg-muted/40 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full font-bold h-10">
              {isSubmitting ? "Submitting Request..." : "Submit Refund Request"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
