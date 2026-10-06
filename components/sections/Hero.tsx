import type { Dictionary } from "@/content/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { delay } from "@/lib/style";
import { ButtonLink } from "@/components/ui/Button";
import { HeroVisual } from "@/components/visuals/HeroVisual";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { hero, visual } = dict.home;
  return (
    <section className="noise relative overflow-hidden pb-20 pt-32 sm:pt-40 lg:pb-28 lg:pt-44">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 xl:col-span-6">
          <p data-reveal className="eyebrow flex items-center gap-3">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-pulse-dot rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            {hero.eyebrow}
          </p>

          <h1 data-reveal style={delay(80)} className="display mt-7 text-[2.9rem] sm:text-7xl lg:text-[5.2rem] xl:text-[5.8rem]">
            {hero.titleStart} <span className="accent-serif text-[1.08em] text-white">{hero.titleAccent}</span> {hero.titleEnd}
          </h1>

          <p data-reveal style={delay(180)} className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            {hero.lead}
          </p>

          <div data-reveal style={delay(260)} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={href(locale, "quote")} size="lg">
              {dict.common.requestQuote}
            </ButtonLink>
            <ButtonLink href={href(locale, "services")} size="lg" variant="secondary" icon="arrowRight">
              {dict.common.discoverServices}
            </ButtonLink>
          </div>

          <ul data-reveal style={delay(340)} className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-subtle">
            {hero.points.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <svg viewBox="0 0 16 16" className="size-3.5 text-accent" aria-hidden="true">
                  <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal="scale" style={delay(200)} className="lg:col-span-6 xl:col-span-6">
          <HeroVisual visual={visual} illustration={dict.common.illustration} />
        </div>
      </div>
    </section>
  );
}
