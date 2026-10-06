"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { LanguageSwitcher } from "./LanguageSwitcher";

type Props = { locale: Locale; nav: Dictionary["nav"] };

export function Header({ locale, nav }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const serviceLinks: { key: "websites" | "seo" | "reviews"; icon: IconName }[] = [
    { key: "websites", icon: "layout" },
    { key: "seo", icon: "search" },
    { key: "reviews", icon: "star" },
  ];

  const links = [
    { label: nav.portfolio, url: href(locale, "portfolio") },
    { label: nav.about, url: href(locale, "about") },
    { label: nav.faq, url: href(locale, "faq") },
  ];

  const isActive = (url: string) => pathname === url || pathname.startsWith(`${url}/`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [servicesOpen]);

  const openServices = () => {
    clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 140);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || menuOpen
            ? "border-b border-line bg-ink/75 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent",
        )}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
          <Link href={href(locale, "home")} aria-label={`Nexora Digital — ${nav.home}`} className="relative z-10 rounded-lg">
            <Logo />
          </Link>

          <nav aria-label={nav.mainNav} className="hidden items-center gap-1 lg:flex">
            <div ref={servicesRef} className="relative" onPointerEnter={openServices} onPointerLeave={scheduleClose}>
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                onClick={() => setServicesOpen((v) => !v)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.9rem] transition-colors",
                  isActive(href(locale, "services")) ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {nav.services}
                <svg viewBox="0 0 12 12" className={cn("size-2.5 transition-transform duration-300", servicesOpen && "rotate-180")} aria-hidden="true">
                  <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>

              <div
                id="services-menu"
                className={cn(
                  "absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out-expo)]",
                  servicesOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
                )}
              >
                <div className="rounded-2xl border border-line-strong bg-surface-2/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl">
                  {serviceLinks.map(({ key, icon }) => (
                    <Link
                      key={key}
                      href={href(locale, key)}
                      className="group flex items-start gap-4 rounded-xl p-3.5 transition-colors hover:bg-white/[0.05]"
                    >
                      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white/[0.03] text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                        <Icon name={icon} className="size-[1.1rem]" />
                      </span>
                      <span>
                        <span className="block text-[0.92rem] font-medium text-fg">{nav.servicesMenu[key].label}</span>
                        <span className="mt-0.5 block text-[0.82rem] text-subtle">{nav.servicesMenu[key].hint}</span>
                      </span>
                    </Link>
                  ))}
                  <Link
                    href={href(locale, "services")}
                    className="mt-1 flex items-center justify-between rounded-xl border-t border-line px-3.5 py-3 text-[0.85rem] text-muted transition-colors hover:text-fg"
                  >
                    {nav.servicesMenu.all}
                    <Icon name="arrowRight" className="size-4" />
                  </Link>
                </div>
              </div>
            </div>

            {links.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                aria-current={isActive(link.url) ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-[0.9rem] transition-colors",
                  isActive(link.url) ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} label={nav.language} className="hidden sm:flex" />
            <div className="hidden lg:block">
              <ButtonLink href={href(locale, "quote")}>{nav.quote}</ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? nav.menuClose : nav.menuOpen}
              className="relative z-10 flex size-11 items-center justify-center rounded-full border border-line text-fg lg:hidden"
            >
              <span className="relative block h-3 w-4" aria-hidden="true">
                <span className={cn("absolute left-0 h-px w-4 bg-current transition-all duration-300", menuOpen ? "top-1.5 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 h-px w-4 bg-current transition-all duration-300", menuOpen ? "top-1.5 -rotate-45" : "top-3")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-ink/[0.98] backdrop-blur-xl transition-[opacity,visibility] duration-500 lg:hidden",
          menuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="container-x flex flex-1 flex-col overflow-y-auto pb-8 pt-28">
          <nav aria-label={nav.mainNav} className="flex flex-col">
            {[
              { label: nav.services, url: href(locale, "services") },
              ...serviceLinks.map(({ key }) => ({ label: nav.servicesMenu[key].label, url: href(locale, key), sub: true })),
              ...links,
              { label: nav.consultation, url: href(locale, "consultation") },
            ].map((item, i) => (
              <Link
                key={item.url}
                href={item.url}
                style={{ transitionDelay: menuOpen ? `${80 + i * 40}ms` : "0ms" }}
                className={cn(
                  "flex items-center justify-between border-b border-line transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)]",
                  "sub" in item && item.sub ? "py-3 pl-5 text-lg text-muted" : "py-4 text-[1.7rem] font-medium tracking-tight",
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
              >
                {item.label}
                <Icon name="arrowUpRight" className="size-5 text-subtle" />
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-4 pt-10">
            <LanguageSwitcher locale={locale} label={nav.language} className="self-start" />
            <ButtonLink href={href(locale, "quote")} size="lg" className="w-full">
              {nav.quote}
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
