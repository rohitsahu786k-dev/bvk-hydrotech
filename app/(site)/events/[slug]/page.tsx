import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarCheck,
  CalendarDays,
  CalendarPlus,
  Check,
  ChevronRight,
  Clock,
  ExternalLink,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Store,
} from "lucide-react";
import BannerMedia from "@/components/events/BannerMedia";
import EventBookingForm from "@/components/events/EventBookingForm";
import EventCard from "@/components/events/EventCard";
import EventGallery from "@/components/events/EventGallery";
import EventsCtaBand from "@/components/events/EventsCtaBand";
import EventStatusBadge from "@/components/events/EventStatusBadge";
import {
  EventAbout,
  EventAwaits,
  EventClients,
  EventFaqs,
  EventPrevious,
  EventSolutions,
  EventTeam,
  EventVideo,
} from "@/components/events/EventSections";
import {
  BOOKING_CLOSED_TEXT,
  bookingDates,
  bookingState,
  eventStatus,
  formatDateRange,
  googleCalendarUrl,
  isActive,
  locationLine,
  sortEvents,
  toCard,
} from "@/lib/events/logic";
import { eventSchema } from "@/lib/events/schema";
import type { EventBanner } from "@/lib/events/types";
import { OG_DEFAULT } from "@/lib/seo/defaults";
import { JsonLd, faqSchema } from "@/lib/seo/jsonLd";
import { assertEventsAvailable, getEvent, getEventsData } from "@/lib/wordpress/events";

export const revalidate = 300;

