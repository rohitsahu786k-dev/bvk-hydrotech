import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Mail, Phone } from "lucide-react";
import type { LinkAction } from "@/lib/content/types";

/** The brand wave pattern, shared by every closing CTA on the site. */
const CTA_BG = "/media/pattern-scaled.png";

interface CtaBandProps {
  eyebrow?: string | null;
  title?: string | null;
  body?: string | null;
  primary?: LinkAction;
  secondary?: LinkAction;
  phone?: string | null;
  email?: string | null;
  id?: string;
}

function CtaLink({ action, variant }: { action: LinkAction; variant: "green" | "outline" }) {
  const cls = `btn ${variant === "green" ? "btn-green" : "btn-outline-light"} group`;
  const Glyph = action.external ? Download : ArrowRight;
  const glyph = (
    <Glyph
      aria-hidden
      className={`h-4 w-4 ${action.external ? "" : "transition-transform group-hover:translate-x-1"}`}
    />
  );

  if (action.external) {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {action.label}
        {glyph}
      </a>
    );
  }
  return (
    <Link href={action.href} className={cls}>
      {action.label}
      {variant === "green" && glyph}
    </Link>
  );
}

/**
 * The one closing call to action. Every page ends on this band so the
 * conversion moment looks the same everywhere: ink ground, the brand wave
 * pattern covering it edge to edge, a green primary action and an outlined
 * secondary one. Contact details are optional and render as a footer row.
 */
export default function CtaBand({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  phone,
  email,
  id,
}: CtaBandProps) {
  if (!title) return null;

  return (
    <section id={id} className="on-ink relative isolate overflow-hidden bg-ink">
      <Image src={CTA_BG} alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/20" />

      <div className="shell section">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="eyebrow text-brand">{eyebrow}</p>
          ) : (
            <span aria-hidden className="rule-green block" />
          )}
          <h2 className="display-section mt-8 whitespace-pre-line text-balance text-white">
            {title}
          </h2>

          {body && (
            <p className="mt-6 text-base leading-relaxed text-on-dark-muted lg:text-lg">{body}</p>
          )}

          {(primary || secondary) && (
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {primary && <CtaLink action={primary} variant="green" />}
              {secondary && <CtaLink action={secondary} variant="outline" />}
            </div>
          )}

          {(phone || email) && (
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-ink-line pt-8">
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-on-dark-muted transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-brand" />
                  {phone}
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-sm text-on-dark-muted transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-brand" />
                  {email}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
