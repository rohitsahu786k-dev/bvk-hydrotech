// Run with: node --test lib/events/events.test.mjs
// Node strips the TypeScript types on import. The modules import each other
// without file extensions (as the bundler expects), so a tiny resolve hook adds
// ".ts" for relative imports while the tests run.
import assert from "node:assert/strict";
import { register } from "node:module";
import { describe, it } from "node:test";

register(
  "data:text/javascript," +
    encodeURIComponent(`
      export async function resolve(specifier, context, next) {
        try { return await next(specifier, context); }
        catch (error) {
          if (specifier.startsWith(".") && !/\\.[a-z]+$/.test(specifier)) return next(specifier + ".ts", context);
          throw error;
        }
      }`),
  import.meta.url,
);

const logic = await import("./logic.ts");
const { normalizeAvailability, normalizeEvent, normalizeEventsData, normalizeSettings, safeUrl, validDate } = await import("./normalize.ts");
const { validateBooking } = await import("./booking.ts");
const {
  addDays, bookingDates, bookingState, eventStatus, formatDateRange, formatLongDate, googleCalendarUrl,
  locationLine, matchesQuery, pickSpotlight, slotState, sortEvents, tabOf, toCard,
} = logic;

const TODAY = "2026-10-28";

/** A minimal payload shaped like the WordPress endpoint's output. */
function raw(over = {}) {
  return {
    id: 1,
    slug: "medicall-delhi-2026",
    title: "Medicall Delhi 2026",
    statusMode: "auto",
    startDate: "2026-12-02",
    endDate: "2026-12-04",
    timeText: "10:00 AM to 6:00 PM",
    venue: { name: "Pragati Maidan", city: "New Delhi", country: "India", address: "Bharat Mandapam", mapUrl: "https://maps.app.goo.gl/x", mapEmbed: "" },
    booth: "D2D3",
    summary: "Meet us.",
    highlights: ["Live OT mockup", "Sliding doors"],
    categories: [{ slug: "exhibition", name: "Exhibition" }],
    booking: { enabled: true, heading: "Book", button: "Request", slots: ["10:00 AM to 12:00 PM", "12:00 PM to 2:00 PM"], purposes: ["Modular OT", "General"], capacity: 0, spotsLeft: null },
    contact: { phone: "+91 92518 59361", email: "a@b.co" },
    media: { card: { url: "/media/2026/10/c.jpg", width: 1200, height: 800, alt: "" }, banner: { type: "image", desktop: { url: "/media/d.jpg", width: 2400, height: 1000, alt: "" }, mobile: null, video: null, overlay: 55 } },
    ...over,
  };
}
const ev = (over = {}) => normalizeEvent(raw(over));

describe("eventStatus", () => {
  it("works the status out from the dates", () => {
    assert.equal(eventStatus(ev(), TODAY), "upcoming");
    assert.equal(eventStatus(ev({ startDate: "2026-10-27", endDate: "2026-10-29" }), TODAY), "ongoing");
    assert.equal(eventStatus(ev({ startDate: "2026-10-28", endDate: "2026-10-28" }), TODAY), "ongoing");
    assert.equal(eventStatus(ev({ startDate: "2026-10-01", endDate: "2026-10-04" }), TODAY), "concluded");
  });
  it("a manual status wins over the dates", () => {
    assert.equal(eventStatus(ev({ statusMode: "cancelled" }), TODAY), "cancelled");
    assert.equal(eventStatus(ev({ statusMode: "postponed", startDate: "2026-10-01", endDate: "2026-10-02" }), TODAY), "postponed");
  });
  it("the last day still counts as live", () => {
    assert.equal(eventStatus(ev({ startDate: "2026-10-26", endDate: "2026-10-28" }), TODAY), "ongoing");
    assert.equal(eventStatus(ev({ startDate: "2026-10-26", endDate: "2026-10-27" }), TODAY), "concluded");
  });
});

