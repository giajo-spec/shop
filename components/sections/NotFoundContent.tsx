import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

/** Bilingual 404 — French first (default language), English second. */
export function NotFoundContent() {
  return (
    <section className="relative flex min-h-[80dvh] items-center overflow-hidden pt-24">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="container-x relative text-center">
        <p className="eyebrow">Erreur 404 · Error 404</p>
        <p className="display mt-6 text-[7rem] leading-none text-white/10 sm:text-[11rem]" aria-hidden="true">
          404
        </p>
        <h1 className="display -mt-6 text-3xl sm:text-5xl">Cette page est introuvable.</h1>
        <p className="mt-4 text-muted" lang="en">
          This page can’t be found.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/fr" className={buttonClasses("primary")}>
            Retour à l’accueil
          </Link>
          <Link href="/en" lang="en" className={buttonClasses("secondary")}>
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
