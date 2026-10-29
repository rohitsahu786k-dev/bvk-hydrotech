/**
 * The shared picture behind every inner-page hero. A wide crop for tablets and
 * desktops and a square crop for phones, chosen by the browser before it
 * downloads anything so a phone only fetches the small one. Fill the parent:
 * it must be `relative isolate overflow-hidden`.
 */
export const INNER_HERO_DESKTOP = "/bvk-assets/inner-hero-desktop.webp";
export const INNER_HERO_MOBILE = "/bvk-assets/inner-hero-mobile.webp";

export default function InnerHeroImage({ priority = true }: { priority?: boolean }) {
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={INNER_HERO_MOBILE} />
      <img
        src={INNER_HERO_DESKTOP}
        alt=""
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="absolute left-0 top-0 -z-20 h-auto w-full"
      />
    </picture>
  );
}
