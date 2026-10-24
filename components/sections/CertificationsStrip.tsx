import Image from "next/image";
import InfiniteSlider from "@/components/ui/InfiniteSlider";
import { certifications } from "@/content/certifications";

/**
 * Quality credentials. B2B buyers screen on these before they read anything
 * else, so they get a clear white carousel band near the bottom of the page.
 */
export default function CertificationsStrip({
  title = "Certified quality, safety and compliance",
  description = "Recognised management systems and compliance badges supporting precision mesh manufacturing for industrial, energy and aerospace applications.",
}: {
  /** Kept so existing call sites compile; the set of marks is fixed. */
  items?: unknown;
  title?: string;
  description?: string;
}) {
  return (
    <section
      aria-labelledby="certifications-heading"
      className="overflow-hidden border-y border-hairline bg-white text-ink"
    >
      <div className="shell py-16 lg:py-20">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-brand-deep">Certifications</p>
            <h2 id="certifications-heading" className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl">
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
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex h-48 w-52 shrink-0 flex-col items-center justify-center border border-hairline bg-white p-6 text-center"
            >
              <span className="relative block h-24 w-28">
                <Image
                  src={`/media/${cert.file}`}
                  alt={cert.name}
                  fill
                  sizes="112px"
                  className="object-contain"
                />
              </span>
              <p className="mt-5 min-h-10 text-sm font-semibold leading-tight text-ink">{cert.name}</p>
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
