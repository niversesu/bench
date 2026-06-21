"use client";

import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { type HubLink } from "@/lib/links";

function LinkCard({ link }: { link: HubLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="saas-card group flex flex-col justify-between p-6 rounded-2xl border border-border/60 transition-all duration-300 min-h-[185px] cursor-pointer hover:border-border"
    >
      <div className="space-y-4">
        {/* Icon badge */}
        <div className="flex size-10 items-center justify-center rounded-full border bg-primary/5 border-primary/10 text-primary transition-all duration-300">
          <ExternalLink className="size-4.5" />
        </div>

        {/* Text */}
        <div className="space-y-1">
          <h4 className="text-[0.9rem] font-bold tracking-tight text-foreground flex items-center gap-1.5">
            {link.name}
            <ExternalLink className="size-3 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h4>
          <p className="text-[0.75rem] text-muted-foreground line-clamp-2 leading-relaxed font-sans font-normal">
            {link.description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border/20 pt-3 mt-4 text-[11px] font-sans">
        <span className="text-muted-foreground/60 font-semibold tracking-tight uppercase text-[9px]">
          {link.category}
        </span>
        <span className={cn(
          "px-2.5 py-0.5 rounded-full border border-dashed border-border/60",
          "text-[10px] text-muted-foreground select-none"
        )}>
          {new URL(link.href).hostname.replace(/^www\./, "")}
        </span>
      </div>
    </a>
  );
}

export function LinkHubGrid({ links }: { links: HubLink[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4 md:gap-6">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
