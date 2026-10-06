/** Infinite, GPU-only typographic ticker (pauses on hover; static with reduced motion). */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap text-xl font-medium tracking-tight text-white/45 sm:text-2xl">
            {item}
            <span className="size-1.5 rounded-full bg-white/25" />
          </span>
        ))}
      </div>
    </div>
  );
}
