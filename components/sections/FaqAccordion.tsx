import { cn } from "@/lib/cn";

type Item = { q: string; a: string };

/** Accessible accordion built on <details>: works without JavaScript. */
export function FaqAccordion({ items, className }: { items: Item[]; className?: string }) {
  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item) => (
        <details key={item.q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left text-lg font-medium tracking-tight transition-colors hover:text-white sm:text-xl">
            <span>{item.q}</span>
            <span className="relative mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-300 group-open:border-accent group-open:bg-accent-strong" aria-hidden="true">
              <span className="absolute h-px w-3 bg-current" />
              <span className="absolute h-3 w-px bg-current transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
            </span>
          </summary>
          <div className="faq-answer max-w-3xl pb-7 pr-12 leading-relaxed text-muted">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
