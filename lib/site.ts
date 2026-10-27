/** The one public contact address, used everywhere on the site. */
export const SITE_EMAIL = "info@bvkhydrotech.com";

/**
 * The WordPress backend origin. Only the origin is used: the login lives at
 * /manage-wp, but uploads, REST and GraphQL are always served from the root, so
 * a path pasted into the env var (for example the login URL) is dropped.
 */
export function wordpressOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://admin.bvkhydrotech.com";
  try {
    return new URL(raw).origin;
  } catch {
    return "https://admin.bvkhydrotech.com";
  }
}
