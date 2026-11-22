import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

/**
 * Dynamic Next.js XML Sitemap Generator
 * Generates https://incubation.mamcet.com/sitemap.xml conforming to Google Sitemaps protocol
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://incubation.mamcet.com";
  const now = new Date();

  // Core Static Routes with priority and update cadence
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/startups`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/programs`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/apply`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/apply/status`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/leadership`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/focus-areas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/facilities`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/success-stories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/alumni`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/impact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/join-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic Routes from ecosystem-data.json
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const dataFilePath = path.join(process.cwd(), "src", "data", "ecosystem-data.json");
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, "utf-8");
      const data = JSON.parse(fileData);

      // Startup Passports and Verifications
      if (Array.isArray(data.passports)) {
        for (const p of data.passports) {
          if (p.passportId) {
            // Full Digital Passport page
            dynamicRoutes.push({
              url: `${baseUrl}/startup-passport/${encodeURIComponent(p.passportId)}`,
              lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
              changeFrequency: "weekly",
              priority: 0.9,
            });

            // Tamper-Evident Public Verification Certificate page
            dynamicRoutes.push({
              url: `${baseUrl}/startup-passport/verify/${encodeURIComponent(p.passportId)}`,
              lastModified: p.lastVerifiedAt ? new Date(p.lastVerifiedAt) : now,
              changeFrequency: "weekly",
              priority: 0.9,
            });
          }

          // Startup venture detail page by slug
          if (p.slug) {
            dynamicRoutes.push({
              url: `${baseUrl}/startups/${encodeURIComponent(p.slug)}`,
              lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
              changeFrequency: "weekly",
              priority: 0.85,
            });
          }
        }
      }

      // Success Stories by slug
      if (Array.isArray(data.stories)) {
        for (const s of data.stories) {
          if (s.slug) {
            dynamicRoutes.push({
              url: `${baseUrl}/success-stories/${encodeURIComponent(s.slug)}`,
              lastModified: s.publishedAt ? new Date(s.publishedAt) : now,
              changeFrequency: "monthly",
              priority: 0.8,
            });
          }
        }
      }
    }
  } catch (err) {
    console.error("[SITEMAP ERROR] Failed reading ecosystem data for dynamic sitemap:", err);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
