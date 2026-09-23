import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import type { HomeData, SiteSettings } from "@/lib/wordpress/home";

const PATTERN_BG = `${process.env.NEXT_PUBLIC_WORDPRESS_URL ?? ""}/wp-content/uploads/pattern-scaled.png`;

interface CtaProps {
  cta: HomeData["cta"];
  settings: SiteSettings;
}

/**
 * The closing RFQ call to action — the conversion the whole homepage is built
 * towards. Copy is authored on the Home page; the contact details come from
 * Site Settings so they are maintained in one place. The background is the
 * brand's decorative wave pattern rather than a per-page photo, so every CTA
 * section on the site reads as the same closing moment.
 */
export default function CtaSection({ cta, settings }: CtaProps) {
  if (!cta.title) return null;

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image
        src={PATTERN_BG}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-contain"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/20" />

      <div className="shell section">
        <div className="max-w-3xl">
          <span aria-hidden className="rule-green block" />
          <h2 className="display-section mt-8 text-balance text-white">{cta.title}</h2>

          {cta.description && (
            <p className="mt-6 text-base leading-relaxed text-on-dark-muted lg:text-lg">
              {cta.description}
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {cta.buttonText && cta.buttonUrl && (
              <Link href={cta.buttonUrl} className="btn btn-green group">
                {cta.buttonText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            {cta.secondaryButtonText && cta.secondaryButtonUrl && (
              <Link href={cta.secondaryButtonUrl} className="btn btn-outline-light">
                {cta.secondaryButtonText}
              </Link>
            )}
          </div>

          {(settings.phone || settings.email) && (
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-ink-line pt-8">
              {settings.phone && (
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-on-dark-muted transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-brand" />
                  {settings.phone}
                </a>
              )}
              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 text-sm text-on-dark-muted transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-brand" />
                  {settings.email}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
