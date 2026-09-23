import type { Metadata } from "next";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import RfqForm from "@/components/forms/RfqForm";
import FaqAccordion from "@/components/sections/FaqAccordion";
import PageHero from "@/components/sections/PageHero";
import { getChrome } from "@/lib/wordpress/home";
import { getPageFaqs } from "@/lib/wordpress/pages";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Contact & Technical RFQ",
  description:
    "Send drawings, cell chemistry and target porosity to BVK Hydrotech. Our application engineers respond with a material recommendation, a mesh design proposal and an indicative lead time.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  // This route has its own template (the RFQ form), so the hero copy lives
  // here rather than in the CMS; the contact details still come from
  // Site Settings so they are maintained in one place.
  const [{ settings }, faqs] = await Promise.all([getChrome(), getPageFaqs("contact")]);

  return (
    <>
      <PageHero
        title="Contact & RFQ"
        hero={{
          badge: "CONTACT",
          title: "Start a technical enquiry",
          subtitle:
            "Send drawings, cell chemistry and target porosity. Our application engineers respond with a material recommendation, a mesh design proposal and an indicative lead time.",
          image: null,
          buttonText: null,
          buttonUrl: null,
          button2Text: null,
          button2Url: null,
        }}
      />

      <section className="section bg-surface">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <aside>
            <h2 className="font-display text-xl font-bold tracking-tight text-ink">
              Talk to our application engineers
            </h2>
            <span aria-hidden className="rule-green mt-5 block" />

            <dl className="mt-8 space-y-7">
              {settings.address && (
                <div className="flex gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-deep" />
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-grey-soft">
                      Registered office
                    </dt>
                    <dd className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-grey">
                      {settings.address}
                    </dd>
                  </div>
                </div>
              )}

              {settings.factoryAddress && (
                <div className="flex gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-deep" />
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-grey-soft">
                      Manufacturing
                    </dt>
                    <dd className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-grey">
                      {settings.factoryAddress}
                    </dd>
                  </div>
                </div>
              )}

              {settings.phone && (
                <div className="flex gap-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-deep" />
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-grey-soft">
                      Phone
                    </dt>
                    <dd className="mt-1.5 text-sm text-grey">
                      <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-brand-deep">
                        {settings.phone}
                      </a>
                      {settings.phone2 && (
                        <>
                          <br />
                          <a href={`tel:${settings.phone2.replace(/\s/g, "")}`} className="transition-colors hover:text-brand-deep">
                            {settings.phone2}
                          </a>
                        </>
                      )}
                    </dd>
                  </div>
                </div>
              )}

              {settings.email && (
                <div className="flex gap-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-deep" />
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-grey-soft">
                      Email
                    </dt>
                    <dd className="mt-1.5 text-sm text-grey">
                      <a href={`mailto:${settings.email}`} className="transition-colors hover:text-brand-deep">
                        {settings.email}
                      </a>
                    </dd>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-deep" />
                <div>
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-grey-soft">
                    Response time
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-grey">
                    Technical enquiries are answered within one working day, IST.
                  </dd>
                </div>
              </div>
            </dl>
          </aside>

          <div className="border border-hairline bg-surface-raised p-7 lg:p-10">
            <h2 className="font-display text-lg font-bold tracking-tight text-ink">
              Technical RFQ
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-grey">
              The more specification you share, the more precise our first response.
            </p>
            <div className="mt-8">
              <RfqForm />
            </div>
          </div>
        </div>
      </section>


      {/* Full-bleed factory location. The iframe sits outside .shell so the map
          runs edge to edge; Google's embed is lazy-loaded and carries no
          cookies until it is scrolled into view. */}
      <section aria-labelledby="location-heading" className="bg-white">
        <div className="shell pt-16 lg:pt-20">
          <p className="eyebrow text-brand-deep">Location</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="location-heading"
              className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
            >
              Find our Jaipur plant
            </h2>
            <a
              href="https://maps.app.goo.gl/t8tCwgSwdgEfvbNa6"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-deep"
            >
              Get directions
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div className="mt-10 h-[420px] w-full lg:h-[520px]">
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
      </section>

      <FaqAccordion
        faqs={faqs}
        title="Contact & RFQ FAQs"
        description="Questions about sharing requirements, drawings and technical enquiry details."
      />
    </>
  );
}
