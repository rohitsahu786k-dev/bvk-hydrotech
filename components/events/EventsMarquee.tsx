import styles from "./Events.module.css";

/**
 * A slim scrolling line of announcements. Pauses on hover and focus, and does
 * not move at all for visitors who ask for reduced motion. The second copy of
 * the list is only there to make the loop seamless, so it is hidden from
 * assistive technology.
 */
export default function EventsMarquee({ items, className = "" }: { items: string[]; className?: string }) {
  if (items.length === 0) return null;

  // Each copy of the list must be wider than the screen or the loop shows a
  // gap, so a short list is repeated until it is.
  const chars = items.reduce((sum, text) => sum + text.length + 6, 0);
  const repeat = Math.max(1, Math.ceil(300 / Math.max(chars, 1)));
  const loop = Array.from({ length: repeat }, () => items).flat();

  // Roughly constant reading speed whatever the amount of text.
  const seconds = Math.max(24, Math.round(chars * repeat * 0.22));

  return (
    <div
      role="region"
      aria-label="Fairs and events announcements"
      className={`${styles.strip} border-y border-white/10 bg-ink/70 py-2.5 text-[0.8125rem] font-medium text-on-dark backdrop-blur-sm ${className}`}
    >
      <div className={styles.track} style={{ "--dur": `${seconds}s` } as React.CSSProperties}>
        {[false, true].map((copy) => (
          <ul key={String(copy)} className={styles.list} aria-hidden={copy || undefined}>
            {loop.map((text, i) => (
              <li key={`${i}-${text}`} className={styles.item}>
                {text}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
