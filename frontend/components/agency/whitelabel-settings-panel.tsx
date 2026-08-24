"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Palette, Globe, Upload, CheckCircle2, Shield } from "lucide-react";

export function WhiteLabelSettingsPanel() {
  const [agencyName, setAgencyName] = useState("Apex SEO Agency");
  const [primaryColor, setPrimaryColor] = useState("#4f46e5");
  const [secondaryColor, setSecondaryColor] = useState("#10b981");
  const [customDomain, setCustomDomain] = useState("seo.apexagency.com");

  return (
    <div className="space-y-6 text-xs">
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h3 className="font-bold text-base text-foreground">Agency Custom Branding & White Label</h3>
            <p className="text-muted-foreground">Replace all SEOPilot branding on client dashboards, reports, and emails with your agency logo & colors.</p>
          </div>
          <Badge variant="success" className="glow-primary">White Label Active</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Agency Display Name</label>
              <Input value={agencyName} onChange={(e) => setAgencyName(e.target.value)} />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Custom Subdomain / Domain</label>
              <Input value={customDomain} onChange={(e) => setCustomDomain(e.target.value)} icon={<Globe className="w-4 h-4" />} />
              <span className="text-[10px] text-emerald-500 font-semibold mt-1 block">SSL Certificate Verified</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Primary Brand Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-8 h-8 rounded border border-border cursor-pointer bg-transparent" />
                  <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="font-mono" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Accent Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="w-8 h-8 rounded border border-border cursor-pointer bg-transparent" />
                  <Input value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="font-mono" />
                </div>
              </div>
            </div>
          </div>

          {/* White Label Portal Preview */}
          <div className="p-5 rounded-2xl border border-border bg-card/60 space-y-4">
            <div className="text-xs font-bold text-muted-foreground uppercase">Client Portal Preview</div>
            
            <div className="p-4 rounded-xl border border-border bg-background space-y-3 shadow-md">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <div className="font-bold text-sm text-foreground flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: primaryColor }} />
                  {agencyName}
                </div>
                <span className="text-[10px] text-muted-foreground font-mono">{customDomain}</span>
              </div>
              <p className="text-muted-foreground text-[11px]">Client Executive SEO Portal preview showing custom primary brand styling.</p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button className="gap-2 glow-primary">
            <CheckCircle2 className="w-4 h-4" /> Save White Label Branding
          </Button>
        </div>
      </Card>
    </div>
  );
}
