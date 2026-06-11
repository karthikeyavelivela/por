import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { SITE } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    ...projects.map((p) => ({
      url: `${SITE.url}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
