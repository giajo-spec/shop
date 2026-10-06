import type { Locale } from "@/lib/i18n";
import type { SectorOption } from "@/lib/quote-schema";

/**
 * PORTFOLIO — add a project by appending an object to `projects`.
 *
 * Images: drop screenshots in /public/portfolio/<slug>/ (WebP or AVIF, ~1600px wide)
 * and reference them in `cover` and `gallery[].src`. Any missing `src` renders a
 * clearly labelled placeholder mockup.
 *
 * `liveUrl`: leave undefined while the project is a prototype. Once online, set it
 * and switch `status` to "live" — a "Visit website" button appears automatically.
 */
export type ServiceKey = "websites" | "seo" | "reviews";

type LocalizedProjectContent = {
  name: string;
  summary: string;
  challenge: string;
  approach: string;
  result: string;
};

export type Project = {
  slug: string;
  sector: SectorOption;
  year: string;
  status: "prototype" | "live";
  liveUrl?: string;
  services: ServiceKey[];
  cover?: string;
  gallery: { src?: string; alt: Record<Locale, string> }[];
  content: Record<Locale, LocalizedProjectContent>;
};

// TODO(contenu) : remplacer ces projets d’exemple par vos vrais projets.
const placeholderContent = (n: string): Record<Locale, LocalizedProjectContent> => ({
  fr: {
    name: `Projet ${n}`,
    summary: "[À compléter] Courte description du projet : type d’entreprise, objectif et ce qui a été livré.",
    challenge: "[À compléter] Le contexte du client et le problème à résoudre : image dépassée, manque de demandes, visibilité, etc.",
    approach: "[À compléter] Les choix de stratégie, de design et de technologie faits pour répondre au défi.",
    result: "[À compléter] Ce qui a été livré : pages, fonctionnalités, intégrations. Ne mentionnez que des résultats réels et vérifiables.",
  },
  en: {
    name: `Project ${n}`,
    summary: "[To complete] Short project description: type of business, goal and what was delivered.",
    challenge: "[To complete] The client’s context and the problem to solve: outdated image, few leads, visibility, etc.",
    approach: "[To complete] The strategy, design and technology choices made to meet the challenge.",
    result: "[To complete] What was delivered: pages, features, integrations. Only mention real, verifiable results.",
  },
});

const placeholderGallery = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    alt: { fr: `Capture d’écran ${i + 1}`, en: `Screenshot ${i + 1}` },
  }));

export const projects: Project[] = [
  {
    slug: "projet-01",
    sector: "professional",
    year: "2026",
    status: "prototype",
    services: ["websites", "seo"],
    gallery: placeholderGallery(3),
    content: placeholderContent("01"),
  },
  {
    slug: "projet-02",
    sector: "restaurant",
    year: "2026",
    status: "prototype",
    services: ["websites", "reviews"],
    gallery: placeholderGallery(3),
    content: placeholderContent("02"),
  },
  {
    slug: "projet-03",
    sector: "health",
    year: "2026",
    status: "prototype",
    services: ["websites"],
    gallery: placeholderGallery(3),
    content: placeholderContent("03"),
  },
  {
    slug: "projet-04",
    sector: "construction",
    year: "2026",
    status: "prototype",
    services: ["websites", "seo", "reviews"],
    gallery: placeholderGallery(3),
    content: placeholderContent("04"),
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
