import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  ClipboardList,
  FileText,
  FlaskConical,
  Grid3x3,
  Layers,
  Mail,
  MapPin,
  MessagesSquare,
  Phone,
  Settings,
  Truck,
} from "lucide-react";
import EnquiryTabs from "@/components/forms/EnquiryTabs";
import CertificationsStrip from "@/components/sections/CertificationsStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import PageHero from "@/components/sections/PageHero";
import { getCertifications, getChrome } from "@/lib/wordpress/home";
import { getPageFaqs } from "@/lib/wordpress/pages";
import { JsonLd, breadcrumbSchema, faqSchema, organisationId } from "@/lib/seo/jsonLd";

export const revalidate = 900;

export const metadata: Metadata = {
  title: { absolute: "Contact BVK Hydrotech | Wire Mesh RFQ India" },
  description:
    "Send drawings, cell chemistry and target porosity. BVK Hydrotech engineers reply with a material recommendation, mesh design and indicative lead time.",
  keywords: [
    "wire mesh RFQ India",
    "contact BVK Hydrotech",
    "precision mesh quotation",
    "knitted mesh enquiry",
    "electrolyser mesh supplier contact",
    "Jaipur wire mesh manufacturer",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact BVK Hydrotech | Wire Mesh RFQ India",
    description:
      "Send drawings, cell chemistry and target porosity. Our application engineers reply with a material recommendation, mesh design and indicative lead time.",
    url: "/contact",
  },
};

const intents = [
  {
    href: "#enquiry",
    icon: ClipboardList,
    title: "Technical RFQ",
    text: "Share specifications, drawings and application details.",
  },
  {
    href: "#enquiry",
    icon: MessagesSquare,
    title: "Application Engineering",
    text: "Discuss your application with our technical experts.",
  },
  {
    href: "#enquiry-general",
    icon: Mail,
    title: "General Enquiry",
    text: "For partnerships, distributors and other enquiries.",
  },
];

const capabilities = [
  { icon: Activity, title: "CFD-supported engineering" },
  { icon: FlaskConical, title: "R&D & prototyping" },
  { icon: Grid3x3, title: "Custom mesh engineering" },
  { icon: Layers, title: "Application-specific material selection" },
];

const afterSteps = [
  { icon: FileText, title: "Requirement Review", text: "We analyse your application, drawings and specifications." },
  {
    icon: Settings,
    title: "Material & Mesh Recommendation",
    text: "Our team suggests suitable materials and mesh design.",
  },
  {
    icon: FlaskConical,
    title: "Technical Validation / Prototype",
    text: "If required, we support with samples and prototyping.",
  },
  { icon: Truck, title: "Quote & Supply", text: "You receive a detailed quote with next steps." },
];

const MAPS_URL = "https://maps.app.goo.gl/t8tCwgSwdgEfvbNa6";

const iconBadge =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-deep text-brand-deep";

