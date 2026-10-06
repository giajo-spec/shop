import "server-only";
import { notionConfig } from "./env";
import type { QuoteInput } from "./quote-schema";

/**
 * Exact property names expected in the Notion database.
 * Rename here if you rename a column in Notion (types must match — see README).
 */
export const NOTION_PROPERTIES = {
  name: "Nom", // Title
  company: "Entreprise", // Text
  email: "Courriel", // Email
  phone: "Téléphone", // Phone
  website: "Site web", // URL
  sector: "Secteur", // Select
  service: "Service", // Select
  budget: "Budget", // Select
  objectives: "Objectifs", // Text
  message: "Message", // Text
  contactConsent: "Consentement contact", // Checkbox
  language: "Langue", // Select
  status: "Statut", // Select
} as const;

/** Values written to Select properties — always in French for a consistent pipeline. */
const SELECT_LABELS = {
  service: {
    website: "Création de site web",
    seo: "SEO",
    reviews: "Gestion des avis Google",
    multiple: "Plusieurs services",
  },
  budget: {
    lt1000: "Moins de 1 000 $",
    "1000-2500": "1 000 $ – 2 500 $",
    "2500-5000": "2 500 $ – 5 000 $",
    gt5000: "5 000 $ et plus",
    unknown: "Je ne sais pas encore",
  },
  sector: {
    retail: "Commerce de détail",
    restaurant: "Restauration et hôtellerie",
    health: "Santé et bien-être",
    professional: "Services professionnels",
    construction: "Construction et rénovation",
    realestate: "Immobilier",
    tech: "Technologie",
    nonprofit: "OBNL",
    other: "Autre",
  },
} as const;

const text = (content: string) => ({
  rich_text: content ? [{ type: "text", text: { content: content.slice(0, 2000) } }] : [],
});
const select = (name: string) => (name ? { select: { name } } : { select: null });

export const isNotionConfigured = () => Boolean(notionConfig.apiKey && notionConfig.databaseId);

export async function createQuoteInNotion(input: QuoteInput): Promise<void> {
  const P = NOTION_PROPERTIES;
  const properties = {
    [P.name]: { title: [{ type: "text", text: { content: input.name } }] },
    [P.company]: text(input.company),
    [P.email]: { email: input.email },
    [P.phone]: { phone_number: input.phone || null },
    [P.website]: { url: input.website || null },
    [P.sector]: select(input.sector ? SELECT_LABELS.sector[input.sector] : ""),
    [P.service]: select(input.service ? SELECT_LABELS.service[input.service] : ""),
    [P.budget]: select(input.budget ? SELECT_LABELS.budget[input.budget] : ""),
    [P.objectives]: text(input.objectives),
    [P.message]: text(input.message),
    [P.contactConsent]: { checkbox: input.contactConsent },
    [P.language]: select(input.locale.toUpperCase()),
    [P.status]: select("Nouveau"),
  };

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${notionConfig.apiKey}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({ parent: { database_id: notionConfig.databaseId }, properties }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Notion API ${res.status}: ${detail.slice(0, 500)}`);
  }
}
