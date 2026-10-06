import type { Dictionary } from "@/content/dictionaries";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ProcessTimeline } from "./ProcessTimeline";

export function Process({ dict, tone = "surface" }: { dict: Dictionary; tone?: "dark" | "surface" }) {
  const p = dict.home.process;
  return (
    <Section tone={tone} labelledBy="process-title">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeader id="process-title" eyebrow={p.eyebrow} title={p.title} lead={p.lead} />
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ProcessTimeline steps={dict.process} />
        </div>
      </div>
    </Section>
  );
}
