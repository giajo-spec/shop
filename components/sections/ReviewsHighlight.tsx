import type { Dictionary } from "@/content/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { delay } from "@/lib/style";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ReviewsDashboard } from "@/components/visuals/ReviewsDashboard";

/** Why Google reviews matter — qualitative arguments only (no unverifiable stats). */
export function ReviewsHighlight({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const r = dict.home.reviews;
  return (
    <Section labelledBy="reviews-title" className="overflow-hidden">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeader id="reviews-title" eyebrow={r.eyebrow} title={r.title} lead={r.lead} />
          <ul className="mt-12 space-y-7">
            {r.points.map((point, i) => (
              <li key={point.title} data-reveal style={delay(i * 90)} className="flex gap-5">
                <span className="mt-1 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-medium tracking-tight">{point.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p data-reveal className="mt-10 flex items-center gap-3 rounded-2xl border border-line bg-white/[0.02] p-4 text-sm text-muted">
            <Icon name="shield" className="size-5 shrink-0 text-accent" />
            {r.ethics}
          </p>
          <div data-reveal className="mt-10">
            <ButtonLink href={href(locale, "reviews")}>{dict.services.reviews.cta}</ButtonLink>
          </div>
        </div>
        <div data-reveal="scale" style={delay(150)} className="lg:col-span-7">
          <ReviewsDashboard d={r.dashboard} illustration={dict.common.illustration} />
        </div>
      </div>
    </Section>
  );
}
