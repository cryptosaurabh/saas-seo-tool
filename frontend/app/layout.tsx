import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PEXIS - Scale Company Operating System",
  description: "Enterprise SaaS OS for agencies, businesses, freelancers, and enterprises.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
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
