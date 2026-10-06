import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nexora Digital",
    short_name: "Nexora",
    start_url: "/fr",
    display: "browser",
    background_color: "#050506",
    theme_color: "#050506",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
