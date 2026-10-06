import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import { siteConfig, socialLinks } from "@/content/site";
import { href, type Locale } from "@/lib/i18n";
import { Logo } from "@/components/brand/Logo";
import { Icon, type IconName } from "@/components/ui/Icon";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { footer, nav } = dict;
  const { contact, legal } = siteConfig;
  const year = new Date().getFullYear();

  const columns = [
    {
      title: footer.navTitle,
      links: [
        { label: nav.home, url: href(locale, "home") },
        { label: nav.portfolio, url: href(locale, "portfolio") },
        { label: nav.about, url: href(locale, "about") },
        { label: nav.faq, url: href(locale, "faq") },
      ],
    },
    {
      title: footer.servicesTitle,
      links: [
        { label: nav.servicesMenu.websites.label, url: href(locale, "websites") },
        { label: nav.servicesMenu.seo.label, url: href(locale, "seo") },
        { label: nav.servicesMenu.reviews.label, url: href(locale, "reviews") },
        { label: nav.servicesMenu.all, url: href(locale, "services") },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div className="container-x pb-10 pt-20 sm:pt-24">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-muted">{footer.tagline}</p>
            <p className="mt-4 flex items-start gap-2 text-sm text-subtle">
              <Icon name="pin" className="mt-0.5 size-4 shrink-0" />
              {footer.location}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h2 className="eyebrow">{col.title}</h2>
              <ul className="mt-6 space-y-3">
                {col.links.map((link) => (
                  <li key={link.url}>
                    <Link href={link.url} className="link-underline text-[0.92rem] text-muted transition-colors hover:text-fg">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-3">
            <h2 className="eyebrow">{footer.contactTitle}</h2>
            <ul className="mt-6 space-y-3 text-[0.92rem]">
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className="link-underline text-muted hover:text-fg">
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.phone && (
                <li>
                  <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="link-underline text-muted hover:text-fg">
                    {contact.phone}
                  </a>
                </li>
              )}
              <li>
                <Link href={href(locale, "quote")} className="link-underline text-muted hover:text-fg">
                  {nav.quote}
                </Link>
              </li>
              <li>
                <Link href={href(locale, "consultation")} className="link-underline text-muted hover:text-fg">
                  {nav.consultation}
                </Link>
              </li>
            </ul>
            {socialLinks.length > 0 && (
              <ul className="mt-6 flex gap-2">
                {socialLinks.map(({ network, url }) => (
                  <li key={network}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={network}
                      className="flex size-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
                    >
                      <Icon name={network as IconName} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Oversized wordmark */}
        <div aria-hidden="true" className="pointer-events-none mt-20 select-none overflow-hidden">
          <p className="bg-gradient-to-b from-white/[0.09] to-transparent bg-clip-text text-center text-[22vw] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent lg:text-[17rem]">
            NEXORA
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-line pt-8 text-[0.8rem] text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {legal.companyName || siteConfig.name}. {footer.rights}
          </p>
          <Link href={href(locale, "privacy")} className="link-underline hover:text-fg">
            {footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
