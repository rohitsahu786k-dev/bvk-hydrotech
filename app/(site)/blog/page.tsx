import type { Metadata } from "next";
import BlogListing from "@/components/blog/BlogListing";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Blog | Precision Mesh Insights",
  description:
    "Articles from BVK Hydrotech engineers on mesh materials, knitted and woven construction, electrolyser and fuel cell components, and filtration.",
  alternates: { canonical: "/blog" },
  openGraph: { type: "website", url: "/blog", title: "BVK Hydrotech Blog" },
};

export default function BlogIndexPage() {
  return <BlogListing page={1} />;
}
