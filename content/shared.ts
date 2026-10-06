import type { SolutionPageContent } from "@/lib/content/types";
import { img } from "./assets";

/**
 * Bands that are genuinely the same claim on every page. Keeping them in one
 * place means a corrected sustainability figure is corrected site-wide.
 */

export const sustainabilityBand: NonNullable<SolutionPageContent["sustainability"]> = {
  eyebrow: "Sustainability",
  title: "Powering a cleaner planet",
  body: "Woven and knitted mesh support electrolysers and fuel cells across the green hydrogen value chain. BVK also powers 50%+ of its energy needs through renewables, with a goal of becoming 100% self-reliant.",
  stats: [
    { icon: "leaf", value: "50%+", text: "Energy needs powered by renewables" },
    { icon: "recycle", value: "100%", text: "Renewable self-reliance goal" },
  ],
  image: { src: img.forestValley, alt: "" },
};

export function standardCta({
  title,
  body,
  brochure,
  eyebrow = "Let's build a cleaner tomorrow",
  primaryLabel = "Contact Our Team",
}: {
  title: string;
  body: string;
  brochure?: string;
  eyebrow?: string;
  primaryLabel?: string;
}): NonNullable<SolutionPageContent["cta"]> {
  return {
    eyebrow,
    title,
    body,
    primary: { label: primaryLabel, href: "/contact" },
    secondary: brochure
      ? { label: "Download Brochure", href: brochure, external: true }
      : undefined,
    image: { src: img.forestValley, alt: "" },
  };
}
