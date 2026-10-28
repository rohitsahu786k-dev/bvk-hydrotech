import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, CalendarDays, MapPin, Phone } from "lucide-react";
import type { EventCardData } from "@/lib/events/types";
import EventStatusBadge from "./EventStatusBadge";

/**
 * The large panel at the top of the list: a featured event, else the next one
 * coming up. Dark panel with the brand green, like the site's other feature bands.
 */
export default function EventSpotlight({ event }: { event: EventCardData }) {
  const href = `/events/${event.slug}`;

  return (
    <section aria-label="Featured event" className="bg-surface pt-8 lg:pt-12">
      <div className="shell">
        <div className="on-ink relative isolate overflow-hidden rounded-lg bg-gradient-to-br from-ink via-ink-raised to-brand-dim p-6 sm:p-10 lg:p-12">
          <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-brand/15 blur-3xl" />

          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <EventStatusBadge status={event.status} />
                {event.booth && (
                  <span className="rounded-full border border-white/25 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-white">
                    Stall {event.booth}
                  </span>
                )}
              </div>

              <h2 className="display-section pt-5 text-balance text-white">{event.title}</h2>

              <ul className="mt-5 grid gap-2 text-on-dark-muted">
                <li className="flex items-center gap-2.5">
                  <CalendarDays aria-hidden className="h-4 w-4 shrink-0 text-brand" />
                  {event.dateLabel}
                  {event.timeText ? ` · ${event.timeText}` : ""}
                </li>
                {event.location && (
                  <li className="flex items-start gap-2.5">
                    <MapPin aria-hidden className="mt-1 h-4 w-4 shrink-0 text-brand" />
                    {event.location}
                  </li>
                )}
              </ul>

              {event.summary && (
                <p className="pt-5 max-w-xl leading-relaxed text-on-dark-muted">{event.summary}</p>
              )}

              {event.highlights.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {event.highlights.map((item) => (
                    <li key={item} className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={href} className="btn btn-solid group">
                  Discover more
                  <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                {event.bookable && (
                  <Link href={`${href}#book`} className="btn btn-outline-light">
                    <CalendarCheck aria-hidden className="h-4 w-4" />
                    Book an appointment
                  </Link>
                )}
                {event.phone && (
                  <a href={`tel:${event.phone.replace(/\s/g, "")}`} className="btn btn-outline-light">
                    <Phone aria-hidden className="h-4 w-4" />
                    Call direct
                  </a>
                )}
              </div>
            </div>

            <Link
              href={href}
              tabIndex={-1}
              aria-hidden
              className="relative block aspect-[4/3] overflow-hidden rounded-md border border-white/15 bg-ink shadow-2xl"
            >
              {event.image && (
                <Image
                  src={event.image.url}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              )}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
