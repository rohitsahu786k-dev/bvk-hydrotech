"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { IndustryCard } from "@/lib/wordpress/home";
import SectionHeading from "./SectionHeading";

const PIXELS_PER_SECOND = 45;

/**
 * Applications, the PO's term for where the mesh ends up. A continuously
 * auto-scrolling row reads better than a static grid once there are ten of
 * them.
 *
 * Driven by scrollLeft on a rAF loop rather than a CSS transform, because
 * that's what lets the arrow buttons and the autoplay share one mechanism —
 * clicking an arrow is just a bigger, one-off nudge of the same scrollLeft
 * the loop is already animating. The list is duplicated once so wrapping
 * past the halfway point loops seamlessly.
 */
export default function IndustriesSection({ industries }: { industries: IndustryCard[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || industries.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (!pausedRef.current && !document.hidden) {
        const half = el.scrollWidth / 2;
        el.scrollLeft += PIXELS_PER_SECOND * dt;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [industries.length]);

  const nudge = useCallback((direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("li")?.getBoundingClientRect().width ?? 280;
    el.scrollBy({ left: direction * (cardWidth + 20), behavior: "smooth" });
  }, []);

  if (!industries.length) return null;

  const track = [...industries, ...industries];

  return (
    <section className="section overflow-hidden bg-ink">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Applications"
            title="Six decades of filtration, now pointed at clean energy"
            description="BVK has supplied precision mesh across ten industries since 1963. That process knowledge is what makes the hydrogen work repeatable."
          />
          <div className="mb-1 flex items-center gap-2">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Scroll applications left"
              className="flex h-10 w-10 items-center justify-center border border-ink-line text-on-dark-faint transition hover:border-brand hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Scroll applications right"
              className="flex h-10 w-10 items-center justify-center border border-ink-line text-on-dark-faint transition hover:border-brand hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="relative mt-10 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <ul
          ref={trackRef}
          className="flex gap-5 overflow-x-hidden px-[5%]"
        >
          {track.map((industry, i) => (
            <li key={`${industry.slug}-${i}`} className="w-64 shrink-0 sm:w-72">
              <Link
                href={`/industries/${industry.slug}`}
                className="group relative block aspect-square overflow-hidden border border-ink-line"
                tabIndex={i < industries.length ? 0 : -1}
                aria-hidden={i >= industries.length}
              >
                {industry.image?.sourceUrl && (
                  <Image
                    src={industry.image.sourceUrl}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 18rem, 16rem"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}

                {/* Base scrim so the bottom third is legible even before the
                    caption chip — a floating chip alone isn't enough
                    contrast against a bright photo. */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
                />

                {/* Caption: inset from every edge (left, right and bottom)
                    so it reads as a floating chip, not a bar flush to the
                    card — blurred glass + solid backing + text-shadow so the
                    title stays crisp over any photo. */}
                <div
                  aria-hidden
                  className="absolute inset-x-4 bottom-4 rounded-md bg-black/70 px-4 py-3 shadow-[0_10px_28px_-8px_rgba(0,0,0,0.8)] ring-1 ring-white/10 backdrop-blur-md"
                >
                  <h3
                    className="font-display text-sm font-bold tracking-tight text-white"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}
                  >
                    {industry.title}
                  </h3>
                  {industry.applications.length > 0 && (
                    <p className="mt-1 truncate text-[0.6875rem] text-white/75">
                      {industry.applications.slice(0, 2).join(" · ")}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
