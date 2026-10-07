import type { IconName } from "./icons";

/**
 * The shape every rich content page on this site is built from.
 *
 * The structure is taken from the approved Electrolyser Solutions layout, so
 * each section here maps to one band of that design. Everything except the
 * hero is optional: a page renders only the bands it has content for, in the
 * fixed order below, so the whole site reads as one system.
 */

export interface Media {
  /** Absolute URL or site-relative path. */
  src: string;
  /** Required. Empty string only for decorative background art. */
  alt: string;
}

export interface IconCard {
  icon: IconName;
  title: string;
  text: string;
}

export interface Callout {
  title: string;
  text: string;
}

export interface ProcessStep {
  icon: IconName;
  title: string;
  text: string;
  /** Rendered in place of the icon, e.g. "H2". */
  symbol?: string;
}

export interface ApplicationCard extends IconCard {
  image: Media;
}

export interface Tile {
  image: Media;
  title: string;
  href: string;
}

export interface SpecRow {
  parameter: string;
  value: string;
  note?: string;
}

export interface SpecTable {
  caption: string;
  columns: [string, string, string?];
  rows: SpecRow[];
}

export interface LinkAction {
  label: string;
  href: string;
  /** Opens in a new tab and marks the link as a download. */
  external?: boolean;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface SolutionPageContent {
  slug: string;
  /** Last crumb in the breadcrumb trail and the BreadcrumbList schema. */
  breadcrumb: string;

  /**
   * Fallback FAQs, used only where the CMS has none for this page. WordPress
   * wins when an editor has authored them, so this never fights the CMS.
   */
  faqs?: Faq[];

  hero: {
    eyebrow: string;
    /** Rendered on the first line, in ink. */
    title: string;
    /** Rendered on the second line, in the accent blue. May be omitted. */
    titleAccent?: string;
    subtitle: string;
    features: { icon: IconName; title: string }[];
    primary: LinkAction;
    secondary?: LinkAction;
    image: Media;
  };

  /** The four-up strip directly under the hero. */
  benefits?: IconCard[];

  /** Two-column intro: copy on the left, image with a floating badge right. */
  overview?: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    body: string;
    action?: LinkAction;
    image: Media;
    badge?: { title: string; text: string };
  };

  /** Centre diagram with callouts down both sides. */
  components?: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    intro: string;
    image: Media;
    callouts: Callout[];
  };

  /** Downloadable documents, each with a direct link. */
  downloads?: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    intro: string;
    items: { title: string; text: string; href: string; format: string }[];
  };

  /** Numbered horizontal step flow. */
  process?: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    intro: string;
    steps: ProcessStep[];
  };

  /** Two-column: checklist on the left, image with a floating badge right. */
  features?: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    body: string;
    points: string[];
    image: Media;
    badge?: { title: string; text: string };
  };

  /** Technical specification table. Indexable, and the reason buyers return. */
  specs?: SpecTable;

  /** Dark band over a photograph. */
  sustainability?: {
    eyebrow: string;
    title: string;
    body: string;
    stats: { icon: IconName; value: string; text: string }[];
    image: Media;
  };

  /** Four image cards. */
  applications?: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    intro: string;
    cards: ApplicationCard[];
  };

  /** Reasons-to-choose block, copy left and four cards right. */
  why?: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    intro: string;
    cards: IconCard[];
  };

  /** Three full-bleed cross-links. */
  tiles?: Tile[];

  cta?: {
    eyebrow: string;
    title: string;
    body: string;
    primary: LinkAction;
    secondary?: LinkAction;
    image: Media;
  };
}

/** Per-page search metadata, kept beside the content it describes. */
export interface PageSeo {
  title: string;
  description: string;
  /** First entry is the primary keyword; the rest are secondary. */
  keywords: string[];
  /** Schema.org type for the page's main entity. */
  schema?: {
    type: "Service" | "Product" | "AboutPage" | "CollectionPage" | "WebPage";
    name: string;
    description: string;
    /** Service only. */
    serviceType?: string;
    /** Product only. */
    material?: string[];
  };
}
