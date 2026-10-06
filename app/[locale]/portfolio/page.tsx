import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { PortfolioView } from "@/components/views/PortfolioView";

export async function generateMetadata({ params }: PageProps<"/[locale]/portfolio">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata(locale, "portfolio", dict.pages.portfolio.meta);
}

export default async function Page({ params }: PageProps<"/[locale]/portfolio">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PortfolioView locale={locale} />;
}
