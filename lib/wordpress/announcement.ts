import { wordpressOrigin } from "@/lib/site";
import { readJson } from "./encoding";

/**
 * The site-wide announcement strip, authored under Announcement Bar in
 * WordPress (BVK Announcement Bar plugin). A failure never breaks a page: the
 * strip is simply not shown.
 */
export interface AnnouncementMessage {
  text: string;
  url: string;
  label: string;
}

export interface Announcement {
  enabled: boolean;
  messages: AnnouncementMessage[];
  style: "green" | "dark" | "light";
  speed: "slow" | "normal" | "fast";
  dismissible: boolean;
  id: string;
}

const ENDPOINT = process.env.WORDPRESS_ANNOUNCEMENT_URL || `${wordpressOrigin()}/wp-json/bvk/v1/announcement`;

const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export async function getAnnouncement(): Promise<Announcement | null> {
  try {
    const response = await fetch(ENDPOINT, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60, tags: ["wp-announcement", "wp-all"] },
    });
    if (!response.ok) return null;
    const raw = (await readJson(response)) as Partial<Announcement> | null;
    if (!raw || raw.enabled !== true || !Array.isArray(raw.messages)) return null;

    const messages = raw.messages
      .map((m) => ({
        text: text(m?.text, 240),
        url: /^(\/(?!\/)|https?:\/\/)/i.test(text(m?.url, 500)) ? text(m?.url, 500) : "",
        label: text(m?.label, 40),
      }))
      .filter((m) => m.text);
    if (messages.length === 0) return null;

    return {
      enabled: true,
      messages,
      style: raw.style === "dark" || raw.style === "light" ? raw.style : "green",
      speed: raw.speed === "slow" || raw.speed === "fast" ? raw.speed : "normal",
      dismissible: raw.dismissible !== false,
      id: text(raw.id, 20) || "bar",
    };
  } catch (error) {
    console.error("getAnnouncement failed:", error);
    return null;
  }
}
