import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import LinkedInIcon from "@/components/ui/LinkedInIcon";
import type { TeamSection } from "@/lib/content/types";

/** The brand wave pattern behind the section, as in every CtaBand. */
const PATTERN_BG = "/media/pattern-scaled.png";

/**
 * Leadership team. An ink section with the brand wave, three portrait cards
 * on a raised panel: role chip and LinkedIn button over the photograph, the
 * name and a short bio beneath, and the years of leadership as the one number
 * a buyer scans for. All copy and links live in content/pages/company.ts.
 */
export default function LeadershipTeam({ team }: { team: TeamSection }) {
  return (
    <section
      aria-labelledby="leadership-heading"
      className="on-ink relative isolate overflow-hidden bg-ink py-16 lg:py-20"
    >
      <Image
        src={PATTERN_BG}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-left opacity-60 md:object-fill"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-transparent to-ink" />

      <div className="shell">
        <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brand">{team.eyebrow}</p>
            <h2 id="leadership-heading" className="mt-4 font-display text-white">
              {team.title}
              {team.titleAccent && <span className="block text-brand">{team.titleAccent}</span>}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-on-dark-muted lg:text-[0.9375rem]">{team.intro}</p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {team.members.map((member) => (
            <li key={member.name}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-raised transition duration-500 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_32px_60px_-30px_rgb(29_176_83/0.45)]">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 z-20 h-0.5 bg-gradient-to-r from-transparent via-brand to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative aspect-[4/4.2] overflow-hidden bg-ink-panel">
                  <Image
                    src={member.image.src}
                    alt={member.image.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-raised via-ink-raised/60 to-transparent"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-wider text-white shadow-lg">
                    {member.role}
                  </span>
                </div>

                <div className="relative flex flex-1 flex-col px-7 pb-8 pt-6">
                  <h3 className="font-display text-lg leading-tight text-white">{member.name}</h3>
                  <p className="mt-2 text-[0.6875rem] font-semibold uppercase tracking-wider text-brand">
                    {member.role}
                    <span className="text-on-dark-faint"> · {member.company}</span>
                  </p>

                  <p className="mt-5 text-xs leading-relaxed text-on-dark-muted">{member.bio}</p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {member.focus.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.625rem] text-on-dark-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/10 pt-6">
                    <p className="flex items-baseline gap-2">
                      <span className="font-display text-2xl leading-none text-brand">{member.years}</span>
                      <span className="text-[0.625rem] leading-tight text-on-dark-faint">
                        years of leadership
                        <br />
                        experience
                      </span>
                    </p>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold text-white transition-colors hover:text-brand"
                    >
                      <LinkedInIcon className="h-3.5 w-3.5" />
                      LinkedIn
                      <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
