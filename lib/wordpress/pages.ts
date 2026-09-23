/**
 * Generic WordPress pages for the /[slug] route.
 *
 * Every entry in the PO's Annexure B sitemap exists as a WordPress page, so
 * editors control the title, hero and body of each one without a deploy.
 */

import fetchGraphQL from "./graphql-client";
import type { FaqItem, WPImage } from "./home";

/** Routes with their own hand-built template, or that are not real pages. */
export const RESERVED_SLUGS = new Set([
  "home",
  "site-settings",
  "contact",
  "thank-you",
]);

export interface SitePage {
  slug: string;
  title: string;
  content: string;
  modified?: string | null;
  hero: {
    title?: string | null;
    subtitle?: string | null;
    badge?: string | null;
    image: WPImage | null;
    buttonText?: string | null;
    buttonUrl?: string | null;
    button2Text?: string | null;
    button2Url?: string | null;
  };
  seo: {
    title?: string | null;
    description?: string | null;
  };
  faqs: FaqItem[];
}

const PAGE_QUERY = `
  query SitePage($slug: ID!) {
    page(id: $slug, idType: URI) {
      slug
      title
      content
      modified
      pageHero {
        heroTitle heroSubtitle heroBadge
        heroButtonText heroButtonUrl
        heroButton2Text heroButton2Url
        heroImage { node { sourceUrl altText mediaDetails { width height } } }
      }
      seo { title metaDesc }
    }
  }
`;

const SLUGS_QUERY = `
  query PageSlugs {
    pages(first: 100, where: { status: PUBLISH }) {
      nodes { slug modified }
    }
  }
`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getSitePage(slug: string): Promise<SitePage | null> {
  if (RESERVED_SLUGS.has(slug)) return null;

  try {
    const data = await fetchGraphQL<{ page: any }>(PAGE_QUERY, {
      variables: { slug },
      revalidate: 900,
      tags: ["wp-pages", `wp-page-${slug}`],
    });
    const page = data?.page;
    if (!page) return null;

    const hero = page.pageHero ?? {};
    const faqs = await getPageFaqs(slug);

    return {
      slug: page.slug,
      title: page.title,
      content: page.content ?? "",
      modified: page.modified,
      hero: {
        title: hero.heroTitle,
        subtitle: hero.heroSubtitle,
        badge: hero.heroBadge,
        image: hero.heroImage?.node ?? null,
        buttonText: hero.heroButtonText,
        buttonUrl: hero.heroButtonUrl,
        button2Text: hero.heroButton2Text,
        button2Url: hero.heroButton2Url,
      },
      seo: {
        title: page.seo?.title,
        description: page.seo?.metaDesc,
      },
      faqs,
    };
  } catch (error) {
    console.error(`getSitePage(${slug}) failed:`, error);
    return null;
  }
}

export async function getPageSlugs(): Promise<{ slug: string; modified?: string }[]> {
  try {
    const data = await fetchGraphQL<{ pages: { nodes: any[] } }>(SLUGS_QUERY, {
      revalidate: 3600,
      tags: ["wp-pages"],
    });
    return (data?.pages?.nodes ?? [])
      .filter((n) => n?.slug && !RESERVED_SLUGS.has(n.slug))
      .map((n) => ({ slug: n.slug, modified: n.modified }));
  } catch (error) {
    console.error("getPageSlugs failed:", error);
    return [];
  }
}

export async function getPageFaqs(slug: string): Promise<FaqItem[]> {
  try {
    const base = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://dev.bhavcreations.in";
    const response = await fetch(`${base.replace(/\/$/, "")}/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&status=publish&_fields=acf`, {
      next: { revalidate: 900, tags: ["wp-pages", `wp-page-${slug}`] },
    });
    if (!response.ok) return [];
    const pages = await response.json();
    const faqs = pages?.[0]?.acf?.faqs ?? [];

    return faqs
      .filter((faq: any) => faq?.question && faq?.answer)
      .sort((a: any, b: any) => (Number(a.sort_order) || 99) - (Number(b.sort_order) || 99))
      .map((faq: any) => ({
        question: faq.question,
        answer: faq.answer,
      }));
  } catch (error) {
    console.error(`getPageFaqs(${slug}) failed:`, error);
    return [];
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
