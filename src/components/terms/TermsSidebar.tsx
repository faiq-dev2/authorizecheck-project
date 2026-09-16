"use client";

import { useEffect, useState } from "react";

const tocItems = [
  { id: "section-01", num: "01.", label: "Acceptance of Terms" },
  { id: "section-02", num: "02.", label: "Description of Service" },
  { id: "section-03", num: "03.", label: "User Responsibilities" },
  { id: "section-04", num: "04.", label: "Payment Terms & Billing" },
  { id: "section-05", num: "05.", label: "Report Accuracy & Disclaimer" },
  {
    id: "section-06",
    num: "06.",
    label: "£40,000 Data Indemnity",
    special: true,
  },
  { id: "section-07", num: "07.", label: "Intellectual Property" },
  { id: "section-08", num: "08.", label: "Suspension & Termination" },
  { id: "section-09", num: "09.", label: "Governing Law & Courts" },
  { id: "section-10", num: "10.", label: "Contact Information" },
];

export function TermsSidebar() {
  const [activeId, setActiveId] = useState("section-06");

  useEffect(() => {
    function onScroll() {
      const sections = document.querySelectorAll("article section[id]");
      const scrollPosition = window.scrollY + 160;
      let current = "";

      sections.forEach((section) => {
        const el = section as HTMLElement;
        if (
          scrollPosition >= el.offsetTop &&
          scrollPosition < el.offsetTop + el.offsetHeight
        ) {
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
    <aside className="lg:col-span-4 sticky top-28 hidden lg:flex flex-col gap-space-md">
      <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <span className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider">
            Document Outline
          </span>
          <span className="px-space-xs py-space-2xs rounded bg-surface-container font-label-md text-label-md text-secondary">
            10 Sections
          </span>
        </div>
        <nav className="flex flex-col gap-space-2xs text-body-md font-body-md">
          {tocItems.map((item) => {
            const active = activeId === item.id;
            return (
              <a
                key={item.id}
                className={
                  active
                    ? "group flex items-center justify-between px-space-sm py-space-xs rounded-lg bg-surface-container text-secondary font-semibold transition-all"
                    : "group flex items-center justify-between px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all"
                }
                href={`#${item.id}`}
              >
                <span className="flex items-center gap-space-xs truncate">
                  <span className="font-label-md text-label-md text-secondary">
                    {item.num}
                  </span>
                  <span className="truncate">{item.label}</span>
                </span>
                {active && item.special ? (
                  <span className="material-symbols-outlined text-[16px]">
                    verified
                  </span>
                ) : (
                  <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">
                    arrow_forward
                  </span>
                )}
              </a>
            );
          })}
        </nav>
        <div className="mt-space-sm p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs text-on-surface font-label-lg text-label-lg">
            <span className="material-symbols-outlined text-secondary text-[18px]">
              contact_support
            </span>
            <span>Need clarification?</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Our compliance officers are available Monday to Friday, 8am–8pm GMT.
          </p>
          <a
            className="mt-space-2xs inline-flex items-center gap-space-2xs text-secondary font-label-md text-label-md hover:underline"
            href="mailto:legal@authorizecheck.co.uk"
          >
            <span>legal@authorizecheck.co.uk</span>
            <span className="material-symbols-outlined text-[14px]">
              arrow_outward
            </span>
          </a>
        </div>
      </div>
    </aside>
  );
}
