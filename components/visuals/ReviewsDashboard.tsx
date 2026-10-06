import type { Dictionary } from "@/content/dictionaries";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "./Stars";

/** Deterministic decorative QR-like pattern (not scannable). */
const QR = Array.from({ length: 121 }, (_, i) => {
  const x = i % 11;
  const y = Math.floor(i / 11);
  const finder = (x < 3 && y < 3) || (x > 7 && y < 3) || (x < 3 && y > 7);
  return finder || (x * 7 + y * 13 + x * y) % 5 < 2;
});

/** Fictional reputation dashboard — clearly labelled as an illustration, no real data. */
export function ReviewsDashboard({ d, illustration }: { d: Dictionary["home"]["reviews"]["dashboard"]; illustration: string }) {
  return (
    <div aria-hidden="true" className="relative">
      <div className="absolute -inset-10 rounded-full bg-accent/10 blur-[100px]" />
      <div className="relative overflow-hidden rounded-3xl border border-line-strong bg-surface-2/90 shadow-[0_50px_120px_-40px_rgb(0_0_0/0.9)] backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex size-6 items-center justify-center rounded-full bg-white text-[0.7rem] font-bold text-ink">G</span>
            <span className="text-sm font-medium">{d.title}</span>
          </div>
          <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-subtle">
            {illustration}
          </span>
        </div>

        <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
          <div className="p-4 sm:p-6">
            <p className="text-[0.68rem] text-subtle sm:text-xs">{d.rating}</p>
            <Stars className="mt-3 text-fg" size="size-3 sm:size-4" />
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-[0.68rem] text-subtle sm:text-xs">{d.newReviews}</p>
            <div className="mt-3 flex h-8 items-end gap-1 sm:h-10">
              {[30, 45, 40, 60, 55, 75, 90].map((h, i) => (
                <span key={i} className="w-full rounded-sm bg-white/15 last:bg-accent" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-[0.68rem] text-subtle sm:text-xs">{d.responseRate}</p>
            <svg viewBox="0 0 36 36" className="mt-2 size-7 sm:size-9">
              <circle cx="18" cy="18" r="15" fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="3" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="#4f7cff" strokeWidth="3" strokeLinecap="round" strokeDasharray="94.2" strokeDashoffset="0" transform="rotate(-90 18 18)" />
              <path d="m13 18.5 3.2 3 6.3-6.5" fill="none" stroke="#f5f5f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="grid gap-0 sm:grid-cols-[1fr_auto]">
          <div className="p-5 sm:p-6">
            <p className="eyebrow !text-[0.6rem]">{d.recent}</p>
            <ul className="mt-4 space-y-3">
              {[0.9, 0.7, 0.8].map((w, i) => (
                <li key={i} className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] p-3">
                  <span className="size-8 shrink-0 rounded-full bg-gradient-to-br from-white/20 to-white/5" />
                  <div className="min-w-0 flex-1">
                    <Stars className="text-fg/90" size="size-2.5" />
                    <span className="mt-2 block h-1.5 rounded-full bg-white/10" style={{ width: `${w * 100}%` }} />
                  </div>
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-accent-soft px-2 py-1 text-[0.6rem] font-medium text-accent">
                    <Icon name="check" className="size-3" />
                    {d.replied}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden border-l border-line p-6 sm:block">
            <div className="grid size-28 grid-cols-11 gap-[2px] rounded-xl bg-white p-2.5">
              {QR.map((on, i) => (
                <span key={i} className={on ? "bg-ink" : ""} />
              ))}
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-[0.65rem] text-subtle">
              <Icon name="qr" className="size-3.5" /> QR
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
