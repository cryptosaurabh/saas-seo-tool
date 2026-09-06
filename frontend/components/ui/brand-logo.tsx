"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  showText?: boolean;
  textClassName?: string;
  href?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

export function BrandLogo({
  className,
  imageClassName,
  showText = true,
  textClassName,
  href,
  size = "md",
}: BrandLogoProps) {
  const sizeMap = {
    xs: { box: "w-7 h-7", img: 28, text: "text-sm" },
    sm: { box: "w-8 h-8", img: 32, text: "text-sm" },
    md: { box: "w-10 h-10", img: 40, text: "text-lg" },
    lg: { box: "w-12 h-12", img: 48, text: "text-xl" },
  };

  const content = (
    <div className={cn("flex items-center gap-2.5 group select-none", className)}>
      <div
        className={cn(
          "rounded-xl bg-white/95 p-1 flex items-center justify-center shadow-md border border-white/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary/20",
          sizeMap[size].box,
          imageClassName
        )}
      >
        <img
          src="/logo.png"
          alt="PEXIS Scale Company"
          className="w-full h-full object-contain filter drop-shadow-sm"
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-extrabold tracking-tight text-foreground flex items-center gap-1.5 leading-none",
              sizeMap[size].text,
              textClassName
            )}
          >
            PEXIS <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          </span>
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
            Scale Company
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {content}
      </Link>
    );
  }

  return content;
}
