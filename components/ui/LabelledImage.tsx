import Image from "next/image";
import type { ImageLabel } from "@/lib/content/types";

/** The coordinate space the label positions and pointer targets are written in. */
const W = 1600;
const H = 900;

/**
 * A product image with real text labels and pointer lines on top of it.
 *
 * The labels are live text rather than baked into the picture, so they stay
 * sharp, can be read by search engines and screen readers, and can be edited
 * in content/pages. Positions are percentages of a 16:9 frame; the pointer
 * targets (`dot`) are pixel positions on the 1600 x 900 artwork. The type
 * scales with the width of the frame, and below the sm breakpoint, where
 * labels would be too small to read, they become a list under the image.
 */
export default function LabelledImage({
  src,
  alt,
  labels,
}: {
  src: string;
  alt: string;
  labels: ImageLabel[];
}) {
  // The pointer starts at the bullet beside each label's title.
  const points = labels.map((label) => {
    const bullet: [number, number] = [(label.x / 100) * W + 9, (label.y / 100) * H + 19];
    const [dx, dy] = label.dot;
    const bend: [number, number] = [bullet[0], bullet[1] + (dy - bullet[1]) * 0.55];
    return { bullet, bend, dot: [dx, dy] as [number, number] };
  });

  return (
    <figure>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-hairline bg-white [container-type:inline-size]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 1180px, 94vw"
          className="object-contain"
        />

        <svg
          aria-hidden
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
        >
          {points.map((p, i) => (
            <g key={i}>
              <polyline
                points={`${p.bullet.join(",")} ${p.bend.join(",")} ${p.dot.join(",")}`}
                fill="none"
                stroke="var(--color-brand-deep)"
                strokeWidth="1.6"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              <circle cx={p.dot[0]} cy={p.dot[1]} r="11" fill="#fff" />
              <circle cx={p.dot[0]} cy={p.dot[1]} r="6.5" fill="var(--color-brand-deep)" />
            </g>
          ))}
        </svg>

        {labels.map((label) => (
          <div
            key={label.title}
            className="absolute hidden sm:block"
            style={{ left: `${label.x}%`, top: `${label.y}%`, width: `${label.w}%` }}
          >
            <p
              className="flex items-start gap-[0.6cqw] font-display leading-tight text-ink"
              style={{ fontSize: "clamp(0.7rem, 1.6cqw, 1.2rem)" }}
            >
              <span
                aria-hidden
                className="mt-[0.35cqw] block h-[1cqw] min-h-2 w-[1cqw] min-w-2 shrink-0 rounded-full bg-brand-deep ring-2 ring-white"
              />
              {label.title}
            </p>
            {label.text && (
              <p
                className="mt-[0.35cqw] pl-[1.6cqw] leading-snug text-grey"
                style={{ fontSize: "clamp(0.6rem, 1.15cqw, 0.9rem)" }}
              >
                {label.text}
              </p>
            )}
          </div>
        ))}
      </div>

      <ul className="mt-4 grid gap-3 sm:hidden">
        {labels.map((label) => (
          <li key={label.title} className="flex items-start gap-3 text-sm">
            <span aria-hidden className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-deep" />
            <span>
              <span className="font-display text-ink">{label.title}</span>
              {label.text && <span className="block text-xs text-grey">{label.text}</span>}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
