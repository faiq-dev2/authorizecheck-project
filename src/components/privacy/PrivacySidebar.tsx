"use client";

import { useEffect, useState } from "react";

const tocItems = [
  { id: "section-1", num: "01", label: "Introduction" },
  { id: "section-2", num: "02", label: "Information We Collect" },
  { id: "section-3", num: "03", label: "How We Use Information" },
  { id: "section-4", num: "04", label: "Cookies & Tracking" },
  { id: "section-5", num: "05", label: "Data Sharing & Third Parties" },
  { id: "section-6", num: "06", label: "Data Security" },
  { id: "section-7", num: "07", label: "Your Rights (UK GDPR)" },
  { id: "section-8", num: "08", label: "Data Retention" },
  { id: "section-9", num: "09", label: "Changes to This Policy" },
  { id: "section-10", num: "10", label: "DPO Contact" },
];

export function PrivacySidebar() {
  const [activeId, setActiveId] = useState("section-1");

  useEffect(() => {
    const sections = document.querySelectorAll('article[id^="section-"]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-space-md">
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
        <div className="flex items-center justify-between pb-space-xs mb-space-xs">
          <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
            Contents Index
          </span>
          <span className="font-body-sm text-body-sm text-secondary font-semibold">
            10 Sections
          </span>
        </div>
        <nav className="flex flex-col gap-1">
          {tocItems.map((item) => {
            const active = activeId === item.id;
            return (
              <a
                key={item.id}
                className={
                  active
                    ? "group flex items-center justify-between px-space-sm py-space-xs rounded-lg font-label-md text-label-md hover:bg-surface-container-low hover:text-secondary transition-all bg-surface-container text-secondary font-semibold"
                    : "group flex items-center justify-between px-space-sm py-space-xs rounded-lg font-label-md text-label-md hover:bg-surface-container-low hover:text-secondary transition-all text-on-surface-variant"
                }
                href={`#${item.id}`}
              >
                <span className="flex items-center gap-space-xs">
                  <span className="w-5 font-body-sm text-on-surface-variant/60 group-hover:text-secondary">
                    {item.num}
                  </span>
                  <span>{item.label}</span>
                </span>
                <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">
                  arrow_forward
                </span>
              </a>
            );
          })}
        </nav>
        <div className="mt-space-md pt-space-md flex flex-col gap-space-xs">
          <button
            className="w-full inline-flex items-center justify-center gap-space-xs px-space-sm py-space-xs rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors"
            onClick={() =>
              alert(
                "Downloading official signed PDF version of Policy 3.2...",
              )
            }
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              download
            </span>
            <span>Download PDF (184 KB)</span>
          </button>
        </div>
      </div>
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary text-[22px]">
            policy
          </span>
          <span className="font-headline-sm text-headline-sm text-on-surface">
            Data Promise
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          AuthorizeCheck strictly operates as a certified intelligence provider.
          We do not sell, rent, or trade your personal information with car
          dealerships, broker networks, or third-party lead generation firms.
        </p>
        <div className="flex items-center gap-space-2xs px-space-xs py-1 rounded bg-surface-container-low text-on-surface-variant font-label-md text-label-md w-fit">
          <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
            lock
          </span>
          <span>256-Bit Encrypted Data Pipe</span>
        </div>
      </div>
    </aside>
  );
}
