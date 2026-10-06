import type { FaqItem } from "@/lib/wordpress/home";
import type { PageSeo, SolutionPageContent } from "@/lib/content/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bvkhydrotech.com";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Json = Record<string, any>;

/**
 * Renders a structured-data block.
 *
 * `<` is escaped to its unicode form because JSON.stringify does not sanitise
 * strings that could close the script tag early — see the Next.js JSON-LD guide.
 */
export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Strips markup so an HTML answer can go into a schema text field. */
export function plainText(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "’")
    .replace(/\s+/g, " ")
    .trim();
}

export const organisationId = `${siteUrl}/#organization`;

export function organisationSchema(settings: {
  email?: string | null;
  phone?: string | null;
  linkedin?: string | null;
  tagline?: string | null;
  credentials?: string[];
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organisationId,
    name: "BVK Hydrotech India Pvt. Ltd.",
    alternateName: "BVK Hydrotech",
    url: siteUrl,
    foundingDate: "1963",
    description:
      "Manufacturer of precision woven and knitted metal mesh for green hydrogen electrolysers, fuel cells and industrial filtration.",
    parentOrganization: { "@type": "Organization", name: "BVK Group" },
    slogan: settings.tagline ?? "Indian Agility. German Precision. Performance Engineered.",
    email: settings.email ?? undefined,
    telephone: settings.phone ?? undefined,
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 300 },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Industrial Area, Jhotwara",
      addressLocality: "Jaipur",
      postalCode: "302012",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    sameAs: [settings.linkedin].filter(Boolean),
    hasCredential: settings.credentials?.length
      ? settings.credentials
      : [
          "IATF 16949:2016",
          "ISO 9001:2015",
          "ISO 14001:2015",
          "ISO 45001:2018",
          "ISO 50001:2018",
          "AS9100",
          "DSIR Recognised R&D Centre",
        ],
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "BVK Hydrotech",
    publisher: { "@id": organisationId },
    inLanguage: "en-IN",
  };
}

export function breadcrumbSchema(crumb: string, slug: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: crumb, item: `${siteUrl}/${slug}` },
    ],
  };
}

export function faqSchema(faqs: FaqItem[]): Json | null {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: plainText(faq.question),
      acceptedAnswer: { "@type": "Answer", text: plainText(faq.answer) },
    })),
  };
}

/** The page's main entity: a Product for mesh ranges, a Service for capability. */
export function mainEntitySchema(
  seo: PageSeo,
  content: SolutionPageContent | null,
  slug: string,
): Json | null {
  if (!seo.schema) return null;
  const { schema } = seo;
  const url = `${siteUrl}/${slug}`;
  const image = content?.hero.image.src;

  const base: Json = {
    "@context": "https://schema.org",
    "@type": schema.type,
    name: schema.name,
    description: schema.description,
    url,
  };

  if (schema.type === "Product") {
    return {
      ...base,
      image,
      brand: { "@type": "Brand", name: "BVK Hydrotech" },
      manufacturer: { "@id": organisationId },
      material: schema.material,
      category: "Industrial precision metal mesh",
    };
  }

  if (schema.type === "Service") {
    return {
      ...base,
      serviceType: schema.serviceType,
      provider: { "@id": organisationId },
      areaServed: "Worldwide",
    };
  }

  return { ...base, isPartOf: { "@id": `${siteUrl}/#website` }, about: { "@id": organisationId } };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
