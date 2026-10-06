import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Download } from "lucide-react";
import { getIcon } from "@/lib/content/icons";
import type { LinkAction, SolutionPageContent } from "@/lib/content/types";
import styles from "./CorporatePage.module.css";

/**
 * The layout for company, capability and knowledge pages.
 *
 * Deliberately a different design language from SolutionPage: the product
 * pages run on the blue print-collateral system, while these run on the
 * site's own ink-and-green tokens from globals.css — square corners, hairline
 * rules, flat cards, numbered editorial blocks and a vertical process spine.
 * It reads as the same company, not the same page.
 *
 * It takes the identical content object, so copy is written once and only the
 * presentation differs.
 */

function Action({ action, variant }: { action: LinkAction; variant: "green" | "outline" }) {
  const className = variant === "green" ? "btn btn-green group" : "btn btn-outline-light group";
  const glyph = action.external ? (
    <Download className="h-4 w-4" />
  ) : (
    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
  );

  if (action.external) {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className={className}>
        {action.label}
        {glyph}
      </a>
    );
  }
  return (
    <Link href={action.href} className={className}>
      {action.label}
      {glyph}
    </Link>
  );
}

/** Headline with the accent word in green rather than on its own blue line. */
function Headline({ title, accent }: { title: string; accent?: string }) {
  if (!accent) return <>{title}</>;
  return (
    <>
      {title} <span className="text-brand">{accent}</span>
    </>
  );
}

