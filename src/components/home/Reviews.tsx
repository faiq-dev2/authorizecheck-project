"use client";

import { useRef } from "react";

const filters = [
  { label: "All Reviews (14.2k)", active: true },
  { label: "Write-Offs", active: false },
  { label: "Hidden Finance", active: false },
  { label: "Mileage Rollbacks", active: false },
  { label: "Seller Badges", active: false },
];

const reviews = [
  {
    tag: { icon: "car_crash", label: "CAT S WRITE-OFF", className: "bg-error-container text-error" },
    plate: { text: "VW GOLF", className: "bg-[#FFD200] text-black" },
    savings: { text: "LISTED WITH PROOF", className: "bg-tertiary-container text-tertiary-fixed" },
    title: "“Disclosed a historic write-off before listing”",
    body: "I purchased a vehicle check before listing my Golf. AuthorizeCheck pulled archival Copart photos showing a historic rear impact. I disclosed it upfront and sold without a later dispute.",
    meta: { icon: "photo_camera", label: "Salvage Record #CP-849200", badge: "MIAFTR Direct", badgeClass: "text-on-tertiary-container" },
    author: { initials: "MT", name: "Marcus T.", sub: "Manchester • Verified Seller", avatar: "bg-primary text-white" },
    when: "2 days ago",
    featured: true,
  },
  {
    tag: { icon: "payments", label: "FINANCE ALERT", className: "bg-secondary-fixed text-secondary" },
    plate: { text: "BMW 320D", className: "bg-surface-container text-on-surface" },
    savings: { text: "£4,200 CLEARED", className: "bg-on-tertiary-container/10 text-on-tertiary-container" },
    title: "“Cleared leftover PCP before I advertised”",
    body: "“The report flagged £4,200 of outstanding PCP with Black Horse. I settled the lender before listing so the title was clean when the first viewer arrived.”",
    meta: { icon: "verified", label: "Experian Credit Scanner", badge: "Settled Instantly", badgeClass: "text-secondary" },
    author: { initials: "SL", name: "Sarah L.", sub: "Bristol • Finance Scan", avatar: "bg-secondary-container text-white" },
    when: "4 days ago",
  },
  {
    tag: { icon: "speed", label: "MILEAGE VERIFIED", className: "bg-error-container text-error" },
    plate: { text: "FORD FOCUS", className: "bg-surface-container text-on-surface" },
    savings: { text: "MOT MATCHED", className: "bg-error-container text-error" },
    title: "“Proved my mileage against the MOT log”",
    body: "“Viewers always ask about clocking. I ran a check first and handed them the MOT mileage trajectory. The listing sold faster because the odometer was documented.”",
    meta: { icon: "timeline", label: "DVSA MOT Historic Audit", badge: "Mileage Verified", badgeClass: "text-error" },
    author: { initials: "DK", name: "David K.", sub: "Leeds • MOT Timeline", avatar: "bg-tertiary-container text-tertiary-fixed" },
    when: "1 week ago",
  },
  {
    tag: { icon: "badge", label: "SELLER BADGE", className: "bg-surface-container text-on-surface" },
    plate: { text: "AUDI A4", className: "bg-[#FFD200] text-black" },
    savings: { text: "100% ASKING PRICE", className: "bg-secondary-fixed text-secondary" },
    title: "“Sold to the first viewer with zero hassle”",
    body: "“Printed the certificate and handed it to the first viewer who came to see my Audi A4. He read through the clean title and paid the full asking price with zero haggling. Paid for itself 100 times over.”",
    meta: { icon: "verified_user", label: "Certified Seller Certificate", badge: "Trust Level A+", badgeClass: "text-secondary" },
    author: { initials: "JP", name: "James P.", sub: "London • Seller Badge", avatar: "bg-surface-container text-on-surface" },
    when: "2 weeks ago",
  },
  {
    tag: { icon: "speed", label: "LISTING SCAN", className: "bg-on-tertiary-container/10 text-on-tertiary-container" },
    plate: { text: "NISSAN QASHQAI", className: "bg-surface-container text-on-surface" },
    savings: { text: "IN 3–4 HOURS", className: "bg-tertiary-container text-tertiary-fixed" },
    title: "“Ran the check from my phone before listing”",
    body: "“I purchased a vehicle check from my phone before I posted the ad. The PDF report arrived in my inbox within 3–4 hours. Super clean interface, easy to share, and completely reassuring.”",
    meta: { icon: "smartphone", label: "Mobile Check Purchase", badge: "100% Insured", badgeClass: "text-on-tertiary-container" },
    author: { initials: "ER", name: "Elena R.", sub: "Edinburgh • Seller Check", avatar: "bg-surface-container text-on-surface" },
    when: "3 weeks ago",
  },
];

function Stars() {
  return (
    <div className="flex text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined text-[18px]"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          star
        </span>
      ))}
    </div>
  );
}

