import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Home } from "lucide-react";
import BannerMedia from "@/components/events/BannerMedia";
import EventsCtaBand from "@/components/events/EventsCtaBand";
import EventsDirectory from "@/components/events/EventsDirectory";
import EventSpotlight from "@/components/events/EventSpotlight";
import EventsMarquee from "@/components/events/EventsMarquee";
import EventsStats from "@/components/events/EventsStats";
import { eventStatus, formatDateRange, isActive, locationLine, pickSpotlight, sortEvents, toCard } from "@/lib/events/logic";
import { OG_DEFAULT } from "@/lib/seo/defaults";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonLd";
import { assertEventsAvailable, getEventsData } from "@/lib/wordpress/events";

export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bvkhydrotech.com";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getEventsData();
  const title = settings.seo.title || `${settings.hero.title} | BVK Hydrotech`;
  const description =
    settings.seo.description ||
    settings.hero.subtitle ||
    "Meet BVK Hydrotech at trade fairs and conferences. See what we are showcasing and book a time with our engineers.";
  const image = settings.seo.image ?? settings.hero.banner.desktop;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/events" },
    openGraph: {
      type: "website",
      url: "/events",
      title,
      description,
      images: image ? [{ url: image.url, width: image.width || undefined, height: image.height || undefined }] : [OG_DEFAULT],
    },
  };
}

export default async function EventsPage() {
  const data = await getEventsData();
  assertEventsAvailable(data);

  const { settings, today } = data;
  const ordered = sortEvents(data.events, today);
  const cards = ordered.map((e) => toCard(e, today));

  const spotlight = settings.directory.spotlight ? pickSpotlight(data.events, today) : null;

  // Moving strip: the upcoming events, or the editor's own lines.
  const marquee =
    settings.marquee.mode === "off"
      ? []
      : settings.marquee.mode === "custom"
        ? settings.marquee.lines
        : ordered
            .filter((e) => isActive(eventStatus(e, today)))
            .slice(0, 6)
            .map((e) =>
              [
                eventStatus(e, today) === "ongoing" ? `Live now: ${e.title}` : `Meet us at ${e.title}`,
                formatDateRange(e.startDate, e.endDate),
                locationLine(e),
                e.booth ? `Stall ${e.booth}` : "",
              ]
                .filter(Boolean)
                .join(" · "),
            );

  const schemas = [
    breadcrumbSchema("Fairs & Events", "events"),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: settings.hero.title,
      itemListElement: ordered.slice(0, 20).map((e, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteUrl}/events/${e.slug}`,
        name: e.title,
      })),
    },
  ];

  const { hero } = settings;

  return (
    <>
      <JsonLd data={schemas} />

      <section className="on-ink relative isolate flex min-h-[56vh] flex-col justify-end overflow-hidden bg-ink pt-40 lg:min-h-[64vh] lg:pt-52">
        <BannerMedia banner={hero.banner} />

        {marquee.length > 0 && <EventsMarquee items={marquee} className="absolute inset-x-0 top-16 z-10 lg:top-[4.5rem]" />}

        <div className="shell">
          <div className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-on-dark-muted">
              <Link href="/" className="inline-flex items-center gap-1.5 hover:text-white">
                <Home aria-hidden className="h-3.5 w-3.5" />
                Home
              </Link>
              <ChevronRight aria-hidden className="h-3.5 w-3.5" />
              <span aria-current="page" className="text-white">
                {hero.title}
              </span>
            </nav>

            {hero.badge && <p className="eyebrow pt-6 text-brand">{hero.badge}</p>}
            <h1 className="display-section pt-4 text-balance text-white">{hero.title}</h1>
            {hero.subtitle && (
              <p className="pt-6 max-w-2xl text-base leading-relaxed text-on-dark-muted lg:text-lg">{hero.subtitle}</p>
            )}

            {cards.length > 0 && (
              <a href="#directory" className="btn btn-green group mt-9">
                Browse all events
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            )}
          </div>
        </div>

        <EventsStats stats={settings.stats} />
      </section>

      {spotlight && <EventSpotlight event={toCard(spotlight, today)} />}

      {cards.length > 0 ? (
        <EventsDirectory
          events={cards}
          categories={data.categories}
          settings={{
            eyebrow: settings.directory.eyebrow,
            title: settings.directory.title,
            text: settings.directory.text,
            empty: settings.directory.empty,
            search: settings.directory.search,
          }}
        />
      ) : (
        <section className="section bg-surface">
          <div className="shell">
            <p className="rounded-lg border border-dashed border-hairline p-12 text-center text-grey">
              Our upcoming fairs and events will be listed here soon.
            </p>
          </div>
        </section>
      )}

      <EventsCtaBand cta={settings.cta} />
    </>
  );
}
