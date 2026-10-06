import type { Dictionary } from "@/content/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { delay } from "@/lib/style";
import { ButtonLink } from "@/components/ui/Button";

export function CtaBanner({ locale, dict, title }: { locale: Locale; dict: Dictionary; title?: string }) {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="cta-title">
      <div className="container-x">
        <div className="noise relative overflow-hidden rounded-[2rem] border border-line-strong bg-surface px-6 py-16 sm:px-12 sm:py-24 lg:px-20">
          <div className="grid-bg absolute inset-0 opacity-70" aria-hidden="true" />
          <div className="absolute -bottom-40 left-1/2 h-80 w-[60%] -translate-x-1/2 rounded-full bg-accent/25 blur-[120px]" aria-hidden="true" />
          <div className="relative mx-auto max-w-3xl text-center">
            <p data-reveal className="eyebrow">{dict.cta.eyebrow}</p>
            <h2 id="cta-title" data-reveal style={delay(80)} className="display mt-6 text-[2.2rem] sm:text-5xl lg:text-6xl">
              {title ?? dict.cta.title}
            </h2>
            <p data-reveal style={delay(160)} className="mx-auto mt-6 max-w-xl text-lg text-muted">
              {dict.cta.lead}
            </p>
            <div data-reveal style={delay(240)} className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={href(locale, "quote")} size="lg">
                {dict.common.getQuote}
              </ButtonLink>
              <ButtonLink href={href(locale, "consultation")} size="lg" variant="secondary" icon="calendar">
                {dict.common.bookConsultation}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
