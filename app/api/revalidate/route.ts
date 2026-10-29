import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand refresh for WordPress content. WordPress (or any caller) sends
 * POST /api/revalidate with the shared secret, so an edited post or page shows
 * up straight away instead of after the 15-minute cache window.
 *
 *   curl -X POST "https://bvkhydrotech.com/api/revalidate?secret=..." \
 *        -H "Content-Type: application/json" -d '{"slug":"my-post"}'
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATION_SECRET;
  const given = request.nextUrl.searchParams.get("secret") ?? request.headers.get("x-revalidate-secret");
  if (!secret || given !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const slug = typeof body?.slug === "string" ? body.slug : "";

  for (const tag of [
    "wp-posts", "wp-pages", "wp-front-page", "wp-home", "wp-all", "wp-menus", "wp-settings",
    "wp-faqs", "wp-certifications", "wp-downloads", "wp-industries", "wp-products",
    "wp-services", "wp-team", "wp-testimonials", "wp-case-studies", "wp-popups", "wp-events", "wp-home-banners", "wp-announcement",
  ]) revalidateTag(tag, "max");
  revalidatePath("/", "layout");
  if (slug) {
    revalidatePath(`/blog/${slug}`);
    revalidatePath(`/${slug}`);
  }
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true, revalidated: true, slug: slug || null });
}
