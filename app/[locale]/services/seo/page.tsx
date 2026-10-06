import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { ServiceDetailView } from "@/components/views/ServiceDetailView";

export async function generateMetadata({ params }: PageProps<"/[locale]/services/seo">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata(locale, "seo", dict.pages.seo.meta);
}

export default async function Page({ params }: PageProps<"/[locale]/services/seo">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ServiceDetailView locale={locale} service="seo" />;
}
