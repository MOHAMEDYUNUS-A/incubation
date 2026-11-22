import { MetadataRoute } from "next";

/**
 * Dynamic Next.js Robots.txt Generator
 * Fully optimized for standard search engines (Google, Bing) and AI Answer Engines (Perplexity, ChatGPT, Claude, Gemini)
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://incubation.mamcet.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api/admin",
          "/api/admin/*",
          "/dashboard",
          "/dashboard/*",
          "/_next/",
          "/private/",
        ],
      },
      // Explicitly allow Google Search & Google AI Overviews
      {
        userAgent: ["Googlebot", "Google-Extended"],
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/admin", "/dashboard"],
      },
      // Explicitly allow Microsoft Bing & Copilot
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/admin", "/dashboard"],
      },
      // Explicitly allow OpenAI ChatGPT / GPTBot
      {
        userAgent: ["GPTBot", "ChatGPT-User"],
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/admin", "/dashboard"],
      },
      // Explicitly allow Perplexity AI Answer Engine
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/admin", "/dashboard"],
      },
      // Explicitly allow Anthropic Claude
      {
        userAgent: ["ClaudeBot", "anthropic-ai"],
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/admin", "/dashboard"],
      },
      // Explicitly allow Applebot
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/admin", "/dashboard"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
