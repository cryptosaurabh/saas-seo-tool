"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { User, Mail, Upload, CheckCircle2 } from "lucide-react";

export function ProfileTab() {
  const [fullName, setFullName] = useState("Alex Mercer");
  const [email] = useState("alex.mercer@acmeagency.com");
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 600);
  };

  return (
    <Card className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-base font-bold text-foreground">Personal Details</h2>
        <p className="text-xs text-muted-foreground">Manage your personal information and avatar</p>
      </div>

      {/* Avatar Upload Section */}
      <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-accent/30">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white font-black text-xl ring-4 ring-primary/20">
          A
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="gap-2">
              <Upload className="w-3.5 h-3.5" /> Upload Photo
            </Button>
            <Button size="sm" variant="ghost">Remove</Button>
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground">Recommended JPG, PNG or WebP under 2MB.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-foreground mb-1 block">Full Name</label>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            icon={<User className="w-4 h-4" />}
            required
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground mb-1 block">Email Address</label>
          <Input
            value={email}
            disabled
            icon={<Mail className="w-4 h-4" />}
          />
          <p className="mt-1 text-[10px] text-muted-foreground">Email changes require re-verification.</p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" isLoading={isLoading}>
            Save Changes
          </Button>
          {isSaved && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" /> Profile updated successfully
            </span>
          )}
        </div>
      </form>
    </Card>
  );
}
