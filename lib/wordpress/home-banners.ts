import { rewriteMedia } from "@/lib/media";
import { liveBanners } from "@/lib/banners/logic";
import { DEFAULT_BANNER_SETTINGS, normalizeBanners } from "@/lib/banners/normalize";
import type { HomeBannersData } from "@/lib/banners/types";
import { wordpressOrigin } from "@/lib/site";
import { readJson } from "./encoding";

/**
 * The homepage banner carousel, authored under Home Banners in WordPress (BVK
 * Home Banners plugin).
 *
 * The homepage must never depend on it: when the endpoint is missing (plugin
 * not active), unreachable, or has no published banners, the caller falls back
 * to the previous hero.
 */
const ENDPOINT = process.env.WORDPRESS_HOME_BANNERS_URL || `${wordpressOrigin()}/wp-json/bvk/v1/home-banners`;

const EMPTY: HomeBannersData = { ok: true, settings: DEFAULT_BANNER_SETTINGS, banners: [] };

export async function getHomeBanners(): Promise<HomeBannersData> {
  try {
    const response = await fetch(ENDPOINT, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60, tags: ["wp-home-banners", "wp-home", "wp-all"] },
    });
    if (response.status === 404) return EMPTY;
    if (!response.ok) throw new Error(`Home banners request failed: ${response.status}`);
    const data = normalizeBanners(rewriteMedia(await readJson(response)));
    // Campaign banners outside their dates are left out. The page itself is
    // refreshed at least every five minutes, so a start or end date is honoured
    // to within that.
    return { ...data, banners: liveBanners(data.banners, Date.now()) };
  } catch (error) {
    console.error("getHomeBanners failed:", error);
    return { ...EMPTY, ok: false };
  }
}
