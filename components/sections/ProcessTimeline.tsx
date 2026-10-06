"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Step = { title: string; text: string };

/** Vertical timeline whose progress line fills as the visitor scrolls through it. */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.55;
      const value = (anchor - rect.top) / rect.height;
      setProgress(Math.min(1, Math.max(0, value)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol ref={listRef} className="relative">
      <span className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-line sm:left-[1.65rem]" aria-hidden="true" />
      <span
        className="absolute left-[1.4rem] top-6 w-px origin-top bg-gradient-to-b from-accent to-accent/40 sm:left-[1.65rem]"
        style={{ height: "calc(100% - 3rem)", transform: `scaleY(${progress})` }}
        aria-hidden="true"
      />
      {steps.map((step, i) => {
        const active = progress >= (i + 0.35) / steps.length || progress >= 0.98;
        return (
          <li key={step.title} className="relative flex gap-6 pb-14 last:pb-0 sm:gap-8">
            <span
              className={cn(
                "relative z-10 flex size-[2.8rem] shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-all duration-700 sm:size-[3.3rem]",
                active ? "border-accent bg-accent-strong text-white shadow-[0_0_30px_-4px_rgb(79_124_255/0.7)]" : "border-line-strong bg-ink text-subtle",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className={cn("pt-2 transition-opacity duration-700 sm:pt-3", active ? "opacity-100" : "opacity-45")}>
              <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">{step.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">{step.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
