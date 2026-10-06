import Link from "next/link";
import type { Project } from "@/content/projects";
import { projectHref, type Locale } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";
import { ProjectMockup } from "@/components/visuals/ProjectMockup";

export type ProjectCardLabels = {
  prototype: string;
  viewProject: string;
  visitSite: string;
  screenshotPlaceholder: string;
  sectors: Record<string, string>;
};

export function ProjectCard({
  project,
  locale,
  labels,
  index = 0,
}: {
  project: Project;
  locale: Locale;
  labels: ProjectCardLabels;
  index?: number;
}) {
  const c = project.content[locale];
  const url = projectHref(locale, project.slug);

  return (
    <article className="group relative flex flex-col">
      <Link href={url} aria-label={`${labels.viewProject} — ${c.name}`} className="block rounded-2xl border border-line bg-surface p-3 transition-colors duration-500 hover:border-line-strong sm:p-4">
        <ProjectMockup
          src={project.cover}
          alt={c.name}
          placeholderLabel={labels.screenshotPlaceholder}
          variant={index}
          sizes="(min-width: 1024px) 45vw, (min-width: 640px) 90vw, 100vw"
        />
      </Link>

      <div className="mt-6 flex flex-1 flex-col px-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-subtle">{labels.sectors[project.sector]}</span>
          <span className="text-subtle" aria-hidden="true">·</span>
          {project.status === "prototype" ? (
            <span className="rounded-full border border-line-strong px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">
              {labels.prototype}
            </span>
          ) : (
            <span className="font-mono text-[0.68rem] text-subtle">{project.year}</span>
          )}
        </div>
        <h3 className="mt-3 text-2xl font-medium tracking-tight">
          <Link href={url} className="link-underline">
            {c.name}
          </Link>
        </h3>
        <p className="mt-2 leading-relaxed text-muted">{c.summary}</p>
        <div className="mt-5 flex flex-wrap items-center gap-5">
          <Link href={url} className="inline-flex items-center gap-2 text-[0.9rem] font-medium text-fg">
            {labels.viewProject}
            <Icon name="arrowRight" className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[0.9rem] text-muted hover:text-fg">
              {labels.visitSite}
              <Icon name="arrowUpRight" className="size-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
