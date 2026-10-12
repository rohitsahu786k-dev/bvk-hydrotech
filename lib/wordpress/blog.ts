/**
 * Blog posts over the WordPress REST API.
 *
 * REST rather than GraphQL: it is public, needs no plugin on the CMS side and
 * returns the featured image and categories in one request with `_embed`. The
 * default "Hello world!" post WordPress ships with is never shown.
 */

import { mediaUrl, rewriteMedia } from "@/lib/media";
import { plainText } from "@/lib/seo/jsonLd";

export interface PostFaq {
  question: string;
  answer: string;
}

/** An in-article call to action authored in the "Blog Post CTAs" custom fields. */
export interface PostCta {
  after: number;
  eyebrow: string;
  title: string;
  text: string;
  label: string;
  url: string;
  label2: string;
  url2: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  /** Sanitised-by-source HTML from the CMS; media URLs already rewritten. */
  content: string;
  date: string;
  modified: string;
  minutes: number;
  image: { src: string; alt: string } | null;
  category: { name: string; slug: string } | null;
  /** From the "Page FAQs" custom fields, in the editor's sort order. */
  faqs: PostFaq[];
  ctas: PostCta[];
  /** Straight from the Yoast SEO plugin. */
  seo: { title: string | null; description: string | null; image: string | null };
}

/* eslint-disable @typescript-eslint/no-explicit-any */

const SAMPLE_SLUGS = new Set(["hello-world"]);

function base() {
  return (process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://dev.bhavcreations.in").replace(/\/$/, "");
}

function decode(text: string) {
  return text
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8216;|&lsquo;/g, "‘")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&#038;|&amp;/g, "&")
    .replace(/&hellip;|&#8230;/g, "…")
    .replace(/\s+/g, " ")
    .trim();
}

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

function toPost(raw: any): BlogPost {
  const media = raw._embedded?.["wp:featuredmedia"]?.[0];
  const terms: any[] = raw._embedded?.["wp:term"]?.[0] ?? [];
  const category = terms.find((t) => t.slug !== "uncategorized") ?? null;
  const content = rewriteMedia<string>(raw.content?.rendered ?? "");
  const words = plainText(content).split(" ").filter(Boolean).length;
  const acf = rewriteMedia<any>(raw.acf && !Array.isArray(raw.acf) ? raw.acf : {});
  const yoast = raw.yoast_head_json ?? {};

  const faqs: PostFaq[] = (Array.isArray(acf.faqs) ? acf.faqs : [])
    .filter((row: any) => text(row?.question) && text(row?.answer))
    .sort((a: any, b: any) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0))
    .map((row: any) => ({ question: text(row.question), answer: text(row.answer) }));

  const ctas: PostCta[] = (Array.isArray(acf.post_ctas) ? acf.post_ctas : [])
    .filter((row: any) => text(row?.title) && text(row?.button_url))
    .map((row: any) => ({
      after: Math.max(1, Number(row.after_paragraph) || 3),
      eyebrow: text(row.eyebrow),
      title: text(row.title),
      text: text(row.text),
      label: text(row.button_label) || "Request technical RFQ",
      url: text(row.button_url),
      label2: text(row.secondary_label),
      url2: text(row.secondary_url),
    }))
    .sort((a: PostCta, b: PostCta) => a.after - b.after);

  return {
    id: raw.id,
    slug: raw.slug,
    title: decode(plainText(raw.title?.rendered ?? "")),
    excerpt: decode(plainText(raw.excerpt?.rendered ?? "")),
    content,
    date: raw.date_gmt ? `${raw.date_gmt}Z` : raw.date,
    modified: raw.modified_gmt ? `${raw.modified_gmt}Z` : raw.modified,
    minutes: Math.max(1, Math.round(words / 200)),
    image: media?.source_url
      ? { src: mediaUrl(media.source_url), alt: media.alt_text || decode(plainText(raw.title?.rendered ?? "")) }
      : null,
    category: category ? { name: decode(category.name), slug: category.slug } : null,
    faqs,
    ctas,
    seo: {
      title: text(yoast.title) || null,
      description: text(yoast.description) || text(yoast.og_description) || null,
      image: yoast.og_image?.[0]?.url ? mediaUrl(yoast.og_image[0].url) : null,
    },
  };
}

export async function getPosts(limit = 24): Promise<BlogPost[]> {
  try {
    const response = await fetch(
      `${base()}/wp-json/wp/v2/posts?per_page=${limit}&status=publish&_embed=wp:featuredmedia,wp:term`,
      { next: { revalidate: 900, tags: ["wp-posts"] } },
    );
    if (!response.ok) return [];
    const rows: any[] = await response.json();
    return rows.filter((row) => !SAMPLE_SLUGS.has(row.slug)).map(toPost);
  } catch (error) {
    console.error("getPosts failed:", error);
    return [];
  }
}

export const POSTS_PER_PAGE = 20;

/** One page of the blog index, newest first, with the total page count. */
export async function getPostsPage(
  page = 1,
  perPage = POSTS_PER_PAGE,
): Promise<{ posts: BlogPost[]; totalPages: number }> {
  try {
    const response = await fetch(
      `${base()}/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&status=publish&_embed=wp:featuredmedia,wp:term`,
      { next: { revalidate: 900, tags: ["wp-posts"] } },
    );
    if (!response.ok) return { posts: [], totalPages: 1 };
    const rows: any[] = await response.json();
    return {
      posts: rows.filter((row) => !SAMPLE_SLUGS.has(row.slug)).map(toPost),
      totalPages: Math.max(1, Number(response.headers.get("x-wp-totalpages")) || 1),
    };
  } catch (error) {
    console.error("getPostsPage failed:", error);
    return { posts: [], totalPages: 1 };
  }
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  if (SAMPLE_SLUGS.has(slug)) return null;
  try {
    const response = await fetch(
      `${base()}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&status=publish&_embed=wp:featuredmedia,wp:term`,
      { next: { revalidate: 900, tags: ["wp-posts", `wp-post-${slug}`] } },
    );
    if (!response.ok) return null;
    const rows: any[] = await response.json();
    return rows[0] ? toPost(rows[0]) : null;
  } catch (error) {
    console.error(`getPost(${slug}) failed:`, error);
    return null;
  }
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

export function formatPostDate(iso: string) {
  return dateFormat.format(new Date(iso));
}
