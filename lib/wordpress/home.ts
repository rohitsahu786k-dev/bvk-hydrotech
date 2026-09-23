/**
 * Homepage data: one GraphQL round trip for every section on the page.
 *
 * Everything the homepage renders is authored in WordPress — hero slides,
 * stats, solution cards, knit types, industries, certifications, downloads,
 * FAQs, the closing CTA and both navigation menus. Nothing here is hardcoded
 * copy; the fallbacks exist only so a half-populated CMS still renders.
 */

import fetchGraphQL from "./graphql-client";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WPImage {
  sourceUrl: string;
  altText?: string | null;
  mediaDetails?: { width?: number | null; height?: number | null } | null;
}

type ImageNode = { node: WPImage | null } | null;

export interface HeroSlide {
  databaseId: number;
  eyebrow?: string | null;
  title: string;
  titleMuted?: string | null;
  subtitle?: string | null;
  ctaText?: string | null;
  ctaUrl?: string | null;
  cta2Text?: string | null;
  cta2Url?: string | null;
  focalPoint: string;
  imageDesktop: WPImage | null;
  imageMobile: WPImage | null;
}

export interface SolutionCard {
  title: string;
  slug: string;
  description: string;
  iconName?: string | null;
  features: string[];
  image: WPImage | null;
}

export interface KnitType {
  title: string;
  slug: string;
  description: string;
  material?: string | null;
  wireDiameter?: string | null;
  meshCount?: string | null;
  applications: string[];
  image: WPImage | null;
}

export interface IndustryCard {
  title: string;
  slug: string;
  description: string;
  iconName?: string | null;
  applications: string[];
  image: WPImage | null;
}

export interface Certification {
  title: string;
  standard?: string | null;
  issuer?: string | null;
  description?: string | null;
  logo: WPImage | null;
}

export interface DownloadItem {
  title: string;
  slug: string;
  description?: string | null;
  type?: string | null;
  fileUrl?: string | null;
  image: WPImage | null;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string | null;
}

export interface MenuLink {
  label: string;
  url: string;
  children?: MenuLink[];
}

export interface SiteSettings {
  phone?: string | null;
  phone2?: string | null;
  email?: string | null;
  address?: string | null;
  factoryAddress?: string | null;
  linkedin?: string | null;
  whatsapp?: string | null;
  tagline?: string | null;
  copyright?: string | null;
}

export interface HomeStat {
  number: string;
  label: string;
}

export interface HomeData {
  stats: HomeStat[];
  about: {
    title?: string | null;
    content?: string | null;
    image: WPImage | null;
  };
  cta: {
    title?: string | null;
    description?: string | null;
    buttonText?: string | null;
    buttonUrl?: string | null;
    secondaryButtonText?: string | null;
    secondaryButtonUrl?: string | null;
    image: WPImage | null;
  };
  sustainability: {
    title?: string | null;
    description?: string | null;
    stats: HomeStat[];
    image: WPImage | null;
  };
  slides: HeroSlide[];
  solutions: SolutionCard[];
  knitTypes: KnitType[];
  industries: IndustryCard[];
  certifications: Certification[];
  downloads: DownloadItem[];
  faqs: FaqItem[];
  menus: { primary: MenuLink[]; footer1: MenuLink[]; footer2: MenuLink[]; footer3: MenuLink[]; legal: MenuLink[] };
  settings: SiteSettings;
}

// ---------------------------------------------------------------------------
// Query
// ---------------------------------------------------------------------------

const IMAGE = `sourceUrl altText mediaDetails { width height }`;

const MENU_FIELDS = `
  menuItems(first: 60) {
    nodes {
      label
      url
      parentId
      childItems {
        nodes {
          label
          url
          parentId
        }
      }
    }
  }
`;

