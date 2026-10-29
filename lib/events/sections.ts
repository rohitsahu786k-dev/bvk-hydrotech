/**
 * The event page's sections, as WordPress sends them in `event.sections`.
 *
 * WordPress has already applied the site-wide defaults and the {{event}}
 * placeholder, so this only validates the shapes. A payload without sections
 * (an older plugin) keeps the classic page: the existing sections stay visible
 * and the new ones stay hidden.
 */

import type {
  EventBasicSection,
  EventCardItem,
  EventImage,
  EventPerson,
  EventSections,
  EventSolutionItem,
} from "./types";

type Rec = Record<string, unknown>;

const rec = (value: unknown): Rec =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as Rec) : {};
const str = (value: unknown, fallback = "", max = 5000): string =>
  typeof value === "string" ? value.slice(0, max) : fallback;
const bool = (value: unknown, fallback: boolean): boolean => (typeof value === "boolean" ? value : fallback);
const array = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

/** http(s) addresses and site paths only. */
export function linkUrl(value: unknown): string {
  const url = str(value, "", 500).trim();
  if (/^https?:\/\/\S+$/i.test(url)) return url;
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  return "";
}

function imageOf(value: unknown): EventImage | null {
  const r = rec(value);
  const url = linkUrl(r.url);
  if (!url) return null;
  return {
    url,
    width: Math.max(0, Math.round(Number(r.width) || 0)),
    height: Math.max(0, Math.round(Number(r.height) || 0)),
    alt: str(r.alt, "", 200),
  };
}

function imagesOf(value: unknown, limit = 40): EventImage[] {
  return array(value)
    .slice(0, limit)
    .map(imageOf)
    .filter((v): v is EventImage => v !== null);
}

const BASIC: Record<string, [string, string]> = {
  overview: ["About this event", "What to expect"],
  stall: ["At our stall", "What we are showcasing"],
  agenda: ["Schedule", "Programme"],
  photos: ["Photos", "Gallery"],
  location: ["Location", "How to find us"],
  more: ["Keep exploring", "More fairs & events"],
};

function basic(value: unknown, eyebrow: string, heading: string, showByDefault: boolean): EventBasicSection {
  const r = rec(value);
  return {
    show: bool(r.show, showByDefault),
    eyebrow: str(r.eyebrow, eyebrow, 60) || eyebrow,
    heading: str(r.heading, heading, 160) || heading,
  };
}

function cardsOf(value: unknown, limit = 12): EventCardItem[] {
  return array(value)
    .slice(0, limit)
    .map((raw) => {
      const r = rec(raw);
      return { image: imageOf(r.image), title: str(r.title, "", 120), text: str(r.text, "", 400) };
    })
    .filter((card) => card.title || card.image);
}

function solutionsOf(value: unknown): EventSolutionItem[] {
  return array(value)
    .slice(0, 12)
    .map((raw) => {
      const r = rec(raw);
      return {
        image: imageOf(r.image),
        title: str(r.title, "", 120),
        text: str(r.text, "", 400),
        linkLabel: str(r.linkLabel, "", 60),
        linkUrl: linkUrl(r.linkUrl),
      };
    })
    .filter((card) => card.title || card.image);
}

function peopleOf(value: unknown): EventPerson[] {
  return array(value)
    .slice(0, 12)
    .map((raw) => {
      const r = rec(raw);
      const email = str(r.email, "", 254);
      return {
        image: imageOf(r.image),
        name: str(r.name, "", 100),
        role: str(r.role, "", 100),
        phone: str(r.phone, "", 40),
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "",
      };
    })
    .filter((person) => person.name);
}

