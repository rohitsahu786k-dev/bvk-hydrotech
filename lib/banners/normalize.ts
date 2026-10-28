import type {
  BannerDevice,
  BannerImage,
  ControlVisibility,
  HomeBanner,
  HomeBannerSettings,
  HomeBannersData,
} from "./types";

/**
 * Defensive reader for the banner payload. WordPress already sanitises it; this
 * re-checks each value against the same allow-lists and limits, falls back to a
 * safe default for anything unusable, and drops a banner that has no picture.
 */

type Rec = Record<string, unknown>;

const rec = (value: unknown): Rec =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as Rec) : {};
const str = (value: unknown, max = 2000): string => (typeof value === "string" ? value.slice(0, max) : "");
/** A real record id: a whole number above zero (a clamp would turn 0 into 1). */
const posInt = (value: unknown): number =>
  typeof value === "number" && Number.isSafeInteger(value) && value > 0 ? value : 0;
const bool = (value: unknown, fallback: boolean): boolean => (typeof value === "boolean" ? value : fallback);
const oneOf = <T extends string>(value: unknown, allowed: readonly T[], fallback: T): T =>
  allowed.includes(value as T) ? (value as T) : fallback;

function num(value: unknown, min: number, max: number, fallback: number): number {
  const n = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
}

/** Only http(s), site-relative and in-page addresses may be followed. */
export function safeUrl(value: unknown): string {
  const url = str(value).trim();
  if (!url) return "";
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  if (url.startsWith("#")) return url;
  return /^https?:\/\//i.test(url) ? url : "";
}

function image(value: unknown): BannerImage | null {
  const r = rec(value);
  const url = str(r.url);
  if (!url || url.startsWith("//") || !(url.startsWith("/") || /^https?:\/\//i.test(url))) return null;
  return { url, width: num(r.width, 0, 20000, 0), height: num(r.height, 0, 20000, 0), alt: str(r.alt, 200) };
}

export const DEFAULT_BANNER_SETTINGS: HomeBannerSettings = {
  enabled: true,
  autoplay: true,
  delay: 6,
  pauseOnHover: true,
  transition: "fade",
  speed: 700,
  loop: true,
  arrows: "both",
  arrowShape: "circle",
  arrowTheme: "dark",
  dots: "both",
  dotsPosition: "inside",
  ratioDesktop: "1916/821",
  ratioMobile: "1/1",
  maxHeight: 92,
};

const VISIBILITY: readonly ControlVisibility[] = ["both", "desktop", "mobile", "none"];

export function normalizeBannerSettings(input: unknown): HomeBannerSettings {
  const r = rec(input);
  const d = DEFAULT_BANNER_SETTINGS;
  return {
    enabled: bool(r.enabled, d.enabled),
    autoplay: bool(r.autoplay, d.autoplay),
    delay: num(r.delay, 2, 30, d.delay),
    pauseOnHover: bool(r.pauseOnHover, d.pauseOnHover),
    transition: oneOf(r.transition, ["fade", "slide"] as const, d.transition),
    speed: num(r.speed, 200, 2000, d.speed),
    loop: bool(r.loop, d.loop),
    arrows: oneOf(r.arrows, VISIBILITY, d.arrows),
    arrowShape: oneOf(r.arrowShape, ["circle", "square"] as const, d.arrowShape),
    arrowTheme: oneOf(r.arrowTheme, ["dark", "light", "green"] as const, d.arrowTheme),
    dots: oneOf(r.dots, VISIBILITY, d.dots),
    dotsPosition: oneOf(r.dotsPosition, ["inside", "below"] as const, d.dotsPosition),
    ratioDesktop: oneOf(r.ratioDesktop, ["1916/821", "16/9", "3/1", "2/1"] as const, d.ratioDesktop),
    ratioMobile: oneOf(r.ratioMobile, ["1/1", "4/5", "3/4", "16/9"] as const, d.ratioMobile),
    maxHeight: num(r.maxHeight, 40, 100, d.maxHeight),
  };
}

export function normalizeBanner(input: unknown): HomeBanner | null {
  const r = rec(input);
  const id = posInt(r.id);
  const desktop = image(r.desktop);
  const mobile = image(r.mobile);
  if (!id || (!desktop && !mobile)) return null;

  const link = rec(r.link);
  const button = rec(r.button);
  const url = safeUrl(link.url);
  const devices = (Array.isArray(r.devices) ? r.devices : ["desktop", "mobile"]).filter(
    (d): d is BannerDevice => d === "desktop" || d === "mobile",
  );

  return {
    id,
    title: str(r.title, 200),
    alt: str(r.alt, 200) || str(r.title, 200),
    desktop: (desktop ?? mobile) as BannerImage,
    mobile: (mobile ?? desktop) as BannerImage,
    link: { url, newTab: Boolean(url) && bool(link.newTab, false), label: str(link.label, 160) },
    button: {
      // A button with no link to follow would be a dead control.
      text: url ? str(button.text, 40).trim() : "",
      position: oneOf(button.position, ["bottom-left", "bottom-center", "bottom-right"] as const, "bottom-left"),
      style: oneOf(button.style, ["green", "white", "outline"] as const, "green"),
    },
    devices: devices.length > 0 ? devices : ["desktop", "mobile"],
    startAt: str(r.startAt, 40) || null,
    endAt: str(r.endAt, 40) || null,
    sort: num(r.sort, 0, 1000, 10),
  };
}

export function normalizeBanners(input: unknown, ok = true): HomeBannersData {
  const r = rec(input);
  const seen = new Set<number>();
  const banners: HomeBanner[] = [];
  for (const raw of Array.isArray(r.banners) ? r.banners : []) {
    const banner = normalizeBanner(raw);
    if (!banner || seen.has(banner.id)) continue;
    seen.add(banner.id);
    banners.push(banner);
  }
  banners.sort((a, b) => a.sort - b.sort || a.id - b.id);
  return { ok, settings: normalizeBannerSettings(r.settings), banners };
}
