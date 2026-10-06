import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { AboutView } from "@/components/views/AboutView";

// French/English URLs differ: this route only exists in "fr" (see lib/i18n.ts).

export async function generateMetadata({ params }: PageProps<"/[locale]/a-propos">): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "fr") return {};
  const dict = getDictionary(locale);
  return pageMetadata(locale, "about", dict.pages.about.meta);
}

export default async function Page({ params }: PageProps<"/[locale]/a-propos">) {
  const { locale } = await params;
  if (locale !== "fr") notFound();
  return <AboutView locale={locale} />;
}
