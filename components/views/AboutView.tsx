import { getDictionary } from "@/content/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { delay } from "@/lib/style";
import { breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { crumbs } from "./shared";

const pillarIcons: IconName[] = ["pen", "code", "compass", "chart"];

export function AboutView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const a = dict.pages.about;
  const trail = crumbs(locale, dict, [{ key: "about", name: dict.nav.about }]);

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        eyebrow={a.eyebrow}
        title={a.title}
        lead={a.lead}
        crumbs={trail}
        breadcrumbLabel={dict.common.breadcrumb}
        actions={
          <>
            <ButtonLink href={href(locale, "quote")} size="lg">
              {dict.common.requestQuote}
            </ButtonLink>
            <ButtonLink href={href(locale, "portfolio")} size="lg" variant="secondary">
              {dict.common.viewPortfolio}
            </ButtonLink>
          </>
        }
      />

      {/* Four disciplines — oversized typographic band */}
      <section aria-label={a.pillarsTitle} className="border-y border-line">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4">
          {a.pillars.map((p, i) => (
            <p
              key={p.title}
              data-reveal="fade"
              style={delay(i * 100)}
              className="border-line py-8 text-center text-2xl font-medium tracking-tight text-white/80 odd:border-r sm:py-10 sm:text-4xl lg:border-r lg:last:border-r-0"
            >
              {p.title}
            </p>
          ))}
        </div>
      </section>

      <Section labelledBy="story-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p data-reveal className="eyebrow flex items-center gap-3">
              <span className="inline-block size-1.5 rounded-full bg-accent" aria-hidden="true" />
              {a.storyTitle}
            </p>
          </div>
          <div className="space-y-8 lg:col-span-8">
            {a.story.map((paragraph, i) => (
              <p
                key={i}
                id={i === 0 ? "story-title" : undefined}
                data-reveal
                style={delay(i * 80)}
                className={i === 0 ? "text-2xl font-medium leading-snug tracking-tight sm:text-[2rem]" : "text-lg leading-relaxed text-muted"}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="pillars-title">
        <div className="container-x">
          <SectionHeader id="pillars-title" eyebrow={a.pillars.map((p) => p.title).join(" · ")} title={a.pillarsTitle} />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {a.pillars.map((p, i) => (
              <li key={p.title} data-reveal style={delay(i * 90)} className="card spotlight p-8">
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-line bg-white/[0.03]">
                    <Icon name={pillarIcons[i]} className="size-5" />
                  </span>
                  <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-10 text-2xl font-medium tracking-tight">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="principles-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="principles-title" data-reveal className="display text-[2.15rem] sm:text-5xl">
              {a.principlesTitle}
            </h2>
          </div>
          <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-8">
            {a.principles.map((p, i) => (
              <div key={p.title} data-reveal style={delay((i % 2) * 90)} className="border-t border-line pt-6">
                <dt className="text-xl font-medium tracking-tight">{p.title}</dt>
                <dd className="mt-3 leading-relaxed text-muted">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Process dict={dict} />
      <CtaBanner locale={locale} dict={dict} />
    </>
  );
}
