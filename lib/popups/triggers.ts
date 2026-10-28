import type { Popup } from "./types";

/**
 * Arms the automatic triggers of one popup and returns a function that undoes
 * all of them. Click triggers are not here: one delegated listener in the
 * manager handles those for every popup at once.
 *
 * `fire` may be called more than once; the manager decides whether it counts.
 */
export function armTriggers(popup: Popup, fire: () => void, pageViews: number): () => void {
  const t = popup.triggers;
  const undo: Array<() => void> = [];

  // On page load, after a delay.
  if (t.pageLoad.enabled) {
    const id = window.setTimeout(fire, t.pageLoad.delay * 1000);
    undo.push(() => window.clearTimeout(id));
  }

  // After N page views in this visit. Fires at once if the visitor is already
  // past N; the short wait lets the page settle first.
  if (t.pageViews.enabled && pageViews >= t.pageViews.count) {
    const id = window.setTimeout(fire, 800);
    undo.push(() => window.clearTimeout(id));
  }

  // On scroll: down past N% of the page, or back up by N% from the lowest point.
  if (t.scroll.enabled) {
    const { direction, percent } = t.scroll;
    let lowest = window.scrollY;
    let frame = 0;

    const check = () => {
      frame = 0;
      const doc = document.documentElement;
      const y = window.scrollY;
      if (direction === "down") {
        const scrollable = doc.scrollHeight - window.innerHeight;
        if (scrollable > 0 && (y / scrollable) * 100 >= percent) fire();
        return;
      }
      lowest = Math.max(lowest, y);
      if (lowest > 0 && lowest - y >= (percent / 100) * doc.scrollHeight) fire();
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(check);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    check();
    undo.push(() => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    });
  }

  // When a section scrolls into view. The element may not exist yet if the
  // page is still rendering, so look for it for a few seconds.
  if (t.scrollElement.enabled) {
    let observer: IntersectionObserver | null = null;
    let poll = 0;
    let tries = 0;

    const attach = (): boolean => {
      let el: Element | null = null;
      try {
        el = document.querySelector(t.scrollElement.selector);
      } catch {
        return true; // invalid selector: nothing will ever match, stop looking
      }
      if (!el) return false;
      observer = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) fire();
      });
      observer.observe(el);
      return true;
    };

    if (!attach()) {
      poll = window.setInterval(() => {
        tries += 1;
        if (attach() || tries >= 20) window.clearInterval(poll);
      }, 500);
    }
    undo.push(() => {
      window.clearInterval(poll);
      observer?.disconnect();
    });
  }

  // After a stretch with no activity.
  if (t.inactivity.enabled) {
    let timer = 0;
    const reset = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(fire, t.inactivity.seconds * 1000);
    };
    const events = ["mousemove", "keydown", "scroll", "touchstart", "click", "wheel"] as const;
    events.forEach((name) => window.addEventListener(name, reset, { passive: true }));
    reset();
    undo.push(() => {
      window.clearTimeout(timer);
      events.forEach((name) => window.removeEventListener(name, reset));
    });
  }

  // Exit intent: the pointer leaves through the top edge of the window.
  // Meaningless on touch screens, so it is skipped there.
  if (t.exitIntent.enabled && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const onLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) fire();
    };
    document.documentElement.addEventListener("mouseleave", onLeave);
    undo.push(() => document.documentElement.removeEventListener("mouseleave", onLeave));
  }

  return () => undo.forEach((fn) => fn());
}
