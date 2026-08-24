import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEOPilot AI - The AI-Powered SEO Operating System",
  description: "Enterprise SaaS OS for agencies, businesses, freelancers, and enterprises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
