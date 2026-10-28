import type {
  Popup,
  PopupAnimation,
  PopupButton,
  PopupDevice,
  PopupImage,
  PopupLayout,
  PopupPosition,
} from "./types";

/**
 * Defensive reader for the popup payload.
 *
 * The WordPress plugin already sanitises everything, but this runs in front of
 * code that touches the DOM, so each value is re-checked against the same
 * allow-lists and clamps. Anything unusable falls back to a safe default; a
 * record that cannot be a popup at all returns null and is dropped.
 */

const LAYOUTS: PopupLayout[] = ["image_only", "image_top", "image_left", "image_right", "text_only"];
const POSITIONS: PopupPosition[] = [
  "top-left", "top-center", "top-right",
  "center-left", "center", "center-right",
  "bottom-left", "bottom-center", "bottom-right",
];
const ANIMATIONS: PopupAnimation[] = ["none", "fade", "zoom", "slide-up", "slide-down", "slide-left", "slide-right"];
const DEVICES: PopupDevice[] = ["desktop", "tablet", "mobile"];
const FREQUENCIES = ["always", "session", "days", "max", "once"] as const;

type Rec = Record<string, unknown>;

const rec = (value: unknown): Rec => (value && typeof value === "object" && !Array.isArray(value) ? (value as Rec) : {});
const str = (value: unknown, fallback = ""): string => (typeof value === "string" ? value : fallback);
/** A real record id: a whole number above zero (a clamp would turn 0 into 1). */
const posInt = (value: unknown): number =>
  typeof value === "number" && Number.isSafeInteger(value) && value > 0 ? value : 0;
const bool = (value: unknown, fallback: boolean): boolean => (typeof value === "boolean" ? value : fallback);
const oneOf = <T extends string>(value: unknown, allowed: readonly T[], fallback: T): T =>
  allowed.includes(value as T) ? (value as T) : fallback;

function num(value: unknown, min: number, max: number, fallback: number): number {
  const n = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

const hex = (value: unknown, fallback: string): string =>
  typeof value === "string" && /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(value) ? value : fallback;

const strings = (value: unknown, limit = 50): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === "string" && v.length > 0).slice(0, limit) : [];

/** Only http(s), site-relative and in-page links may be followed. */
export function safeUrl(value: unknown): string {
  const url = str(value).trim();
  if (!url) return "";
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  if (url.startsWith("#")) return url;
  return /^https?:\/\//i.test(url) ? url : "";
}

