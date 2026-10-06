import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { Icon } from "@/components/ui/Icon";
import { Parallax } from "./Parallax";
import { Stars } from "./Stars";

/** Parallax depth helper: deeper layers move more. */
const depth = (n: number) =>
  ({ translate: `calc(var(--px) * ${n}px) calc(var(--py) * ${n}px)`, transition: "translate 0.6s cubic-bezier(0.16,1,0.3,1)" }) as CSSProperties;

/** Decorative product composition: website + Google visibility + reviews + incoming lead. */
export function HeroVisual({ visual, illustration }: { visual: Dictionary["home"]["visual"]; illustration: string }) {
  return (
    <Parallax className="relative mx-auto aspect-[10/9] w-full max-w-[640px]">
      <div aria-hidden="true" className="absolute inset-0">
        {/* Single, very soft accent glow */}
        <div className="absolute left-1/2 top-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]" />

        {/* Browser window */}
        <div style={depth(-6)} className="absolute inset-x-[6%] top-[8%] bottom-[14%]">
          <div className="h-full overflow-hidden rounded-2xl border border-line-strong bg-surface-2/80 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9)] backdrop-blur-md">
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
              </div>
              <div className="mx-auto flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-[0.62rem] text-subtle">
                <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="2.5" y="5.5" width="7" height="5" rx="1" />
                  <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" />
                </svg>
                {visual.url}
              </div>
            </div>

            <div className="relative p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="h-2 w-16 rounded-full bg-white/25" />
                <div className="hidden gap-3 sm:flex">
                  <span className="h-1.5 w-8 rounded-full bg-white/10" />
                  <span className="h-1.5 w-8 rounded-full bg-white/10" />
                  <span className="h-1.5 w-8 rounded-full bg-white/10" />
                  <span className="h-1.5 w-12 rounded-full bg-accent/70" />
                </div>
              </div>
              <p className="display mt-8 max-w-[15ch] text-[1.35rem] leading-[1.02] text-fg sm:mt-10 sm:text-[2rem]">{visual.heading}</p>
              <div className="mt-4 space-y-2">
                <span className="block h-1.5 w-[70%] rounded-full bg-white/10" />
                <span className="block h-1.5 w-[52%] rounded-full bg-white/10" />
              </div>
              <div className="mt-6 flex gap-2">
                <span className="h-6 w-24 rounded-full bg-accent-strong" />
                <span className="h-6 w-20 rounded-full border border-line-strong" />
              </div>
              <div className="mt-7 grid grid-cols-3 gap-2.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="aspect-[4/3] rounded-lg border border-line bg-gradient-to-br from-white/[0.06] to-transparent" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Google visibility */}
        <div style={depth(14)} className="absolute right-0 top-0 w-[46%] sm:right-[-2%]">
          <div className="animate-float rounded-2xl border border-line-strong bg-surface-3/90 p-4 shadow-2xl shadow-black/70 backdrop-blur-xl">
            <div className="flex flex-col items-start justify-between gap-1 sm:flex-row sm:items-center">
              <span className="flex items-center gap-2 whitespace-nowrap text-[0.7rem] text-muted">
                <Icon name="search" className="size-3.5" />
                {visual.visibility}
              </span>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-subtle">{illustration}</span>
            </div>
            <svg viewBox="0 0 200 80" className="mt-3 w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="hv-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4f7cff" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#4f7cff" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[20, 40, 60].map((y) => (
                <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="rgb(255 255 255 / 0.06)" />
              ))}
              <path d="M0 68 C 30 64, 45 58, 70 54 S 110 44, 130 36 S 170 16, 200 10 L200 80 L0 80 Z" fill="url(#hv-area)" />
              <path
                d="M0 68 C 30 64, 45 58, 70 54 S 110 44, 130 36 S 170 16, 200 10"
                fill="none"
                stroke="#4f7cff"
                strokeWidth="2"
                strokeLinecap="round"
                pathLength={1}
                className="[stroke-dasharray:1] [stroke-dashoffset:1] motion-safe:animate-[draw_2.4s_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] motion-reduce:[stroke-dashoffset:0]"
              />
              <circle cx="200" cy="10" r="3" fill="#4f7cff" />
            </svg>
          </div>
        </div>

        {/* Reviews */}
        <div style={depth(20)} className="absolute bottom-[4%] left-0 w-[44%]">
          <div className="animate-float rounded-2xl border border-line-strong bg-surface-3/90 p-4 shadow-2xl shadow-black/70 backdrop-blur-xl [animation-delay:-3s]">
            <span className="flex items-center gap-2 text-[0.7rem] text-muted">
              <span className="flex size-4 items-center justify-center rounded-full bg-white text-[0.55rem] font-bold text-ink">G</span>
              {visual.reviews}
            </span>
            <Stars className="mt-3 text-fg" size="size-4" />
            <div className="mt-3 space-y-1.5">
              <span className="block h-1.5 w-[88%] rounded-full bg-white/10" />
              <span className="block h-1.5 w-[64%] rounded-full bg-white/10" />
            </div>
          </div>
        </div>

        {/* Incoming lead */}
        <div style={depth(10)} className="absolute bottom-0 right-0 w-[58%] sm:w-[52%]">
          <div className="animate-float rounded-2xl border border-line-strong bg-surface-3/90 p-3.5 shadow-2xl shadow-black/70 backdrop-blur-xl [animation-delay:-5s]">
            <div className="flex items-center gap-3">
              <span className="relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Icon name="inbox" className="size-4" />
                <span className="absolute -right-0.5 -top-0.5 size-2.5 animate-pulse-dot rounded-full bg-accent" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[0.78rem] font-medium text-fg">{visual.leadName}</p>
                <p className="truncate text-[0.66rem] text-subtle">{visual.leadMeta}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Parallax>
  );
}
