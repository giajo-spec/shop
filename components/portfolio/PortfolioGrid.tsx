"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { ProjectCard, type ProjectCardLabels } from "./ProjectCard";

/** Portfolio grid with sector filters (filters only appear when 2+ sectors exist). */
export function PortfolioGrid({
  projects,
  locale,
  labels,
  filterLabel,
  allLabel,
  emptyLabel,
}: {
  projects: Project[];
  locale: Locale;
  labels: ProjectCardLabels;
  filterLabel: string;
  allLabel: string;
  emptyLabel: string;
}) {
  const [active, setActive] = useState<string>("all");
  const sectors = useMemo(() => Array.from(new Set(projects.map((p) => p.sector))), [projects]);
  const visible = active === "all" ? projects : projects.filter((p) => p.sector === active);

  return (
    <div>
      {sectors.length > 1 && (
        <div role="group" aria-label={filterLabel} className="scrollbar-none -mx-5 mb-12 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
          {["all", ...sectors].map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={active === s}
              onClick={() => setActive(s)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors duration-300",
                active === s ? "border-fg bg-fg text-ink" : "border-line text-muted hover:border-line-strong hover:text-fg",
              )}
            >
              {s === "all" ? allLabel : labels.sectors[s]}
            </button>
          ))}
        </div>
      )}

      {visible.length ? (
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2" aria-live="polite">
          {visible.map((project) => (
            <div key={project.slug} className="animate-[fade-up_0.7s_cubic-bezier(0.16,1,0.3,1)_both]">
              <ProjectCard project={project} locale={locale} labels={labels} index={projects.indexOf(project)} />
            </div>
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-muted">{emptyLabel}</p>
      )}
    </div>
  );
}
