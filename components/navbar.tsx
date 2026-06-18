"use client";

import Link from "next/link";
import { Lock, Sun, Moon } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-1.5 hover:opacity-90 transition-opacity">
          <span className="text-xl font-bold tracking-tight text-foreground">
            bench<span className="text-primary font-black">.</span>
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Theme Toggle (Custom styled wrapper) */}
          <div className="border border-border/50 rounded-full flex items-center justify-center bg-card/30">
            <ThemeToggle />
          </div>

          {/* Locked Status Button */}
          <button 
            type="button" 
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border/50 bg-card/30 hover:bg-card/60 text-muted-foreground hover:text-foreground rounded-full transition-all"
          >
            <Lock className="size-3.5 text-muted-foreground" />
            <span>locked</span>
          </button>

          {/* Pricing Button */}
          <button 
            type="button" 
            className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold border border-border/50 bg-card/30 hover:bg-card/60 text-foreground rounded-full transition-all"
          >
            $5/month
          </button>

          {/* Ads Reward Button */}
          <button 
            type="button" 
            className="px-4 py-1.5 text-xs font-semibold bg-amber-600/15 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300 hover:bg-amber-600/25 dark:hover:bg-amber-500/20 border border-amber-500/30 dark:border-amber-400/20 rounded-full transition-all"
          >
            watch 5 ads — 30 min free
          </button>
        </div>
      </div>
    </header>
  );
}
