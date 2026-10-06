"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import type { MenuLink } from "@/lib/wordpress/home";
import { solutionSlugs } from "@/content";

/**
 * Solution pages open on a white hero, so the header inverts to light at rest.
 * Corporate pages open on a dark hero and keep the default dark header.
 */
const LIGHT_ROUTES = new Set(solutionSlugs.map((slug) => `/${slug}`));

const LOGO_WHITE = `${process.env.NEXT_PUBLIC_WORDPRESS_URL ?? ""}/wp-content/uploads/BVK-Hydrotech-White-Logo.png`;
const LOGO_COLOR = "/bvk-assets/bvk-hydrotech-logo-line.png";

/** The white/reversed wordmark, sitting directly on the dark header. */
function Wordmark({ light }: { light: boolean }) {
  return (
    <Link href="/" className="shrink-0" aria-label="BVK Hydrotech — home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={light ? LOGO_COLOR : LOGO_WHITE}
        alt="BVK Hydrotech"
        width={132}
        height={66}
        className="h-9 w-auto lg:h-10"
      />
    </Link>
  );
}

export default function Header({ menu }: { menu: MenuLink[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const lightTop = LIGHT_ROUTES.has(pathname) && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Catch a page restored mid-scroll, on the next frame rather than
    // synchronously inside the effect.
    const raf = requestAnimationFrame(onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`on-ink fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        lightTop
          ? "border-b border-blue-100/80 bg-white/88 text-ink shadow-sm shadow-blue-950/5 backdrop-blur-md"
          : scrolled || open
          ? "border-b border-ink-line bg-ink/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-20 items-center justify-between gap-6 lg:h-[5.5rem]">
        <Wordmark light={lightTop} />

        <nav aria-label="Primary" className="hidden items-center gap-7 xl:flex">
          {menu.map((item) => {
            const active = pathname === item.url;
            const children = item.children ?? [];
            return (
              <div key={item.url} className="group relative">
                <Link
                  href={item.url}
                  aria-current={active ? "page" : undefined}
                  className={`relative inline-flex items-center gap-1.5 text-[0.8125rem] font-medium transition-colors ${
                    lightTop
                      ? active
                        ? "text-[#086bb9]"
                        : "text-slate-700 hover:text-[#086bb9]"
                      : active
                        ? "text-white"
                        : "text-on-dark-muted hover:text-white"
                  }`}
                >
                  {item.label}
                  {children.length > 0 && (
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  )}
                  <span
                    aria-hidden
                    className={`absolute -bottom-1.5 left-0 h-px bg-brand transition-all duration-300 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
                {children.length > 0 && (
                  <div className="invisible absolute left-0 top-full w-64 pt-4 opacity-0 transition duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="border border-ink-line bg-ink/98 p-2 shadow-2xl shadow-black/25 backdrop-blur-md">
                      {children.map((child) => (
                        <Link
                          key={child.url}
                          href={child.url}
                          className="block px-3 py-2.5 text-[0.8125rem] font-medium text-on-dark-muted transition hover:bg-white/5 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-[0.8125rem] font-semibold transition sm:inline-flex ${
              lightTop
                ? "bg-[#086bb9] text-white shadow-lg shadow-blue-600/20 hover:bg-[#0a7ed3]"
                : "border border-white/25 text-white hover:border-brand hover:bg-brand/12"
            }`}
          >
            Request RFQ
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`flex h-10 w-10 items-center justify-center xl:hidden ${
              lightTop ? "text-ink" : "text-white"
            }`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet navigation */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-ink-line bg-ink xl:hidden"
      >
        <nav aria-label="Primary (mobile)" className="shell flex flex-col py-4">
          {menu.map((item) => {
            const children = item.children ?? [];
            return (
              <div key={item.url} className="border-b border-ink-line/70 last:border-b-0">
                <Link
                  href={item.url}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 text-sm font-medium text-on-dark"
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4 text-on-dark-faint" />
                </Link>
                {children.length > 0 && (
                  <div className="pb-3">
                    {children.map((child) => (
                      <Link
                        key={child.url}
                        href={child.url}
                        onClick={() => setOpen(false)}
                        className="block py-2 pl-4 text-sm text-on-dark-muted"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-green mt-5">
            Request Technical RFQ
          </Link>
        </nav>
      </div>
    </header>
  );
}
