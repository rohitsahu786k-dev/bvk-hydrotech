import type { PostCta } from "./blog";

export type Segment = { html: string } | { cta: PostCta };

const MARKER = /<p>\s*\[cta-(\d+)\]\s*<\/p>/gi;

/**
 * Places the calls to action in the article body. A call to action goes where
 * the editor typed its marker, [cta-1] for the first one in the "Blog Post
 * CTAs" box, [cta-2] for the second. One with no marker goes after the
 * paragraph number it asks for, or at the end when the article is shorter.
 */
export function withCtas(html: string, ctas: PostCta[]): Segment[] {
  if (ctas.length === 0) return [{ html: html.replace(MARKER, "") }];

  // Take the markers out of the text, remembering where each one stood.
  const pins: { at: number; cta: PostCta }[] = [];
  const used = new Set<number>();
  let clean = "";
  let last = 0;
  for (const hit of html.matchAll(MARKER)) {
    clean += html.slice(last, hit.index);
    const cta = ctas.find((c) => c.index === Number(hit[1]));
    if (cta && !used.has(cta.index)) {
      pins.push({ at: clean.length, cta });
      used.add(cta.index);
    }
    last = hit.index + hit[0].length;
  }
  clean += html.slice(last);

  // The rest go after their paragraph.
  const ends: number[] = [];
  const close = /<\/p>/gi;
  let match: RegExpExecArray | null;
  while ((match = close.exec(clean))) ends.push(match.index + match[0].length);
  for (const cta of ctas) {
    if (used.has(cta.index)) continue;
    pins.push({ at: ends[Math.min(cta.after, ends.length) - 1] ?? clean.length, cta });
  }
  pins.sort((a, b) => a.at - b.at);

  const segments: Segment[] = [];
  let cursor = 0;
  for (const pin of pins) {
    if (pin.at > cursor) segments.push({ html: clean.slice(cursor, pin.at) });
    segments.push({ cta: pin.cta });
    cursor = Math.max(cursor, pin.at);
  }
  if (cursor < clean.length) segments.push({ html: clean.slice(cursor) });
  return segments;
}

