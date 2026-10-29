import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react";
import FaqAccordion from "@/components/sections/FaqAccordion";
import type { EventImage, EventSections } from "@/lib/events/types";
import EventGallery from "./EventGallery";

/**
 * The content bands of the event page below the main details: what awaits the
 * visitor, the solutions on display, a short company introduction, photos from
 * earlier fairs, client logos, a video, the team and the questions. Each is
 * authored in "Event Page Sections" and is simply absent when hidden or empty.
 */

const isExternal = (url: string) => /^https?:\/\//i.test(url);

function Heading({
  eyebrow,
  heading,
  intro,
  tone = "light",
  center = false,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  tone?: "light" | "dark";
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <p className={`eyebrow ${tone === "dark" ? "text-brand" : "text-brand-deep"}`}>{eyebrow}</p>}
      <h2 className={`display-section pt-3 text-balance ${tone === "dark" ? "text-white" : "text-ink"}`}>{heading}</h2>
      {intro && (
        <p className={`pt-4 leading-relaxed ${tone === "dark" ? "text-on-dark-muted" : "text-grey"}`}>{intro}</p>
      )}
    </div>
  );
}

function Picture({ image, sizes, className = "" }: { image: EventImage; sizes: string; className?: string }) {
  return (
    <Image src={image.url} alt={image.alt} fill sizes={sizes} className={`object-cover ${className}`} />
  );
}

export function EventAwaits({ section }: { section: EventSections["awaits"] }) {
  if (!section.show) return null;
  return (
    <section aria-labelledby="awaits-heading" className="section bg-surface-raised">
      <div className="shell">
        <Heading eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]">
          {section.items.map((item, i) => (
            <li key={`${item.title}-${i}`} className="overflow-hidden rounded-lg border border-hairline bg-surface">
              {item.image && (
                <div className="relative aspect-[16/10] bg-white">
                  <Picture image={item.image} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
                </div>
              )}
              <div className="p-6">
                <h3 className="font-display text-lg text-ink">{item.title}</h3>
                {item.text && <p className="pt-2 leading-relaxed text-grey">{item.text}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function EventSolutions({ section }: { section: EventSections["solutions"] }) {
  if (!section.show) return null;
  return (
    <section aria-label={section.heading} className="section bg-surface">
      <div className="shell">
        <Heading eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
          {section.items.map((item, i) => (
            <li key={`${item.title}-${i}`}>
              <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-surface transition duration-300 hover:-translate-y-1 hover:border-brand-deep/40 hover:shadow-[0_24px_40px_-26px_rgb(0_0_0/0.35)]">
                {item.image && (
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    <Picture
                      image={item.image}
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg text-ink">{item.title}</h3>
                  {item.text && <p className="flex-1 pt-2 text-sm leading-relaxed text-grey">{item.text}</p>}
                  {item.linkUrl &&
                    (isExternal(item.linkUrl) ? (
                      <a
                        href={item.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand-deep"
                      >
                        {item.linkLabel || "Learn more"}
                        <ArrowUpRight aria-hidden className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link href={item.linkUrl} className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand-deep">
                        {item.linkLabel || "Learn more"}
                        <ArrowUpRight aria-hidden className="h-4 w-4" />
                      </Link>
                    ))}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function EventVideo({ section }: { section: EventSections["video"] }) {
  if (!section.show || !section.video) return null;
  return (
    <section aria-label={section.heading} className="section bg-surface-raised">
      <div className="shell">
        <Heading eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} center />
        <div className="relative mx-auto mt-10 aspect-video max-w-4xl overflow-hidden rounded-lg border border-hairline bg-ink">
          <iframe
            title={section.heading}
            src={section.video.src}
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}

export function EventAbout({ section }: { section: EventSections["about"] }) {
  if (!section.show) return null;
  return (
    <section aria-label={section.heading || "About BVK Hydrotech"} className="on-ink bg-ink">
      <div className="shell grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div>
          <Heading eyebrow={section.eyebrow} heading={section.heading} tone="dark" />
          {section.textHtml.trim() && (
            <div className="rich-text pt-5 text-on-dark-muted" dangerouslySetInnerHTML={{ __html: section.textHtml }} />
          )}
          {section.stats.length > 0 && (
            <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {section.stats.map((stat, i) => (
                <div key={`${stat.label}-${i}`}>
                  <dt className="font-display text-3xl text-brand">{stat.number}</dt>
                  <dd className="pt-1 text-sm text-on-dark-muted">{stat.label}</dd>
                </div>
              ))}
            </dl>
          )}
          {section.linkUrl && section.linkLabel && (
            <Link href={section.linkUrl} className="btn btn-green group mt-8">
              {section.linkLabel}
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
        {section.image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/15">
            <Picture image={section.image} sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        )}
      </div>
    </section>
  );
}

export function EventPrevious({ section, title }: { section: EventSections["previous"]; title: string }) {
  if (!section.show) return null;
  return (
    <section aria-label={section.heading} className="section bg-surface">
      <div className="shell">
        <Heading eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
        <div className="mt-10">
          <EventGallery images={section.images} title={title} />
        </div>
      </div>
    </section>
  );
}

export function EventClients({ section }: { section: EventSections["clients"] }) {
  if (!section.show) return null;
  return (
    <section aria-label={section.heading} className="section bg-surface-raised">
      <div className="shell">
        <Heading eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} center />
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {section.images.map((logo, i) => (
            <li
              key={`${logo.url}-${i}`}
              className="relative flex aspect-[3/2] items-center justify-center rounded-lg border border-hairline bg-white p-5"
            >
              <Image
                src={logo.url}
                alt={logo.alt || "Client logo"}
                fill
                sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 45vw"
                className="object-contain p-5"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function EventTeam({ section }: { section: EventSections["team"] }) {
  if (!section.show) return null;
  return (
    <section aria-label={section.heading} className="section bg-surface">
      <div className="shell">
        <Heading eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
          {section.people.map((person, i) => (
            <li key={`${person.name}-${i}`} className="overflow-hidden rounded-lg border border-hairline bg-surface">
              {person.image && (
                <div className="relative aspect-square bg-white">
                  <Picture image={person.image} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw" />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-display text-lg text-ink">{person.name}</h3>
                {person.role && <p className="text-sm text-grey">{person.role}</p>}
                <ul className="mt-3 space-y-2 text-sm">
                  {person.phone && (
                    <li className="flex items-center gap-2">
                      <Phone aria-hidden className="h-4 w-4 text-brand-deep" />
                      <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="text-ink hover:text-brand-deep">
                        {person.phone}
                      </a>
                    </li>
                  )}
                  {person.email && (
                    <li className="flex items-center gap-2">
                      <Mail aria-hidden className="h-4 w-4 text-brand-deep" />
                      <a href={`mailto:${person.email}`} className="break-all text-ink hover:text-brand-deep">
                        {person.email}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function EventFaqs({ section }: { section: EventSections["faq"] }) {
  if (!section.show) return null;
  return (
    <FaqAccordion
      faqs={section.items.map((item) => ({
        question: item.question,
        answer: `<p>${escapeHtml(item.answer).replace(/\n+/g, "</p><p>")}</p>`,
      }))}
      eyebrow={section.eyebrow}
      title={section.heading}
      description={section.intro}
    />
  );
}
