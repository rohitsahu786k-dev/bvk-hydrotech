/**
 * Homepage banner carousel data.
 *
 * Authored in WordPress (Home Banners menu, BVK Home Banners plugin) and
 * delivered by /wp-json/bvk/v1/home-banners. Validated by `normalizeBanners`
 * before use, so a half-filled banner can never break the homepage.
 */

export interface BannerImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export type BannerDevice = "desktop" | "mobile";

export interface HomeBanner {
  id: number;
  title: string;
  /** What the banner shows, for screen readers and as the picture's alt text. */
  alt: string;
  desktop: BannerImage;
  mobile: BannerImage;
  link: { url: string; newTab: boolean; label: string };
  button: { text: string; position: "bottom-left" | "bottom-center" | "bottom-right"; style: "green" | "white" | "outline" };
  devices: BannerDevice[];
  startAt: string | null;
  endAt: string | null;
  sort: number;
}

export type ControlVisibility = "both" | "desktop" | "mobile" | "none";

export interface HomeBannerSettings {
  /** False hands the homepage back to the previous hero. */
  enabled: boolean;
  autoplay: boolean;
  /** Seconds each banner stays. */
  delay: number;
  pauseOnHover: boolean;
  transition: "fade" | "slide";
  /** Transition length in milliseconds. */
  speed: number;
  loop: boolean;
  arrows: ControlVisibility;
  arrowShape: "circle" | "square";
  arrowTheme: "dark" | "light" | "green";
  dots: ControlVisibility;
  dotsPosition: "inside" | "below";
  ratioDesktop: "1916/821" | "16/9" | "3/1" | "2/1";
  ratioMobile: "1/1" | "4/5" | "3/4" | "16/9";
  /** Percent of the screen height the banner may take at most. */
  maxHeight: number;
}

export interface HomeBannersData {
  /** False when WordPress could not be reached (as opposed to "no banners yet"). */
  ok: boolean;
  settings: HomeBannerSettings;
  banners: HomeBanner[];
}
