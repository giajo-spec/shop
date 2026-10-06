import { cn } from "@/lib/cn";

/** "N" monogram — also used for the favicon, apple-touch-icon and OG image. */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect x="0.5" y="0.5" width="31" height="31" rx="8.5" fill="#0b0b0d" stroke="rgb(255 255 255 / 0.16)" />
      <path d="M10 22.5V9.5l12 13V9.5" fill="none" stroke="#f5f5f6" strokeWidth="2.6" strokeLinecap="square" strokeLinejoin="miter" />
      <circle cx="22" cy="6.4" r="1.5" fill="#4f7cff" />
    </svg>
  );
}

/** Typographic logotype: NEXORA + DIGITAL. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Monogram className="size-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-[0.95rem] font-semibold tracking-[0.26em] text-fg">NEXORA</span>
        {!compact && <span className="mt-1 font-mono text-[0.58rem] tracking-[0.42em] text-subtle">DIGITAL</span>}
      </span>
    </span>
  );
}
