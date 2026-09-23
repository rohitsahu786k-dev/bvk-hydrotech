import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HomeStat, WPImage } from "@/lib/wordpress/home";

interface SustainabilityProps {
  title?: string | null;
  description?: string | null;
  stats: HomeStat[];
  image: WPImage | null;
}

/**
 * Sustainability, a required homepage element in the PO. Copy and metrics are
 * authored on the Sustainability page in WordPress and surfaced here, so the
 * two never drift apart.
 */
export default function SustainabilitySection({
  title,
  description,
  stats,
  image,
}: SustainabilityProps) {
  if (!title && !stats.length) return null;

  return (
    <section className="relative isolate overflow-hidden bg-ink-raised">
      {image?.sourceUrl && (
        <>
          <Image
            src={image.sourceUrl}
            alt=""
            fill
            sizes="100vw"
            className="-z-10 object-cover"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-ink/88" />
        </>
      )}

      <div className="shell section">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow text-brand">Sustainability</p>
            <h2 className="display-section mt-5 text-balance text-white">{title}</h2>
            {description && (
              <p className="mt-6 max-w-xl text-base leading-relaxed text-on-dark-muted lg:text-lg">
                {description}
              </p>
            )}
            <Link href="/sustainability" className="btn btn-green group mt-9">
              Our ESG commitments
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {stats.length > 0 && (
            <dl className="grid gap-px self-start border border-ink-line bg-ink-line sm:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-ink-raised p-8">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-4xl font-extrabold tracking-tight text-brand lg:text-5xl">
                    {stat.number}
                  </dd>
                  <p className="mt-3 text-sm leading-snug text-on-dark-muted">{stat.label}</p>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
