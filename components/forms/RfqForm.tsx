"use client";

import { DragEvent, FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, CloudUpload, Loader2, Send, X } from "lucide-react";

type FormState = "idle" | "submitting" | "error";

/** Upload rules, mirrored on the server in app/api/rfq/route.ts. */
const ACCEPT = ".pdf,.step,.stp,.dwg,.dxf,.xlsx,.jpg,.jpeg,.png";
const MAX_FILE_BYTES = 20 * 1024 * 1024;

const APPLICATIONS = [
  "Alkaline Electrolyser",
  "PEM Electrolyser",
  "Fuel Cell",
  "H₂ Storage",
  "Industrial Filtration",
  "Electrochemical System",
  "Custom Industrial Component",
];

const MATERIALS = [
  "Nickel 201 / 202",
  "Nickel 99.6 / 99.2",
  "Stainless steel (304 / 316 / 904L)",
  "Titanium",
  "Copper",
  "Hastelloy / specialty alloy",
  "Not sure — recommend",
];

const MESH_TYPES = ["Single-end knit", "Double-end knit", "Multi-end knit", "Woven", "Not sure — recommend"];

const TREATMENTS = ["Degreased", "Annealed", "Coated", "Plated", "None", "Not sure"];

const GENERAL_TOPICS = ["General question", "Partnership", "Distributor / reseller", "Other"];

const STAGES = ["Prototype", "Sample", "Pilot", "Production"];

const TIMELINES = ["Within 1 month", "1–3 months", "3–6 months", "Planning stage"];

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {required && <span className="text-brand-deep">*</span>}
      </label>
      {children}
    </div>
  );
}

