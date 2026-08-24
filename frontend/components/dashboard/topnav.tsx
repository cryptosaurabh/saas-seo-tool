"use client";

import React, { useState } from "react";
import { Search, Moon, Sun, User, LogOut, Settings, Sparkles, Command } from "lucide-react";
import { NotificationCenter } from "./notification-center";
import { SearchModal } from "./search-modal";
import { useRouter } from "next/navigation";

export function TopNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sp_access_token");
    router.push("/login");
  };

  return (
    <>
      <header className="h-16 border-b border-border bg-card/40 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30">
        {/* Search Trigger */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-3 px-4 py-2 rounded-xl border border-border bg-accent/40 text-muted-foreground hover:text-foreground text-xs w-64 md:w-80 transition-all hover:bg-accent"
        >
          <Search className="w-4 h-4" />
          <span>Search or type command...</span>
          <kbd className="ml-auto flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border bg-background text-[10px] font-mono text-muted-foreground">
            <Command className="w-3 h-3" /> K
          </kbd>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Notification Center */}
          <NotificationCenter />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-accent transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-primary/20">
                A
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-semibold text-foreground">Alex Mercer</div>
                <div className="text-[10px] text-muted-foreground">Agency Owner</div>
              </div>
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 z-50 rounded-2xl border border-border bg-popover p-1.5 shadow-xl glass-panel animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    router.push("/dashboard/settings");
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs text-foreground hover:bg-accent transition-colors"
                >
                  <Settings className="w-4 h-4 text-muted-foreground" /> Account Settings
                </button>
                <div className="h-px bg-border my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Search Modal Component */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
