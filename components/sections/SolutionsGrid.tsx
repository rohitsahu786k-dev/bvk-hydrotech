import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SolutionCard } from "@/lib/wordpress/home";
import Icon from "@/components/ui/Icon";
import SectionHeading from "./SectionHeading";

/**
 * The solution journeys the PO asks the homepage to open: electrolyser, fuel
 * cell and precision mesh, plus process and engineering. Sourced from the
 * Services content type, so the client can add or reorder a journey without a
 * code change.
 */
export default function SolutionsGrid({ solutions }: { solutions: SolutionCard[] }) {
  if (!solutions.length) return null;

  return (
    <section id="solutions" className="section scroll-mt-24 bg-ink">
      <div className="shell">
        <SectionHeading
          eyebrow="Solutions"
          title="Built around the stack, not a catalogue"
          description="Every enquiry starts with cell chemistry, target porosity and the geometry you need to fill. We answer with a material recommendation and a mesh design proposal."
          action={
            <Link href="/contact" className="btn btn-outline-light">
              Start a technical enquiry
            </Link>
          }
        />

        <ul className="mt-14 grid gap-px overflow-hidden border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => {
            return (
              <li key={solution.slug} className="bg-ink">
                <Link
                  href={`/${solution.slug}`}
                  className="group flex h-full flex-col p-8 transition-colors duration-300 hover:bg-ink-raised lg:p-10"
                >
                  <span className="flex h-11 w-11 items-center justify-center border border-ink-line text-brand transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-ink">
                    <Icon name={solution.iconName} className="h-5 w-5" />
                  </span>

                  <h3 className="mt-7 font-display text-xl font-bold tracking-tight text-white">
                    {solution.title}
                  </h3>

                  {solution.description && (
                    <p className="mt-3 text-sm leading-relaxed text-on-dark-muted">
                      {solution.description}
                    </p>
                  )}

                  {solution.features.length > 0 && (
                    <ul className="mt-6 space-y-2 border-t border-ink-line pt-6">
                      {solution.features.slice(0, 4).map((feature) => (
                        <li
                          key={feature}
                          className="flex gap-2.5 text-[0.8125rem] leading-snug text-on-dark-faint"
                        >
                          <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 bg-brand" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <span className="mt-auto flex items-center gap-2 pt-8 text-[0.8125rem] font-semibold text-white">
                    Explore
                    <ArrowUpRight className="h-4 w-4 text-brand transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
