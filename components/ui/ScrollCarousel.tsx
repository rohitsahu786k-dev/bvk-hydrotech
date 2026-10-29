"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * A swipeable carousel with previous/next controls. Slides start at the left
 * edge and the next one peeks in on the right, so it is clear there is more.
 * Native scroll-snap does the work, so touch, trackpad and keyboard scrolling
 * all behave as the browser's own.
 */
export default function ScrollCarousel({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const frame = requestAnimationFrame(update);
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const move = (direction: 1 | -1) => {
    const el = track.current;
    const slide = el?.querySelector<HTMLElement>("[data-slide]");
    if (!el || !slide) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * (slide.offsetWidth + gap),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const slides = Children.toArray(children);

  const button =
    "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-surface text-brand-deep shadow-[0_8px_24px_-8px_rgb(0_0_0/0.35)] transition hover:border-brand hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-0 sm:flex";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="relative [--slide:82%] sm:[--slide:48%] lg:[--slide:32%]"
    >
      <button
        type="button"
        aria-label="Previous"
        onClick={() => move(-1)}
        disabled={edge.start}
        className={`${button} left-2 lg:left-4`}
      >
        <ChevronLeft aria-hidden className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => move(1)}
        disabled={edge.end}
        className={`${button} right-2 lg:right-4`}
      >
        <ChevronRight aria-hidden className="h-5 w-5" />
      </button>

      <ul
        ref={track}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, index) => (
          <li
            key={index}
            data-slide
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
            className="w-[var(--slide)] shrink-0 snap-start"
          >
            {slide}
          </li>
        ))}
      </ul>
    </div>
  );
}
