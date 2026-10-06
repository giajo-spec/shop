/**
 * Central business configuration.
 * Leave a value empty ("") and every component that uses it hides it automatically.
 * Fill these in before the public launch.
 */
type SiteConfig = {
  name: string;
  shortName: string;
  url: string;
  calendlyUrl: string;
  plausibleDomain: string;
  contact: {
    email: string;
    phone: string;
    address: { street: string; city: string; region: string; postalCode: string; country: string };
  };
  social: { linkedin: string; instagram: string; facebook: string };
  privacyOfficer: { name: string; title: string; email: string };
  legal: { companyName: string; privacyLastUpdated: string };
  areaServed: string[];
};

export const siteConfig: SiteConfig = {
  name: "Nexora Digital",
  shortName: "Nexora",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  // Falls back to the agency Calendly page; set NEXT_PUBLIC_CALENDLY_URL="" to disable booking.
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/dawoodijajo01",
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "",

  contact: {
    email: "", // ex. bonjour@nexoradigital.com
    phone: "", // ex. +1 514 000-0000
    address: {
      street: "",
      city: "",
      region: "",
      postalCode: "",
      country: "",
    },
  },

  social: {
    linkedin: "",
    instagram: "",
    facebook: "",
  },

  /** Loi 25 — person in charge of the protection of personal information. */
  privacyOfficer: {
    name: "", // ex. Prénom Nom
    title: "",
    email: "",
  },

  legal: {
    companyName: "", // Raison sociale exacte, ex. Nexora Digital inc.
    privacyLastUpdated: "2026-10-06",
  },

  /** Areas served — used in structured data, not displayed as an address. */
  areaServed: ["Montréal", "Québec", "Canada"],
};

export const hasContactInfo = Boolean(siteConfig.contact.email || siteConfig.contact.phone);

export const socialLinks = (Object.entries(siteConfig.social) as [string, string][])
  .filter(([, url]) => url)
  .map(([network, url]) => ({ network, url }));
