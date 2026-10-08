/**
 * Copy for the homepage sections that are authored in the repository.
 *
 * Every line is taken from BVK's own collateral (Green Energy Brochure,
 * Knitted Mesh Brochure, Green Hydrogen leaflet) or from the page content in
 * content/pages — nothing is estimated. Images are in public/bvk-assets.
 */

export interface DuoCard {
  eyebrow: string;
  title: string;
  text: string;
  points: string[];
  href: string;
  cta: string;
  image: string;
}

export const solutionsDuo: DuoCard[] = [
  {
    eyebrow: "Alkaline & PEM",
    title: "Electrolyser Solutions",
    text: "Precision woven and knitted mesh for alkaline and PEM electrolyser stacks.",
    points: [
      "Catalyst support and electrode substrates",
      "Gas diffusion and porous transport layers (GDL / PTL)",
      "Current collection and distribution",
      "Nickel elastic elements and separators",
    ],
    href: "/electrolyser-solutions",
    cta: "Explore electrolysers",
    image: "/bvk-assets/02-electrolyser-solutions.webp",
  },
  {
    eyebrow: "AFC · SOFC · PEM",
    title: "Fuel Cell Solutions",
    text: "Woven and knitted mesh for gas diffusion, current collection and electrode support in AFC, SOFC and PEM stacks.",
    points: [
      "Gas diffusion layers (GDL)",
      "Current collection and distribution",
      "Electrode supports",
      "Resistance to deformation under stack load",
    ],
    href: "/fuel-cell-solutions",
    cta: "Explore fuel cells",
    image: "/bvk-assets/03-fuel-cell-solutions.webp",
  },
];

export interface MaterialCard {
  symbol: string;
  title: string;
  text: string;
  href: string;
}

export const materials: MaterialCard[] = [
  {
    symbol: "Ni",
    title: "Nickel Mesh",
    text: "Nickel 201/202 in knitted mesh for alkaline electrolyser stacks, and Ni 99.6, Ni 99.2 and LC-Ni 99.2 in woven mesh.",
    href: "/knitted-mesh-solutions",
  },
  {
    symbol: "SS",
    title: "Stainless Steel Mesh",
    text: "Grades 304, 304L, 316, 316L, 314 and 904L, in woven and knitted forms.",
    href: "/woven-mesh-solutions",
  },
  {
    symbol: "Ti",
    title: "Titanium Mesh",
    text: "Knitted titanium mesh for electrolyser stacks, alongside nickel and stainless steel.",
    href: "/knitted-mesh-solutions",
  },
  {
    symbol: "+",
    title: "Custom Mesh Engineering",
    text: "Wire 0.05–0.30 mm, single, double and multi-end knits, and corrugated, flattened or laser-cut parts to drawing.",
    href: "/precision-mesh-solutions",
  },
];

export interface ProcessStep {
  title: string;
  text: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Requirement Analysis",
    text: "Drawings, cell chemistry, operating conditions and expected volume.",
  },
  {
    title: "Material Selection",
    text: "A material recommendation from fourteen catalogued alloys.",
  },
  {
    title: "Mesh Engineering",
    text: "CFD, simulation, prototyping and mesh design optimisation.",
  },
  {
    title: "Manufacturing",
    text: "Weaving or knitting on German-origin equipment, then annealing, coating, forming and cutting.",
  },
  {
    title: "Inspection",
    text: "Light-box and video inspection against process and quality control plans.",
  },
  {
    title: "Delivery",
    text: "Reusable, recyclable packaging with full traceability, exported to 25+ countries.",
  },
];

export interface RndItem {
  title: string;
  text: string;
}

export const rndItems: RndItem[] = [
  {
    title: "Testing",
    text: "Computational Fluid Dynamics analysis, grain-structure examination, air-permeability topography and stress testing.",
  },
  {
    title: "Quality checks",
    text: "Light-box and video inspection with custom-made testing equipment.",
  },
  {
    title: "Traceability",
    text: "100% traceability, product standard harmonisation and documented control plans.",
  },
  {
    title: "R&D collaboration",
    text: "DSIR-recognised in-house R&D and joint programmes with the Government of India.",
  },
];

export interface ApplicationItem {
  title: string;
  text: string;
  href: string;
}

export const applicationItems: ApplicationItem[] = [
  {
    title: "Green Hydrogen",
    text: "Electrolyser stack cores, GDL / PTL layers and elastic elements.",
    href: "/electrolyser-solutions",
  },
  {
    title: "Fuel Cells",
    text: "Electrode components for AFC, SOFC and PEM stacks.",
    href: "/fuel-cell-solutions",
  },
  {
    title: "Industrial Filtration",
    text: "Filtration and separation mesh across process industries.",
    href: "/industrial-filtration",
  },
  {
    title: "Electrochemical Systems",
    text: "Electrode substrates, catalyst support and current collection.",
    href: "/energy-clean-tech",
  },
  {
    title: "Custom Industrial Components",
    text: "Laser-cut, die-cut, corrugated and flattened parts to drawing.",
    href: "/precision-mesh-solutions",
  },
];
