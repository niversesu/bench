"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { allTools, getCategoryByToolId } from "@/lib/tools";
import { ToolCellGrid } from "@/components/tool-grid";
import { LinkHubGrid } from "@/components/link-hub";
import { hubLinks, linkFilterTags } from "@/lib/links";

function loadStarredTools(): Set<string> {
  try {
    const stored = localStorage.getItem("bench_starred_tools");
    if (stored) return new Set(JSON.parse(stored));
  } catch (e) {
    console.error("Failed to load favourites:", e);
  }
  return new Set();
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [starredTools, setStarredTools] = useState<Set<string>>(loadStarredTools);
  const [view, setView] = useState<"tools" | "links">("tools");
  const [selectedLinkTag, setSelectedLinkTag] = useState("all");
  const isLoaded = true;

  const handleToggleStar = (id: string) => {
    setStarredTools((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem("bench_starred_tools", JSON.stringify(Array.from(next)));
      } catch (e) {
        console.error("Failed to save favourites:", e);
      }
      return next;
    });
  };

  const query = searchQuery.toLowerCase();

  // Helper to map tool category name to filter tags
  const getToolTagName = (toolId: string) => {
    const category = getCategoryByToolId(toolId);
    if (!category) return "dev tools";
    const name = category.name.toLowerCase();
    if (name.includes("img") || name.includes("image") || name.includes("social")) return "image & assets";
    if (name.includes("color") || name.includes("colour")) return "colour";
    if (name.includes("typo") || name.includes("text")) return "text";
    if (name.includes("calc")) return "calculators";
    return "dev tools";
  };

  // Filter tools based on search query and active filter tag
  const filteredTools = allTools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    if (selectedTag === "all") return true;
    if (selectedTag === "favourites") return starredTools.has(tool.id);
    
    return getToolTagName(tool.id) === selectedTag;
  });

  const filteredLinks = selectedLinkTag === "all"
    ? hubLinks
    : hubLinks.filter((l) => l.tags.includes(selectedLinkTag));

  const filterTags = [
    { id: "all", label: "all tools" },
    { id: "image & assets", label: "image & assets" },
    { id: "colour", label: "colour" },
    { id: "text", label: "text" },
    { id: "calculators", label: "calculators" },
    { id: "dev tools", label: "dev tools" },
    { id: "favourites", label: "★ favourites" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 space-y-10 md:space-y-12 font-sans">
      
      {/* Centered Hero Header */}
      <section className="space-y-4 max-w-3xl text-left">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          small tools, sorted<span className="text-primary font-black">.</span>
        </h1>
        <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
          ten-second jobs that don&apos;t deserve a subscription. buy a single tool for $1, 
          subscribe for everything at $5/month, or watch five short ads for thirty minutes free.
        </p>
      </section>



      {/* Control Console (Search & Tags) */}
      <section className="space-y-6">
        {/* Search Box */}
        <div className="relative max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="search — try"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border/60 bg-card/25 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all font-mono"
          />
        </div>

        {/* View Toggle + Filter Tags Row */}
        <div className="flex flex-wrap items-center gap-2 pb-1 overflow-x-auto border-b border-border/20">
          <div className="flex rounded-lg border border-border/60 overflow-hidden text-xs font-semibold mr-1">
            <button
              onClick={() => { setView("tools"); setSelectedTag("all"); }}
              className={`px-3 py-1.5 transition-all ${view === "tools" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              tools
            </button>
            <button
              onClick={() => { setView("links"); setSelectedLinkTag("all"); }}
              className={`px-3 py-1.5 border-l border-border/60 transition-all ${view === "links" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              links
            </button>
          </div>
          {(view === "links" ? linkFilterTags : filterTags).map((tag) => (
            <button
              key={tag.id}
              onClick={() => view === "links" ? setSelectedLinkTag(tag.id) : setSelectedTag(tag.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 ${
                (view === "links" ? selectedLinkTag : selectedTag) === tag.id
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card/30 hover:bg-card border-border/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Grid */}
      <main className="space-y-6">
        {/* Counter */}
        <div className="text-xs text-muted-foreground font-mono">
          {view === "tools"
            ? `${filteredTools.length} ${filteredTools.length === 1 ? "tool" : "tools"}`
            : `${filteredLinks.length} ${filteredLinks.length === 1 ? "link" : "links"}`}
        </div>

        {view === "links" ? (
          <LinkHubGrid links={filteredLinks} />
        ) : isLoaded ? (
          filteredTools.length > 0 ? (
            <ToolCellGrid 
              tools={filteredTools} 
              starredTools={starredTools}
              onToggleStar={handleToggleStar}
            />
          ) : (
            <div className="text-center py-16 bg-card/25 rounded-2xl border border-dashed border-border/50">
              <p className="text-sm text-muted-foreground">No tools found matching your filter or search query.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedTag("all"); }} 
                className="mt-3 text-xs text-primary underline hover:text-primary/80"
              >
                Reset filters
              </button>
            </div>
          )
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[185px] bg-card/10 border border-border/30 rounded-2xl animate-pulse" />
            ))}
          </div>
        )}
      </main>

      {/* Simple Professional Footer */}
      <footer className="border-t border-border/20 pt-8 text-[11px] text-muted-foreground flex flex-col sm:flex-row justify-between gap-4">
        <p>bench. — Local utility tools running client-side inside your browser context.</p>
        <p className="opacity-70">No logging. No server uploads. Open source suite.</p>
      </footer>
    </div>
  );
}
