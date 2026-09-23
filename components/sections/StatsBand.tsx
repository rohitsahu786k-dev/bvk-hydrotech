import type { HomeStat } from "@/lib/wordpress/home";

/**
 * Credibility metrics, immediately under the hero — the PO lists these as a
 * required homepage element. Values are authored on the Home page in ACF.
 */
export default function StatsBand({ stats }: { stats: HomeStat[] }) {
  if (!stats.length) return null;

  return (
    <section aria-label="Company at a glance" className="border-y border-ink-line bg-ink-raised">
      <div className="shell">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label || i}
              className={`flex flex-col gap-2 py-10 lg:py-14 ${
                i % 2 === 1 ? "border-l border-ink-line pl-6" : "pr-6"
              } ${i >= 2 ? "border-t border-ink-line lg:border-t-0" : ""} ${
                i === 2 ? "lg:border-l lg:pl-6" : ""
              } ${i === 3 ? "lg:pl-6" : ""} ${i === 0 || i === 2 ? "lg:pl-6" : ""}`}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-4xl font-extrabold tracking-tight text-white lg:text-6xl">
                {stat.number}
              </dd>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-on-dark-faint lg:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
