/**
 * Utility functions for BVK Hydrotech
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind class merger
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date for display
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

// Format date for <time> element
export function formatDateISO(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toISOString();
  } catch {
    return dateString;
  }
}

// Strip HTML from excerpt
export function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

// Truncate text to a given length
export function truncate(text: string, maxLength = 160): string {
  const stripped = stripHtml(text);
  if (stripped.length <= maxLength) return stripped;
  return stripped.substring(0, maxLength).trim() + "…";
}

// Get WordPress image URL with size
export function getImageUrl(
  image: { sourceUrl?: string } | null | undefined,
  fallback = "/images/placeholder.jpg"
): string {
  return image?.sourceUrl || fallback;
}

// Build absolute URL for sharing / canonical
export function absoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bvkhydrotech.com";
  if (path.startsWith("http")) return path;
  return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

// Format phone number for tel: link
export function formatPhoneHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "").replace(/-/g, "")}`;
}

// Format WhatsApp link
export function formatWhatsAppLink(number: string, message?: string): string {
  const cleanNumber = number.replace(/\s+/g, "").replace(/-/g, "").replace("+", "");
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${cleanNumber}${encodedMessage}`;
}

// Decode HTML entities
export function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
    "&rsquo;": "'",
    "&lsquo;": "'",
    "&ldquo;": '"',
    "&rdquo;": '"',
    "&ndash;": "–",
    "&mdash;": "—",
    "&hellip;": "…",
    "&nbsp;": " ",
  };
  return text.replace(/&[a-z#0-9]+;/gi, (match) => entities[match] || match);
}

// Slugify a string
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .trim();
}

// Group array items by key
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]);
    return { ...groups, [groupKey]: [...(groups[groupKey] || []), item] };
  }, {} as Record<string, T[]>);
}

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Number formatter for stats
export function formatStat(value: string): { number: string; suffix: string } {
  const match = value.match(/^([0-9,.]+)(.*)$/);
  if (match) {
    return { number: match[1], suffix: match[2].trim() };
  }
  return { number: value, suffix: "" };
}

// Get excerpt from WordPress content
export function getExcerpt(content?: string, excerpt?: string, maxLength = 160): string {
  if (excerpt) return truncate(excerpt, maxLength);
  if (content) return truncate(content, maxLength);
  return "";
}
