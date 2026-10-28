import type { EventCardData, EventItem, EventStatus } from "./types";

/**
 * Status, dates, ordering and booking rules for events. Pure functions: the
 * current day is always passed in, so the same code runs on the server, in the
 * browser and in tests.
 */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const STATUS_LABEL: Record<EventStatus, string> = {
  upcoming: "Upcoming",
  ongoing: "Live now",
  concluded: "Concluded",
  postponed: "Postponed",
  cancelled: "Cancelled",
};

export function eventStatus(
  event: Pick<EventItem, "statusMode" | "startDate" | "endDate">,
  today: string,
): EventStatus {
  if (event.statusMode !== "auto") return event.statusMode;
  if (today < event.startDate) return "upcoming";
  if (today > event.endDate) return "concluded";
  return "ongoing";
}

/** Still ahead of us, or happening now (a postponed event is still to come). */
export const isActive = (status: EventStatus): boolean =>
  status === "upcoming" || status === "ongoing" || status === "postponed";

const parts = (date: string) => {
  const [y, m, d] = date.split("-").map(Number);
  return { y, m, d };
};

const pad = (n: number) => String(n).padStart(2, "0");

/** "02 Oct 2026", "02–04 Oct 2026", "28 Sep – 02 Oct 2026", "30 Dec 2026 – 02 Jan 2027". */
export function formatDateRange(start: string, end: string): string {
  const a = parts(start);
  const b = parts(end || start);
  const one = (p: typeof a) => `${pad(p.d)} ${MONTHS[p.m - 1]} ${p.y}`;
  if (start === end || !end) return one(a);
  if (a.y === b.y && a.m === b.m) return `${pad(a.d)}–${pad(b.d)} ${MONTHS[a.m - 1]} ${a.y}`;
  if (a.y === b.y) return `${pad(a.d)} ${MONTHS[a.m - 1]} – ${pad(b.d)} ${MONTHS[b.m - 1]} ${a.y}`;
  return `${one(a)} – ${one(b)}`;
}

/** "Friday, 02 October 2026" */
export function formatLongDate(date: string): string {
  const { y, m, d } = parts(date);
  const weekday = WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${weekday}, ${pad(d)} ${MONTHS_LONG[m - 1]} ${y}`;
}

/** "Fri, 02 Oct", for the day dropdown on the booking form. */
export function formatDayOption(date: string): string {
  const { y, m, d } = parts(date);
  return `${WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()].slice(0, 3)}, ${pad(d)} ${MONTHS[m - 1]}`;
}

export function addDays(date: string, days: number): string {
  const { y, m, d } = parts(date);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

export function locationLine(event: Pick<EventItem, "venue">): string {
  const { name, city, country } = event.venue;
  const place = [name, city].filter(Boolean).join(", ");
  return place || country;
}

/**
 * Upcoming and live events first, soonest first; then everything that is over,
 * most recent first.
 */
export function sortEvents<T extends Pick<EventItem, "statusMode" | "startDate" | "endDate">>(
  events: T[],
  today: string,
): T[] {
  const active: T[] = [];
  const past: T[] = [];
  for (const event of events) (isActive(eventStatus(event, today)) ? active : past).push(event);
  active.sort((a, b) => a.startDate.localeCompare(b.startDate));
  past.sort((a, b) => b.startDate.localeCompare(a.startDate));
  return [...active, ...past];
}

/** The event for the large panel: a featured one, else the next one coming up, else the latest. */
export function pickSpotlight<T extends EventItem>(events: T[], today: string): T | null {
  if (events.length === 0) return null;
  const sorted = sortEvents(events, today);
  const active = sorted.filter((e) => isActive(eventStatus(e, today)));
  return active.find((e) => e.featured) ?? active[0] ?? sorted.find((e) => e.featured) ?? sorted[0];
}

export type BookingClosedReason = "disabled" | "cancelled" | "postponed" | "ended" | "closed" | "full";

export interface BookingState {
  open: boolean;
  reason?: BookingClosedReason;
}

export function bookingState(event: EventItem, today: string): BookingState {
  const { booking } = event;
  if (!booking.enabled) return { open: false, reason: "disabled" };

  const status = eventStatus(event, today);
  if (status === "cancelled") return { open: false, reason: "cancelled" };
  if (status === "postponed") return { open: false, reason: "postponed" };
  if (status === "concluded") return { open: false, reason: "ended" };

  const lastDay = booking.deadline || event.endDate;
  if (today > lastDay) return { open: false, reason: "closed" };
  if (booking.capacity > 0 && booking.spotsLeft !== null && booking.spotsLeft <= 0) {
    return { open: false, reason: "full" };
  }
  return { open: true };
}

export const BOOKING_CLOSED_TEXT: Record<BookingClosedReason, string> = {
  disabled: "Online booking is not available for this event.",
  cancelled: "This event has been cancelled.",
  postponed: "This event has been postponed. New dates will be announced soon.",
  ended: "This event has concluded. Contact us to meet at our next fair.",
  closed: "Bookings for this event are now closed.",
  full: "All appointments for this event have been taken.",
};

/** The days a visitor can choose from: from today (or the first day) to the last bookable day. */
export function bookingDates(event: EventItem, today: string, limit = 14): string[] {
  const last = event.booking.deadline && event.booking.deadline < event.endDate ? event.booking.deadline : event.endDate;
  let day = today > event.startDate ? today : event.startDate;
  const out: string[] = [];
  while (day <= last && out.length < limit) {
    out.push(day);
    day = addDays(day, 1);
  }
  return out;
}

export function googleCalendarUrl(event: EventItem): string {
  const ymd = (d: string) => d.replace(/-/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    // An all-day event's end date is exclusive.
    dates: `${ymd(event.startDate)}/${ymd(addDays(event.endDate, 1))}`,
    details: [event.summary, event.booth ? `Stall ${event.booth}` : ""].filter(Boolean).join("\n"),
    location: [event.venue.name, event.venue.address || event.venue.city].filter(Boolean).join(", "),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function matchesQuery(card: Pick<EventCardData, "title" | "location" | "booth" | "categories">, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [card.title, card.location, card.booth, ...card.categories.map((c) => c.name)]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

export function toCard(event: EventItem, today: string): EventCardData {
  return {
    id: event.id,
    slug: event.slug,
    title: event.title,
    status: eventStatus(event, today),
    dateLabel: formatDateRange(event.startDate, event.endDate),
    location: locationLine(event),
    booth: event.booth,
    summary: event.summary,
    image: event.media.card ?? event.media.banner.desktop ?? event.media.banner.mobile,
    categories: event.categories,
    highlights: event.highlights.slice(0, 4),
    timeText: event.timeText,
    phone: event.contact.phone,
    bookable: bookingState(event, today).open,
  };
}

export type DirectoryTab = "all" | "upcoming" | "previous";

export function tabOf(status: EventStatus): Exclude<DirectoryTab, "all"> {
  return isActive(status) ? "upcoming" : "previous";
}

export interface SlotState {
  full: boolean;
  /** Places left, or null when the slot has no limit. */
  left: number | null;
}

/** Whether one day's slot still has room, given how many bookings it already has. */
export function slotState(perSlotLimit: number, used: number): SlotState {
  if (perSlotLimit <= 0) return { full: false, left: null };
  const left = Math.max(0, perSlotLimit - used);
  return { full: left === 0, left };
}
