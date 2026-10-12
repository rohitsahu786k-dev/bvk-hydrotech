import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const href = (page: number) => (page === 1 ? "/blog" : `/blog/page/${page}`);

/** First, last, the current page and its neighbours; gaps become an ellipsis. */
function pageList(current: number, total: number): (number | "gap")[] {
  const wanted = new Set([1, total, current - 1, current, current + 1]);
  const pages = [...wanted].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) out.push("gap");
    out.push(p);
  });
  return out;
}

const cell =
  "flex h-10 min-w-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors";

/** Previous / numbered / next links for the blog index. Renders nothing for one page. */
export default function Pagination({ current, total }: { current: number; total: number }) {
  if (total <= 1) return null;

  return (
    <nav aria-label="Blog pages" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {current > 1 ? (
        <Link
          href={href(current - 1)}
          rel="prev"
          aria-label="Previous page"
          className={`${cell} border-hairline bg-surface text-ink hover:border-brand hover:text-brand-deep`}
        >
          <ChevronLeft aria-hidden className="h-4 w-4" />
        </Link>
      ) : (
        <span aria-hidden className={`${cell} border-hairline text-grey-soft opacity-50`}>
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      {pageList(current, total).map((item, index) =>
        item === "gap" ? (
          <span key={`gap-${index}`} aria-hidden className="px-1 text-grey-mid">
            …
          </span>
        ) : (
          <Link
            key={item}
            href={href(item)}
            aria-label={`Page ${item}`}
            aria-current={item === current ? "page" : undefined}
            className={`${cell} ${
              item === current
                ? "border-brand-deep bg-brand-deep text-white"
                : "border-hairline bg-surface text-ink hover:border-brand hover:text-brand-deep"
            }`}
          >
            {item}
          </Link>
        ),
      )}

      {current < total ? (
        <Link
          href={href(current + 1)}
          rel="next"
          aria-label="Next page"
          className={`${cell} border-hairline bg-surface text-ink hover:border-brand hover:text-brand-deep`}
        >
          <ChevronRight aria-hidden className="h-4 w-4" />
        </Link>
      ) : (
        <span aria-hidden className={`${cell} border-hairline text-grey-soft opacity-50`}>
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
