import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { ConsultationView } from "@/components/views/ConsultationView";

export async function generateMetadata({ params }: PageProps<"/[locale]/consultation">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata(locale, "consultation", dict.pages.consultation.meta);
}

export default async function Page({ params }: PageProps<"/[locale]/consultation">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ConsultationView locale={locale} />;
}
