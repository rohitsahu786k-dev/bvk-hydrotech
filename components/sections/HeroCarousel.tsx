"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSlide } from "@/lib/wordpress/home";

const AUTOPLAY_MS = 7000;

/**
 * Next's image optimiser, addressed directly.
 *
 * next/image does resolution switching but not art direction, and the hero
 * carries a separate portrait crop per slide. A <picture> with media-scoped
 * <source> elements is the only way to let the browser pick the right artwork
 * before it downloads anything — so the sources point at /_next/image rather
 * than at WordPress, which keeps AVIF/WebP conversion and caching.
 */
function optimised(src: string, width: number, quality = 72) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

const DESKTOP_WIDTHS = [1080, 1920, 2048];
const MOBILE_WIDTHS = [640, 828, 1080];

const srcSet = (src: string, widths: number[]) =>
  widths.map((w) => `${optimised(src, w)} ${w}w`).join(", ");

const OBJECT_POSITION: Record<string, string> = {
  center: "50% 50%",
  top: "50% 15%",
  bottom: "50% 85%",
  left: "15% 50%",
  right: "85% 50%",
};

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLElement | null>(null);

  const count = slides.length;
  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // Autoplay, held while the viewer is hovering, focused inside, or has asked
  // for reduced motion, and while the tab is in the background.
  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [count, paused]);

  useEffect(() => {
    const el = regionRef.current;
    if (!el || count < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [count, next, prev]);

  // Touch swipe.
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  if (count === 0) return null;

  return (
    <section
      ref={regionRef}
      tabIndex={-1}
      aria-roledescription="carousel"
      aria-label="BVK Hydrotech highlights"
      className="on-ink relative isolate flex aspect-square max-h-[92svh] w-full flex-col justify-center overflow-hidden bg-ink md:aspect-[1916/821]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Artwork */}
      {slides.map((slide, i) => {
        const active = i === index;
        const desktop = slide.imageDesktop;
        const mobile = slide.imageMobile ?? slide.imageDesktop;
        if (!desktop) return null;

        return (
          <div
            key={slide.databaseId}
            aria-hidden={!active}
            className="absolute inset-0 -z-10 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ opacity: active ? 1 : 0 }}
          >
            <picture>
              {mobile && (
                <source
                  media="(max-width: 767px)"
                  srcSet={srcSet(mobile.sourceUrl, MOBILE_WIDTHS)}
                  sizes="100vw"
                />
              )}
              <source
                srcSet={srcSet(desktop.sourceUrl, DESKTOP_WIDTHS)}
                sizes="100vw"
              />
              <img
                src={optimised(desktop.sourceUrl, 1920)}
                alt={desktop.altText || ""}
                fetchPriority={i === 0 ? "high" : "low"}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-cover"
                style={{
                  objectPosition: OBJECT_POSITION[slide.focalPoint] ?? OBJECT_POSITION.center,
                }}
              />
            </picture>
          </div>
        );
      })}

      {/* Copy — desktop/tablet only. Mobile artwork already has the
          headline and CTAs designed into the image itself. */}
      <div className="shell relative hidden w-full py-16 md:block lg:py-20">
        <div className="w-full pl-6 md:w-[38%] md:min-w-[26rem] lg:pl-10">
          {slides.map((slide, i) => {
            if (i !== index) return null;
            return (
              <div key={slide.databaseId} aria-live="polite">
                {slide.eyebrow && (
                  <p
                    className="eyebrow text-on-dark-muted"
                    style={{ animation: "bvk-fade-up 700ms var(--ease-out-soft) both" }}
                  >
                    {slide.eyebrow}
                  </p>
                )}

                <h1
                  className="display-hero mt-6 text-balance"
                  style={{ animation: "bvk-fade-up 800ms 80ms var(--ease-out-soft) both" }}
                >
                  <span className="block text-white">{slide.title}</span>
                  {slide.titleMuted && (
                    <span className="block text-on-dark-muted">{slide.titleMuted}</span>
                  )}
                </h1>

                {slide.subtitle && (
                  <p
                    className="mt-7 max-w-2xl text-base leading-relaxed text-on-dark-muted lg:text-lg"
                    style={{ animation: "bvk-fade-up 800ms 160ms var(--ease-out-soft) both" }}
                  >
                    {slide.subtitle}
                  </p>
                )}

                {(slide.ctaText || slide.cta2Text) && (
                  <div
                    className="mt-10 flex flex-wrap items-center gap-4"
                    style={{ animation: "bvk-fade-up 800ms 240ms var(--ease-out-soft) both" }}
                  >
                    {slide.ctaText && slide.ctaUrl && (
                      <Link href={slide.ctaUrl} className="btn btn-green group">
                        {slide.ctaText}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    )}
                    {slide.cta2Text && slide.cta2Url && (
                      <Link href={slide.cta2Url} className="btn btn-outline-light">
                        {slide.cta2Text}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      {count > 1 && (
        <div className="shell absolute inset-x-0 bottom-0 z-10 pb-8">
          <div className="flex items-end justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
                {slides.map((slide, i) => (
                  <button
                    key={slide.databaseId}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Slide ${i + 1}: ${slide.title}`}
                    onClick={() => go(i)}
                    className="group py-3"
                  >
                    <span
                      className={`block h-0.5 transition-all duration-500 ${
                        i === index
                          ? "w-10 bg-brand"
                          : "w-5 bg-white/30 group-hover:bg-white/60"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="hidden items-center gap-1 sm:flex">
                <button
                  onClick={prev}
                  aria-label="Previous slide"
                  className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/70 transition hover:border-brand hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next slide"
                  className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/70 transition hover:border-brand hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <a
              href="#solutions"
              className="hidden items-center gap-3 text-[0.625rem] font-semibold uppercase tracking-[0.3em] text-on-dark-faint transition hover:text-white md:flex"
            >
              Scroll
              <span
                aria-hidden
                className="block h-8 w-px bg-white/30"
                style={{ animation: "bvk-scroll-cue 2.4s ease-in-out infinite" }}
              />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
