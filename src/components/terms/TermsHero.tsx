"use client";

import Link from "next/link";

export function TermsHero() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-72 bg-gradient-to-b from-secondary-fixed/40 via-surface-container/60 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="w-full max-w-[1240px] mx-auto px-gutter-desktop pt-space-xl pb-space-2xl">
        <div className="flex flex-col gap-space-lg">
          <div className="flex flex-wrap items-center justify-between gap-space-sm">
            <nav
              aria-label="Breadcrumbs"
              className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant"
            >
              <Link className="hover:text-secondary transition-colors" href="/">
                Home
              </Link>
              <span className="text-outline-variant">/</span>
              <span className="hover:text-secondary transition-colors">
                Legal
              </span>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface font-semibold">
                Terms &amp; Conditions
              </span>
            </nav>
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container-high text-on-primary-fixed shadow-sm">
              <span
                className="material-symbols-outlined text-[16px] text-on-tertiary-container"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                gavel
              </span>
              <span className="font-label-md text-label-md">
                Governed by the Laws of England &amp; Wales | Consumer Rights Act
                2015 Compliant
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg pb-space-lg">
            <div className="flex flex-col gap-space-xs max-w-3xl">
              <div className="flex items-center gap-space-xs text-secondary font-label-lg text-label-lg uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px]">
                  verified
                </span>
                <span>Statutory User Agreement</span>
              </div>
              <h1 className="font-display-hero text-display-hero text-on-surface tracking-tight">
                Terms &amp; Conditions
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                These terms establish the binding contractual framework between
                yourself and AuthorizeCheck Ltd regarding vehicle intelligence
                checks, MIAFTR insurance total-loss lookups, finance registers,
                and our £40,000 data indemnity guarantee.
              </p>
              <div className="flex flex-wrap items-center gap-space-md pt-space-xs text-on-surface-variant font-label-md text-label-md">
                <span className="flex items-center gap-space-2xs">
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    update
                  </span>
                  Last updated: 15 October 2024
                </span>
                <span className="inline-block w-1 h-1 rounded-full bg-outline" />
                <span className="flex items-center gap-space-2xs">
                  <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                    event_available
                  </span>
                  Effective Date: 1 January 2025
                </span>
                <span className="inline-block w-1 h-1 rounded-full bg-outline" />
                <span className="px-space-xs py-space-2xs rounded bg-surface-container font-semibold text-on-surface">
                  Version 4.1
                </span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm shrink-0">
              <button
                className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container shadow-sm transition-all font-label-lg text-label-lg"
                onClick={() => window.print()}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  print
                </span>
                <span>Print Document</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm">
            <div className="flex items-start gap-space-sm p-space-xs">
              <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary text-[22px]">
                  shield
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                  £40,000
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Data Backed Indemnity
                </span>
              </div>
            </div>
            <div className="flex items-start gap-space-sm p-space-xs">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-primary-fixed text-[22px]">
                  sync_alt
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                  Zero Recurring
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Pure one-off transparent checks
                </span>
              </div>
            </div>
            <div className="flex items-start gap-space-sm p-space-xs">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-tertiary-container text-[22px]">
                  database
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                  Live DVLA / PNC
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Sovereign-grade registers
                </span>
              </div>
            </div>
            <div className="flex items-start gap-space-sm p-space-xs">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary text-[22px]">
                  balance
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                  CRA 2015
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  UK Consumer Protection
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
