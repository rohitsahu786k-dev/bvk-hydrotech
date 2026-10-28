"use client";

import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, CalendarDays, CalendarCheck, Clock, MapPin, Phone, X } from "lucide-react";
import type { EventCardData } from "@/lib/events/types";
import EventStatusBadge from "./EventStatusBadge";
import styles from "./Events.module.css";

/** A quick look at an event without leaving the list. */
export default function EventQuickView({
  event,
  onClose,
  returnFocusTo,
}: {
  event: EventCardData | null;
  onClose: () => void;
  /** The button that opened it. Radix only restores focus to a Dialog.Trigger, and this is opened from state. */
  returnFocusTo?: { current: HTMLElement | null };
}) {
  return (
    <Dialog.Root open={event !== null} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          className={styles.dialog}
          aria-describedby={event ? "quick-summary" : undefined}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            returnFocusTo?.current?.focus();
          }}
        >
          {event && (
            <>
              <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg bg-ink">
                {event.image && (
                  <Image src={event.image.url} alt="" fill sizes="704px" className="object-cover" />
                )}
                <span className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <EventStatusBadge status={event.status} />
                  {event.booth && (
                    <span className="rounded-full bg-white/90 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-ink">
                      Stall {event.booth}
                    </span>
                  )}
                </span>
              </div>

              <Dialog.Close
                aria-label="Close preview"
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-ink/65 text-white transition-colors hover:bg-ink/85"
              >
                <X aria-hidden className="h-5 w-5" />
              </Dialog.Close>

              <div className="p-6 sm:p-8">
                <Dialog.Title className="font-display text-2xl leading-tight text-ink sm:text-3xl">
                  {event.title}
                </Dialog.Title>

                <ul className="mt-4 grid gap-2 text-sm text-grey">
                  <li className="flex items-center gap-2">
                    <CalendarDays aria-hidden className="h-4 w-4 text-brand-deep" />
                    {event.dateLabel}
                  </li>
                  {event.timeText && (
                    <li className="flex items-center gap-2">
                      <Clock aria-hidden className="h-4 w-4 text-brand-deep" />
                      {event.timeText}
                    </li>
                  )}
                  {event.location && (
                    <li className="flex items-start gap-2">
                      <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep" />
                      {event.location}
                    </li>
                  )}
                </ul>

                {event.summary && (
                  <Dialog.Description id="quick-summary" className="mt-5 leading-relaxed text-grey">
                    {event.summary}
                  </Dialog.Description>
                )}

                {event.highlights.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {event.highlights.map((item) => (
                      <li key={item} className="rounded-full border border-hairline bg-surface-raised px-3 py-1 text-xs font-medium text-ink">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={`/events/${event.slug}`} className="btn btn-green" onClick={onClose}>
                    View event details
                    <ArrowRight aria-hidden className="h-4 w-4" />
                  </Link>
                  {event.bookable && (
                    <Link href={`/events/${event.slug}#book`} className="btn btn-outline-dark" onClick={onClose}>
                      <CalendarCheck aria-hidden className="h-4 w-4" />
                      Book an appointment
                    </Link>
                  )}
                  {event.phone && (
                    <a href={`tel:${event.phone.replace(/\s/g, "")}`} className="btn btn-outline-dark">
                      <Phone aria-hidden className="h-4 w-4" />
                      Call
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
