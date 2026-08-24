"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { KeyRound, Shield, Lock, Smartphone, CheckCircle2 } from "lucide-react";

export function SecurityTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMessage("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Change Password Card */}
      <Card className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-foreground">Change Password</h2>
          <p className="text-xs text-muted-foreground">Ensure your account uses a strong, unique password</p>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Current Password</label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">New Password</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              icon={<KeyRound className="w-4 h-4" />}
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Confirm New Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<KeyRound className="w-4 h-4" />}
              required
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" isLoading={isLoading}>
              Update Password
            </Button>
            {message && (
              <span className="text-xs font-medium text-emerald-500 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> {message}
              </span>
            )}
          </div>
        </form>
      </Card>

      {/* Two-Factor Authentication Card */}
      <Card className="flex items-center justify-between">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary mt-1">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Two-Factor Authentication (2FA)</h3>
            <p className="text-xs text-muted-foreground">Add an extra layer of security using an authenticator app (TOTP)</p>
          </div>
        </div>
        <Button variant="outline" size="sm">Enable 2FA</Button>
      </Card>
    </div>
  );
}
