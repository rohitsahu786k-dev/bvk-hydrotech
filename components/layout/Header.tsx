"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import type { MenuLink } from "@/lib/wordpress/home";

const LOGO = `${process.env.NEXT_PUBLIC_WORDPRESS_URL ?? ""}/wp-content/uploads/BVK-Hydrotech-White-Logo.png`;

/** The white/reversed wordmark, sitting directly on the dark header. */
function Wordmark() {
  return (
    <Link href="/" className="shrink-0" aria-label="BVK Hydrotech — home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO}
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
        scrolled || open
          ? "border-b border-ink-line bg-ink/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-20 items-center justify-between gap-6 lg:h-[5.5rem]">
        <Wordmark />

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
                    active ? "text-white" : "text-on-dark-muted hover:text-white"
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
            className="hidden items-center gap-2 border border-white/25 px-5 py-2.5 text-[0.8125rem] font-semibold text-white transition hover:border-brand hover:bg-brand/12 sm:inline-flex"
          >
            Request RFQ
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center text-white xl:hidden"
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
