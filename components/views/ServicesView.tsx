import Link from "next/link";
import { getDictionary } from "@/content/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { delay } from "@/lib/style";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { serviceIcons, serviceOrder } from "@/components/sections/ServiceCards";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { crumbs } from "./shared";

export function ServicesView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const p = dict.pages.services;
  const trail = crumbs(locale, dict, [{ key: "services", name: dict.nav.services }]);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          ...serviceOrder.map((key) => serviceSchema(locale, key, dict.services[key].name, dict.services[key].short)),
        ]}
      />
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        lead={p.lead}
        crumbs={trail}
        breadcrumbLabel={dict.common.breadcrumb}
        actions={
          <>
            <ButtonLink href={href(locale, "quote")} size="lg">
              {dict.common.getQuote}
            </ButtonLink>
            <ButtonLink href={href(locale, "consultation")} size="lg" variant="secondary" icon="calendar">
              {dict.common.talkToExpert}
            </ButtonLink>
          </>
        }
      />

      <Section className="!pt-8">
        <div className="container-x space-y-6">
          {serviceOrder.map((key, i) => {
            const s = dict.services[key];
            return (
              <article key={key} data-reveal style={delay(i * 60)} className="card spotlight grid gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-4">
                    <span className="flex size-12 items-center justify-center rounded-2xl border border-line bg-white/[0.03]">
                      <Icon name={serviceIcons[key]} className="size-5" />
                    </span>
                    <span className="font-mono text-xs text-subtle">{s.index}</span>
                    {key === "reviews" && (
                      <span className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-accent">
                        {dict.common.monthly}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-8 text-3xl font-medium tracking-tight sm:text-4xl">{s.name}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted">{s.title}</p>
                  <p className="mt-3 leading-relaxed text-subtle">{s.short}</p>
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <ButtonLink href={href(locale, key)}>{s.cta}</ButtonLink>
                    <Link href={href(locale, "quote")} className="link-underline text-sm text-muted hover:text-fg">
                      {dict.common.getQuote}
                    </Link>
                  </div>
                </div>
                <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:col-span-7">
                  {s.features.map((f) => (
                    <li key={f.title} className="bg-surface p-5 sm:p-6">
                      <p className="flex items-center gap-2 font-medium">
                        <Icon name="check" className="size-4 text-accent" />
                        {f.title}
                      </p>
                      <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{f.text}</p>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}

          <div data-reveal className="grid gap-6 rounded-3xl border border-dashed border-line-strong p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <h2 className="display text-3xl sm:text-4xl">{p.combinedTitle}</h2>
            <p className="text-lg leading-relaxed text-muted">{p.combinedText}</p>
          </div>
        </div>
      </Section>

      <Process dict={dict} />
      <CtaBanner locale={locale} dict={dict} />
    </>
  );
}
