import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { formatPostDate, type BlogPost } from "@/lib/wordpress/blog";

const PATTERN_BG = "/media/bg-pattern-scaled.webp";

/** The article thumbnail; posts without a featured image get the brand pattern. */
export function PostImage({
  post,
  sizes,
  priority,
}: {
  post: BlogPost;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <span className="relative block h-full w-full overflow-hidden bg-ink">
      <Image
        src={post.image?.src ?? PATTERN_BG}
        alt={post.image?.alt ?? ""}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      {!post.image && (
        <span className="absolute inset-0 flex items-end p-5">
          <span className="eyebrow text-brand">{post.category?.name ?? "Article"}</span>
        </span>
      )}
    </span>
  );
}

export function PostMeta({ post, className = "" }: { post: BlogPost; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] leading-none text-grey-mid ${className}`}>
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      <span aria-hidden className="h-1 w-1 rounded-full bg-hairline" />
      <span className="inline-flex items-center gap-1">
        <Clock aria-hidden className="h-3 w-3" />
        {post.minutes} min read
      </span>
    </p>
  );
}

/** One article in a grid. The whole card is the link. */
export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="h-full">
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-surface transition duration-300 hover:-translate-y-1 hover:border-brand-deep/40 hover:shadow-[0_24px_40px_-28px_rgb(0_0_0/0.35)]"
      >
        <span className="relative block aspect-[16/10] overflow-hidden">
          <PostImage post={post} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
          {post.category && post.image && (
            <span className="absolute left-4 top-4 rounded-full bg-brand px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-white">
              {post.category.name}
            </span>
          )}
        </span>

        <span className="flex flex-1 flex-col gap-3 p-5">
          <PostMeta post={post} />
          <h3 className="font-display text-lg leading-snug text-ink transition-colors group-hover:text-brand-deep">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="line-clamp-3 text-[12px] leading-relaxed text-grey">{post.excerpt}</p>
          )}
          <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-brand-deep">
            Read article
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </span>
      </Link>
    </article>
  );
}