export default function CorporatePage({ content }: { content: SolutionPageContent }) {
  const { hero } = content;

  return (
    <div className={styles.page}>
      {/* HERO — full-bleed ink panel, photograph behind a scrim. */}
      <section className={styles.hero}>
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className={styles.heroScrim} />

        <div className={`shell ${styles.heroInner}`}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span aria-hidden>/</span>
            <span>{content.breadcrumb}</span>
          </nav>

          <p className="eyebrow mt-10 text-brand">{hero.eyebrow}</p>
          <h1 className={styles.heroTitle}>
            <Headline title={hero.title} accent={hero.titleAccent} />
          </h1>
          <p className={styles.heroSubtitle}>{hero.subtitle}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Action action={hero.primary} variant="green" />
            {hero.secondary && <Action action={hero.secondary} variant="outline" />}
          </div>
        </div>
      </section>

      {/* FACT ROW — hairline-divided, flat, on ink. */}
      {content.benefits && (
        <section className={styles.factBand}>
          <div className={`shell ${styles.factRow}`}>
            {content.benefits.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <div key={item.title} className={styles.fact}>
                  <Icon className="h-5 w-5 text-brand" />
                  <p className={styles.factTitle}>{item.title}</p>
                  <p className={styles.factText}>{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* LEAD — editorial two-column, heading left, body right. */}
      {content.overview && (
        <section className="section bg-surface">
          <div className={`shell ${styles.lead}`}>
            <div>
              <p className="eyebrow text-brand-deep">{content.overview.eyebrow}</p>
              <h2 className="display-section mt-6 text-balance text-ink">
                <Headline
                  title={content.overview.title}
                  accent={content.overview.titleAccent}
                />
              </h2>
              <span aria-hidden className="rule-green mt-8 block" />
            </div>
            <div>
              <p className={styles.leadBody}>{content.overview.body}</p>
              {content.overview.badge && (
                <p className={styles.leadNote}>
                  <strong>{content.overview.badge.title}</strong> — {content.overview.badge.text}
                </p>
              )}
              {content.overview.action && (
                <Link
                  href={content.overview.action.href}
                  className="btn btn-outline-dark group mt-8"
                >
                  {content.overview.action.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* NUMBERED BLOCKS — replaces the solutions diagram entirely. */}
      {content.components && (
        <section id="components" className="section bg-surface-raised">
          <div className="shell">
            <div className={styles.blockHead}>
              <div>
                <p className="eyebrow text-brand-deep">{content.components.eyebrow}</p>
                <h2 className="display-section mt-6 max-w-3xl text-balance text-ink">
                  <Headline
                    title={content.components.title}
                    accent={content.components.titleAccent}
                  />
                </h2>
              </div>
              <p className={styles.blockIntro}>{content.components.intro}</p>
            </div>

            <ol className={styles.numbered}>
              {content.components.callouts.map((point, index) => (
                <li key={point.title}>
                  <span className={styles.numeral}>{String(index + 1).padStart(2, "0")}</span>
                  <h3 className={styles.numberedTitle}>{point.title}</h3>
                  <p className={styles.numberedText}>{point.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* CHECKLIST — dark panel beside a photograph. */}
      {content.features && (
        <section className={styles.checklistBand}>
          <div className={`shell ${styles.checklist}`}>
            <div className={styles.checklistCopy}>
              <p className="eyebrow text-brand">{content.features.eyebrow}</p>
              <h2 className="display-section mt-6 text-balance text-white">
                <Headline title={content.features.title} accent={content.features.titleAccent} />
              </h2>
              <p className={styles.checklistBody}>{content.features.body}</p>
              <ul className={styles.checklistItems}>
                {content.features.points.map((point) => (
                  <li key={point}>
                    <Check aria-hidden className="h-4 w-4 shrink-0 text-brand" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.checklistMedia}>
              <Image
                src={content.features.image.src}
                alt={content.features.image.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
              {content.features.badge && (
                <figcaption className={styles.mediaCaption}>
                  <strong>{content.features.badge.title}</strong>
                  <span>{content.features.badge.text}</span>
                </figcaption>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SPEC TABLE — square, ink header, zebra rows. */}
      {content.specs && (
        <section id="specifications" className="section bg-surface">
          <div className="shell">
            <p className="eyebrow text-brand-deep">Specifications</p>
            <h2 className="display-section mt-6 max-w-3xl text-balance text-ink">
              {content.specs.caption}
            </h2>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
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

      {/* PROCESS — vertical spine, not horizontal circles. */}
      {content.process && (
        <section className="section bg-surface-raised">
          <div className={`shell ${styles.timelineLayout}`}>
            <div>
              <p className="eyebrow text-brand-deep">{content.process.eyebrow}</p>
              <h2 className="display-section mt-6 text-balance text-ink">
                <Headline title={content.process.title} accent={content.process.titleAccent} />
              </h2>
              <p className={styles.leadBody} style={{ marginTop: "1.5rem" }}>
                {content.process.intro}
              </p>
            </div>

            <ol className={styles.timeline}>
              {content.process.steps.map((step, index) => {
                const Icon = getIcon(step.icon);
                return (
                  <li key={step.title}>
                    <span className={styles.timelineMark}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className={styles.timelineStep}>
                        Step {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className={styles.timelineTitle}>{step.title}</h3>
                      <p className={styles.timelineText}>{step.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      )}

      {/* PHOTO ROW — square frames with captions under, no gradients. */}
      {content.applications && (
        <section className="section bg-surface">
          <div className="shell">
            <div className={styles.blockHead}>
              <div>
                <p className="eyebrow text-brand-deep">{content.applications.eyebrow}</p>
                <h2 className="display-section mt-6 max-w-3xl text-balance text-ink">
                  <Headline
                    title={content.applications.title}
                    accent={content.applications.titleAccent}
                  />
                </h2>
              </div>
              <p className={styles.blockIntro}>{content.applications.intro}</p>
            </div>

            <div className={styles.photoRow}>
              {content.applications.cards.map((card) => (
                <figure key={card.title}>
                  <div className={styles.photoFrame}>
                    <Image
                      src={card.image.src}
                      alt={card.image.alt}
                      fill
                      sizes="(min-width: 1024px) 23vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* REASONS — flat hairline grid, green rule instead of icon discs. */}
      {content.why && (
        <section className="section bg-surface-raised">
          <div className="shell">
            <div className={styles.blockHead}>
              <div>
                <p className="eyebrow text-brand-deep">{content.why.eyebrow}</p>
                <h2 className="display-section mt-6 max-w-3xl text-balance text-ink">
                  <Headline title={content.why.title} accent={content.why.titleAccent} />
                </h2>
              </div>
              <p className={styles.blockIntro}>{content.why.intro}</p>
            </div>

            <div className={styles.reasonGrid}>
              {content.why.cards.map((card) => {
                const Icon = getIcon(card.icon);
                return (
                  <article key={card.title}>
                    <Icon className="h-5 w-5 text-brand-deep" />
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SUSTAINABILITY — ink band with green numerals, no photo wash. */}
      {content.sustainability && (
        <section className={styles.sustainBand}>
          <div className={`shell ${styles.sustain}`}>
            <div>
              <p className="eyebrow text-brand">{content.sustainability.eyebrow}</p>
              <h2 className="display-section mt-6 text-balance text-white">
                {content.sustainability.title}
              </h2>
              <p className={styles.checklistBody}>{content.sustainability.body}</p>
            </div>
            <dl className={styles.sustainStats}>
              {content.sustainability.stats.map((stat) => (
                <div key={stat.value}>
                  <dt>{stat.text}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* CROSS-LINKS — ruled rows, not image tiles. */}
      {content.tiles && (
        <section className="section bg-surface">
          <div className="shell">
            <p className="eyebrow text-brand-deep">Continue</p>
            <ul className={styles.linkRows}>
              {content.tiles.map((tile) => (
                <li key={tile.title}>
                  <Link href={tile.href}>
                    <span className={styles.linkThumb}>
                      <Image
                        src={tile.image.src}
                        alt=""
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </span>
                    <h3>{tile.title}</h3>
                    <ArrowUpRight aria-hidden className="h-5 w-5 shrink-0 text-grey-soft" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA — ink band, green button, no photograph. */}
      {content.cta && (
        <section className={styles.ctaBand}>
          <div className={`shell ${styles.cta}`}>
            <div>
              <p className="eyebrow text-brand">{content.cta.eyebrow}</p>
              <h2 className={styles.ctaTitle}>{content.cta.title}</h2>
              <p className={styles.ctaBody}>{content.cta.body}</p>
            </div>
            <div className={styles.ctaActions}>
              <Action action={content.cta.primary} variant="green" />
              {content.cta.secondary && (
                <Action action={content.cta.secondary} variant="outline" />
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
