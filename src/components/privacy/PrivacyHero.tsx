"use client";

import Link from "next/link";

export function PrivacyHero() {
  return (
    <section className="w-full bg-surface-container-low py-space-xl md:py-space-2xl">
      <div className="max-w-[1240px] mx-auto px-gutter-desktop flex flex-col gap-space-md">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-space-2xs text-on-surface-variant font-label-md text-label-md"
        >
          <Link className="hover:text-secondary transition-colors" href="/">
            Home
          </Link>
          <span className="material-symbols-outlined text-[14px]">
            chevron_right
          </span>
          <span className="text-on-surface-variant">Legal</span>
          <span className="material-symbols-outlined text-[14px]">
            chevron_right
          </span>
          <span aria-current="page" className="text-on-surface font-semibold">
            Privacy Policy
          </span>
        </nav>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
          <div className="flex flex-col gap-space-xs max-w-3xl">
            <div className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-surface-container-lowest shadow-sm w-fit">
              <span
                className="material-symbols-outlined text-[16px] text-on-tertiary-container"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                verified
              </span>
              <span className="font-label-md text-label-md text-on-surface">
                UK GDPR, Data Protection Act 2018 &amp; ICO Registered
                (ZA892104)
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
              Privacy Policy
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Last updated: 15 October 2024{" "}
              <span className="mx-space-2xs opacity-40">•</span> Effective Date:
              1 January 2025 <span className="mx-space-2xs opacity-40">•</span>{" "}
              Version 3.2
            </p>
          </div>
          <div className="flex items-center gap-space-xs">
            <button
              className="inline-flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface shadow-sm font-label-lg text-label-lg transition-all"
              onClick={() => {
                if (typeof window !== "undefined") window.print();
              }}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span>Print Policy</span>
            </button>
            <a
              className="inline-flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg bg-secondary-container text-on-secondary hover:bg-secondary shadow-sm font-label-lg text-label-lg transition-all"
              href="#section-10"
            >
              <span className="material-symbols-outlined text-[18px]">
                support_agent
              </span>
              <span>Contact DPO</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
