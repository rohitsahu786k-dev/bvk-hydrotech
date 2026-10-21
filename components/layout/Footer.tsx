import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import CtaBand from "@/components/sections/CtaBand";
import LinkedInIcon from "@/components/ui/LinkedInIcon";
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
  { label: "Blog", url: "/blog" },
  { label: "FAQs", url: "/faqs" },
  { label: "Contact", url: "/contact" },
];

/** Used when the CMS legal menu is empty, so these never disappear. */
const fallbackLegal: MenuLink[] = [
  { label: "Privacy Policy", url: "/privacy-policy" },
  { label: "Terms & Conditions", url: "/terms-and-conditions" },
  { label: "Cookie Policy", url: "/cookie-policy" },
  { label: "Disclaimer", url: "/disclaimer" },
];

/** The certification marks, as supplied by the certification body, from the media library. */
const credentials = [
  { name: "ISO 9001:2015", file: "ISO-9001-2015-English.png" },
  { name: "IATF 16949:2016", file: "IATF-16949.png" },
  { name: "EN 9100 / AS9100", file: "EN-AS-9100-English.jpg" },
  { name: "ISO 14001:2015", file: "ISO-14001-2015-English.png" },
  { name: "ISO 45001:2018", file: "ISO-45001-English.png" },
  { name: "DSIR recognised R&D", file: "dsir-certification.png" },
];


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

/** Collapses a multi-line address to one line. */
const oneLine = (value: string) =>
  value
    .split("\n")
    .map((part) => part.trim())
    .filter(Boolean)
    .join(", ");

const telHref = (value: string) => `tel:${value.split(" ").join("")}`;

function Column({ title, links }: { title: string; links: MenuLink[] }) {
  return (
    <div>
      <h3 className="font-display text-sm text-white">{title}</h3>
      <ul className="mt-3 space-y-1.5">
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

export default function Footer({ menus, settings }: FooterProps) {
  const year = new Date().getFullYear();
  const solutions = uniqueLinks(menus.footer1, fallbackSolutions);
  const company = uniqueLinks(menus.footer2, fallbackCompany);
  const resources = uniqueLinks(menus.footer3, fallbackResources);
  const legal = menus.legal.length > 0 ? menus.legal : fallbackLegal;

  return (
    <>
      {/* The site-wide closing CTA. Pages that end on their own CtaBand hide
          this one (see .footer-cta in globals.css), so a page never shows two.
          The technical RFQ form is not public; first contact is the general enquiry. */}
      <CtaBand
        className="footer-cta"
        eyebrow="B2B technical enquiry"
        title="Need precision mesh matched to your stack, filter or industrial component?"
        body="Tell us about your application and our engineers will get back to you."
        primary={{ label: "Contact our team", href: "/contact#enquiry-general" }}
      />

      <footer className="on-ink bg-ink text-on-dark">
        <div className="shell grid gap-8 py-8 lg:grid-cols-[1.3fr_repeat(3,1fr)_1.3fr] lg:gap-10">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="BVK Hydrotech" width={170} height={85} className="h-8 w-auto" />
            <p className="max-w-xs pt-3 text-[0.8125rem] leading-snug text-on-dark-muted">
              {settings.tagline ?? "Indian Agility. German Precision. Performance Engineered."}
            </p>
            {settings.linkedin && (
              <a
                href={settings.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BVK Group on LinkedIn"
                className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-md border border-ink-line text-on-dark-muted transition hover:border-brand hover:text-white"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
            )}
          </div>

          <Column title="Solutions" links={solutions} />
          <Column title="Company" links={company} />
          <Column title="Resources" links={resources} />

          <div>
            <h3 className="font-display text-sm text-white">Contact</h3>
            <ul className="mt-3 space-y-2 text-[0.8125rem] leading-snug text-on-dark-muted">
              {settings.address && (
                <li className="flex gap-2">
                  <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{oneLine(settings.address)}</span>
                </li>
              )}
              {settings.phone && (
                <li className="flex gap-2">
                  <Phone aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>
                    <a href={telHref(settings.phone)} className="transition-colors hover:text-white">
                      {settings.phone}
                    </a>
                    {settings.phone2 && (
                      <>
                        {" / "}
                        <a href={telHref(settings.phone2)} className="transition-colors hover:text-white">
                          {settings.phone2}
                        </a>
                      </>
                    )}
                  </span>
                </li>
              )}
              {settings.email && (
                <li className="flex gap-2">
                  <Mail aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <a href={`mailto:${settings.email}`} className="transition-colors hover:text-white">
                    {settings.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-ink-line">
          <div className="shell flex flex-col gap-3 py-4 text-[0.75rem] text-on-dark-faint lg:flex-row lg:items-center lg:justify-between">
            <p>
              {settings.copyright ??
                `© ${year} BVK Hydrotech India Pvt. Ltd. A BVK Group Company. All rights reserved.`}
            </p>

            <ul aria-label="Certifications" className="flex items-center gap-1.5">
              {credentials.map((credential) => (
                <li key={credential.name} title={credential.name}>
                  <span className="flex h-8 w-8 items-center justify-center rounded bg-white p-0.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/media/${credential.file}`}
                      alt={credential.name}
                      width={28}
                      height={28}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </span>
                </li>
              ))}
            </ul>

            <ul className="flex flex-wrap gap-x-5 gap-y-1">
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
