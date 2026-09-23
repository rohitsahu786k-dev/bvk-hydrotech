import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import EnhancedPageContent, { hasPageEnhancement } from "@/components/sections/EnhancedPageContent";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CertificationsStrip from "@/components/sections/CertificationsStrip";
import { getPageSlugs, getSitePage } from "@/lib/wordpress/pages";
import { getCertifications } from "@/lib/wordpress/home";

export const revalidate = 900;

type PageProps = { params: Promise<{ slug: string }> };

const CERTIFIED_SLUGS = new Set([
  "about",
  "precision-mesh-solutions",
  "woven-mesh-solutions",
  "knitted-mesh-solutions",
  "electrolyser-solutions",
  "fuel-cell-solutions",
  "engineering-manufacturing",
  "process-treatments",
  "rd-cfd-prototyping",
  "industries-applications",
  "industrial-filtration",
  "energy-clean-tech",
  "sustainability",
  "resources",
]);

const SEO_FALLBACKS: Record<string, { title: string; description: string }> = {
  about: {
    title: "About BVK Hydrotech | Precision Mesh Manufacturer in India",
    description:
      "BVK Hydrotech is a Jaipur-based precision woven and knitted wire mesh manufacturer for green hydrogen, fuel cells, industrial filtration and clean-energy applications.",
  },
  "precision-mesh-solutions": {
    title: "Precision Wire Mesh Solutions | Woven and Knitted Metal Mesh",
    description:
      "Explore BVK Hydrotech precision wire mesh, woven mesh, knitted mesh, stainless steel mesh, nickel mesh and custom metal mesh parts for filtration and clean energy.",
  },
  "woven-mesh-solutions": {
    title: "Woven Wire Mesh Manufacturer | Stainless Steel, Nickel and Copper Mesh",
    description:
      "Controlled-aperture woven wire mesh for industrial filtration, electrolysers, fuel cells, separation and custom metal mesh components.",
  },
  "knitted-mesh-solutions": {
    title: "Knitted Wire Mesh for Hydrogen, Filters and Flexible Assemblies",
    description:
      "Single, double and multi-end knitted wire mesh for gas diffusion layers, electrolyser stacks, filters, elastic elements and custom formed mesh parts.",
  },
  "electrolyser-solutions": {
    title: "Electrolyser Mesh for Green Hydrogen Stacks",
    description:
      "Woven and knitted electrolyser mesh for alkaline and PEM stacks, gas diffusion, current collection, catalyst support and hydrogen-ready components.",
  },
  "fuel-cell-solutions": {
    title: "Fuel Cell Mesh for Gas Diffusion and Electrode Support",
    description:
      "Fuel cell metal mesh solutions for gas diffusion, current collection, electrode support and durable stack components.",
  },
  "industrial-filtration": {
    title: "Industrial Filtration Mesh | Stainless Steel and Custom Wire Mesh",
    description:
      "Industrial filtration mesh for separation, dewatering, process protection, chemical processing, mining, paper, food and beverage applications.",
  },
};

export async function generateStaticParams() {
  const slugs = await getPageSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getSitePage(slug);
  if (!page) return {};

  return {
    title: page.seo.title || SEO_FALLBACKS[page.slug]?.title || page.title,
    description: page.seo.description || SEO_FALLBACKS[page.slug]?.description || page.hero.subtitle || undefined,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: page.seo.title || SEO_FALLBACKS[page.slug]?.title || page.title,
      description: page.seo.description || SEO_FALLBACKS[page.slug]?.description || page.hero.subtitle || undefined,
      images: page.hero.image?.sourceUrl ? [page.hero.image.sourceUrl] : undefined,
    },
  };
}

export default async function SitePage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getSitePage(slug);

  if (!page) notFound();

  const certifications = CERTIFIED_SLUGS.has(page.slug) ? await getCertifications() : [];
  const enhanced = hasPageEnhancement(page.slug);

  return (
    <>
      <PageHero hero={page.hero} title={page.title} />

      {enhanced ? (
        <EnhancedPageContent slug={page.slug} />
      ) : (
        <section className="section bg-surface">
          <div className="shell">
            {page.content ? (
              <div
                className="wp-content"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            ) : (
              <div className="mx-auto max-w-2xl border border-hairline p-10 text-center">
                <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                  This section is being written
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-grey">
                  Body content for <strong>{page.title}</strong> has not been published in the CMS
                  yet. In the meantime our application engineers can answer any question directly.
                </p>
                <Link href="/contact" className="btn btn-green group mt-7">
                  Talk to an engineer
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      <CertificationsStrip
        items={certifications}
        title="Certified quality, safety and compliance"
        description="The same management systems and compliance badges audited across every order: quality, environment, safety, energy and material conformity."
      />

      <FaqAccordion
        faqs={page.faqs}
        title={`${page.title} FAQs`}
        description="Page-specific questions maintained in WordPress with ACF."
      />
    </>
  );
}
