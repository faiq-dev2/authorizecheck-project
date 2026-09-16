"use client";

import { useState } from "react";

const faqLinks = [
  "How do I reprint my vehicle report?",
  "Why is my registration not recognized?",
  "How does the £40,000 data guarantee claim work?",
];

export function ContactSidebar() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("support@authorizecheck.co.uk");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="lg:col-span-5 flex flex-col gap-space-lg">
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col gap-space-md">
        <div className="flex items-center justify-between pb-space-2xs">
          <div className="flex items-center gap-space-xs">
            <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary">
              <span className="material-symbols-outlined text-[18px]">
                contact_phone
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Direct Channels
            </h3>
          </div>
          <span className="px-space-xs py-space-2xs rounded bg-surface-container text-on-tertiary-container font-label-md text-label-md flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-on-tertiary-container" />{" "}
            Live
          </span>
        </div>

        <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between gap-space-xs hover:bg-surface-container transition-colors">
          <div className="flex items-center gap-space-sm min-w-0">
            <span className="material-symbols-outlined text-secondary text-[22px] shrink-0">
              alternate_email
            </span>
            <div className="truncate">
              <div className="font-label-md text-label-md text-on-surface-variant">
                Email Inquiries
              </div>
              <div className="font-label-lg text-label-lg text-on-surface truncate">
                support@authorizecheck.co.uk
              </div>
            </div>
          </div>
          <button
            className="px-space-sm py-space-2xs bg-surface-container-lowest hover:bg-surface-container-high rounded text-secondary font-label-md text-label-md shadow-sm transition-all shrink-0 cursor-pointer"
            onClick={copyEmail}
            type="button"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between gap-space-xs hover:bg-surface-container transition-colors">
          <div className="flex items-center gap-space-sm min-w-0">
            <span className="material-symbols-outlined text-on-tertiary-container text-[22px] shrink-0">
              phone_in_talk
            </span>
            <div className="truncate">
              <div className="font-label-md text-label-md text-on-surface-variant">
                UK Priority Toll-Free
              </div>
              <div className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                0800 484 0219
              </div>
            </div>
          </div>
          <a
            className="px-space-sm py-space-2xs bg-secondary-container text-on-secondary rounded font-label-md text-label-md shadow-sm hover:bg-secondary transition-all shrink-0"
            href="tel:08004840219"
          >
            Call Now
          </a>
        </div>

        <div className="pt-space-xs flex flex-col gap-space-2xs font-body-sm text-body-sm text-on-surface-variant">
          <div className="flex items-center justify-between py-1">
            <span className="flex items-center gap-space-2xs">
              <span className="material-symbols-outlined text-[16px] text-on-surface">
                calendar_today
              </span>
              Monday – Friday
            </span>
            <span className="font-semibold text-on-surface">
              08:00 – 20:00 GMT
            </span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="flex items-center gap-space-2xs">
              <span className="material-symbols-outlined text-[16px] text-on-surface">
                calendar_month
              </span>
              Saturday – Sunday
            </span>
            <span className="font-semibold text-on-surface">
              09:00 – 17:00 GMT
            </span>
          </div>
          <div className="mt-space-2xs p-space-xs rounded bg-surface-container flex items-center gap-space-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[18px] text-secondary">
              speed
            </span>
            <span>
              Typical live specialist phone response in under{" "}
              <strong>15 minutes</strong>.
            </span>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-secondary">
              <span className="material-symbols-outlined text-[18px]">
                location_city
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              London Headquarters
            </h3>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant">
            Registered UK Hub
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface leading-relaxed">
          <strong>AuthorizeCheck Ltd.</strong>
          <br />
          10 Fenchurch Avenue, City of London
          <br />
          London, EC3M 5AG, United Kingdom
        </p>
        <div className="relative w-full h-44 rounded-lg bg-primary-container overflow-hidden flex items-center justify-center shadow-inner">
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                height="24"
                id="city-grid"
                patternUnits="userSpaceOnUse"
                width="24"
              >
                <path
                  d="M 24 0 L 0 0 0 24"
                  fill="none"
                  stroke="#7587a7"
                  strokeWidth="0.75"
                />
              </pattern>
            </defs>
            <rect fill="url(#city-grid)" height="100%" width="100%" />
            <path
              d="M -20,130 C 80,100 160,140 280,110 C 380,80 440,115 500,90"
              fill="none"
              opacity="0.6"
              stroke="#2d5bff"
              strokeWidth="8"
            />
          </svg>
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute h-8 w-8 rounded-full bg-secondary-container opacity-50" />
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary shadow-lg">
                <span className="material-symbols-outlined text-[18px]">
                  business
                </span>
              </div>
            </div>
            <div className="mt-2 px-space-xs py-1 rounded bg-surface/90 backdrop-blur text-primary text-label-md font-label-md shadow-sm">
              10 Fenchurch Ave, EC3M
            </div>
          </div>
          <div className="absolute bottom-2 left-2 px-space-xs py-space-2xs bg-primary/70 backdrop-blur rounded font-body-sm text-body-sm text-on-primary-container text-[10px]">
            LAT: 51.5117° N | LON: 0.0814° W
          </div>
        </div>
        <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
          <span>Automotive Data Registrations #12498210</span>
          <a
            className="text-secondary hover:underline flex items-center gap-1 font-semibold"
            href="https://maps.google.com/?q=10+Fenchurch+Avenue+London+EC3M+5AG"
            rel="noopener"
            target="_blank"
          >
            Open in Maps{" "}
            <span className="material-symbols-outlined text-[14px]">
              open_in_new
            </span>
          </a>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col gap-space-sm">
        <div className="flex items-center gap-space-xs mb-space-2xs">
          <span className="material-symbols-outlined text-secondary text-[22px]">
            help_center
          </span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">
            Looking for Immediate Answers?
          </h3>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Skip the queue. Over 85% of seller questions are covered in our
          real-time vehicle intelligence guides:
        </p>
        <ul className="flex flex-col gap-space-2xs mt-space-2xs">
          {faqLinks.map((label) => (
            <li key={label}>
              <a
                className="p-space-xs rounded-lg bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-on-surface group transition-colors"
                href="#"
              >
                <span className="font-body-md text-body-md group-hover:text-secondary transition-colors">
                  {label}
                </span>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
