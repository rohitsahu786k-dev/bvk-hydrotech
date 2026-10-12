import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogListing from "@/components/blog/BlogListing";
import { getPostsPage } from "@/lib/wordpress/blog";

export const revalidate = 900;

type PageProps = { params: Promise<{ page: string }> };

/** Pages 2 and up of the blog index. Page 1 is /blog itself. */
export async function generateStaticParams() {
  const { totalPages } = await getPostsPage(1);
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Blog, page ${page} | Precision Mesh Insights`,
    alternates: { canonical: `/blog/page/${page}` },
  };
}

export default async function BlogPageN({ params }: PageProps) {
  const number = Number((await params).page);
  if (!Number.isInteger(number) || number < 2) notFound();

  const { posts } = await getPostsPage(number);
  if (posts.length === 0) notFound();

  return <BlogListing page={number} />;
}
