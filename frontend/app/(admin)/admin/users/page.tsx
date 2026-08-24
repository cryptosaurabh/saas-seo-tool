"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Users,
  Search,
  MoreVertical,
  Shield,
  UserCheck,
  UserX,
  KeyRound,
  LogOut,
  MailCheck,
  Plus
} from "lucide-react";

export default function UserManagementPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [users, setUsers] = useState([
    { id: "usr_101", name: "Alex Morgan", email: "alex@seopilot.ai", role: "SuperAdmin", status: "Active", created: "Jan 12, 2026", org: "SEOPilot Core" },
    { id: "usr_102", name: "Marcus Vance", email: "marcus@apexmedia.com", role: "Agency Owner", status: "Active", created: "Feb 04, 2026", org: "Apex Media Agency" },
    { id: "usr_103", name: "Elena Rostova", email: "elena@cloudscale.io", role: "Business Admin", status: "Active", created: "Mar 15, 2026", org: "CloudScale SaaS" },
    { id: "usr_104", name: "David Chen", email: "david@ecomboost.com", role: "Team Member", status: "Suspended", created: "Apr 20, 2026", org: "EcomBoost Inc." },
    { id: "usr_105", name: "Sarah Jenkins", email: "sarah@digitalboost.io", role: "Agency Owner", status: "Active", created: "May 10, 2026", org: "Digital Boost" },
  ]);

  const handleStatusToggle = (userId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        return { ...u, status: u.status === "Active" ? "Suspended" : "Active" };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-6 text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="destructive" className="mb-1">USER MANAGEMENT</Badge>
          <h1 className="text-2xl font-black tracking-tight">Platform Users & Roles</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Manage platform user accounts, assign global roles, suspend or activate accounts.</p>
        </div>

        <Button size="sm" className="glow-primary text-xs font-bold">
          <Plus className="w-4 h-4 mr-1" /> Create User
        </Button>
      </div>

      <Card className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search by name, email, org..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-semibold">Filter Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-9 px-3 rounded-md bg-muted border border-border text-xs text-foreground font-medium"
            >
              <option value="all">All Roles</option>
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="Agency Owner">Agency Owner</option>
              <option value="Business Admin">Business Admin</option>
              <option value="Team Member">Team Member</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-[11px] uppercase tracking-wider">
                <th className="py-3 px-2 font-bold">User</th>
                <th className="py-3 px-2 font-bold">Role</th>
                <th className="py-3 px-2 font-bold">Organization</th>
                <th className="py-3 px-2 font-bold">Status</th>
                <th className="py-3 px-2 font-bold">Joined Date</th>
                <th className="py-3 px-2 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-2 font-medium">
                    <div className="font-bold text-foreground">{u.name}</div>
                    <div className="text-[10px] text-muted-foreground">{u.email}</div>
                  </td>
                  <td className="py-3 px-2">
                    <Badge variant={u.role === "SuperAdmin" ? "destructive" : "secondary"}>
                      {u.role}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-muted-foreground font-medium">{u.org}</td>
                  <td className="py-3 px-2">
                    <Badge variant={u.status === "Active" ? "success" : "secondary"}>
                      {u.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-muted-foreground">{u.created}</td>
                  <td className="py-3 px-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStatusToggle(u.id)}
                        className={`h-7 px-2 text-[10px] ${u.status === "Active" ? "text-rose-400 hover:text-rose-500" : "text-emerald-400 hover:text-emerald-500"}`}
                      >
                        {u.status === "Active" ? <UserX className="w-3.5 h-3.5 mr-1" /> : <UserCheck className="w-3.5 h-3.5 mr-1" />}
                        {u.status === "Active" ? "Suspend" : "Activate"}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => alert(`Password reset email sent to ${u.email}`)}
                        className="h-7 px-2 text-[10px] text-muted-foreground"
                      >
                        <KeyRound className="w-3.5 h-3.5 mr-1" /> Reset
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
