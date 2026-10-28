import Link from "next/link";
import { ArrowRight, Mail, Phone, ShieldCheck } from "lucide-react";
import type { EventsSettings } from "@/lib/events/types";

/** Closing band: the question, two buttons and a direct line to the team. */
export default function EventsCtaBand({ cta }: { cta: EventsSettings["cta"] }) {
  const hasContact = Boolean(cta.phone || cta.email || cta.note);

  return (
    <section aria-labelledby="events-cta" className="bg-surface pb-16 lg:pb-24">
      <div className="shell">
        <div className="on-ink relative isolate overflow-hidden rounded-lg bg-gradient-to-br from-ink via-ink-raised to-brand-dim p-6 sm:p-10 lg:p-14">
          <div aria-hidden className="absolute -bottom-24 -left-24 -z-10 h-80 w-80 rounded-full bg-brand/15 blur-3xl" />

          <div className={`grid items-center gap-10 ${hasContact ? "lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]" : ""}`}>
            <div>
              {cta.badge && <p className="eyebrow text-brand">{cta.badge}</p>}
              <h2 id="events-cta" className="display-section pt-4 text-balance text-white">
                {cta.title}
              </h2>
              {cta.text && <p className="pt-5 max-w-xl leading-relaxed text-on-dark-muted">{cta.text}</p>}

              {(cta.button1.text || cta.button2.text) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {cta.button1.text && (
                    <Link href={cta.button1.url} className="btn btn-solid group">
                      {cta.button1.text}
                      <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                  {cta.button2.text && (
                    <Link href={cta.button2.url} className="btn btn-outline-light">
                      {cta.button2.text}
                    </Link>
                  )}
                </div>
              )}
            </div>

            {hasContact && (
              <div className="rounded-lg border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
                <ul className="grid gap-5">
                  {cta.phone && (
                    <li className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white/10">
                        <Phone aria-hidden className="h-5 w-5 text-brand" />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-wider text-on-dark-faint">Direct line</span>
                        <a href={`tel:${cta.phone.replace(/\s/g, "")}`} className="font-display text-lg text-white hover:text-brand">
                          {cta.phone}
                        </a>
                      </span>
                    </li>
                  )}
                  {cta.email && (
                    <li className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white/10">
                        <Mail aria-hidden className="h-5 w-5 text-brand" />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-wider text-on-dark-faint">Email</span>
                        <a href={`mailto:${cta.email}`} className="font-display text-lg text-white hover:text-brand">
                          {cta.email}
                        </a>
                      </span>
                    </li>
                  )}
                </ul>
                {cta.note && (
                  <div className="mt-6">
                    <p className="flex items-center gap-2 border-t border-white/10 pt-4 text-sm text-on-dark-muted">
                      <ShieldCheck aria-hidden className="h-4 w-4 shrink-0 text-brand" />
                      {cta.note}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
