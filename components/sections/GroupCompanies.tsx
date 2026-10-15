import { ArrowUpRight } from "lucide-react";
import type { GroupCompaniesSection } from "@/lib/content/types";

/**
 * The BVK Group's companies, each under its own official logo. Every logo sits
 * in the same box (at most 5rem tall and 15rem wide) so no mark outweighs
 * another, on a soft green glow that lifts on hover. The current company is
 * marked rather than linked; the others open their own sites.
 */
export default function GroupCompanies({ section }: { section: GroupCompaniesSection }) {
  return (
    <section aria-labelledby="group-heading" className="bg-surface-raised py-14 lg:py-20">
      <div className="shell">
        <div className="grid items-end gap-4 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brand-deep">{section.eyebrow}</p>
            <h2 id="group-heading" className="mt-3 font-display text-ink">
              {section.title}
              {section.titleAccent && <span className="block text-brand-deep">{section.titleAccent}</span>}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-grey">{section.intro}</p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {section.companies.map((company, index) => {
            const inner = (
              <>
                <span className="relative flex h-44 items-center justify-center overflow-hidden border-b border-hairline bg-surface px-10">
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgb(232_247_238/0.95),transparent_68%)] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span
                    aria-hidden
                    className="absolute left-4 top-4 font-display text-xs tabular-nums text-grey-soft"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={company.logo.src}
                    alt={company.logo.alt}
                    loading="lazy"
                    decoding="async"
                    className="relative max-h-20 w-auto max-w-[15rem] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                  />
                </span>

                <span className="flex items-center justify-between gap-4 px-6 py-5">
                  <span className="min-w-0">
                    <span className="block font-display text-[0.9375rem] leading-snug text-ink">
                      {company.name}
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-grey">{company.note}</span>
                  </span>

                  {company.current ? (
                    <span className="shrink-0 rounded-full bg-brand px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-wider text-white">
                      You are here
                    </span>
                  ) : (
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline text-grey transition duration-300 group-hover:border-brand-deep group-hover:bg-brand-deep group-hover:text-white"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  )}
                </span>
              </>
            );

            const card =
              "group relative block h-full overflow-hidden rounded-2xl border bg-surface transition duration-300";

            return (
              <li key={company.name}>
                {company.href ? (
                  <a
                    href={company.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${company.name} (opens in a new tab)`}
                    className={`${card} border-hairline hover:-translate-y-1 hover:border-brand-deep/40 hover:shadow-[0_28px_48px_-30px_rgb(0_0_0/0.4)]`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={`${card} border-brand-deep/40 shadow-[0_24px_44px_-32px_rgb(20_123_58/0.55)]`}>
                    <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-0.5 bg-brand" />
                    {inner}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
