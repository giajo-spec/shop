import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { QuoteView } from "@/components/views/QuoteView";

// French/English URLs differ: this route only exists in "fr" (see lib/i18n.ts).

export async function generateMetadata({ params }: PageProps<"/[locale]/soumission">): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "fr") return {};
  const dict = getDictionary(locale);
  return pageMetadata(locale, "quote", dict.pages.quote.meta);
}

export default async function Page({ params }: PageProps<"/[locale]/soumission">) {
  const { locale } = await params;
  if (locale !== "fr") notFound();
  return <QuoteView locale={locale} />;
}
