import { STATUS_LABEL } from "@/lib/events/logic";
import type { EventStatus } from "@/lib/events/types";
import styles from "./Events.module.css";

const TONE: Record<EventStatus, string> = {
  upcoming: "bg-brand-deep text-white",
  ongoing: "bg-brand-deep text-white",
  concluded: "bg-ink/85 text-white",
  postponed: "bg-amber-700 text-white",
  cancelled: "bg-red-700 text-white",
};

/** Small coloured pill: Upcoming, Live now, Concluded, Postponed or Cancelled. */
export default function EventStatusBadge({ status, className = "" }: { status: EventStatus; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider ${TONE[status]} ${className}`}
    >
      {status === "ongoing" && <span aria-hidden className={styles.live} />}
      {STATUS_LABEL[status]}
    </span>
  );
}
