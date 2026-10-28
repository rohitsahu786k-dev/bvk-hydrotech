import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogCard from "@/components/blog/BlogCard";
import BlogHero from "@/components/blog/BlogHero";
import CategoryNav from "@/components/blog/CategoryNav";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonLd";
import { OG_DEFAULT } from "@/lib/seo/defaults";
import { getCategories, getPostsByCategory } from "@/lib/wordpress/blog";

export const revalidate = 900;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getCategories()).map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { category } = await getPostsByCategory(slug);
  if (!category) return {};
  const title = `${category.name} | BVK Hydrotech Blog`;
  const description = `Articles from BVK Hydrotech engineers on ${category.name.toLowerCase()}: materials, construction, treatment and validation of precision metal mesh.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/blog/category/${slug}` },
    openGraph: { type: "website", title, description, url: `/blog/category/${slug}`, images: [OG_DEFAULT] },
  };
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [{ category, posts }, categories] = await Promise.all([getPostsByCategory(slug), getCategories()]);
  if (!category || posts.length === 0) notFound();

  return (
    <>
      <JsonLd data={breadcrumbSchema(category.name, `blog/category/${slug}`)} />
      <BlogHero
        eyebrow="Blog"
        title={category.name}
        lead={`Articles from BVK Hydrotech engineers on ${category.name.toLowerCase()}.`}
      />
      <section className="bg-surface py-12 lg:py-14">
        <div className="shell">
          <CategoryNav categories={categories} active={slug} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
