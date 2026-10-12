import Image from "next/image";
import type { ReactNode } from "react";

const PATTERN_BG = "/media/bg-pattern-scaled.webp";

/**
 * The compact dark hero shared by the blog index and every article. Same
 * pattern base, gradient and type scale as PageHero, at roughly half the height
 * so the first article is visible without scrolling.
 */
export default function BlogHero({
  eyebrow,
  title,
  children,
  lead,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  lead?: string;
}) {
  return (
    <section className="on-ink relative isolate overflow-hidden bg-ink pb-12 pt-32 lg:pb-14 lg:pt-36">
      <Image src={PATTERN_BG} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30"
      />
      <div className="shell">
        <div className="max-w-3xl">
          <p className="eyebrow text-brand">{eyebrow}</p>
          <h1 className="mt-4 text-balance font-display text-white">{title}</h1>
          {lead && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-dark-muted">{lead}</p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
