import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import SolutionPage from "@/components/templates/SolutionPage";
import CorporatePage from "@/components/templates/CorporatePage";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CertificationsStrip from "@/components/sections/CertificationsStrip";
import { getPageFaqs, getPageSlugs, getSitePage } from "@/lib/wordpress/pages";
import { getCertifications } from "@/lib/wordpress/home";
import { contentSlugs, getPageContent, isSolutionPage } from "@/content";
import { canonicalOverrides, noindexSlugs, pageSeo } from "@/content/seo";
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  mainEntitySchema,
} from "@/lib/seo/jsonLd";

export const revalidate = 900;

type PageProps = { params: Promise<{ slug: string }> };

/** Legal pages render the body authored in WordPress, not a template. */
const LEGAL_SLUGS = new Set([
  "privacy-policy",
  "terms-of-use",
  "terms-and-conditions",
  "cookie-policy",
  "disclaimer",
]);

export async function generateStaticParams() {
  // The local content layer is the floor: even if WordPress is unreachable at
  // build time, every designed page still pre-renders.
  const cmsSlugs = await getPageSlugs();
  const slugs = new Set([...contentSlugs, ...cmsSlugs.map((p) => p.slug)]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const seo = pageSeo[slug];
  const content = getPageContent(slug);
  const page = await getSitePage(slug);

  if (!seo && !content && !page) return {};

  // The curated titles in content/seo.ts are the keyword-targeted ones and
  // already carry the brand where it helps, so they win and are marked
  // `absolute` to stop the layout template appending the brand a second time.
  // WordPress only fills the gap for pages with no curated entry.
  const title = seo?.title || page?.seo.title || page?.title;
  const description =
    seo?.description || page?.seo.description || page?.hero.subtitle || undefined;
  const image = content?.hero.image.src ?? page?.hero.image?.sourceUrl;

  return {
    title: seo?.title ? { absolute: seo.title } : title,
    description,
    keywords: seo?.keywords,
    alternates: { canonical: canonicalOverrides[slug] ?? `/${slug}` },
    robots: noindexSlugs.has(slug) ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      title,
      description,
      url: `/${slug}`,
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

export default async function SitePage({ params }: PageProps) {
  const { slug } = await params;
  const content = getPageContent(slug);

  // FAQs come over REST and the page body over GraphQL. Fetching them
  // separately means a GraphQL outage costs us the CMS body, not the FAQs and
  // their schema as well.
  const [page, cmsFaqs] = await Promise.all([getSitePage(slug), getPageFaqs(slug)]);

  // CMS FAQs win; the content layer only fills pages an editor has not covered.
  const faqs = cmsFaqs.length > 0 ? cmsFaqs : content?.faqs ?? [];

  // A page needs either designed content or a CMS record to exist.
  if (!content && !page) notFound();

  const isLegal = LEGAL_SLUGS.has(slug);
  const certifications = content && !isLegal ? await getCertifications() : [];
  const seo = pageSeo[slug];

  const schemas = [
    breadcrumbSchema(content?.breadcrumb ?? page?.title ?? slug, slug),
    seo ? mainEntitySchema(seo, content, slug) : null,
    faqSchema(faqs),
  ].filter(Boolean) as Record<string, unknown>[];

  return (
    <>
      {schemas.length > 0 && <JsonLd data={schemas} />}

      {content ? (
        isSolutionPage(slug) ? (
          <SolutionPage content={content} />
        ) : (
          <CorporatePage content={content} />
        )
      ) : (
        <>
          <PageHero hero={page!.hero} title={page!.title} />
          <section className="section bg-surface">
            <div className="shell">
              {page!.content ? (
                <div className="wp-content" dangerouslySetInnerHTML={{ __html: page!.content }} />
              ) : (
                <div className="mx-auto max-w-2xl border border-hairline p-10 text-center">
                  <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                    This section is being written
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-grey">
                    Body content for <strong>{page!.title}</strong> has not been published in the
                    CMS yet. In the meantime our application engineers can answer any question
                    directly.
                  </p>
                  <Link href="/contact" className="btn btn-green group mt-7">
                    Talk to an engineer
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {certifications.length > 0 && (
        <CertificationsStrip
          items={certifications}
          title="Certified quality, safety and compliance"
          description="The same management systems and compliance badges audited across every order: quality, environment, safety, energy and material conformity."
        />
      )}

      {faqs.length > 0 && (
        <FaqAccordion
          faqs={faqs}
          title={`${content?.breadcrumb ?? page?.title} FAQs`}
          description="Answers to the questions buyers and engineers ask most often about this part of our range."
        />
      )}
    </>
  );
}
