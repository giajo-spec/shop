import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import "../globals.css";
import { getDictionary } from "@/content/dictionaries";
import { siteConfig } from "@/content/site";
import { isIndexable } from "@/lib/env";
import { isLocale, locales } from "@/lib/i18n";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";
import { Enhancements } from "@/components/layout/Enhancements";
import { JsonLd } from "@/components/seo/JsonLd";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#050506",
  colorScheme: "dark",
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: dict.meta.defaultTitle, template: dict.meta.titleTemplate },
    description: dict.meta.defaultDescription,
    applicationName: siteConfig.name,
    formatDetection: { telephone: false, email: false, address: false },
    robots: isIndexable ? undefined : { index: false, follow: false },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale === "fr" ? "fr-CA" : "en-CA"}
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrument.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Flags JS support before paint so reveal animations never hide content without JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd data={[organizationSchema(locale, dict), websiteSchema(locale, dict)]} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink transition-transform focus:translate-y-0"
        >
          {dict.nav.skip}
        </a>
        <Header locale={locale} nav={dict.nav} />
        <main id="main">{children}</main>
        <Footer locale={locale} dict={dict} />
        <MobileCta locale={locale} label={dict.mobileCta} bookLabel={dict.nav.consultation} />
        <Enhancements />
        {siteConfig.plausibleDomain && (
          <Script
            defer
            data-domain={siteConfig.plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
