import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SitePage } from "@/lib/wordpress/pages";

const WP_BASE = process.env.NEXT_PUBLIC_WORDPRESS_URL ?? "https://dev.bhavcreations.in";
const PATTERN_BG = `${WP_BASE.replace(/\/$/, "")}/wp-content/uploads/bg-pattern-scaled.webp`;

/**
 * Inner-page hero — a shorter, quieter relative of the homepage carousel.
 * The top padding clears the fixed header, which sits over the artwork.
 *
 * The brand wave pattern is always the base layer, so a page with no
 * per-page hero photo still gets a finished backdrop instead of flat black;
 * a page's own hero image (when authored in the CMS) sits on top of it.
 */
export default function PageHero({ hero, title }: { hero: SitePage["hero"]; title: string }) {
  const heading = hero.title || title;

  return (
    <section className="on-ink relative isolate flex min-h-[52vh] items-end overflow-hidden bg-ink pb-16 pt-36 lg:min-h-[60vh] lg:pb-20 lg:pt-44">
      <Image
        src={PATTERN_BG}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />

      {hero.image?.sourceUrl && (
        <Image
          src={hero.image.sourceUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
      )}

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/94 via-ink/80 to-ink/45"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink to-transparent" />

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
