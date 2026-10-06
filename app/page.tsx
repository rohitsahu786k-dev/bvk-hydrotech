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
import { JsonLd, faqSchema } from "@/lib/seo/jsonLd";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Precision Mesh For The Hydrogen Economy",
  description:
    "BVK Hydrotech engineers woven and knitted precision mesh for electrolyser stacks, fuel cell electrodes and gas diffusion layers. Single-piece up to 2.2 m, Nickel 201/202, titanium and stainless steel. IATF 16949 and ISO 9001 certified, exporting to 25+ countries since 1963.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const data = await getHomeData();

  // Organization and WebSite are declared once in the root layout. The home
  // page adds the question-led markup answer engines read, built from the same
  // FAQ records the accordion renders.
  const schema = faqSchema(data.faqs);

  return (
    <>
      {schema && <JsonLd data={schema} />}

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
