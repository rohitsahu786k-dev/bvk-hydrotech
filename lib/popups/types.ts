/**
 * Popup data model, shared by the server fetch and the browser engine.
 *
 * Authored in WordPress (Popups menu, BVK Popups plugin) and delivered by
 * /wp-json/bvk/v1/popups. Every value is validated by `normalizePopup` before
 * it is used, so a half-filled record can never break a page.
 */

export type PopupLayout = "image_only" | "image_top" | "image_left" | "image_right" | "text_only";

export type PopupPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type PopupSize = "custom" | "full_width" | "fullscreen";

export type PopupAnimation = "none" | "fade" | "zoom" | "slide-up" | "slide-down" | "slide-left" | "slide-right";

export type PopupDevice = "desktop" | "tablet" | "mobile";

export type PopupFrequencyMode = "always" | "session" | "days" | "max" | "once";

export interface PopupImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface PopupButton {
  text: string;
  url: string;
  newTab: boolean;
}

export interface PopupContent {
  layout: PopupLayout;
  eyebrow: string;
  heading: string;
  bodyHtml: string;
  imageDesktop: PopupImage | null;
  imageMobile: PopupImage | null;
  imageAlt: string;
  linkUrl: string;
  linkNewTab: boolean;
  buttons: PopupButton[];
  showForm: boolean;
}

export interface PopupAppearance {
  position: PopupPosition;
  size: PopupSize;
  widthDesktop: number;
  widthMobile: number;
  overlay: boolean;
  overlayColor: string;
  overlayOpacity: number;
  preventScroll: boolean;
  bgColor: string;
  textColor: string;
  radius: number;
  padding: number;
  closeButton: boolean;
  closePlacement: "inside" | "outside";
  closeDelay: number;
  closeOnOverlay: boolean;
  closeOnEsc: boolean;
  autoClose: number;
  entrance: PopupAnimation;
  exit: PopupAnimation;
  duration: number;
  zIndex: number;
}

export interface PopupTriggers {
  pageLoad: { enabled: boolean; delay: number };
  scroll: { enabled: boolean; direction: "down" | "up"; percent: number };
  scrollElement: { enabled: boolean; selector: string };
  click: { enabled: boolean; selector: string };
  inactivity: { enabled: boolean; seconds: number };
  exitIntent: { enabled: boolean };
  pageViews: { enabled: boolean; count: number };
}

export interface PopupRules {
  scope: "entire_site" | "selected";
  includePaths: string[];
  excludePaths: string[];
  devices: PopupDevice[];
  visitor: "all" | "new" | "returning";
  requireQuery: string[];
  startAt: string | null;
  endAt: string | null;
}

export interface PopupFrequency {
  mode: PopupFrequencyMode;
  days: number;
  max: number;
  suppressAfterClick: boolean;
  suppressDays: number;
}

export interface Popup {
  id: number;
  /** Lowercase handle used by `#popup-<key>` links and `data-bvk-popup`. */
  key: string;
  title: string;
  priority: number;
  /** Bumped in WordPress to make every visitor eligible again. */
  resetVersion: number;
  content: PopupContent;
  appearance: PopupAppearance;
  triggers: PopupTriggers;
  rules: PopupRules;
  frequency: PopupFrequency;
}

/** What the browser remembers about one popup. */
export interface PopupHistory {
  count: number;
  /** Epoch ms of the last time it opened. */
  last: number;
  /** Epoch ms of the last time the visitor clicked something inside it. */
  clicked?: number;
}

export interface EligibilityContext {
  /** Current pathname, e.g. "/solutions/fuel-cell". */
  path: string;
  /** Current query string including the leading "?", or "". */
  search: string;
  /** Viewport width in CSS pixels. */
  width: number;
  /** Epoch ms. */
  now: number;
  returning: boolean;
}
