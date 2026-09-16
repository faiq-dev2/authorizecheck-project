const sellerBenefits = [
  {
    icon: "speed",
    title: "Sell 3x Faster",
    body: "Listings with official provenance certificates generate triple the inquiries in the first 48 hours.",
  },
  {
    icon: "handshake",
    title: "Attract Serious Enquiries",
    body: "Filter out timewasters with documented transparency that answers questions before they are asked.",
  },
  {
    icon: "price_check",
    title: "Justify Your Asking Price",
    body: "Defend your price with documented service records, zero accident history, and immaculate MOT runs.",
  },
  {
    icon: "fact_check",
    title: "Verified Technical Specs",
    body: "Provide definitive factory equipment lists, exact BHP ratings, Euro 6 emissions status, and ULEZ compliance.",
  },
];

export function WhySellers() {
  return (
    <section className="w-full py-space-3xl bg-surface">
      <div className="max-w-[1240px] mx-auto px-gutter-desktop grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="p-space-xl rounded-xl bg-primary text-on-primary shadow-xl relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-secondary/30 rounded-full blur-2xl" />
            <div className="flex items-center gap-space-xs mb-space-lg">
              <span className="material-symbols-outlined text-tertiary-fixed text-[32px]">
                verified_user
              </span>
              <div>
                <span className="font-headline-sm text-headline-sm block tracking-tight">
                  AuthorizeCheck™
                </span>
                <span className="font-label-md text-label-md text-primary-fixed-dim uppercase tracking-wider">
                  Certified Seller Badge
                </span>
              </div>
            </div>
            <div className="p-space-md rounded-lg bg-surface-container-lowest/10 backdrop-blur-md mb-space-md">
              <div className="flex items-center justify-between mb-space-xs">
                <span className="font-label-md text-label-md text-primary-fixed">
                  Listing Status
                </span>
                <span className="px-space-xs py-space-2xs rounded bg-tertiary-container text-tertiary-fixed font-label-md text-label-md font-semibold">
                  TRUST LEVEL A+
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-surface-container-highest">
                &quot;This vehicle comes backed by an authoritative 80-point
                vehicle provenance audit. Zero outstanding finance, authenticated
                mileage, clean title.&quot;
              </p>
            </div>
            <div className="flex items-center justify-between pt-space-xs text-primary-fixed font-body-sm text-body-sm">
              <span>Ready for AutoTrader, eBay &amp; Gumtree</span>
              <span className="material-symbols-outlined text-[18px]">share</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col">
          <span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider">
            For Private Sellers &amp; Dealers
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mt-space-2xs tracking-tight">
            Why Sellers Use AuthorizeCheck
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-sm mb-space-lg">
            Sellers purchase a vehicle check — not a report — to prove honesty
            upfront. Your full report is emailed within 3–4 hours, so viewers
            can review verified history before they visit.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            {sellerBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="p-space-md rounded-lg bg-surface-container-lowest shadow-sm"
              >
                <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-secondary mb-space-xs">
                  <span className="material-symbols-outlined text-[24px]">
                    {benefit.icon}
                  </span>
                </div>
                <h4 className="font-headline-sm text-[18px] leading-6 text-on-surface mb-1">
                  {benefit.title}
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {benefit.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
