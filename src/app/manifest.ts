import { MetadataRoute } from "next";

/**
 * Dynamic Next.js Web App Manifest Generator
 * Powers PWA capabilities, rich mobile indexing, and browser home screen installation
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MASTeR Incubation Foundation (MIF)",
    short_name: "MIF Incubation",
    description:
      "StartupTN Recognised Pre-Incubation Centre at M.A.M. College of Engineering and Technology (MAMCET), Trichy.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#091b34",
    orientation: "portrait",
    categories: ["business", "education", "productivity"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
