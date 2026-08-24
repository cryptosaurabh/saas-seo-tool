import React from "react";
import Link from "next/link";
import { Button } from "./button";
import { Badge } from "./badge";
import { AlertCircle, ArrowLeft } from "lucide-react";

export function NotFoundState({
  title = "404 - Page Not Found",
  description = "The page or workspace endpoint you are looking for does not exist.",
  homeHref = "/"
}: {
  title?: string;
  description?: string;
  homeHref?: string;
}) {
  return (
    <div className="p-12 text-center rounded-3xl border border-border bg-card/40 glass-panel space-y-6 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-xl glow-primary">
        <AlertCircle className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <Badge variant="default" className="glow-primary">404 ERROR</Badge>
        <h2 className="text-2xl font-black text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <Link href={homeHref}>
        <Button size="md" className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Return to Home
        </Button>
      </Link>
    </div>
  );
}

export function MaintenanceState({
  title = "System Maintenance",
  description = "We are performing scheduled database upgrades. All services will resume shortly."
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="p-12 text-center rounded-3xl border border-border bg-card/40 glass-panel space-y-6 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto shadow-xl">
        <AlertCircle className="w-8 h-8 animate-pulse" />
      </div>
      <div className="space-y-2">
        <Badge variant="default">MAINTENANCE</Badge>
        <h2 className="text-2xl font-black text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
