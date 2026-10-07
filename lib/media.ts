/**
 * Media URLs are served from this site's own `/media/...` path.
 *
 * The files live on the media host, but visitors should only ever see this
 * site's address in image sources, download links and the address bar. A
 * rewrite in next.config.ts forwards `/media/*` to the media host.
 */

const UPLOADS = /^https?:\/\/[^/]+\/wp-content\/uploads\//i;

export function mediaUrl(url: string): string {
  return UPLOADS.test(url) ? url.replace(UPLOADS, "/media/") : url;
}

/** Rewrites every media URL found inside strings anywhere in a response. */
export function rewriteMedia<T>(value: T): T {
  if (typeof value === "string") {
    return value.replace(/https?:\/\/[^\s"'<>()]+?\/wp-content\/uploads\//gi, "/media/") as T;
  }
  if (Array.isArray(value)) return value.map(rewriteMedia) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, rewriteMedia(v)]),
    ) as T;
  }
  return value;
}
