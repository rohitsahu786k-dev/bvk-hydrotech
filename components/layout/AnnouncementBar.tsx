"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Announcement } from "@/lib/wordpress/announcement";
import styles from "./AnnouncementBar.module.css";

const TONE = {
  green: "bg-brand-deep text-white",
  dark: "bg-ink text-white",
  light: "bg-surface-raised text-ink border-b border-hairline",
} as const;

const PIXELS_PER_SECOND = { slow: 38, normal: 60, fast: 95 } as const;

const dismissedKey = "bvk-announcement-dismissed";

const noSubscription = () => () => {};
const readDismissed = () => {
  try {
    return window.localStorage.getItem(dismissedKey) ?? "";
  } catch {
    return "";
  }
};

/**
 * Slim strip at the very top of every page, edited under Announcement Bar in
 * WordPress. It sits in the normal flow and scrolls away with the page; the
 * fixed header slides up to the top edge as it does (the --announce-offset
 * variable). A visitor can close it, and it stays closed until the messages
 * change.
 */
export default function AnnouncementBar({ data }: { data: Announcement }) {
  const [closedNow, setClosedNow] = useState(false);
  const dismissedId = useSyncExternalStore(noSubscription, readDismissed, () => "");
  const closed = closedNow || (data.dismissible && dismissedId === data.id);
  const ref = useRef<HTMLDivElement>(null);

  // Keep the fixed header just under the bar, and flush with the top once the
  // bar has scrolled out of view.
  useEffect(() => {
    const root = document.documentElement;
    if (closed) {
      root.style.setProperty("--announce-offset", "0px");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = ref.current?.offsetHeight ?? 0;
      root.style.setProperty("--announce-offset", `${Math.max(0, height - window.scrollY)}px`);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
      root.style.setProperty("--announce-offset", "0px");
    };
  }, [closed]);

  if (closed) return null;

  // Each copy of the list must be wider than the screen or the loop shows a
  // gap, so a short list is repeated until it is.
  const chars = data.messages.reduce((sum, m) => sum + m.text.length + m.label.length + 8, 0);
  const repeat = Math.max(1, Math.ceil(300 / Math.max(chars, 1)));
  const loop = Array.from({ length: repeat }, () => data.messages).flat();
  const seconds = Math.max(18, Math.round((chars * repeat * 9 + 600) / PIXELS_PER_SECOND[data.speed]));

  const close = () => {
    setClosedNow(true);
    try {
      window.localStorage.setItem(dismissedKey, data.id);
    } catch {
      /* ignore */
    }
  };

  const linkClass = "font-semibold underline underline-offset-2";

  return (
    <div ref={ref} role="region" aria-label="Announcements" className={`relative z-[60] ${TONE[data.style]}`}>
      <div className={`${styles.strip} py-2 text-[0.8125rem] font-medium ${data.dismissible ? "pr-10" : ""}`}>
        <div className={styles.track} style={{ "--dur": `${seconds}s` } as React.CSSProperties}>
          {[false, true].map((copy) => (
            <ul key={String(copy)} className={styles.list} aria-hidden={copy || undefined}>
              {loop.map((m, i) => (
                <li key={`${i}-${m.text}`} className={styles.item}>
                  <span>{m.text}</span>
                  {m.url &&
                    (m.url.startsWith("/") ? (
                      <Link href={m.url} tabIndex={copy ? -1 : undefined} className={linkClass}>
                        {m.label || "Learn more"}
                      </Link>
                    ) : (
                      <a
                        href={m.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={copy ? -1 : undefined}
                        className={linkClass}
                      >
                        {m.label || "Learn more"}
                      </a>
                    ))}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      {data.dismissible && (
        <button
          type="button"
          onClick={close}
          aria-label="Close announcement"
          className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-inherit hover:bg-white/15"
        >
          <X aria-hidden className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
