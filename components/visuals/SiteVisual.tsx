import { Icon } from "@/components/ui/Icon";

/** Desktop + mobile composition illustrating responsive web design. */
export function SiteVisual({ label }: { label: string }) {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-[5/4] w-full max-w-[600px]">
      <div className="absolute left-1/2 top-1/2 size-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[110px]" />
      <div className="absolute inset-x-0 top-[6%] bottom-[16%] overflow-hidden rounded-2xl border border-line-strong bg-surface-2/90 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9)]">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <div className="grid grid-cols-[1.2fr_1fr] gap-6 p-7">
          <div className="space-y-3 pt-4">
            <span className="block h-5 w-[90%] rounded bg-white/20" />
            <span className="block h-5 w-[70%] rounded bg-white/20" />
            <span className="block h-1.5 w-[85%] rounded-full bg-white/10" />
            <span className="block h-1.5 w-[60%] rounded-full bg-white/10" />
            <div className="flex gap-2 pt-4">
              <span className="h-7 w-24 rounded-full bg-accent-strong" />
              <span className="h-7 w-20 rounded-full border border-line-strong" />
            </div>
          </div>
          <div className="aspect-square rounded-xl border border-line bg-gradient-to-br from-white/[0.08] to-transparent" />
        </div>
        <div className="grid grid-cols-3 gap-3 px-7">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 rounded-lg border border-line bg-white/[0.03]" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 right-[4%] w-[30%] animate-float overflow-hidden rounded-[1.6rem] border border-line-strong bg-surface-3 p-2 shadow-2xl shadow-black/80">
        <div className="overflow-hidden rounded-[1.2rem] bg-surface-2">
          <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-white/15" />
          <div className="space-y-2 p-3 pt-5">
            <span className="block h-3 w-[90%] rounded bg-white/20" />
            <span className="block h-3 w-[70%] rounded bg-white/20" />
            <span className="block h-1 w-[80%] rounded-full bg-white/10" />
            <span className="mt-3 block h-5 w-full rounded-full bg-accent-strong" />
            <div className="mt-3 aspect-[4/3] rounded-lg border border-line bg-white/[0.04]" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[6%] left-0 animate-float rounded-2xl border border-line-strong bg-surface-3/90 p-4 shadow-2xl shadow-black/70 backdrop-blur-xl [animation-delay:-3s]">
        <p className="flex items-center gap-2 text-[0.7rem] text-muted">
          <Icon name="gauge" className="size-3.5" /> Core Web Vitals
        </p>
        <div className="mt-3 flex gap-2">
          {["LCP", "INP", "CLS"].map((m) => (
            <span key={m} className="flex items-center gap-1 rounded-full bg-accent-soft px-2 py-1 font-mono text-[0.6rem] text-accent">
              <Icon name="check" className="size-3" /> {m}
            </span>
          ))}
        </div>
        <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-subtle">{label}</p>
      </div>
    </div>
  );
}