describe("dates", () => {
  it("formats ranges", () => {
    assert.equal(formatDateRange("2026-10-02", "2026-10-02"), "02 Oct 2026");
    assert.equal(formatDateRange("2026-10-02", "2026-10-04"), "02–04 Oct 2026");
    assert.equal(formatDateRange("2026-09-28", "2026-10-02"), "28 Sep – 02 Oct 2026");
    assert.equal(formatDateRange("2026-12-30", "2027-01-02"), "30 Dec 2026 – 02 Jan 2027");
  });
  it("long date names the weekday correctly", () => {
    assert.equal(formatLongDate("2026-10-02"), "Friday, 02 October 2026");
    assert.equal(formatLongDate("2026-10-28"), "Wednesday, 28 October 2026");
  });
  it("addDays crosses month and year ends", () => {
    assert.equal(addDays("2026-10-31", 1), "2026-11-01");
    assert.equal(addDays("2026-12-31", 1), "2027-01-01");
    assert.equal(addDays("2028-02-28", 1), "2028-02-29");
  });
  it("validDate rejects impossible days", () => {
    assert.equal(validDate("2026-02-30"), "");
    assert.equal(validDate("2026-13-01"), "");
    assert.equal(validDate("26-10-01"), "");
    assert.equal(validDate("2026-10-01"), "2026-10-01");
  });
});

describe("normalizeEvent", () => {
  it("accepts a good event", () => {
    const e = ev();
    assert.equal(e.slug, "medicall-delhi-2026");
    assert.equal(e.booking.slots.length, 2);
    assert.equal(e.categories[0].name, "Exhibition");
  });
  it("drops events that cannot be placed on a calendar", () => {
    assert.equal(ev({ startDate: "" }), null);
    assert.equal(ev({ startDate: "2026-02-30" }), null);
    assert.equal(ev({ title: "  " }), null);
    assert.equal(ev({ slug: "" }), null);
    assert.equal(ev({ id: 0 }), null);
    assert.equal(ev({ id: -3 }), null);
    assert.equal(ev({ id: 1.5 }), null);
    assert.equal(normalizeEvent(null), null);
  });
  it("an end date before the start is corrected", () => {
    const e = ev({ startDate: "2026-12-05", endDate: "2026-12-01" });
    assert.equal(e.endDate, "2026-12-05");
    assert.equal(ev({ endDate: "" }).endDate, "2026-12-02");
  });
  it("strips unsafe links and images", () => {
    assert.equal(safeUrl("javascript:alert(1)"), "");
    assert.equal(safeUrl("//evil.example"), "");
    assert.equal(safeUrl("/contact"), "/contact");
    const e = ev({ websiteUrl: "javascript:1", venue: { mapUrl: "data:text/html,x", mapEmbed: "https://evil.example/maps/embed" }, media: { card: { url: "javascript:1" }, banner: {} } });
    assert.equal(e.websiteUrl, "");
    assert.equal(e.venue.mapUrl, "");
    assert.equal(e.venue.mapEmbed, "");
    assert.equal(e.media.card, null);
  });
  it("only Google's own map may be framed", () => {
    const ok = "https://www.google.com/maps/embed?pb=!1m1";
    assert.equal(ev({ venue: { mapEmbed: ok } }).venue.mapEmbed, ok);
  });
  it("banner video: only known players or files; falls back to image otherwise", () => {
    const yt = { kind: "youtube", src: "https://www.youtube-nocookie.com/embed/abcdefghijk" };
    const good = ev({ media: { banner: { type: "video", video: yt, desktop: null, mobile: null } } });
    assert.equal(good.media.banner.type, "video");
    const spoof = ev({ media: { banner: { type: "video", video: { kind: "youtube", src: "https://evil.example/embed/x" } } } });
    assert.equal(spoof.media.banner.type, "image");
    assert.equal(spoof.media.banner.video, null);
    const file = ev({ media: { banner: { type: "video", video: { kind: "file", src: "/media/2026/10/clip.mp4" } } } });
    assert.equal(file.media.banner.type, "video");
    assert.equal(ev({ media: { banner: { type: "video", video: null } } }).media.banner.type, "image");
  });
  it("capacity bookkeeping: spotsLeft is null without a limit", () => {
    assert.equal(ev().booking.spotsLeft, null);
    assert.equal(ev({ booking: { capacity: 10, spotsLeft: 3 } }).booking.spotsLeft, 3);
  });
});