export function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByAmount(amount: number) {
    trackRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  function scrollToOffset(offset: number) {
    trackRef.current?.scrollTo({ left: offset, behavior: "smooth" });
  }

  return (
    <section className="w-full py-space-3xl bg-surface">
      <div className="max-w-[1240px] mx-auto px-gutter-desktop">
        <div className="text-center max-w-2xl mx-auto mb-space-xl">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container text-on-tertiary-container font-label-md text-label-md font-semibold mb-space-xs">
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              verified
            </span>
            <span>Verified Seller Protection &amp; Due Diligence</span>
          </div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
            Real Reviews from Trusted Sellers
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
            Discover how AuthorizeCheck helps sellers disclose history, clear
            finance, and sell with documented proof.
          </p>
        </div>

        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md mb-space-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md divide-y md:divide-y-0 md:divide-x divide-surface-container">
            <div className="flex flex-col items-center justify-center p-space-xs text-center">
              <div className="flex items-center gap-space-xs">
                <span className="font-display-hero text-[40px] font-black leading-none text-on-surface">
                  4.9
                </span>
                <div className="flex flex-col text-left">
                  <Stars />
                  <span className="font-body-sm text-[12px] text-on-surface-variant">
                    Out of 5.0 rating
                  </span>
                </div>
              </div>
              <span className="font-label-md text-label-md text-on-surface font-semibold mt-1">
                14,200+ Verified Audits
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-space-xs text-center pt-space-sm md:pt-0">
              <span className="font-display-hero text-[32px] font-black leading-none text-secondary">
                £3.4K+
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold mt-1">
                Undisclosed Debt Prevented
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Across finance &amp; loans
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-space-xs text-center pt-space-sm md:pt-0">
              <span className="font-display-hero text-[32px] font-black leading-none text-on-tertiary-container">
                99.4%
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold mt-1">
                Recommendation Rate
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Independent seller survey
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-space-xs text-center pt-space-sm md:pt-0">
              <span className="font-display-hero text-[32px] font-black leading-none text-on-surface">
                3–4h
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold mt-1">
                Report Delivery
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                PDF emailed after your check
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-space-md mb-space-lg">
          <div className="flex flex-wrap items-center gap-space-xs">
            {filters.map((filter) => (
              <button
                key={filter.label}
                className={
                  filter.active
                    ? "px-space-md py-1.5 rounded-full bg-secondary-container text-white font-label-md text-label-md font-semibold shadow-sm"
                    : "px-space-md py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-semibold transition-colors"
                }
                type="button"
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-space-xs self-end md:self-auto">
            <button
              aria-label="Previous review"
              className="w-10 h-10 rounded-full border border-surface-container-high bg-surface-container-lowest text-on-surface hover:bg-surface-container hover:border-secondary flex items-center justify-center transition-all shadow-sm"
              onClick={() => scrollByAmount(-420)}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                chevron_left
              </span>
            </button>
            <button
              aria-label="Next review"
              className="w-10 h-10 rounded-full border border-surface-container-high bg-surface-container-lowest text-on-surface hover:bg-secondary-container hover:text-white hover:border-secondary-container flex items-center justify-center transition-all shadow-sm"
              onClick={() => scrollByAmount(420)}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                chevron_right
              </span>
            </button>
          </div>
        </div>

        <div
          className="flex gap-space-lg overflow-x-auto py-space-sm snap-x snap-mandatory focus:outline-none"
          ref={trackRef}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((review) => (
            <div
              key={review.title}
              className={`w-[360px] sm:w-[420px] flex-shrink-0 snap-start bg-surface-container-lowest p-space-xl rounded-2xl shadow-md flex flex-col justify-between ${
                review.featured
                  ? "border-2 border-secondary/20 shadow-xl relative overflow-hidden"
                  : "border border-surface-container-high hover:shadow-lg transition-all"
              }`}
            >
              <div className="flex items-center justify-between gap-space-xs mb-space-md pb-space-sm border-b border-surface-container">
                <div className="flex items-center gap-space-xs">
                  <div
                    className={`px-space-sm py-1 rounded font-label-md text-label-md font-bold flex items-center gap-1 ${review.tag.className}`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {review.tag.icon}
                    </span>
                    <span>{review.tag.label}</span>
                  </div>
                  <div
                    className={`px-space-sm py-1 rounded font-label-vrm text-[14px] font-bold tracking-wider ${review.plate.className}`}
                  >
                    {review.plate.text}
                  </div>
                </div>
                <div
                  className={`px-space-sm py-1 rounded-full font-label-md text-label-md font-bold ${review.savings.className}`}
                >
                  {review.savings.text}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-space-xs mb-space-xs">
                  <Stars />
                  <span className="font-label-md text-label-md text-on-surface font-bold">
                    {review.title}
                  </span>
                </div>
                <p
                  className={`font-body-md text-body-md leading-relaxed mb-space-md ${
                    review.featured ? "text-on-surface" : "text-on-surface-variant"
                  }`}
                >
                  {review.body}
                </p>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between gap-space-xs mb-space-md">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-secondary text-[18px]">
                      {review.meta.icon}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">
                      {review.meta.label}
                    </span>
                  </div>
                  <span
                    className={`font-body-sm text-[11px] font-bold ${review.meta.badgeClass}`}
                  >
                    {review.meta.badge}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-space-xs border-t border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[13px] ${review.author.avatar}`}
                  >
                    {review.author.initials}
                  </div>
                  <div>
                    <span className="font-label-md text-label-md text-on-surface block font-bold">
                      {review.author.name}
                    </span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">
                      {review.author.sub}
                    </span>
                  </div>
                </div>
                <span className="font-body-sm text-[11px] text-on-tertiary-container font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    verified
                  </span>{" "}
                  {review.when}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-space-xs mt-space-lg">
          <div className="flex items-center gap-space-xs">
            {[0, 444, 888, 1332, 1776].map((offset, index) => (
              <button
                key={offset}
                aria-label={`Go to review slide ${index + 1}`}
                className={
                  index === 0
                    ? "w-3 h-3 rounded-full bg-secondary-container transition-all"
                    : "w-2.5 h-2.5 rounded-full bg-surface-container-high hover:bg-secondary-container transition-all"
                }
                onClick={() => scrollToOffset(offset)}
                type="button"
              />
            ))}
          </div>
          <span className="font-body-sm text-[12px] text-on-surface-variant mt-1">
            ← Drag or use arrows to view more verified audits →
          </span>
        </div>
      </div>
    </section>
  );
}
