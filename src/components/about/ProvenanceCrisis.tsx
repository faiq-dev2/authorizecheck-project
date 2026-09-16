export function ProvenanceCrisis() {
  return (
    <section className="max-w-[1240px] mx-auto px-gutter-desktop py-space-3xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <div className="inline-flex items-center gap-space-xs">
            <span className="w-6 h-0.5 bg-secondary" />
            <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">
              The Provenance Crisis
            </span>
          </div>
          <h2 className="font-headline-xl text-headline-xl text-primary leading-tight">
            1 in every 3 UK used cars hides a compromising past.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            The UK used car marketplace processes over 7 million transactions
            every year. Beneath glossy dealer showroom photos and polished body
            panels lies a systemic truth: unrecorded write-offs, disguised
            category write-offs (Cat S, N, C, D), outstanding high-APR
            conditional sale agreements, and clock-tampered odometers remain
            rampant.
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            AuthorizeCheck was founded in London by automotive software
            architects and former fraud intelligence analysts. We replaced
            antiquated gov-portal scrapers and predatory paid-report upsells with
            institutional-grade data ingestion, verifying every chassis across
            80+ rigorous forensic points. You purchase a vehicle check; the
            compiled report is emailed within 3–4 hours.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md pt-space-sm">
            <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-2xs">
              <span className="material-symbols-outlined text-secondary text-[24px]">
                verified_user
              </span>
              <span className="font-headline-sm text-headline-sm text-primary">
                Unfiltered
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Zero bias. Zero concealed lender warnings. Direct official
                records.
              </span>
            </div>
            <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-2xs">
              <span className="material-symbols-outlined text-on-tertiary-container text-[24px]">
                bolt
              </span>
              <span className="font-headline-sm text-headline-sm text-primary">
                Sub-Second
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Synchronous multi-register query speeds directly in your pocket.
              </span>
            </div>
            <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-2xs">
              <span className="material-symbols-outlined text-secondary text-[24px]">
                policy
              </span>
              <span className="font-headline-sm text-headline-sm text-primary">
                Protected
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Every comprehensive audit includes comprehensive indemnity.
              </span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="relative bg-surface-container-lowest p-space-lg rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-secondary-fixed/40 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between pb-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="w-3 h-3 rounded-full bg-error animate-pulse" />
                <span className="font-label-lg text-label-lg text-primary uppercase tracking-wide">
                  UK Market Risk Breakdown
                </span>
              </div>
              <span className="font-label-md text-label-md px-space-xs py-space-2xs bg-surface-container rounded text-on-surface-variant">
                2024 Audit Data
              </span>
            </div>
            <div className="flex flex-col gap-space-md my-space-sm">
              <div className="flex flex-col gap-space-2xs">
                <div className="flex justify-between font-label-md text-label-md">
                  <span className="text-on-surface">
                    Outstanding Finance / Leasehold
                  </span>
                  <span className="text-error font-bold">18.4%</span>
                </div>
                <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
                  <div className="bg-error h-full rounded-full w-[18.4%]" />
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Risk: Vehicle repossessed by finance company with zero refund.
                </span>
              </div>
              <div className="flex flex-col gap-space-2xs">
                <div className="flex justify-between font-label-md text-label-md">
                  <span className="text-on-surface">
                    Insurance Salvage / Write-Off (Cat S/N)
                  </span>
                  <span className="text-secondary font-bold">14.1%</span>
                </div>
                <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full w-[14.1%]" />
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Risk: Structural damage compromised, vehicle devaluation up to
                  50%.
                </span>
              </div>
              <div className="flex flex-col gap-space-2xs">
                <div className="flex justify-between font-label-md text-label-md">
                  <span className="text-on-surface">
                    Mileage Discrepancy / Clocked
                  </span>
                  <span className="text-primary font-bold">7.2%</span>
                </div>
                <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full w-[7.2%]" />
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Risk: Premature engine failures and inaccurate maintenance
                  intervals.
                </span>
              </div>
              <div className="flex justify-between font-label-md text-label-md pt-space-xs">
                <span className="text-on-surface">
                  Stolen Status or Scrapped Flag
                </span>
                <span className="text-on-error-container font-bold">1.8%</span>
              </div>
              <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
                <div className="bg-error h-full rounded-full w-[3%]" />
              </div>
            </div>
            <div className="mt-space-md p-space-sm bg-surface-container rounded-lg flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-secondary text-[24px]">
                fact_check
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                AuthorizeCheck reconciles all 4 risk vectors directly against
                the authoritative sovereign registers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
