"use client";

import Link from "next/link";
import { useEffect, useRef, type Ref } from "react";
import { Star } from "lucide-react";
import { DescriptionExpander } from "@/components/description-expander";

import { featuredTools, type Tool, getCategoryByToolId } from "@/lib/tools";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  ANIMATED_ICONS,
  type AnimatedIcon,
  type AnimatedIconHandle,
} from "@/components/animated-icons";

/**
 * Renders a bespoke animated icon received as a prop. Kept at module scope so
 * the dynamic component looked up from ANIMATED_ICONS is never *created* inline
 * during ToolCell's render (which would trip react-hooks/static-components).
 */
function BespokeIcon({
  Icon,
  iconRef,
  className,
}: {
  Icon: AnimatedIcon;
  iconRef: Ref<AnimatedIconHandle>;
  className?: string;
}) {
  return <Icon ref={iconRef} size={18} aria-hidden className={className} />;
}

interface ToolCellProps {
  tool: Tool;
  isStarred?: boolean;
  onToggleStar?: (id: string) => void;
  featured?: boolean;
}

function ToolCell({ tool, isStarred = false, onToggleStar, featured = false }: ToolCellProps) {
  const handleRef = useRef<AnimatedIconHandle>(null);
  const staticRef = useRef<HTMLSpanElement>(null);
  const Animated = ANIMATED_ICONS.get(tool.icon);
  const StaticIcon = tool.icon;
  const category = getCategoryByToolId(tool.id);

  // Normalise static path lengths for draw-in animation if necessary
  useEffect(() => {
    if (Animated || !staticRef.current) return;
    staticRef.current
      .querySelectorAll<SVGGeometryElement>("svg > *")
      .forEach((el) => el.setAttribute("pathLength", "1"));
  }, [Animated]);

  const start = () => handleRef.current?.startAnimation();
  const stop = () => handleRef.current?.stopAnimation();

  const iconClass = cn(
    "tool-ic shrink-0 transition-transform duration-300 group-hover:scale-110",
    featured ? "text-amber-500" : "text-primary"
  );

  // Map categories to screenshot display names
  const getCategoryDisplayName = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("img") || n.includes("image") || n.includes("social")) return "image & assets";
    if (n.includes("color") || n.includes("colour")) return "colour";
    if (n.includes("typo") || n.includes("text") || n.includes("shavian")) return "text";
    if (n.includes("calc")) return "calculators";
    if (n.includes("other") || n.includes("barcode") || n.includes("qr") || n.includes("cipher") || n.includes("meta")) return "dev tools";
    if (n.includes("print") || n.includes("pdf")) return "print tools";
    return n;
  };

  const displayName = category ? getCategoryDisplayName(category.name) : "dev tools";

  return (
    <Link
      href={tool.href}
      onMouseEnter={Animated ? start : undefined}
      onMouseLeave={Animated ? stop : undefined}
      className={cn(
        "saas-card group flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 min-h-[185px] cursor-pointer hover:border-border",
        featured
          ? "border-amber-500/20 bg-amber-500/[0.02] dark:bg-amber-500/[0.01]"
          : "border-border/60"
      )}
    >
      <div className="space-y-4">
        {/* Top Circular Badge Icon */}
        <div className={cn(
          "flex size-10 items-center justify-center rounded-full transition-all duration-300 border",
          featured
            ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
            : "bg-primary/5 border-primary/10 text-primary"
        )}>
          {Animated ? (
            <BespokeIcon Icon={Animated} iconRef={handleRef} className="size-4.5" />
          ) : (
            <span
              ref={staticRef}
              aria-hidden
              className={cn(iconClass, "tool-ic-draw grid place-items-center")}
            >
              <StaticIcon className="size-4.5" />
            </span>
          )}
        </div>

        {/* Text Area */}
        <div className="space-y-1">
          <h4 className="text-[0.9rem] font-bold tracking-tight text-foreground flex items-center gap-1.5 flex-wrap">
            {tool.name}
            {tool.beta && (
              <Badge
                variant="outline"
                className="px-1 py-0 text-[8px] font-medium border-amber-500/50 text-amber-600 dark:text-amber-400 font-sans"
              >
                Beta
              </Badge>
            )}
            {tool.new && (
              <Badge variant="outline" className="px-1 py-0 text-[8px] font-medium border-primary/50 text-primary font-sans">
                New
              </Badge>
            )}
          </h4>
          <DescriptionExpander description={tool.description} title={tool.name} />
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between border-t border-border/20 pt-3 mt-4 text-[11px] font-sans">
        {/* Left Category Label */}
        <span className="text-muted-foreground/60 font-semibold tracking-tight uppercase text-[9px]">
          {displayName}
        </span>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Star Button */}
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); if (onToggleStar) onToggleStar(tool.id); }}
            className={cn(
              "flex size-7 items-center justify-center rounded-full border border-border/40 hover:bg-muted/30 transition-all",
              isStarred ? "text-amber-500 border-amber-500/40 bg-amber-500/[0.04]" : "text-muted-foreground"
            )}
            title={isStarred ? "Remove from favourites" : "Add to favourites"}
          >
            <Star className={cn("size-3.5", isStarred && "fill-amber-500")} />
          </button>

          {/* Pricing Tag */}
          <span className="px-2.5 py-0.5 rounded-full border border-dashed border-border/60 text-[10px] text-muted-foreground select-none">
            $1
          </span>

        </div>
      </div>
    </Link>
  );
}

/** A modern SaaS grid of tool cells with rounded corners and gaps. */
export function ToolCellGrid({
  tools,
  starredTools = new Set(),
  onToggleStar,
  featured = false,
}: {
  tools: Tool[];
  starredTools?: Set<string>;
  onToggleStar?: (id: string) => void;
  featured?: boolean;
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4 md:gap-6">
      {tools.map((tool) => (
        <ToolCell
          key={tool.id}
          tool={tool}
          isStarred={starredTools.has(tool.id)}
          onToggleStar={onToggleStar}
          featured={featured}
        />
      ))}
    </div>
  );
}

/** Greatest-hits row. */
export function FeaturedGrid({
  starredTools = new Set(),
  onToggleStar,
}: {
  starredTools?: Set<string>;
  onToggleStar?: (id: string) => void;
}) {
  return (
    <ToolCellGrid
      tools={featuredTools}
      starredTools={starredTools}
      onToggleStar={onToggleStar}
      featured
    />
  );
}
