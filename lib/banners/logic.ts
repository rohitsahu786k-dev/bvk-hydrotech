import type { BannerDevice, ControlVisibility, HomeBanner } from "./types";

/** Pure helpers for the carousel, kept out of the component so they can be tested. */

/** Inside its schedule window (either end optional)? */
export function isLive(banner: Pick<HomeBanner, "startAt" | "endAt">, now: number): boolean {
  const start = banner.startAt ? Date.parse(banner.startAt) : NaN;
  const end = banner.endAt ? Date.parse(banner.endAt) : NaN;
  if (Number.isFinite(start) && now < start) return false;
  if (Number.isFinite(end) && now > end) return false;
  return true;
}

export function liveBanners(banners: HomeBanner[], now: number): HomeBanner[] {
  return banners.filter((b) => isLive(b, now));
}

export function forDevice(banners: HomeBanner[], device: BannerDevice): HomeBanner[] {
  return banners.filter((b) => b.devices.includes(device));
}

/**
 * The index after moving one step. With looping it wraps; without, it stops at
 * the first and last banner.
 */
export function stepIndex(index: number, count: number, direction: 1 | -1, loop: boolean): number {
  if (count <= 1) return 0;
  const next = index + direction;
  if (loop) return (next + count) % count;
  return Math.min(count - 1, Math.max(0, next));
}

export function canStep(index: number, count: number, direction: 1 | -1, loop: boolean): boolean {
  if (count <= 1) return false;
  return loop || (direction === 1 ? index < count - 1 : index > 0);
}

/** Tailwind display classes for a control that is shown on some screen sizes only. */
export function visibilityClass(visibility: ControlVisibility, display: "flex" | "block" = "flex"): string {
  if (visibility === "none") return "hidden";
  if (visibility === "both") return display;
  return visibility === "desktop" ? `hidden md:${display}` : `${display} md:hidden`;
}

/** A swipe counts when it is mostly horizontal and long enough; returns the direction to move. */
export function swipeDirection(dx: number, dy: number, threshold = 50): 1 | -1 | 0 {
  if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.2) return 0;
  return dx < 0 ? 1 : -1;
}

/** Which slides should have their picture in the page: the shown one, its neighbours, and any seen. */
export function withNeighbours(loaded: number[], index: number, count: number): number[] {
  const wanted = [index, (index + 1) % count, (index - 1 + count) % count];
  const merged = new Set([...loaded, ...wanted]);
  return merged.size === loaded.length ? loaded : [...merged];
}
