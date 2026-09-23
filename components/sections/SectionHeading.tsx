import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "light";
  align?: "start" | "center";
  action?: ReactNode;
}

/**
 * Shared section header. `tone` says which ground it sits on, because the
 * brand palette uses different accents on dark and light: bright brand green
 * reads well on ink, but the guidelines require green-deep on white.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
  align = "start",
  action,
}: SectionHeadingProps) {
  const onDark = tone === "dark";

  return (
    <div
      className={`flex flex-col gap-6 ${
        action ? "lg:flex-row lg:items-end lg:justify-between" : ""
      } ${align === "center" ? "items-center text-center" : ""}`}
    >
      <div className={align === "center" ? "max-w-3xl" : "max-w-3xl"}>
        {eyebrow && (
          <p className={`eyebrow ${onDark ? "text-brand" : "text-brand-deep"}`}>{eyebrow}</p>
        )}
        <h2 className={`display-section mt-5 text-balance ${onDark ? "text-white" : "text-ink"}`}>
          {title}
        </h2>
        {description && (
          <p
            className={`mt-5 text-base leading-relaxed lg:text-lg ${
              onDark ? "text-on-dark-muted" : "text-grey"
            }`}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
