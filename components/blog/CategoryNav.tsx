import Link from "next/link";
import type { BlogCategory } from "@/lib/wordpress/blog";

/** The blog's category filter: every WordPress category with its article count. */
export default function CategoryNav({
  categories,
  active,
}: {
  categories: BlogCategory[];
  active?: string;
}) {
  if (categories.length === 0) return null;

  const chip = (isActive: boolean) =>
    `inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
      isActive
        ? "border-brand-deep bg-brand-deep text-white"
        : "border-hairline bg-surface text-ink hover:border-brand-deep/50 hover:text-brand-deep"
    }`;

  return (
    <nav aria-label="Blog categories" className="mb-10 flex flex-wrap gap-2">
      <Link href="/blog" className={chip(!active)} aria-current={!active ? "page" : undefined}>
        All articles
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/blog/category/${category.slug}`}
          className={chip(active === category.slug)}
          aria-current={active === category.slug ? "page" : undefined}
        >
          {category.name}
          <span className="text-xs opacity-70">{category.count}</span>
        </Link>
      ))}
    </nav>
  );
}
