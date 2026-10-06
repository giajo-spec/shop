import { getDictionary } from "@/content/dictionaries";
import { projects } from "@/content/projects";
import { href, type Locale } from "@/lib/i18n";
import { delay } from "@/lib/style";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Problems } from "@/components/sections/Problems";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { ReviewsHighlight } from "@/components/sections/ReviewsHighlight";
import { Process } from "@/components/sections/Process";
import { WhyNexora } from "@/components/sections/WhyNexora";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { projectLabels } from "./shared";

export function HomeView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const h = dict.home;
  const faqPreview = dict.faq.flatMap((c) => c.items).slice(0, 5);
  const labels = projectLabels(dict);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Marquee items={h.marquee} />
      <Problems dict={dict} />

      <Section id="services" labelledBy="services-title">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <SectionHeader id="services-title" eyebrow={h.services.eyebrow} title={h.services.title} lead={h.services.lead} />
            <div data-reveal className="shrink-0">
              <ButtonLink href={href(locale, "services")} variant="secondary">
                {dict.common.seeServices}
              </ButtonLink>
            </div>
          </div>
          <div className="mt-16 lg:mt-20">
            <ServiceCards locale={locale} dict={dict} />
          </div>
        </div>
      </Section>

      <ReviewsHighlight locale={locale} dict={dict} />
      <Process dict={dict} />
      <WhyNexora locale={locale} dict={dict} />

      <Section tone="surface" labelledBy="portfolio-title">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <SectionHeader id="portfolio-title" eyebrow={h.portfolio.eyebrow} title={h.portfolio.title} lead={h.portfolio.lead} />
            <div data-reveal className="shrink-0">
              <ButtonLink href={href(locale, "portfolio")} variant="secondary">
                {dict.common.viewPortfolio}
              </ButtonLink>
            </div>
          </div>
          <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-20">
            {projects.slice(0, 2).map((project, i) => (
              <div key={project.slug} data-reveal style={delay(i * 120)}>
                <ProjectCard project={project} locale={locale} labels={labels} index={i} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section labelledBy="faq-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader id="faq-title" eyebrow={h.faq.eyebrow} title={h.faq.title} />
            <div data-reveal className="mt-10">
              <ButtonLink href={href(locale, "faq")} variant="secondary">
                {dict.common.allFaq}
              </ButtonLink>
            </div>
          </div>
          <div data-reveal className="lg:col-span-7">
            <FaqAccordion items={faqPreview} />
          </div>
        </div>
      </Section>

      <CtaBanner locale={locale} dict={dict} />
    </>
  );
}
