import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { delay } from "@/lib/style";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";

const icons: IconName[] = ["pen", "compass", "gauge", "search", "target", "users", "layers"];

export function WhyNexora({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const w = dict.home.why;
  const [featured, ...rest] = dict.why;

  return (
    <Section labelledBy="why-title">
      <div className="container-x">
        <SectionHeader id="why-title" eyebrow={w.eyebrow} title={w.title} lead={w.lead} />
        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          <li data-reveal className="card spotlight relative overflow-hidden p-7 sm:col-span-2 lg:row-span-2 lg:flex lg:flex-col lg:justify-end lg:p-10">
            <span
              aria-hidden="true"
              className="accent-serif pointer-events-none absolute -right-4 -top-10 select-none text-[11rem] leading-none text-white/[0.05] lg:text-[15rem]"
            >
              Aa
            </span>
            <span className="relative flex size-10 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-fg">
              <Icon name={icons[0]} className="size-[1.1rem]" />
            </span>
            <h3 className="relative mt-8 text-3xl font-medium tracking-tight lg:mt-24 lg:text-4xl">{featured.title}</h3>
            <p className="relative mt-2.5 max-w-md text-lg leading-relaxed text-muted">{featured.text}</p>
          </li>

          {rest.map((item, i) => (
            <li key={item.title} data-reveal style={delay(((i + 1) % 4) * 80)} className="card spotlight p-7">
              <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-fg">
                <Icon name={icons[i + 1]} className="size-[1.1rem]" />
              </span>
              <h3 className="mt-8 text-lg font-medium tracking-tight">{item.title}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}

          <li data-reveal style={delay(160)} className="sm:col-span-2">
            <Link
              href={href(locale, "consultation")}
              className="group relative flex h-full min-h-48 flex-col justify-between overflow-hidden rounded-[1.25rem] border border-accent/30 bg-accent-soft p-7 transition-colors duration-500 hover:border-accent/60"
            >
              <span className="eyebrow !text-accent">{dict.cta.eyebrow}</span>
              <span className="mt-8 flex items-end justify-between gap-6">
                <span className="text-2xl font-medium tracking-tight sm:text-3xl">{dict.common.talkToExpert}</span>
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-strong text-white transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
                  <Icon name="arrowRight" className="size-5" />
                </span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </Section>
  );
}
