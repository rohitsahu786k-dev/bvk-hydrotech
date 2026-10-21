/**
 * Some WordPress content was saved with UTF-8 bytes read as Windows-1252, so a
 * bullet arrives as "â€¢" and a dash as "â€“". Repair those sequences before
 * the text reaches a page, and drop the bullet characters that were typed into
 * list items by hand (the list already draws its own marker).
 */
const REPAIRS: [RegExp, string][] = [
  [/â€¢/g, "•"],
  [/â€“/g, "–"],
  [/â€”/g, "—"],
  [/â€˜/g, "‘"],
  [/â€™/g, "’"],
  [/â€œ/g, "“"],
  [/â€(?:\u009d|\u009d)/g, "”"],
  [/â€¦/g, "…"],
  [/â‚¹/g, "₹"],
  [/â„¢/g, "™"],
  [/Â©/g, "©"],
  [/Â®/g, "®"],
  [/Â°/g, "°"],
  [/Â±/g, "±"],
  [/Âµ/g, "µ"],
  [/Ã—/g, "×"],
  [/Ã©/g, "é"],
  [/Â /g, " "],
  [/Â(?=\s|\u00a0)/g, ""],
];

export function repairText(text: string): string {
  if (!/[âÂÃ]/.test(text)) return text;
  let out = text;
  for (const [pattern, to] of REPAIRS) out = out.replace(pattern, to);
  return out;
}

/** Removes a hand-typed bullet at the start of a list item. */
export function stripListBullets(html: string): string {
  const marker = String.raw`(?:&bull;|&#8226;|&#x2022;|•|·|&#226;€&#162;|â€¢)`;
  const lead = (open: string) => new RegExp(String.raw`(${open}\s*)(?:${marker}\s*)+`, "g");
  return html
    .replace(lead(String.raw`<li[^>]*>\s*(?:<p[^>]*>)?`), "$1")
    .replace(lead(String.raw`<p[^>]*policy-bullet[^>]*>`), "$1");
}

/** Parses a JSON response with the repair applied to the raw text. */
export async function readJson<T = unknown>(response: Response): Promise<T> {
  return JSON.parse(repairText(await response.text())) as T;
}
