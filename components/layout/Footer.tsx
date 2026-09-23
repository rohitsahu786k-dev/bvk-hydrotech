import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { MenuLink, SiteSettings } from "@/lib/wordpress/home";

const LOGO = `${process.env.NEXT_PUBLIC_WORDPRESS_URL ?? ""}/wp-content/uploads/BVK-Hydrotech-White-Logo.png`;

/** lucide-react dropped brand marks in v1, so LinkedIn is inlined. */
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

interface FooterProps {
  menus: { footer1: MenuLink[]; footer2: MenuLink[]; footer3: MenuLink[]; legal: MenuLink[] };
  settings: SiteSettings;
}

function Column({ title, links }: { title: string; links: MenuLink[] }) {
  if (!links.length) return null;
  return (
    <div>
      <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-on-dark-faint">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.url}>
            <Link
              href={link.url}
              className="text-sm text-on-dark-muted transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({ menus, settings }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="on-ink border-t border-ink-line bg-ink">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            {/* Fixed-size wordmark below the fold; next/image would add a
                request without saving meaningful bytes. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="BVK Hydrotech" width={150} height={75} className="h-10 w-auto" />

            {settings.tagline && (
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-on-dark-muted">
                {settings.tagline}
              </p>
            )}

            <address className="mt-8 space-y-4 not-italic">
              {settings.address && (
                <div className="flex gap-3 text-sm text-on-dark-muted">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span className="whitespace-pre-line leading-relaxed">{settings.address}</span>
                </div>
              )}
              {settings.phone && (
                <div className="flex gap-3 text-sm">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span className="text-on-dark-muted">
                    <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                      {settings.phone}
                    </a>
                    {settings.phone2 && (
                      <>
                        {" · "}
                        <a href={`tel:${settings.phone2.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                          {settings.phone2}
                        </a>
                      </>
                    )}
                  </span>
                </div>
              )}
              {settings.email && (
                <div className="flex gap-3 text-sm">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <a href={`mailto:${settings.email}`} className="text-on-dark-muted transition-colors hover:text-white">
                    {settings.email}
                  </a>
                </div>
              )}
            </address>

            {settings.linkedin && (
              <a
                href={settings.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BVK Group on LinkedIn"
                className="mt-8 inline-flex h-10 w-10 items-center justify-center border border-ink-line text-on-dark-muted transition hover:border-brand hover:text-white"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
            )}
          </div>

          <Column title="Solutions" links={menus.footer1} />
          <Column title="Company" links={menus.footer2} />
          <Column title="Resources" links={menus.footer3} />
        </div>
      </div>

      <div className="border-t border-ink-line">
        <div className="shell flex flex-col gap-4 py-6 text-xs text-on-dark-faint md:flex-row md:items-center md:justify-between">
          <p>
            {settings.copyright ??
              `© ${year} BVK Hydrotech India Pvt. Ltd. A BVK Group Company. All rights reserved.`}
          </p>
          {menus.legal.length > 0 && (
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {menus.legal.map((link) => (
                <li key={link.url}>
                  <Link href={link.url} className="transition-colors hover:text-on-dark-muted">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
