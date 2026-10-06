import type { MetadataRoute } from "next";
import { getPageSlugs } from "@/lib/wordpress/pages";
import { contentSlugs } from "@/content";
import { noindexSlugs } from "@/content/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bvkhydrotech.com";

/** Commercial depth first, then capability, then supporting pages. */
const PRIORITY: Record<string, number> = {
  "electrolyser-solutions": 0.9,
  "fuel-cell-solutions": 0.9,
  "precision-mesh-solutions": 0.9,
  "knitted-mesh-solutions": 0.85,
  "woven-mesh-solutions": 0.85,
  "industrial-filtration": 0.85,
  "energy-clean-tech": 0.8,
  about: 0.8,
  "engineering-manufacturing": 0.75,
  "process-treatments": 0.75,
  "rd-cfd-prototyping": 0.75,
  "industries-applications": 0.75,
  sustainability: 0.7,
  resources: 0.6,
  insights: 0.6,
  faqs: 0.6,
  "privacy-policy": 0.2,
  "terms-of-use": 0.2,
  "cookie-policy": 0.2,
  disclaimer: 0.2,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cmsPages = await getPageSlugs();
  const modified = new Map(cmsPages.map((p) => [p.slug, p.modified]));

  // The designed pages always appear, whether or not the CMS responded.
  const slugs = [...new Set([...contentSlugs, ...cmsPages.map((p) => p.slug)])].filter(
    (slug) => !noindexSlugs.has(slug),
  );

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...slugs.map((slug) => {
      const last = modified.get(slug);
      return {
        url: `${siteUrl}/${slug}`,
        lastModified: last ? new Date(last) : new Date(),
        changeFrequency: "monthly" as const,
        priority: PRIORITY[slug] ?? 0.7,
      };
    }),
  ];
}
