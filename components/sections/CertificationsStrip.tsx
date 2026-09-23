import Image from "next/image";
import InfiniteSlider from "@/components/ui/InfiniteSlider";
import type { Certification } from "@/lib/wordpress/home";

/**
 * Quality credentials. B2B buyers screen on these before they read anything
 * else, so they get a clear white carousel band near the bottom of the page.
 */
export default function CertificationsStrip({
  items,
  title = "Certified quality, safety and compliance",
  description = "Recognised management systems and compliance badges supporting precision mesh manufacturing for industrial, energy and aerospace applications.",
}: {
  items: Certification[];
  title?: string;
  description?: string;
}) {
  if (!items.length) return null;

  return (
    <section
      aria-labelledby="certifications-heading"
      className="overflow-hidden border-y border-hairline bg-white text-ink"
    >
      <div className="shell py-16 lg:py-20">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-brand-deep">Certifications</p>
            <h2
              id="certifications-heading"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
            >
              {title}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-grey">{description}</p>
        </div>

        <InfiniteSlider
          gap={20}
          duration={45}
          durationOnHover={110}
          className="mt-10 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        >
          {items.map((cert) => (
            <div
              key={cert.title}
              className="flex h-48 w-52 shrink-0 flex-col items-center justify-center border border-hairline bg-white p-6 text-center"
            >
              {cert.logo?.sourceUrl ? (
                <span className="relative block h-24 w-28">
                  <Image
                    src={cert.logo.sourceUrl}
                    alt={cert.logo.altText || cert.standard || cert.title}
                    fill
                    sizes="112px"
                    className="object-contain"
                  />
                </span>
              ) : (
                <span aria-hidden className="block h-0.5 w-10 bg-brand" />
              )}

              <p className="mt-5 min-h-10 text-sm font-semibold leading-tight text-ink">
                {cert.standard || cert.title}
              </p>
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
