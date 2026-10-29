import { stripListBullets } from "@/lib/wordpress/encoding";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, MessagesSquare } from "lucide-react";
import BlogCard, { PostMeta } from "@/components/blog/BlogCard";
import BlogHero from "@/components/blog/BlogHero";
import CtaBand from "@/components/sections/CtaBand";
import ScrollCarousel from "@/components/ui/ScrollCarousel";
import FaqAccordion from "@/components/sections/FaqAccordion";
import PostCta from "@/components/blog/PostCta";
import { JsonLd, faqSchema, organisationId } from "@/lib/seo/jsonLd";
import { withCtas } from "@/lib/wordpress/blog-cta";
import {
  formatPostDate,
  getBlogSettings,
  getPost,
  getPosts,
  type PostBlock,
} from "@/lib/wordpress/blog";

export const revalidate = 900;

type PageProps = { params: Promise<{ slug: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bvkhydrotech.com";

/** A custom block (side or bottom) wins over the site-wide one when the article asks for it. */
function pickBlock(mode: "default" | "custom" | "hide", custom: PostBlock, site: PostBlock): PostBlock | null {
  if (mode === "hide") return null;
  if (mode === "custom" && custom.title) {
    return {
      eyebrow: custom.eyebrow,
      title: custom.title,
      text: custom.text || site.text,
      label: custom.label || site.label,
      url: custom.url || site.url,
      label2: custom.label2,
      url2: custom.url2,
    };
  }
  return site;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  // Title, description and share image come from the Yoast SEO plugin;
  // the post's own title, excerpt and featured image only fill the gaps.
  const title = post.seo.title ?? post.title;
  const description = post.seo.description ?? (post.excerpt || undefined);
  const image = post.seo.image ?? post.image?.src;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, all, settings] = await Promise.all([getPost(slug), getPosts(), getBlogSettings()]);
  if (!post) notFound();

  const others = all.filter((p) => p.id !== post.id);
  // Articles that share a category come first, then the rest, newest first.
  const mine = new Set(post.categories.map((c) => c.slug));
  const shares = (p: (typeof all)[number]) => p.categories.some((c) => mine.has(c.slug));
  const related = [...others.filter(shares), ...others.filter((p) => !shares(p))].slice(0, 9);
  const updated = new Date(post.modified).getTime() - new Date(post.date).getTime() > 86_400_000;

  const schema: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": post.options.schemaType || settings.schemaType || "Article",
      headline: post.title,
      description: post.excerpt || undefined,
      datePublished: post.date,
      dateModified: post.modified,
      image: post.image ? [post.image.src] : undefined,
      mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
      articleSection: post.category?.name,
      keywords: post.tags.length ? post.tags.map((t) => t.name).join(", ") : undefined,
      wordCount: post.minutes * 200,
      inLanguage: "en-IN",
      author:
        post.options.schemaAuthor || post.author
          ? {
              "@type": "Person",
              name: post.options.schemaAuthor || post.author,
              worksFor: { "@id": organisationId },
            }
          : { "@id": organisationId },
      publisher: { "@id": organisationId },
    },
  ];

  const faqLd = post.options.schemaFaqOff ? null : faqSchema(post.faqs);
  if (faqLd) schema.push(faqLd);
  // Schema the editor pasted into the article's own custom field.
  schema.push(...post.options.schemaCustom);

  const sideBlock = pickBlock(post.options.side, post.options.sideBlock, settings.side);
  const bottomBlock = pickBlock(post.options.bottom, post.options.bottomBlock, settings.bottom);
  const byline = post.options.byline || post.author || "BVK Hydrotech engineering";

  return (
    <>
      <JsonLd data={schema} />

      <BlogHero eyebrow={post.options.heroLabel || post.category?.name || "Article"} title={post.title}>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-on-dark-muted">
          <span>{byline}</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-ink-line" />
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          {updated && (
            <>
              <span aria-hidden className="h-1 w-1 rounded-full bg-ink-line" />
              <span>
                Updated <time dateTime={post.modified}>{formatPostDate(post.modified)}</time>
              </span>
            </>
          )}
          <span aria-hidden className="h-1 w-1 rounded-full bg-ink-line" />
          <span>{post.minutes} min read</span>
        </div>
      </BlogHero>

      <section className="bg-surface py-12 lg:py-14">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14">
          <article>
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-deep transition-colors hover:text-brand-dim"
            >
              <ArrowLeft aria-hidden className="h-4 w-4" />
              All articles
            </Link>

            {post.image && !post.options.hideImage && (
              <div className="relative mb-8 aspect-[16/8] overflow-hidden rounded-xl bg-ink">
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            {post.excerpt && !post.options.hideExcerpt && (
              <p className="mb-8 border-l-2 border-brand pl-5 text-lg leading-relaxed text-ink">
                {post.excerpt}
              </p>
            )}

            {withCtas(post.content, post.ctas).map((segment, index) =>
              "cta" in segment ? (
                <PostCta key={index} cta={segment.cta} />
              ) : (
                <div
                  key={index}
                  className="rich-text article-body max-w-none"
                  dangerouslySetInnerHTML={{ __html: stripListBullets(segment.html) }}
                />
              ),
            )}

            {(post.categories.length > 0 || post.tags.length > 0) && (
              <ul aria-label="Topics" className="mt-10 flex flex-wrap gap-2">
                {post.categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/blog/category/${c.slug}`}
                      className="rounded-full bg-brand-wash px-3 py-1 text-xs font-semibold text-brand-deep transition-colors hover:bg-brand-deep hover:text-white"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
                {post.tags.map((t) => (
                  <li key={t.slug} className="rounded-full border border-hairline px-3 py-1 text-xs text-grey">
                    #{t.name}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6">
              <PostMeta post={post} />
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-deep transition-colors hover:text-brand-dim"
              >
                Back to all articles
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {sideBlock && (
              <div className="rounded-xl bg-ink p-6 text-on-dark">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 text-brand">
                  <MessagesSquare aria-hidden className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-display text-white">{sideBlock.title}</h2>
                {sideBlock.text && (
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-on-dark-muted">{sideBlock.text}</p>
                )}
                <Link href={sideBlock.url} className="btn btn-green mt-5 w-full">
                  {sideBlock.label}
                  <ArrowUpRight aria-hidden className="h-4 w-4" />
                </Link>
              </div>
            )}

            {others.length > 0 && (
              <div className="rounded-xl border border-hairline p-6">
                <h2 className="font-display text-ink">Latest articles</h2>
                <ul className="mt-4 divide-y divide-hairline">
                  {others.slice(0, 4).map((p) => (
                    <li key={p.id}>
                      <Link href={`/blog/${p.slug}`} className="group block py-3">
                        <span className="block text-sm font-medium leading-snug text-ink transition-colors group-hover:text-brand-deep">
                          {p.title}
                        </span>
                        <span className="mt-1 block text-xs text-grey-mid">
                          {formatPostDate(p.date)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {post.faqs.length > 0 && (
        <FaqAccordion
          faqs={post.faqs}
          title={post.options.faqTitle || settings.faq.title}
          description={post.options.faqText || settings.faq.text}
        />
      )}

      {related.length > 0 && !post.options.hideRelated && (
        <section className="border-t border-hairline bg-surface-raised py-12 lg:py-14">
          <div className="shell">
            <div className="mb-6 flex items-center gap-4">
              <h2 className="font-display text-ink">Keep reading</h2>
              <span aria-hidden className="h-px flex-1 bg-hairline" />
            </div>
          </div>
          <ScrollCarousel label="More articles">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </ScrollCarousel>
        </section>
      )}

      {bottomBlock && (
        <CtaBand
          eyebrow={bottomBlock.eyebrow}
          title={bottomBlock.title}
          body={bottomBlock.text}
          primary={{ label: bottomBlock.label, href: bottomBlock.url }}
          secondary={
            bottomBlock.label2 && bottomBlock.url2
              ? { label: bottomBlock.label2, href: bottomBlock.url2 }
              : undefined
          }
        />
      )}
    </>
  );
}
