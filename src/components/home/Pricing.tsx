import Link from "next/link";

const basicFeatures = [
  { ok: true, text: "Police Stolen Register (PNC check)" },
  { ok: true, text: "DVLA Official Road Tax & SORN Status" },
  { ok: true, text: "Official MOT Pass/Fail & Expiry Date" },
  { ok: true, text: "Logbook V5C Count & Previous Keepers" },
  { ok: false, text: "No Outstanding Finance Check" },
  { ok: false, text: "No Insurance Write-Off (Cat S/N/C/D)" },
];

const fullFeatures = [
  {
    icon: "verified",
    iconClass: "text-secondary text-[20px]",
    text: "Outstanding Finance (HP & PCP debt check)",
    strong: true,
  },
  {
    icon: "verified",
    iconClass: "text-secondary text-[20px]",
    text: "Insurance Write-Off Register (Cat A, B, S, N)",
    strong: true,
  },
  {
    icon: "verified",
    iconClass: "text-secondary text-[20px]",
    text: "Mileage Rollback & Clocking Discrepancies",
    strong: true,
  },
  {
    icon: "verified",
    iconClass: "text-secondary text-[20px]",
    text: "Salvage Auction History & Photo Logs",
    strong: false,
  },
  {
    icon: "verified",
    iconClass: "text-secondary text-[20px]",
    text: "Police National Computer Stolen Register",
    strong: false,
  },
  {
    icon: "verified",
    iconClass: "text-secondary text-[20px]",
    text: "Number Plate Changes & Colour Shifts",
    strong: false,
  },
  {
    icon: "verified",
    iconClass: "text-secondary text-[20px]",
    text: "Scrapped, Imported & Exported Status",
    strong: false,
  },
  {
    icon: "security",
    iconClass: "text-on-tertiary-container text-[20px]",
    text: "£40,000 Data Indemnity Guarantee",
    strong: true,
    strongClass: "text-on-tertiary-container",
  },
];

export function Pricing() {
  return (
    <section className="w-full py-space-3xl bg-surface" id="pricingSection">
      <div className="max-w-[980px] mx-auto px-gutter-desktop">
        <div className="text-center max-w-xl mx-auto mb-space-2xl">
          <span className="font-label-md text-label-md text-secondary uppercase font-bold tracking-wider">
            Simple, Honest Pricing
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mt-space-2xs tracking-tight">
            Select Your Inspection Tier
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
            No monthly commitments. You purchase a vehicle check; your report
            is emailed within 3–4 hours.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl items-stretch">
          <div className="p-space-xl rounded-xl bg-surface-container-lowest shadow-md flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-space-xs">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Basic Check
                </h3>
                <span className="px-space-xs py-space-2xs rounded bg-surface-container font-label-md text-label-md text-on-surface-variant">
                  Standard
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                Essential provenance scan for quick roadside viewing.
              </p>
              <div className="flex items-baseline gap-space-2xs mb-space-lg">
                <span className="font-display-hero text-[44px] leading-none text-on-surface font-extrabold">
                  £49.99
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant">
                  one-off
                </span>
              </div>
              <ul className="flex flex-col gap-space-sm font-body-md text-body-md text-on-surface">
                {basicFeatures.map((feature) => (
                  <li
                    key={feature.text}
                    className={`flex items-center gap-space-xs ${
                      feature.ok ? "" : "text-on-surface-variant opacity-60"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        feature.ok ? "text-on-tertiary-container" : ""
                      }`}
                    >
                      {feature.ok ? "check" : "close"}
                    </span>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              className="mt-space-xl w-full py-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg font-bold text-center block transition-colors"
              href="/checkout?plan=basic"
            >
              Get Basic Check
            </Link>
          </div>
          <div className="p-space-xl rounded-xl bg-surface-container-lowest shadow-2xl relative flex flex-col justify-between">
            <div className="absolute -top-3.5 right-6 px-space-sm py-1 rounded-full bg-secondary-container text-white font-label-md text-label-md font-bold tracking-wider uppercase shadow-md">
              MOST POPULAR • 80+ CHECKS
            </div>
            <div>
              <div className="flex justify-between items-center mb-space-xs">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Full Comprehensive
                </h3>
                <span className="px-space-xs py-space-2xs rounded bg-surface-container-highest font-label-md text-label-md text-secondary font-semibold">
                  Recommended
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                Complete institutional audit with £40,000 data indemnity
                guarantee.
              </p>
              <div className="flex items-baseline gap-space-2xs mb-space-lg">
                <span className="font-display-hero text-[44px] leading-none text-secondary font-extrabold">
                  £54.99
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant">
                  one-off
                </span>
              </div>
              <ul className="flex flex-col gap-space-sm font-body-md text-body-md text-on-surface">
                {fullFeatures.map((feature) => (
                  <li
                    key={feature.text}
                    className="flex items-center gap-space-xs"
                  >
                    <span
                      className={`material-symbols-outlined ${feature.iconClass}`}
                    >
                      {feature.icon}
                    </span>
                    {feature.strong ? (
                      <strong className={feature.strongClass}>
                        {feature.text}
                      </strong>
                    ) : (
                      <span>{feature.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              className="mt-space-xl w-full py-space-sm rounded-lg bg-secondary-container hover:bg-secondary text-white font-label-lg text-label-lg font-bold text-center block shadow-lg hover:shadow-xl transition-all"
              href="/checkout?plan=full"
            >
              Buy Full Check Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
