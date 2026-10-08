import Image from "next/image";
import { processSteps } from "@/content/home";
import SectionHeading from "./SectionHeading";

/**
 * Concept to component as a timeline. The heading and the plant illustration
 * share the first row; the six steps run beneath on a connecting line.
 */
export default function HomeProcess() {
  return (
    <section id="process" className="section scroll-mt-24 bg-surface-raised">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <SectionHeading
            tone="light"
            eyebrow="Our manufacturing process"
            title="From concept to component."
            description="Process reliability ensures product accuracy — the result of collaboration between BVK and its customers."
          />

          <figure className="group relative aspect-[16/9] overflow-hidden rounded-lg border border-hairline bg-surface-raised">
            <Image
              src="/bvk-assets/05-manufacturing-process.webp"
              alt="Illustration: mesh weaving, slitting and finished filter elements on a production floor"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
          </figure>
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[1.375rem] hidden h-px bg-gradient-to-r from-brand/0 via-brand/60 to-brand/0 lg:block"
          />

          <ol className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
            {processSteps.map((step, index) => (
              <li key={step.title} className="group relative">
                <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border-2 border-brand-deep bg-surface font-display text-sm font-bold text-brand-deep transition-colors duration-300 group-hover:bg-brand-deep group-hover:text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="mt-6 h-[calc(100%-4.25rem)] rounded-lg border border-hairline bg-surface p-5 transition duration-300 group-hover:-translate-y-1 group-hover:border-brand-deep/40 group-hover:shadow-[0_24px_40px_-26px_rgb(0_0_0/0.35)]">
                  <h3 className="font-display text-base font-bold leading-snug text-ink">
                    {step.title}
                  </h3>
                  <p className="pt-2 text-[0.8125rem] leading-relaxed text-grey">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