function Select({ id, name, options, placeholder, required }: {
  id: string;
  name: string;
  options: string[];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <select id={id} name={name} required={required} defaultValue="" className="field">
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}

export type EnquiryMode = "technical" | "general";

export default function RfqForm({ mode = "technical" }: { mode?: EnquiryMode }) {
  const technical = mode === "technical";
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  function pick(candidate: File | undefined) {
    if (!candidate) return;
    const extension = `.${candidate.name.split(".").pop()?.toLowerCase()}`;
    if (!ACCEPT.split(",").includes(extension)) {
      setError("That file type is not supported. Please attach PDF, STEP, DWG, DXF, XLSX, JPG or PNG.");
      return;
    }
    if (candidate.size > MAX_FILE_BYTES) {
      setError("That file is larger than 20 MB. Please attach a smaller file.");
      return;
    }
    setError(null);
    setFile(candidate);
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    pick(event.dataTransfer.files?.[0]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!new FormData(form).get("consent")) {
      setState("error");
      setError("Please confirm the privacy consent before submitting.");
      return;
    }

    setState("submitting");
    setError(null);

    try {
      const body = new FormData(form);
      body.delete("attachment");
      if (file) body.set("attachment", file);
      // Campaign attribution, read at submit time so no render depends on it.
      body.set("source", window.location.search);
      body.set("landingPage", window.location.pathname);

      const response = await fetch("/api/rfq", { method: "POST", body });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "We could not submit your enquiry.");
      }

      form.reset();
      setFile(null);
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
      <input type="hidden" name="enquiryType" value={mode} />

      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label>
          Company website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="rfq-name" label="Name" required>
          <input id="rfq-name" name="name" required autoComplete="name" className="field" placeholder="Your name" />
        </Field>
        <Field id="rfq-company" label="Company Name" required={technical}>
          <input id="rfq-company" name="company" required={technical} autoComplete="organization" className="field" placeholder="Company name" />
        </Field>
        <Field id="rfq-email" label={technical ? "Work Email" : "Email"} required>
          <input id="rfq-email" name="email" type="email" required autoComplete="email" className="field" placeholder="you@company.com" />
        </Field>
        <Field id="rfq-phone" label="Phone" required>
          <input id="rfq-phone" name="phone" type="tel" required autoComplete="tel" className="field" placeholder="+91 …" />
        </Field>
        <Field id="rfq-country" label="Country">
          <input id="rfq-country" name="country" autoComplete="country-name" className="field" placeholder="India" />
        </Field>
        {technical ? (
          <Field id="rfq-application" label="Application / End Use" required>
            <Select id="rfq-application" name="application" options={APPLICATIONS} placeholder="Select application" required />
          </Field>
        ) : (
          <Field id="rfq-topic" label="Enquiry About">
            <Select id="rfq-topic" name="topic" options={GENERAL_TOPICS} placeholder="Select topic" />
          </Field>
        )}
      </div>

      {technical && (
      <div className="grid gap-4 sm:grid-cols-3">
        <Field id="rfq-material" label="Material">
          <Select id="rfq-material" name="material" options={MATERIALS} placeholder="Select material" />
        </Field>
        <Field id="rfq-wire" label="Wire Diameter">
          <input id="rfq-wire" name="wireDiameter" className="field" placeholder="e.g. 0.05 – 0.30 mm" />
        </Field>
        <Field id="rfq-density" label="Mesh Density / Porosity">
          <input id="rfq-density" name="meshDensity" className="field" placeholder="Target density or porosity" />
        </Field>
        <Field id="rfq-meshtype" label="Knit / Weave Type">
          <Select id="rfq-meshtype" name="meshType" options={MESH_TYPES} placeholder="Select type" />
        </Field>
        <Field id="rfq-size" label="Piece Size / Diameter">
          <input id="rfq-size" name="pieceSize" className="field" placeholder="e.g. 100 × 200 mm" />
        </Field>
        <Field id="rfq-treatment" label="Surface Treatment">
          <Select id="rfq-treatment" name="surfaceTreatment" options={TREATMENTS} placeholder="Select option" />
        </Field>
        <Field id="rfq-stage" label="Prototype / Sample Requirement">
          <Select id="rfq-stage" name="stage" options={STAGES} placeholder="Select stage" />
        </Field>
        <Field id="rfq-qty" label="Expected Quantity">
          <input id="rfq-qty" name="quantity" className="field" placeholder="e.g. 500 m² / 1000 pcs" />
        </Field>
        <Field id="rfq-timeline" label="Target Delivery Timeline">
          <Select id="rfq-timeline" name="timeline" options={TIMELINES} placeholder="Select timeline" />
        </Field>
      </div>
      )}

      <Field id="rfq-message" label={technical ? "Technical Requirements" : "Your Message"} required>
        <textarea
          id="rfq-message"
          name="message"
          required
          rows={technical ? 4 : 5}
          className="field resize-y"
          placeholder={
            technical
              ? "Cell chemistry, target porosity, geometry, operating environment, standards or any other details…"
              : "How can we help?"
          }
        />
      </Field>

      {technical && (
      <div>
        <p className="field-label">Upload drawing / specification / datasheet</p>
        <label
          htmlFor="rfq-file"
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`flex cursor-pointer flex-col items-center gap-2 rounded-md border border-dashed px-4 py-5 text-center transition-colors ${
            dragging ? "border-brand-deep bg-brand-wash" : "border-grey-soft bg-surface hover:border-brand-deep"
          }`}
        >
          <CloudUpload aria-hidden className="h-6 w-6 text-grey" />
          <span className="text-ink">
            <span className="font-semibold text-brand-deep">Click to upload</span> or drag and drop
          </span>
          <span className="text-grey-mid">Supported formats: PDF, STEP, DWG, DXF, XLSX, JPG, PNG (max 20 MB)</span>
          <input
            ref={fileInput}
            id="rfq-file"
            name="attachment"
            type="file"
            accept={ACCEPT}
            className="sr-only"
            onChange={(event) => pick(event.target.files?.[0])}
          />
        </label>

        {file && (
          <p className="mt-3 flex items-center justify-between gap-3 rounded-md border border-hairline bg-surface px-3 py-2 text-ink">
            <span className="truncate">{file.name}</span>
            <button
              type="button"
              aria-label="Remove attached file"
              onClick={() => {
                setFile(null);
                if (fileInput.current) fileInput.current.value = "";
              }}
              className="shrink-0 text-grey hover:text-brand-deep"
            >
              <X aria-hidden className="h-4 w-4" />
            </button>
          </p>
        )}
      </div>
      )}

      <label className="flex items-start gap-3 text-grey">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-brand-deep)]"
        />
        <span>
          I agree that BVK Hydrotech may use these details to respond to my enquiry, as described
          in the{" "}
          <Link href="/privacy-policy" className="font-semibold text-brand-deep underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {error && (
        <p role="alert" className="flex items-start gap-2.5 border border-red-200 bg-red-50 p-4 text-red-800">
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
              {technical ? "Submit Technical Enquiry" : "Send Message"}
            </>
          )}
        </button>
        <p className="text-grey-mid">Your details are used only to answer this enquiry.</p>
      </div>
    </form>
  );
}
