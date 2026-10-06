import type { Dictionary } from "@/content/dictionaries";
import { delay } from "@/lib/style";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";

const icons: IconName[] = ["layout", "eyeOff", "inbox", "star", "sparkle", "trendDown"];

export function Problems({ dict }: { dict: Dictionary }) {
  const p = dict.home.problems;
  return (
    <Section tone="light" labelledBy="problems-title">
      <div className="container-x">
        <SectionHeader id="problems-title" tone="light" eyebrow={p.eyebrow} title={p.title} lead={p.lead} />

        <ul className="mt-16 grid border-l border-t border-black/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {p.items.map((item, i) => (
            <li
              key={item.title}
              data-reveal
              style={delay((i % 3) * 90)}
              className="group relative border-b border-r border-black/10 p-7 transition-colors duration-500 hover:bg-white sm:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-full border border-black/10 text-neutral-700 transition-colors duration-500 group-hover:border-accent-strong group-hover:bg-accent-strong group-hover:text-white">
                  <Icon name={icons[i]} className="size-[1.15rem]" />
                </span>
                <span className="font-mono text-xs text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-10 text-xl font-medium tracking-tight text-neutral-950">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-neutral-600">{item.text}</p>
            </li>
          ))}
        </ul>

        <p data-reveal className="mt-12 max-w-2xl text-lg text-neutral-700">
          <span className="mr-2 inline-block h-px w-8 translate-y-[-0.3em] bg-accent-strong align-middle" aria-hidden="true" />
          {p.conclusion}
        </p>
      </div>
    </Section>
  );
}
