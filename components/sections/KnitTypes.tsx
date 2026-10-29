import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { KnitType } from "@/lib/wordpress/home";
import ScrollCarousel from "@/components/ui/ScrollCarousel";
import SectionHeading from "./SectionHeading";

/**
 * The technology block the PO asks for: the product families themselves, with
 * the specification an engineer actually screens on — material, wire diameter
 * and construction. Driven by the Products content type.
 */
export default function KnitTypes({ products }: { products: KnitType[] }) {
  if (!products.length) return null;

  const productHref = (slug: string) =>
    slug.includes("woven") ? "/woven-mesh-solutions" : "/knitted-mesh-solutions";

  // Card artwork for the two product families, used when the CMS record has no picture.
  const familyImage = (slug: string) =>
    slug.includes("woven")
      ? "/bvk-assets/woven-mesh/woven-wave-sheet.webp"
      : "/bvk-assets/precision-mesh/11_knitted_mesh_solutions_card_1200x800.webp";

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
            {products.map((product) => (
              <Link
                key={product.slug}
                href={productHref(product.slug)}
                className="card-light group flex h-full flex-col overflow-hidden"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden bg-white">
                  <Image
                    src={product.image?.sourceUrl || familyImage(product.slug)}
                    alt={product.image?.altText || product.title}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 80vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-lg tracking-tight text-ink">{product.title}</h3>

                  {product.description && (
                    <p className="mt-3 text-sm leading-relaxed text-grey">{product.description}</p>
                  )}

                  {(product.material || product.wireDiameter || product.meshCount) && (
                    <dl className="mt-6 space-y-3 border-t border-hairline pt-6 text-[0.8125rem]">
                      {product.material && (
                        <div className="flex gap-4">
                          <dt className="w-24 shrink-0 font-semibold text-grey-soft">Material</dt>
                          <dd className="text-grey">{product.material}</dd>
                        </div>
                      )}
                      {product.wireDiameter && (
                        <div className="flex gap-4">
                          <dt className="w-24 shrink-0 font-semibold text-grey-soft">Wire Ø</dt>
                          <dd className="text-grey">{product.wireDiameter}</dd>
                        </div>
                      )}
                      {product.meshCount && (
                        <div className="flex gap-4">
                          <dt className="w-24 shrink-0 font-semibold text-grey-soft">Build</dt>
                          <dd className="text-grey">{product.meshCount}</dd>
                        </div>
                      )}
                    </dl>
                  )}

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
