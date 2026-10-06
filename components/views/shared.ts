import type { Dictionary } from "@/content/dictionaries";
import type { ProjectCardLabels } from "@/components/portfolio/ProjectCard";
import { href, type Locale, type RouteKey } from "@/lib/i18n";

export function projectLabels(dict: Dictionary): ProjectCardLabels {
  return {
    prototype: dict.common.prototype,
    viewProject: dict.common.viewProject,
    visitSite: dict.common.visitSite,
    screenshotPlaceholder: dict.common.screenshotPlaceholder,
    sectors: dict.form.options.sector,
  };
}

/** Breadcrumb trail: Home › …parents › current. */
export function crumbs(locale: Locale, dict: Dictionary, trail: { key: RouteKey; name: string }[]) {
  return [{ name: dict.nav.home, path: href(locale, "home") }, ...trail.map((t) => ({ name: t.name, path: href(locale, t.key) }))];
}
