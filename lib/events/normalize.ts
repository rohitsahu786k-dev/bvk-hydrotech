import type {
  EventAgendaItem,
  EventBanner,
  EventBooking,
  EventAvailability,
  EventCategory,
  EventExtraField,
  EventImage,
  EventItem,
  EventsData,
  EventsSettings,
  EventStatusMode,
  EventVideo,
} from "./types";

/**
 * Defensive reader for the events payload.
 *
 * The WordPress plugin already sanitises every value, but this feeds code that
 * writes to the DOM, so each value is re-checked against the same allow-lists
 * and limits. Anything unusable falls back to a safe default; an event that
 * cannot be placed on a calendar is dropped.
 */

type Rec = Record<string, unknown>;

const rec = (value: unknown): Rec =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as Rec) : {};
const str = (value: unknown, fallback = "", max = 5000): string =>
  typeof value === "string" ? value.slice(0, max) : fallback;
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

const list = (value: unknown, limit = 40, max = 300): string[] =>
  Array.isArray(value)
    ? value
        .filter((v): v is string => typeof v === "string" && v.trim().length > 0)
        .slice(0, limit)
        .map((v) => v.slice(0, max))
    : [];

/** Only http(s), site-relative and in-page addresses may be followed. */
export function safeUrl(value: unknown): string {
  const url = str(value, "", 2000).trim();
  if (!url) return "";
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  if (url.startsWith("#")) return url;
  return /^https?:\/\//i.test(url) ? url : "";
}

/** A real calendar date in YYYY-MM-DD form, or "". */
export function validDate(value: unknown): string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d ? value : "";
}

