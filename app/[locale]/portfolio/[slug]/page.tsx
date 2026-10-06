import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { isLocale, projectHref } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { ProjectView } from "@/components/views/ProjectView";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/portfolio/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};
  const c = project.content[locale];
  return buildMetadata({
    locale,
    title: c.name,
    description: c.summary,
    paths: { fr: projectHref("fr", slug), en: projectHref("en", slug) },
  });
}

export default async function Page({ params }: PageProps<"/[locale]/portfolio/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  return <ProjectView locale={locale} slug={slug} />;
}