describe("normalizeEventsData / settings", () => {
  it("dedupes slugs and survives junk", () => {
    const data = normalizeEventsData({ today: TODAY, events: [raw(), raw({ id: 2 }), { x: 1 }, raw({ id: 3, slug: "other" })] });
    assert.deepEqual(data.events.map((e) => e.slug), ["medicall-delhi-2026", "other"]);
    assert.equal(data.today, TODAY);
    assert.deepEqual(normalizeEventsData(null).events, []);
    assert.equal(normalizeEventsData({}, false).ok, false);
  });
  it("settings fall back to defaults and keep only filled stats", () => {
    const s = normalizeSettings({ stats: [{ number: "15+", label: "Fairs" }, { number: "", label: "" }], cta: { button1: { text: "Go", url: "javascript:1" } } });
    assert.equal(s.hero.title, "Fairs & Events");
    assert.equal(s.stats.length, 1);
    assert.deepEqual(s.cta.button1, { text: "", url: "" });
    assert.equal(normalizeSettings(undefined).marquee.mode, "auto");
  });
});

describe("ordering", () => {
  const events = [
    ev({ id: 1, slug: "a", startDate: "2026-10-01", endDate: "2026-10-02" }), // concluded
    ev({ id: 2, slug: "b", startDate: "2026-12-10", endDate: "2026-12-11" }), // upcoming, later
    ev({ id: 3, slug: "c", startDate: "2026-11-05", endDate: "2026-11-06" }), // upcoming, sooner
    ev({ id: 4, slug: "d", startDate: "2026-08-01", endDate: "2026-08-02" }), // concluded, older
    ev({ id: 5, slug: "e", startDate: "2026-10-27", endDate: "2026-10-30" }), // live
  ];
  it("upcoming and live first (soonest first), then past (latest first)", () => {
    assert.deepEqual(sortEvents(events, TODAY).map((e) => e.slug), ["e", "c", "b", "a", "d"]);
  });
  it("spotlight: featured upcoming beats the soonest; else soonest; else latest past", () => {
    assert.equal(pickSpotlight(events, TODAY).slug, "e");
    const featured = events.map((e) => (e.slug === "b" ? { ...e, featured: true } : e));
    assert.equal(pickSpotlight(featured, TODAY).slug, "b");
    const past = events.filter((e) => ["a", "d"].includes(e.slug));
    assert.equal(pickSpotlight(past, TODAY).slug, "a");
    assert.equal(pickSpotlight([], TODAY), null);
  });
  it("a featured event that is already over does not beat an upcoming one", () => {
    const list = events.map((e) => (e.slug === "a" ? { ...e, featured: true } : e));
    assert.equal(pickSpotlight(list, TODAY).slug, "e");
  });
  it("tabs", () => {
    assert.equal(tabOf("upcoming"), "upcoming");
    assert.equal(tabOf("ongoing"), "upcoming");
    assert.equal(tabOf("postponed"), "upcoming");
    assert.equal(tabOf("concluded"), "previous");
    assert.equal(tabOf("cancelled"), "previous");
  });
});

describe("bookingState", () => {
  it("open for an upcoming event with bookings on", () => assert.equal(bookingState(ev(), TODAY).open, true));
  it("closed when switched off, concluded, cancelled, postponed", () => {
    assert.equal(bookingState(ev({ booking: { enabled: false } }), TODAY).reason, "disabled");
    assert.equal(bookingState(ev({ startDate: "2026-10-01", endDate: "2026-10-02" }), TODAY).reason, "ended");
    assert.equal(bookingState(ev({ statusMode: "cancelled" }), TODAY).reason, "cancelled");
    assert.equal(bookingState(ev({ statusMode: "postponed" }), TODAY).reason, "postponed");
  });
  it("closes after the booking deadline, which can be earlier than the event end", () => {
    const e = ev({ startDate: "2026-10-27", endDate: "2026-11-05", booking: { deadline: "2026-10-27" } });
    assert.equal(bookingState(e, TODAY).reason, "closed");
    assert.equal(bookingState(e, "2026-10-27").open, true);
  });
  it("closes when full", () => {
    assert.equal(bookingState(ev({ booking: { capacity: 5, spotsLeft: 0 } }), TODAY).reason, "full");
    assert.equal(bookingState(ev({ booking: { capacity: 5, spotsLeft: 2 } }), TODAY).open, true);
  });
  it("bookable days run from today to the last bookable day", () => {
    assert.deepEqual(bookingDates(ev(), TODAY), ["2026-12-02", "2026-12-03", "2026-12-04"]);
    const live = ev({ startDate: "2026-10-27", endDate: "2026-10-30" });
    assert.deepEqual(bookingDates(live, TODAY), ["2026-10-28", "2026-10-29", "2026-10-30"]);
    const limited = ev({ startDate: "2026-12-02", endDate: "2026-12-10", booking: { deadline: "2026-12-03" } });
    assert.deepEqual(bookingDates(limited, TODAY), ["2026-12-02", "2026-12-03"]);
  });
});

