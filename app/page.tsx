import type { Metadata } from "next";
import { getHomeData } from "@/lib/wordpress/home";
import HeroCarousel from "@/components/sections/HeroCarousel";
import StatsBand from "@/components/sections/StatsBand";
import HomeSolutionsDuo from "@/components/sections/HomeSolutionsDuo";
import HomeMaterials from "@/components/sections/HomeMaterials";
import HomeProcess from "@/components/sections/HomeProcess";
import HomeRnd from "@/components/sections/HomeRnd";
import HomeApplications from "@/components/sections/HomeApplications";
import AboutSection from "@/components/sections/AboutSection";
import KnitTypes from "@/components/sections/KnitTypes";
import CertificationsStrip from "@/components/sections/CertificationsStrip";
import SustainabilitySection from "@/components/sections/SustainabilitySection";
import ResourcesSection from "@/components/sections/ResourcesSection";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CtaSection from "@/components/sections/CtaSection";
import { OG_DEFAULT } from "@/lib/seo/defaults";
import { JsonLd, faqSchema } from "@/lib/seo/jsonLd";

export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: "BVK Hydrotech | Precision Mesh for Electrolysers & Fuel Cells" },
  description:
    "Woven and knitted precision mesh for electrolyser stacks, fuel cells and filtration. Nickel, titanium and stainless steel. IATF 16949 certified since 1963.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "BVK Hydrotech | Precision Mesh for Electrolysers & Fuel Cells",
    description:
      "Woven and knitted precision mesh for electrolyser stacks, fuel cells and filtration. IATF 16949 certified since 1963.",
    images: [OG_DEFAULT],
  },
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
      <HomeSolutionsDuo />
      <AboutSection about={data.about} />
      <KnitTypes products={data.knitTypes} />
      <HomeMaterials />
      <HomeProcess />
      <HomeRnd />
      <HomeApplications />
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
