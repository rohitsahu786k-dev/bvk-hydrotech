/**
 * WordPress API helper functions
 * These functions wrap GraphQL queries with proper typing and error handling
 */

import fetchGraphQL from "./graphql-client";
import * as Q from "./queries";
import type {
  WPPage, WPPost, WPProduct, WPService, WPIndustry,
  WPTeamMember, WPTestimonial, WPCaseStudy, WPFaq,
  WPDownload, WPMenu, WPSiteSettings, WPConnection,
} from "./types";

// ============================================================================
// PAGES
// ============================================================================

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  try {
    const data = await fetchGraphQL<{ page: WPPage }>(
      Q.GET_PAGE_BY_SLUG,
      { variables: { slug }, revalidate: 3600, tags: ["wp-pages"] }
    );
    return data?.page || null;
  } catch {
    return null;
  }
}

export async function getFrontPage(): Promise<WPPage | null> {
  try {
    const data = await fetchGraphQL<{ page: WPPage }>(
      Q.GET_FRONT_PAGE,
      { revalidate: 3600, tags: ["wp-front-page", "wp-pages"] }
    );
    return data?.page || null;
  } catch {
    return null;
  }
}

export async function getAllPageSlugs(): Promise<{ slug: string; uri: string }[]> {
  try {
    const data = await fetchGraphQL<{ pages: WPConnection<{ slug: string; uri: string }> }>(
      Q.GET_ALL_PAGE_SLUGS,
      { revalidate: 86400 }
    );
    return data?.pages?.nodes || [];
  } catch {
    return [];
  }
}

// ============================================================================
// POSTS / BLOG
// ============================================================================

export async function getAllPosts(first = 12, after?: string): Promise<{
  nodes: WPPost[];
  hasNextPage: boolean;
  endCursor?: string;
}> {
  try {
    const data = await fetchGraphQL<{ posts: WPConnection<WPPost> }>(
      Q.GET_ALL_POSTS,
      { variables: { first, after }, revalidate: 1800, tags: ["wp-posts"] }
    );
    return {
      nodes: data?.posts?.nodes || [],
      hasNextPage: data?.posts?.pageInfo?.hasNextPage || false,
      endCursor: data?.posts?.pageInfo?.endCursor,
    };
  } catch {
    return { nodes: [], hasNextPage: false };
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const data = await fetchGraphQL<{ post: WPPost }>(
      Q.GET_POST_BY_SLUG,
      { variables: { slug }, revalidate: 3600, tags: ["wp-posts"] }
    );
    return data?.post || null;
  } catch {
    return null;
  }
}

export async function getRecentPosts(first = 3): Promise<WPPost[]> {
  try {
    const data = await fetchGraphQL<{ posts: WPConnection<WPPost> }>(
      Q.GET_RECENT_POSTS,
      { variables: { first }, revalidate: 1800, tags: ["wp-posts"] }
    );
    return data?.posts?.nodes || [];
  } catch {
    return [];
  }
}

export async function getAllPostSlugs(): Promise<{ slug: string; uri: string }[]> {
  try {
    const data = await fetchGraphQL<{ posts: WPConnection<{ slug: string; uri: string }> }>(
      Q.GET_ALL_POST_SLUGS,
      { revalidate: 86400 }
    );
    return data?.posts?.nodes || [];
  } catch {
    return [];
  }
}

// ============================================================================
// PRODUCTS
// ============================================================================

export async function getAllProducts(): Promise<WPProduct[]> {
  try {
    const data = await fetchGraphQL<{ products: WPConnection<WPProduct> }>(
      Q.GET_ALL_PRODUCTS,
      { revalidate: 3600, tags: ["wp-products"] }
    );
    return data?.products?.nodes || [];
  } catch {
    return [];
  }
}

export async function getFeaturedProducts(first = 6): Promise<WPProduct[]> {
  try {
    const data = await fetchGraphQL<{ products: WPConnection<WPProduct> }>(
      Q.GET_FEATURED_PRODUCTS,
      { variables: { first }, revalidate: 3600, tags: ["wp-products"] }
    );
    return data?.products?.nodes || [];
  } catch {
    // Fallback: get all products and filter client-side
    const all = await getAllProducts();
    return all.filter(p => p.productDetails?.isFeatured).slice(0, first);
  }
}

export async function getProductBySlug(slug: string): Promise<WPProduct | null> {
  try {
    const data = await fetchGraphQL<{ product: WPProduct }>(
      Q.GET_PRODUCT_BY_SLUG,
      { variables: { slug }, revalidate: 3600, tags: ["wp-products"] }
    );
    return data?.product || null;
  } catch {
    return null;
  }
}

export async function getAllProductSlugs(): Promise<{ slug: string; uri: string }[]> {
  try {
    const data = await fetchGraphQL<{ products: WPConnection<{ slug: string; uri: string }> }>(
      Q.GET_ALL_PRODUCT_SLUGS,
      { revalidate: 86400 }
    );
    return data?.products?.nodes || [];
  } catch {
    return [];
  }
}

// ============================================================================
// SERVICES
// ============================================================================

