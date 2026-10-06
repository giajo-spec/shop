/**
 * Quote request schema — shared by the client form and the API route so both
 * sides apply exactly the same rules. Values are stable IDs; labels live in the
 * dictionaries.
 */
export const serviceOptions = ["website", "seo", "reviews", "multiple"] as const;
export const budgetOptions = ["lt1000", "1000-2500", "2500-5000", "gt5000", "unknown"] as const;
export const sectorOptions = [
  "retail",
  "restaurant",
  "health",
  "professional",
  "construction",
  "realestate",
  "tech",
  "nonprofit",
  "other",
] as const;

export type ServiceOption = (typeof serviceOptions)[number];
export type BudgetOption = (typeof budgetOptions)[number];
export type SectorOption = (typeof sectorOptions)[number];

export type QuoteInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  sector: SectorOption | "";
  service: ServiceOption | "";
  budget: BudgetOption | "";
  objectives: string;
  message: string;
  contactConsent: boolean;
  locale: "fr" | "en";
};

export type FieldError = "required" | "email" | "phone" | "url" | "tooLong" | "tooShort" | "invalid" | "consent";
export type QuoteErrors = Partial<Record<keyof QuoteInput, FieldError>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,25}$/;

const LIMITS = {
  name: 120,
  company: 160,
  email: 200,
  phone: 25,
  website: 300,
  objectives: 2000,
  message: 4000,
} as const;

export function normalizeUrl(value: string): string {
  const v = value.trim();
  if (!v) return "";
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return (url.protocol === "http:" || url.protocol === "https:") && url.hostname.includes(".");
  } catch {
    return false;
  }
}

/** Coerces unknown input (FormData / JSON) into a trimmed QuoteInput. */
export function parseQuoteInput(raw: Record<string, unknown>): QuoteInput {
  const str = (key: string) => (typeof raw[key] === "string" ? (raw[key] as string).trim() : "");
  return {
    name: str("name"),
    company: str("company"),
    email: str("email").toLowerCase(),
    phone: str("phone"),
    website: normalizeUrl(str("website")),
    sector: str("sector") as QuoteInput["sector"],
    service: str("service") as QuoteInput["service"],
    budget: str("budget") as QuoteInput["budget"],
    objectives: str("objectives"),
    message: str("message"),
    contactConsent: raw.contactConsent === true || raw.contactConsent === "on" || raw.contactConsent === "true",
    locale: raw.locale === "en" ? "en" : "fr",
  };
}

export function validateQuote(input: QuoteInput): QuoteErrors {
  const errors: QuoteErrors = {};

  if (!input.name) errors.name = "required";
  else if (input.name.length < 2) errors.name = "tooShort";

  if (!input.email) errors.email = "required";
  else if (!EMAIL_RE.test(input.email)) errors.email = "email";

  if (input.phone && !PHONE_RE.test(input.phone)) errors.phone = "phone";
  if (input.website && !isValidUrl(input.website)) errors.website = "url";

  if (!input.service) errors.service = "required";
  else if (!serviceOptions.includes(input.service)) errors.service = "invalid";

  if (input.sector && !sectorOptions.includes(input.sector)) errors.sector = "invalid";
  if (input.budget && !budgetOptions.includes(input.budget)) errors.budget = "invalid";

  if (!input.message) errors.message = "required";
  else if (input.message.length < 10) errors.message = "tooShort";

  if (!input.contactConsent) errors.contactConsent = "consent";

  for (const [key, max] of Object.entries(LIMITS) as [keyof typeof LIMITS, number][]) {
    if (!errors[key] && input[key].length > max) errors[key] = "tooLong";
  }

  return errors;
}

/** Spam protection fields — never shown to humans. */
export const HONEYPOT_FIELD = "company_website";
export const STARTED_AT_FIELD = "form_started_at";
export const MIN_FILL_TIME_MS = 3000;