function image(value: unknown): EventImage | null {
  const r = rec(value);
  const url = str(r.url, "", 2000);
  if (!url || !(url.startsWith("/") || /^https?:\/\//i.test(url)) || url.startsWith("//")) return null;
  return {
    url,
    width: num(r.width, 0, 20000, 0),
    height: num(r.height, 0, 20000, 0),
    alt: str(r.alt, "", 200),
  };
}

const VIDEO_HOSTS = {
  youtube: "https://www.youtube-nocookie.com/embed/",
  vimeo: "https://player.vimeo.com/video/",
} as const;

function video(value: unknown): EventVideo | null {
  const r = rec(value);
  const kind = oneOf(r.kind, ["file", "youtube", "vimeo"] as const, "file");
  const src = str(r.src, "", 2000);
  if (!src) return null;
  if (kind === "file") {
    const ok = (src.startsWith("/") && !src.startsWith("//")) || /^https?:\/\//i.test(src);
    return ok ? { kind, src } : null;
  }
  return src.startsWith(VIDEO_HOSTS[kind]) ? { kind, src } : null;
}

function banner(value: unknown): EventBanner {
  const r = rec(value);
  const parsedVideo = video(r.video);
  const desktop = image(r.desktop);
  const mobile = image(r.mobile);
  // "Video" with no usable video falls back to the pictures.
  const type = r.type === "video" && parsedVideo ? "video" : "image";
  return { type, desktop, mobile, video: type === "video" ? parsedVideo : null, overlay: num(r.overlay, 0, 90, 55) };
}

const EMPTY_BANNER: EventBanner = { type: "image", desktop: null, mobile: null, video: null, overlay: 55 };

function categories(value: unknown): EventCategory[] {
  if (!Array.isArray(value)) return [];
  const out: EventCategory[] = [];
  for (const item of value.slice(0, 10)) {
    const r = rec(item);
    const slug = str(r.slug, "", 80).toLowerCase().replace(/[^a-z0-9-]/g, "");
    const name = str(r.name, "", 80);
    if (slug && name) out.push({ slug, name });
  }
  return out;
}

function extraFields(value: unknown): EventExtraField[] {
  if (!Array.isArray(value)) return [];
  const out: EventExtraField[] = [];
  const used = new Set<string>();
  for (const item of value.slice(0, 8)) {
    const r = rec(item);
    const key = str(r.key, "", 40).toLowerCase().replace(/[^a-z0-9_-]/g, "");
    const label = str(r.label, "", 120).trim();
    if (!key || !label || used.has(key)) continue;
    used.add(key);
    const type = oneOf(r.type, ["text", "textarea", "select", "number", "checkbox"] as const, "text");
    const options = list(r.options, 30);
    out.push({
      key,
      label,
      type: type === "select" && options.length === 0 ? "text" : type,
      required: bool(r.required, false),
      options: type === "select" ? options : [],
      placeholder: str(r.placeholder, "", 120),
    });
  }
  return out;
}

function booking(value: unknown): EventBooking {
  const r = rec(value);
  const capacity = num(r.capacity, 0, 100000, 0);
  const spots = r.spotsLeft === null || r.spotsLeft === undefined ? null : num(r.spotsLeft, 0, 100000, 0);
  return {
    enabled: bool(r.enabled, true),
    heading: str(r.heading, "Book an appointment at our stall", 160),
    intro: str(r.intro, "", 400),
    button: str(r.button, "Request Appointment", 60) || "Request Appointment",
    deadline: validDate(r.deadline),
    slots: list(r.slots, 96, 120),
    perSlotLimit: num(r.perSlotLimit, 0, 1000, 0),
    companyField: oneOf(r.companyField, ["required", "optional", "hidden"] as const, "required"),
    messageField: oneOf(r.messageField, ["optional", "hidden"] as const, "optional"),
    extraFields: extraFields(r.extraFields),
    purposes: list(r.purposes, 20),
    capacity,
    spotsLeft: capacity > 0 ? spots : null,
    success: str(r.success, "Thank you. Our team will confirm your appointment shortly.", 300),
    externalLabel: str(r.externalLabel, "", 80),
    externalUrl: safeUrl(r.externalUrl),
  };
}

function agenda(value: unknown): EventAgendaItem[] {
  if (!Array.isArray(value)) return [];
  const out: EventAgendaItem[] = [];
  for (const item of value.slice(0, 30)) {
    const r = rec(item);
    const title = str(r.title, "", 200).trim();
    if (title) out.push({ time: str(r.time, "", 80), title, text: str(r.text, "", 300) });
  }
  return out;
}

/** Only Google's own map embed may be framed. */
function mapEmbed(value: unknown): string {
  const url = safeUrl(value);
  return url.startsWith("https://www.google.com/maps/embed") ? url : "";
}

export function normalizeEvent(input: unknown): EventItem | null {
  const r = rec(input);
  const id = posInt(r.id);
  const slug = str(r.slug, "", 120).toLowerCase().replace(/[^a-z0-9-]/g, "");
  const title = str(r.title, "", 200).trim();
  const startDate = validDate(r.startDate);
  if (!id || !slug || !title || !startDate) return null;

  let endDate = validDate(r.endDate) || startDate;
  if (endDate < startDate) endDate = startDate;

  const venue = rec(r.venue);
  const media = rec(r.media);
  const contact = rec(r.contact);
  const seo = rec(r.seo);

  return {
    id,
    slug,
    title,
    statusMode: oneOf<EventStatusMode>(
      r.statusMode,
      ["auto", "upcoming", "ongoing", "concluded", "postponed", "cancelled"],
      "auto",
    ),
    startDate,
    endDate,
    timeText: str(r.timeText, "", 80),
    venue: {
      name: str(venue.name, "", 160),
      city: str(venue.city, "", 80),
      country: str(venue.country, "", 80),
      address: str(venue.address, "", 400),
      mapUrl: safeUrl(venue.mapUrl),
      mapEmbed: mapEmbed(venue.mapEmbed),
    },
    booth: str(r.booth, "", 40),
    hall: str(r.hall, "", 60),
    organizer: str(r.organizer, "", 120),
    websiteUrl: safeUrl(r.websiteUrl),
    featured: bool(r.featured, false),
    categories: categories(r.categories),
    summary: str(r.summary, "", 600),
    descriptionHtml: str(r.descriptionHtml, "", 60000),
    highlights: list(r.highlights, 20),
    agenda: agenda(r.agenda),
    gallery: (Array.isArray(r.gallery) ? r.gallery : [])
      .slice(0, 24)
      .map(image)
      .filter((v): v is EventImage => v !== null),
    media: { card: image(media.card), banner: banner(media.banner) },
    booking: booking(r.booking),
    contact: {
      name: str(contact.name, "", 80),
      phone: str(contact.phone, "", 40),
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str(contact.email, "", 254)) ? str(contact.email, "", 254) : "",
      whatsapp: str(contact.whatsapp, "", 20).replace(/\D+/g, ""),
    },
    seo: { title: str(seo.title, "", 120), description: str(seo.description, "", 320) },
    modified: str(r.modified, "", 40),
  };
}

function link(value: unknown): { text: string; url: string } {
  const r = rec(value);
  const text = str(r.text, "", 60).trim();
  const url = safeUrl(r.url);
  return text && url ? { text, url } : { text: "", url: "" };
}

export const DEFAULT_SETTINGS: EventsSettings = {
  hero: {
    badge: "Fairs & Events",
    title: "Fairs & Events",
    subtitle:
      "Meet the BVK Hydrotech team at trade fairs and conferences across India and abroad. See what we are showcasing and book a time with our engineers.",
    banner: EMPTY_BANNER,
  },
  marquee: { mode: "auto", lines: [] },
  stats: [],
  directory: {
    spotlight: true,
    search: true,
    eyebrow: "Event directory",
    title: "All fairs & events",
    text: "Where we have exhibited and where you can meet us next.",
    empty: "No events match your search. Try another filter.",
  },
  cta: {
    badge: "Talk to our engineers",
    title: "Planning to meet us at the next fair?",
    text: "",
    button1: { text: "", url: "" },
    button2: { text: "", url: "" },
    phone: "",
    email: "",
    note: "",
  },
  seo: { title: "", description: "", image: null },
};

export function normalizeSettings(input: unknown): EventsSettings {
  const r = rec(input);
  const hero = rec(r.hero);
  const marquee = rec(r.marquee);
  const dir = rec(r.directory);
  const cta = rec(r.cta);
  const seo = rec(r.seo);
  const d = DEFAULT_SETTINGS;

  return {
    hero: {
      badge: str(hero.badge, d.hero.badge, 60),
      title: str(hero.title, d.hero.title, 120) || d.hero.title,
      subtitle: str(hero.subtitle, d.hero.subtitle, 500),
      banner: banner(hero.banner),
    },
    marquee: {
      mode: oneOf(marquee.mode, ["auto", "custom", "off"] as const, "auto"),
      lines: list(marquee.lines, 12),
    },
    stats: (Array.isArray(r.stats) ? r.stats : [])
      .slice(0, 4)
      .map((s) => ({ number: str(rec(s).number, "", 24).trim(), label: str(rec(s).label, "", 80).trim() }))
      .filter((s) => s.number || s.label),
    directory: {
      spotlight: bool(dir.spotlight, true),
      search: bool(dir.search, true),
      eyebrow: str(dir.eyebrow, d.directory.eyebrow, 60),
      title: str(dir.title, d.directory.title, 120) || d.directory.title,
      text: str(dir.text, d.directory.text, 300),
      empty: str(dir.empty, d.directory.empty, 200) || d.directory.empty,
    },
    cta: {
      badge: str(cta.badge, d.cta.badge, 60),
      title: str(cta.title, d.cta.title, 160) || d.cta.title,
      text: str(cta.text, "", 400),
      button1: link(cta.button1),
      button2: link(cta.button2),
      phone: str(cta.phone, "", 40),
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str(cta.email, "", 254)) ? str(cta.email, "", 254) : "",
      note: str(cta.note, "", 160),
    },
    seo: { title: str(seo.title, "", 120), description: str(seo.description, "", 320), image: image(seo.image) },
  };
}

