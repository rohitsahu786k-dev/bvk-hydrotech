import type { ReactNode } from "react";
import InnerHeroImage from "@/components/sections/InnerHeroImage";

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
    <section className="on-ink relative isolate flex min-h-[75vw] items-end overflow-hidden bg-ink pb-10 pt-24 md:min-h-[23.82vw] lg:pb-12 lg:pt-28">
      <InnerHeroImage />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/75 via-ink/40 to-transparent"
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
