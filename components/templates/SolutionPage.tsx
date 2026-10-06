import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2, Download } from "lucide-react";
import { getIcon } from "@/lib/content/icons";
import type { LinkAction, SolutionPageContent } from "@/lib/content/types";
import styles from "./SolutionPage.module.css";

/**
 * The single layout behind every solution, capability and company page.
 *
 * It is a direct generalisation of the approved Electrolyser Solutions design,
 * so that page renders identically through here and every other page inherits
 * the same rhythm, type scale and colour treatment.
 */

function BlueIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eaf6ff] text-[#0876c9] ring-1 ring-blue-100">
      {children}
    </span>
  );
}

function Action({ action, variant }: { action: LinkAction; variant: "solid" | "outline" }) {
  const className =
    variant === "solid"
      ? "inline-flex items-center gap-2 rounded-full bg-[#0876c9] px-6 py-3 text-sm font-bold text-white shadow-xl shadow-blue-700/20 transition hover:bg-[#055faa]"
      : "inline-flex items-center gap-2 rounded-full border border-[#0876c9]/30 bg-white px-6 py-3 text-sm font-bold text-[#0876c9] transition hover:border-[#0876c9]";

  const glyph = action.external ? (
    <Download className="h-4 w-4" />
  ) : (
    <ArrowRight className="h-4 w-4" />
  );

  if (action.external) {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className={className}>
        {action.label} {glyph}
      </a>
    );
  }

  return (
    <Link href={action.href} className={className}>
      {action.label} {glyph}
    </Link>
  );
}

/** Headline split across two lines, the second in the accent blue. */
function Headline({ title, accent }: { title: string; accent?: string }) {
  if (!accent) return <>{title}</>;
  return (
    <>
      {title}
      <br />
      <span className="text-[#0876c9]">{accent}</span>
    </>
  );
}

