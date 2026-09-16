import { DIAGNOSTIC_WIREFRAME_URL } from "./assets";

const checks = [
  {
    icon: "car_crash",
    iconClass: "text-error",
    title: "Written-Off Check",
    body: "Identifies Category A, B, S, and N total insurance write-offs with verified salvage auction imagery and damage estimates.",
    link: "MIAFTR Verified",
  },
  {
    icon: "description",
    iconClass: "text-secondary-container",
    title: "Registration & Status",
    body: "DVLA official V5C logbook status, road tax expiry, engine capacity, color changes, scrapped register, and export alerts.",
    link: "Live DVLA Connect",
  },
  {
    icon: "local_police",
    iconClass: "text-on-tertiary-container",
    title: "Stolen Vehicle Check",
    body: "Live Police National Computer (PNC) interrogation. Confirm no stolen marker exists before you list or hand over the keys.",
    link: "PNC Database Direct",
  },
  {
    icon: "payments",
    iconClass: "text-secondary",
    title: "Outstanding Finance",
    body: "Uncovers active Hire Purchase (HP) or PCP lender debt with Experian and Equifax flags. Disclose finance still on the title before you sell.",
    link: "Experian Credit Scan",
  },
];

export function WhatWeCheck() {
  return (
    <section className="w-full py-space-3xl bg-surface">
      <div className="max-w-[1240px] mx-auto px-gutter-desktop">
        <div className="text-center max-w-2xl mx-auto mb-space-2xl">
          <span className="font-label-md text-label-md text-secondary uppercase font-bold tracking-wider">
            Comprehensive UK Due Diligence
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mt-space-2xs tracking-tight">
            What We Check For You
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
            We aggregate records from 80+ state and automotive databases. You
            purchase a vehicle check; your full report is emailed within 3–4
            hours.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            {checks.map((check) => (
              <div
                key={check.title}
                className="group p-space-lg rounded-xl bg-surface-container-lowest shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-surface-container-high"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center mb-space-md group-hover:scale-105 transition-transform ${check.iconClass}`}
                  >
                    <span className="material-symbols-outlined text-[28px]">
                      {check.icon}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                    {check.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {check.body}
                  </p>
                </div>
                <div className="mt-space-md pt-space-md flex items-center gap-space-2xs text-secondary font-label-md text-label-md">
                  <span>{check.link}</span>
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full relative rounded-2xl bg-primary-container p-space-lg overflow-hidden shadow-2xl border border-secondary/30 text-white flex flex-col justify-between min-h-[460px]">
              <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
              <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-tertiary-fixed/10 blur-3xl pointer-events-none" />
              <div className="relative z-10 flex items-center justify-between pb-space-xs border-b border-surface-container/10">
                <div className="flex items-center gap-space-2xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed animate-pulse" />
                  <span className="font-label-md text-label-md uppercase tracking-wider text-primary-fixed">
                    Forensic Diagnostic Scan
                  </span>
                </div>
                <span className="px-space-xs py-1 rounded bg-secondary/30 text-secondary-fixed font-label-md text-[11px] font-semibold tracking-wider uppercase border border-secondary/40">
                  80+ Live Checks
                </span>
              </div>
              <div className="relative flex-1 flex items-center justify-center my-space-md py-space-xs">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 rounded-full bg-[radial-gradient(circle,#2d5bff_0%,transparent_70%)] opacity-20 blur-xl" />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Technical Wireframe Vehicle Inspection Diagnostic"
                  className="relative z-10 max-h-[320px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  src={DIAGNOSTIC_WIREFRAME_URL}
                  style={{
                    filter: "drop-shadow(0 0 16px rgba(45, 91, 255, 0.35))",
                  }}
                />
              </div>
              <div className="relative z-10 pt-space-xs border-t border-surface-container/10 flex items-center justify-between font-label-md text-label-md text-primary-fixed-dim">
                <div className="flex items-center gap-space-2xs">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
                    verified
                  </span>
                  <span>Chassis &amp; Powertrain Integrity</span>
                </div>
                <span className="font-bold text-tertiary-fixed text-[12px] tracking-wider">
                  PASSED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
