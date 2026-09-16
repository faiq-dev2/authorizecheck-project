"use client";

import { useEffect, useState } from "react";

const tocItems = [
  { id: "section-01", label: "01. Overview & Commitment" },
  { id: "section-02", label: "02. Eligibility for Refunds" },
  { id: "section-03", label: "03. Non-Refundable Situations" },
  { id: "section-04", label: "04. How to Request a Refund" },
  { id: "section-05", label: "05. Refund Processing Timelines" },
  { id: "section-06", label: "06. Payment Method Refunds" },
  { id: "section-07", label: "07. Contact & Escalation" },
];

export function RefundSidebar() {
  const [activeId, setActiveId] = useState("section-01");

  useEffect(() => {
    function onScroll() {
      const sections = document.querySelectorAll('section[id^="section-"]');
      let current = "";
      sections.forEach((section) => {
        const el = section as HTMLElement;
        if (window.pageYOffset >= el.offsetTop - 150) {
          current = el.id;
        }
      });
      if (current) setActiveId(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
      <div className="sticky top-28 flex flex-col gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm">
        <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
          <div className="flex items-center gap-space-2xs text-on-surface">
            <span className="material-symbols-outlined text-[18px] text-secondary">
              list_alt
            </span>
            <span className="font-label-lg text-label-lg uppercase tracking-wider">
              Policy Outline
            </span>
          </div>
          <span className="px-space-2xs py-0.5 rounded bg-surface-container text-on-surface-variant font-body-sm text-body-sm">
            7 Sections
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
                    ? "flex items-center justify-between px-space-sm py-space-xs rounded-lg font-label-md text-label-md bg-surface-container text-on-surface font-semibold transition-colors"
                    : "flex items-center justify-between px-space-sm py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
                }
                href={`#${item.id}`}
              >
                <span className="truncate">{item.label}</span>
                <span className="material-symbols-outlined text-[16px] opacity-40">
                  chevron_right
                </span>
              </a>
            );
          })}
        </nav>
        <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-space-xs mt-space-sm">
          <div className="flex items-center gap-space-2xs text-secondary">
            <span className="material-symbols-outlined text-[18px]">
              verified_user
            </span>
            <span className="font-label-md text-label-md">
              £40,000 Data Cover
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-normal">
            Every comprehensive vehicle check is protected by our underwritten
            data guarantee against catastrophic record omissions.
          </p>
        </div>
      </div>
    </aside>
  );
}
