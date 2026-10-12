import Link from "next/link";
import { ArrowRight, FileText, HelpCircle, Newspaper } from "lucide-react";
import BlogCard, { PostImage, PostMeta } from "@/components/blog/BlogCard";
import BlogHero from "@/components/blog/BlogHero";
import CtaBand from "@/components/sections/CtaBand";
import Pagination from "@/components/blog/Pagination";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonLd";
import { getPostsPage } from "@/lib/wordpress/blog";

/**
 * The blog index. Page 1 leads with the newest article as a featured card;
 * later pages are a plain grid. Twenty articles a page.
 */
export default async function BlogListing({ page }: { page: number }) {
  const { posts, totalPages } = await getPostsPage(page);
  const featured = page === 1 ? posts[0] : undefined;
  const rest = page === 1 ? posts.slice(1) : posts;

  return (
    <>
      <JsonLd data={breadcrumbSchema("Blog", page === 1 ? "blog" : `blog/page/${page}`)} />

      <BlogHero
        eyebrow="Blog"
        title="Insights from the plant floor"
        lead="How mesh decisions are made: alloy, construction, treatment and validation, written by the engineers who make it."
      />

      <section className="bg-surface py-12 lg:py-14">
        <div className="shell">
          {posts.length > 0 ? (
            <>
              {featured && (
              <article>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group grid overflow-hidden rounded-xl border border-hairline bg-surface transition duration-300 hover:border-brand-deep/40 hover:shadow-[0_24px_40px_-28px_rgb(0_0_0/0.35)] lg:grid-cols-[1.15fr_1fr]"
                >
                  <span className="relative block aspect-[16/10] lg:aspect-auto lg:min-h-[22rem]">
                    <PostImage post={featured} sizes="(min-width: 1024px) 55vw, 100vw" priority />
                  </span>
                  <span className="flex flex-col justify-center p-6 lg:p-10">
                    <span className="flex items-center gap-3">
                      <span className="rounded-full bg-brand-wash px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-brand-deep">
                        Latest
                      </span>
                      {featured.category && (
                        <span className="text-xs font-semibold uppercase tracking-wider text-grey-mid">
                          {featured.category.name}
                        </span>
                      )}
                    </span>
                    <h2 className="mt-4 font-display text-ink transition-colors group-hover:text-brand-deep">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="mt-3 line-clamp-4 text-[0.9375rem] leading-relaxed text-grey">
                        {featured.excerpt}
                      </p>
                    )}
                    <PostMeta post={featured} className="mt-5" />
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-deep">
                      Read article
                      <ArrowRight
                        aria-hidden
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </span>
                  </span>
                </Link>
              </article>
              )}

              {rest.length > 0 && (
                <>
                  <div className={`mb-6 flex items-center gap-4 ${featured ? "mt-14" : ""}`}>
                    <h2 className="font-display text-ink">
                      {featured ? "More articles" : `All articles, page ${page}`}
                    </h2>
                    <span aria-hidden className="h-px flex-1 bg-hairline" />
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </>
              )}

              <Pagination current={page} total={totalPages} />
            </>
          ) : (
            <div className="mx-auto max-w-2xl rounded-xl border border-hairline bg-surface-raised p-8 text-center lg:p-12">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-wash text-brand-deep">
                <Newspaper aria-hidden className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-ink">Articles are on the way</h2>
              <p className="mt-3 text-sm leading-relaxed text-grey">
                Our engineers are writing up what they know about mesh materials, construction and
                validation. Until then, the brochures and the FAQ cover the same ground.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link href="/resources" className="btn btn-green">
                  <FileText aria-hidden className="h-4 w-4" />
                  Browse downloads
                </Link>
                <Link href="/faqs" className="btn btn-solid">
                  <HelpCircle aria-hidden className="h-4 w-4" />
                  Read the FAQ
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        eyebrow="Ask the engineers"
        title="Have a question the articles don't answer?"
        body="Send the application, the duty and the envelope. Our application engineers reply with a material recommendation and an indicative lead time."
        primary={{ label: "Request technical RFQ", href: "/contact#enquiry" }}
      />
    </>
  );
}