export function normalizeSections(input: unknown): EventSections {
  const r = rec(input);
  const has = Object.keys(r).length > 0;

  const awaits = rec(r.awaits);
  const solutions = rec(r.solutions);
  const about = rec(r.about);
  const previous = rec(r.previous);
  const clients = rec(r.clients);
  const video = rec(r.video);
  const team = rec(r.team);
  const faq = rec(r.faq);

  const awaitsItems = cardsOf(awaits.items);
  const solutionItems = solutionsOf(solutions.items);
  const previousImages = imagesOf(previous.images);
  const clientImages = imagesOf(clients.images);
  const people = peopleOf(team.people);
  const faqItems = array(faq.items)
    .slice(0, 20)
    .map((raw) => ({ question: str(rec(raw).question, "", 240), answer: str(rec(raw).answer, "", 1200) }))
    .filter((item) => item.question && item.answer);

  const embed = rec(video.video);
  const embedSrc = linkUrl(embed.src);
  const embedKind = embed.kind === "youtube" || embed.kind === "vimeo" ? embed.kind : null;

  const stats = array(about.stats)
    .slice(0, 6)
    .map((raw) => ({ number: str(rec(raw).number, "", 24), label: str(rec(raw).label, "", 80) }))
    .filter((stat) => stat.number || stat.label);
  const aboutText = str(about.textHtml, "", 20000);

  return {
    factsShow: bool(r.factsShow, true),
    glanceShow: bool(r.glanceShow, true),
    contactShow: bool(r.contactShow, true),
    overview: basic(r.overview, ...(BASIC.overview as [string, string]), true),
    stall: basic(r.stall, ...(BASIC.stall as [string, string]), true),
    agenda: basic(r.agenda, ...(BASIC.agenda as [string, string]), true),
    photos: basic(r.photos, ...(BASIC.photos as [string, string]), true),
    location: basic(r.location, ...(BASIC.location as [string, string]), true),
    more: basic(r.more, ...(BASIC.more as [string, string]), true),
    awaits: {
      ...basic(awaits, "At the event", "What Awaits You", false),
      intro: str(awaits.intro, "", 400),
      items: awaitsItems,
      show: has && bool(awaits.show, false) && awaitsItems.length > 0,
    },
    solutions: {
      ...basic(solutions, "On display", "Featured Solutions on Display", false),
      intro: str(solutions.intro, "", 400),
      items: solutionItems,
      show: has && bool(solutions.show, false) && solutionItems.length > 0,
    },
    about: {
      show: has && bool(about.show, false) && Boolean(str(about.heading) || aboutText.trim()),
      eyebrow: str(about.eyebrow, "", 60),
      heading: str(about.heading, "", 200),
      textHtml: aboutText,
      image: imageOf(about.image),
      linkLabel: str(about.linkLabel, "", 60),
      linkUrl: linkUrl(about.linkUrl),
      stats,
    },
    previous: {
      ...basic(previous, "", "Highlights from Previous Exhibitions", false),
      eyebrow: str(previous.eyebrow, "", 60),
      intro: str(previous.intro, "", 400),
      images: previousImages,
      show: has && bool(previous.show, false) && previousImages.length > 0,
    },
    clients: {
      ...basic(clients, "", "Trusted by industry leaders", false),
      eyebrow: str(clients.eyebrow, "", 60),
      intro: str(clients.intro, "", 400),
      images: clientImages,
      show: has && bool(clients.show, false) && clientImages.length > 0,
    },
    video: {
      ...basic(video, "Watch", "See it in action", false),
      intro: str(video.intro, "", 400),
      video: embedSrc && embedKind ? { kind: embedKind, src: embedSrc, id: str(embed.id, "", 20) } : null,
      show: has && bool(video.show, false) && Boolean(embedSrc && embedKind),
    },
    team: {
      ...basic(team, "Our team", "Meet us at the stall", false),
      intro: str(team.intro, "", 400),
      people,
      show: has && bool(team.show, false) && people.length > 0,
    },
    faq: {
      ...basic(faq, "Good to know", "Frequently asked questions", false),
      intro: str(faq.intro, "", 400),
      items: faqItems,
      show: has && bool(faq.show, false) && faqItems.length > 0,
    },
  };
}
