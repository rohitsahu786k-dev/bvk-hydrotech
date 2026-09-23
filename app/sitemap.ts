import type { MetadataRoute } from "next";
import { getPageSlugs } from "@/lib/wordpress/pages";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bvkhydrotech.com";

/** Slugs whose priority differs from the default content page. */
const PRIORITY: Record<string, number> = {
  "electrolyser-solutions": 0.9,
  "fuel-cell-solutions": 0.9,
  "precision-mesh-solutions": 0.9,
  "privacy-policy": 0.2,
  "terms-of-use": 0.2,
  "cookie-policy": 0.2,
  disclaimer: 0.2,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Built from the CMS, so a new page is indexed as soon as it is published.
  const pages = await getPageSlugs();

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...pages.map(({ slug, modified }) => ({
      url: `${siteUrl}/${slug}`,
      lastModified: modified ? new Date(modified) : new Date(),
      changeFrequency: "monthly" as const,
      priority: PRIORITY[slug] ?? 0.7,
    })),
  ];
}
