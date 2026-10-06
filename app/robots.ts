import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { isIndexable } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  // Prototype: block every crawler until SITE_INDEXABLE=true.
  if (!isIndexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
