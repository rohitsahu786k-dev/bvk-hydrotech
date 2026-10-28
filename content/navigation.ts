import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CalendarDays,
  CircleHelp,
  Droplets,
  Factory,
  FileText,
  Flame,
  FlaskConical,
  Globe2,
  Grid3x3,
  Layers,
  Leaf,
  Lightbulb,
  Network,
  Newspaper,
  Zap,
} from "lucide-react";

/**
 * The one navigation structure the global header renders — desktop mega menu
 * and mobile accordion both read from here.
 *
 * Deliberately free of imports from the page-content modules: the header is a
 * client component, and importing the content index would ship every page's
 * copy to the browser. Descriptions are short forms of each page's own hero
 * subtitle in content/pages, so they stay factual.
 */

export interface NavLink {
  label: string;
  /** One line of real specification, shown under the label in the mega menu. */
  spec: string;
  /** Three-to-five words, shown under the label in the mega menu. */
  tagline: string;
  href: string;
  description: string;
  icon: LucideIcon;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

export interface NavFeature {
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  cta: string;
  image: string;
}

export interface NavItem {
  key: string;
  label: string;
  /** One sentence under the menu title in the desktop panel. */
  blurb: string;
  groups: NavGroup[];
  feature: NavFeature;
}

export const navigation: NavItem[] = [
  {
    key: "solutions",
    label: "Solutions",
    blurb: "Mesh and components for hydrogen and industry.",
    groups: [
      {
        title: "Solutions",
        links: [
          {
            label: "Electrolyser Solutions",
            href: "/electrolyser-solutions",
            tagline: "Mesh for green hydrogen",
            spec: "Ni 201/202 · titanium · stainless · alkaline + PEM",
            description: "Mesh materials and precision components for green hydrogen production.",
            icon: Droplets,
          },
          {
            label: "Fuel Cell Solutions",
            href: "/fuel-cell-solutions",
            tagline: "AFC · SOFC · PEM components",
            spec: "AFC · SOFC · PEM · gas diffusion and electrode support",
            description: "Gas diffusion, current collection and electrode support for AFC, SOFC and PEM.",
            icon: Zap,
          },
        ],
      },
      {
        title: "Mesh products",
        links: [
          {
            label: "Precision Mesh Solutions",
            href: "/precision-mesh-solutions",
            tagline: "Woven and knitted, to drawing",
            spec: "14 catalogued alloys · woven and knitted · cut to drawing",
            description: "Woven and knitted mesh engineered around your application.",
            icon: Grid3x3,
          },
          {
            label: "Woven Mesh Solutions",
            href: "/woven-mesh-solutions",
            tagline: "Controlled-aperture mesh",
            spec: "Controlled aperture · 304 to 904L · Hastelloy C-22",
            description: "A stable, repeatable opening for rated filtration and electrode support.",
            icon: Layers,
          },
          {
            label: "Knitted Mesh Solutions",
            href: "/knitted-mesh-solutions",
            tagline: "Stacks, GDLs, elastic elements",
            spec: "Wire 0.05–0.30 mm · large single-piece diameters",
            description: "Single, double and multi-end knits for stacks, GDLs and elastic elements.",
            icon: Network,
          },
        ],
      },
    ],
    feature: {
      eyebrow: "Featured",
      title: "Precision mesh for green hydrogen electrolysers",
      text: "Nickel 201/202, titanium and stainless steel, with large single-piece diameters.",
      href: "/electrolyser-solutions",
      cta: "Explore electrolyser solutions",
      image: "/bvk-assets/hydrogen-pro-stack3.jpg",
    },
  },
  {
    key: "capabilities",
    label: "Capabilities",
    blurb: "From engineering to prototype, under one roof.",
    groups: [
      {
        title: "How we make it",
        links: [
          {
            label: "Engineering & Manufacturing",
            href: "/engineering-manufacturing",
            tagline: "Integrated weaving plant",
            spec: "Integrated weaving plant · IATF 16949 · 100% traceability",
            description: "An integrated weaving plant with Industry 4.0 process control.",
            icon: Factory,
          },
          {
            label: "Process & Treatments",
            href: "/process-treatments",
            tagline: "Annealing, coating, cutting",
            spec: "Annealing · coating · corrugation 4–10 mm · laser cutting",
            description: "Annealing, coating, forming and cutting — a roll becomes a component.",
            icon: Flame,
          },
          {
            label: "R&D, CFD & Prototyping",
            href: "/rd-cfd-prototyping",
            tagline: "Evidence before tooling",
            spec: "CFD · air permeability · grain structure · DSIR recognised",
            description: "Choose the mesh on evidence before you commit to tooling and volume.",
            icon: FlaskConical,
          },
        ],
      },
    ],
    feature: {
      eyebrow: "In the plant",
      title: "The fiftieth delivery matches the first",
      text: "German-origin equipment and Total Quality Management, under one roof.",
      href: "/engineering-manufacturing",
      cta: "See our manufacturing",
      image: "/bvk-assets/annealing.jpg",
    },
  },
  {
    key: "company",
    label: "Company",
    blurb: "A BVK Group company from Jaipur, weaving technical mesh since 1963.",
    groups: [
      {
        title: "BVK Hydrotech",
        links: [
          {
            label: "About BVK Hydrotech",
            href: "/about",
            tagline: "Jaipur, weaving since 1963",
            spec: "Since 1963 · 300+ people · 650+ MT of metal a year",
            description: "A BVK Group company from Jaipur, weaving technical mesh since 1963.",
            icon: Building2,
          },
          {
            label: "Industries & Applications",
            href: "/industries-applications",
            tagline: "Ten industries, 25+ countries",
            spec: "Ten industries · exporting to 25+ countries",
            description: "Ten industries, one mesh capability, exporting to 25+ countries.",
            icon: Globe2,
          },
          {
            label: "Sustainability",
            href: "/sustainability",
            tagline: "50%+ renewable energy",
            spec: "50%+ renewable energy · ISO 14001 · ISO 50001",
            description: "More than half of our energy already comes from renewables.",
            icon: Leaf,
          },
          {
            label: "Fairs & Events",
            href: "/events",
            tagline: "Meet us at the next fair",
            spec: "Trade fairs · conferences · book an appointment",
            description: "Where BVK Hydrotech exhibits next, and how to book a time with our engineers.",
            icon: CalendarDays,
          },
        ],
      },
    ],
    feature: {
      eyebrow: "Since 1963",
      title: "Six decades of filtration discipline",
      text: "Now applied to green hydrogen and fuel cells.",
      href: "/about",
      cta: "Read our story",
      image: "/bvk-assets/factory-worker.jpg",
    },
  },
  {
    key: "resources",
    label: "Resources",
    blurb: "Brochures, technical insight and answers for vendor qualification.",
    groups: [
      {
        title: "Learn and download",
        links: [
          {
            label: "Resources / Downloads",
            href: "/resources",
            tagline: "Brochures and certificates",
            spec: "Brochures · certificates · compliance declarations",
            description: "Approved brochures and technical literature for vendor qualification.",
            icon: FileText,
          },
          {
            label: "Insights / Knowledge Center",
            href: "/insights",
            tagline: "Mesh decisions explained",
            spec: "Material choice · geometry · treatment · validation",
            description: "How mesh decisions are made: alloy, geometry and validation.",
            icon: Lightbulb,
          },
          {
            label: "Blog",
            href: "/blog",
            tagline: "Articles from our engineers",
            spec: "Materials · construction · treatment · validation",
            description: "Articles on mesh materials, construction and validation.",
            icon: Newspaper,
          },
          {
            label: "FAQs",
            href: "/faqs",
            tagline: "Answers before you quote",
            spec: "Materials · capability · certifications · enquiry inputs",
            description: "Materials, mesh types, certifications and what we need to quote.",
            icon: CircleHelp,
          },
        ],
      },
    ],
    feature: {
      eyebrow: "Technical literature",
      title: "Brochures for your engineering review",
      text: "Download the approved documents and circulate them internally.",
      href: "/resources",
      cta: "Browse downloads",
      image: "/bvk-assets/knitted-tube-1.jpg",
    },
  },
];

/**
 * The credential strip along the bottom of every mega menu panel.
 *
 * It does two jobs: it puts the company's hard numbers in front of a buyer on
 * every menu open, and it gives the three-link menus enough weight that the
 * panel does not read as half empty.
 */
export const navCredentials: { value: string; label: string }[] = [
  { value: "1963", label: "weaving since" },
  { value: "25+", label: "export countries" },
  { value: "650+ MT", label: "metal a year" },
];

export const navStandards = "IATF 16949 · ISO 9001 · AS9100 · DSIR";
