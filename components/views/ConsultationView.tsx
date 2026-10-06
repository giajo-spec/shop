import { getDictionary } from "@/content/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { delay } from "@/lib/style";
import { breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { CalendlyEmbed } from "@/components/forms/CalendlyEmbed";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { crumbs } from "./shared";

export function consultationLabels(locale: Locale) {
  const dict = getDictionary(locale);
  const c = dict.pages.consultation;
  return {
    loadCalendar: c.loadCalendar,
    loading: c.loading,
    openNewTab: c.openNewTab,
    calendarTitle: c.calendarTitle,
    calendarNote: c.calendarNote,
    unavailable: c.unavailable,
    fallbackCta: dict.common.requestQuote,
    fallbackHref: href(locale, "quote"),
  };
}

export function ConsultationView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const c = dict.pages.consultation;
  const trail = crumbs(locale, dict, [{ key: "consultation", name: c.eyebrow }]);

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} crumbs={trail} breadcrumbLabel={dict.common.breadcrumb} />
      <Section className="!pt-4">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <h2 data-reveal className="eyebrow">{c.expectTitle}</h2>
            <ul className="mt-6 border-t border-line">
              {c.expect.map((item, i) => (
                <li key={item} data-reveal style={delay(i * 70)} className="flex items-start gap-3 border-b border-line py-4 text-muted">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
          <div data-reveal className="lg:col-span-8">
            <CalendlyEmbed labels={consultationLabels(locale)} />
          </div>
        </div>
      </Section>
    </>
  );
}
