"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  frequencyAllows,
  hasAutoTrigger,
  historyKey,
  isEligible,
} from "@/lib/popups/engine";
import {
  countPageView,
  getHistory,
  isReturningVisitor,
  markShownThisSession,
  recordClick,
  recordShown,
  shownThisSession,
} from "@/lib/popups/storage";
import { armTriggers } from "@/lib/popups/triggers";
import type { Popup } from "@/lib/popups/types";
import PopupView from "./PopupView";

/**
 * Decides which popup opens, and when.
 *
 * How a popup can open:
 *   auto      one of its triggers fired (load, scroll, idle, exit intent, ...).
 *             Checked against frequency, and only one popup opens by itself.
 *   explicit  the visitor asked for it: a #popup-key link, a data-bvk-popup
 *             element, a CSS-selector click trigger, or window.bvkPopup.open().
 *             Frequency is bypassed; the visitor chose this.
 *   preview   ?bvk_popup_preview=key. Ignores every rule and records nothing.
 *
 * Page, device, schedule and campaign rules are evaluated again on every route
 * change, because the layout (and this component) stays mounted between pages.
 */

type OpenMode = "auto" | "explicit" | "preview";

interface Active {
  popup: Popup;
  mode: OpenMode;
  nonce: number;
  /** The page it opened on; it closes when the visitor moves to another page. */
  path: string;
}

declare global {
  interface Window {
    bvkPopup?: {
      open: (key: string) => boolean;
      close: () => void;
      list: () => { key: string; title: string }[];
    };
  }
}

const OPEN_LINK = '[data-bvk-popup], a[href^="#popup-"]';

export default function PopupManager({ popups }: { popups: Popup[] }) {
  const pathname = usePathname();
  const [active, setActive] = useState<Active | null>(null);

  const activeRef = useRef<Active | null>(null);
  const popupsRef = useRef<Popup[]>(popups);
  const eligibleRef = useRef<Popup[]>([]);
  const firedRef = useRef<Set<number>>(new Set());
  const nonceRef = useRef(0);
  const viewsRef = useRef<{ path: string | null; count: number }>({ path: null, count: 0 });

  // The server hands a fresh array on every refresh even when nothing changed,
  // and re-arming would restart delays. Compare by content instead.
  const signature = JSON.stringify(popups);
  useEffect(() => {
    popupsRef.current = popups;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `signature` stands in for `popups`
  }, [signature]);

  const show = useCallback((next: Active | null) => {
    activeRef.current = next;
    setActive(next);
  }, []);

  const open = useCallback(
    (popup: Popup, mode: OpenMode) => {
      if (mode === "auto") {
        // One popup at a time, and each at most once per page view.
        if (activeRef.current || firedRef.current.has(popup.id)) return;
        const allowed = frequencyAllows(
          popup,
          getHistory(historyKey(popup)),
          shownThisSession(String(popup.id)),
          Date.now(),
        );
        if (!allowed) return;
        firedRef.current.add(popup.id);
      }
      nonceRef.current += 1;
      show({ popup, mode, nonce: nonceRef.current, path: window.location.pathname });
    },
    [show],
  );

  const openByKey = useCallback(
    (key: string, mode: OpenMode): boolean => {
      const wanted = key.trim().toLowerCase();
      const popup = popupsRef.current.find((p) => p.key === wanted);
      if (!popup) return false;
      open(popup, mode);
      return true;
    },
    [open],
  );

  // ---- Page-level: re-evaluate rules and arm triggers on every route ------
  useEffect(() => {
    firedRef.current = new Set();
    // Moving to another page ends the popup. Comparing paths (rather than
    // closing on every run) keeps a popup opened from the URL alive when
    // development Strict Mode runs this effect a second time.
    if (activeRef.current && activeRef.current.path !== window.location.pathname) show(null);

    // Strict Mode runs effects twice in development; count each path once.
    if (viewsRef.current.path !== pathname) {
      viewsRef.current = { path: pathname, count: countPageView() };
    }
    const views = viewsRef.current.count;

    const now = Date.now();
    const ctx = {
      path: pathname,
      search: window.location.search,
      width: window.innerWidth,
      now,
      returning: isReturningVisitor(now),
    };

    const eligible = popupsRef.current.filter((popup) => isEligible(popup, ctx));
    eligibleRef.current = eligible;

    const disarm = eligible
      .filter(hasAutoTrigger)
      .map((popup) => armTriggers(popup, () => open(popup, "auto"), views));

    return () => {
      disarm.forEach((fn) => fn());
      eligibleRef.current = [];
    };
    // `signature` re-arms only when the popups really change.
  }, [pathname, signature, open, show]);

  // ---- Page-independent: links, preview, hash, public API -----------------
  useEffect(() => {
    // Capture phase, so a #popup- link in a menu is handled before the router
    // can treat it as an in-page anchor.
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;

      const opener = target.closest(OPEN_LINK);
      if (opener) {
        const href = opener.getAttribute("href");
        const key = opener.getAttribute("data-bvk-popup") ?? (href ? href.slice("#popup-".length) : "");
        if (openByKey(decodeURIComponent(key), "explicit")) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
      }

      // Selector click triggers. Clicks inside an open popup never retrigger.
      if (target.closest("[data-bvk-popup-root]")) return;
      for (const popup of eligibleRef.current) {
        const trigger = popup.triggers.click;
        if (!trigger.enabled) continue;
        let hit: Element | null = null;
        try {
          hit = target.closest(trigger.selector);
        } catch {
          continue; // an invalid selector matches nothing
        }
        if (!hit) continue;
        if (hit.getAttribute("href") === "#") event.preventDefault();
        open(popup, "explicit");
        return;
      }
    };
    document.addEventListener("click", onClick, true);

    const fromLocation = () => {
      const hash = /^#popup-(.+)$/i.exec(window.location.hash);
      if (hash && openByKey(decodeURIComponent(hash[1]), "explicit")) {
        // Drop the hash so a reload does not open it again.
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };
    fromLocation();
    window.addEventListener("hashchange", fromLocation);

    const preview = new URLSearchParams(window.location.search).get("bvk_popup_preview");
    if (preview) openByKey(preview, "preview");

    window.bvkPopup = {
      open: (key) => openByKey(key, "explicit"),
      close: () => show(null),
      list: () => popupsRef.current.map(({ key, title }) => ({ key, title })),
    };

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", fromLocation);
      delete window.bvkPopup;
    };
  }, [openByKey, open, show]);

  const onShown = useCallback((popup: Popup) => {
    if (activeRef.current?.mode === "preview") return;
    recordShown(historyKey(popup), Date.now());
    markShownThisSession(String(popup.id));
  }, []);

  const onCta = useCallback((popup: Popup) => {
    if (activeRef.current?.mode === "preview") return;
    recordClick(historyKey(popup), Date.now());
  }, []);

  // A popup that was replaced must not clear its replacement.
  const onClosed = useCallback(
    (popup: Popup) => {
      if (activeRef.current?.popup.id === popup.id) show(null);
    },
    [show],
  );

  if (!active) return null;
  return (
    <PopupView
      key={active.nonce}
      popup={active.popup}
      onShown={onShown}
      onCta={onCta}
      onClosed={onClosed}
    />
  );
}
