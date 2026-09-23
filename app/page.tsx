import type { Metadata } from "next";
import { getHomeData } from "@/lib/wordpress/home";
import HeroCarousel from "@/components/sections/HeroCarousel";
import StatsBand from "@/components/sections/StatsBand";
import SolutionsGrid from "@/components/sections/SolutionsGrid";
import AboutSection from "@/components/sections/AboutSection";
import KnitTypes from "@/components/sections/KnitTypes";
import CertificationsStrip from "@/components/sections/CertificationsStrip";
import IndustriesSection from "@/components/sections/IndustriesSection";
import SustainabilitySection from "@/components/sections/SustainabilitySection";
import ResourcesSection from "@/components/sections/ResourcesSection";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CtaSection from "@/components/sections/CtaSection";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Precision Mesh For The Hydrogen Economy",
  description:
    "BVK Hydrotech engineers woven and knitted precision mesh for electrolyser stacks, fuel cell electrodes and gas diffusion layers. Single-piece up to 2.2 m, Nickel 201/202, titanium and stainless steel. IATF 16949 and ISO 9001 certified, exporting to 25+ countries since 1963.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const data = await getHomeData();

  // Question-led content marked up for answer engines, built from the same
  // FAQ records the accordion renders.
  const faqSchema =
    data.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: data.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
            },
          })),
        }
      : null;

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BVK Hydrotech India Pvt. Ltd.",
    alternateName: "BVK Hydrotech",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    foundingDate: "1963",
    parentOrganization: { "@type": "Organization", name: "BVK Group" },
    slogan: data.settings.tagline ?? undefined,
    email: data.settings.email ?? undefined,
    telephone: data.settings.phone ?? undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: "52-B (part), Industrial Area, Jhotwara",
      addressLocality: "Jaipur",
      postalCode: "302012",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    sameAs: [data.settings.linkedin].filter(Boolean),
    hasCredential: data.certifications.map((c) => c.standard ?? c.title),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <HeroCarousel slides={data.slides} />
      <StatsBand stats={data.stats} />
      <SolutionsGrid solutions={data.solutions} />
      <AboutSection about={data.about} />
      <KnitTypes products={data.knitTypes} />
      <IndustriesSection industries={data.industries} />
      <SustainabilitySection
        title={data.sustainability.title}
        description={data.sustainability.description}
        stats={data.sustainability.stats}
        image={data.sustainability.image}
      />
      <ResourcesSection downloads={data.downloads} />
      <FaqAccordion faqs={data.faqs} />
      <CertificationsStrip items={data.certifications} />
      <CtaSection cta={data.cta} settings={data.settings} />
    </>
  );
}
