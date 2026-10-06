import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { delay } from "@/lib/style";

export function Section({
  id,
  children,
  className,
  tone = "dark",
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "surface" | "light";
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative py-24 sm:py-32 lg:py-40",
        tone === "surface" && "bg-surface",
        tone === "light" && "bg-paper text-paper-ink",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
  className,
  as: Heading = "h2",
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p data-reveal className={cn("eyebrow mb-6 flex items-center gap-3", align === "center" && "justify-center", tone === "light" && "text-neutral-500")}>
          <span className="inline-block size-1.5 rounded-full bg-accent" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        data-reveal
        style={delay(80)}
        className={cn(
          "display",
          Heading === "h1" ? "text-[2.6rem] sm:text-6xl lg:text-7xl" : "text-[2.15rem] sm:text-5xl lg:text-[3.6rem]",
        )}
      >
        {title}
      </Heading>
      {lead && (
        <p
          data-reveal
          style={delay(160)}
          className={cn("mt-6 text-lg leading-relaxed sm:text-xl", tone === "light" ? "text-neutral-600" : "text-muted")}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
