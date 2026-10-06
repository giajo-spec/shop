import { Icon } from "@/components/ui/Icon";

/** Stylized search results page highlighting "your business". */
export function SearchVisual({ query, you, label }: { query: string; you: string; label: string }) {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[580px]">
      <div className="absolute -inset-8 rounded-full bg-accent/10 blur-[100px]" />
      <div className="relative overflow-hidden rounded-3xl border border-line-strong bg-surface-2/90 p-5 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9)] sm:p-7">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center gap-3 rounded-full border border-line-strong bg-white/[0.03] px-4 py-3">
            <Icon name="search" className="size-4 text-subtle" />
            <span className="truncate text-sm text-fg">{query}</span>
            <span className="ml-auto h-4 w-px animate-pulse bg-accent" />
          </div>
          <span className="ml-3 hidden font-mono text-[0.55rem] uppercase tracking-[0.14em] text-subtle sm:block">{label}</span>
        </div>
        <ul className="mt-6 space-y-3">
          <li className="relative rounded-2xl border border-accent/50 bg-accent-soft p-4 shadow-[0_0_40px_-12px_rgb(79_124_255/0.6)]">
            <div className="flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-fg text-[0.55rem] font-bold text-ink">N</span>
              <span className="text-[0.75rem] font-medium text-fg">{you}</span>
            </div>
            <span className="mt-3 block h-2.5 w-[70%] rounded bg-accent/70" />
            <span className="mt-2 block h-1.5 w-[90%] rounded-full bg-white/15" />
            <span className="mt-1.5 block h-1.5 w-[60%] rounded-full bg-white/15" />
          </li>
          {[0.6, 0.75, 0.5].map((w, i) => (
            <li key={i} className="rounded-2xl border border-line p-4 opacity-60">
              <span className="block h-2 w-24 rounded-full bg-white/10" />
              <span className="mt-3 block h-2.5 rounded bg-white/15" style={{ width: `${w * 100}%` }} />
              <span className="mt-2 block h-1.5 w-[80%] rounded-full bg-white/[0.07]" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
