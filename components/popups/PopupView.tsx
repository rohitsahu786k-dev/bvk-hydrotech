"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { X } from "lucide-react";
import { toInternalPath } from "@/lib/popups/engine";
import { trackPopup } from "@/lib/popups/track";
import type { Popup, PopupButton, PopupPosition } from "@/lib/popups/types";
import styles from "./Popup.module.css";

// The enquiry form is only downloaded for popups that actually contain it.
const RfqForm = dynamic(() => import("@/components/forms/RfqForm"), { ssr: false });

/** Hosts whose links are really this site, so they navigate without a reload. */
const SITE_HOSTS = (() => {
  const hosts = new Set(["bvkhydrotech.com", "www.bvkhydrotech.com", "admin.bvkhydrotech.com"]);
  for (const value of [process.env.NEXT_PUBLIC_SITE_URL, process.env.NEXT_PUBLIC_WORDPRESS_URL]) {
    try {
      if (value) hosts.add(new URL(value).host.toLowerCase());
    } catch {
      /* ignore a malformed env value */
    }
  }
  return [...hosts];
})();

// ---------------------------------------------------------------------------
// Images
//
// Same approach as the hero carousel: a <picture> with a media-scoped source
// for phones, pointed at Next's image optimiser, so a phone only ever downloads
// the mobile artwork. SVG and GIF are served as they are (the optimiser does
// not process them).
// ---------------------------------------------------------------------------

const RASTER = /\.(?:jpe?g|png|webp|avif)(?:\?.*)?$/i;
const DESKTOP_WIDTHS = [640, 828, 1080, 1200, 1920, 2048];
const MOBILE_WIDTHS = [640, 750, 828, 1080];

const optimised = (src: string, width: number) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;

const srcSet = (src: string, widths: number[]) =>
  RASTER.test(src) ? widths.map((w) => `${optimised(src, w)} ${w}w`).join(", ") : undefined;

function PopupPicture({ popup }: { popup: Popup }) {
  const { imageDesktop, imageMobile, imageAlt } = popup.content;
  const { size, widthDesktop, widthMobile } = popup.appearance;
  const desktop = imageDesktop ?? imageMobile;
  const mobile = imageMobile ?? imageDesktop;
  if (!desktop || !mobile) return null;

  const fullBleed = size !== "custom";
  const desktopSizes = fullBleed ? "100vw" : `min(${widthDesktop}px, 100vw)`;
  const mobileSizes = fullBleed ? "100vw" : `${widthMobile}vw`;
  const alt = imageAlt || desktop.alt || "";

  return (
    <picture>
      {srcSet(mobile.url, MOBILE_WIDTHS) && (
        <source media="(max-width: 767px)" srcSet={srcSet(mobile.url, MOBILE_WIDTHS)} sizes={mobileSizes} />
      )}
      {srcSet(desktop.url, DESKTOP_WIDTHS) && (
        <source srcSet={srcSet(desktop.url, DESKTOP_WIDTHS)} sizes={desktopSizes} />
      )}
      <img
        src={RASTER.test(desktop.url) ? optimised(desktop.url, 1200) : desktop.url}
        alt={alt}
        width={desktop.width || undefined}
        height={desktop.height || undefined}
        decoding="async"
        draggable={false}
      />
    </picture>
  );
}

// ---------------------------------------------------------------------------
// Links
// ---------------------------------------------------------------------------

