import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { PrivacyView } from "@/components/views/PrivacyView";

// French/English URLs differ: this route only exists in "en" (see lib/i18n.ts).

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy-policy">): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return {};
  const dict = getDictionary(locale);
  return pageMetadata(locale, "privacy", dict.pages.privacy.meta);
}

export default async function Page({ params }: PageProps<"/[locale]/privacy-policy">) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  return <PrivacyView locale={locale} />;
}
