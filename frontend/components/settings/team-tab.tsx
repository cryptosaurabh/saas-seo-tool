"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Shield, Mail, MoreVertical, Trash2, X } from "lucide-react";

export function TeamTab() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Team Member");
  const [members, setMembers] = useState([
    { id: "1", name: "Alex Mercer", email: "alex.mercer@acmeagency.com", role: "Agency Owner", status: "Active" },
    { id: "2", name: "Sarah Jenkins", email: "sarah@acmeagency.com", role: "Business User", status: "Active" },
    { id: "3", name: "David Kim", email: "david@acmeagency.com", role: "Team Member", status: "Pending" }
  ]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setMembers([
      ...members,
      { id: Date.now().toString(), name: inviteEmail.split("@")[0], email: inviteEmail, role: inviteRole, status: "Pending" }
    ]);
    setInviteEmail("");
    setIsInviteOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-foreground">Team Members & Permissions</h2>
          <p className="text-xs text-muted-foreground">Manage organization access and role-based permissions (RBAC)</p>
        </div>
        <Button onClick={() => setIsInviteOpen(true)} className="gap-2">
          <UserPlus className="w-4 h-4" /> Invite Member
        </Button>
      </Card>

      {/* Invite Modal */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-popover p-6 shadow-2xl glass-panel space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-foreground">Invite Team Member</h3>
              <button onClick={() => setIsInviteOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Email Address</label>
                <Input
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  icon={<Mail className="w-4 h-4" />}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full h-10 rounded-lg border border-input bg-background px-3 text-xs focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                >
                  <option value="Agency Owner">Agency Owner (Full Access)</option>
                  <option value="Business User">Business User (Manage Projects)</option>
                  <option value="Team Member">Team Member (View & Execute)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setIsInviteOpen(false)}>Cancel</Button>
                <Button type="submit">Send Invite</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Member Table */}
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-4 font-semibold">User</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-accent/40 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                      {m.name[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{m.name}</div>
                      <div className="text-[10px] text-muted-foreground">{m.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant={m.role === "Agency Owner" ? "default" : "secondary"}>
                    {m.role}
                  </Badge>
                </td>
                <td className="p-4">
                  <Badge variant={m.status === "Active" ? "success" : "warning"}>
                    {m.status}
                  </Badge>
                </td>
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
