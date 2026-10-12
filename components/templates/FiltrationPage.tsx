import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getIcon } from "@/lib/content/icons";
import CtaBand from "@/components/sections/CtaBand";
import { filtration as c } from "@/content/filtration";
import { Cta, cardHover } from "./FuelCellPage";

/**
 * Industrial Filtration landing page.
 *
 * A light hero (the filter photography is shot on white), a benefits strip,
 * then alternating white and light bands, with one full-width photograph, a
 * compact dark sustainability moment and the shared closing CTA. Same
 * ink-and-green system as the rest of the site; copy lives in
 * content/filtration.ts.
 */

const IconOf = (name: string) => getIcon(name as Parameters<typeof getIcon>[0]);

/** A section heading whose last line is picked out in brand green. */
function Title({
  eyebrow,
  title,
  accent,
  intro,
  center,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : undefined}>
      <p className={`eyebrow text-brand-deep ${center ? "justify-center" : ""}`}>{eyebrow}</p>
      <h2 className="mt-3 font-display text-ink">
        {title}
        {accent && <span className="block text-brand-deep">{accent}</span>}
      </h2>
      {intro && <p className="mt-3 text-sm leading-relaxed text-grey">{intro}</p>}
    </div>
  );
}

export default function FiltrationPage() {
  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-surface-raised pt-[4.5rem]">
        <div className="shell grid items-center gap-8 py-10 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:py-12">
          <div>
            <p className="eyebrow text-brand-deep">{c.hero.eyebrow}</p>
            <h1 className="mt-4 font-display text-ink">
              {c.hero.title}
              <span className="block text-brand-deep">{c.hero.titleAccent}</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-grey">{c.hero.lead}</p>

            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5">
              {c.hero.points.map((point) => {
                const Icon = IconOf(point.icon);
                return (
                  <li key={point.title} className="flex items-center gap-2 text-xs font-medium text-ink">
                    <Icon aria-hidden className="h-4 w-4 text-brand-deep" />
                    {point.title}
                  </li>
                );
              })}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <Cta href={c.hero.primary.href}>{c.hero.primary.label}</Cta>
              <Cta href={c.hero.secondary.href} variant="outline-dark" external>
                {c.hero.secondary.label}
              </Cta>
            </div>
          </div>

          <figure className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface">
            <Image
              src={c.hero.image}
              alt={c.hero.alt}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      {/* ============ QUICK BENEFITS ============ */}
      <section aria-label="Benefits" className="bg-brand-wash/70 py-5">
        <ul className="shell grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {c.benefits.map((item) => {
            const Icon = IconOf(item.icon);
            return (
              <li key={item.title} className="flex items-center gap-3.5 bg-surface p-4 lg:p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-wash text-brand-deep">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-sm text-ink">{item.title}</h3>
                  <p className="mt-0.5 text-xs text-grey">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ============ OVERVIEW ============ */}
      <section className="bg-surface py-12 lg:py-16">
        <div className="shell grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <p className="eyebrow text-brand-deep">{c.overview.eyebrow}</p>
            <h2 className="mt-3 font-display text-ink">{c.overview.title}</h2>
            <div className="mt-4 grid gap-3 text-sm leading-relaxed text-grey">
              {c.overview.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-6">
              <Cta href={c.overview.cta.href}>{c.overview.cta.label}</Cta>
            </div>
          </div>

          <figure className="relative aspect-[16/9] overflow-hidden rounded-xl border border-hairline bg-ink">
            <Image
              src={c.overview.image}
              alt={c.overview.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <figcaption className="absolute bottom-4 left-4 max-w-[16rem] rounded-lg bg-surface/95 p-3.5 shadow-lg">
              <p className="font-display text-sm text-ink">{c.overview.badge.title}</p>
              <p className="mt-0.5 text-xs leading-snug text-grey">{c.overview.badge.text}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ============ KEY FUNCTIONS ============ */}
      <section className="bg-surface pb-12 lg:pb-16">
        <div className="shell">
          <Title
            eyebrow={c.functions.eyebrow}
            title={c.functions.title}
            accent={c.functions.titleAccent}
            intro={c.functions.intro}
            center
          />

          <ul className="mt-10 grid grid-cols-2 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
            {c.functions.items.map((item, index) => {
              const Icon = IconOf(item.icon);
              return (
                <li
                  key={item.title}
                  className={`px-4 text-center ${index > 0 ? "lg:border-l lg:border-hairline" : ""}`}
                >
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand-wash text-brand-deep">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 font-display text-sm leading-snug text-ink">{item.title}</h3>
                  <p className="mt-1 text-xs leading-snug text-grey">{item.sub}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ============ FULL-WIDTH PHOTOGRAPH ============ */}
      <div className="relative h-56 w-full overflow-hidden bg-ink sm:h-72 lg:h-[22rem]">
        <Image
          src={c.band.image}
          alt={c.band.alt}
          fill
          sizes="100vw"
          className="object-cover object-[50%_35%]"
        />
      </div>

      {/* ============ APPLICATIONS ============ */}
      <section id="applications" className="scroll-mt-24 bg-surface py-12 lg:py-16">
        <div className="shell grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div>
            <Title
              eyebrow={c.applications.eyebrow}
              title={c.applications.title}
              accent={c.applications.titleAccent}
              intro={c.applications.intro}
            />
            <ul className="mt-6 grid gap-3">
              {c.applications.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-wash text-brand-deep">
                    <Check aria-hidden className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <figure className="relative aspect-[16/10] overflow-hidden rounded-xl border border-hairline bg-surface-raised">
            <Image
              src={c.applications.image}
              alt={c.applications.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      {/* ============ MEDIA SELECTION ============ */}
      <section id="specifications" className="scroll-mt-24 bg-surface pb-12 lg:pb-16">
        <div className="shell">
          <p className="eyebrow justify-center text-brand-deep">{c.media.eyebrow}</p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-hairline bg-surface">
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-surface-raised text-ink">
                  {c.media.columns.map((column) => (
                    <th key={column} scope="col" className="px-5 py-3 text-xs font-semibold uppercase tracking-wider">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.media.rows.map(([parameter, options, notes]) => (
                  <tr key={parameter} className="border-t border-hairline">
                    <th scope="row" className="w-[22%] px-5 py-3 font-semibold text-ink">
                      {parameter}
                    </th>
                    <td className="px-5 py-3 text-grey">{options}</td>
                    <td className="px-5 py-3 text-grey">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ SUSTAINABILITY ============ */}
      <section className="on-ink relative isolate overflow-hidden bg-ink py-10 lg:py-12">
        <Image src={c.sustainability.image} alt="" fill sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="shell grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div>
            <p className="eyebrow text-brand">{c.sustainability.eyebrow}</p>
            <h2 className="mt-3 font-display text-white">{c.sustainability.title}</h2>
            <div className="mt-3 grid gap-2 text-sm leading-relaxed text-on-dark-muted">
              {c.sustainability.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <ul className="grid gap-3 lg:justify-self-end">
            {c.sustainability.items.map((item) => {
              const Icon = IconOf(item.icon);
              return (
                <li key={item.title} className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand/70 bg-ink/60 text-brand">
                    <Icon aria-hidden className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-white">{item.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ============ INDUSTRIES ============ */}
      <section className="bg-surface py-12 lg:py-16">
        <div className="shell grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-10">
          <Title eyebrow={c.industries.eyebrow} title={c.industries.title} intro={c.industries.intro} />

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.industries.items.map((item) => (
              <li key={item.title}>
                <Link
                  href="/industries-applications"
                  className={`group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-surface ${cardHover}`}
                >
                  <span className="relative block aspect-[4/3] overflow-hidden bg-surface-raised">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </span>
                  <span className="flex flex-1 flex-col p-4">
                    <span className="font-display text-sm text-ink">{item.title}</span>
                    <span className="mt-1.5 flex-1 text-xs leading-snug text-grey">{item.text}</span>
                    <ArrowRight
                      aria-hidden
                      className="mt-3 h-4 w-4 self-end text-brand-deep transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ CAPABILITIES ============ */}
      <section className="bg-surface-raised py-12 lg:py-16">
        <div className="shell">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <Title
              eyebrow={c.capabilities.eyebrow}
              title={c.capabilities.title}
              accent={c.capabilities.titleAccent}
              intro={c.capabilities.intro}
            />
            <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {c.capabilities.items.map((item) => {
                const Icon = IconOf(item.icon);
                return (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-wash text-brand-deep">
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-sm text-ink">{item.title}</h3>
                      <p className="mt-0.5 text-xs leading-snug text-grey">{item.sub}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {c.capabilities.cards.map((card) => (
              <li key={card.title}>
                <Link
                  href={card.href}
                  className="group relative isolate flex h-52 flex-col justify-end overflow-hidden rounded-xl bg-ink"
                >
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent"
                  />
                  <span className="flex items-center justify-between gap-3 p-4">
                    <span className="font-display text-sm text-white">{card.title}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-brand-deep transition-colors group-hover:bg-brand group-hover:text-white">
                      <ArrowRight aria-hidden className="h-4 w-4" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ TECHNICAL ENQUIRY ============ */}
      <section className="bg-surface py-12 lg:py-16">
        <div className="shell">
          <div className="grid items-stretch overflow-hidden rounded-xl border border-hairline bg-brand-wash lg:grid-cols-2">
            <div className="p-7 lg:p-10">
              <p className="eyebrow text-brand-deep">{c.enquiry.eyebrow}</p>
              <h2 className="mt-3 font-display text-ink">
                {c.enquiry.title}
                <span className="block">{c.enquiry.titleAccent}</span>
              </h2>
              <div className="mt-3 grid gap-2 text-sm leading-relaxed text-grey">
                {c.enquiry.text.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Cta href={c.enquiry.primary.href}>{c.enquiry.primary.label}</Cta>
                <Cta href={c.enquiry.secondary.href} variant="outline-dark">
                  {c.enquiry.secondary.label}
                </Cta>
              </div>
            </div>
            <div className="relative min-h-[15rem]">
              <Image
                src={c.enquiry.image}
                alt={c.enquiry.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-brand-wash via-transparent to-transparent lg:bg-gradient-to-r lg:from-brand-wash lg:via-brand-wash/20 lg:to-transparent"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/** The closing CTA, rendered after the FAQ by the route. */
export function FiltrationClosing() {
  return (
    <CtaBand
      eyebrow={c.finalCta.eyebrow}
      title={c.finalCta.title}
      body={c.finalCta.text}
      primary={c.finalCta.primary}
    />
  );
}
