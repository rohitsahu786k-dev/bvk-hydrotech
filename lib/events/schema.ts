import { organisationId, plainText } from "@/lib/seo/jsonLd";
import type { EventItem, EventStatus } from "./types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bvkhydrotech.com";

const absolute = (url: string) => (url.startsWith("/") ? `${siteUrl}${url}` : url);

const STATUS_URL: Record<EventStatus, string> = {
  upcoming: "https://schema.org/EventScheduled",
  ongoing: "https://schema.org/EventScheduled",
  concluded: "https://schema.org/EventScheduled",
  postponed: "https://schema.org/EventPostponed",
  cancelled: "https://schema.org/EventCancelled",
};

/** schema.org Event, so search engines can show the fair with its dates and place. */
export function eventSchema(event: EventItem, status: EventStatus): Record<string, unknown> {
  const image = event.media.card ?? event.media.banner.desktop ?? event.media.banner.mobile;
  const { venue } = event;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.summary || plainText(event.descriptionHtml).slice(0, 300),
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: STATUS_URL[status],
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: `${siteUrl}/events/${event.slug}`,
    image: image ? [absolute(image.url)] : undefined,
    location: {
      "@type": "Place",
      name: venue.name || venue.city || venue.country || event.title,
      address: {
        "@type": "PostalAddress",
        streetAddress: venue.address || undefined,
        addressLocality: venue.city || undefined,
        addressCountry: venue.country || undefined,
      },
    },
    organizer: { "@id": organisationId },
  };
}