function PopupLink({
  href,
  newTab,
  className,
  onActivate,
  ariaLabel,
  children,
}: {
  href: string;
  newTab: boolean;
  className?: string;
  onActivate: (href: string) => void;
  ariaLabel?: string;
  children: ReactNode;
}) {
  const internal = toInternalPath(href, SITE_HOSTS);
  const handle = () => onActivate(href);

  if (internal && !newTab) {
    return (
      <Link href={internal} className={className} onClick={handle} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={internal ?? href}
      className={className}
      onClick={handle}
      aria-label={ariaLabel}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

// ---------------------------------------------------------------------------
// The popup
// ---------------------------------------------------------------------------

type Phase = "loading" | "open" | "closed";

const V: Record<PopupPosition, "top" | "middle" | "bottom"> = {
  "top-left": "top",
  "top-center": "top",
  "top-right": "top",
  "center-left": "middle",
  center: "middle",
  "center-right": "middle",
  "bottom-left": "bottom",
  "bottom-center": "bottom",
  "bottom-right": "bottom",
};

const H: Record<PopupPosition, "left" | "center" | "right"> = {
  "top-left": "left",
  "top-center": "center",
  "top-right": "right",
  "center-left": "left",
  center: "center",
  "center-right": "right",
  "bottom-left": "left",
  "bottom-center": "center",
  "bottom-right": "right",
};

function overlayColor(hex: string, opacityPercent: number): string {
  const full = hex.length === 4 ? `#${[...hex.slice(1)].map((c) => c + c).join("")}` : hex;
  const n = parseInt(full.slice(1), 16);
  return `rgb(${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255} / ${opacityPercent / 100})`;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export type CloseReason = "button" | "overlay" | "escape" | "auto" | "cta";

export default function PopupView({
  popup,
  onShown,
  onCta,
  onClosed,
}: {
  popup: Popup;
  /** The popup is on screen (its artwork has loaded). */
  onShown: (popup: Popup) => void;
  /** The visitor clicked a link or button inside it. */
  onCta: (popup: Popup, href: string) => void;
  /** The exit animation has finished and it can be removed. */
  onClosed: (popup: Popup, reason: CloseReason) => void;
}) {
  const { content, appearance: a } = popup;
  const headingId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  const shown = useRef(false);

  const hasImage = content.layout !== "text_only" && Boolean(content.imageDesktop ?? content.imageMobile);
  const [phase, setPhase] = useState<Phase>(hasImage ? "loading" : "open");
  const [closeReady, setCloseReady] = useState(a.closeDelay === 0);

  // Callers pass fresh closures every render; keep the latest without re-running effects.
  const callbacks = useRef({ onShown, onCta, onClosed });
  useEffect(() => {
    callbacks.current = { onShown, onCta, onClosed };
  });

  const modal = a.overlay;

  const close = useCallback(
    (reason: CloseReason) => {
      if (closing.current) return;
      closing.current = true;
      trackPopup("close", popup, reason);
      setPhase("closed");
      const wait = a.exit === "none" || reduceMotion() ? 0 : a.duration;
      if (wait === 0) callbacks.current.onClosed(popup, reason);
      else window.setTimeout(() => callbacks.current.onClosed(popup, reason), wait);
    },
    [popup, a.exit, a.duration],
  );

  // Wait for the artwork so the popup appears fully drawn, never half loaded.
  useEffect(() => {
    if (phase !== "loading") return;
    const root = rootRef.current;
    if (!root) return;

    const pending = Array.from(root.querySelectorAll("img")).filter((img) => !img.complete);
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setPhase((p) => (p === "loading" ? "open" : p));
    };

    let left = pending.length;
    const settle = () => {
      left -= 1;
      if (left <= 0) finish();
    };
    pending.forEach((img) => {
      img.addEventListener("load", settle, { once: true });
      img.addEventListener("error", settle, { once: true });
    });

    // Already cached, or a slow connection: never hold the popup back for long.
    const timer = window.setTimeout(finish, pending.length === 0 ? 0 : 3000);
    return () => {
      finished = true;
      window.clearTimeout(timer);
      pending.forEach((img) => {
        img.removeEventListener("load", settle);
        img.removeEventListener("error", settle);
      });
    };
  }, [phase]);

  // It is on screen: count it, report it, move focus into it.
  useEffect(() => {
    if (phase !== "open" || shown.current) return;
    shown.current = true;
    callbacks.current.onShown(popup);
    trackPopup("view", popup);

    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.focus({ preventScroll: true });
    return () => {
      if (modal) previous?.focus?.({ preventScroll: true });
    };
  }, [phase, popup, modal]);

  // Stop the page scrolling behind a dimmed popup.
  useEffect(() => {
    if (phase !== "open" || !a.overlay || !a.preventScroll) return;
    const html = document.documentElement;
    const { overflow, paddingRight } = html.style;
    const scrollbar = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`;
    return () => {
      html.style.overflow = overflow;
      html.style.paddingRight = paddingRight;
    };
  }, [phase, a.overlay, a.preventScroll]);

  // Esc to close.
  useEffect(() => {
    if (phase !== "open" || !a.closeOnEsc) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close("escape");
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [phase, a.closeOnEsc, close]);

  // Close automatically after N seconds.
  useEffect(() => {
    if (phase !== "open" || a.autoClose === 0) return;
    const timer = window.setTimeout(() => close("auto"), a.autoClose * 1000);
    return () => window.clearTimeout(timer);
  }, [phase, a.autoClose, close]);

  // Reveal the close button after its delay.
  useEffect(() => {
    if (phase !== "open" || closeReady) return;
    const timer = window.setTimeout(() => setCloseReady(true), a.closeDelay * 1000);
    return () => window.clearTimeout(timer);
  }, [phase, closeReady, a.closeDelay]);

  // Keep Tab inside a modal popup (the close button sits outside the panel,
  // so the whole popup is searched, in document order).
  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!modal || event.key !== "Tab") return;
    const items = Array.from(rootRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
      (el) => el.offsetParent !== null,
    );
    if (items.length === 0) {
      event.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || active === panelRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const activate = useCallback(
    (href: string) => {
      trackPopup("click", popup, href);
      callbacks.current.onCta(popup, href);
      // A link to another popup swaps this one out; anything else ends it.
      if (!href.startsWith("#")) close("cta");
    },
    [popup, close],
  );

  // Links inside the editor-written text count as clicks too.
  const onRichClick = (event: ReactMouseEvent<HTMLElement>) => {
    const link = (event.target as HTMLElement).closest("a[href]");
    if (link) activate(link.getAttribute("href") ?? "");
  };

  const duration = reduceMotion() ? 0 : a.duration;
  const rootStyle = {
    "--bvk-z": a.zIndex,
    "--bvk-dur": `${duration}ms`,
    "--bvk-w-d": `${a.widthDesktop}px`,
    "--bvk-w-m": a.widthMobile,
    "--bvk-bg": a.bgColor,
    "--bvk-fg": a.textColor,
    "--bvk-radius": `${a.radius}px`,
    "--bvk-pad": `${a.padding}px`,
    "--bvk-overlay": overlayColor(a.overlayColor, a.overlayOpacity),
  } as CSSProperties;

  const showMedia = content.layout !== "text_only" && hasImage;
  const showText =
    content.layout !== "image_only" &&
    Boolean(content.eyebrow || content.heading || content.bodyHtml || content.buttons.length || content.showForm);
  const label = content.heading || popup.title;

  const media = showMedia && (
    content.linkUrl ? (
      <PopupLink
        href={content.linkUrl}
        newTab={content.linkNewTab}
        className={styles.media}
        onActivate={activate}
        ariaLabel={label}
      >
        <PopupPicture popup={popup} />
      </PopupLink>
    ) : (
      <div className={styles.media}>
        <PopupPicture popup={popup} />
      </div>
    )
  );

  return (
    <div
      ref={rootRef}
      className={styles.root}
      style={rootStyle}
      data-bvk-popup-root=""
      data-popup-key={popup.key}
      data-state={phase}
      data-v={V[a.position]}
      data-h={H[a.position]}
      data-size={a.size}
      data-in={a.entrance}
      data-out={a.exit}
      onKeyDown={onKeyDown}
    >
      {a.overlay && (
        <div
          className={styles.overlay}
          aria-hidden
          onClick={a.closeOnOverlay ? () => close("overlay") : undefined}
        />
      )}

      <div className={styles.positioner}>
        <div className={styles.frame}>
          {a.closeButton && closeReady && (
            <button
              type="button"
              data-popup-close=""
              data-placement={a.closePlacement}
              className={styles.close}
              aria-label="Close popup"
              onClick={() => close("button")}
            >
              <X aria-hidden className="h-5 w-5" />
            </button>
          )}

          <div
            ref={panelRef}
            className={styles.panel}
            role="dialog"
            aria-modal={modal}
            aria-labelledby={content.heading ? headingId : undefined}
            aria-label={content.heading ? undefined : label}
            tabIndex={-1}
          >
            <div className={styles.body} data-layout={content.layout}>
              {media}

              {showText && (
                <div className={styles.text}>
                  {content.eyebrow && <p className={styles.eyebrow}>{content.eyebrow}</p>}
                  {content.heading && (
                    <h2 id={headingId} className={styles.heading}>
                      {content.heading}
                    </h2>
                  )}
                  {content.bodyHtml && (
                    <div
                      className={styles.rich}
                      onClick={onRichClick}
                      dangerouslySetInnerHTML={{ __html: content.bodyHtml }}
                    />
                  )}
                  {content.buttons.length > 0 && (
                    <div className={styles.actions}>
                      {content.buttons.map((button: PopupButton, i: number) => (
                        <PopupLink
                          key={`${button.text}-${i}`}
                          href={button.url}
                          newTab={button.newTab}
                          className={`btn ${i === 0 ? "btn-green" : "btn-outline-dark"}`}
                          onActivate={activate}
                        >
                          {button.text}
                        </PopupLink>
                      ))}
                    </div>
                  )}
                  {content.showForm && <RfqForm mode="general" />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
