import { getDictionary } from "@/content/dictionaries";
import { projects } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { crumbs, projectLabels } from "./shared";

export function PortfolioView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const p = dict.pages.portfolio;
  const trail = crumbs(locale, dict, [{ key: "portfolio", name: dict.nav.portfolio }]);

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero eyebrow={p.eyebrow} title={p.title} lead={p.lead} crumbs={trail} breadcrumbLabel={dict.common.breadcrumb} />
      <Section className="!pt-4">
        <div className="container-x">
          <PortfolioGrid
            projects={projects}
            locale={locale}
            labels={projectLabels(dict)}
            filterLabel={p.filterLabel}
            allLabel={p.filterAll}
            emptyLabel={p.empty}
          />
          {projects.some((pr) => pr.status === "prototype") && (
            <p className="mt-20 max-w-2xl border-l border-line-strong pl-4 text-sm leading-relaxed text-subtle">{p.prototypeNote}</p>
          )}
        </div>
      </Section>
      <CtaBanner locale={locale} dict={dict} />
    </>
  );
}
