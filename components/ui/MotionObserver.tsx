"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll-reveal for the whole site, applied from one place.
 *
 * Rather than wrapping every block in a component, this walks the rendered
 * page once, tags the top-level blocks of each section (and the cards inside
 * any grid) with `data-reveal`, and lets an IntersectionObserver flip them to
 * "in" as they scroll into view. Only data attributes are touched — never
 * class names — so React's own rendering is unaffected, and anything already
 * on screen at load is left alone so nothing flashes.
 *
 * The animation itself lives in globals.css. Reduced-motion users get no
 * tagging at all.
 */

const MAX_STAGGER = 5;
const REVEAL_MS = 750;
const STAGGER_MS = 90;

function addTargets(group: Element, out: Set<HTMLElement>) {
  const shells = group.querySelectorAll(":scope > .shell, :scope > div > .shell");
  const containers = shells.length > 0 ? Array.from(shells) : [group];

  for (const container of containers) {
    for (const kid of Array.from(container.children) as HTMLElement[]) {
      if (kid.tagName === "SCRIPT" || kid.tagName === "STYLE") continue;
      const style = getComputedStyle(kid);
      // Backgrounds and overlays are not content blocks.
      if (style.position === "absolute" || style.position === "fixed") continue;

      // A grid of cards animates card by card; anything else animates whole.
      if (style.display === "grid" && kid.children.length >= 3) {
        for (const card of Array.from(kid.children) as HTMLElement[]) out.add(card);
      } else {
        out.add(kid);
      }
    }
  }
}

export default function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const main = document.getElementById("main-content");
    if (!main) return;

    // Top-level sections only; the first is the hero, which has its own entrance.
    const sections = Array.from(main.querySelectorAll("section")).filter(
      (section) => !section.parentElement?.closest("section"),
    );
    const groups: Element[] = sections.slice(1);
    const footer = document.querySelector("footer");
    if (footer) groups.push(footer);

    const targets = new Set<HTMLElement>();
    for (const group of groups) addTargets(group, targets);

    const tagged: HTMLElement[] = [];
    const timers: ReturnType<typeof setTimeout>[] = [];
    const siblingCount = new Map<Element, number>();
    const viewport = window.innerHeight;

    const clear = (el: HTMLElement) => {
      el.removeAttribute("data-reveal");
      el.style.removeProperty("--reveal-i");
    };

    const reveal = (el: HTMLElement) => {
      if (el.dataset.reveal !== "pending") return;
      observer.unobserve(el);
      el.dataset.reveal = "in";
      // Once the animation has finished, hand the element back untouched so its
      // own hover transforms work.
      const index = Number(el.style.getPropertyValue("--reveal-i")) || 0;
      timers.push(setTimeout(() => clear(el), REVEAL_MS + index * STAGGER_MS + 150));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    // Blocks in the last few percent of the page can never reach the inset
    // observer area, so reveal everything once the reader reaches the bottom.
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        tagged.forEach(reveal);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    for (const el of targets) {
      const rect = el.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top < viewport * 0.92) continue; // already in view

      const parent = el.parentElement as Element;
      const index = Math.min(siblingCount.get(parent) ?? 0, MAX_STAGGER);
      siblingCount.set(parent, (siblingCount.get(parent) ?? 0) + 1);

      el.style.setProperty("--reveal-i", String(index));
      el.dataset.reveal = "pending";
      tagged.push(el);
      observer.observe(el);
    }

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      timers.forEach(clearTimeout);
      observer.disconnect();
      tagged.forEach(clear);
    };
  }, [pathname]);

  return null;
}
