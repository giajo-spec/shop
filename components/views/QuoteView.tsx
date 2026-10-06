import { getDictionary } from "@/content/dictionaries";
import { siteConfig } from "@/content/site";
import { href, type Locale } from "@/lib/i18n";
import { delay } from "@/lib/style";
import { breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { crumbs } from "./shared";

export function QuoteView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const q = dict.pages.quote;
  const trail = crumbs(locale, dict, [{ key: "quote", name: q.eyebrow }]);
  const { email, phone } = siteConfig.contact;

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero eyebrow={q.eyebrow} title={q.title} lead={q.lead} crumbs={trail} breadcrumbLabel={dict.common.breadcrumb} />

      <Section className="!pt-0">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div data-reveal className="lg:col-span-8">
            <QuoteForm
              locale={locale}
              t={dict.form}
              privacyHref={href(locale, "privacy")}
              consultationHref={href(locale, "consultation")}
              consultationLabel={dict.common.bookConsultation}
            />
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div data-reveal style={delay(100)} className="card p-7 sm:p-8">
              <h2 className="eyebrow">{q.stepsTitle}</h2>
              <ol className="mt-6 space-y-6">
                {q.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-[0.65rem]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div data-reveal style={delay(180)} className="card p-7 sm:p-8">
              <Icon name="calendar" className="size-5 text-accent" />
              <h2 className="mt-5 text-lg font-medium tracking-tight">{q.bookTitle}</h2>
              <p className="mt-2 text-sm text-muted">{q.bookText}</p>
              <ButtonLink href={href(locale, "consultation")} variant="secondary" className="mt-6 w-full" icon="calendar">
                {dict.common.bookConsultation}
              </ButtonLink>
            </div>

            {(email || phone) && (
              <div data-reveal style={delay(240)} className="card p-7 sm:p-8">
                <h2 className="eyebrow">{q.contactTitle}</h2>
                <ul className="mt-5 space-y-3 text-sm">
                  {email && (
                    <li>
                      <a href={`mailto:${email}`} className="flex items-center gap-3 text-muted hover:text-fg">
                        <Icon name="mail" className="size-4" /> {email}
                      </a>
                    </li>
                  )}
                  {phone && (
                    <li>
                      <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-3 text-muted hover:text-fg">
                        <Icon name="phone" className="size-4" /> {phone}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}

            <p className="flex items-start gap-2 px-2 text-xs leading-relaxed text-subtle">
              <Icon name="shield" className="mt-0.5 size-4 shrink-0" />
              {q.privacyNote}
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
