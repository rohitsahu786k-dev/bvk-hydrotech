import type { Popup } from "./types";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Pushes popup events to Google Tag Manager's data layer when it exists, so
 * views, clicks and dismissals can be reported without any extra setup.
 * Does nothing when analytics is not installed.
 */
export function trackPopup(action: "view" | "click" | "close", popup: Popup, detail?: string) {
  try {
    window.dataLayer?.push({
      event: "bvk_popup",
      popup_action: action,
      popup_id: popup.id,
      popup_name: popup.title,
      popup_key: popup.key,
      popup_detail: detail ?? "",
    });
  } catch {
    /* analytics must never break the popup */
  }
}
