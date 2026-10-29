import { Activity, Flag, Globe2, Users } from "lucide-react";

const ICONS = [Flag, Globe2, Users, Activity];

/** Up to four headline numbers, sitting at the foot of the banner. */
export default function EventsStats({ stats }: { stats: { number: string; label: string }[] }) {
  if (stats.length === 0) return null;

  return (
    <section aria-label="Events at a glance" className="relative z-10 pb-8 pt-12 lg:pb-10 lg:pt-14">
      <ul className="shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <li
              key={`${stat.number}-${stat.label}`}
              className="flex items-center gap-4 rounded-lg border border-hairline bg-surface p-5 shadow-[0_18px_40px_-28px_rgb(0_0_0/0.45)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-brand-wash text-brand-deep">
                <Icon aria-hidden className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-display text-2xl leading-none text-ink">{stat.number}</span>
                <span className="mt-1 block text-sm text-grey">{stat.label}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
