"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { navCredentials, navStandards, navigation, type NavItem } from "@/content/navigation";

/**
 * The one header for the whole site.
 *
 * Over a dark hero it starts transparent (white wordmark and links on a soft
 * top shadow) and fades to the white surface as soon as the page scrolls. Over
 * a light page, or with a menu open, it stays on white: the brand guidelines
 * only permit the coloured wordmark on white or very light grounds.
 */

const LOGO = "/bvk-assets/bvk-hydrotech-logo-line.png";
const LOGO_WHITE = "/bvk-assets/bvk-hydrotech-logo-line-white.png";
const DARK_HERO = ".on-ink, [data-header='dark']";
const HOVER_CLOSE_MS = 140;

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  // The open menu is stored with the path it was opened on, so navigating
  // closes it without an effect that has to reset state.
  const [menu, setMenu] = useState<{ key: string | null; path: string }>({ key: null, path: "" });
  const openKey = menu.path === pathname ? menu.key : null;
  const openItem = navigation.find((item) => item.key === openKey) ?? null;
  const setOpenKey = (key: string | null) => setMenu({ key, path: pathname });

  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenKey(null), HOVER_CLOSE_MS);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    const raf = requestAnimationFrame(onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Is the page's first block under the header a dark hero? Checked at the top
  // of every page, once things have laid out, and again on resize.
  useEffect(() => {
    const check = () => {
      const header = document.querySelector("header");
      const hit = document
        .elementsFromPoint(window.innerWidth / 2, 110)
        .find((el) => !header?.contains(el) && el !== document.documentElement && el !== document.body);
      setOverDark(Boolean(hit?.closest(DARK_HERO)));
    };
    const raf = requestAnimationFrame(check);
    const timer = setTimeout(check, 400);
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close the desktop panel on an outside press.
  useEffect(() => {
    if (!openKey) return;
    const onPress = (event: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setMenu({ key: null, path: pathname });
      }
    };
    document.addEventListener("pointerdown", onPress);
    return () => document.removeEventListener("pointerdown", onPress);
  }, [openKey, pathname]);

  useEffect(() => () => cancelClose(), []);

  const isActive = (item: NavItem) =>
    item.groups.some((group) => group.links.some((link) => link.href === pathname));

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSection(null);
  };

  const solid = scrolled || Boolean(openItem) || mobileOpen || !overDark;
  const linkTone = solid ? "text-black hover:text-brand-deep" : "text-white hover:text-white/80";

  return (
    <header
      style={{ top: "var(--announce-offset, 0px)" }}
      className={`fixed inset-x-0 z-50 border-b transition-[box-shadow,border-color] duration-500 ${
        solid
          ? "border-hairline shadow-[0_8px_24px_-18px_rgb(0_0_0/0.35)]"
          : "border-transparent shadow-none"
      }`}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpenKey(null);
          if (mobileOpen) closeMobile();
        }
      }}
    >
      {/* White surface, faded in on scroll. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-surface transition-opacity duration-500 ${
          solid ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Soft shadow from the top edge so white text reads over any picture. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 via-black/25 to-transparent transition-opacity duration-500 ${
          solid ? "opacity-0" : "opacity-100"
        }`}
      />
      <div ref={wrapRef} className="relative" onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}>
        <div className="shell flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Link
            href="/"
            className="shrink-0"
            aria-label="BVK Hydrotech — home"
            onClick={(event) => {
              closeMobile();
              // Already on the homepage Next does not scroll, so go to the top ourselves.
              if (pathname === "/") {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <span className="relative block">
              <Image
                src={LOGO}
                alt="BVK Hydrotech, a BVK Group company"
                width={577}
                height={285}
                priority
                className={`h-11 w-auto transition-opacity duration-500 lg:h-12 ${solid ? "opacity-100" : "opacity-0"}`}
              />
              <Image
                src={LOGO_WHITE}
                alt=""
                width={577}
                height={285}
                priority
                aria-hidden
                className={`absolute inset-0 h-11 w-auto transition-opacity duration-500 lg:h-12 ${solid ? "opacity-0" : "opacity-100"}`}
              />
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
            {navigation.map((item) => {
              const open = openKey === item.key;
              const active = isActive(item);
              return (
                <div
                  key={item.key}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "mouse") return;
                    cancelClose();
                    setOpenKey(item.key);
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    aria-controls={`mega-${item.key}`}
                    onClick={() => setOpenKey(open ? null : item.key)}
                    className={`group relative inline-flex items-center gap-1.5 rounded-sm px-3.5 py-2.5 text-[0.9375rem] font-semibold transition-colors ${
                      open || active ? (solid ? "text-brand-deep" : "text-white") : linkTone
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden
                      className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    />
                    <span
                      aria-hidden
                      className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left bg-brand transition-transform duration-300 ${
                        open || active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
            <Link
              href="/contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
              className={`rounded-sm px-3.5 py-2.5 text-[0.9375rem] font-semibold transition-colors ${
                pathname === "/contact" ? (solid ? "text-brand-deep" : "text-white") : linkTone
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="btn btn-green hidden !px-5 !py-3 sm:inline-flex">
              Contact Us
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className={`flex h-11 w-11 items-center justify-center rounded-md border transition xl:hidden ${
                solid
                  ? "border-hairline text-black hover:border-brand-deep hover:text-brand-deep"
                  : "border-white/50 text-white hover:border-white"
              }`}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Desktop mega menu: a floating card — intro and links on the left,
            one feature tile on the right, a credential strip underneath. */}
        {openItem && (
          <>
            <div
              aria-hidden
              style={{ top: "calc(var(--announce-offset, 0px) + 4.5rem)" }}
              className="pointer-events-none fixed inset-x-0 bottom-0 hidden bg-ink/35 backdrop-blur-[2px] xl:block"
            />
            <div
              id={`mega-${openItem.key}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && cancelClose()}
              className="mega-panel absolute inset-x-0 top-full hidden pt-3 xl:block"
            >
              <div className="shell">
                <div className="flex max-h-[75vh] flex-col overflow-hidden rounded-2xl border border-hairline bg-surface shadow-[0_32px_64px_-24px_rgb(0_0_0/0.4)]">
                  <div className="grid min-h-0 flex-1 overflow-y-auto xl:grid-cols-[minmax(0,1fr)_20rem]">
                    <div className="p-6">
                      <div className="mb-4 flex items-start justify-between gap-8">
                        <div>
                          <p className="font-display text-lg leading-tight text-ink">{openItem.label}</p>
                        </div>
                        <span aria-hidden className="mt-2 hidden h-1 w-14 rounded-full bg-brand 2xl:block" />
                      </div>

                      <div
                        className="grid gap-x-6 gap-y-1"
                        style={{
                          gridTemplateColumns: `repeat(${openItem.groups.length === 1 ? 1 : openItem.groups.length}, minmax(0, 1fr))`,
                        }}
                      >
                        {openItem.groups.map((group) => (
                          <div key={group.title}>
                            {openItem.groups.length > 1 && (
                              <p className="mb-1 px-2 text-[0.625rem] font-semibold uppercase tracking-wider text-grey-mid">
                                {group.title}
                              </p>
                            )}
                            <ul
                              className={
                                openItem.groups.length === 1 ? "grid grid-cols-3 gap-x-6 gap-y-1" : "space-y-1"
                              }
                            >
                              {group.links.map((link) => {
                                const current = pathname === link.href;
                                const Icon = link.icon;
                                return (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      aria-current={current ? "page" : undefined}
                                      className={`group flex items-start gap-2.5 rounded-lg p-2 transition-colors ${
                                        current ? "bg-brand-wash" : "hover:bg-brand-wash/60 focus-visible:bg-brand-wash/60"
                                      }`}
                                    >
                                      <span
                                        aria-hidden
                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors duration-200 ${
                                          current
                                            ? "bg-brand text-white"
                                            : "bg-brand-wash text-brand-deep group-hover:bg-brand group-hover:text-white"
                                        }`}
                                      >
                                        <Icon className="h-3.5 w-3.5" />
                                      </span>
                                      <span className="min-w-0 flex-1">
                                        <span
                                          className={`flex items-center gap-1.5 font-display text-[0.8125rem] leading-snug ${
                                            current ? "text-brand-deep" : "text-ink group-hover:text-brand-deep"
                                          }`}
                                        >
                                          {link.label}
                                          <ArrowRight
                                            aria-hidden
                                            className="h-3 w-3 shrink-0 -translate-x-1 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                                          />
                                        </span>
                                        <span className="mt-0.5 block text-[0.6875rem] leading-snug text-grey">
                                          {link.tagline}
                                        </span>
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={openItem.feature.href}
                      className="group relative isolate flex min-h-[13rem] flex-col justify-end overflow-hidden bg-ink p-5"
                    >
                      <Image
                        src={openItem.feature.image}
                        alt=""
                        fill
                        sizes="20rem"
                        className="-z-20 object-cover transition duration-700 group-hover:scale-105"
                      />
                      <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
                      <span className="w-fit rounded-full bg-brand px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-white">
                        {openItem.feature.eyebrow}
                      </span>
                      <span className="mt-2.5 block font-display text-[0.9375rem] leading-snug text-white">
                        {openItem.feature.title}
                      </span>
                      <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-white">
                        {openItem.feature.cta}
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-brand">
                          <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                        </span>
                      </span>
                    </Link>
                  </div>

                  <div className="flex items-center justify-between gap-8 shrink-0 border-t border-hairline bg-surface-raised px-6 py-2.5">
                    <div className="flex items-center gap-7">
                      {navCredentials.map((credential) => (
                        <span key={credential.value} className="flex items-baseline gap-2">
                          <span className="font-display text-sm text-brand-deep">{credential.value}</span>
                          <span className="text-[0.6875rem] text-grey">{credential.label}</span>
                        </span>
                      ))}
                      <span aria-hidden className="h-4 w-px bg-hairline" />
                      <span className="text-[0.6875rem] text-grey">{navStandards}</span>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-deep transition-colors hover:text-brand-dim"
                    >
                      Request a technical RFQ
                      <ArrowUpRight aria-hidden className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mobile / tablet navigation */}
      <div
        id="mobile-nav"
        hidden={!mobileOpen}
        style={{ top: "calc(var(--announce-offset, 0px) + 4rem)" }}
        className="fixed inset-x-0 bottom-0 overflow-y-auto border-t border-hairline bg-surface xl:hidden"
      >
        <nav aria-label="Primary (mobile)" className="shell flex flex-col py-4">
          {navigation.map((item) => {
            const open = mobileSection === item.key;
            return (
              <div key={item.key} className="border-b border-hairline">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`mobile-${item.key}`}
                  onClick={() => setMobileSection(open ? null : item.key)}
                  className="flex w-full items-center justify-between py-4 text-left text-base font-bold text-black"
                >
                  <span className={open ? "text-brand-deep" : undefined}>{item.label}</span>
                  <ChevronDown
                    aria-hidden
                    className={`h-5 w-5 text-grey transition-transform ${open ? "rotate-180 text-brand-deep" : ""}`}
                  />
                </button>
                <div id={`mobile-${item.key}`} hidden={!open} className="pb-4">
                  {item.groups.map((group) => (
                    <div key={group.title} className="mt-1">
                      {item.groups.length > 1 && (
                        <p className="px-1 pb-1 pt-3 text-xs font-semibold uppercase text-grey-mid">
                          {group.title}
                        </p>
                      )}
                      <ul>
                        {group.links.map((link) => {
                          const Icon = link.icon;
                          return (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={closeMobile}
                                className="group flex items-start gap-3 rounded-md px-1 py-2.5"
                              >
                                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-wash text-brand-deep">
                                  <Icon aria-hidden className="h-4 w-4" />
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-[0.9375rem] font-medium text-black group-hover:text-brand-deep">
                                    {link.label}
                                  </span>
                                  <span className="mt-0.5 block text-xs leading-snug text-grey">
                                    {link.spec}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <Link
            href="/contact"
            onClick={closeMobile}
            className="border-b border-hairline py-4 text-base font-bold text-black"
          >
            Contact
          </Link>
          <Link href="/contact" onClick={closeMobile} className="btn btn-green mt-6">
            Contact Us
            <ArrowUpRight aria-hidden className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
