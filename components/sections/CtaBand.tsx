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
  className?: string;
  /** A slim one-row strip (used in the footer): smaller type, no eyebrow. */
  compact?: boolean;
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
  className = "",
  compact = false,
}: CtaBandProps) {
  if (!title) return null;

  return (
    <section id={id} className={`cta-band on-ink relative isolate overflow-hidden bg-ink ${className}`}>
      {/* The pattern is a wide 4:1 strip with its waves on the left and right
          edges. Plain cover would crop exactly those edges on a tall band, so it
          fills the band from md up and anchors left on phones. */}
      <Image
        src={CTA_BG}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-left md:object-fill"
      />

      <div className={compact ? "shell py-6" : "shell py-10 lg:py-12"}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className={compact ? "w-full lg:w-[70%]" : "w-full lg:w-[55%]"}>
          {compact ? null : eyebrow ? (
            <p className="eyebrow text-brand">{eyebrow}</p>
          ) : (
            <span aria-hidden className="rule-green block" />
          )}
          <h2
            className={`whitespace-pre-line text-balance text-white ${
              compact ? "font-display text-lg leading-snug lg:text-xl" : "display-section mt-4"
            }`}
          >
            {title}
          </h2>

          {body && (
            <p
              className={`leading-relaxed text-on-dark-muted ${
                compact ? "mt-1 text-xs lg:text-sm" : "mt-3 text-sm lg:text-base"
              }`}
            >{body}</p>
          )}

          {(phone || email) && (
            <div className="mt-7 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-ink-line pt-5">
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

          {(primary || secondary) && (
            <div className="flex flex-wrap items-center gap-3 lg:shrink-0 lg:justify-end">
              {primary && <CtaLink action={primary} variant="green" />}
              {secondary && <CtaLink action={secondary} variant="outline" />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
