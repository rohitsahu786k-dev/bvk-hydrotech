import type { SolutionPageContent } from "@/lib/content/types";
import {
  electrolyserSolutions,
  fuelCellSolutions,
  knittedMeshSolutions,
  precisionMeshSolutions,
  wovenMeshSolutions,
} from "./pages/solutions";
import {
  energyCleanTech,
  industriesApplications,
  industrialFiltration,
} from "./pages/applications";
import {
  engineeringManufacturing,
  processTreatments,
  rdCfdPrototyping,
} from "./pages/capabilities";
import { about, sustainability } from "./pages/company";
import { faqs, insights, resources } from "./pages/knowledge";

/**
 * Every page rendered through the shared SolutionPage template.
 *
 * Order matters: it is the order these appear in the sitemap and the order the
 * build pre-renders them. Legal pages are not here — they render the body
 * authored in WordPress instead.
 */
const pages: SolutionPageContent[] = [
  electrolyserSolutions,
  fuelCellSolutions,
  precisionMeshSolutions,
  wovenMeshSolutions,
  knittedMeshSolutions,
  industrialFiltration,
  energyCleanTech,
  about,
  engineeringManufacturing,
  processTreatments,
  rdCfdPrototyping,
  industriesApplications,
  sustainability,
  resources,
  insights,
  faqs,
];

export const pageContent: Record<string, SolutionPageContent> = Object.fromEntries(
  pages.map((page) => [page.slug, page]),
);

export const contentSlugs = pages.map((page) => page.slug);

export function getPageContent(slug: string): SolutionPageContent | null {
  return pageContent[slug] ?? null;
}

/**
 * The product range — everything grouped under "Solutions" in the navigation.
 * These render on the blue SolutionPage layout taken from the approved
 * Electrolyser design. Every other page renders on CorporatePage, which uses
 * the site's own ink-and-green system, so the two groups are visibly
 * different without either leaving the brand.
 */
export const solutionSlugs = [
  "electrolyser-solutions",
  "fuel-cell-solutions",
  "precision-mesh-solutions",
  "woven-mesh-solutions",
  "knitted-mesh-solutions",
  "industrial-filtration",
  "energy-clean-tech",
] as const;

const solutionSlugSet = new Set<string>(solutionSlugs);

export function isSolutionPage(slug: string) {
  return solutionSlugSet.has(slug);
}