export async function getAllServices(): Promise<WPService[]> {
  try {
    const data = await fetchGraphQL<{ services: WPConnection<WPService> }>(
      Q.GET_ALL_SERVICES,
      { revalidate: 3600, tags: ["wp-services"] }
    );
    return data?.services?.nodes || [];
  } catch {
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<WPService | null> {
  try {
    const data = await fetchGraphQL<{ service: WPService }>(
      Q.GET_SERVICE_BY_SLUG,
      { variables: { slug }, revalidate: 3600, tags: ["wp-services"] }
    );
    return data?.service || null;
  } catch {
    return null;
  }
}

// ============================================================================
// INDUSTRIES
// ============================================================================

export async function getAllIndustries(): Promise<WPIndustry[]> {
  try {
    const data = await fetchGraphQL<{ industries: WPConnection<WPIndustry> }>(
      Q.GET_ALL_INDUSTRIES,
      { revalidate: 3600, tags: ["wp-industries"] }
    );
    return data?.industries?.nodes || [];
  } catch {
    return [];
  }
}

export async function getIndustryBySlug(slug: string): Promise<WPIndustry | null> {
  try {
    const data = await fetchGraphQL<{ industry: WPIndustry }>(
      Q.GET_INDUSTRY_BY_SLUG,
      { variables: { slug }, revalidate: 3600, tags: ["wp-industries"] }
    );
    return data?.industry || null;
  } catch {
    return null;
  }
}

// ============================================================================
// TESTIMONIALS
// ============================================================================

export async function getAllTestimonials(): Promise<WPTestimonial[]> {
  try {
    const data = await fetchGraphQL<{ testimonials: WPConnection<WPTestimonial> }>(
      Q.GET_ALL_TESTIMONIALS,
      { revalidate: 3600, tags: ["wp-testimonials"] }
    );
    return data?.testimonials?.nodes || [];
  } catch {
    return [];
  }
}

// ============================================================================
// TEAM
// ============================================================================

export async function getAllTeamMembers(): Promise<WPTeamMember[]> {
  try {
    const data = await fetchGraphQL<{ teamMembers: WPConnection<WPTeamMember> }>(
      Q.GET_ALL_TEAM_MEMBERS,
      { revalidate: 3600, tags: ["wp-team"] }
    );
    return data?.teamMembers?.nodes || [];
  } catch {
    return [];
  }
}

// ============================================================================
// FAQs
// ============================================================================

export async function getAllFAQs(): Promise<WPFaq[]> {
  try {
    const data = await fetchGraphQL<{ faqs: WPConnection<WPFaq> }>(
      Q.GET_ALL_FAQS,
      { revalidate: 3600, tags: ["wp-faqs"] }
    );
    return data?.faqs?.nodes || [];
  } catch {
    return [];
  }
}

// ============================================================================
// DOWNLOADS
// ============================================================================

export async function getAllDownloads(): Promise<WPDownload[]> {
  try {
    const data = await fetchGraphQL<{ downloads: WPConnection<WPDownload> }>(
      Q.GET_ALL_DOWNLOADS,
      { revalidate: 3600, tags: ["wp-downloads"] }
    );
    return data?.downloads?.nodes || [];
  } catch {
    return [];
  }
}

// ============================================================================
// CASE STUDIES
// ============================================================================

export async function getAllCaseStudies(): Promise<WPCaseStudy[]> {
  try {
    const data = await fetchGraphQL<{ caseStudies: WPConnection<WPCaseStudy> }>(
      Q.GET_ALL_CASE_STUDIES,
      { revalidate: 3600, tags: ["wp-case-studies"] }
    );
    return data?.caseStudies?.nodes || [];
  } catch {
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<WPCaseStudy | null> {
  try {
    const data = await fetchGraphQL<{ caseStudy: WPCaseStudy }>(
      Q.GET_CASE_STUDY_BY_SLUG,
      { variables: { slug }, revalidate: 3600, tags: ["wp-case-studies"] }
    );
    return data?.caseStudy || null;
  } catch {
    return null;
  }
}

// ============================================================================
// MENUS
// ============================================================================

export async function getMenuBySlug(slug: string): Promise<WPMenu | null> {
  try {
    const data = await fetchGraphQL<{ menu: WPMenu }>(
      Q.GET_MENU_BY_SLUG,
      { variables: { slug }, revalidate: 86400, tags: ["wp-menus"] }
    );
    return data?.menu || null;
  } catch {
    return null;
  }
}

export async function getAllMenus(): Promise<WPMenu[]> {
  try {
    const data = await fetchGraphQL<{ menus: WPConnection<WPMenu> }>(
      Q.GET_ALL_MENUS,
      { revalidate: 86400, tags: ["wp-menus"] }
    );
    return data?.menus?.nodes || [];
  } catch {
    return [];
  }
}

// ============================================================================
// SITE SETTINGS
// ============================================================================

export async function getSiteSettings(): Promise<WPSiteSettings | null> {
  try {
    const data = await fetchGraphQL<{ pages: WPConnection<{ siteSettings: WPSiteSettings }> }>(
      Q.GET_SITE_SETTINGS,
      { revalidate: 86400, tags: ["wp-settings"] }
    );
    return data?.pages?.nodes?.[0]?.siteSettings || null;
  } catch {
    return null;
  }
}

export async function getSiteInfo(): Promise<{
  title?: string;
  description?: string;
  url?: string;
} | null> {
  try {
    const data = await fetchGraphQL<{ generalSettings: { title: string; description: string; url: string } }>(
      Q.GET_SITE_INFO,
      { revalidate: 86400 }
    );
    return data?.generalSettings || null;
  } catch {
    return null;
  }
}