export default function SolutionPage({ content }: { content: SolutionPageContent }) {
  const { hero } = content;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="shell">
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <ArrowRight size={11} aria-hidden />
            <span>{content.breadcrumb}</span>
          </nav>
        </div>

        <div className={`shell ${styles.heroLayout}`}>
          <div>
            <p className="text-xs font-semibold uppercase text-[#0b8cdd]">{hero.eyebrow}</p>
            <h1 className="mt-5 font-display text-[clamp(3rem,7vw,6.4rem)] font-black leading-[0.92] text-[#071a33]">
              {hero.title}
              {hero.titleAccent && (
                <span className="block text-[#0876c9]">{hero.titleAccent}</span>
              )}
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-slate-600">
              {hero.subtitle}
            </p>

            <div className={styles.heroFeatures}>
              {hero.features.map((feature) => {
                const Icon = getIcon(feature.icon);
                return (
                  <div key={feature.title}>
                    <Icon size={22} aria-hidden />
                    <span>{feature.title}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Action action={hero.primary} variant="solid" />
              {hero.secondary && <Action action={hero.secondary} variant="outline" />}
            </div>
          </div>

          <div className={styles.heroImage}>
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              preload
              sizes="(min-width: 1024px) 760px, 100vw"
            />
          </div>
        </div>

        {content.benefits && (
          <div className={`shell ${styles.benefits}`}>
            {content.benefits.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <div key={item.title} className="flex items-center gap-3 rounded-md px-3 py-4">
                  <BlueIcon>
                    <Icon className="h-5 w-5" />
                  </BlueIcon>
                  {/* Labels, not sections — kept out of the heading outline. */}
                  <div>
                    <p className="text-sm font-bold leading-tight text-[#071a33]">{item.title}</p>
                    <p className="mt-1 text-xs leading-snug text-slate-500">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {content.overview && (
        <section className="section bg-white">
          <div className="shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase text-[#0b8cdd]">
                {content.overview.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,4.2rem)] font-black leading-none text-[#071a33]">
                <Headline title={content.overview.title} accent={content.overview.titleAccent} />
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-600">
                {content.overview.body}
              </p>
              {content.overview.action && (
                <div className="mt-8">
                  <Action action={content.overview.action} variant="solid" />
                </div>
              )}
            </div>

            <div className="relative min-h-[24rem] overflow-hidden rounded-lg bg-slate-100 shadow-2xl shadow-blue-950/10">
              <Image
                src={content.overview.image.src}
                alt={content.overview.image.alt}
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              {content.overview.badge && (
                <div className="absolute bottom-8 left-8 flex items-center gap-4 rounded-lg bg-white/95 p-4 shadow-xl">
                  <BlueIcon>
                    {(() => {
                      const Icon = getIcon("flameKindling");
                      return <Icon className="h-5 w-5" />;
                    })()}
                  </BlueIcon>
                  <div>
                    <p className="text-sm font-bold text-[#071a33]">{content.overview.badge.title}</p>
                    <p className="text-xs text-slate-500">{content.overview.badge.text}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {content.components && (
        <section id="components" className={`section ${styles.components}`}>
          <div className="shell">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase text-[#0b8cdd]">
                {content.components.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.8rem)] font-black leading-none">
                <Headline
                  title={content.components.title}
                  accent={content.components.titleAccent}
                />
              </h2>
              <p className="mt-5 text-slate-600">{content.components.intro}</p>
            </div>

            <div className={styles.diagram}>
              <div className={styles.callouts}>
                {content.components.callouts
                  .filter((_, i) => i % 2 === 0)
                  .map((point) => (
                    <div key={point.title}>
                      <h3>{point.title}</h3>
                      <p>{point.text}</p>
                    </div>
                  ))}
              </div>
              <Image
                src={content.components.image.src}
                alt={content.components.image.alt}
                width={1536}
                height={864}
                sizes="(min-width: 1280px) 1180px, 92vw"
              />
              <div className={styles.callouts}>
                {content.components.callouts
                  .filter((_, i) => i % 2 === 1)
                  .map((point) => (
                    <div key={point.title}>
                      <h3>{point.title}</h3>
                      <p>{point.text}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {content.process && (
        <section className="section bg-white">
          <div className="shell">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase text-[#0b8cdd]">
                {content.process.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.8rem)] font-black leading-none">
                <Headline title={content.process.title} accent={content.process.titleAccent} />
              </h2>
              <p className="mt-5 text-slate-600">{content.process.intro}</p>
            </div>

            <div
              className={`mt-12 grid gap-5 ${
                content.process.steps.length === 4 ? "md:grid-cols-4" : "md:grid-cols-5"
              }`}
            >
              {content.process.steps.map((step, index) => {
                const Icon = getIcon(step.icon);
                return (
                  <div key={step.title} className="relative text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-blue-100 bg-white text-[#0876c9] shadow-lg shadow-blue-950/5">
                      {step.symbol ? (
                        <span className="text-3xl font-bold">
                          {step.symbol.replace(/\d/g, "")}
                          <sub>{step.symbol.replace(/\D/g, "")}</sub>
                        </span>
                      ) : (
                        <Icon className="h-8 w-8" />
                      )}
                    </div>
                    {index < content.process!.steps.length - 1 && (
                      <ArrowRight
                        aria-hidden
                        className="absolute right-[-1.25rem] top-7 hidden h-5 w-5 text-blue-300 md:block"
                      />
                    )}
                    <h3 className="mt-5 text-sm font-bold">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="mx-auto mt-2 max-w-[11rem] text-xs leading-relaxed text-slate-500">
                      {step.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {content.features && (
        <section className="section bg-[#f7fbff]">
          <div className="shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase text-[#0b8cdd]">
                {content.features.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.1rem,4vw,4rem)] font-black leading-none">
                <Headline title={content.features.title} accent={content.features.titleAccent} />
              </h2>
              <p className="mt-6 leading-relaxed text-slate-600">{content.features.body}</p>
              <ul className="mt-7 space-y-3">
                {content.features.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-[#0876c9]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-h-[25rem] overflow-hidden rounded-lg bg-slate-100 shadow-2xl shadow-blue-950/10">
              <Image
                src={content.features.image.src}
                alt={content.features.image.alt}
                fill
                loading="eager"
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              {content.features.badge && (
                <div className="absolute bottom-7 left-7 rounded-lg bg-white/95 p-4 shadow-xl">
                  <p className="text-sm font-bold">{content.features.badge.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{content.features.badge.text}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {content.specs && (
        <section id="specifications" className="section bg-white">
          <div className="shell">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase text-[#0b8cdd]">Specifications</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] font-black leading-none">
                {content.specs.caption}
              </h2>
            </div>
            <div className={styles.specWrap}>
              <table className={styles.specTable}>
                <thead>
                  <tr>
                    {content.specs.columns.filter(Boolean).map((column) => (
                      <th key={column} scope="col">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.specs.rows.map((row) => (
                    <tr key={row.parameter}>
                      <th scope="row">{row.parameter}</th>
                      <td>{row.value}</td>
                      {content.specs!.columns[2] && <td>{row.note ?? "—"}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {content.sustainability && (
        <section className="relative overflow-hidden bg-[#0a2d15] py-20 text-white">
          <Image
            src={content.sustainability.image.src}
            alt={content.sustainability.image.alt}
            fill
            sizes="100vw"
            className="object-cover opacity-70"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[#061a0c]/90 via-[#061a0c]/55 to-transparent"
          />
          <div className="shell relative grid gap-10 lg:grid-cols-[0.9fr_0.8fr]">
            <div>
              <p className="text-xs font-semibold uppercase text-blue-100">
                {content.sustainability.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,5rem)] font-black leading-none">
                {content.sustainability.title}
              </h2>
              <p className="mt-6 max-w-xl leading-relaxed text-white/85">
                {content.sustainability.body}
              </p>
            </div>
            <div className="grid content-center gap-4">
              {content.sustainability.stats.map((stat) => {
                const Icon = getIcon(stat.icon);
                return (
                  <div key={stat.value} className={styles.sustainabilityStat}>
                    <Icon size={32} aria-hidden />
                    <div>
                      <strong>{stat.value}</strong>
                      <p>{stat.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {content.applications && (
        <section className="section bg-white">
          <div className="shell">
            <div className={styles.applications}>
              <div>
                <p className="text-xs font-semibold uppercase text-[#0b8cdd]">
                  {content.applications.eyebrow}
                </p>
                <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.6rem)] font-black leading-none">
                  <Headline
                    title={content.applications.title}
                    accent={content.applications.titleAccent}
                  />
                </h2>
                <p className="mt-5 text-slate-600">{content.applications.intro}</p>
              </div>
              <div className={styles.applicationGrid}>
                {content.applications.cards.map((card) => {
                  const Icon = getIcon(card.icon);
                  return (
                    <article
                      key={card.title}
                      className="overflow-hidden rounded-lg border border-blue-100 bg-white shadow-lg shadow-blue-950/5"
                    >
                      <div className="relative h-36">
                        <Image
                          src={card.image.src}
                          alt={card.image.alt}
                          fill
                          loading="eager"
                          sizes="(min-width: 1280px) 20vw, 45vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <BlueIcon>
                          <Icon className="h-5 w-5" />
                        </BlueIcon>
                        <h3 className="mt-4 text-base font-bold leading-tight">{card.title}</h3>
                        <p className="mt-2 text-xs leading-relaxed text-slate-500">{card.text}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {content.why && (
        <section className="section bg-[#f7fbff]">
          <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase text-[#0b8cdd]">
                {content.why.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.8rem)] font-black leading-none">
                <Headline title={content.why.title} accent={content.why.titleAccent} />
              </h2>
              <p className="mt-5 text-slate-600">{content.why.intro}</p>
            </div>
            <div className={styles.strengths}>
              {content.why.cards.map((card) => {
                const Icon = getIcon(card.icon);
                return (
                  <article key={card.title} className={styles.strength}>
                    <BlueIcon>
                      <Icon className="h-5 w-5" />
                    </BlueIcon>
                    <h3 className="mt-4 text-base font-bold">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{card.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {content.tiles && (
        <section className={styles.tiles}>
          {content.tiles.map((tile) => (
            <Link
              key={tile.title}
              href={tile.href}
              className="group relative min-h-[19rem] overflow-hidden"
            >
              <Image
                src={tile.image.src}
                alt={tile.image.alt}
                fill
                loading="eager"
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/15 to-transparent"
              />
              <h3 className="absolute bottom-7 left-7 max-w-xs font-display text-2xl font-black leading-tight">
                {tile.title}
              </h3>
              <span
                aria-hidden
                className="absolute bottom-7 right-7 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0876c9]"
              >
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          ))}
        </section>
      )}

      {content.cta && (
        <section className={styles.cta}>
          <div className="shell overflow-hidden rounded-xl bg-[#eaf6ff]">
            <div className="relative grid min-h-[24rem] items-center overflow-hidden lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative z-10 p-8 lg:p-12">
                <p className="text-xs font-semibold uppercase text-[#0b8cdd]">
                  {content.cta.eyebrow}
                </p>
                <h2 className="mt-4 whitespace-pre-line font-display text-[clamp(2rem,4vw,3.8rem)] font-black leading-none text-[#071a33]">
                  {content.cta.title}
                </h2>
                <p className="mt-5 max-w-xl text-slate-600">{content.cta.body}</p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Action action={content.cta.primary} variant="solid" />
                  {content.cta.secondary && (
                    <Action action={content.cta.secondary} variant="outline" />
                  )}
                </div>
              </div>
              <div aria-hidden className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
                <Image
                  src={content.cta.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover opacity-45 lg:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#eaf6ff] via-[#eaf6ff]/65 to-transparent lg:from-[#eaf6ff] lg:via-[#eaf6ff]/35" />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