export default async function ContactPage() {
  // Contact details are read from Site Settings so they are maintained in one place.
  const [{ settings }, faqs, certifications] = await Promise.all([
    getChrome(),
    getPageFaqs("contact"),
    getCertifications(),
  ]);

  // The two addresses differ across BVK collateral, so they are shown as
  // separate, labelled units rather than as one "correct" address.
  const units = [
    { label: "Unit 1", note: "Plant", address: settings.address },
    { label: "Unit 2", note: undefined, address: settings.factoryAddress },
  ].filter((unit) => unit.address);

  const tel = (value: string) => `tel:${value.replace(/\s/g, "")}`;

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact BVK Hydrotech",
      description:
        "Technical enquiry and request-for-quotation contact for BVK Hydrotech precision mesh.",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bvkhydrotech.com"}/contact`,
      mainEntity: { "@id": organisationId },
    },
    breadcrumbSchema("Contact", "contact"),
    faqSchema(faqs),
  ].filter(Boolean) as Record<string, unknown>[];

  return (
    <>
      <JsonLd data={schemas} />

      <PageHero
        title="Contact & RFQ"
        hero={{
          badge: "CONTACT",
          title: "Start a technical enquiry",
          subtitle:
            "Share your requirements, drawings and application details. Our engineering team will get back with a suitable material recommendation and indicative lead time.",
          image: null,
          buttonText: null,
          buttonUrl: null,
          button2Text: null,
          button2Url: null,
        }}
      />

      {/* Intent cards, overlapping the hero's lower edge. */}
      <section aria-label="Enquiry type" className="relative z-10 -mt-10">
        <div className="shell grid gap-4 md:grid-cols-3">
          {intents.map(({ href, icon: Icon, title, text }) => (
            <a
              key={title}
              href={href}
              className="group flex items-center gap-4 rounded-lg border border-hairline bg-surface p-5 transition-colors duration-300 hover:border-brand-deep/50"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-deep text-white">
                <Icon aria-hidden className="h-5 w-5" />
              </span>
              <span className="flex-1">
                <span className="block font-display text-base text-ink">{title}</span>
                <span className="block text-grey">{text}</span>
              </span>
              <ArrowRight
                aria-hidden
                className="h-4 w-4 shrink-0 text-brand-deep transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          ))}
        </div>
      </section>

      <section id="enquiry" className="section scroll-mt-24 bg-surface">
        <div className="shell grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)_12rem]">
          <aside className="rounded-lg bg-surface-raised p-7">
            <h2 className="font-display text-2xl text-ink">Get in touch</h2>
            <p className="pt-2 text-grey">
              Talk to our application engineers for material recommendations, mesh design and custom
              solutions.
            </p>

            <ul className="mt-7 space-y-6">
              {units.map((unit) => (
                <li key={unit.label} className="flex gap-3">
                  <span className={iconBadge}>
                    <MapPin aria-hidden className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-display text-base text-ink">
                      Manufacturing {unit.label}
                      {unit.note ? ` (${unit.note})` : ""}
                    </p>
                    <p className="whitespace-pre-line pt-1 text-grey">{unit.address}</p>
                  </div>
                </li>
              ))}

              {settings.phone && (
                <li className="flex gap-3">
                  <span className={iconBadge}>
                    <Phone aria-hidden className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-display text-base text-ink">Phone</p>
                    <p className="pt-1 text-grey">
                      <a href={tel(settings.phone)} className="hover:text-brand-deep">
                        {settings.phone}
                      </a>
                      {settings.phone2 && (
                        <>
                          <br />
                          <a href={tel(settings.phone2)} className="hover:text-brand-deep">
                            {settings.phone2}
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                </li>
              )}

              {settings.email && (
                <li className="flex gap-3">
                  <span className={iconBadge}>
                    <Mail aria-hidden className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-display text-base text-ink">Email</p>
                    <p className="pt-1 text-grey">
                      <a href={`mailto:${settings.email}`} className="hover:text-brand-deep">
                        {settings.email}
                      </a>
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </aside>

          <div className="rounded-lg border border-hairline bg-surface p-6 lg:p-8">
            <EnquiryTabs />
          </div>

          <aside aria-label="Engineering capabilities" className="rounded-lg bg-surface-raised p-5">
            <ul className="grid gap-6">
              {capabilities.map(({ icon: Icon, title }) => (
                <li key={title} className="flex flex-col items-start gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-wash text-brand-deep">
                    <Icon aria-hidden className="h-6 w-6" />
                  </span>
                  <span className="font-display text-base leading-snug text-ink">{title}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* What happens after the enquiry is sent. */}
      <section aria-labelledby="after-heading" className="bg-surface-raised">
        <div className="shell grid items-center gap-8 py-12 lg:grid-cols-[14rem_1fr] lg:gap-12">
          <div>
            <h2 id="after-heading" className="font-display text-2xl leading-tight text-ink">
              What happens after you submit an enquiry?
            </h2>
            <p className="pt-2 text-grey">From your requirements to the right solution.</p>
          </div>

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {afterSteps.map(({ icon: Icon, title, text }, index) => (
              <li key={title}>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-deep font-display text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon aria-hidden className="h-6 w-6 text-grey" />
                </div>
                <h3 className="pt-3 font-display text-base leading-snug text-ink">{title}</h3>
                <p className="pt-1 text-grey">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Location, with the application expert beside the map. */}
      <section aria-labelledby="location-heading" className="bg-surface">
        <div className="shell py-14">
          <p className="eyebrow text-brand-deep">Location</p>
          <h2 id="location-heading" className="font-display text-3xl text-ink">
            Find our Jaipur plant
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <div className="h-[22rem] overflow-hidden rounded-lg border border-hairline lg:h-auto lg:min-h-[22rem]">
              <iframe
                title="BVK Hydrotech India Pvt. Ltd., Jhotwara Industrial Area, Jaipur"
                src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d450688.5224016112!2d73.37349999999999!3d28.0549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x396db370ef98741b%3A0x2ae4c2ebbec7977a!2sBVK%20Hydrotech%20India%20Pvt.%20Ltd.%2C%2052-B%20(Part%2C%20Jhotwara%20Industrial%20Area%2C%20Jhotwara%2C%20Jaipur%2C%20Jaipur%20Nagar%20Nigam%20Area%2C%20Rajasthan%20302012!3m2!1d26.950719199999998!2d75.749681!5e0!3m2!1sen!2sin!4v1790074817878!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="block h-full w-full"
              />
            </div>

            <ul className="grid content-start gap-4">
              {units.map((unit, index) => (
                <li key={unit.label} className="flex gap-3 rounded-lg border border-hairline bg-surface p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-deep font-display text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-base text-ink">
                      {unit.label}
                      {unit.note ? ` (${unit.note})` : ""}
                    </p>
                    <p className="whitespace-pre-line pt-1 text-grey">{unit.address}</p>
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-2 inline-flex items-center gap-1.5 font-semibold text-brand-deep"
                    >
                      Get directions
                      <ArrowUpRight
                        aria-hidden
                        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-lg border border-hairline bg-surface p-5">
              <h3 className="font-display text-lg text-ink">Your Application Expert</h3>
              <div className="mt-4 flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-wash font-display text-lg text-brand-deep"
                >
                  MV
                </span>
                <div>
                  <p className="font-display text-base text-ink">Milap Verma</p>
                  <p className="text-grey">General Manager – Sales</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-grey">
                {settings.phone && (
                  <li className="flex items-center gap-2">
                    <Phone aria-hidden className="h-4 w-4 text-brand-deep" />
                    <a href={tel(settings.phone)} className="hover:text-brand-deep">
                      {settings.phone}
                    </a>
                  </li>
                )}
                {settings.email && (
                  <li className="flex items-center gap-2">
                    <Mail aria-hidden className="h-4 w-4 text-brand-deep" />
                    <a href={`mailto:${settings.email}`} className="hover:text-brand-deep">
                      {settings.email}
                    </a>
                  </li>
                )}
              </ul>
              <Link href="#enquiry" className="btn btn-green mt-5 w-fit">
                Connect with our expert
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FaqAccordion
        faqs={faqs}
        title="Contact & RFQ FAQs"
        description="Questions about sharing requirements, drawings and technical enquiry details."
      />

      <CertificationsStrip items={certifications} />
    </>
  );
}
