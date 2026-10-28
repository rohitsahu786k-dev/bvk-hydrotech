import { NextResponse } from "next/server";
import { validateBooking } from "@/lib/events/booking";
import { wordpressOrigin } from "@/lib/site";
import { getEventsData } from "@/lib/wordpress/events";

/**
 * Appointment booking for an event.
 *
 * Every submission is checked here against the event's own settings (open
 * days, time slots, topics, required questions), then handed to WordPress,
 * which stores it, enforces the per-slot limit under a lock, and emails the
 * team and the visitor. WordPress is only called with the application password
 * held here on the server; a visitor's browser never talks to it directly.
 *
 * Nothing is accepted silently: if the booking cannot be saved the visitor is
 * told, and given a phone number to use instead, rather than being shown a
 * success that never reached anyone.
 *
 * CRM hand-off (Zoho) belongs here, after WordPress confirms, once its webhook
 * address is available.
 */

const BOOKINGS_URL =
  process.env.WORDPRESS_EVENT_BOOKINGS_URL || `${wordpressOrigin()}/wp-json/bvk/v1/event-bookings`;

/** Best-effort throttle: five bookings per address per ten minutes (adjustable). */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = Number(process.env.EVENT_BOOKING_MAX_PER_WINDOW) || 5;
const hits = new Map<string, number[]>();

function throttled(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const key of hits.keys()) if (hits.size > 2500) hits.delete(key);
  return recent.length > MAX_PER_WINDOW;
}

const fail = (error: string, status: number, extra: Record<string, unknown> = {}) =>
  NextResponse.json({ ok: false, error, ...extra }, { status });

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return fail("Malformed submission.", 400);
  }

  const now = Date.now();

  // Honeypot, and a form filled in faster than a person could. Answer as if
  // accepted so a bot learns nothing.
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  if ((typeof body.website === "string" && body.website.trim()) || (startedAt && now - startedAt < 1500)) {
    return NextResponse.json({ ok: true, code: "", date: "", slot: "" });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (throttled(ip, now)) return fail("Too many requests. Please try again in a few minutes.", 429);

  const eventId = Number(body.eventId);
  const data = await getEventsData();
  if (!data.ok) return fail("Booking is temporarily unavailable. Please try again shortly.", 503);
  const event = data.events.find((e) => e.id === eventId);
  if (!event) return fail("That event could not be found.", 404);

  const result = validateBooking(body, event, data.today);
  if (!result.ok) return fail(result.error, result.status, result.fields ? { fields: result.fields } : {});

  const user = process.env.WORDPRESS_USERNAME;
  const password = process.env.WORDPRESS_APP_PASSWORD;
  if (!user || !password) {
    console.error("[event-booking] WORDPRESS_USERNAME / WORDPRESS_APP_PASSWORD are not set; booking not saved.");
    const phone = event.contact.phone ? ` Please call ${event.contact.phone}.` : "";
    return fail(`Online booking is temporarily unavailable.${phone}`, 503);
  }

  let response: Response;
  try {
    response = await fetch(BOOKINGS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${user}:${password}`).toString("base64")}`,
      },
      body: JSON.stringify(result.value),
      cache: "no-store",
    });
  } catch (error) {
    console.error("[event-booking] WordPress unreachable:", error);
    return fail("We could not save your booking. Please try again, or call us.", 502);
  }

  const payload = (await response.json().catch(() => null)) as {
    ok?: boolean;
    code?: string;
    date?: string;
    slot?: string;
    message?: string;
    data?: { status?: number };
  } | null;

  if (response.ok && payload?.ok) {
    return NextResponse.json({
      ok: true,
      code: payload.code ?? "",
      date: payload.date ?? result.value.date,
      slot: payload.slot ?? result.value.slot,
    });
  }

  // A rule WordPress enforces (slot just taken, bookings closed, ...) is the visitor's to fix.
  const status = payload?.data?.status ?? response.status;
  if ([400, 404, 409].includes(status)) return fail(payload?.message || "Your booking could not be saved.", status);

  console.error("[event-booking] WordPress rejected the booking:", response.status, payload);
  return fail("We could not save your booking. Please try again, or call us.", 502);
}