export const HOME_QUERY = `
  query HomePage {
    page(id: "/", idType: URI) {
      title
      homepageSections {
        stat1Number stat1Label
        stat2Number stat2Label
        stat3Number stat3Label
        stat4Number stat4Label
        aboutSectionTitle
        aboutSectionContent
        aboutSectionImage { node { ${IMAGE} } }
        ctaTitle
        ctaDescription
        ctaButtonText ctaButtonUrl
        ctaSecondaryButtonText ctaSecondaryButtonUrl
        ctaBgImage { node { ${IMAGE} } }
      }
    }
    sustainability: page(id: "sustainability", idType: URI) {
      pageHero { heroTitle heroSubtitle heroImage { node { ${IMAGE} } } }
      homepageSections {
        stat1Number stat1Label
        stat2Number stat2Label
        stat3Number stat3Label
        stat4Number stat4Label
      }
    }
    heroSlides(first: 12) {
      nodes {
        databaseId
        heroSlideDetails {
          eyebrow title titleMuted subtitle
          ctaText ctaUrl cta2Text cta2Url
          isActive sortOrder focalPoint
          imageDesktop { node { ${IMAGE} } }
          imageMobile { node { ${IMAGE} } }
        }
      }
    }
    services(first: 12) {
      nodes {
        title slug
        featuredImage { node { ${IMAGE} } }
        serviceDetails { shortDescription iconName features isFeatured }
      }
    }
    products(first: 12) {
      nodes {
        title slug
        featuredImage { node { ${IMAGE} } }
        productDetails {
          shortDescription material wireDiameter meshCount
          applications isFeatured sortOrder
        }
      }
    }
    industries(first: 16) {
      nodes {
        title slug
        featuredImage { node { ${IMAGE} } }
        industryDetails { shortDescription iconName applications sortOrder }
      }
    }
    certifications(first: 16) {
      nodes {
        title
        certificationDetails {
          standard issuer description sortOrder
          logo { node { ${IMAGE} } }
        }
      }
    }
    downloads(first: 8) {
      nodes {
        title slug
        featuredImage { node { ${IMAGE} } }
        downloadDetails {
          downloadType description isFeatured
          downloadFile { node { mediaItemUrl } }
        }
      }
    }
    faqs(first: 12) {
      nodes { faqDetails { question answer faqCategory sortOrder } }
    }
    settings: pages(where: { name: "site-settings" }, first: 1) {
      nodes {
        siteSettings {
          sitePhone sitePhone2 siteEmail siteAddress factoryAddress
          socialLinkedin socialWhatsapp footerTagline copyrightText
        }
      }
    }
    primary: menu(id: "primary", idType: SLUG) { ${MENU_FIELDS} }
    footer1: menu(id: "footer1", idType: SLUG) { ${MENU_FIELDS} }
    footer2: menu(id: "footer2", idType: SLUG) { ${MENU_FIELDS} }
    footer3: menu(id: "footer3", idType: SLUG) { ${MENU_FIELDS} }
    legal:   menu(id: "legal",   idType: SLUG) { ${MENU_FIELDS} }
  }
`;

// ---------------------------------------------------------------------------
// Normalisation
// ---------------------------------------------------------------------------

const img = (node: ImageNode): WPImage | null => node?.node ?? null;