export function normalizeEventsData(input: unknown, ok = true): EventsData {
  const r = rec(input);
  const seen = new Set<string>();
  const events: EventItem[] = [];
  for (const raw of Array.isArray(r.events) ? r.events : []) {
    const event = normalizeEvent(raw);
    if (!event || seen.has(event.slug)) continue;
    seen.add(event.slug);
    events.push(event);
  }

  return {
    ok,
    today: validDate(r.today) || new Date().toISOString().slice(0, 10),
    settings: normalizeSettings(r.settings),
    categories: categories(r.categories),
    events,
  };
}

/** The availability response: bookings counted per day and slot. */
export function normalizeAvailability(input: unknown): EventAvailability {
  const r = rec(input);
  const counts: EventAvailability["counts"] = {};
  for (const [date, slots] of Object.entries(rec(r.counts)).slice(0, 400)) {
    if (!validDate(date)) continue;
    counts[date] = {};
    for (const [slot, n] of Object.entries(rec(slots)).slice(0, 200)) {
      counts[date][slot.slice(0, 120)] = num(n, 0, 1_000_000, 0);
    }
  }
  return {
    eventId: num(r.eventId, 0, Number.MAX_SAFE_INTEGER, 0),
    perSlotLimit: num(r.perSlotLimit, 0, 1000, 0),
    counts,
    spotsLeft: r.spotsLeft === null || r.spotsLeft === undefined ? null : num(r.spotsLeft, 0, 1_000_000, 0),
  };
}
