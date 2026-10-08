import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { materials } from "@/content/home";
import SectionHeading from "./SectionHeading";

/** The material families: illustration on the left, four cards on the right. */
export default function HomeMaterials() {
  return (
    <section id="materials" className="section scroll-mt-24 bg-surface">
      <div className="shell">
        <SectionHeading
          tone="light"
          eyebrow="Materials & engineering capabilities"
          title="Advanced materials. Engineered for performance."
          description="Woven and knitted mesh in nickel, stainless steel, titanium and specialty alloys, matched to the application."
          action={
            <Link href="/engineering-manufacturing" className="btn btn-outline-dark">
              Our engineering capabilities
            </Link>
          }
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[5fr_7fr]">
          <figure className="group relative min-h-[20rem] overflow-hidden rounded-lg border border-hairline bg-surface-raised">
            <Image
              src="/bvk-assets/04-materials-engineering-capabilities.webp"
              alt="Illustration: rolls, sheets and tubes of woven metal mesh"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
          </figure>

          <ul className="grid gap-4 sm:grid-cols-2">
            {materials.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-lg border border-hairline bg-surface p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-deep/40 hover:shadow-[0_24px_40px_-26px_rgb(0_0_0/0.35)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-wash font-display text-lg font-bold text-brand-deep transition-colors duration-300 group-hover:bg-brand-deep group-hover:text-white">
                    {item.symbol}
                  </span>
                  <h3 className="pt-6 font-display text-xl font-bold text-ink">{item.title}</h3>
                  <p className="flex-1 pt-3 text-sm leading-relaxed text-grey">{item.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-brand-deep">
                    Learn more
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="pt-8 text-sm text-grey">
          Fourteen catalogued alloys with AISI/UNS designations.{" "}
          <Link
            href="/precision-mesh-solutions"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-deep hover:text-brand-dim"
          >
            See the full material range
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </p>
      </div>
    </section>
  );
}
