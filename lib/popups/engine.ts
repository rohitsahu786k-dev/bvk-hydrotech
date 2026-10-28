import type { EligibilityContext, Popup, PopupDevice, PopupHistory } from "./types";

/**
 * The decision logic for popups, kept free of the DOM and of React so it can be
 * tested on its own. Everything takes its inputs as arguments, including the
 * clock.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

/** Pages that never get a popup unless a popup names them explicitly. */
export const QUIET_PATHS = ["/thank-you"];

/** Mirrors the Tailwind breakpoints used across the site (md = 768, lg = 1024). */
export function deviceFor(width: number): PopupDevice {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

/** "/blog/" and "/blog" are the same page. The root stays "/". */
export function cleanPath(path: string): string {
  const withoutQuery = path.replace(/[?#].*$/, "");
  const trimmed = withoutQuery.length > 1 ? withoutQuery.replace(/\/+$/, "") : withoutQuery;
  return (trimmed || "/").toLowerCase();
}

/**
 * Matches a site path against an editor-written pattern.
 *   "/contact"      exactly that page
 *   "/blog/*"       the blog index and everything under it
 *   "/solutions*"   anything starting with /solutions
 */
export function pathMatches(pattern: string, path: string): boolean {
  const p = cleanPath(pattern);
  const target = cleanPath(path);
  if (!p.includes("*")) return p === target;

  // "/x/*" also covers "/x" itself.
  if (p.endsWith("/*") && target === p.slice(0, -2)) return true;

  const escaped = p.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(`^${escaped}$`).test(target);
}

export function targetsPath(popup: Popup, path: string): boolean {
  const { scope, includePaths, excludePaths } = popup.rules;
  if (excludePaths.some((pattern) => pathMatches(pattern, path))) return false;

  if (scope === "selected") return includePaths.some((pattern) => pathMatches(pattern, path));

  // Whole-site popups stay off the quiet pages, unless one is named outright.
  const quiet = QUIET_PATHS.some((p) => pathMatches(p, path));
  return !quiet || includePaths.some((pattern) => pathMatches(pattern, path));
}

/** Every line is "name" (present) or "name=value"; any one match is enough. */
export function queryMatches(requirements: string[], search: string): boolean {
  if (requirements.length === 0) return true;
  const params = new URLSearchParams(search);
  return requirements.some((line) => {
    const eq = line.indexOf("=");
    if (eq === -1) return params.has(line.trim());
    const name = line.slice(0, eq).trim();
    const value = line.slice(eq + 1).trim();
    return params.getAll(name).includes(value);
  });
}

export function withinSchedule(startAt: string | null, endAt: string | null, now: number): boolean {
  const start = startAt ? Date.parse(startAt) : NaN;
  const end = endAt ? Date.parse(endAt) : NaN;
  if (Number.isFinite(start) && now < start) return false;
  if (Number.isFinite(end) && now > end) return false;
  return true;
}

export function visitorMatches(visitor: Popup["rules"]["visitor"], returning: boolean): boolean {
  if (visitor === "all") return true;
  return visitor === "returning" ? returning : !returning;
}

/**
 * Has this visitor seen it too often, or acted on it already?
 * `shownThisSession` is whether it already opened during the current visit.
 */
export function frequencyAllows(
  popup: Popup,
  history: PopupHistory | undefined,
  shownThisSession: boolean,
  now: number,
): boolean {
  const f = popup.frequency;

  if (f.suppressAfterClick && history?.clicked) {
    if (f.suppressDays === 0) return false;
    if (now - history.clicked < f.suppressDays * DAY_MS) return false;
  }

  switch (f.mode) {
    case "always":
      return true;
    case "session":
      return !shownThisSession;
    case "days":
      return !history?.last || now - history.last >= f.days * DAY_MS;
    case "max":
      return (history?.count ?? 0) < f.max;
    case "once":
      return !history?.count;
  }
}

/**
 * The static rules: device, page, campaign, schedule, visitor type. These do
 * not change while a page is open, so they are checked once when triggers are
 * armed. Frequency is checked separately, at the moment a trigger fires.
 */
export function isEligible(popup: Popup, ctx: EligibilityContext): boolean {
  const { rules } = popup;
  return (
    rules.devices.includes(deviceFor(ctx.width)) &&
    targetsPath(popup, ctx.path) &&
    queryMatches(rules.requireQuery, ctx.search) &&
    withinSchedule(rules.startAt, rules.endAt, ctx.now) &&
    visitorMatches(rules.visitor, ctx.returning)
  );
}

/** Does anything start this popup without the visitor asking for it? */
export function hasAutoTrigger(popup: Popup): boolean {
  const t = popup.triggers;
  return (
    t.pageLoad.enabled ||
    t.scroll.enabled ||
    t.scrollElement.enabled ||
    t.inactivity.enabled ||
    t.exitIntent.enabled ||
    t.pageViews.enabled
  );
}

export function historyKey(popup: Pick<Popup, "id" | "resetVersion">): string {
  return `${popup.id}:${popup.resetVersion}`;
}

/** Normalises an editor-supplied link so internal addresses use client-side routing. */
export function toInternalPath(url: string, hosts: string[]): string | null {
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  try {
    const parsed = new URL(url);
    if (hosts.includes(parsed.host.toLowerCase())) return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    /* not an absolute URL */
  }
  return null;
}