type PageProps = { params: Promise<{ slug: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bvkhydrotech.com";

export async function generateStaticParams() {
  // New events are rendered on first visit and then cached, so this only needs
  // to cover what exists at build time.
  const data = await getEventsData();
  return data.events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { event } = await getEvent(slug);
  if (!event) return {};

  const title = event.seo.title || event.title;
  const description =
    event.seo.description ||
    event.summary ||
    `${event.title}, ${formatDateRange(event.startDate, event.endDate)}${locationLine(event) ? `, ${locationLine(event)}` : ""}. Meet BVK Hydrotech and book an appointment.`;
  const image = event.media.card ?? event.media.banner.desktop;

  return {
    title,
    description,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      type: "website",
      url: `/events/${event.slug}`,
      title,
      description,
      images: image ? [{ url: image.url, width: image.width || undefined, height: image.height || undefined }] : [OG_DEFAULT],
    },
  };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const { data, event } = await getEvent(slug);
  assertEventsAvailable(data);
  if (!event) notFound();

  const { today, settings } = data;
  const status = eventStatus(event, today);
  const state = bookingState(event, today);
  const dates = state.open ? bookingDates(event, today) : [];
  const { booking, contact, venue, sections } = event;

  // The banner falls back to the card photo, then to the brand pattern.
  const banner: EventBanner = {
    ...event.media.banner,
    desktop: event.media.banner.desktop ?? event.media.card,
  };

  const more = sortEvents(
    data.events.filter((e) => e.id !== event.id),
    today,
  )
    .filter((e) => isActive(eventStatus(e, today)))
    .concat(sortEvents(data.events.filter((e) => e.id !== event.id && !isActive(eventStatus(e, today))), today))
    .slice(0, 3)
    .map((e) => toCard(e, today));

  const dateLabel = formatDateRange(event.startDate, event.endDate);
  const place = locationLine(event);
  const tel = contact.phone.replace(/\s/g, "");
  const hasBookingSection = booking.enabled || Boolean(booking.externalUrl);

  const facts = [
    { icon: CalendarDays, label: "Date", value: dateLabel, note: event.timeText },
    { icon: MapPin, label: "Venue", value: venue.name || venue.city, note: venue.name ? venue.city : venue.country },
    { icon: Store, label: "Our stall", value: event.booth ? `Stall ${event.booth}` : "", note: event.hall },
    { icon: Building2, label: "Organiser", value: event.organizer, note: "" },
  ].filter((f) => f.value);

  const faqLd = sections.faq.show
    ? faqSchema(sections.faq.items.map((item) => ({ question: item.question, answer: item.answer })))
    : null;

  const schemas = [
    eventSchema(event, status),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: settings.hero.title, item: `${siteUrl}/events` },
        { "@type": "ListItem", position: 3, name: event.title, item: `${siteUrl}/events/${event.slug}` },
      ],
    },
    ...(faqLd ? [faqLd] : []),
  ];

  return (
    <>
      <JsonLd data={schemas} />

      {/* Banner */}
      <section className="on-ink relative isolate flex min-h-[60vh] items-end overflow-hidden bg-ink pb-20 pt-36 lg:min-h-[68vh] lg:pb-24 lg:pt-48">
        <BannerMedia banner={banner} />

        <div className="shell">
          <div className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-on-dark-muted">
              <Link href="/" className="inline-flex items-center gap-1.5 hover:text-white">
                <Home aria-hidden className="h-3.5 w-3.5" />
                Home
              </Link>
              <ChevronRight aria-hidden className="h-3.5 w-3.5" />
              <Link href="/events" className="hover:text-white">
                {settings.hero.title}
              </Link>
              <ChevronRight aria-hidden className="h-3.5 w-3.5" />
              <span aria-current="page" className="max-w-[16rem] truncate text-white">
                {event.title}
              </span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <EventStatusBadge status={status} />
              {event.categories.map((c) => (
                <span key={c.slug} className="rounded-full border border-white/25 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-white">
                  {c.name}
                </span>
              ))}
              {event.booth && (
                <span className="rounded-full bg-white/90 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-ink">
                  Stall {event.booth}
                </span>
              )}
            </div>

            <h1 className="display-section pt-5 text-balance text-white">{event.title}</h1>

            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-on-dark-muted">
              <li className="flex items-center gap-2">
                <CalendarDays aria-hidden className="h-4 w-4 text-brand" />
                {dateLabel}
              </li>
              {event.timeText && (
                <li className="flex items-center gap-2">
                  <Clock aria-hidden className="h-4 w-4 text-brand" />
                  {event.timeText}
                </li>
              )}
              {place && (
                <li className="flex items-center gap-2">
                  <MapPin aria-hidden className="h-4 w-4 text-brand" />
                  {place}
                </li>
              )}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              {state.open && (
                <a href="#book" className="btn btn-green group">
                  <CalendarCheck aria-hidden className="h-4 w-4" />
                  {booking.button}
                </a>
              )}
              {!state.open && booking.externalUrl && (
                <a href={booking.externalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-green">
                  {booking.externalLabel || "Register"}
                  <ExternalLink aria-hidden className="h-4 w-4" />
                </a>
              )}
              {venue.mapUrl && (
                <a href={venue.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
                  <MapPin aria-hidden className="h-4 w-4" />
                  Get directions
                </a>
              )}
              {contact.phone && (
                <a href={`tel:${tel}`} className="btn btn-outline-light">
                  <Phone aria-hidden className="h-4 w-4" />
                  Call us
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Key facts */}
      {sections.factsShow && facts.length > 0 && (
        <section aria-label="Event details" className="relative z-10 -mt-10">
          <ul className="shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map(({ icon: Icon, label, value, note }) => (
              <li key={label} className="flex items-start gap-4 rounded-lg border border-hairline bg-surface p-5 shadow-[0_18px_40px_-28px_rgb(0_0_0/0.45)]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-wash text-brand-deep">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-grey-mid">{label}</span>
                  <span className="mt-1 block font-display text-lg leading-snug text-ink">{value}</span>
                  {note && <span className="block text-sm text-grey">{note}</span>}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Details */}
      <section className="section bg-surface">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          <div className="min-w-0 space-y-14">
            {sections.overview.show && (event.descriptionHtml.trim() || event.summary) && (
              <div>
                <p className="eyebrow text-brand-deep">{sections.overview.eyebrow}</p>
                <h2 className="display-section pt-3 text-ink">{sections.overview.heading}</h2>
                {event.descriptionHtml.trim() ? (
                  <div className="rich-text mt-6" dangerouslySetInnerHTML={{ __html: event.descriptionHtml }} />
                ) : (
                  <p className="pt-6 leading-relaxed text-grey">{event.summary}</p>
                )}
              </div>
            )}

            {sections.stall.show && event.highlights.length > 0 && (
              <div>
                <p className="eyebrow text-brand-deep">{sections.stall.eyebrow}</p>
                <h2 className="display-section pt-3 text-ink">{sections.stall.heading}</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {event.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-md border border-hairline bg-surface-raised p-4">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-deep text-white">
                        <Check aria-hidden className="h-3 w-3" />
                      </span>
                      <span className="text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sections.agenda.show && event.agenda.length > 0 && (
              <div>
                <p className="eyebrow text-brand-deep">{sections.agenda.eyebrow}</p>
                <h2 className="display-section pt-3 text-ink">{sections.agenda.heading}</h2>
                <ol className="mt-6 space-y-0 border-l-2 border-hairline">
                  {event.agenda.map((item, i) => (
                    <li key={`${item.time}-${item.title}-${i}`} className="relative pb-7 pl-7 last:pb-0">
                      <span aria-hidden className="absolute -left-[0.4375rem] top-1.5 h-3 w-3 rounded-full border-2 border-brand-deep bg-surface" />
                      {item.time && <p className="text-sm font-semibold text-brand-deep">{item.time}</p>}
                      <p className="font-display text-lg text-ink">{item.title}</p>
                      {item.text && <p className="pt-1 text-grey">{item.text}</p>}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {sections.photos.show && event.gallery.length > 0 && (
              <div>
                <p className="eyebrow text-brand-deep">{sections.photos.eyebrow}</p>
                <h2 className="display-section pt-3 text-ink">{sections.photos.heading}</h2>
                <div className="mt-6">
                  <EventGallery images={event.gallery} title={event.title} />
                </div>
              </div>
            )}

            {sections.location.show && (venue.address || venue.mapEmbed) && (
              <div>
                <p className="eyebrow text-brand-deep">{sections.location.eyebrow}</p>
                <h2 className="display-section pt-3 text-ink">{sections.location.heading}</h2>
                {venue.address && <p className="pt-5 whitespace-pre-line text-grey">{[venue.name, venue.address].filter(Boolean).join("\n")}</p>}
                {venue.mapEmbed && (
                  <div className="mt-6 h-[22rem] overflow-hidden rounded-lg border border-hairline">
                    <iframe
                      title={`Map: ${venue.name || event.title}`}
                      src={venue.mapEmbed}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="block h-full w-full border-0"
                    />
                  </div>
                )}
                {venue.mapUrl && (
                  <a href={venue.mapUrl} target="_blank" rel="noopener noreferrer" className="group mt-4 inline-flex items-center gap-1.5 font-semibold text-brand-deep">
                    Open in Google Maps
                    <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            {sections.glanceShow && (
            <div className="rounded-lg border border-hairline bg-surface-raised p-6">
              <h2 className="font-display text-xl text-ink">At a glance</h2>
              <ul className="mt-4 space-y-3 text-sm text-grey">
                <li className="flex items-start gap-3">
                  <CalendarDays aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep" />
                  <span>{dateLabel}</span>
                </li>
                {event.timeText && (
                  <li className="flex items-start gap-3">
                    <Clock aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep" />
                    <span>{event.timeText}</span>
                  </li>
                )}
                {place && (
                  <li className="flex items-start gap-3">
                    <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep" />
                    <span>{place}</span>
                  </li>
                )}
              </ul>

              <div className="mt-6 grid gap-3">
                {state.open && (
                  <a href="#book" className="btn btn-green">
                    <CalendarCheck aria-hidden className="h-4 w-4" />
                    {booking.button}
                  </a>
                )}
                {isActive(status) && (
                  <a href={googleCalendarUrl(event)} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">
                    <CalendarPlus aria-hidden className="h-4 w-4" />
                    Add to calendar
                  </a>
                )}
                {event.websiteUrl && (
                  <a href={event.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">
                    <ExternalLink aria-hidden className="h-4 w-4" />
                    Event website
                  </a>
                )}
              </div>
            </div>
            )}

            {sections.contactShow && (contact.phone || contact.email || contact.whatsapp) && (
              <div className="rounded-lg border border-hairline bg-surface p-6">
                <h2 className="font-display text-xl text-ink">{contact.name ? `Talk to ${contact.name}` : "Talk to our team"}</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {contact.phone && (
                    <li className="flex items-center gap-3">
                      <Phone aria-hidden className="h-4 w-4 text-brand-deep" />
                      <a href={`tel:${tel}`} className="text-ink hover:text-brand-deep">{contact.phone}</a>
                    </li>
                  )}
                  {contact.whatsapp && (
                    <li className="flex items-center gap-3">
                      <MessageCircle aria-hidden className="h-4 w-4 text-brand-deep" />
                      <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-brand-deep">WhatsApp us</a>
                    </li>
                  )}
                  {contact.email && (
                    <li className="flex items-center gap-3">
                      <Mail aria-hidden className="h-4 w-4 text-brand-deep" />
                      <a href={`mailto:${contact.email}`} className="break-all text-ink hover:text-brand-deep">{contact.email}</a>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      <EventAwaits section={sections.awaits} />
      <EventSolutions section={sections.solutions} />
      <EventVideo section={sections.video} />
      <EventAbout section={sections.about} />
      <EventPrevious section={sections.previous} title={event.title} />
      <EventClients section={sections.clients} />
      <EventTeam section={sections.team} />

      {/* Booking */}
      {hasBookingSection && (
        <section id="book" aria-labelledby="book-heading" className="scroll-mt-24 bg-surface-raised py-16 lg:py-24">
          <div className="shell">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-hairline bg-surface shadow-[0_24px_60px_-30px_rgb(0_0_0/0.35)]">
              <div className="border-b border-hairline px-6 py-7 sm:px-10">
                <p className="eyebrow text-brand-deep">Book your visit</p>
                <h2 id="book-heading" className="display-section pt-3 text-ink">
                  {booking.heading}
                </h2>
                {booking.intro && <p className="pt-3 max-w-2xl text-grey">{booking.intro}</p>}
              </div>

              {state.open ? (
                <div className="pt-7">
                  <EventBookingForm
                    eventId={event.id}
                    title={event.title}
                    dates={dates}
                    booking={{
                      heading: booking.heading,
                      intro: booking.intro,
                      button: booking.button,
                      slots: booking.slots,
                      perSlotLimit: booking.perSlotLimit,
                      companyField: booking.companyField,
                      messageField: booking.messageField,
                      extraFields: booking.extraFields,
                      purposes: booking.purposes,
                      success: booking.success,
                    }}
                    spotsLeft={booking.spotsLeft}
                    calendarUrl={googleCalendarUrl(event)}
                  />
                </div>
              ) : (
                <div className="px-6 py-10 text-center sm:px-10">
                  <div className="mx-auto max-w-xl">
                    <p className="text-grey">{BOOKING_CLOSED_TEXT[state.reason ?? "closed"]}</p>
                  </div>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    {booking.externalUrl && (
                      <a href={booking.externalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-green">
                        {booking.externalLabel || "Register"}
                        <ExternalLink aria-hidden className="h-4 w-4" />
                      </a>
                    )}
                    {contact.phone && (
                      <a href={`tel:${tel}`} className="btn btn-outline-dark">
                        <Phone aria-hidden className="h-4 w-4" />
                        Call {contact.phone}
                      </a>
                    )}
                    <Link href="/contact" className="btn btn-outline-dark">
                      Contact us
                    </Link>
                  </div>
                </div>
              )}

              {state.open && booking.externalUrl && (
                <p className="border-t border-hairline px-6 py-5 text-center text-sm text-grey sm:px-10">
                  Prefer to register with the organiser?{" "}
                  <a href={booking.externalUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-deep underline underline-offset-4">
                    {booking.externalLabel || "Register here"}
                  </a>
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      <EventFaqs section={sections.faq} />

      {/* More events */}
      {sections.more.show && more.length > 0 && (
        <section aria-labelledby="more-heading" className="section bg-surface">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-brand-deep">{sections.more.eyebrow}</p>
                <h2 id="more-heading" className="display-section pt-3 text-ink">{sections.more.heading}</h2>
              </div>
              <Link href="/events" className="group inline-flex items-center gap-1.5 font-semibold text-brand-deep">
                View all events
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((card) => (
                <li key={card.id}>
                  <EventCard event={card} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <EventsCtaBand cta={settings.cta} />
    </>
  );
}