describe("validateBooking", () => {
  const good = (over = {}) => ({
    name: "Asha Rao", email: "asha@example.com", phone: "+91 98765 43210", company: "Acme",
    date: "2026-12-03", slot: "10:00 AM to 12:00 PM", purpose: "Modular OT", message: "Hello", consent: true, ...over,
  });
  const run = (input, event = ev()) => validateBooking(input, event, TODAY);

  it("accepts a complete request", () => {
    const r = run(good());
    assert.equal(r.ok, true);
    assert.equal(r.value.eventId, 1);
    assert.equal(r.value.date, "2026-12-03");
  });
  it("flags each missing or invalid field", () => {
    const r = run({ name: "A", email: "nope", phone: "12", consent: false });
    assert.equal(r.ok, false);
    assert.equal(r.status, 400);
    for (const key of ["name", "email", "phone", "consent", "date", "slot"]) assert.ok(r.fields[key], `no error for ${key}`);
  });
  it("only accepts days, slots and topics the event offers", () => {
    assert.ok(run(good({ date: "2026-12-09" })).fields.date);
    assert.ok(run(good({ slot: "midnight" })).fields.slot);
    assert.ok(run(good({ purpose: "something else" })).fields.purpose);
    assert.equal(run(good({ purpose: "" })).ok, true);
  });
  it("a one-day event with no slots needs no day or slot", () => {
    const event = ev({ startDate: "2026-12-02", endDate: "2026-12-02", booking: { slots: [], purposes: [], companyField: "optional" } });
    const r = run({ name: "Asha Rao", email: "a@b.co", phone: "9876543210", consent: true }, event);
    assert.equal(r.ok, true);
    assert.equal(r.value.date, "2026-12-02");
  });
  it("refuses when the event is closed or full, whatever the form says", () => {
    const ended = ev({ startDate: "2026-10-01", endDate: "2026-10-02" });
    const r = run(good(), ended);
    assert.equal(r.ok, false);
    assert.equal(r.status, 409);
    assert.equal(run(good(), ev({ booking: { capacity: 1, spotsLeft: 0, slots: ["10:00 AM to 12:00 PM"] } })).status, 409);
  });
  it("trims, caps and strips control characters", () => {
    const r = run(good({ name: "  Asha\u0000 Rao  ", message: "x".repeat(5000) }));
    assert.equal(r.value.name, "Asha Rao");
    assert.equal(r.value.message.length, 3000);
  });
  it("copes with garbage input", () => {
    assert.equal(run(null).ok, false);
    assert.equal(run("x").ok, false);
    assert.equal(run({ name: ["a"], email: 5 }).ok, false);
  });
});

describe("helpers", () => {
  it("location line", () => {
    assert.equal(locationLine(ev()), "Pragati Maidan, New Delhi");
    assert.equal(locationLine(ev({ venue: { name: "", city: "", country: "India" } })), "India");
  });
  it("card carries the status, date label and a bookable flag", () => {
    const c = toCard(ev(), TODAY);
    assert.equal(c.status, "upcoming");
    assert.equal(c.dateLabel, "02–04 Dec 2026");
    assert.equal(c.bookable, true);
    assert.equal(c.image.url, "/media/2026/10/c.jpg");
    assert.equal(toCard(ev({ media: { card: null, banner: raw().media.banner } }), TODAY).image.url, "/media/d.jpg");
  });
  it("search matches title, place, stall and category", () => {
    const c = toCard(ev(), TODAY);
    assert.ok(matchesQuery(c, "medicall"));
    assert.ok(matchesQuery(c, "delhi"));
    assert.ok(matchesQuery(c, "d2d3"));
    assert.ok(matchesQuery(c, "exhibition"));
    assert.ok(matchesQuery(c, "  "));
    assert.ok(!matchesQuery(c, "mumbai"));
  });
  it("Google Calendar link uses an exclusive end date", () => {
    const url = new URL(googleCalendarUrl(ev()));
    assert.equal(url.searchParams.get("dates"), "20261202/20261205");
    assert.equal(url.searchParams.get("text"), "Medicall Delhi 2026");
  });
});

