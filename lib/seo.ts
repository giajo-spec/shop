import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { getDictionary } from "@/content/dictionaries";
import { isIndexable } from "./env";
import { href, locales, type Locale, type RouteKey } from "./i18n";

const ogLocale: Record<Locale, string> = { fr: "fr_CA", en: "en_CA" };

export const absoluteUrl = (path: string) => `${siteConfig.url}${path}`;

type PageMetaInput = {
  locale: Locale;
  title: string;
  description: string;
  /** Localized paths for this page in every locale (for canonical + hreflang). */
  paths: Record<Locale, string>;
  /** Home page uses the full title without the "| Nexora Digital" template. */
  absoluteTitle?: boolean;
};

export function buildMetadata({ locale, title, description, paths, absoluteTitle }: PageMetaInput): Metadata {
  const dict = getDictionary(locale);
  const canonical = absoluteUrl(paths[locale]);
  const image = { url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: dict.meta.ogTagline };
  const languages = Object.fromEntries(locales.map((l) => [ogLocale[l].replace("_", "-"), absoluteUrl(paths[l])]));

  return {
    title: absoluteTitle ? { absolute: `${dict.meta.siteName} — ${title}` } : title,
    description,
    alternates: {
      canonical,
      languages: { ...languages, "x-default": absoluteUrl(paths.fr) },
    },
    openGraph: {
      type: "website",
      siteName: dict.meta.siteName,
      title: absoluteTitle ? `${dict.meta.siteName} — ${title}` : `${title} | ${dict.meta.siteName}`,
      description,
      url: canonical,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    robots: isIndexable
      ? { index: true, follow: true }
      : { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}

export function routePaths(key: RouteKey): Record<Locale, string> {
  return { fr: href("fr", key), en: href("en", key) };
}

/** Shorthand for static pages keyed in the route map. */
export function pageMetadata(locale: Locale, key: RouteKey, meta: { title: string; description: string }) {
  return buildMetadata({ locale, ...meta, paths: routePaths(key), absoluteTitle: key === "home" });
}
