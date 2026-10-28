"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AlertCircle, CalendarPlus, Check, Loader2, Send } from "lucide-react";
import { formatDayOption, formatLongDate, slotState } from "@/lib/events/logic";
import type { EventAvailability, EventBooking } from "@/lib/events/types";

type Config = Pick<
  EventBooking,
  "heading" | "intro" | "button" | "slots" | "perSlotLimit" | "companyField" | "messageField" | "extraFields" | "purposes" | "success"
>;

export interface BookingFormProps {
  eventId: number;
  title: string;
  /** The days a visitor can book, already limited to open days. */
  dates: string[];
  booking: Config;
  spotsLeft: number | null;
  calendarUrl: string;
}

type Phase = "idle" | "submitting" | "done";

interface Confirmation {
  code: string;
  date: string;
  slot: string;
}

const emptyDetails = { name: "", phone: "", email: "", company: "", purpose: "", message: "" };

/**
 * The appointment form for one event. Every question on it comes from that
 * event's settings in WordPress: which days are open, how the time slots are
 * cut, how many visitors each slot takes, and which fields are asked.
 *
 * Seat counts are read live, so a slot someone else just took shows as Full
 * without a page reload. The server checks everything again on submit.
 */
export default function EventBookingForm({ eventId, title, dates, booking, spotsLeft, calendarUrl }: BookingFormProps) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const singleDay = dates.length === 1;
  const hasSlots = booking.slots.length > 0;

  const [date, setDate] = useState(singleDay ? dates[0] : "");
  const [slot, setSlot] = useState("");
  const [details, setDetails] = useState(emptyDetails);
  const [extra, setExtra] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<Confirmation | null>(null);
  const [availability, setAvailability] = useState<EventAvailability | null>(null);

  const startedAt = useRef(0);
  const doneRef = useRef<HTMLDivElement>(null);

  const loadAvailability = useCallback(async () => {
    try {
      const response = await fetch(`/api/event-availability?event=${eventId}`, { cache: "no-store" });
      if (!response.ok) return;
      setAvailability((await response.json()) as EventAvailability);
    } catch {
      /* Without counts every slot simply looks open; the server still enforces the limit. */
    }
  }, [eventId]);

  useEffect(() => {
    startedAt.current = Date.now();
    const first = window.setTimeout(() => void loadAvailability(), 0);
    // Come back to the tab, see fresh seats.
    const onVisible = () => document.visibilityState === "visible" && void loadAvailability();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearTimeout(first);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [loadAvailability]);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const limit = availability?.perSlotLimit ?? booking.perSlotLimit;
  const usedFor = (slotLabel: string) => availability?.counts[date]?.[slotLabel] ?? 0;
  const setDetail = (key: keyof typeof emptyDetails) => (value: string) =>
    setDetails((d) => ({ ...d, [key]: value }));

  const errorOf = (key: string) => fieldErrors[key];
  const clearErrors = (...keys: string[]) =>
    setFieldErrors((current) => Object.fromEntries(Object.entries(current).filter(([k]) => !keys.includes(k))));
  const describe = (key: string) => (errorOf(key) ? `${id(key)}-error` : undefined);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phase === "submitting") return;

    // Quick checks so an obvious gap is flagged without a round trip.
    const problems: Record<string, string> = {};
    if (!singleDay && !date) problems.date = "Please choose a day.";
    if (hasSlots && !slot) problems.slot = "Please choose a time slot.";
    if (!details.name.trim()) problems.name = "Please enter your name.";
    if (!details.phone.trim()) problems.phone = "Please enter your phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim())) problems.email = "Please enter a valid email.";
    if (booking.companyField === "required" && !details.company.trim()) problems.company = "Please enter your company.";
    for (const f of booking.extraFields) {
      if (f.required && !(extra[f.key] ?? "").trim()) problems[`extra.${f.key}`] = f.type === "checkbox" ? "Please tick this box." : "This field is required.";
    }
    if (!consent) problems.consent = "Please confirm the privacy consent.";

    if (Object.keys(problems).length > 0) {
      setFieldErrors(problems);
      setError("Please check the highlighted fields.");
      return;
    }

    setPhase("submitting");
    setError(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/event-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          date,
          slot,
          ...details,
          extra,
          consent,
          website: honeypot,
          startedAt: startedAt.current,
          source: window.location.search,
          landingPage: window.location.pathname,
        }),
      });
      const data = (await response.json().catch(() => null)) as
        | { ok: true; code?: string; date?: string; slot?: string }
        | { ok: false; error?: string; fields?: Record<string, string> }
        | null;

      if (!response.ok || !data || !data.ok) {
        const failure = data && !data.ok ? data : null;
        setError(failure?.error ?? "We could not submit your booking. Please try again.");
        setFieldErrors(failure?.fields ?? {});
        // The slot may have just filled: refresh the counts and make them choose again.
        if (response.status === 409) {
          setSlot("");
          void loadAvailability();
        }
        setPhase("idle");
        return;
      }

      window.dataLayer?.push({ event: "bvk_event_booking", event_id: eventId, event_name: title, booking_code: data.code ?? "" });
      setDone({ code: data.code ?? "", date: data.date || date, slot: data.slot ?? slot });
      setPhase("done");
      void loadAvailability();
    } catch {
      setError("We could not reach the server. Please check your connection and try again.");
      setPhase("idle");
    }
  }

  function bookAnother() {
    setDone(null);
    setPhase("idle");
    setSlot("");
    setDate(singleDay ? dates[0] : "");
    setDetails(emptyDetails);
    setExtra({});
    setConsent(false);
    setError(null);
    setFieldErrors({});
    startedAt.current = Date.now();
  }

  const input = (key: string, extraClass = "") =>
    `field ${errorOf(key) ? "!border-red-600" : ""} ${extraClass}`;

  if (done) {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="px-6 py-12 text-center outline-none sm:px-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-wash text-brand-deep">
          <Check aria-hidden className="h-7 w-7" />
        </span>
        <h3 className="pt-5 font-display text-2xl text-ink">Booking confirmed</h3>
        <div className="mx-auto max-w-md pt-3">
          <p className="text-grey">{booking.success}</p>
        </div>

        <dl className="mx-auto mt-6 grid max-w-md gap-2 rounded-lg border border-hairline bg-surface-raised p-5 text-left text-sm">
          {done.code && (
            <div className="flex justify-between gap-4">
              <dt className="text-grey">Booking ID</dt>
              <dd data-testid="booking-code" className="font-semibold text-ink">{done.code}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-grey">Event</dt>
            <dd className="text-right font-semibold text-ink">{title}</dd>
          </div>
          {done.date && (
            <div className="flex justify-between gap-4">
              <dt className="text-grey">Day</dt>
              <dd className="text-right font-semibold text-ink">{formatLongDate(done.date)}</dd>
            </div>
          )}
          {done.slot && (
            <div className="flex justify-between gap-4">
              <dt className="text-grey">Time</dt>
              <dd className="text-right font-semibold text-ink">{done.slot}</dd>
            </div>
          )}
        </dl>

        <div className="mx-auto max-w-md pt-4">
          <p className="text-sm text-grey">A confirmation has been emailed to you.</p>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={calendarUrl} target="_blank" rel="noopener noreferrer" className="btn btn-green">
            <CalendarPlus aria-hidden className="h-4 w-4" />
            Add to calendar
          </a>
          <button type="button" onClick={bookAnother} className="btn btn-outline-dark">
            Book another slot
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="px-6 pb-8 pt-2 sm:px-10">
      <h3 className="sr-only">{booking.heading}</h3>

      {error && (
        <div className="mb-6">
          <p role="alert" className="flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
          </p>
        </div>
      )}

      {/* 1. The day */}
      {!singleDay && (
        <fieldset className="mb-7">
          <legend className="mb-3 text-sm font-semibold text-ink">
            1. Select your visit date <span className="text-red-700">*</span>
          </legend>
          <div role="radiogroup" aria-label="Visit date" className="grid gap-3 sm:grid-cols-3">
            {dates.map((d) => (
              <button
                key={d}
                type="button"
                role="radio"
                aria-checked={date === d}
                onClick={() => {
                  setDate(d);
                  setSlot("");
                  clearErrors("date", "slot");
                }}
                className={`rounded-md border px-3 py-3 text-sm font-semibold transition-colors ${
                  date === d
                    ? "border-brand-deep bg-brand-wash text-brand-deep ring-2 ring-brand-deep/15"
                    : "border-hairline text-ink hover:border-brand-deep"
                }`}
              >
                {formatDayOption(d)}
              </button>
            ))}
          </div>
          {errorOf("date") && <p className="pt-2 text-sm text-red-700">{errorOf("date")}</p>}
        </fieldset>
      )}

      {/* 2. The time slot */}
      {hasSlots && (
        <fieldset className="mb-7">
          <legend className="mb-3 text-sm font-semibold text-ink">
            {singleDay ? "1" : "2"}. Select an available time slot <span className="text-red-700">*</span>
          </legend>

          {!date ? (
            <p className="rounded-md border border-dashed border-hairline p-4 text-sm text-grey">
              Choose a day first to see the available times.
            </p>
          ) : (
            <div role="radiogroup" aria-label="Time slot" className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {booking.slots.map((label) => {
                const state = slotState(limit, usedFor(label));
                const selected = slot === label;
                return (
                  <button
                    key={label}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-disabled={state.full}
                    disabled={state.full}
                    onClick={() => {
                      setSlot(label);
                      clearErrors("slot");
                    }}
                    className={`rounded-md border px-2.5 py-3 text-center transition-colors ${
                      state.full
                        ? "cursor-not-allowed border-hairline bg-surface-raised text-grey-soft"
                        : selected
                          ? "border-brand-deep bg-brand-wash ring-2 ring-brand-deep/15"
                          : "border-hairline hover:border-brand-deep"
                    }`}
                  >
                    <span className="block text-[0.8125rem] font-semibold leading-snug text-ink">{label}</span>
                    <span
                      className={`mt-1 block text-[0.6875rem] font-semibold ${
                        state.full ? "text-red-700" : state.left !== null ? "text-brand-deep" : "text-grey"
                      }`}
                    >
                      {state.full ? "Full" : state.left !== null ? `${state.left} left` : "Available"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
          {errorOf("slot") && <p className="pt-2 text-sm text-red-700">{errorOf("slot")}</p>}
        </fieldset>
      )}

      {/* 3. Details */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className="field-label">Full name <span className="text-red-700">*</span></label>
          <input id={id("name")} className={input("name")} value={details.name} onChange={(e) => setDetail("name")(e.target.value)} autoComplete="name" maxLength={120} aria-invalid={Boolean(errorOf("name"))} aria-describedby={describe("name")} />
          {errorOf("name") && <p id={`${id("name")}-error`} className="pt-1.5 text-sm text-red-700">{errorOf("name")}</p>}
        </div>
        <div>
          <label htmlFor={id("phone")} className="field-label">Phone number <span className="text-red-700">*</span></label>
          <input id={id("phone")} type="tel" className={input("phone")} value={details.phone} onChange={(e) => setDetail("phone")(e.target.value)} autoComplete="tel" maxLength={40} placeholder="+91 ..." aria-invalid={Boolean(errorOf("phone"))} aria-describedby={describe("phone")} />
          {errorOf("phone") && <p id={`${id("phone")}-error`} className="pt-1.5 text-sm text-red-700">{errorOf("phone")}</p>}
        </div>
        <div>
          <label htmlFor={id("email")} className="field-label">Email <span className="text-red-700">*</span></label>
          <input id={id("email")} type="email" className={input("email")} value={details.email} onChange={(e) => setDetail("email")(e.target.value)} autoComplete="email" maxLength={254} aria-invalid={Boolean(errorOf("email"))} aria-describedby={describe("email")} />
          {errorOf("email") && <p id={`${id("email")}-error`} className="pt-1.5 text-sm text-red-700">{errorOf("email")}</p>}
        </div>
        {booking.companyField !== "hidden" && (
          <div>
            <label htmlFor={id("company")} className="field-label">
              Company / organisation {booking.companyField === "required" && <span className="text-red-700">*</span>}
            </label>
            <input id={id("company")} className={input("company")} value={details.company} onChange={(e) => setDetail("company")(e.target.value)} autoComplete="organization" maxLength={160} aria-invalid={Boolean(errorOf("company"))} aria-describedby={describe("company")} />
            {errorOf("company") && <p id={`${id("company")}-error`} className="pt-1.5 text-sm text-red-700">{errorOf("company")}</p>}
          </div>
        )}

        {booking.purposes.length > 0 && (
          <div className="sm:col-span-2">
            <label htmlFor={id("purpose")} className="field-label">What would you like to discuss?</label>
            <select id={id("purpose")} className={input("purpose")} value={details.purpose} onChange={(e) => setDetail("purpose")(e.target.value)}>
              <option value="">Select a topic</option>
              {booking.purposes.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        )}

        {booking.extraFields.map((f) => {
          const key = `extra.${f.key}`;
          const fid = id(`x-${f.key}`);
          const value = extra[f.key] ?? "";
          const set = (v: string) => setExtra((x) => ({ ...x, [f.key]: v }));
          const label = (
            <>
              {f.label} {f.required && <span className="text-red-700">*</span>}
            </>
          );
          const err = errorOf(key) && (
            <p id={`${fid}-error`} className="pt-1.5 text-sm text-red-700">{errorOf(key)}</p>
          );

          if (f.type === "checkbox") {
            return (
              <div key={f.key} className="sm:col-span-2">
                <label className="flex items-start gap-3 text-sm text-grey">
                  <input type="checkbox" checked={value === "yes"} onChange={(e) => set(e.target.checked ? "yes" : "")} className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-brand-deep)]" aria-describedby={errorOf(key) ? `${fid}-error` : undefined} />
                  <span>{label}</span>
                </label>
                {err}
              </div>
            );
          }
          return (
            <div key={f.key} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
              <label htmlFor={fid} className="field-label">{label}</label>
              {f.type === "textarea" ? (
                <textarea id={fid} rows={3} className={input(key, "resize-y")} value={value} onChange={(e) => set(e.target.value)} placeholder={f.placeholder} maxLength={1500} aria-invalid={Boolean(errorOf(key))} aria-describedby={errorOf(key) ? `${fid}-error` : undefined} />
              ) : f.type === "select" ? (
                <select id={fid} className={input(key)} value={value} onChange={(e) => set(e.target.value)} aria-invalid={Boolean(errorOf(key))} aria-describedby={errorOf(key) ? `${fid}-error` : undefined}>
                  <option value="">{f.placeholder || "Select"}</option>
                  {f.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              ) : (
                <input id={fid} type={f.type === "number" ? "number" : "text"} inputMode={f.type === "number" ? "decimal" : undefined} className={input(key)} value={value} onChange={(e) => set(e.target.value)} placeholder={f.placeholder} maxLength={300} aria-invalid={Boolean(errorOf(key))} aria-describedby={errorOf(key) ? `${fid}-error` : undefined} />
              )}
              {err}
            </div>
          );
        })}

        {booking.messageField !== "hidden" && (
          <div className="sm:col-span-2">
            <label htmlFor={id("message")} className="field-label">Message (optional)</label>
            <textarea id={id("message")} rows={3} className={input("message", "resize-y")} value={details.message} onChange={(e) => setDetail("message")(e.target.value)} maxLength={3000} />
          </div>
        )}

        {/* Spam trap: a real person never sees or fills this in. */}
        <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </label>
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm text-grey">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-brand-deep)]" aria-invalid={Boolean(errorOf("consent"))} />
        <span>
          I agree that BVK Hydrotech may use these details to arrange and confirm this appointment, as described in the{" "}
          <Link href="/privacy-policy" className="font-semibold text-brand-deep underline underline-offset-4">Privacy Policy</Link>.
        </span>
      </label>
      {errorOf("consent") && <p className="pt-1.5 text-sm text-red-700">{errorOf("consent")}</p>}

      <div aria-live="polite" className="mt-6 flex flex-wrap gap-2 text-sm text-grey">
        <span className="rounded-full bg-surface-raised px-3 py-1.5">Day: {date ? formatDayOption(date) : singleDay ? formatDayOption(dates[0]) : "Not selected"}</span>
        {hasSlots && <span className="rounded-full bg-surface-raised px-3 py-1.5">Time: {slot || "Not selected"}</span>}
        {spotsLeft !== null && <span className="rounded-full bg-brand-wash px-3 py-1.5 font-semibold text-brand-deep">{spotsLeft} appointments left</span>}
      </div>

      <button type="submit" disabled={phase === "submitting"} className="btn btn-green mt-6 w-full disabled:opacity-60">
        {phase === "submitting" ? (
          <>
            <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
            Booking&hellip;
          </>
        ) : (
          <>
            <Send aria-hidden className="h-4 w-4" />
            {booking.button}
          </>
        )}
      </button>
    </form>
  );
}
