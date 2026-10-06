import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { ServiceDetailView } from "@/components/views/ServiceDetailView";

// French/English URLs differ: this route only exists in "fr" (see lib/i18n.ts).

export async function generateMetadata({ params }: PageProps<"/[locale]/services/avis-google">): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "fr") return {};
  const dict = getDictionary(locale);
  return pageMetadata(locale, "reviews", dict.pages.reviews.meta);
}

export default async function Page({ params }: PageProps<"/[locale]/services/avis-google">) {
  const { locale } = await params;
  if (locale !== "fr") notFound();
  return <ServiceDetailView locale={locale} service="reviews" />;
}
