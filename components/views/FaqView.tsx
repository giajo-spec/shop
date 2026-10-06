import { getDictionary } from "@/content/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { crumbs } from "./shared";

export function FaqView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const f = dict.pages.faq;
  const trail = crumbs(locale, dict, [{ key: "faq", name: dict.nav.faq }]);

  return (
    <>
      <JsonLd data={[breadcrumbSchema(trail), faqSchema(dict.faq.flatMap((c) => c.items))]} />
      <PageHero eyebrow={f.eyebrow} title={f.title} lead={f.lead} crumbs={trail} breadcrumbLabel={dict.common.breadcrumb} />

      <Section className="!pt-4">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <nav aria-label={f.title} className="hidden lg:col-span-3 lg:block">
            <ul className="sticky top-32 space-y-1">
              {dict.faq.map((cat) => (
                <li key={cat.id}>
                  <a href={`#${cat.id}`} className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-white/[0.04] hover:text-fg">
                    {cat.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-20 lg:col-span-8 lg:col-start-5">
            {dict.faq.map((cat) => (
              <section key={cat.id} id={cat.id} aria-labelledby={`${cat.id}-title`} data-reveal>
                <h2 id={`${cat.id}-title`} className="eyebrow mb-6 flex items-center gap-3">
                  <span className="inline-block size-1.5 rounded-full bg-accent" aria-hidden="true" />
                  {cat.title}
                </h2>
                <FaqAccordion items={cat.items} />
              </section>
            ))}

            <div data-reveal className="card p-8 sm:p-10">
              <h2 className="text-2xl font-medium tracking-tight">{f.stillTitle}</h2>
              <p className="mt-3 text-muted">{f.stillText}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={href(locale, "quote")}>{dict.common.requestQuote}</ButtonLink>
                <ButtonLink href={href(locale, "consultation")} variant="secondary" icon="calendar">
                  {dict.common.talkToExpert}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
