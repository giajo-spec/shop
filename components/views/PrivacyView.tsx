import Link from "next/link";
import { getDictionary } from "@/content/dictionaries";
import { getPrivacyPolicy } from "@/content/legal/privacy";
import { siteConfig } from "@/content/site";
import { href, type Locale } from "@/lib/i18n";

export function PrivacyView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const policy = getPrivacyPolicy(locale);
  const date = new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(siteConfig.legal.privacyLastUpdated),
  );

  return (
    <article className="pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div className="container-x max-w-3xl">
        <nav aria-label={dict.common.breadcrumb} className="mb-10 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
          <Link href={href(locale, "home")} className="hover:text-fg">
            {dict.nav.home}
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page" className="text-muted">
            {dict.pages.privacy.title}
          </span>
        </nav>
        <h1 className="display text-[2.5rem] sm:text-6xl">{dict.pages.privacy.title}</h1>
        <p className="mt-6 font-mono text-xs text-subtle">
          {dict.pages.privacy.updated} <time dateTime={siteConfig.legal.privacyLastUpdated}>{date}</time>
        </p>
        <div className="prose-legal mt-12">
          <p className="!text-lg !text-fg/85">{policy.intro}</p>
          {policy.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((para) => <p key={para}>{para}</p>)}
              {section.list && (
                <ul>
                  {section.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
