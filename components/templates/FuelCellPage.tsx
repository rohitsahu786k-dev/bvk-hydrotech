import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check, Download } from "lucide-react";
import { getIcon } from "@/lib/content/icons";
import { fuelCell as c } from "@/content/fuel-cell";

/**
 * Fuel Cell Solutions landing page.
 *
 * Dark hero, then alternating white and light-grey bands, with two dark
 * moments (customization panel, sustainability) and a dark closing CTA. Same
 * ink-and-green system as the rest of the site; copy lives in content/fuel-cell.ts.
 */

export function Heading({
  eyebrow,
  title,
  intro,
  dark,
  center,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`eyebrow ${dark ? "text-brand" : "text-brand-deep"} ${center ? "justify-center" : ""}`}>
        {eyebrow}
      </p>
      <h2
        className={`pt-4 font-display text-3xl leading-tight text-balance lg:text-[2.5rem] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && <p className={`pt-4 ${dark ? "text-on-dark-muted" : "text-grey"}`}>{intro}</p>}
    </div>
  );
}

export function Cta({
  href,
  children,
  variant = "green",
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "green" | "outline" | "outline-dark";
  external?: boolean;
}) {
  const cls = `btn ${
    variant === "green" ? "btn-green" : variant === "outline" ? "btn-outline-light" : "btn-outline-dark"
  } w-fit`;
  const glyph = external ? <Download aria-hidden className="h-4 w-4" /> : <ArrowRight aria-hidden className="h-4 w-4" />;
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
      {glyph}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
      {glyph}
    </Link>
  );
}

export const cardHover =
  "transition duration-300 hover:-translate-y-1 hover:border-brand-deep/40";

export default function FuelCellPage() {
  const IconOf = (name: string) => getIcon(name as Parameters<typeof getIcon>[0]);

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="on-ink relative isolate overflow-hidden bg-ink pt-[5.5rem]">
        <Image
          src={c.hero.image}
          alt={c.hero.alt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[70%_50%]"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink from-30% via-ink/80 via-48% to-ink/10" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-ink to-transparent" />

        <div className="shell grid min-h-[34rem] items-center py-16 lg:py-20">
          <div className="max-w-xl">
            <p className="eyebrow text-brand">{c.hero.eyebrow}</p>
            <h1 className="pt-5 font-display text-4xl leading-[1.08] text-white lg:text-5xl">
              {c.hero.title}
              <span className="block text-brand">{c.hero.titleAccent}</span>
            </h1>
            <p className="pt-5 text-white/90">{c.hero.lead}</p>
            <p className="pt-3 text-on-dark-muted">{c.hero.text}</p>

            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {c.hero.points.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-white">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand/60 text-brand">
                    <Check aria-hidden className="h-3.5 w-3.5" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Cta href={c.hero.primary.href}>{c.hero.primary.label}</Cta>
              <Cta href={c.hero.secondary.href} variant="outline" external>
                {c.hero.secondary.label}
              </Cta>
            </div>
          </div>
        </div>
      </section>

      {/* ============ QUICK BENEFITS ============ */}
      <section aria-label="Benefits" className="border-b border-hairline bg-brand-wash">
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
            <div className="grid gap-3 pt-5 text-grey">
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

      {/* ============ FUEL CELL TYPES ============ */}
      <section id="types" className="section scroll-mt-24 bg-surface-raised">
        <div className="shell">
          <Heading eyebrow={c.types.eyebrow} title={c.types.title} intro={c.types.intro} />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.types.cards.map((card) => (
              <li key={card.title}>
                <article className={`flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-surface ${cardHover}`}>
                  <div className="relative aspect-[4/3] bg-surface-raised">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                      className="object-contain p-3"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg text-ink">{card.title}</h3>
                    <p className="flex-1 pt-2 text-grey">{card.text}</p>
                    <Link
                      href={"cta" in card ? "/contact#enquiry" : "#fit"}
                      className="group mt-4 inline-flex items-center gap-1.5 font-semibold text-brand-deep"
                    >
                      {"cta" in card ? card.cta : "Learn More"}
                      <ArrowUpRight
                        aria-hidden
                        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ WHERE MESH FITS ============ */}
      <section id="fit" className="section scroll-mt-24 bg-surface">
        <div className="shell">
          <Heading eyebrow={c.fit.eyebrow} title={c.fit.title} intro={c.fit.intro} center />

          <figure className="relative mx-auto mt-10 aspect-[5/2] max-w-5xl">
            <Image
              src={c.fit.image}
              alt={c.fit.alt}
              fill
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="object-contain"
            />
          </figure>

          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {c.fit.items.map((item, index) => (
              <li key={item.title} className="flex gap-4 border-t border-hairline pt-5">
                <span className="font-display text-2xl text-brand-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-base text-ink">{item.title}</h3>
                  <p className="pt-1 text-grey">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ MATERIALS + CUSTOMIZATION ============ */}
      <section className="bg-surface-raised">
        <div className="grid lg:grid-cols-[1.15fr_1fr]">
          <div className="px-[5%] py-16 lg:py-20 lg:pl-[max(5%,calc((100vw-90vw)/2))] lg:pr-12">
            <Heading eyebrow={c.materials.eyebrow} title={c.materials.title} intro={c.materials.intro} />
            <ul className="mt-9 grid gap-4 sm:grid-cols-2">
              {c.materials.items.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={`group flex h-full gap-4 rounded-lg border border-hairline bg-surface p-4 ${cardHover}`}
                  >
                    <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-surface-raised">
                      <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-base text-ink">{item.title}</span>
                      <span className="block pt-1 text-grey">{item.text}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="on-ink relative isolate overflow-hidden bg-ink px-[5%] py-16 lg:py-20 lg:pl-12 lg:pr-[max(5%,calc((100vw-90vw)/2))]">
            <Image src={c.customization.image} alt="" fill sizes="45vw" className="-z-20 object-cover" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-ink/80" />
            <p className="eyebrow text-brand">{c.customization.eyebrow}</p>
            <h2 className="pt-4 font-display text-3xl leading-tight text-balance text-white lg:text-[2.25rem]">
              {c.customization.title}
            </h2>
            <p className="pt-4 text-on-dark-muted">{c.customization.text}</p>
            <ul className="mt-6 grid gap-3">
              {c.customization.points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-white">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand text-brand">
                    <Check aria-hidden className="h-3.5 w-3.5" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Cta href="/contact#enquiry">{c.customization.cta}</Cta>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MANUFACTURING PROCESS ============ */}
      <section className="section bg-surface">
        <div className="shell">
          <Heading eyebrow={c.process.eyebrow} title={c.process.title} intro={c.process.intro} center />

          <div className="relative mt-14">
            <div
              aria-hidden
              className="absolute left-[8%] right-[8%] top-7 hidden h-px bg-gradient-to-r from-brand/0 via-brand-deep/40 to-brand/0 lg:block"
            />
            <ol className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
              {c.process.steps.map((step, index) => {
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

      {/* ============ QUALITY & TESTING ============ */}
      <section className="section bg-surface-raised">
        <div className="shell">
          <Heading eyebrow={c.quality.eyebrow} title={c.quality.title} intro={c.quality.intro} />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.quality.items.map((item) => (
              <li key={item.title}>
                <article className={`flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-surface ${cardHover}`}>
                  <div className="relative aspect-[16/9] bg-surface-raised">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base text-ink">{item.title}</h3>
                    <p className="pt-2 text-grey">{item.text}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ TECHNICAL SPECIFICATIONS ============ */}
      <section id="specifications" className="section scroll-mt-24 bg-surface">
        <div className="shell grid items-center gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div>
            <Heading eyebrow={c.specs.eyebrow} title={c.specs.title} intro={c.specs.intro} />
            <div className="mt-8 overflow-hidden rounded-lg border border-hairline">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-ink text-white">
                    {c.specs.columns.map((column) => (
                      <th key={column} scope="col" className="px-5 py-3 font-semibold">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.specs.rows.map(([parameter, approach], index) => (
                    <tr key={parameter} className={index % 2 ? "bg-surface-raised" : "bg-surface"}>
                      <th scope="row" className="w-[34%] px-5 py-3 font-semibold text-ink">
                        {parameter}
                      </th>
                      <td className="px-5 py-3 text-grey">{approach}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="pt-4 text-grey-mid">{c.specs.note}</p>
          </div>

          <figure className="relative aspect-[4/5] overflow-hidden rounded-lg border border-hairline bg-surface-raised">
            <Image
              src={c.specs.image}
              alt={c.specs.alt}
              fill
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      {/* ============ DOWNLOADS ============ */}
      <section className="section bg-surface-raised">
        <div className="shell">
          <Heading eyebrow={c.downloads.eyebrow} title={c.downloads.title} intro={c.downloads.intro} />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.downloads.items.map((item) => (
              <li key={item.title}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-full flex-col gap-3 rounded-lg border border-hairline bg-surface p-6 ${cardHover}`}
                  >
                    <DownloadCard item={item} />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex h-full flex-col gap-3 rounded-lg border border-hairline bg-surface p-6 ${cardHover}`}
                  >
                    <DownloadCard item={item} />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ R&D ============ */}
      <section className="section bg-surface">
        <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow text-brand-deep">{c.rnd.eyebrow}</p>
            <h2 className="pt-4 font-display text-3xl leading-tight text-balance text-ink lg:text-[2.5rem]">
              {c.rnd.title}
            </h2>
            <div className="grid gap-3 pt-5 text-grey">
              {c.rnd.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {c.rnd.items.map((item) => (
                <li key={item.title} className="rounded-lg border border-hairline bg-surface-raised p-5">
                  <h3 className="font-display text-base text-ink">{item.title}</h3>
                  <p className="pt-1 text-grey">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <figure className="relative aspect-[4/3] overflow-hidden rounded-lg border border-hairline bg-surface-raised">
            <Image
              src={c.rnd.image}
              alt={c.rnd.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      {/* ============ WHY BVK ============ */}
      <section className="section bg-surface-raised">
        <div className="shell">
          <Heading eyebrow={c.why.eyebrow} title={c.why.title} center />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.why.items.map((item) => {
              const Icon = IconOf(item.icon);
              return (
                <li key={item.title} className={`group rounded-lg border border-hairline bg-surface p-6 ${cardHover}`}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-wash text-brand-deep transition-colors duration-300 group-hover:bg-brand-deep group-hover:text-white">
                    <Icon aria-hidden className="h-6 w-6" />
                  </span>
                  <h3 className="pt-4 font-display text-base text-ink">{item.title}</h3>
                  <p className="pt-2 text-grey">{item.text}</p>
                </li>
              );
            })}
          </ul>
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

      {/* ============ TECHNICAL ENQUIRY CTA ============ */}
      <section id="enquiry-cta" className="section bg-surface">
        <div className="shell">
          <div className="grid items-center overflow-hidden rounded-lg border border-hairline bg-brand-wash lg:grid-cols-[1fr_1fr]">
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
            <div className="relative min-h-[18rem] self-stretch bg-surface">
              <Image
                src={c.enquiry.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-contain p-6"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/** Related solutions and the closing CTA. Rendered after the FAQ by the route. */
export function FuelCellClosing() {
  return (
    <>
      <section className="section bg-surface">
        <div className="shell">
          <Heading eyebrow={c.related.eyebrow} title={c.related.title} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.related.items.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className={`group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-surface ${cardHover}`}
                >
                  <span className="relative block aspect-[16/10] bg-surface-raised">
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
                      {item.cta}
                      <ArrowUpRight
                        aria-hidden
                        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-ink relative isolate overflow-hidden bg-ink py-20 lg:py-24">
        <Image src={c.finalCta.image} alt="" fill sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div className="shell">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight text-balance text-white lg:text-[2.5rem]">
              {c.finalCta.title}
            </h2>
            <p className="pt-4 text-on-dark-muted">{c.finalCta.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Cta href={c.finalCta.primary.href}>{c.finalCta.primary.label}</Cta>
              <Cta href={c.finalCta.secondary.href} variant="outline">
                {c.finalCta.secondary.label}
              </Cta>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function DownloadCard({
  item,
}: {
  item: { title: string; text: string; label: string; meta: string; external: boolean };
}) {
  return (
    <>
      <span className="text-xs font-semibold uppercase text-brand-deep">{item.meta}</span>
      <span className="font-display text-base text-ink">{item.title}</span>
      <span className="flex-1 text-grey">{item.text}</span>
      <span className="inline-flex items-center gap-2 font-semibold text-brand-deep">
        {item.label}
        {item.external ? <Download aria-hidden className="h-4 w-4" /> : <ArrowRight aria-hidden className="h-4 w-4" />}
      </span>
    </>
  );
}
