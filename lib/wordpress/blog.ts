import { wordpressOrigin } from "@/lib/site";
import { readJson } from "./encoding";
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
  /** Its row number in the "Blog Post CTAs" box, so [cta-1] in the body finds it. */
  index: number;
  after: number;
  eyebrow: string;
  title: string;
  text: string;
  label: string;
  url: string;
  label2: string;
  url2: string;
}

/** One block of copy with up to two buttons (side box, bottom band). */
export interface PostBlock {
  eyebrow: string;
  title: string;
  text: string;
  label: string;
  url: string;
  label2: string;
  url2: string;
}

/** Per-article options from the "Blog Article Settings" custom fields. */
export interface PostOptions {
  schemaType: string;
  schemaFaqOff: boolean;
  schemaAuthor: string;
  /** Parsed, validated JSON-LD authored by the editor; empty when none. */
  schemaCustom: Record<string, unknown>[];
  side: "default" | "custom" | "hide";
  sideBlock: PostBlock;
  bottom: "default" | "custom" | "hide";
  bottomBlock: PostBlock;
  heroLabel: string;
  byline: string;
  faqTitle: string;
  faqText: string;
  hideImage: boolean;
  hideExcerpt: boolean;
  hideRelated: boolean;
}

/** Site-wide blog copy from Posts → Blog Settings. */
export interface BlogSettings {
  index: { eyebrow: string; title: string; lead: string; seoTitle: string; seoDesc: string };
  side: PostBlock;
  bottom: PostBlock;
  faq: { title: string; text: string };
  schemaType: string;
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
  /** Every category the post is filed under, except "Uncategorized". */
  categories: { name: string; slug: string }[];
  tags: { name: string; slug: string }[];
  /** The WordPress author's display name, unless it is just an email address. */
  author: string | null;
  /** From the "Page FAQs" custom fields, in the editor's sort order. */
  faqs: PostFaq[];
  ctas: PostCta[];
  options: PostOptions;
  /** Straight from the Yoast SEO plugin. */
  seo: { title: string | null; description: string | null; image: string | null };
}

/* eslint-disable @typescript-eslint/no-explicit-any */

const SAMPLE_SLUGS = new Set(["hello-world"]);

