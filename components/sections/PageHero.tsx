import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SitePage } from "@/lib/wordpress/pages";
import InnerHeroImage from "./InnerHeroImage";

/**
 * Inner-page hero — a shorter, quieter relative of the homepage carousel.
 * The top padding clears the fixed header, which sits over the artwork.
 *
 * Every inner page shares the same backdrop (wide on desktop, square on
 * mobile), so the pages read as one family.
 */
export default function PageHero({ hero, title }: { hero: SitePage["hero"]; title: string }) {
  const heading = hero.title || title;

  return (
    <section className="on-ink relative isolate flex min-h-[calc(100vw+4.5rem)] items-end overflow-hidden bg-ink pb-10 pt-24 md:min-h-[calc(23.82vw+4.5rem)] lg:pb-12 lg:pt-28">
      <InnerHeroImage />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/70 via-ink/35 to-transparent"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

      <div className="shell">
        <div className="max-w-3xl">
          {hero.badge && <p className="eyebrow text-brand">{hero.badge}</p>}

          <h1 className="display-section mt-5 text-balance text-white">{heading}</h1>

          {hero.subtitle && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-on-dark-muted lg:text-lg">
              {hero.subtitle}
            </p>
          )}

          {(hero.buttonText || hero.button2Text) && (
            <div className="mt-9 flex flex-wrap items-center gap-4">
              {hero.buttonText && hero.buttonUrl && (
                <Link href={hero.buttonUrl} className="btn btn-green group">
                  {hero.buttonText}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              {hero.button2Text && hero.button2Url && (
                <Link href={hero.button2Url} className="btn btn-outline-light">
                  {hero.button2Text}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
