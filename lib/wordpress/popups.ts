import { rewriteMedia } from "@/lib/media";
import { normalizePopups } from "@/lib/popups/normalize";
import type { Popup } from "@/lib/popups/types";
import { wordpressOrigin } from "@/lib/site";
import { readJson } from "./encoding";

/**
 * Popups authored under Popups in WordPress (BVK Popups plugin).
 *
 * A failure here must never take a page down: the site simply renders without
 * popups until the next successful refresh.
 */
const ENDPOINT = process.env.WORDPRESS_POPUPS_URL || `${wordpressOrigin()}/wp-json/bvk/v1/popups`;

export async function getPopups(): Promise<Popup[]> {
  try {
    const response = await fetch(ENDPOINT, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60, tags: ["wp-popups", "wp-all"] },
    });
    if (!response.ok) return [];

    const data = await readJson(response);
    return normalizePopups(rewriteMedia(data));
  } catch (error) {
    console.error("getPopups failed:", error);
    return [];
  }
}
