import Link from "next/link";
import type { ReactNode } from "react";
import { delay } from "@/lib/style";

type Crumb = { name: string; path: string };

/** Inner-page hero with breadcrumb, H1 and optional actions / visual. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  breadcrumbLabel,
  actions,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: Crumb[];
  breadcrumbLabel: string;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="noise relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
        <nav aria-label={breadcrumbLabel} data-reveal className="mb-10">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
            {crumbs.map((crumb, i) => (
              <li key={crumb.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i < crumbs.length - 1 ? (
                  <Link href={crumb.path} className="transition-colors hover:text-fg">
                    {crumb.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-muted">
                    {crumb.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className={aside ? "grid items-center gap-16 lg:grid-cols-12 lg:gap-10" : ""}>
          <div className={aside ? "lg:col-span-6" : "max-w-4xl"}>
            <p data-reveal className="eyebrow flex items-center gap-3">
              <span className="inline-block size-1.5 rounded-full bg-accent" aria-hidden="true" />
              {eyebrow}
            </p>
            <h1 data-reveal style={delay(80)} className="display mt-6 text-[2.5rem] sm:text-6xl lg:text-[4.4rem]">
              {title}
            </h1>
            {lead && (
              <p data-reveal style={delay(160)} className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                {lead}
              </p>
            )}
            {actions && (
              <div data-reveal style={delay(240)} className="mt-10 flex flex-col gap-3 sm:flex-row">
                {actions}
              </div>
            )}
          </div>
          {aside && (
            <div data-reveal="scale" style={delay(200)} className="lg:col-span-6">
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
