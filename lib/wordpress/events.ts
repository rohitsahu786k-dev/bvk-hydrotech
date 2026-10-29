import { rewriteMedia } from "@/lib/media";
import { DEFAULT_SETTINGS, normalizeEventsData } from "@/lib/events/normalize";
import type { EventItem, EventsData } from "@/lib/events/types";
import { wordpressOrigin } from "@/lib/site";
import { readJson } from "./encoding";

/**
 * Fairs & Events, authored under Fairs & Events in WordPress (BVK Events
 * plugin). One request carries the page settings, the categories and every
 * published event; the list page and each event page read the same cached copy.
 */
const ENDPOINT = process.env.WORDPRESS_EVENTS_URL || `${wordpressOrigin()}/wp-json/bvk/v1/events`;

const EMPTY: EventsData = {
  ok: true,
  today: new Date().toISOString().slice(0, 10),
  settings: DEFAULT_SETTINGS,
  categories: [],
  events: [],
};

export async function getEventsData(): Promise<EventsData> {
  try {
    const response = await fetch(ENDPOINT, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60, tags: ["wp-events", "wp-all"] },
    });

    // The endpoint does not exist until the BVK Events plugin is active. That
    // is "no events yet", not an outage.
    if (response.status === 404) return { ...EMPTY, today: new Date().toISOString().slice(0, 10) };
    if (!response.ok) throw new Error(`Events request failed: ${response.status}`);

    return normalizeEventsData(rewriteMedia(await readJson(response)));
  } catch (error) {
    console.error("getEventsData failed:", error);
    return { ...EMPTY, ok: false, today: new Date().toISOString().slice(0, 10) };
  }
}

export async function getEvent(slug: string): Promise<{ data: EventsData; event: EventItem | null }> {
  const data = await getEventsData();
  return { data, event: data.events.find((e) => e.slug === slug) ?? null };
}

/**
 * During a deploy a WordPress outage degrades to an empty page like the rest of
 * the site. At run time it throws instead, so Next keeps serving the last good
 * copy of the page rather than replacing it with an empty one.
 */
export function assertEventsAvailable(data: EventsData): void {
  if (!data.ok && process.env.NEXT_PHASE !== "phase-production-build") {
    throw new Error("Events are temporarily unavailable.");
  }
}
