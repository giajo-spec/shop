import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { NotFoundContent } from "@/components/sections/NotFoundContent";

export const metadata: Metadata = {
  title: "404 — Nexora Digital",
  robots: { index: false, follow: false },
};

/** Fallback for URLs that match no route at all (outside /fr and /en). */
export default function GlobalNotFound() {
  return (
    <html lang="fr-CA" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-dvh bg-ink">
        <main>
          <NotFoundContent />
        </main>
      </body>
    </html>
  );
}
