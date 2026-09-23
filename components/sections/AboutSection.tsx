import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HomeData } from "@/lib/wordpress/home";

/**
 * The "who we are" block, on a light ground. The brand guidelines place the
 * wordmark and brand green on white or very light neutrals, so the page steps
 * out of the dark hero here.
 */
export default function AboutSection({ about }: { about: HomeData["about"] }) {
  if (!about.title && !about.content) return null;

  const paragraphs = (about.content ?? "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="section bg-surface">
      <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow text-brand-deep">Who we are</p>
          <h2 className="display-section mt-5 text-balance text-ink">{about.title}</h2>
          <span aria-hidden className="rule-green mt-7 block" />

          <div className="mt-7 space-y-5">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-grey lg:text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <Link href="/about" className="btn btn-outline-dark group mt-9">
            More about BVK Hydrotech
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {about.image?.sourceUrl && (
          <div className="relative aspect-4/3 w-full overflow-hidden lg:aspect-square">
            <Image
              src={about.image.sourceUrl}
              alt={about.image.altText || ""}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