/** ACF textareas hold one item per line; empty lines are noise. */
const lines = (value?: string | null): string[] =>
  (value ?? "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

/** ACF select fields come back as an array even for a single choice. */
const firstChoice = (value: unknown, fallback: string): string => {
  if (Array.isArray(value)) return (value[0] as string) ?? fallback;
  if (typeof value === "string" && value) return value;
  return fallback;
};

type RawMenuLink = MenuLink & { parentId?: string | null; childItems?: { nodes?: MenuLink[] } };

const menu = (node: { menuItems?: { nodes?: RawMenuLink[] } } | null): MenuLink[] =>
  node?.menuItems?.nodes
    ?.filter((i) => i?.label && i?.url && !i.parentId)
    .map((i) => ({
      label: i.label,
      url: i.url,
      children: i.childItems?.nodes?.filter((c) => c?.label && c?.url) ?? [],
    })) ?? [];

const byOrder = <T extends { sortOrder?: number | null }>(a: T, b: T) =>
  (a.sortOrder ?? 99) - (b.sortOrder ?? 99);

/* eslint-disable @typescript-eslint/no-explicit-any */
function normalise(raw: any): HomeData {
  const home = raw?.page?.homepageSections ?? {};

  /** stat1..stat4 are four flat ACF pairs; read them as a list. */
  const statsFrom = (group: any): HomeStat[] =>
    [1, 2, 3, 4]
      .map((n) => ({
        number: group?.[`stat${n}Number`] ?? "",
        label: group?.[`stat${n}Label`] ?? "",
      }))
      .filter((s) => s.number || s.label);

  const stats = statsFrom(home);

  const sus = raw?.sustainability ?? {};

  const slides: HeroSlide[] = (raw?.heroSlides?.nodes ?? [])
    .map((n: any) => ({ id: n.databaseId, d: n.heroSlideDetails }))
    .filter((s: any) => s.d && s.d.isActive !== false && s.d.title)
    .sort((a: any, b: any) => (a.d.sortOrder ?? 99) - (b.d.sortOrder ?? 99))
    .map(({ id, d }: any) => ({
      databaseId: id,
      eyebrow: d.eyebrow,
      title: d.title,
      titleMuted: d.titleMuted,
      subtitle: d.subtitle,
      ctaText: d.ctaText,
      ctaUrl: d.ctaUrl,
      cta2Text: d.cta2Text,
      cta2Url: d.cta2Url,
      focalPoint: firstChoice(d.focalPoint, "center"),
      imageDesktop: img(d.imageDesktop),
      // Falls back to the desktop crop until a portrait one is uploaded.
      imageMobile: img(d.imageMobile) ?? img(d.imageDesktop),
    }));

  const solutions: SolutionCard[] = (raw?.services?.nodes ?? [])
    .map((n: any) => ({
      title: n.title,
      slug: n.slug,
      description: n.serviceDetails?.shortDescription ?? "",
      iconName: n.serviceDetails?.iconName,
      features: lines(n.serviceDetails?.features),
      image: img(n.featuredImage),
    }));

  const knitTypes: KnitType[] = (raw?.products?.nodes ?? [])
    .map((n: any) => ({
      title: n.title,
      slug: n.slug,
      description: n.productDetails?.shortDescription ?? "",
      material: n.productDetails?.material,
      wireDiameter: n.productDetails?.wireDiameter,
      meshCount: n.productDetails?.meshCount,
      applications: lines(n.productDetails?.applications),
      image: img(n.featuredImage),
      sortOrder: n.productDetails?.sortOrder,
    }))
    .sort(byOrder);

  const industries: IndustryCard[] = (raw?.industries?.nodes ?? [])
    .map((n: any) => ({
      title: n.title,
      slug: n.slug,
      description: n.industryDetails?.shortDescription ?? "",
      iconName: n.industryDetails?.iconName,
      applications: lines(n.industryDetails?.applications),
      image: img(n.featuredImage),
      sortOrder: n.industryDetails?.sortOrder,
    }))
    .sort(byOrder);

  const certifications: Certification[] = (raw?.certifications?.nodes ?? [])
    .map((n: any) => ({
      title: n.title,
      standard: n.certificationDetails?.standard,
      issuer: n.certificationDetails?.issuer,
      description: n.certificationDetails?.description,
      logo: img(n.certificationDetails?.logo),
      sortOrder: n.certificationDetails?.sortOrder,
    }))
    .sort(byOrder);

  const downloads: DownloadItem[] = (raw?.downloads?.nodes ?? []).map((n: any) => ({
    title: n.title,
    slug: n.slug,
    description: n.downloadDetails?.description,
    type: n.downloadDetails?.downloadType,
    fileUrl: n.downloadDetails?.downloadFile?.node?.mediaItemUrl ?? null,
    image: img(n.featuredImage),
  }));

  const faqs: FaqItem[] = (raw?.faqs?.nodes ?? [])
    .map((n: any) => n.faqDetails)
    .filter((d: any) => d?.question)
    .sort(byOrder)
    .map((d: any) => ({
      question: d.question,
      answer: d.answer ?? "",
      category: d.faqCategory,
    }));

  const s = raw?.settings?.nodes?.[0]?.siteSettings ?? {};

  return {
    stats,
    about: {
      title: home.aboutSectionTitle,
      content: home.aboutSectionContent,
      image: img(home.aboutSectionImage),
    },
    cta: {
      title: home.ctaTitle,
      description: home.ctaDescription,
      buttonText: home.ctaButtonText,
      buttonUrl: home.ctaButtonUrl,
      secondaryButtonText: home.ctaSecondaryButtonText,
      secondaryButtonUrl: home.ctaSecondaryButtonUrl,
      image: img(home.ctaBgImage),
    },
    sustainability: {
      title: sus.pageHero?.heroTitle,
      description: sus.pageHero?.heroSubtitle,
      stats: statsFrom(sus.homepageSections),
      image: img(sus.pageHero?.heroImage),
    },
    slides,
    solutions,
    knitTypes,
    industries,
    certifications,
    downloads,
    faqs,
    menus: {
      primary: menu(raw?.primary),
      footer1: menu(raw?.footer1),
      footer2: menu(raw?.footer2),
      footer3: menu(raw?.footer3),
      legal: menu(raw?.legal),
    },
    settings: {
      phone: s.sitePhone,
      phone2: s.sitePhone2,
      email: s.siteEmail,
      address: s.siteAddress,
      factoryAddress: s.factoryAddress,
      linkedin: s.socialLinkedin,
      whatsapp: s.socialWhatsapp,
      tagline: s.footerTagline,
      copyright: s.copyrightText,
    },
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const EMPTY: HomeData = {
  stats: [],
  about: { title: null, content: null, image: null },
  cta: {
    title: null, description: null, buttonText: null, buttonUrl: null,
    secondaryButtonText: null, secondaryButtonUrl: null, image: null,
  },
  sustainability: { title: null, description: null, stats: [], image: null },
  slides: [],
  solutions: [],
  knitTypes: [],
  industries: [],
  certifications: [],
  downloads: [],
  faqs: [],
  menus: { primary: [], footer1: [], footer2: [], footer3: [], legal: [] },
  settings: {},
};

export async function getHomeData(): Promise<HomeData> {
  try {
    const data = await fetchGraphQL(HOME_QUERY, {
      revalidate: 300,
      tags: ["wp-home", "wp-all"],
    });
    return normalise(data);
  } catch (error) {
    console.error("getHomeData failed:", error);
    return EMPTY;
  }
}

/** Header and footer need the same menus and settings on every route. */
export async function getChrome(): Promise<{ menus: HomeData["menus"]; settings: SiteSettings }> {
  const query = `
    query Chrome {
      settings: pages(where: { name: "site-settings" }, first: 1) {
        nodes {
          siteSettings {
            sitePhone sitePhone2 siteEmail siteAddress factoryAddress
            socialLinkedin socialWhatsapp footerTagline copyrightText
          }
        }
      }
      primary: menu(id: "primary", idType: SLUG) { ${MENU_FIELDS} }
      footer1: menu(id: "footer1", idType: SLUG) { ${MENU_FIELDS} }
      footer2: menu(id: "footer2", idType: SLUG) { ${MENU_FIELDS} }
      footer3: menu(id: "footer3", idType: SLUG) { ${MENU_FIELDS} }
      legal:   menu(id: "legal",   idType: SLUG) { ${MENU_FIELDS} }
    }
  `;
  try {
    const data = await fetchGraphQL(query, { revalidate: 900, tags: ["wp-menus", "wp-settings"] });
    const full = normalise(data);
    return { menus: full.menus, settings: full.settings };
  } catch (error) {
    console.error("getChrome failed:", error);
    return { menus: EMPTY.menus, settings: {} };
  }
}

/**
 * Certifications on their own, for the pages that carry the credentials strip
 * without needing the rest of the homepage payload.
 */
export async function getCertifications(): Promise<Certification[]> {
  const query = `
    query Certifications {
      certifications(first: 16) {
        nodes {
          title
          certificationDetails {
            standard issuer description sortOrder
            logo { node { ${IMAGE} } }
          }
        }
      }
    }
  `;

  interface CertificationNode {
    title: string;
    certificationDetails?: {
      standard?: string | null;
      issuer?: string | null;
      description?: string | null;
      sortOrder?: number | null;
      logo?: ImageNode;
    } | null;
  }

  try {
    const data = await fetchGraphQL<{
      certifications?: { nodes?: CertificationNode[] } | null;
    }>(query, {
      revalidate: 900,
      tags: ["wp-certifications"],
    });

    return (data?.certifications?.nodes ?? [])
      .map((n) => ({
        title: n.title,
        standard: n.certificationDetails?.standard,
        issuer: n.certificationDetails?.issuer,
        description: n.certificationDetails?.description,
        logo: img(n.certificationDetails?.logo ?? null),
        sortOrder: n.certificationDetails?.sortOrder,
      }))
      .sort(byOrder);
  } catch (error) {
    console.error("getCertifications failed:", error);
    return [];
  }
}
