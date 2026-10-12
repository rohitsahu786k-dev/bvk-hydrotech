import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostCta as PostCtaData } from "@/lib/wordpress/blog";

/** The brand wave pattern, the same background as every CtaBand. */
const CTA_BG = "/media/pattern-scaled.png";

const external = (url: string) => /^https?:\/\//i.test(url);

function CtaLink({ href, label, variant }: { href: string; label: string; variant: "green" | "outline" }) {
  const cls = `btn ${variant === "green" ? "btn-green" : "btn-outline-light"} group`;
  const arrow = <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />;
  return external(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {label}
      {arrow}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {label}
      {arrow}
    </Link>
  );
}

/**
 * A call to action placed inside an article, authored in the post's custom
 * fields. Wave pattern background, copy on the left, same buttons as the
 * site-wide CtaBand.
 */
export default function PostCta({ cta }: { cta: PostCtaData }) {
  return (
    <aside className="on-ink relative isolate my-10 overflow-hidden rounded-2xl bg-ink">
      <Image
        src={CTA_BG}
        alt=""
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="-z-10 object-cover object-left md:object-fill"
      />
      <div className="p-7 lg:p-9">
        <div className="max-w-md">
          {cta.eyebrow ? (
            <p className="eyebrow text-brand">{cta.eyebrow}</p>
          ) : (
            <span aria-hidden className="rule-green block" />
          )}
          <h3 className="mt-3 text-balance font-display text-xl leading-snug text-white lg:text-2xl">
            {cta.title}
          </h3>
          {cta.text && <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">{cta.text}</p>}
          <div className="mt-5 flex flex-wrap gap-3">
            <CtaLink href={cta.url} label={cta.label} variant="green" />
            {cta.label2 && cta.url2 && <CtaLink href={cta.url2} label={cta.label2} variant="outline" />}
          </div>
        </div>
      </div>
    </aside>
  );
}
