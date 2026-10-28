"use client";

import { useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { matchesQuery, tabOf, type DirectoryTab } from "@/lib/events/logic";
import type { EventCardData, EventCategory } from "@/lib/events/types";
import EventCard from "./EventCard";
import EventQuickView from "./EventQuickView";

const PAGE = 9;

/**
 * The filterable list: All / Upcoming / Previous, a category filter and a
 * search box. The cards arrive already ordered (upcoming first), so filtering
 * only ever removes from that order.
 */
export default function EventsDirectory({
  events,
  categories,
  settings,
}: {
  events: EventCardData[];
  categories: EventCategory[];
  settings: { eyebrow: string; title: string; text: string; empty: string; search: boolean };
}) {
  const [tab, setTab] = useState<DirectoryTab>("all");
  const [category, setCategory] = useState<string>("");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);
  const [preview, setPreview] = useState<EventCardData | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const counts = useMemo(() => {
    const upcoming = events.filter((e) => tabOf(e.status) === "upcoming").length;
    return { all: events.length, upcoming, previous: events.length - upcoming };
  }, [events]);

  const filtered = useMemo(
    () =>
      events.filter(
        (e) =>
          (tab === "all" || tabOf(e.status) === tab) &&
          (!category || e.categories.some((c) => c.slug === category)) &&
          matchesQuery(e, query),
      ),
    [events, tab, category, query],
  );

  // Any change of filter starts again from the first page of results.
  const choose = <T,>(setter: (value: T) => void) => (value: T) => {
    setter(value);
    setShown(PAGE);
  };

  const tabs: { id: DirectoryTab; label: string }[] = [
    { id: "all", label: "All events" },
    { id: "upcoming", label: "Upcoming" },
    { id: "previous", label: "Previous" },
  ];

  const visible = filtered.slice(0, shown);

  return (
    <section id="directory" aria-labelledby="directory-heading" className="section scroll-mt-24 bg-surface">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            {settings.eyebrow && <p className="eyebrow text-brand-deep">{settings.eyebrow}</p>}
            <h2 id="directory-heading" className="display-section pt-3 text-ink">
              {settings.title}
            </h2>
            {settings.text && <p className="pt-4 text-grey">{settings.text}</p>}
          </div>

          <div role="tablist" aria-label="Show events" className="inline-flex w-fit rounded-full border border-hairline bg-surface-raised p-1">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                onClick={() => choose(setTab)(id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  tab === id ? "bg-brand-deep text-white" : "text-grey hover:text-brand-deep"
                }`}
              >
                {label} <span className="opacity-70">({counts[id]})</span>
              </button>
            ))}
          </div>
        </div>

        {(settings.search || categories.length > 0) && (
          <div className="mt-8 flex flex-col gap-4 border-y border-hairline py-4 md:flex-row md:items-center md:justify-between">
            {categories.length > 0 ? (
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                {[{ slug: "", name: "All categories" }, ...categories].map((c) => (
                  <button
                    key={c.slug || "all"}
                    type="button"
                    aria-pressed={category === c.slug}
                    onClick={() => choose(setCategory)(c.slug)}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                      category === c.slug
                        ? "border-brand-deep bg-brand-wash text-brand-deep"
                        : "border-hairline text-grey hover:border-brand-deep hover:text-brand-deep"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            ) : (
              <span />
            )}

            {settings.search && (
              <label className="relative block md:w-72">
                <span className="sr-only">Search events</span>
                <Search aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grey-soft" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => choose(setQuery)(e.target.value)}
                  placeholder="Search by name, city or stall"
                  className="field !pl-10"
                />
              </label>
            )}
          </div>
        )}

        <p className="sr-only" role="status" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "event" : "events"} shown
        </p>

        {filtered.length === 0 ? (
          <div className="mt-12">
            <p className="rounded-lg border border-dashed border-hairline p-10 text-center text-grey">{settings.empty}</p>
          </div>
        ) : (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((event, i) => (
              <li key={event.id}>
                <EventCard
                  event={event}
                  onPreview={(e) => {
                    opener.current = document.activeElement as HTMLElement | null;
                    setPreview(e);
                  }}
                  priority={i < 3}
                />
              </li>
            ))}
          </ul>
        )}

        {filtered.length > shown && (
          <div className="mt-10 text-center">
            <button type="button" onClick={() => setShown((n) => n + PAGE)} className="btn btn-outline-dark">
              Show more events ({filtered.length - shown} more)
            </button>
          </div>
        )}
      </div>

      <EventQuickView event={preview} onClose={() => setPreview(null)} returnFocusTo={opener} />
    </section>
  );
}
