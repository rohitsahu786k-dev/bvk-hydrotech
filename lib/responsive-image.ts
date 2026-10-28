/**
 * Helpers for art-directed <picture> elements that go through Next's image
 * optimiser. next/image resizes but cannot swap a different crop per screen,
 * and the event banners carry a separate mobile picture, so the <source>
 * elements point at /_next/image directly. Widths must be ones configured in
 * next.config.mjs (deviceSizes / imageSizes).
 *
 * SVG and GIF are served as they are; the optimiser does not process them.
 */

export const RASTER = /\.(?:jpe?g|png|webp|avif)(?:\?.*)?$/i;

export const CARD_WIDTHS = [384, 640, 828, 1080];
export const BANNER_DESKTOP_WIDTHS = [1080, 1200, 1920, 2048];
export const BANNER_MOBILE_WIDTHS = [640, 750, 828, 1080];

export function optimisedUrl(src: string, width: number, quality = 75): string {
  return RASTER.test(src) ? `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}` : src;
}

export function srcSetFor(src: string, widths: number[], quality = 75): string | undefined {
  return RASTER.test(src)
    ? widths.map((w) => `${optimisedUrl(src, w, quality)} ${w}w`).join(", ")
    : undefined;
}
