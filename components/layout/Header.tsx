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
 * Always on the white surface: the brand guidelines only permit the wordmark
 * on white or very light neutral grounds, so a single light header is both the
 * compliant and the consistent choice across every page template.
 */

const LOGO = "/bvk-assets/bvk-hydrotech-logo-line.png";
const HOVER_CLOSE_MS = 140;

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-surface transition-shadow duration-300 ${
        scrolled || openItem || mobileOpen
          ? "border-b border-hairline shadow-[0_8px_24px_-18px_rgb(0_0_0/0.35)]"
          : "border-b border-hairline"
      }`}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpenKey(null);
          if (mobileOpen) closeMobile();
        }
      }}
    >
      <div ref={wrapRef} className="relative" onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}>
        <div className="shell flex h-20 items-center justify-between gap-6 lg:h-[5.5rem]">
          <Link href="/" className="shrink-0" aria-label="BVK Hydrotech — home" onClick={closeMobile}>
            <Image
              src={LOGO}
              alt="BVK Hydrotech, a BVK Group company"
              width={577}
              height={285}
              priority
              className="h-11 w-auto lg:h-12"
            />
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
                      open || active ? "text-brand-deep" : "text-black hover:text-brand-deep"
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
                pathname === "/contact" ? "text-brand-deep" : "text-black hover:text-brand-deep"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="btn btn-green hidden !px-5 !py-3 sm:inline-flex">
              Request RFQ
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-md border border-hairline text-black transition hover:border-brand-deep hover:text-brand-deep xl:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Desktop mega menu */}
        {openItem && (
          <>
            <div
              aria-hidden
              className="pointer-events-none fixed inset-x-0 top-[5.5rem] bottom-0 hidden bg-black/20 xl:block"
            />
            <div
              id={`mega-${openItem.key}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && cancelClose()}
              className="mega-panel absolute inset-x-0 top-full hidden border-b border-hairline bg-surface shadow-[0_24px_40px_-26px_rgb(0_0_0/0.35)] xl:block"
            >
              <div className="shell grid gap-12 py-8 xl:grid-cols-[minmax(0,1fr)_19rem]">
                {/* Groups sit side by side so the panel stays short. A menu with
                    one group spreads its links across the same three columns,
                    so Capabilities and Resources fill the width too. */}
                <div
                  className={
                    openItem.groups.length === 1
                      ? "grid grid-cols-3 gap-x-8 gap-y-1"
                      : "grid gap-x-8 gap-y-1"
                  }
                  style={
                    openItem.groups.length > 1
                      ? { gridTemplateColumns: `repeat(${openItem.groups.length}, minmax(0, 1fr))` }
                      : undefined
                  }
                >
                  {openItem.groups.length === 1 && (
                    <p className="col-span-3 mb-2 flex items-center gap-3.5 text-[0.6875rem] uppercase tracking-[0.18em] text-brand-deep">
                      {openItem.groups[0].title}
                      <span aria-hidden className="h-px flex-1 bg-hairline" />
                    </p>
                  )}

                  {openItem.groups.map((group, groupIndex) => {
                    const offset = openItem.groups
                      .slice(0, groupIndex)
                      .reduce((sum, g) => sum + g.links.length, 0);
                    const single = openItem.groups.length === 1;

                    const rows = group.links.map((link, linkIndex) => {
                      const current = pathname === link.href;
                      const number = String(offset + linkIndex + 1).padStart(2, "0");
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            aria-current={current ? "page" : undefined}
                            className={`group flex items-start gap-3.5 rounded-sm px-3 py-2.5 transition-colors ${
                              current ? "bg-brand-wash" : "hover:bg-surface-raised focus-visible:bg-surface-raised"
                            }`}
                          >
                            <span
                              aria-hidden
                              className={`mt-0.5 shrink-0 text-[0.6875rem] tabular-nums ${
                                current ? "text-brand-deep" : "text-grey-soft group-hover:text-brand-deep"
                              }`}
                            >
                              {number}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span
                                className={`flex items-center gap-1.5 font-display text-[0.9375rem] leading-snug ${
                                  current ? "text-brand-deep" : "text-ink group-hover:text-brand-deep"
                                }`}
                              >
                                {link.label}
                                <ArrowRight
                                  aria-hidden
                                  className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                                />
                              </span>
                              <span className="mt-1 block text-[0.75rem] leading-snug text-grey">
                                {link.spec}
                              </span>
                            </span>
                          </Link>
                        </li>
                      );
                    });

                    // One group: each link becomes a column of its own, so the
                    // three-link menus span the same width as Solutions.
                    if (single) {
                      return group.links.map((link, linkIndex) => (
                        <ul key={link.href}>{rows[linkIndex]}</ul>
                      ));
                    }

                    return (
                      <div key={group.title}>
                        <p className="mb-2 flex items-center gap-3.5 px-3 text-[0.6875rem] uppercase tracking-[0.18em] text-brand-deep">
                          {group.title}
                          <span aria-hidden className="h-px flex-1 bg-hairline" />
                        </p>
                        <ul>{rows}</ul>
                      </div>
                    );
                  })}
                </div>

                <Link
                  href={openItem.feature.href}
                  className="group flex flex-col overflow-hidden rounded-sm border border-hairline bg-surface transition-colors hover:border-brand-deep"
                >
                  <span className="relative block h-28 overflow-hidden bg-ink">
                    <Image
                      src={openItem.feature.image}
                      alt=""
                      fill
                      sizes="19rem"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </span>
                  <span className="block p-5">
                    <span className="block text-[0.6875rem] uppercase tracking-[0.18em] text-brand-deep">
                      {openItem.feature.eyebrow}
                    </span>
                    <span className="mt-2 block font-display text-base leading-snug text-ink">
                      {openItem.feature.title}
                    </span>
                    <span className="mt-1.5 block text-[0.75rem] leading-snug text-grey">
                      {openItem.feature.text}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-2 text-[0.75rem] font-medium text-brand-deep">
                      {openItem.feature.cta}
                      <ArrowRight
                        aria-hidden
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </span>
                </Link>
              </div>

              {/* Hard numbers on every open, and enough weight that a
                  three-link panel still reads as finished. */}
              <div className="border-t border-hairline bg-surface-raised">
                <div className="shell flex items-center justify-between gap-8 py-3">
                  <div className="flex items-center gap-8">
                    {navCredentials.map((credential) => (
                      <span key={credential.value} className="flex items-baseline gap-2">
                        <span className="font-display text-[0.9375rem] text-brand-deep">
                          {credential.value}
                        </span>
                        <span className="text-[0.75rem] text-grey">{credential.label}</span>
                      </span>
                    ))}
                    <span aria-hidden className="h-4 w-px bg-hairline" />
                    <span className="text-[0.75rem] text-grey">{navStandards}</span>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-brand-deep transition-colors hover:text-brand-dim"
                  >
                    Request a technical RFQ
                    <ArrowUpRight aria-hidden className="h-4 w-4" />
                  </Link>
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
        className="fixed inset-x-0 top-20 bottom-0 overflow-y-auto border-t border-hairline bg-surface xl:hidden"
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
            Request Technical RFQ
            <ArrowUpRight aria-hidden className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
