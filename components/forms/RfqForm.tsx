"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Send } from "lucide-react";

type FormState = "idle" | "submitting" | "error";

const REQUIREMENTS = [
  "Electrolyser solution",
  "Fuel cell component",
  "Precision mesh (woven)",
  "Knitted mesh",
  "Process & treatments",
  "Industrial filtration",
  "Other technical enquiry",
];

export default function RfqForm() {
  const router = useRouter();
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setState("submitting");
    setError(null);

    try {
      const body = new FormData(form);
      // Campaign attribution, read at submit time so no render depends on it.
      body.set("source", window.location.search);
      body.set("landingPage", window.location.pathname);

      const response = await fetch("/api/rfq", { method: "POST", body });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "We could not submit your enquiry.");
      }

      form.reset();
      router.push("/thank-you");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const busy = state === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5">
      {/* Spam trap: a real person never fills this in. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label>
          Company website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="rfq-name" className="field-label">
            Name <span className="text-brand-deep">*</span>
          </label>
          <input id="rfq-name" name="name" required autoComplete="name" className="field" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="rfq-company" className="field-label">
            Company <span className="text-brand-deep">*</span>
          </label>
          <input id="rfq-company" name="company" required autoComplete="organization" className="field" placeholder="Company name" />
        </div>
        <div>
          <label htmlFor="rfq-email" className="field-label">
            Work email <span className="text-brand-deep">*</span>
          </label>
          <input id="rfq-email" name="email" type="email" required autoComplete="email" className="field" placeholder="name@company.com" />
        </div>
        <div>
          <label htmlFor="rfq-phone" className="field-label">
            Phone <span className="text-brand-deep">*</span>
          </label>
          <input id="rfq-phone" name="phone" type="tel" required autoComplete="tel" className="field" placeholder="+91 …" />
        </div>
        <div>
          <label htmlFor="rfq-country" className="field-label">Country</label>
          <input id="rfq-country" name="country" autoComplete="country-name" className="field" placeholder="India" />
        </div>
        <div>
          <label htmlFor="rfq-requirement" className="field-label">
            Requirement <span className="text-brand-deep">*</span>
          </label>
          <select id="rfq-requirement" name="requirementType" required defaultValue="" className="field">
            <option value="" disabled>Select requirement</option>
            {REQUIREMENTS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="rfq-material" className="field-label">Material</label>
          <input id="rfq-material" name="material" className="field" placeholder="Ni 201 / Ti / SS316L" />
        </div>
        <div>
          <label htmlFor="rfq-wire" className="field-label">Wire Ø</label>
          <input id="rfq-wire" name="wireDiameter" className="field" placeholder="0.05–0.30 mm" />
        </div>
        <div>
          <label htmlFor="rfq-qty" className="field-label">Indicative quantity</label>
          <input id="rfq-qty" name="quantity" className="field" placeholder="e.g. 500 m² / yr" />
        </div>
      </div>

      <div>
        <label htmlFor="rfq-message" className="field-label">
          Technical requirement <span className="text-brand-deep">*</span>
        </label>
        <textarea
          id="rfq-message"
          name="message"
          required
          rows={5}
          className="field resize-y"
          placeholder="Cell chemistry, target porosity, geometry, single-piece diameter, operating conditions…"
        />
      </div>

      {error && (
        <p role="alert" className="flex items-start gap-2.5 border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button type="submit" disabled={busy} className="btn btn-green disabled:opacity-60">
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Submit technical enquiry
            </>
          )}
        </button>
        <p className="text-xs leading-relaxed text-grey-soft">
          We reply within one working day. Your details are used only to answer this enquiry.
        </p>
      </div>
    </form>
  );
}
