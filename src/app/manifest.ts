import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/** Web app manifest: name, colours and the official HAGER INVESTMENT app icons. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HAGER INVESTMENT",
    short_name: "HAGER",
    description: siteConfig.description,
    start_url: "/",
    display: "browser",
    background_color: "#090B0D",
    theme_color: "#102C35",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
