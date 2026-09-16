const reasons = [
  {
    icon: "currency_pound",
    iconClass: "text-secondary",
    title: "Transparent Pricing",
    body: "Zero hidden recurring monthly club subscriptions. Pay one time for the car you are listing with zero fine print traps.",
  },
  {
    icon: "photo_camera",
    iconClass: "text-secondary",
    title: "Salvage Auction Archives",
    body: "Direct access to Copart, BCA, and dealer auction photographic logs revealing write-off damage before repair.",
  },
  {
    icon: "verified",
    iconClass: "text-secondary",
    title: "99.9% UK Coverage",
    body: "Full support for passenger cars, light commercial vans, motorcycles, EVs, and imported vehicles across England, Scotland & Wales.",
  },
  {
    icon: "security",
    iconClass: "text-on-tertiary-container",
    title: "£40,000 Data Guarantee",
    body: "Every full report is insured. In the unlikely event our data misses recorded finance or write-off, you're indemnified up to £40k.",
  },
];

export function WhyChoose() {
  return (
    <section className="w-full py-space-3xl bg-surface-container-low">
      <div className="max-w-[1240px] mx-auto px-gutter-desktop">
        <div className="text-center max-w-2xl mx-auto mb-space-2xl">
          <span className="font-label-md text-label-md text-secondary uppercase font-bold tracking-wider">
            Institutional Advantage
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mt-space-2xs tracking-tight">
            Why Choose AuthorizeCheck
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
            Built for private sellers and dealers who refuse to list blind.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm"
            >
              <span
                className={`material-symbols-outlined text-[36px] mb-space-xs ${reason.iconClass}`}
              >
                {reason.icon}
              </span>
              <h3 className="font-headline-sm text-[18px] leading-6 text-on-surface mb-space-xs">
                {reason.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {reason.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
