import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { getProject, projects } from "@/content/projects";
import { href, projectHref, type Locale } from "@/lib/i18n";
import { delay } from "@/lib/style";
import { breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Section } from "@/components/ui/Section";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProjectMockup } from "@/components/visuals/ProjectMockup";

export function ProjectView({ locale, slug }: { locale: Locale; slug: string }) {
  const project = getProject(slug);
  if (!project) notFound();

  const dict = getDictionary(locale);
  const t = dict.pages.project;
  const c = project.content[locale];
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const index = projects.indexOf(project);

  const trail = [
    { name: dict.nav.home, path: href(locale, "home") },
    { name: dict.nav.portfolio, path: href(locale, "portfolio") },
    { name: c.name, path: projectHref(locale, project.slug) },
  ];

  const meta = [
    { label: t.sector, value: dict.form.options.sector[project.sector] },
    { label: t.services, value: project.services.map((s) => dict.services[s].name).join(", ") },
    { label: t.year, value: project.year },
    { label: t.status, value: project.status === "prototype" ? dict.common.prototype : "Live" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        eyebrow={dict.form.options.sector[project.sector]}
        title={c.name}
        lead={c.summary}
        crumbs={trail}
        breadcrumbLabel={dict.common.breadcrumb}
        actions={
          <>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "lg")}>
                {dict.common.visitSite}
                <Icon name="arrowUpRight" className="size-4" />
              </a>
            )}
            <ButtonLink href={href(locale, "portfolio")} variant="secondary" icon="arrowLeft" size="lg">
              {dict.common.backToPortfolio}
            </ButtonLink>
          </>
        }
      />

      <section className="pb-8">
        <div className="container-x">
          <div data-reveal="scale" className="rounded-[1.75rem] border border-line bg-surface p-3 sm:p-5">
            <ProjectMockup
              src={project.cover}
              alt={c.name}
              placeholderLabel={dict.common.screenshotPlaceholder}
              variant={index}
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
            />
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="bg-ink p-5 sm:p-6">
                <dt className="eyebrow !text-[0.62rem]">{m.label}</dt>
                <dd className="mt-2 font-medium">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section>
        <div className="container-x space-y-16">
          {[
            { title: t.challenge, text: c.challenge },
            { title: t.approach, text: c.approach },
            { title: t.result, text: c.result },
          ].map((block, i) => (
            <div key={block.title} data-reveal className="grid gap-6 border-t border-line pt-10 lg:grid-cols-12">
              <h2 className="flex items-baseline gap-4 text-2xl font-medium tracking-tight lg:col-span-4">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                {block.title}
              </h2>
              <p className="text-lg leading-relaxed text-muted lg:col-span-7 lg:col-start-6">{block.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {project.gallery.length > 0 && (
        <Section tone="surface" labelledBy="gallery-title">
          <div className="container-x">
            <h2 id="gallery-title" data-reveal className="display text-4xl sm:text-5xl">
              {t.gallery}
            </h2>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {project.gallery.map((img, i) => (
                <div key={i} data-reveal style={delay((i % 2) * 100)} className={i === 0 ? "md:col-span-2" : ""}>
                  <ProjectMockup
                    src={img.src}
                    alt={img.alt[locale]}
                    placeholderLabel={dict.common.screenshotPlaceholder}
                    variant={index + i + 1}
                    sizes={i === 0 ? "(min-width: 1280px) 1200px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                  />
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {next && next.slug !== project.slug && (
        <section className="border-y border-line">
          <Link href={projectHref(locale, next.slug)} className="group block">
            <div className="container-x flex items-center justify-between gap-6 py-14 sm:py-20">
              <div>
                <p className="eyebrow">{dict.common.nextProject}</p>
                <p className="display mt-4 text-4xl transition-colors group-hover:text-white sm:text-6xl">{next.content[locale].name}</p>
              </div>
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-line-strong transition-all duration-500 group-hover:border-accent group-hover:bg-accent-strong sm:size-20">
                <Icon name="arrowRight" className="size-5 transition-transform duration-500 group-hover:translate-x-0.5 sm:size-6" />
              </span>
            </div>
          </Link>
        </section>
      )}

      <CtaBanner locale={locale} dict={dict} title={t.ctaTitle} />
    </>
  );
}
