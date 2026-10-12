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
  Users,
} from "lucide-react";
import CtaBand from "@/components/sections/CtaBand";
import type { MenuLink, SiteSettings } from "@/lib/wordpress/home";

const LOGO = "/media/BVK-Hydrotech-White-Logo.png";

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

/** Used when the CMS legal menu is empty, so these never disappear. */
const fallbackLegal: MenuLink[] = [
  { label: "Privacy Policy", url: "/privacy-policy" },
  { label: "Terms & Conditions", url: "/terms-and-conditions" },
  { label: "Cookie Policy", url: "/cookie-policy" },
  { label: "Disclaimer", url: "/disclaimer" },
];

const productFamilies = [
  "Stainless Steel Mesh",
  "Nickel 201 / 202 Mesh",
  "Titanium Mesh",
  "Copper Mesh",
  "Knitted Mesh Rolls",
  "Laser-cut Mesh Parts",
];

/** Badge artwork lives in the media library; shown small on white tiles. */
const credentials = [
  { name: "ISO 9001:2015", file: "iso-9001-2015-quality-management-system.webp" },
  { name: "IATF 16949:2016", file: "iatf-16949-2016-automotive-quality-management-system.webp" },
  { name: "ISO 14001:2015", file: "iso-14001-2015-environmental-management-system.webp" },
  { name: "ISO 45001:2018", file: "iso-45001-2018-occupational-health-safety-management-system.webp" },
  { name: "DSIR recognised R&D", file: "dsir-recognized-rd-centre.webp" },
];

const facts = [
  { icon: Building2, value: "Since 1963", label: "Group heritage" },
  { icon: Globe2, value: "25+", label: "Export countries" },
  { icon: Factory, value: "650+ MT", label: "Metal a year" },
  { icon: Users, value: "300+", label: "People" },
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
      <h3 className="font-display text-sm text-white">{title}</h3>
      <span aria-hidden className="mt-3 block h-0.5 w-8 rounded-full bg-brand" />
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.url}>
            <Link
              href={link.url}
              className="text-[0.8125rem] text-on-dark-muted transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactItem({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span
        aria-hidden
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-ink-line bg-ink-panel text-brand"
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 text-[0.8125rem] leading-relaxed text-on-dark-muted">
        <p className="mb-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-on-dark-faint">{label}</p>
        {children}
      </div>
    </div>
  );
}

export default function Footer({ menus, settings }: FooterProps) {
  const year = new Date().getFullYear();
  const solutions = uniqueLinks(menus.footer1, fallbackSolutions);
  const company = uniqueLinks(menus.footer2, fallbackCompany);
  const resources = uniqueLinks(menus.footer3, fallbackResources);
  const legal = menus.legal.length > 0 ? menus.legal : fallbackLegal;

  return (
    <>
      {/* The site-wide closing CTA. Pages that end on their own CtaBand hide
          this one (see .footer-cta in globals.css), so a page never shows two. */}
      <CtaBand
        className="footer-cta"
        eyebrow="B2B technical enquiry"
        title="Need precision mesh matched to your stack, filter or industrial component?"
        body="Share drawings, material preference, target porosity, duty condition and expected volume. BVK Hydrotech can support material selection, samples and repeat supply."
        primary={{ label: "Request technical RFQ", href: "/contact#enquiry" }}
      />

      <footer className="on-ink bg-ink text-on-dark">
        <div className="shell pt-12 lg:pt-16">
          {/* Key facts */}
          <ul className="grid grid-cols-2 overflow-hidden rounded-2xl border border-ink-line bg-ink-raised lg:grid-cols-4">
            {facts.map(({ icon: Icon, value, label }, index) => (
              <li
                key={label}
                className={`flex items-center gap-3.5 p-5 ${
                  index > 0 ? "lg:border-l lg:border-ink-line" : ""
                } ${index % 2 === 1 ? "border-l border-ink-line lg:border-l" : ""} ${
                  index > 1 ? "border-t border-ink-line lg:border-t-0" : ""
                }`}
              >
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-lg leading-tight text-white">{value}</span>
                  <span className="mt-0.5 block text-[0.6875rem] text-on-dark-faint">{label}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* Brand + link columns */}
          <div className="grid gap-12 py-12 lg:py-14 xl:grid-cols-[1.1fr_2fr] xl:gap-20">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO} alt="BVK Hydrotech" width={170} height={85} className="h-10 w-auto" />
              <p className="mt-5 max-w-sm font-display text-base leading-snug text-white">
                {settings.tagline ?? "Indian Agility. German Precision. Performance Engineered."}
              </p>
              <p className="mt-3 max-w-sm text-[0.8125rem] leading-relaxed text-on-dark-muted">
                Precision woven mesh, knitted mesh and custom metal mesh components for green
                hydrogen, fuel cells, industrial filtration and clean-energy manufacturing.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href="/resources" className="btn btn-outline-light">
                  <FileText aria-hidden className="h-4 w-4 text-brand" />
                  Download brochures
                </Link>
                {settings.linkedin && (
                  <a
                    href={settings.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="BVK Group on LinkedIn"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-ink-line text-on-dark-muted transition hover:border-brand hover:text-white"
                  >
                    <LinkedInIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
              <Column title="Solutions" links={solutions} />
              <Column title="Company" links={company} />
              <Column title="Resources" links={resources} />
              <div>
                <h3 className="font-display text-sm text-white">Product families</h3>
                <span aria-hidden className="mt-3 block h-0.5 w-8 rounded-full bg-brand" />
                <ul className="mt-4 space-y-2.5">
                  {productFamilies.map((item) => (
                    <li key={item}>
                      <Link
                        href="/precision-mesh-solutions"
                        className="text-[0.8125rem] text-on-dark-muted transition-colors hover:text-white"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/precision-mesh-solutions"
                  className="mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-brand transition-colors hover:text-white"
                >
                  View product range
                  <ArrowUpRight aria-hidden className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contact (two lines each) + certification badges */}
          <div className="grid gap-8 border-t border-ink-line py-8 lg:grid-cols-[1.5fr_1fr_1fr_auto] lg:items-center">
            {settings.address && (
              <ContactItem icon={MapPin} label="Plant & office">
                {settings.address.replace(/\s*\n\s*/g, ", ")}
              </ContactItem>
            )}
            {settings.phone && (
              <ContactItem icon={Phone} label="Call">
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
              </ContactItem>
            )}
            {settings.email && (
              <ContactItem icon={Mail} label="Email">
                <a href={`mailto:${settings.email}`} className="transition-colors hover:text-white">
                  {settings.email}
                </a>
              </ContactItem>
            )}

            <ul aria-label="Certifications" className="flex items-center gap-2 lg:justify-end">
              {credentials.map((credential) => (
                <li key={credential.name} title={credential.name}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white p-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/media/${credential.file}`}
                      alt={credential.name}
                      width={36}
                      height={36}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-ink-line">
          <div className="shell flex flex-col gap-4 py-5 text-[0.6875rem] text-on-dark-faint lg:flex-row lg:items-center lg:justify-between">
            <p>
              {settings.copyright ??
                `© ${year} BVK Hydrotech India Pvt. Ltd. A BVK Group Company. All rights reserved.`}
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legal.map((link) => (
                <li key={link.url}>
                  <Link href={link.url} className="transition-colors hover:text-on-dark-muted">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
