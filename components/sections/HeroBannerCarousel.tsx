"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import {
  canStep,
  forDevice,
  stepIndex,
  swipeDirection,
  visibilityClass,
  withNeighbours,
} from "@/lib/banners/logic";
import type { HomeBanner, HomeBannerSettings } from "@/lib/banners/types";
import { BANNER_DESKTOP_WIDTHS, BANNER_MOBILE_WIDTHS, optimisedUrl, srcSetFor } from "@/lib/responsive-image";
import styles from "./HeroBanner.module.css";

/** A media query as React state, safe on the server (which assumes "no"). */
function useMedia(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", notify);
      return () => list.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const BUTTON_POSITION: Record<HomeBanner["button"]["position"], string> = {
  "bottom-left": "left-[5%]",
  "bottom-center": "left-1/2 -translate-x-1/2",
  "bottom-right": "right-[5%]",
};

const BUTTON_STYLE: Record<HomeBanner["button"]["style"], string> = {
  green: "btn btn-green",
  white: "btn btn-solid",
  outline: "btn btn-outline-light",
};

function Picture({ banner, first }: { banner: HomeBanner; first: boolean }) {
  const { desktop, mobile } = banner;
  return (
    <picture>
      {srcSetFor(mobile.url, BANNER_MOBILE_WIDTHS) && (
        <source media="(max-width: 767px)" srcSet={srcSetFor(mobile.url, BANNER_MOBILE_WIDTHS)} sizes="100vw" />
      )}
      {srcSetFor(desktop.url, BANNER_DESKTOP_WIDTHS) && (
        <source srcSet={srcSetFor(desktop.url, BANNER_DESKTOP_WIDTHS)} sizes="100vw" />
      )}
      <img
        src={optimisedUrl(desktop.url, 1920)}
        alt={banner.alt}
        width={desktop.width || undefined}
        height={desktop.height || undefined}
        // The first banner is what the page is judged on; the rest wait their turn.
        fetchPriority={first ? "high" : "low"}
        loading={first ? "eager" : "lazy"}
        decoding={first ? "sync" : "async"}
        draggable={false}
        className="absolute inset-0 h-full w-full select-none object-cover"
      />
    </picture>
  );
}

/**
 * Homepage banner carousel.
 *
 * Every banner is an editor-supplied picture pair (desktop and mobile crops)
 * with an optional link. A phone only downloads the mobile crop. Behaviour,
 * arrows, dots and size are driven by the Carousel Settings in WordPress.
 *
 * Accessible by construction: it is a labelled carousel region, each slide is
 * announced as "n of N", hidden slides are inert (not focusable, not read),
 * autoplay can be paused, stops for "reduce motion", while the pointer or focus
 * is inside, and while the tab is in the background.
 */
export default function HeroBannerCarousel({
  banners,
  settings,
}: {
  banners: HomeBanner[];
  settings: HomeBannerSettings;
}) {
  const isMobile = useMedia("(max-width: 767px)");
  const reducedMotion = useMedia("(prefers-reduced-motion: reduce)");

  // Banners can be limited to one device in WordPress.
  const slides = forDevice(banners, isMobile ? "mobile" : "desktop");
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState<number[]>([0, 1]);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const current = Math.min(index, Math.max(0, count - 1));

  const go = useCallback(
    (next: number) => {
      setIndex(next);
      setLoaded((l) => withNeighbours(l, next, count));
    },
    [count],
  );
  const step = useCallback(
    (direction: 1 | -1) => go(stepIndex(current, count, direction, settings.loop)),
    [go, current, count, settings.loop],
  );

  // Autoplay. The effect restarts on every change of slide, so a manual move
  // always gives the new banner its full time on screen.
  const running = settings.autoplay && count > 1 && !userPaused && !reducedMotion && !(hovered && settings.pauseOnHover);
  useEffect(() => {
    if (!running || !canStep(current, count, 1, settings.loop)) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) step(1);
    }, settings.delay * 1000);
    return () => window.clearInterval(timer);
  }, [running, current, count, settings.loop, settings.delay, step]);

  if (count === 0) return null;

  const fade = settings.transition === "fade";

  const slideStyle = (i: number): CSSProperties =>
    fade
      ? { opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }
      : { transform: `translateX(${(i - current) * 100}%)` };

  const frameStyle = {
    "--ar-d": settings.ratioDesktop.replace("/", " / "),
    "--ar-m": settings.ratioMobile.replace("/", " / "),
    "--max-h": settings.maxHeight,
    "--speed": reducedMotion ? "0ms" : `${settings.speed}ms`,
  } as CSSProperties;

  const arrowClass = (side: "prev" | "next") =>
    `${styles.arrow} ${side === "prev" ? styles.prev : styles.next} ${visibilityClass(settings.arrows)}`;

  const dots = (
    <div
      className={`items-center gap-3 ${visibilityClass(settings.dots)} ${
        settings.dotsPosition === "inside"
          ? "pointer-events-none absolute inset-x-0 bottom-3 z-[3] justify-center md:bottom-5"
          : "justify-center bg-ink py-3"
      }`}
    >
      <div className="pointer-events-auto flex items-center gap-2.5">
        {slides.map((banner, i) => (
          <button
            key={banner.id}
            type="button"
            className={styles.dot}
            aria-label={`Show banner ${i + 1} of ${count}`}
            aria-current={i === current}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured solutions"
      data-header="dark"
      className="bg-ink"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") step(1);
        if (event.key === "ArrowLeft") step(-1);
      }}
    >
      <div className={styles.frame} style={frameStyle}>
        <div
          className={styles.stage}
          aria-live={running ? "off" : "polite"}
          onTouchStart={(e) => {
            touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }}
          onTouchEnd={(e) => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start) return;
            const direction = swipeDirection(e.changedTouches[0].clientX - start.x, e.changedTouches[0].clientY - start.y);
            if (direction !== 0) step(direction);
          }}
        >
          {slides.map((banner, i) => {
            const active = i === current;
            const rendered = i === 0 || loaded.includes(i);
            const label = banner.link.label || banner.alt;
            const inner = (
              <>
                {rendered && <Picture banner={banner} first={i === 0} />}
                {banner.button.text && (
                  <span
                    aria-hidden
                    className={`${BUTTON_STYLE[banner.button.style]} pointer-events-none absolute bottom-[14%] ${BUTTON_POSITION[banner.button.position]}`}
                  >
                    {banner.button.text}
                  </span>
                )}
              </>
            );

            return (
              <div
                key={banner.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                inert={!active}
                className={styles.slide}
                style={slideStyle(i)}
              >
                {banner.link.url ? (
                  banner.link.newTab || /^https?:\/\//i.test(banner.link.url) ? (
                    <a
                      href={banner.link.url}
                      aria-label={label}
                      className="absolute inset-0 block"
                      onClick={() => track(banner)}
                      {...(banner.link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link href={banner.link.url} aria-label={label} className="absolute inset-0 block" onClick={() => track(banner)}>
                      {inner}
                    </Link>
                  )
                ) : (
                  <div className="absolute inset-0">{inner}</div>
                )}
              </div>
            );
          })}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              className={arrowClass("prev")}
              data-shape={settings.arrowShape}
              data-theme={settings.arrowTheme}
              aria-label="Previous banner"
              disabled={!canStep(current, count, -1, settings.loop)}
              onClick={() => step(-1)}
            >
              <ChevronLeft aria-hidden className="h-6 w-6" />
            </button>
            <button
              type="button"
              className={arrowClass("next")}
              data-shape={settings.arrowShape}
              data-theme={settings.arrowTheme}
              aria-label="Next banner"
              disabled={!canStep(current, count, 1, settings.loop)}
              onClick={() => step(1)}
            >
              <ChevronRight aria-hidden className="h-6 w-6" />
            </button>
          </>
        )}

        {count > 1 && settings.dotsPosition === "inside" && dots}

        {settings.autoplay && count > 1 && !reducedMotion && (
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-pressed={userPaused}
            aria-label={userPaused ? "Start automatic banner change" : "Pause automatic banner change"}
            className="absolute right-3 top-[4.75rem] z-[3] flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-ink/55 text-white backdrop-blur transition-colors hover:bg-ink/80 md:bottom-5 md:right-5 md:top-auto"
          >
            {userPaused ? <Play aria-hidden className="h-4 w-4" /> : <Pause aria-hidden className="h-4 w-4" />}
          </button>
        )}
      </div>

      {count > 1 && settings.dotsPosition === "below" && dots}
    </section>
  );
}

function track(banner: HomeBanner) {
  try {
    window.dataLayer?.push({
      event: "bvk_banner_click",
      banner_id: banner.id,
      banner_name: banner.title,
      banner_url: banner.link.url,
    });
  } catch {
    /* analytics must never break navigation */
  }
}
