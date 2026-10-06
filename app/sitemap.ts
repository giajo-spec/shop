import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { href, locales, projectHref, routes, type RouteKey } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";

const priorities: Partial<Record<RouteKey, number>> = {
  home: 1,
  services: 0.9,
  websites: 0.9,
  seo: 0.9,
  reviews: 0.9,
  quote: 0.8,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = (build: (l: (typeof locales)[number]) => string) => ({
    "fr-CA": absoluteUrl(build("fr")),
    "en-CA": absoluteUrl(build("en")),
  });

  const pages = (Object.keys(routes) as RouteKey[]).flatMap((key) =>
    locales.map((locale) => ({
      url: absoluteUrl(href(locale, key)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: (priorities[key] ?? 0.6) * (locale === "fr" ? 1 : 0.9),
      alternates: { languages: languages((l) => href(l, key)) },
    })),
  );

  const caseStudies = projects.flatMap((p) =>
    locales.map((locale) => ({
      url: absoluteUrl(projectHref(locale, p.slug)),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
      alternates: { languages: languages((l) => projectHref(l, p.slug)) },
    })),
  );

  return [...pages, ...caseStudies];
}
