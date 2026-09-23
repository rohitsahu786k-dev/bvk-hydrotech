/**
 * GraphQL Client for WordPress WPGraphQL
 * All requests to WPGraphQL go through this centralized client
 */

const GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL || "https://dev.bhavcreations.in/graphql";
const WP_USERNAME = process.env.WORDPRESS_USERNAME;
const WP_APP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD;

interface GraphQLRequestOptions {
  variables?: Record<string, unknown>;
  revalidate?: number | false;
  tags?: string[];
  authenticated?: boolean;
}

interface GraphQLResponse<T> {
  data: T;
  errors?: {
    message: string;
    locations?: { line: number; column: number }[];
    path?: string[];
    extensions?: Record<string, unknown>;
  }[];
}

/**
 * Core GraphQL fetcher with Next.js caching support
 */
export async function fetchGraphQL<T = unknown>(
  query: string,
  options: GraphQLRequestOptions = {}
): Promise<T> {
  const { variables, revalidate = 3600, tags = [], authenticated = false } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add auth header for authenticated requests (e.g., drafts preview)
  if (authenticated && WP_USERNAME && WP_APP_PASSWORD) {
    const credentials = Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString("base64");
    headers["Authorization"] = `Basic ${credentials}`;
  }

  const fetchOptions: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: revalidate === false ? undefined : revalidate,
      tags: tags.length > 0 ? tags : undefined,
    },
  };

  // If revalidate is false (no cache), use no-store
  if (revalidate === false) {
    fetchOptions.cache = "no-store";
    delete (fetchOptions as Record<string, unknown>).next;
  }

  try {
    const response = await fetch(GRAPHQL_URL, fetchOptions);

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
    }

    const json: GraphQLResponse<T> = await response.json();

    if (json.errors && json.errors.length > 0) {
      console.error("GraphQL Errors:", json.errors);
      // Don't throw for all errors — return data with partial errors gracefully
    }

    return json.data;
  } catch (error) {
    console.error("GraphQL fetch error:", error);
    throw error;
  }
}

/**
 * Utility: Revalidate tagged cache from WordPress webhook
 */
export function getRevalidateTags(postType: string, id?: string | number): string[] {
  const tags = [`wp-${postType}`, "wp-all"];
  if (id) tags.push(`wp-${postType}-${id}`);
  return tags;
}

export default fetchGraphQL;
