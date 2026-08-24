import * as React from "react";
import { cn } from "@/lib/utils";
import { Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
}

export function Alert({ className, variant = "info", title, children, ...props }: AlertProps) {
  const icons = {
    info: <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />,
    error: <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
  };

  const variants = {
    info: "bg-blue-500/10 border-blue-500/20 text-blue-200",
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-200",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-200",
    error: "bg-rose-500/10 border-rose-500/20 text-rose-200"
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl border text-xs leading-relaxed glass-panel",
        variants[variant],
        className
      )}
      {...props}
    >
      {icons[variant]}
      <div className="flex-1">
        {title && <div className="font-bold text-sm text-foreground mb-1">{title}</div>}
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}

export function Progress({ value = 0, className }: { value: number; className?: string }) {
  return (
    <div className={cn("w-full bg-muted/60 h-2 rounded-full overflow-hidden", className)}>
      <div
        className="h-full bg-primary transition-all duration-500 ease-out glow-primary"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
