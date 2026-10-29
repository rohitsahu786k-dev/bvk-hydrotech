import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ScrollCarousel from "@/components/ui/ScrollCarousel";
import SectionHeading from "./SectionHeading";

/**
 * The three mesh product families, the same three the Solutions menu lists:
 * precision, woven and knitted. Each card carries the one-line specification an
 * engineer screens on.
 */
const FAMILIES = [
  {
    title: "Precision Mesh Solutions",
    href: "/precision-mesh-solutions",
    image: "/bvk-assets/precision-mesh/01_precision_mesh_hero_transparent_1920x1080.webp",
    description: "Woven and knitted mesh engineered around your application.",
    specs: [
      ["Material", "14 catalogued alloys"],
      ["Forms", "Woven and knitted, cut to drawing"],
    ],
  },
  {
    title: "Woven Mesh Solutions",
    href: "/woven-mesh-solutions",
    image: "/bvk-assets/woven-mesh/woven-roll.webp",
    description: "A stable, repeatable opening for rated filtration and electrode support.",
    specs: [
      ["Material", "Stainless steel 304 to 904L, Hastelloy C-22"],
      ["Build", "Controlled aperture"],
    ],
  },
  {
    title: "Knitted Mesh Solutions",
    href: "/knitted-mesh-solutions",
    image: "/bvk-assets/precision-mesh/11_knitted_mesh_solutions_card_1200x800.webp",
    description: "Single, double and multi-end knits for stacks, GDLs and elastic elements.",
    specs: [
      ["Wire Ø", "0.05 mm to 0.30 mm"],
      ["Build", "Single, double and multi-end, large single-piece diameters"],
    ],
  },
];

export default function KnitTypes() {
  return (
    <section className="section bg-surface-raised">
      <div className="shell">
        <SectionHeading
          tone="light"
          eyebrow="Technology"
          title="Mesh products made for easy specification"
          description="Choose from woven mesh, knitted mesh and custom formed parts for filtration, hydrogen stacks, fuel cells and industrial equipment. BVK helps match material, density and finish to your application."
        />

        <div className="mt-14">
          <ScrollCarousel label="Mesh products">
            {FAMILIES.map((family) => (
              <Link
                key={family.href}
                href={family.href}
                className="card-light group flex h-full flex-col overflow-hidden"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden bg-white">
                  <Image
                    src={family.image}
                    alt={family.title}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 80vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-lg tracking-tight text-ink">{family.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-grey">{family.description}</p>

                  <dl className="mt-6 space-y-3 border-t border-hairline pt-6 text-[0.8125rem]">
                    {family.specs.map(([term, value]) => (
                      <div key={term} className="flex gap-4">
                        <dt className="w-24 shrink-0 font-semibold text-grey-soft">{term}</dt>
                        <dd className="text-grey">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <span className="mt-auto flex items-center gap-2 pt-7 text-[0.8125rem] font-semibold text-brand-deep">
                    View product range
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </ScrollCarousel>
        </div>

      </div>
    </section>
  );
}
