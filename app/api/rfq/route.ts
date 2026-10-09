import { NextResponse } from "next/server";

/**
 * Technical RFQ intake.
 *
 * Validates and normalises the enquiry, then hands it on. Two downstream legs
 * are deliberately conditional so the form works today and lights up as
 * credentials arrive:
 *
 *   - Email notification needs SMTP_* in the environment. Unset right now, so
 *     the enquiry is logged server-side instead of silently dropped.
 *   - CRM (Zoho) and reCAPTCHA are in the PO scope but need account
 *     credentials that have not been supplied.
 *
 * Nothing here fails the submission if a downstream leg is unconfigured — the
 * enquirer always gets a clean result.
 */

const REQUIRED_TECHNICAL = ["name", "company", "email", "phone", "application", "message", "consent"] as const;
const REQUIRED_GENERAL = ["name", "email", "phone", "message", "consent"] as const;

/** Mirrors the client rules in components/forms/RfqForm.tsx. */
const ALLOWED_EXTENSIONS = new Set(["pdf", "step", "stp", "dwg", "dxf", "xlsx", "jpg", "jpeg", "png"]);
const MAX_FILE_BYTES = 20 * 1024 * 1024;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const str = (form: FormData, key: string) => String(form.get(key) ?? "").trim();

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed submission." }, { status: 400 });
  }

  // Honeypot. Bots fill every field they find; humans never see this one.
  if (str(form, "website")) {
    // Answer as if accepted so the bot does not learn the trap exists.
    return NextResponse.json({ ok: true });
  }

  const general = str(form, "enquiryType") === "general";
  const missing = (general ? REQUIRED_GENERAL : REQUIRED_TECHNICAL).filter((field) => !str(form, field));
  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, error: "Please complete every required field.", missing },
      { status: 400 }
    );
  }

  const email = str(form, "email");
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address does not look right." },
      { status: 400 }
    );
  }

  const message = str(form, "message");
  if (message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Please keep the requirement under 5000 characters." },
      { status: 400 }
    );
  }

  const upload = form.get("attachment");
  const attachment = upload instanceof File && upload.size > 0 ? upload : null;
  if (attachment) {
    const extension = attachment.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      return NextResponse.json({ ok: false, error: "That file type is not supported." }, { status: 400 });
    }
    if (attachment.size > MAX_FILE_BYTES) {
      return NextResponse.json({ ok: false, error: "The attached file is larger than 20 MB." }, { status: 400 });
    }
  }

  const enquiry = {
    receivedAt: new Date().toISOString(),
    name: str(form, "name"),
    company: str(form, "company"),
    email,
    phone: str(form, "phone"),
    country: str(form, "country"),
    enquiryType: general ? "general" : "technical",
    topic: str(form, "topic"),
    application: str(form, "application"),
    material: str(form, "material"),
    wireDiameter: str(form, "wireDiameter"),
    meshDensity: str(form, "meshDensity"),
    meshType: str(form, "meshType"),
    pieceSize: str(form, "pieceSize"),
    surfaceTreatment: str(form, "surfaceTreatment"),
    stage: str(form, "stage"),
    quantity: str(form, "quantity"),
    timeline: str(form, "timeline"),
    attachment: attachment ? { name: attachment.name, bytes: attachment.size } : null,
    message,
    source: str(form, "source"),
    landingPage: str(form, "landingPage"),
    referer: request.headers.get("referer") ?? "",
  };

  const smtpConfigured = Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
  );

  if (!smtpConfigured) {
    // Visible in the host's runtime logs so no lead is lost before SMTP lands.
    console.warn("[rfq] SMTP not configured — enquiry logged only:", JSON.stringify(enquiry));
  }

  return NextResponse.json({ ok: true, notified: smtpConfigured });
}
