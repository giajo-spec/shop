"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { href, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** Sticky CTA bar on small screens, shown once the visitor scrolls past the hero. */
export function MobileCta({ locale, label, bookLabel }: { locale: Locale; label: string; bookLabel: string }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const hidden = pathname === href(locale, "quote") || pathname === href(locale, "consultation");

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 520;
      setVisible(window.scrollY > 560 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (hidden) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] lg:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <div className="flex gap-2 rounded-full border border-line-strong bg-surface-2/90 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl">
        <ButtonLink href={href(locale, "quote")} className="flex-1" tabIndex={visible ? 0 : -1}>
          {label}
        </ButtonLink>
        <Link
          href={href(locale, "consultation")}
          aria-label={bookLabel}
          tabIndex={visible ? 0 : -1}
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-fg"
        >
          <Icon name="calendar" className="size-[1.1rem]" />
        </Link>
      </div>
    </div>
  );
}
