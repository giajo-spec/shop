"use client";

import { useState } from "react";
import { siteConfig } from "@/content/site";
import { track } from "@/lib/analytics";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type Labels = {
  loadCalendar: string;
  loading: string;
  openNewTab: string;
  calendarTitle: string;
  calendarNote: string;
  unavailable: string;
  fallbackCta: string;
  fallbackHref: string;
};

/**
 * Calendly inline embed, loaded only on user action: no third-party script or
 * cookie before the visitor asks for the calendar (performance + Law 25).
 * Uses a plain iframe — Calendly's widget.js is not needed.
 */
export function CalendlyEmbed({ labels, compact = false }: { labels: Labels; compact?: boolean }) {
  const [state, setState] = useState<"idle" | "loading" | "ready">("idle");
  const url = siteConfig.calendlyUrl;

  if (!url) {
    return (
      <div className="card flex flex-col items-start gap-6 p-8">
        <Icon name="calendar" className="size-6 text-subtle" />
        <p className="text-muted">{labels.unavailable}</p>
        <ButtonLink href={labels.fallbackHref}>{labels.fallbackCta}</ButtonLink>
      </div>
    );
  }

  const params = new URLSearchParams({
    embed_type: "Inline",
    hide_gdpr_banner: "1",
    background_color: "0b0b0d",
    text_color: "f5f5f6",
    primary_color: "4f7cff",
  });
  if (typeof window !== "undefined") params.set("embed_domain", window.location.host);
  const src = `${url}${url.includes("?") ? "&" : "?"}${params.toString()}`;

  if (state === "idle") {
    return (
      <div className={`card noise relative flex flex-col items-center justify-center overflow-hidden px-6 text-center ${compact ? "py-14" : "py-20 sm:py-28"}`}>
        <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative flex flex-col items-center">
          <span className="flex size-14 items-center justify-center rounded-2xl border border-line-strong bg-white/[0.03]">
            <Icon name="calendar" className="size-6" />
          </span>
          <p className="mt-6 text-xl font-medium tracking-tight">{labels.calendarTitle}</p>
          <p className="mt-2 max-w-sm text-sm text-subtle">{labels.calendarNote}</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <Button
              size="lg"
              icon="calendar"
              onClick={() => {
                setState("loading");
                track("Consultation Calendar Opened");
              }}
            >
              {labels.loadCalendar}
            </Button>
            <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
              {labels.openNewTab}
              <Icon name="arrowUpRight" className="size-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[1.25rem] border border-line bg-surface">
      {state === "loading" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-surface" role="status">
          <span className="size-8 animate-spin rounded-full border-2 border-white/15 border-t-accent" aria-hidden="true" />
          <span className="text-sm text-muted">{labels.loading}</span>
        </div>
      )}
      <iframe
        src={src}
        title={labels.calendarTitle}
        onLoad={() => setState("ready")}
        className="block h-[1050px] w-full sm:h-[760px]"
        allow="payment"
      />
    </div>
  );
}
