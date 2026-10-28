import { BOOKING_CLOSED_TEXT, bookingDates, bookingState } from "./logic";
import type { BookingPayload, EventItem } from "./types";

/**
 * Validates an appointment request against the event it is for. Runs on the
 * server for every submission, so nothing the browser sends is trusted: the
 * day, time slot and topic must be ones the event actually offers.
 */

export type BookingResult =
  | { ok: true; value: BookingPayload }
  | { ok: false; status: number; error: string; fields?: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (value: unknown, max: number): string =>
  typeof value === "string" ? value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, max) : "";

export function validateBooking(raw: unknown, event: EventItem, today: string): BookingResult {
  const input = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};

  const state = bookingState(event, today);
  if (!state.open) {
    return { ok: false, status: 409, error: BOOKING_CLOSED_TEXT[state.reason ?? "closed"] };
  }

  const fields: Record<string, string> = {};

  const name = text(input.name, 120);
  if (name.length < 2) fields.name = "Please enter your name.";

  const email = text(input.email, 254);
  if (!EMAIL_RE.test(email)) fields.email = "That email address does not look right.";

  const phone = text(input.phone, 40);
  const digits = phone.replace(/\D/g, "");
  if (!/^[0-9+()\-.\s]+$/.test(phone) || digits.length < 7 || digits.length > 15) {
    fields.phone = "Please enter a valid phone number.";
  }

  if (input.consent !== true) fields.consent = "Please confirm the privacy consent.";

  const dates = bookingDates(event, today);
  const date = text(input.date, 10);
  if (dates.length > 1 && !date) fields.date = "Please choose a day.";
  else if (date && !dates.includes(date)) fields.date = "That day is not available.";

  const slot = text(input.slot, 120);
  if (event.booking.slots.length > 0) {
    if (!slot) fields.slot = "Please choose a time slot.";
    else if (!event.booking.slots.includes(slot)) fields.slot = "That time slot is not available.";
  }

  const purpose = text(input.purpose, 160);
  if (purpose && event.booking.purposes.length > 0 && !event.booking.purposes.includes(purpose)) {
    fields.purpose = "Please choose one of the listed topics.";
  }

  const company = text(input.company, 160);
  if (event.booking.companyField === "required" && !company) fields.company = "Please enter your company or organisation.";

  const message = event.booking.messageField === "hidden" ? "" : text(input.message, 3000);

  // The event's own extra questions.
  const extraIn = input.extra && typeof input.extra === "object" ? (input.extra as Record<string, unknown>) : {};
  const extra: Record<string, string> = {};
  for (const field of event.booking.extraFields) {
    const raw = text(extraIn[field.key], field.type === "textarea" ? 1500 : 300);
    const value = field.type === "checkbox" ? (/^(yes|1|true|on)$/i.test(raw) ? "Yes" : "") : raw;
    const slotKey = `extra.${field.key}`;
    if (value && field.type === "number" && !/^-?\d+(\.\d+)?$/.test(value)) fields[slotKey] = "Please enter a number.";
    else if (value && field.type === "select" && !field.options.includes(value)) fields[slotKey] = "Please choose one of the listed answers.";
    else if (field.required && !value) fields[slotKey] = field.type === "checkbox" ? "Please tick this box." : "This field is required.";
    if (value) extra[field.key] = value;
  }

  if (Object.keys(fields).length > 0) {
    return { ok: false, status: 400, error: "Please check the highlighted fields.", fields };
  }

  return {
    ok: true,
    value: {
      eventId: event.id,
      name,
      company: event.booking.companyField === "hidden" ? "" : company,
      email,
      phone,
      // A one-day event needs no choice: record its day.
      date: date || (dates.length === 1 ? dates[0] : ""),
      slot,
      purpose,
      message,
      extra,
      source: text(input.source, 300),
      landingPage: text(input.landingPage, 300),
    },
  };
}
