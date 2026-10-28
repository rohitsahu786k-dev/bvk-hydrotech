import {
  BANNER_DESKTOP_WIDTHS,
  BANNER_MOBILE_WIDTHS,
  optimisedUrl,
  srcSetFor,
} from "@/lib/responsive-image";
import type { EventBanner } from "@/lib/events/types";
import InnerHeroImage from "@/components/sections/InnerHeroImage";
import HeroVideo from "./HeroVideo";

/**
 * The picture (or video) behind a banner, plus the darkening that keeps white
 * text readable. Fill the parent: it must be `relative isolate overflow-hidden`.
 *
 * Desktop and mobile pictures are separate crops. A <picture> with a
 * media-scoped <source> lets the browser pick before it downloads anything, so
 * a phone only ever fetches the mobile one. With no picture at all the shared
 * inner-page hero shows.
 */
export default function BannerMedia({ banner, priority = true }: { banner: EventBanner; priority?: boolean }) {
  const desktop = banner.desktop ?? banner.mobile;
  const mobile = banner.mobile ?? banner.desktop;
  const dim = banner.overlay / 100;

  return (
    <>
      {!desktop && <InnerHeroImage priority={priority} />}

      {desktop && mobile && (
        <picture>
          {srcSetFor(mobile.url, BANNER_MOBILE_WIDTHS) && (
            <source media="(max-width: 767px)" srcSet={srcSetFor(mobile.url, BANNER_MOBILE_WIDTHS)} sizes="100vw" />
          )}
          {srcSetFor(desktop.url, BANNER_DESKTOP_WIDTHS) && (
            <source srcSet={srcSetFor(desktop.url, BANNER_DESKTOP_WIDTHS)} sizes="100vw" />
          )}
          <img
            src={optimisedUrl(desktop.url, 1920)}
            alt=""
            fetchPriority={priority ? "high" : "auto"}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
        </picture>
      )}

      {banner.type === "video" && banner.video && <HeroVideo video={banner.video} />}

      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: `rgb(11 13 12 / ${dim})` }} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
    </>
  );
}