function base() {
  return wordpressOrigin();
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

/**
 * The editor's extra schema. The CMS already rejects invalid JSON on save; this
 * guards the page against anything that slipped in another way. Only objects
 * that declare a schema.org @type are kept.
 */
function parseJsonLd(source: string): Record<string, unknown>[] {
  if (!source) return [];
  try {
    const parsed = JSON.parse(source);
    const list: unknown[] = Array.isArray(parsed) ? parsed : [parsed];
    return list.filter(
      (item): item is Record<string, unknown> =>
        Boolean(item) && typeof item === "object" && !Array.isArray(item) && "@type" in (item as object),
    );
  } catch {
    return [];
  }
}

function toPost(raw: any): BlogPost {
  const media = raw._embedded?.["wp:featuredmedia"]?.[0];
  const terms: any[] = raw._embedded?.["wp:term"]?.[0] ?? [];
  const tagTerms: any[] = raw._embedded?.["wp:term"]?.[1] ?? [];
  const realTerms = terms.filter((t) => t.slug !== "uncategorized");
  const category = realTerms[0] ?? null;
  const authorName = text(raw._embedded?.author?.[0]?.name);
  const content = rewriteMedia<string>(raw.content?.rendered ?? "");
  const words = plainText(content).split(" ").filter(Boolean).length;
  const acf = rewriteMedia<any>(raw.acf && !Array.isArray(raw.acf) ? raw.acf : {});
  const yoast = raw.yoast_head_json ?? {};

  const faqs: PostFaq[] = (Array.isArray(acf.faqs) ? acf.faqs : [])
    .filter((row: any) => text(row?.question) && text(row?.answer))
    .sort((a: any, b: any) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0))
    .map((row: any) => ({ question: text(row.question), answer: text(row.answer) }));

  const ctas: PostCta[] = (Array.isArray(acf.post_ctas) ? acf.post_ctas : [])
    .map((row: any, position: number) => ({ row, index: position + 1 }))
    .filter(({ row }: any) => text(row?.title) && text(row?.button_url))
    .map(({ row, index }: any) => ({
      index,
      after: Math.max(1, Number(row.after_paragraph) || 3),
      eyebrow: text(row.eyebrow),
      title: text(row.title),
      text: text(row.text),
      label: text(row.button_label) || "Contact our engineers",
      url: text(row.button_url),
      label2: text(row.secondary_label),
      url2: text(row.secondary_url),
    }))
    .sort((a: PostCta, b: PostCta) => a.after - b.after);

  const mode = (value: unknown): "default" | "custom" | "hide" =>
    value === "custom" || value === "hide" ? value : "default";
  const flag = (value: unknown) => value === true || value === 1 || value === "1";

  const options: PostOptions = {
    schemaType: ["Article", "BlogPosting", "TechArticle", "NewsArticle"].includes(text(acf.blog_schema_type))
      ? text(acf.blog_schema_type)
      : "",
    schemaFaqOff: flag(acf.blog_schema_faq_off),
    schemaAuthor: text(acf.blog_schema_author),
    schemaCustom: parseJsonLd(text(acf.blog_schema_custom)),
    side: mode(acf.blog_side_mode),
    sideBlock: {
      eyebrow: "",
      title: text(acf.blog_side_title),
      text: text(acf.blog_side_text),
      label: text(acf.blog_side_label),
      url: text(acf.blog_side_url),
      label2: "",
      url2: "",
    },
    bottom: mode(acf.blog_bottom_mode),
    bottomBlock: {
      eyebrow: text(acf.blog_bottom_eyebrow),
      title: text(acf.blog_bottom_title),
      text: text(acf.blog_bottom_body),
      label: text(acf.blog_bottom_label),
      url: text(acf.blog_bottom_url),
      label2: text(acf.blog_bottom_label2),
      url2: text(acf.blog_bottom_url2),
    },
    heroLabel: text(acf.blog_hero_label),
    byline: text(acf.blog_byline),
    faqTitle: text(acf.blog_faq_title),
    faqText: text(acf.blog_faq_text),
    hideImage: flag(acf.blog_hide_image),
    hideExcerpt: flag(acf.blog_hide_excerpt),
    hideRelated: flag(acf.blog_hide_related),
  };

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
    categories: realTerms.map((t) => ({ name: decode(t.name), slug: t.slug })),
    tags: tagTerms.map((t) => ({ name: decode(t.name), slug: t.slug })),
    author: authorName && !authorName.includes("@") ? authorName : null,
    faqs,
    ctas,
    options,
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
      `${base()}/wp-json/wp/v2/posts?per_page=${limit}&status=publish&_embed=wp:featuredmedia,wp:term,author`,
      { next: { revalidate: 900, tags: ["wp-posts"] } },
    );
    if (!response.ok) return [];
    const rows: any[] = await readJson(response);
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
      `${base()}/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&status=publish&_embed=wp:featuredmedia,wp:term,author`,
      { next: { revalidate: 900, tags: ["wp-posts"] } },
    );
    if (!response.ok) return { posts: [], totalPages: 1 };
    const rows: any[] = await readJson(response);
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
      `${base()}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&status=publish&_embed=wp:featuredmedia,wp:term,author`,
      { next: { revalidate: 900, tags: ["wp-posts", `wp-post-${slug}`] } },
    );
    if (!response.ok) return null;
    const rows: any[] = await readJson(response);
    return rows[0] ? toPost(rows[0]) : null;
  } catch (error) {
    console.error(`getPost(${slug}) failed:`, error);
    return null;
  }
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

