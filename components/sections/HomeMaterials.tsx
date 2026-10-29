import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Layers } from "lucide-react";
import { materials } from "@/content/home";

/** The material families: illustration on the left, four cards on the right. */
export default function HomeMaterials() {
  return (
    <section id="materials" className="section scroll-mt-24 bg-surface">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-brand-deep">Materials &amp; engineering capabilities</p>
            <h2 className="pt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-balance text-ink lg:text-[3.25rem]">
              Advanced materials. Engineered for performance.
            </h2>
            <p className="pt-4 text-base leading-relaxed text-grey lg:text-lg">
              Woven and knitted mesh in nickel, stainless steel, titanium and specialty alloys, matched to the application.
            </p>
          </div>
          <Link href="/engineering-manufacturing" className="btn btn-outline-dark shrink-0 gap-2 self-start lg:self-end">
            Our engineering capabilities
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[5fr_7fr]">
          <figure className="group relative min-h-[20rem] overflow-hidden rounded-xl border border-hairline bg-surface-raised">
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

        <div className="flex items-center gap-4 pt-8 text-sm text-grey">
          <Layers aria-hidden className="h-6 w-6 shrink-0 text-brand-deep" />
          <p className="shrink-0">
            Fourteen catalogued alloys with AISI/UNS designations.{" "}
            <Link
              href="/precision-mesh-solutions"
              className="inline-flex items-center gap-1.5 font-semibold text-brand-deep hover:text-brand-dim"
            >
              See the full material range
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </p>
          <span aria-hidden className="hidden h-px flex-1 bg-hairline lg:block" />
        </div>
      </div>
    </section>
  );
}