describe("per-slot limits and availability", () => {
  it("slotState: unlimited, open with room left, full at the limit", () => {
    assert.deepEqual(slotState(0, 99), { full: false, left: null });
    assert.deepEqual(slotState(2, 0), { full: false, left: 2 });
    assert.deepEqual(slotState(2, 1), { full: false, left: 1 });
    assert.deepEqual(slotState(2, 2), { full: true, left: 0 });
    assert.deepEqual(slotState(2, 5), { full: true, left: 0 });
  });
  it("normalizeAvailability keeps valid days and counts, drops junk", () => {
    const a = normalizeAvailability({ eventId: 4, perSlotLimit: 2, counts: { "2026-12-02": { "10:00 AM to 10:30 AM": 2, bad: "x" }, nope: { a: 1 } }, spotsLeft: 3 });
    assert.equal(a.eventId, 4);
    assert.equal(a.counts["2026-12-02"]["10:00 AM to 10:30 AM"], 2);
    assert.equal(a.counts["2026-12-02"].bad, 0);
    assert.equal(a.counts.nope, undefined);
    assert.equal(a.spotsLeft, 3);
    assert.deepEqual(normalizeAvailability(null).counts, {});
    assert.equal(normalizeAvailability({}).spotsLeft, null);
  });
});

describe("form configuration per event", () => {
  const base = { name: "Asha Rao", email: "a@b.co", phone: "9876543210", consent: true, date: "2026-12-03", slot: "10:00 AM to 12:00 PM" };
  const mk = (booking) => ev({ booking: { slots: ["10:00 AM to 12:00 PM"], purposes: [], ...booking } });

  it("company can be required, optional or hidden", () => {
    assert.ok(validateBooking(base, mk({ companyField: "required" }), TODAY).fields.company);
    assert.equal(validateBooking(base, mk({ companyField: "optional" }), TODAY).ok, true);
    const hidden = validateBooking({ ...base, company: "Sneaky" }, mk({ companyField: "hidden" }), TODAY);
    assert.equal(hidden.ok, true);
    assert.equal(hidden.value.company, "");
  });
  it("a hidden message box drops whatever was sent", () => {
    const r = validateBooking({ ...base, message: "hi" }, mk({ companyField: "optional", messageField: "hidden" }), TODAY);
    assert.equal(r.value.message, "");
  });
  it("extra questions: required, select choices, numbers and tick boxes are enforced", () => {
    const extraFields = [
      { key: "size", label: "Hospital size", type: "select", required: true, options: ["Small", "Large"] },
      { key: "beds", label: "Beds", type: "number", required: false, options: [] },
      { key: "agree", label: "Call me", type: "checkbox", required: true, options: [] },
      { key: "note", label: "Note", type: "textarea", required: false, options: [] },
    ];
    const event = mk({ companyField: "optional", extraFields });
    const bad = validateBooking({ ...base, extra: { size: "Huge", beds: "many" } }, event, TODAY);
    assert.equal(bad.ok, false);
    assert.ok(bad.fields["extra.size"]);
    assert.ok(bad.fields["extra.beds"]);
    assert.ok(bad.fields["extra.agree"]);
    const good = validateBooking({ ...base, extra: { size: "Large", beds: "120", agree: "yes", note: "x", unknown: "dropped" } }, event, TODAY);
    assert.equal(good.ok, true);
    assert.deepEqual(good.value.extra, { size: "Large", beds: "120", agree: "Yes", note: "x" });
  });
  it("normalizeEvent keeps well-formed extra questions only", () => {
    const e = ev({ booking: { extraFields: [
      { key: "a", label: "A", type: "select", options: [] },
      { key: "a", label: "Duplicate", type: "text" },
      { key: "", label: "No key", type: "text" },
      { key: "b!", label: "B", type: "weird" },
    ] } });
    assert.deepEqual(e.booking.extraFields.map((f) => [f.key, f.type]), [["a", "text"], ["b", "text"]]);
  });
});
