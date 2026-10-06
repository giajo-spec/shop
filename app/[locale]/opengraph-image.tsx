import { ImageResponse } from "next/og";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, locales } from "@/lib/i18n";

export const alt = "Nexora Digital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded Open Graph image, generated per locale at build time. */
export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "fr");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#050506",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(79,124,255,0.22), transparent 45%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 72px 72px, 72px 72px",
          color: "#f5f5f6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, border: "1px solid rgba(255,255,255,0.18)", background: "#0b0b0d", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="52" height="52" viewBox="0 0 32 32">
              <path d="M10 22.5V9.5l12 13V9.5" fill="none" stroke="#f5f5f6" strokeWidth="2.6" strokeLinecap="square" />
              <circle cx="22" cy="6.4" r="1.5" fill="#4f7cff" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: 9 }}>NEXORA</span>
            <span style={{ fontSize: 15, letterSpacing: 10, color: "#8a8a94" }}>DIGITAL</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.02, letterSpacing: -3, maxWidth: 950 }}>{dict.meta.ogTagline}</div>
          <div style={{ marginTop: 28, fontSize: 26, color: "#a3a3ab", display: "flex", gap: 18 }}>
            <span>{locale === "en" ? "Websites" : "Sites web"}</span>
            <span style={{ color: "#4f7cff" }}>·</span>
            <span>SEO</span>
            <span style={{ color: "#4f7cff" }}>·</span>
            <span>{locale === "en" ? "Google Reviews" : "Avis Google"}</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
