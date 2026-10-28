import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Eye, MapPin } from "lucide-react";
import type { EventCardData } from "@/lib/events/types";
import EventStatusBadge from "./EventStatusBadge";

/**
 * One event on the list. Presentational on purpose, so the same card serves
 * the filterable directory (client) and the "more events" row (server). The
 * quick-preview button only appears when a handler is passed.
 */
export default function EventCard({
  event,
  onPreview,
  priority = false,
}: {
  event: EventCardData;
  onPreview?: (event: EventCardData) => void;
  priority?: boolean;
}) {
  const href = `/events/${event.slug}`;

  return (
    <article className="card-light group flex h-full flex-col overflow-hidden rounded-lg">
      <Link href={href} tabIndex={-1} aria-hidden className="relative block aspect-[3/2] overflow-hidden bg-ink">
        {event.image ? (
          <Image
            src={event.image.url}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ink via-ink-raised to-brand-dim">
            <CalendarDays aria-hidden className="h-12 w-12 text-white/40" />
          </span>
        )}

        <span className="absolute inset-x-0 top-0 flex flex-wrap items-center gap-2 bg-gradient-to-b from-ink/70 to-transparent p-3">
          <EventStatusBadge status={event.status} />
          {event.booth && (
            <span className="rounded-full bg-white/90 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-ink">
              Stall {event.booth}
            </span>
          )}
        </span>

        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          <CalendarDays aria-hidden className="h-3.5 w-3.5" />
          {event.dateLabel}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl leading-snug text-ink">
          <Link href={href} className="hover:text-brand-deep">
            {event.title}
          </Link>
        </h3>

        {event.location && (
          <p className="pt-2 flex items-start gap-2 text-sm text-grey">
            <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep" />
            {event.location}
          </p>
        )}

        {event.summary && <p className="pt-3 line-clamp-3 text-sm leading-relaxed text-grey">{event.summary}</p>}

        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-5">
          <Link href={href} className="btn btn-outline-dark !px-5 !py-2.5 flex-1 whitespace-nowrap">
            Discover more
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
          {onPreview && (
            <button
              type="button"
              onClick={() => onPreview(event)}
              aria-label={`Quick preview: ${event.title}`}
              className="btn btn-outline-dark !px-4 !py-2.5"
            >
              <Eye aria-hidden className="h-4 w-4" />
              Preview
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
