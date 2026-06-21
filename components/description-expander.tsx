"use client";

import { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface DescriptionExpanderProps {
  description: string;
  title: string;
  className?: string;
}

export function DescriptionExpander({
  description,
  title,
  className,
}: DescriptionExpanderProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    setIsClamped(el.scrollHeight > el.clientHeight + 1);
  }, [description]);

  return (
    <>
      <div className="relative">
        <p
          ref={textRef}
          className={
            className ??
            "text-[0.75rem] text-muted-foreground line-clamp-2 leading-relaxed font-sans font-normal"
          }
        >
          {description}
        </p>

        {isClamped && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(true);
            }}
            className="absolute bottom-0 right-0 pl-2 text-[0.75rem] leading-relaxed font-sans font-semibold text-muted-foreground hover:text-foreground transition-colors bg-gradient-to-l from-card via-card/90 to-transparent pr-0.5"
            aria-label="Expand description"
          >
            …
          </button>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md p-8 gap-3">
          <DialogTitle className="text-base font-bold">{title}</DialogTitle>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
