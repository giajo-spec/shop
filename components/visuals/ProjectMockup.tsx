import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Browser-framed screenshot. Without `src`, renders a clearly labelled
 * placeholder composition (one of several layouts) until real captures are added.
 */
export function ProjectMockup({
  src,
  alt,
  placeholderLabel,
  variant = 0,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
}: {
  src?: string;
  alt: string;
  placeholderLabel: string;
  variant?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-line-strong bg-surface-2 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)]", className)}>
      <div className="flex items-center gap-1.5 border-b border-line bg-white/[0.02] px-3.5 py-2.5" aria-hidden="true">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="ml-3 h-3 w-1/3 rounded-full bg-white/[0.05]" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
          />
        ) : (
          <Placeholder label={placeholderLabel} variant={variant % 3} />
        )}
      </div>
    </div>
  );
}

function Placeholder({ label, variant }: { label: string; variant: number }) {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.06),transparent_60%)] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]">
      <div aria-hidden="true" className="absolute inset-0 p-[7%] opacity-80">
        <div className="flex items-center justify-between">
          <span className="h-2 w-14 rounded-full bg-white/20" />
          <span className="h-2 w-24 rounded-full bg-white/[0.08]" />
        </div>
        {variant === 0 && (
          <div className="mt-[9%] grid grid-cols-2 gap-[6%]">
            <div className="space-y-2.5">
              <span className="block h-4 w-[90%] rounded bg-white/15" />
              <span className="block h-4 w-[70%] rounded bg-white/15" />
              <span className="block h-1.5 w-[80%] rounded-full bg-white/[0.07]" />
              <span className="mt-4 block h-5 w-20 rounded-full bg-white/20" />
            </div>
            <div className="aspect-[4/3] rounded-lg border border-line bg-white/[0.04]" />
          </div>
        )}
        {variant === 1 && (
          <div className="mt-[8%] flex flex-col items-center gap-2.5">
            <span className="h-4 w-[60%] rounded bg-white/15" />
            <span className="h-4 w-[45%] rounded bg-white/15" />
            <span className="mt-2 h-1.5 w-[50%] rounded-full bg-white/[0.07]" />
            <div className="mt-[6%] grid w-full grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="aspect-square rounded-lg border border-line bg-white/[0.04]" />
              ))}
            </div>
          </div>
        )}
        {variant === 2 && (
          <div className="mt-[7%]">
            <div className="aspect-[3/1] rounded-lg border border-line bg-white/[0.04]" />
            <div className="mt-[5%] grid grid-cols-[2fr_1fr] gap-4">
              <div className="space-y-2">
                <span className="block h-3.5 w-[80%] rounded bg-white/15" />
                <span className="block h-1.5 w-full rounded-full bg-white/[0.07]" />
                <span className="block h-1.5 w-[85%] rounded-full bg-white/[0.07]" />
              </div>
              <span className="h-5 rounded-full bg-white/20" />
            </div>
          </div>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-center p-4">
        <span className="rounded-full border border-dashed border-white/25 bg-ink/70 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted backdrop-blur">
          {label}
        </span>
      </div>
    </div>
  );
}
