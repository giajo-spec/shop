import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { delay } from "@/lib/style";
import { Icon, type IconName } from "@/components/ui/Icon";

export const serviceOrder = ["websites", "seo", "reviews"] as const;
export const serviceIcons: Record<(typeof serviceOrder)[number], IconName> = {
  websites: "layout",
  seo: "search",
  reviews: "star",
};

/** The three core services as large interactive cards. */
export function ServiceCards({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {serviceOrder.map((key, i) => {
        const s = dict.services[key];
        return (
          <article
            key={key}
            data-reveal
            style={delay(i * 110)}
            className="card spotlight group flex flex-col overflow-hidden p-7 sm:p-9"
          >
            <div className="flex items-start justify-between">
              <span className="flex size-12 items-center justify-center rounded-2xl border border-line bg-white/[0.03] text-fg transition-colors duration-500 group-hover:border-accent/50 group-hover:text-accent">
                <Icon name={serviceIcons[key]} className="size-5" />
              </span>
              <span className="font-mono text-xs text-subtle">{s.index}</span>
            </div>

            <p className="eyebrow mt-10 flex flex-wrap items-center gap-2">
              {s.name}
              {key === "reviews" && (
                <span className="rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5 text-[0.6rem] tracking-[0.12em] text-accent">
                  {dict.common.monthly}
                </span>
              )}
            </p>
            <h3 className="mt-4 text-2xl font-medium leading-tight tracking-tight sm:text-[1.65rem]">{s.title}</h3>
            <p className="mt-4 leading-relaxed text-muted">{s.short}</p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {s.features.slice(0, 6).map((f) => (
                <li key={f.title} className="rounded-full border border-line px-3 py-1.5 text-[0.78rem] text-muted">
                  {f.title}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-10">
              <Link
                href={href(locale, key)}
                className="inline-flex items-center gap-2 text-[0.92rem] font-medium text-fg after:absolute after:inset-0 after:content-['']"
              >
                {s.cta}
                <Icon name="arrowRight" className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
