"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { alternatePath, locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ locale, label, className }: { locale: Locale; label: string; className?: string }) {
  const pathname = usePathname() || `/${locale}`;

  return (
    <nav aria-label={label} className={cn("flex items-center rounded-full border border-line p-0.5 font-mono text-[0.7rem]", className)}>
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={active ? pathname : alternatePath(pathname, l)}
            hrefLang={l === "fr" ? "fr-CA" : "en-CA"}
            lang={l}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1.5 tracking-[0.14em] transition-colors duration-300",
              active ? "bg-white/10 text-fg" : "text-subtle hover:text-fg",
            )}
          >
            {l.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
