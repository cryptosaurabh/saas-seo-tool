"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { KeyRound, Plus, Copy, Check, Trash2, ShieldAlert, X } from "lucide-react";

export function APIKeysTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [createdSecret, setCreatedSecret] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [keys, setKeys] = useState([
    { id: "1", name: "Production Webhook Key", prefix: "sp_live_9a82", created: "Jul 10, 2026", lastUsed: "2 mins ago" },
    { id: "2", name: "Staging Pipeline", prefix: "sp_test_1f4c", created: "Jun 15, 2026", lastUsed: "3 days ago" }
  ]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const secret = `sp_secret_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`;
    setCreatedSecret(secret);
    setKeys([
      ...keys,
      { id: Date.now().toString(), name: keyName, prefix: secret.substring(0, 12), created: "Just now", lastUsed: "Never" }
    ]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(createdSecret);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-foreground">API Keys & Tokens</h2>
          <p className="text-xs text-muted-foreground">Programmatic API keys for external integrations and webhooks</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Create API Key
        </Button>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-popover p-6 shadow-2xl glass-panel space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-foreground">Generate New API Key</h3>
              <button onClick={() => { setIsModalOpen(false); setCreatedSecret(""); }} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            {!createdSecret ? (
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Key Name / Description</label>
                  <Input
                    placeholder="e.g. CI/CD Integration"
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button type="submit">Generate Secret</Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Copy this key immediately! It will never be displayed again.</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl border border-border bg-accent font-mono text-xs text-foreground">
                  <span className="truncate flex-1">{createdSecret}</span>
                  <Button size="sm" variant="ghost" onClick={copyToClipboard}>
                    {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <Button className="w-full" onClick={() => { setIsModalOpen(false); setCreatedSecret(""); }}>
                  Done
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Keys List */}
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Key Prefix</th>
              <th className="p-4 font-semibold">Created</th>
              <th className="p-4 font-semibold">Last Used</th>
              <th className="p-4 font-semibold text-right">Revoke</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {keys.map((k) => (
              <tr key={k.id} className="hover:bg-accent/40 transition-colors">
                <td className="p-4 font-semibold text-foreground">{k.name}</td>
                <td className="p-4 font-mono text-muted-foreground">{k.prefix}...</td>
                <td className="p-4 text-muted-foreground">{k.created}</td>
                <td className="p-4 text-muted-foreground">{k.lastUsed}</td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
