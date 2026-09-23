import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Factory,
  FileText,
  Globe2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import type { MenuLink, SiteSettings } from "@/lib/wordpress/home";

const LOGO = `${process.env.NEXT_PUBLIC_WORDPRESS_URL ?? ""}/wp-content/uploads/BVK-Hydrotech-White-Logo.png`;

const fallbackSolutions: MenuLink[] = [
  { label: "Electrolyser Solutions", url: "/electrolyser-solutions" },
  { label: "Fuel Cell Solutions", url: "/fuel-cell-solutions" },
  { label: "Precision Mesh Solutions", url: "/precision-mesh-solutions" },
  { label: "Woven Mesh Solutions", url: "/woven-mesh-solutions" },
  { label: "Knitted Mesh Solutions", url: "/knitted-mesh-solutions" },
  { label: "Industrial Filtration", url: "/industrial-filtration" },
  { label: "Energy & Clean Tech", url: "/energy-clean-tech" },
];

const fallbackCompany: MenuLink[] = [
  { label: "About BVK Hydrotech", url: "/about" },
  { label: "Engineering & Manufacturing", url: "/engineering-manufacturing" },
  { label: "Process & Treatments", url: "/process-treatments" },
  { label: "R&D, CFD & Prototyping", url: "/rd-cfd-prototyping" },
  { label: "Industries & Applications", url: "/industries-applications" },
  { label: "Sustainability", url: "/sustainability" },
];

const fallbackResources: MenuLink[] = [
  { label: "Resources / Downloads", url: "/resources" },
  { label: "Insights / Knowledge Center", url: "/insights" },
  { label: "FAQs", url: "/faqs" },
  { label: "Contact / Request a Quote", url: "/contact" },
];

const productFamilies = [
  "Stainless Steel Mesh",
  "Nickel 201 / 202 Mesh",
  "Titanium Mesh",
  "Copper Mesh",
  "Knitted Mesh Rolls",
  "Laser-cut Mesh Parts",
];

const credentials = [
  "ISO 9001",
  "IATF 16949",
  "ISO 14001",
  "ISO 45001",
  "DSIR R&D",
  "25+ Export Countries",
];

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

function uniqueLinks(primary: MenuLink[], fallback: MenuLink[]) {
  const seen = new Set<string>();
  return [...primary, ...fallback].filter((link) => {
    if (!link.url || seen.has(link.url)) return false;
    seen.add(link.url);
    return true;
  });
}

function Column({ title, links }: { title: string; links: MenuLink[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase text-on-dark-faint">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.url}>
            <Link
              href={link.url}
              className="group inline-flex items-center gap-2 text-sm font-medium text-on-dark-muted transition-colors hover:text-white"
            >
              <span className="h-px w-3 bg-ink-line transition-colors group-hover:bg-brand" />
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
  const solutions = uniqueLinks(menus.footer1, fallbackSolutions);
  const company = uniqueLinks(menus.footer2, fallbackCompany);
  const resources = uniqueLinks(menus.footer3, fallbackResources);

  return (
    <footer className="on-ink border-t border-ink-line bg-ink text-on-dark">
      <div className="border-b border-ink-line bg-ink-raised">
        <div className="shell grid gap-8 py-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase text-brand">B2B technical enquiry</p>
            <h2 className="mt-3 max-w-4xl font-display text-3xl font-bold text-white lg:text-4xl">
              Need precision mesh matched to your stack, filter or industrial component?
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-on-dark-muted">
              Share drawings, material preference, target porosity, duty condition and expected
              volume. BVK Hydrotech can support material selection, samples and repeat supply.
            </p>
          </div>
          <Link href="/contact" className="btn btn-green group w-fit">
            Request technical RFQ
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      <div className="shell py-14 lg:py-16">
        <div className="grid gap-10 xl:grid-cols-[1.15fr_2fr] xl:gap-16">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="BVK Hydrotech" width={170} height={85} className="h-12 w-auto" />

            <p className="mt-6 max-w-md text-base font-medium leading-relaxed text-white">
              {settings.tagline ?? "Indian Agility. German Precision. Performance Engineered."}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-on-dark-muted">
              Precision woven mesh, knitted mesh and custom metal mesh components for green
              hydrogen, fuel cells, industrial filtration and clean-energy manufacturing.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <div className="border border-ink-line bg-ink-panel p-4">
                <Building2 className="h-5 w-5 text-brand" />
                <p className="mt-3 text-xs font-semibold uppercase text-on-dark-faint">
                  Group heritage
                </p>
                <p className="mt-1 font-display text-xl font-bold text-white">Since 1963</p>
              </div>
              <div className="border border-ink-line bg-ink-panel p-4">
                <Globe2 className="h-5 w-5 text-brand" />
                <p className="mt-3 text-xs font-semibold uppercase text-on-dark-faint">
                  Global supply
                </p>
                <p className="mt-1 font-display text-xl font-bold text-white">25+ Countries</p>
              </div>
              <div className="border border-ink-line bg-ink-panel p-4">
                <Factory className="h-5 w-5 text-brand" />
                <p className="mt-3 text-xs font-semibold uppercase text-on-dark-faint">
                  Metal volume
                </p>
                <p className="mt-1 font-display text-xl font-bold text-white">650+ MT p.a.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            <Column title="Solutions" links={solutions} />
            <Column title="Company" links={company} />
            <Column title="Resources" links={resources} />

            <div>
              <h3 className="text-xs font-semibold uppercase text-on-dark-faint">Product families</h3>
              <ul className="mt-5 space-y-3">
                {productFamilies.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-medium text-on-dark-muted">
                    <span className="h-px w-3 bg-ink-line" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/precision-mesh-solutions" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-white">
                View product range
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-y border-ink-line py-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <address className="grid gap-4 not-italic md:grid-cols-3">
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
                      {" / "}
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

          <div className="flex flex-wrap gap-2 lg:justify-end">
            {credentials.map((credential) => (
              <span
                key={credential}
                className="inline-flex items-center gap-2 border border-ink-line bg-ink-panel px-3 py-2 text-xs font-semibold text-on-dark-muted"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-brand" />
                {credential}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/resources" className="inline-flex items-center gap-2 border border-ink-line px-4 py-2.5 text-sm font-semibold text-on-dark-muted transition hover:border-brand hover:text-white">
              <FileText className="h-4 w-4 text-brand" />
              Download brochures
            </Link>
            {settings.linkedin && (
              <a
                href={settings.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BVK Group on LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center border border-ink-line text-on-dark-muted transition hover:border-brand hover:text-white"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
            )}
          </div>

          {menus.legal.length > 0 && (
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-on-dark-faint">
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

      <div className="border-t border-ink-line">
        <div className="shell flex flex-col gap-3 py-5 text-xs text-on-dark-faint md:flex-row md:items-center md:justify-between">
          <p>
            {settings.copyright ??
              `(c) ${year} BVK Hydrotech India Pvt. Ltd. A BVK Group Company. All rights reserved.`}
          </p>
          <p>Corporate website for technical buyers, procurement teams and engineering partners.</p>
        </div>
      </div>
    </footer>
  );
}
