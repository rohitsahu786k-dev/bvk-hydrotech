import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck, Check } from "lucide-react";
import { getIcon } from "@/lib/content/icons";
import { filtration as c } from "@/content/filtration";
import { Cta, Heading, cardHover } from "./FuelCellPage";

/**
 * Industrial Filtration landing page.
 *
 * A light hero (the filter photography is shot on white), then alternating
 * white and light-grey bands, with a dark sustainability moment and a dark
 * closing CTA. Same ink-and-green system as the rest of the site; copy lives
 * in content/filtration.ts.
 */

const IconOf = (name: string) => getIcon(name as Parameters<typeof getIcon>[0]);

export default function FiltrationPage() {
  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-surface-raised pt-[5.5rem]">
        <div className="shell grid items-center gap-8 py-12 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:py-16">
          <div>
            <p className="eyebrow text-brand-deep">{c.hero.eyebrow}</p>
            <h1 className="pt-5 font-display text-4xl leading-[1.12] text-ink lg:text-[2.6rem]">
              {c.hero.title}
              <span className="block text-brand-deep">{c.hero.titleAccent}</span>
            </h1>
            <p className="pt-5 text-ink">{c.hero.lead}</p>
            <p className="pt-3 text-grey">{c.hero.text}</p>

            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {c.hero.points.map((point) => {
                const Icon = IconOf(point.icon);
                return (
                  <li key={point.title} className="flex items-center gap-2.5 text-ink">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-wash text-brand-deep">
                      <Icon aria-hidden className="h-4 w-4" />
                    </span>
                    {point.title}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Cta href={c.hero.primary.href}>{c.hero.primary.label}</Cta>
              <Cta href={c.hero.secondary.href} variant="outline-dark" external>
                {c.hero.secondary.label}
              </Cta>
            </div>
          </div>

          <figure className="relative aspect-[16/10] overflow-hidden rounded-lg">
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
      <section aria-label="Benefits" className="border-y border-hairline bg-brand-wash">
        <ul className="shell grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:py-0">
          {c.benefits.map((item, index) => {
            const Icon = IconOf(item.icon);
            return (
              <li
                key={item.title}
                className={`flex items-start gap-4 lg:py-8 ${
                  index > 0 ? "lg:border-l lg:border-brand-deep/15 lg:pl-8" : ""
                } ${index < c.benefits.length - 1 ? "lg:pr-8" : ""}`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-brand-deep ring-1 ring-brand-deep/20">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base text-ink">{item.title}</h3>
                  <p className="pt-1 text-grey">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ============ OVERVIEW ============ */}
      <section className="section bg-surface">
        <div className="shell grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brand-deep">{c.overview.eyebrow}</p>
            <h2 className="pt-4 font-display text-3xl leading-tight text-balance text-ink lg:text-[2.5rem]">
              {c.overview.title}
            </h2>
            <p className="pt-4 font-semibold text-ink">{c.overview.lead}</p>
            <div className="grid gap-3 pt-3 text-grey">
              {c.overview.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-7">
              <Cta href={c.overview.cta.href}>{c.overview.cta.label}</Cta>
            </div>
          </div>

          <figure className="relative aspect-[16/10] overflow-hidden rounded-lg border border-hairline bg-surface-raised">
            <Image
              src={c.overview.image}
              alt={c.overview.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <figcaption className="absolute bottom-4 left-4 max-w-[17rem] rounded-lg bg-surface/95 p-4">
              <p className="font-display text-base text-ink">{c.overview.badge.title}</p>
              <p className="pt-1 text-grey">{c.overview.badge.text}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ============ KEY FUNCTIONS ============ */}
      <section className="section bg-surface-raised">
        <div className="shell">
          <Heading eyebrow={c.functions.eyebrow} title={c.functions.title} intro={c.functions.intro} center />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.functions.items.map((item, index) => {
              const Icon = IconOf(item.icon);
              return (
                <li
                  key={item.title}
                  className={`group rounded-lg border border-hairline bg-surface p-6 ${cardHover}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-wash text-brand-deep transition-colors duration-300 group-hover:bg-brand-deep group-hover:text-white">
                      <Icon aria-hidden className="h-6 w-6" />
                    </span>
                    <span className="font-display text-2xl text-brand-deep/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="pt-4 font-display text-lg text-ink">{item.title}</h3>
                  <p className="pt-1 font-semibold text-brand-deep">{item.sub}</p>
                  <p className="pt-2 text-grey">{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ============ APPLICATIONS ============ */}
      <section id="applications" className="section scroll-mt-24 bg-surface">
        <div className="shell grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brand-deep">{c.applications.eyebrow}</p>
            <h2 className="pt-4 font-display text-3xl leading-tight text-balance text-ink lg:text-[2.5rem]">
              {c.applications.title}
            </h2>
            <p className="pt-4 text-grey">{c.applications.intro}</p>

            <h3 className="pt-6 font-display text-base text-ink">{c.applications.heading}</h3>
            <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {c.applications.points.map((point) => (
                <li key={point} className="flex gap-2.5 text-ink">
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <figure className="relative aspect-[4/3] overflow-hidden rounded-lg border border-hairline bg-surface-raised">
            <Image
              src={c.applications.image}
              alt={c.applications.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      {/* ============ MEDIA SELECTION ============ */}
      <section id="specifications" className="section scroll-mt-24 bg-surface-raised">
        <div className="shell">
          <Heading eyebrow={c.media.eyebrow} title={c.media.title} intro={c.media.intro} center />

          <div className="mt-10 overflow-x-auto rounded-lg border border-hairline bg-surface">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <thead>
                <tr className="bg-ink text-white">
                  {c.media.columns.map((column) => (
                    <th key={column} scope="col" className="px-5 py-3 font-semibold">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.media.rows.map(([parameter, options, consideration], index) => (
                  <tr key={parameter} className={index % 2 ? "bg-surface-raised" : "bg-surface"}>
                    <th scope="row" className="w-[24%] px-5 py-3 font-semibold text-ink">
                      {parameter}
                    </th>
                    <td className="px-5 py-3 text-ink">{options}</td>
                    <td className="px-5 py-3 text-grey">{consideration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mx-auto max-w-3xl pt-4 text-center text-grey-mid">{c.media.note}</p>
        </div>
      </section>

      {/* ============ SUSTAINABILITY ============ */}
      <section className="on-ink section relative isolate overflow-hidden bg-ink">
        <Image src={c.sustainability.image} alt="" fill sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="shell grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brand">{c.sustainability.eyebrow}</p>
            <h2 className="pt-4 font-display text-3xl leading-tight text-white lg:text-[2.5rem]">
              {c.sustainability.title}
            </h2>
            <div className="grid gap-3 pt-5 text-on-dark-muted">
              {c.sustainability.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <ul className="grid gap-4">
            {c.sustainability.items.map((item) => {
              const Icon = IconOf(item.icon);
              return (
                <li
                  key={item.title}
                  className="flex items-start gap-4 rounded-lg border border-white/10 bg-ink/75 p-5 backdrop-blur-sm"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand/60 text-brand">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base text-white">{item.title}</h3>
                    <p className="pt-1 text-on-dark-muted">{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ============ INDUSTRIES ============ */}
      <section className="section bg-surface">
        <div className="shell">
          <Heading eyebrow={c.industries.eyebrow} title={c.industries.title} intro={c.industries.intro} />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.industries.items.map((item) => (
              <li key={item.title}>
                <Link
                  href="/industries-applications"
                  className={`group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-surface ${cardHover}`}
                >
                  <span className="relative block aspect-[4/3] overflow-hidden bg-surface-raised">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="font-display text-base text-ink">{item.title}</span>
                    <span className="flex-1 pt-2 text-grey">{item.text}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand-deep">
                      {c.industries.cta}
                      <ArrowRight
                        aria-hidden
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="pt-6 text-grey">{c.industries.also}</p>
        </div>
      </section>

      {/* ============ CAPABILITIES ============ */}
      <section className="section bg-surface-raised">
        <div className="shell">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <Heading eyebrow={c.capabilities.eyebrow} title={c.capabilities.title} intro={c.capabilities.intro} />
            <ul className="grid gap-4 sm:grid-cols-2">
              {c.capabilities.items.map((item) => {
                const Icon = IconOf(item.icon);
                return (
                  <li key={item.title} className="flex gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-wash text-brand-deep">
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-base text-ink">{item.title}</h3>
                      <p className="font-semibold text-brand-deep">{item.sub}</p>
                      <p className="pt-1 text-grey">{item.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {c.capabilities.cards.map((card) => (
              <li key={card.title}>
                <Link
                  href={card.href}
                  className="group relative isolate flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-lg border border-hairline bg-ink"
                >
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-transparent"
                  />
                  <span className="p-6">
                    <span className="block font-display text-lg text-white">{card.title}</span>
                    <span className="block pt-2 text-white/85">{card.text}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-white">
                      {card.cta}
                      <ArrowUpRight
                        aria-hidden
                        className="h-4 w-4 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ ENGINEERING & DEVELOPMENT ============ */}
      <section className="section bg-surface">
        <div className="shell">
          <Heading eyebrow={c.engineering.eyebrow} title={c.engineering.title} intro={c.engineering.intro} center />

          <div className="relative mt-14">
            <div
              aria-hidden
              className="absolute left-[8%] right-[8%] top-7 hidden h-px bg-gradient-to-r from-brand/0 via-brand-deep/40 to-brand/0 lg:block"
            />
            <ol className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
              {c.engineering.steps.map((step, index) => {
                const Icon = IconOf(step.icon);
                return (
                  <li key={step.title} className="group text-center">
                    <span className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-hairline bg-surface text-brand-deep transition-colors duration-300 group-hover:border-brand-deep group-hover:bg-brand-deep group-hover:text-white">
                      <Icon aria-hidden className="h-6 w-6" />
                    </span>
                    <p className="pt-3 font-display text-brand-deep">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="pt-1 font-display text-base leading-snug text-ink">{step.title}</h3>
                    <p className="pt-2 text-grey">{step.text}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ============ TECHNICAL ENQUIRY ============ */}
      <section className="bg-surface-raised py-14 lg:py-20">
        <div className="shell">
          <div className="grid items-stretch overflow-hidden rounded-lg border border-hairline bg-brand-wash lg:grid-cols-[1fr_1fr]">
            <div className="p-8 lg:p-12">
              <p className="eyebrow text-brand-deep">{c.enquiry.eyebrow}</p>
              <h2 className="pt-4 font-display text-3xl leading-tight text-balance text-ink lg:text-[2.25rem]">
                {c.enquiry.title}
              </h2>
              <div className="grid gap-3 pt-4 text-grey">
                {c.enquiry.text.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Cta href={c.enquiry.primary.href}>{c.enquiry.primary.label}</Cta>
                <Cta href={c.enquiry.secondary.href} variant="outline-dark">
                  {c.enquiry.secondary.label}
                </Cta>
              </div>
            </div>
            <div className="relative min-h-[18rem]">
              <Image
                src={c.enquiry.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-brand-wash via-brand-wash/30 to-transparent lg:from-brand-wash lg:via-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ QUALITY & INSPECTION ============ */}
      <section className="section bg-surface">
        <div className="shell">
          <Heading eyebrow={c.quality.eyebrow} title={c.quality.title} intro={c.quality.intro} center />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {c.quality.items.map((item) => {
              const Icon = IconOf(item.icon);
              return (
                <li
                  key={item.title}
                  className={`group rounded-lg border border-hairline bg-surface-raised p-5 ${cardHover}`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-wash text-brand-deep transition-colors duration-300 group-hover:bg-brand-deep group-hover:text-white">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <h3 className="pt-4 font-display text-base text-ink">{item.title}</h3>
                  <p className="pt-2 text-grey">{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ============ CERTIFICATIONS ============ */}
      <section className="border-y border-hairline bg-surface-raised">
        <div className="shell grid items-center gap-8 py-12 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <div>
            <p className="eyebrow text-brand-deep">{c.certifications.eyebrow}</p>
            <h2 className="pt-4 font-display text-2xl leading-tight text-ink lg:text-3xl">
              {c.certifications.title}
            </h2>
            <p className="pt-3 text-grey">{c.certifications.intro}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {c.certifications.items.map((item) => (
              <li key={item.name} className="flex items-center gap-4 rounded-lg border border-hairline bg-surface p-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-wash text-brand-deep">
                  <BadgeCheck aria-hidden className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-display text-base text-ink">{item.name}</p>
                  <p className="text-grey">{item.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

/** The closing CTA, rendered after the FAQ by the route. */
export function FiltrationClosing() {
  return (
    <section className="on-ink relative isolate overflow-hidden bg-ink py-16 lg:py-20">
      <Image src={c.finalCta.image} alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/85" />
      <div className="shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand">{c.finalCta.eyebrow}</p>
          <h2 className="pt-4 font-display text-3xl leading-tight text-balance text-white lg:text-[2.25rem]">
            {c.finalCta.title}
          </h2>
          <p className="pt-3 text-on-dark-muted">{c.finalCta.text}</p>
        </div>
        <Cta href={c.finalCta.primary.href}>{c.finalCta.primary.label}</Cta>
      </div>
    </section>
  );
}
