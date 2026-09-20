"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Pricing", href: "/#pricingSection" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

const emptySubscribe = () => () => {};

export function Header() {
  const pathname = usePathname();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  const mobileMenu =
    mounted &&
    createPortal(
      <div
        aria-hidden={!open}
        className={`md:hidden fixed inset-0 z-[100] ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          aria-label="Close menu overlay"
          className={`absolute inset-0 bg-primary/45 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
          type="button"
        />
        <aside
          className={`absolute top-0 right-0 h-dvh w-[min(100vw,320px)] bg-surface-container-lowest shadow-2xl border-l border-surface-container flex flex-col transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          id="mobile-nav-drawer"
        >
          <div className="h-20 px-space-lg flex items-center justify-between border-b border-surface-container shrink-0">
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
              Menu
            </span>
            <button
              aria-label="Close menu"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-on-surface hover:bg-surface-container transition-colors"
              onClick={closeMenu}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-space-lg py-space-lg flex flex-col gap-space-xs">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.label}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "px-space-md py-space-sm rounded-lg font-label-lg text-label-lg bg-surface-container-low text-secondary font-semibold"
                      : "px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors font-medium"
                  }
                  href={link.href}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="px-space-lg pb-space-xl pt-space-md border-t border-surface-container shrink-0">
            <Link
              className="inline-flex w-full items-center justify-center gap-space-xs px-space-lg py-3 rounded-xl bg-secondary-container text-on-secondary hover:bg-secondary font-label-md text-label-md font-bold shadow-md hover:shadow-lg transition-all duration-200"
              href="/#pricingSection"
              onClick={closeMenu}
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                verified_user
              </span>
              <span className="tracking-wide">Check Vehicle</span>
            </Link>
          </div>
        </aside>
      </div>,
      document.body,
    );

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container">
        <div className="h-20 max-w-[1240px] mx-auto px-gutter-desktop flex items-center justify-between gap-space-md">
          <Link className="flex items-center shrink-0" href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="AuthorizeCheck"
              className="h-11 sm:h-12 w-auto max-w-[220px] object-contain object-left"
              src="/logo.png"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-surface-container-low/80 p-1 rounded-full border border-surface-container shadow-sm">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.label}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "px-space-md py-1.5 rounded-full font-label-md text-label-md bg-surface-container-lowest text-secondary shadow-sm font-semibold transition-all"
                      : "px-space-md py-1.5 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors font-medium"
                  }
                  href={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-space-sm">
            <Link
              className="inline-flex items-center gap-space-xs px-space-lg py-2.5 rounded-xl bg-secondary-container text-on-secondary hover:bg-secondary font-label-md text-label-md font-bold shadow-md hover:shadow-lg transition-all duration-200"
              href="/#pricingSection"
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                verified_user
              </span>
              <span className="tracking-wide">Check Vehicle</span>
            </Link>
          </div>

          <button
            aria-controls="mobile-nav-drawer"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-surface-container bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors shadow-sm"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">
              {open ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>
      {mobileMenu}
    </>
  );
}