function image(value: unknown): PopupImage | null {
  const r = rec(value);
  const url = str(r.url);
  if (!url || !(url.startsWith("/") || /^https?:\/\//i.test(url))) return null;
  return {
    url,
    width: num(r.width, 0, 10000, 0),
    height: num(r.height, 0, 10000, 0),
    alt: str(r.alt),
  };
}

function buttons(value: unknown): PopupButton[] {
  if (!Array.isArray(value)) return [];
  const out: PopupButton[] = [];
  for (const item of value.slice(0, 2)) {
    const r = rec(item);
    const text = str(r.text).trim();
    const url = safeUrl(r.url);
    if (text && url) out.push({ text, url, newTab: bool(r.newTab, false) });
  }
  return out;
}

export function normalizePopup(input: unknown): Popup | null {
  const raw = rec(input);
  const id = posInt(raw.id);
  const key = str(raw.key).toLowerCase().replace(/[^a-z0-9_-]/g, "");
  if (!id || !key) return null;

  const content = rec(raw.content);
  const look = rec(raw.appearance);
  const trig = rec(raw.triggers);
  const rules = rec(raw.rules);
  const freq = rec(raw.frequency);

  const layout = oneOf(content.layout, LAYOUTS, "image_only");
  const imageDesktop = layout === "text_only" ? null : image(content.imageDesktop);
  const imageMobile = layout === "text_only" ? null : image(content.imageMobile);
  const bodyHtml = str(content.bodyHtml);
  const heading = str(content.heading);
  const parsedButtons = buttons(content.buttons);
  const showForm = bool(content.showForm, false);

  // A popup with nothing to show would open as an empty box.
  const hasImage = Boolean(imageDesktop ?? imageMobile);
  const hasText = Boolean(heading || bodyHtml || parsedButtons.length || showForm);
  if (layout === "image_only" ? !hasImage : layout === "text_only" ? !hasText : !hasImage && !hasText) return null;

  const closeButton = bool(look.closeButton, true);
  const overlay = bool(look.overlay, true);
  const closeOnOverlay = bool(look.closeOnOverlay, true);
  const closeOnEsc = bool(look.closeOnEsc, true);
  const autoClose = num(look.autoClose, 0, 600, 0);
  // Never render a popup the visitor has no way to dismiss.
  const dismissible = closeButton || (overlay && closeOnOverlay) || closeOnEsc || autoClose > 0;

  const scroll = rec(trig.scroll);
  const devices = (Array.isArray(rules.devices) ? rules.devices : DEVICES).filter((d): d is PopupDevice =>
    DEVICES.includes(d as PopupDevice),
  );

  return {
    id,
    key,
    title: str(raw.title, key),
    priority: num(raw.priority, 0, 1000, 10),
    resetVersion: num(raw.resetVersion, 1, 100000, 1),
    content: {
      layout,
      eyebrow: str(content.eyebrow),
      heading,
      bodyHtml,
      imageDesktop,
      imageMobile,
      imageAlt: str(content.imageAlt),
      linkUrl: safeUrl(content.linkUrl),
      linkNewTab: bool(content.linkNewTab, false),
      buttons: parsedButtons,
      showForm,
    },
    appearance: {
      position: oneOf(look.position, POSITIONS, "center"),
      size: oneOf(look.size, ["custom", "full_width", "fullscreen"] as const, "custom"),
      widthDesktop: num(look.widthDesktop, 200, 1600, 640),
      widthMobile: num(look.widthMobile, 40, 100, 92),
      overlay,
      overlayColor: hex(look.overlayColor, "#000000"),
      overlayOpacity: num(look.overlayOpacity, 0, 100, 60),
      preventScroll: bool(look.preventScroll, true),
      bgColor: hex(look.bgColor, "#ffffff"),
      textColor: hex(look.textColor, "#0b0d0c"),
      radius: num(look.radius, 0, 40, 8),
      padding: num(look.padding, 0, 80, 32),
      closeButton: dismissible ? closeButton : true,
      closePlacement: oneOf(look.closePlacement, ["inside", "outside"] as const, "inside"),
      closeDelay: num(look.closeDelay, 0, 60, 0),
      closeOnOverlay,
      closeOnEsc,
      autoClose,
      entrance: oneOf(look.entrance, ANIMATIONS, "fade"),
      exit: oneOf(look.exit, ANIMATIONS, "fade"),
      duration: num(look.duration, 0, 2000, 400),
      zIndex: num(look.zIndex, 60, 9999, 200),
    },
    triggers: {
      pageLoad: {
        enabled: bool(rec(trig.pageLoad).enabled, true),
        delay: num(rec(trig.pageLoad).delay, 0, 600, 3),
      },
      scroll: {
        enabled: bool(scroll.enabled, false),
        direction: oneOf(scroll.direction, ["down", "up"] as const, "down"),
        percent: num(scroll.percent, 1, 100, 50),
      },
      scrollElement: {
        enabled: bool(rec(trig.scrollElement).enabled, false) && Boolean(str(rec(trig.scrollElement).selector)),
        selector: str(rec(trig.scrollElement).selector),
      },
      click: {
        enabled: bool(rec(trig.click).enabled, false) && Boolean(str(rec(trig.click).selector)),
        selector: str(rec(trig.click).selector),
      },
      inactivity: {
        enabled: bool(rec(trig.inactivity).enabled, false),
        seconds: num(rec(trig.inactivity).seconds, 3, 1800, 30),
      },
      exitIntent: { enabled: bool(rec(trig.exitIntent).enabled, false) },
      pageViews: {
        enabled: bool(rec(trig.pageViews).enabled, false),
        count: num(rec(trig.pageViews).count, 1, 50, 3),
      },
    },
    rules: {
      scope: oneOf(rules.scope, ["entire_site", "selected"] as const, "entire_site"),
      includePaths: strings(rules.includePaths),
      excludePaths: strings(rules.excludePaths),
      devices: devices.length ? devices : [...DEVICES],
      visitor: oneOf(rules.visitor, ["all", "new", "returning"] as const, "all"),
      requireQuery: strings(rules.requireQuery),
      startAt: str(rules.startAt) || null,
      endAt: str(rules.endAt) || null,
    },
    frequency: {
      mode: oneOf(freq.mode, FREQUENCIES, "session"),
      days: num(freq.days, 1, 365, 7),
      max: num(freq.max, 1, 100, 3),
      suppressAfterClick: bool(freq.suppressAfterClick, true),
      suppressDays: num(freq.suppressDays, 0, 3650, 30),
    },
  };
}

export function normalizePopups(input: unknown): Popup[] {
  const list = Array.isArray(rec(input).popups) ? (rec(input).popups as unknown[]) : [];
  const seen = new Set<string>();
  const out: Popup[] = [];
  for (const item of list) {
    const popup = normalizePopup(item);
    if (!popup || seen.has(popup.key)) continue;
    seen.add(popup.key);
    out.push(popup);
  }
  // Highest priority first, so the first one to qualify is the one that opens.
  return out.sort((a, b) => b.priority - a.priority || b.id - a.id);
}
