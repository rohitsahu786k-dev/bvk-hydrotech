/**
 * Fairs & Events data model.
 *
 * Authored in WordPress (Fairs & Events menu, BVK Events plugin) and delivered
 * by /wp-json/bvk/v1/events. Every value is validated by `normalizeEventsData`
 * before it is used, so a half-filled event can never break a page.
 */

export type EventStatus = "upcoming" | "ongoing" | "concluded" | "postponed" | "cancelled";

/** "auto" works the status out from the dates. */
export type EventStatusMode = EventStatus | "auto";

export interface EventImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface EventVideo {
  kind: "file" | "youtube" | "vimeo";
  src: string;
}

export interface EventBanner {
  type: "image" | "video";
  desktop: EventImage | null;
  mobile: EventImage | null;
  video: EventVideo | null;
  /** 0 to 90: how much the picture is darkened behind white text. */
  overlay: number;
}

export interface EventCategory {
  slug: string;
  name: string;
}

export interface EventAgendaItem {
  time: string;
  title: string;
  text: string;
}

export interface EventExtraField {
  key: string;
  label: string;
  type: "text" | "textarea" | "select" | "number" | "checkbox";
  required: boolean;
  options: string[];
  placeholder: string;
}

export interface EventBooking {
  enabled: boolean;
  heading: string;
  intro: string;
  button: string;
  /** Last day bookings are accepted ("" = until the event ends). */
  deadline: string;
  /** Time slot labels, e.g. "10:00 AM to 10:30 AM". Empty = the visitor only picks a day. */
  slots: string[];
  /** Bookings allowed per day and slot (0 = no limit). */
  perSlotLimit: number;
  companyField: "required" | "optional" | "hidden";
  messageField: "optional" | "hidden";
  extraFields: EventExtraField[];
  purposes: string[];
  capacity: number;
  /** Appointments still available, or null when there is no limit. */
  spotsLeft: number | null;
  success: string;
  externalLabel: string;
  externalUrl: string;
}

/** The words and visibility of a section. */
export interface EventBasicSection {
  show: boolean;
  eyebrow: string;
  heading: string;
}

export interface EventCardItem {
  image: EventImage | null;
  title: string;
  text: string;
}

export interface EventSolutionItem extends EventCardItem {
  linkLabel: string;
  linkUrl: string;
}

export interface EventPerson {
  image: EventImage | null;
  name: string;
  role: string;
  phone: string;
  email: string;
}

/**
 * Section-by-section layout of the event page, authored in "Event Page
 * Sections". WordPress has already applied the site-wide defaults and the
 * {{event}} placeholder; `show` is false for a hidden or empty section.
 */
export interface EventSections {
  factsShow: boolean;
  glanceShow: boolean;
  contactShow: boolean;
  overview: EventBasicSection;
  stall: EventBasicSection;
  agenda: EventBasicSection;
  photos: EventBasicSection;
  location: EventBasicSection;
  more: EventBasicSection;
  awaits: EventBasicSection & { intro: string; items: EventCardItem[] };
  solutions: EventBasicSection & { intro: string; items: EventSolutionItem[] };
  about: {
    show: boolean;
    eyebrow: string;
    heading: string;
    textHtml: string;
    image: EventImage | null;
    linkLabel: string;
    linkUrl: string;
    stats: { number: string; label: string }[];
  };
  previous: EventBasicSection & { intro: string; images: EventImage[] };
  clients: EventBasicSection & { intro: string; images: EventImage[] };
  video: EventBasicSection & { intro: string; video: (EventVideo & { id: string }) | null };
  team: EventBasicSection & { intro: string; people: EventPerson[] };
  faq: EventBasicSection & { intro: string; items: { question: string; answer: string }[] };
}

export interface EventItem {
  id: number;
  slug: string;
  title: string;
  statusMode: EventStatusMode;
  /** YYYY-MM-DD */
  startDate: string;
  /** YYYY-MM-DD, never before startDate */
  endDate: string;
  timeText: string;
  venue: {
    name: string;
    city: string;
    country: string;
    address: string;
    mapUrl: string;
    mapEmbed: string;
  };
  booth: string;
  hall: string;
  organizer: string;
  websiteUrl: string;
  featured: boolean;
  categories: EventCategory[];
  summary: string;
  descriptionHtml: string;
  highlights: string[];
  agenda: EventAgendaItem[];
  gallery: EventImage[];
  media: { card: EventImage | null; banner: EventBanner };
  booking: EventBooking;
  sections: EventSections;
  contact: { name: string; phone: string; email: string; whatsapp: string };
  seo: { title: string; description: string };
  modified: string;
}

export interface EventsSettings {
  hero: { badge: string; title: string; subtitle: string; banner: EventBanner };
  marquee: { mode: "auto" | "custom" | "off"; lines: string[] };
  stats: { number: string; label: string }[];
  directory: {
    spotlight: boolean;
    search: boolean;
    eyebrow: string;
    title: string;
    text: string;
    empty: string;
  };
  cta: {
    badge: string;
    title: string;
    text: string;
    button1: { text: string; url: string };
    button2: { text: string; url: string };
    phone: string;
    email: string;
    note: string;
  };
  seo: { title: string; description: string; image: EventImage | null };
}

export interface EventsData {
  /** False when WordPress could not be reached (as opposed to "no events yet"). */
  ok: boolean;
  /** The site's calendar day, YYYY-MM-DD. Statuses are worked out against it. */
  today: string;
  settings: EventsSettings;
  categories: EventCategory[];
  events: EventItem[];
}

/** The slim shape the browser needs to draw a card, so the list ships no article text. */
export interface EventCardData {
  id: number;
  slug: string;
  title: string;
  status: EventStatus;
  dateLabel: string;
  location: string;
  booth: string;
  summary: string;
  image: EventImage | null;
  categories: EventCategory[];
  highlights: string[];
  timeText: string;
  phone: string;
  bookable: boolean;
}

export interface BookingPayload {
  eventId: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  date: string;
  slot: string;
  purpose: string;
  message: string;
  /** Answers to the event's extra questions, by field key. */
  extra: Record<string, string>;
  source: string;
  landingPage: string;
}

/** Live seat counts, so the form can show which slots are full. */
export interface EventAvailability {
  eventId: number;
  perSlotLimit: number;
  /** date -> slot label -> bookings so far */
  counts: Record<string, Record<string, number>>;
  spotsLeft: number | null;
}
