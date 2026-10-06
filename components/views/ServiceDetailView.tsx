import { getDictionary } from "@/content/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { delay } from "@/lib/style";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { serviceIcons } from "@/components/sections/ServiceCards";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteVisual } from "@/components/visuals/SiteVisual";
import { SearchVisual } from "@/components/visuals/SearchVisual";
import { ReviewsDashboard } from "@/components/visuals/ReviewsDashboard";
import { crumbs } from "./shared";

type ServiceKey = "websites" | "seo" | "reviews";

const quoteService: Record<ServiceKey, string> = { websites: "website", seo: "seo", reviews: "reviews" };
const subscriptionIcons: IconName[] = ["message", "qr", "chart"];

export function ServiceDetailView({ locale, service }: { locale: Locale; service: ServiceKey }) {
  const dict = getDictionary(locale);
  const s = dict.services[service];
  const page = dict.pages[service];
  const trail = crumbs(locale, dict, [
    { key: "services", name: dict.nav.services },
    { key: service, name: s.name },
  ]);
  const faqItems = [
    ...(dict.faq.find((c) => c.id === service)?.items ?? []),
    ...(service === "reviews" ? [dict.faq[0].items[1]] : [dict.faq[0].items[0]]),
  ];
  const quoteUrl = `${href(locale, "quote")}?service=${quoteService[service]}`;

  const aside =
    service === "websites" ? (
      <SiteVisual label={dict.common.illustration} />
    ) : service === "seo" ? (
      <SearchVisual query={dict.pages.seo.visualQuery} you={dict.pages.seo.visualYou} label={dict.common.illustration} />
    ) : (
      <ReviewsDashboard d={dict.home.reviews.dashboard} illustration={dict.common.illustration} />
    );

  return (
    <>
      <JsonLd data={[breadcrumbSchema(trail), serviceSchema(locale, service, s.name, page.meta.description)]} />
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        crumbs={trail}
        breadcrumbLabel={dict.common.breadcrumb}
        aside={aside}
        actions={
          <>
            <ButtonLink href={quoteUrl} size="lg">
              {s.cta}
            </ButtonLink>
            <ButtonLink href={href(locale, "consultation")} size="lg" variant="secondary" icon="calendar">
              {dict.common.talkToExpert}
            </ButtonLink>
          </>
        }
      />

      {/* Reviews: the three subscription pillars */}
      {service === "reviews" && (
        <Section className="!pt-12" labelledBy="subscription-title">
          <div className="container-x">
            <SectionHeader id="subscription-title" eyebrow={dict.common.monthly} title={dict.pages.reviews.includedTitle} lead={dict.pages.reviews.includedLead} />
            <ul className="mt-14 grid gap-4 lg:grid-cols-3">
              {dict.pages.reviews.subscription.map((item, i) => (
                <li key={item.title} data-reveal style={delay(i * 100)} className="card spotlight p-8 sm:p-10">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent-soft text-accent">
                      <Icon name={subscriptionIcons[i]} className="size-5" />
                    </span>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">{dict.common.included}</span>
                  </div>
                  <h3 className="mt-10 text-2xl font-medium tracking-tight">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* Features */}
      <Section tone={service === "reviews" ? "surface" : "dark"} className={service === "reviews" ? "" : "!pt-12"} labelledBy="included-title">
        <div className="container-x">
          <SectionHeader
            id="included-title"
            eyebrow={s.name}
            title={service === "reviews" ? dict.pages.reviews.benefitsTitle : page.includedTitle}
            lead={service === "reviews" ? undefined : page.includedLead}
          />
          <ul className={`mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 ${s.features.length % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {s.features.map((f, i) => (
              <li key={f.title} data-reveal="fade" style={delay((i % 4) * 70)} className="group bg-ink p-7 transition-colors duration-500 hover:bg-surface-2 sm:p-8">
                <span className="font-mono text-xs text-subtle transition-colors group-hover:text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 text-lg font-medium tracking-tight">{f.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Approach */}
      <Section tone={service === "reviews" ? "dark" : "surface"} labelledBy="approach-title">
        <div className="container-x">
          <SectionHeader id="approach-title" eyebrow={dict.home.process.eyebrow} title={page.approachTitle} />
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {page.approach.map((step, i) => (
              <li key={step.title} data-reveal style={delay(i * 100)} className="relative">
                <div className="flex items-center gap-4">
                  <span className="flex size-11 items-center justify-center rounded-full border border-line-strong font-mono text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < page.approach.length - 1 && <span className="hidden h-px flex-1 bg-gradient-to-r from-line-strong to-transparent lg:block" aria-hidden="true" />}
                </div>
                <h3 className="mt-7 text-xl font-medium tracking-tight">{step.title}</h3>
                <p className="mt-2.5 leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Reviews: ethics commitment */}
      {service === "reviews" && (
        <Section tone="light" labelledBy="ethics-title">
          <div className="container-x grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeader id="ethics-title" tone="light" eyebrow={dict.pages.reviews.ethicsEyebrow} title={dict.pages.reviews.ethicsTitle} lead={dict.pages.reviews.ethicsLead} />
            </div>
            <ul className="space-y-3 lg:col-span-5 lg:col-start-8">
              {dict.pages.reviews.ethics.map((rule, i) => (
                <li key={rule} data-reveal style={delay(i * 80)} className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-5 text-neutral-800">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-strong text-white">
                    <Icon name="shield" className="size-4" />
                  </span>
                  <span className="pt-1 font-medium">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* Outcomes */}
      <Section labelledBy="outcomes-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="outcomes-title" data-reveal className="display text-[2.15rem] sm:text-5xl">
              {page.outcomesTitle}
            </h2>
            <ul className="mt-10 border-t border-line">
              {page.outcomes.map((o, i) => (
                <li key={o} data-reveal style={delay(i * 60)} className="flex items-start gap-4 border-b border-line py-5 text-lg text-muted">
                  <Icon name="check" className="mt-1 size-5 shrink-0 text-accent" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <aside data-reveal style={delay(120)} className="lg:col-span-4 lg:col-start-9">
            <div className="card sticky top-28 p-8">
              <span className="flex size-12 items-center justify-center rounded-2xl border border-line bg-white/[0.03]">
                <Icon name={serviceIcons[service]} className="size-5" />
              </span>
              <p className="mt-8 text-2xl font-medium tracking-tight">{dict.footer.ctaTitle}</p>
              <p className="mt-3 leading-relaxed text-muted">{dict.cta.lead}</p>
              <div className="mt-8 flex flex-col gap-3">
                <ButtonLink href={quoteUrl}>{dict.common.requestQuote}</ButtonLink>
                <ButtonLink href={href(locale, "consultation")} variant="secondary" icon="calendar">
                  {dict.common.bookConsultation}
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="surface" labelledBy="service-faq-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="service-faq-title" data-reveal className="display text-[2rem] sm:text-4xl">
              {page.faqTitle}
            </h2>
            <div data-reveal className="mt-8">
              <ButtonLink href={href(locale, "faq")} variant="secondary">
                {dict.common.allFaq}
              </ButtonLink>
            </div>
          </div>
          <div data-reveal className="lg:col-span-8">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </Section>

      <CtaBanner locale={locale} dict={dict} />
    </>
  );
}
