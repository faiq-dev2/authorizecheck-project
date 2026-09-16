"use client";

import Link from "next/link";

export function RefundHero() {
  return (
    <section className="relative w-full overflow-hidden bg-primary text-on-primary">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary to-primary-container opacity-90" />
      <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-secondary opacity-15 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 top-0 w-72 h-72 rounded-full bg-on-tertiary-container opacity-10 blur-2xl pointer-events-none" />
      <div className="relative max-w-[1240px] mx-auto px-gutter-desktop py-space-2xl md:py-space-3xl flex flex-col gap-space-md">
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-primary-container"
        >
          <Link className="hover:text-surface-bright transition-colors" href="/">
            Home
          </Link>
          <span className="material-symbols-outlined text-[14px]">
            chevron_right
          </span>
          <span className="text-on-primary-container">Legal</span>
          <span className="material-symbols-outlined text-[14px]">
            chevron_right
          </span>
          <span className="text-surface-bright font-medium">Refund Policy</span>
        </nav>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-xl pt-space-xs">
          <div className="flex flex-col gap-space-sm max-w-2xl">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container-lowest/10 backdrop-blur-md self-start text-on-tertiary-fixed-variant">
              <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">
                verified
              </span>
              <span className="font-label-md text-label-md text-surface-bright tracking-wide">
                14-Day Money-Back Guarantee • UK Consumer Rights Act 2015
                Compliant
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-surface-bright tracking-tight">
              Refund Policy &amp; Guarantee
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary-container leading-relaxed">
              Forensic vehicle data backed by financial peace of mind. Review our
              institutional guarantees, clear refund criteria, and prompt claims
              process.
            </p>
            <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-surface-variant/80 pt-space-2xs">
              <span className="material-symbols-outlined text-[16px]">
                schedule
              </span>
              <span>Last updated: 15 October 2024</span>
              <span className="text-outline">•</span>
              <span>Effective Date: 1 January 2025</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <button
              className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-surface-container-lowest text-primary font-label-lg text-label-lg shadow-sm hover:bg-surface-container-low transition-all"
              onClick={() => window.print()}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                picture_as_pdf
              </span>
              <span>Download PDF</span>
            </button>
            <a
              className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-secondary-container text-on-secondary font-label-lg text-label-lg shadow-md hover:bg-secondary transition-all"
              href="#claim-action-card"
            >
              <span className="material-symbols-outlined text-[18px]">
                assignment_return
              </span>
              <span>Initiate Refund Request</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
