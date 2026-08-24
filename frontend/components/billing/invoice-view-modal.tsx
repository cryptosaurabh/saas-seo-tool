"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Printer, CheckCircle2, Building2, Receipt } from "lucide-react";

interface InvoiceViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: {
    invoice_number: string;
    date: string;
    amount: string;
    status: string;
    subtotal?: string;
    tax?: string;
  } | null;
}

export function InvoiceViewModal({ isOpen, onClose, invoice }: InvoiceViewModalProps) {
  if (!invoice) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl bg-card border-border sm:rounded-2xl p-6 text-foreground">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <Badge variant="success" className="mb-1">TAX INVOICE</Badge>
            <DialogTitle className="text-xl font-black">{invoice.invoice_number}</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">Issued on {invoice.date}</DialogDescription>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => window.print()}>
              <Printer className="w-4 h-4 mr-1.5" /> Print
            </Button>
            <Button size="sm" onClick={() => alert("Downloading PDF Invoice...")}>
              <Download className="w-4 h-4 mr-1.5" /> Download PDF
            </Button>
          </div>
        </div>

        {/* Invoice Body */}
        <div className="space-y-6 my-4 text-xs">
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/40 rounded-xl border border-border">
            <div>
              <div className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider mb-1">Billed To</div>
              <div className="font-bold text-foreground">Acme Agency Inc.</div>
              <div className="text-muted-foreground">GSTIN: 27AABCU9603R1ZN</div>
              <div className="text-muted-foreground">San Francisco, CA, USA</div>
            </div>
            <div>
              <div className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider mb-1">Issued By</div>
              <div className="font-bold text-foreground">SEOPilot AI Inc.</div>
              <div className="text-muted-foreground">Tax ID: US-849204921</div>
              <div className="text-muted-foreground">support@seopilot.ai</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-bold uppercase text-[10px] text-muted-foreground tracking-wider">Item Details</div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-[11px]">
                  <th className="py-2 font-semibold">Description</th>
                  <th className="py-2 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-2.5 font-medium">Professional Plan Subscription (Monthly)</td>
                  <td className="py-2.5 text-right font-bold">{invoice.subtotal || invoice.amount}</td>
                </tr>
                {invoice.tax && (
                  <tr>
                    <td className="py-2.5 text-muted-foreground">GST Tax (18%)</td>
                    <td className="py-2.5 text-right font-semibold text-muted-foreground">{invoice.tax}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-baseline pt-4 border-t border-border font-bold text-sm">
            <span>Total Paid ({invoice.status})</span>
            <span className="text-primary text-base">{invoice.amount}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
