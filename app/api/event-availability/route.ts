import { NextResponse } from "next/server";
import { normalizeAvailability } from "@/lib/events/normalize";
import { wordpressOrigin } from "@/lib/site";

/**
 * Live seat counts for one event's time slots.
 *
 * Event pages are cached for a few minutes, but a slot that has just filled up
 * must show as Full straight away, so this is read fresh from WordPress on
 * every call and never cached. WordPress re-checks the limit when a booking is
 * actually saved, so this only drives what the form shows.
 */
const ENDPOINT =
  process.env.WORDPRESS_EVENT_AVAILABILITY_URL || `${wordpressOrigin()}/wp-json/bvk/v1/event-availability`;

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const id = Number(new URL(request.url).searchParams.get("event"));
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: "Unknown event." }, { status: 400 });
  }

  try {
    const response = await fetch(`${ENDPOINT}?event=${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) {
      return NextResponse.json({ ok: false }, { status: response.status === 404 ? 404 : 502 });
    }
    return NextResponse.json(
      { ok: true, ...normalizeAvailability(await response.json()) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[event-availability] failed:", error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