/** Categories that have at least one published article, most used first. */
export async function getCategories(): Promise<BlogCategory[]> {
  try {
    const response = await fetch(
      `${base()}/wp-json/wp/v2/categories?per_page=100&hide_empty=true&orderby=count&order=desc`,
      { next: { revalidate: 900, tags: ["wp-posts"] } },
    );
    if (!response.ok) return [];
    const rows: any[] = await readJson(response);
    return rows
      .filter((row) => row.slug !== "uncategorized" && row.count > 0)
      .map((row) => ({ id: row.id, name: decode(row.name), slug: row.slug, count: row.count }));
  } catch (error) {
    console.error("getCategories failed:", error);
    return [];
  }
}

/** The published articles filed under one category, newest first. */
export async function getPostsByCategory(slug: string): Promise<{ category: BlogCategory | null; posts: BlogPost[] }> {
  const category = (await getCategories()).find((c) => c.slug === slug) ?? null;
  if (!category) return { category: null, posts: [] };
  try {
    const response = await fetch(
      `${base()}/wp-json/wp/v2/posts?categories=${category.id}&per_page=50&status=publish&_embed=wp:featuredmedia,wp:term,author`,
      { next: { revalidate: 900, tags: ["wp-posts"] } },
    );
    if (!response.ok) return { category, posts: [] };
    const rows: any[] = await readJson(response);
    return { category, posts: rows.filter((row) => !SAMPLE_SLUGS.has(row.slug)).map(toPost) };
  } catch (error) {
    console.error(`getPostsByCategory(${slug}) failed:`, error);
    return { category, posts: [] };
  }
}

const BLOG_SETTINGS_FALLBACK: BlogSettings = {
  index: {
    eyebrow: "Blog",
    title: "Insights from the plant floor",
    lead: "How mesh decisions are made: alloy, construction, treatment and validation, written by the engineers who make it.",
    seoTitle: "",
    seoDesc: "",
  },
  side: {
    eyebrow: "",
    title: "Talk to an engineer",
    text: "Send your drawing, material and duty. We reply with a mesh route and lead time.",
    label: "Contact our engineers",
    url: "/contact#enquiry-general",
    label2: "",
    url2: "",
  },
  bottom: {
    eyebrow: "Ask the engineers",
    title: "Have a question this article doesn't answer?",
    text: "Send the application, the duty and the envelope. Our application engineers reply with a material recommendation and an indicative lead time.",
    label: "Contact our engineers",
    url: "/contact#enquiry-general",
    label2: "",
    url2: "",
  },
  faq: { title: "Frequently asked questions", text: "Quick answers on the topic of this article." },
  schemaType: "Article",
};

/** Posts → Blog Settings. Anything left empty falls back to the built-in copy. */
export async function getBlogSettings(): Promise<BlogSettings> {
  const fb = BLOG_SETTINGS_FALLBACK;
  try {
    const response = await fetch(`${base()}/wp-json/bvk/v1/blog-settings`, {
      next: { revalidate: 900, tags: ["wp-posts"] },
    });
    if (!response.ok) return fb;
    const raw: any = await readJson(response);
    const pick = (value: unknown, fallback: string) => text(value) || fallback;
    const block = (r: any, f: PostBlock): PostBlock => ({
      eyebrow: pick(r?.eyebrow, f.eyebrow),
      title: pick(r?.title, f.title),
      text: pick(r?.text ?? r?.body, f.text),
      label: pick(r?.label, f.label),
      url: pick(r?.url, f.url),
      label2: text(r?.label2),
      url2: text(r?.url2),
    });
    return {
      index: {
        eyebrow: pick(raw?.index?.eyebrow, fb.index.eyebrow),
        title: pick(raw?.index?.title, fb.index.title),
        lead: pick(raw?.index?.lead, fb.index.lead),
        seoTitle: text(raw?.index?.seoTitle),
        seoDesc: text(raw?.index?.seoDesc),
      },
      side: block(raw?.side, fb.side),
      bottom: block(raw?.bottom, fb.bottom),
      faq: { title: pick(raw?.faq?.title, fb.faq.title), text: pick(raw?.faq?.text, fb.faq.text) },
      schemaType: pick(raw?.schemaType, fb.schemaType),
    };
  } catch (error) {
    console.error("getBlogSettings failed:", error);
    return fb;
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
