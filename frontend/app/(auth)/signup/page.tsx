"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Lock, User, Building2, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [orgName, setOrgName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("sp_access_token", "mock_jwt_token");
      setIsLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-purple-600 items-center justify-center text-white font-black text-2xl shadow-xl glow-primary mb-2">
            S
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Create Your SaaS Tenant</h1>
          <p className="text-xs text-muted-foreground">Start your 14-day free enterprise trial</p>
        </div>

        <Card className="space-y-4 p-6 shadow-2xl glass-panel">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Full Name</label>
              <Input
                placeholder="Alex Mercer"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                icon={<User className="w-4 h-4" />}
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Work Email</label>
              <Input
                type="email"
                placeholder="alex@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4" />}
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Organization / Agency Name</label>
              <Input
                placeholder="Acme Agency Inc"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                icon={<Building2 className="w-4 h-4" />}
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Password</label>
              <Input
                type="password"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4" />}
                required
              />
            </div>

            <Button type="submit" className="w-full h-11" isLoading={isLoading}>
              Create Organization <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
