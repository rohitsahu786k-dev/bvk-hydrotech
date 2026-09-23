import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { KnitType } from "@/lib/wordpress/home";
import SectionHeading from "./SectionHeading";

/**
 * The technology block the PO asks for: the product families themselves, with
 * the specification an engineer actually screens on — material, wire diameter
 * and construction. Driven by the Products content type.
 */
export default function KnitTypes({ products }: { products: KnitType[] }) {
  if (!products.length) return null;

  const featured = products.slice(0, 3);
  const rest = products.slice(3);
  const productHref = (slug: string) =>
    slug.includes("woven") ? "/woven-mesh-solutions" : "/knitted-mesh-solutions";

  return (
    <section className="section bg-surface-raised">
      <div className="shell">
        <SectionHeading
          tone="light"
          eyebrow="Technology"
          title="Mesh products made for easy specification"
          description="Choose from woven mesh, knitted mesh and custom formed parts for filtration, hydrogen stacks, fuel cells and industrial equipment. BVK helps match material, density and finish to your application."
        />

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {featured.map((product) => (
            <li key={product.slug}>
              <Link href={productHref(product.slug)} className="card-light group flex h-full flex-col overflow-hidden">
                {product.image?.sourceUrl && (
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-surface-raised">
                    <Image
                      src={product.image.sourceUrl}
                      alt={product.image.altText || ""}
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                    {product.title}
                  </h3>

                  {product.description && (
                    <p className="mt-3 text-sm leading-relaxed text-grey">{product.description}</p>
                  )}

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

                  <span className="mt-auto flex items-center gap-2 pt-7 text-[0.8125rem] font-semibold text-brand-deep">
                    View product range
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {rest.length > 0 && (
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {rest.map((product) => (
              <li key={product.slug}>
                <Link
                  href={productHref(product.slug)}
                  className="card-light group flex h-full items-start gap-6 p-7"
                >
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                      {product.title}
                    </h3>
                    {product.description && (
                      <p className="mt-2.5 text-sm leading-relaxed text-grey">{product.description}</p>
                    )}
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-brand-deep transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
