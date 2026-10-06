export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Localized URL map. Each page key resolves to a slug per locale, so French
 * pages get French URLs (/fr/a-propos) and English pages English ones (/en/about).
 */
export const routes = {
  home: { fr: "", en: "" },
  services: { fr: "/services", en: "/services" },
  websites: { fr: "/services/creation-site-web", en: "/services/web-design" },
  seo: { fr: "/services/seo", en: "/services/seo" },
  reviews: { fr: "/services/avis-google", en: "/services/google-reviews" },
  about: { fr: "/a-propos", en: "/about" },
  portfolio: { fr: "/portfolio", en: "/portfolio" },
  quote: { fr: "/soumission", en: "/quote" },
  consultation: { fr: "/consultation", en: "/consultation" },
  faq: { fr: "/faq", en: "/faq" },
  privacy: { fr: "/politique-de-confidentialite", en: "/privacy-policy" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

export function href(locale: Locale, key: RouteKey, hash?: string): string {
  return `/${locale}${routes[key][locale]}${hash ? `#${hash}` : ""}`;
}

export function projectHref(locale: Locale, slug: string): string {
  return `/${locale}${routes.portfolio[locale]}/${slug}`;
}

/** Returns the equivalent path in the other locale (used by the FR | EN switcher). */
export function alternatePath(pathname: string, target: Locale): string {
  const [, current, ...rest] = pathname.split("/");
  if (!current || !isLocale(current)) return `/${target}`;
  const sub = rest.length ? `/${rest.join("/")}` : "";

  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key][current] === sub) return href(target, key);
  }
  const portfolioBase = routes.portfolio[current];
  if (sub.startsWith(`${portfolioBase}/`)) {
    return projectHref(target, sub.slice(portfolioBase.length + 1));
  }
  return `/${target}`;
}
