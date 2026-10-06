import { siteConfig, socialLinks } from "@/content/site";
import type { Dictionary } from "@/content/dictionaries";
import { absoluteUrl } from "./seo";
import { href, type Locale, type RouteKey } from "./i18n";

const orgId = () => `${siteConfig.url}/#organization`;

export function organizationSchema(locale: Locale, dict: Dictionary) {
  const { contact } = siteConfig;
  const hasAddress = Boolean(contact.address.street && contact.address.city);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": orgId(),
    name: siteConfig.name,
    url: absoluteUrl(href(locale, "home")),
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl(`/${locale}/opengraph-image`),
    description: dict.meta.defaultDescription,
    areaServed: siteConfig.areaServed.map((name) => ({ "@type": "Place", name })),
    knowsLanguage: ["fr-CA", "en-CA"],
    ...(contact.email && { email: contact.email }),
    ...(contact.phone && { telephone: contact.phone }),
    ...(hasAddress && {
      address: {
        "@type": "PostalAddress",
        streetAddress: contact.address.street,
        addressLocality: contact.address.city,
        addressRegion: contact.address.region,
        postalCode: contact.address.postalCode,
        addressCountry: contact.address.country,
      },
    }),
    ...(socialLinks.length && { sameAs: socialLinks.map((s) => s.url) }),
  };
}

export function websiteSchema(locale: Locale, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
    description: dict.meta.defaultDescription,
    publisher: { "@id": orgId() },
  };
}

export function serviceSchema(locale: Locale, key: RouteKey, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(href(locale, key)),
    provider: { "@id": orgId() },
    areaServed: siteConfig.areaServed.map((n) => ({ "@type": "Place", name: n })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
