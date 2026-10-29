import Image from "next/image";
import { ArrowRight, Boxes, Cog, FileText, Layers, ScanSearch, Package } from "lucide-react";
import { processSteps } from "@/content/home";

/**
 * Concept to component. A light, airy band: the heading on the left and the
 * production-floor photo on the right with a slanted edge, then six numbered
 * steps on a connecting line, each a card with its own photo fading in at the
 * foot. Photos come from the WordPress media library.
 */
const HERO = "/media/bvk-process-hero-manufacturing-floor.webp";
const ICONS = [FileText, Layers, Boxes, Cog, ScanSearch, Package];

export default function HomeProcess() {
  return (
    <section
      id="process"
      className="section relative scroll-mt-24 overflow-hidden bg-[linear-gradient(135deg,#fff_0%,#f3f6f6_55%,#eef2f2_100%)]"
    >
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <div>
            <p className="eyebrow text-brand-deep">Our manufacturing process</p>
            <h2 className="process-title pt-6 font-display text-ink">
              From concept <span className="block text-brand-deep">to component.</span>
            </h2>
            <p className="max-w-md pt-6 text-base leading-relaxed text-grey lg:text-lg">
              Process reliability ensures product accuracy — the result of collaboration between BVK
              and its customers.
            </p>
          </div>

          <figure className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-[0_30px_60px_-35px_rgb(0_0_0/0.45)] lg:[clip-path:polygon(9%_0,100%_0,100%_100%,0_100%)] lg:rounded-none lg:rounded-br-2xl lg:rounded-tr-2xl">
            <Image
              src={HERO}
              alt="Mesh weaving, slitting and finished filter elements on a BVK production floor"
              fill
              priority={false}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </figure>
        </div>

        <div className="relative mt-14 lg:mt-16">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[1.375rem] hidden h-px bg-gradient-to-r from-brand-deep/0 via-brand-deep/60 to-brand-deep/0 lg:block"
          />

          <ol className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
            {processSteps.map((step, index) => {
              const Icon = ICONS[index] ?? FileText;
              return (
                <li key={step.title} className="group relative">
                  <span className="relative z-10 mx-auto grid h-11 w-11 place-items-center rounded-full bg-brand-deep font-display text-sm font-bold text-white ring-4 ring-brand-deep/15 lg:mx-0 lg:ml-[calc(50%-1.375rem)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <article className="relative mt-5 flex h-[calc(100%-3.75rem)] flex-col lg:min-h-[21rem] overflow-hidden rounded-xl border border-hairline bg-white shadow-[0_14px_30px_-22px_rgb(0_0_0/0.3)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_26px_40px_-24px_rgb(0_0_0/0.35)]">
                    <div className="relative z-10 p-5">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-deep/10 text-brand-deep">
                        <Icon aria-hidden className="h-5 w-5" />
                      </span>
                      <h3 className="pt-4 font-display text-base font-bold leading-snug text-ink">
                        {step.title}
                      </h3>
                      <p className="pt-2 text-[0.8125rem] leading-relaxed text-grey">{step.text}</p>
                    </div>

                    <div className="relative mt-auto h-36 flex-none lg:h-32">
                      <Image
                        src={step.image}
                        alt={step.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 17vw, (min-width: 640px) 45vw, 100vw"
                        className="object-cover"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-b from-white via-white/20 to-transparent"
                      />
                      <span
                        aria-hidden
                        className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white text-brand-deep shadow-md transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
