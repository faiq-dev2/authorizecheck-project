const cards = [
  {
    icon: "badge",
    iconWrap: "bg-surface-container text-primary",
    title: "DVLA & V5C Logbook Data",
    body: "Full validation of legal registration dates, engine capacity, CO2 bandings, registered keeper counts, logbook issue dates, and tax status.",
    dot: "bg-tertiary-fixed-dim",
    meta: "Official DVLA Commercial Gateway",
    metaClass: "text-on-tertiary-container",
  },
  {
    icon: "local_police",
    iconWrap: "bg-secondary-fixed text-secondary",
    title: "Police National Computer (PNC)",
    body: "Immediate querying of the UK Stolen Vehicle Register. Verifies if the VRM or VIN is actively sought by law enforcement agencies across Great Britain and NI.",
    dot: "bg-secondary",
    meta: "Zero-Stolen Tolerance Flagging",
    metaClass: "text-secondary",
  },
  {
    icon: "car_crash",
    iconWrap: "bg-error-container text-error",
    title: "MIAFTR Salvage & Write-Off",
    body: "The Motor Insurers’ Anti-Fraud and Theft Register. Detects Category A, B (scrapped) and structural Category S, non-structural Category N salvage write-offs.",
    dot: "bg-error",
    meta: "Over 12M Insurance Claims Audited",
    metaClass: "text-on-surface-variant",
  },
  {
    icon: "payments",
    iconWrap: "bg-surface-container text-secondary",
    title: "UK Motor Finance Registers",
    body: "Scans 60+ major UK automotive lenders (Hire Purchase, PCP, Leasehold). Identifies active finance agreements with lender identity and agreement reference.",
    dot: "bg-secondary",
    meta: "Comprehensive Title Protection",
    metaClass: "text-secondary",
  },
  {
    icon: "history_edu",
    iconWrap: "bg-surface-container text-primary",
    title: "MOT History & Mileage Timeline",
    body: "Complete chronological audit of every UK testing station inspection. Compares recorded odometer increments to detect illegal digital rollbacks and dangerous failure advisories.",
    dot: "bg-tertiary-fixed-dim",
    meta: "Full Inspector Advisory Trace",
    metaClass: "text-on-tertiary-container",
  },
  {
    icon: "pin",
    iconWrap: "bg-surface-container text-primary",
    title: "VRM Changes & Import/Export",
    body: "Uncovers private vanity plate transfers, previous UK registrations, grey imports, and cross-border export restrictions with historic chassis verification.",
    dot: "bg-secondary",
    meta: "Historical Identity Continuity",
    metaClass: "text-secondary",
  },
];

export function RegistryMatrix() {
  return (
    <section className="w-full bg-surface-container-low py-space-3xl">
      <div className="max-w-[1240px] mx-auto px-gutter-desktop flex flex-col gap-space-2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs max-w-xl">
            <div className="inline-flex items-center gap-space-2xs text-secondary font-label-md text-label-md uppercase tracking-wider font-bold">
              <span className="material-symbols-outlined text-[16px]">rule</span>
              Forensic Inspection Matrix
            </div>
            <h2 className="font-headline-xl text-headline-xl text-primary tracking-tight">
              Directly interconnected with national registry endpoints.
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
            We synthesize disparate governmental, financial, and policing
            databases into an unequivocal, real-time vehicle verdict.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-space-sm">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.iconWrap}`}
                >
                  <span className="material-symbols-outlined text-[28px]">
                    {card.icon}
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  {card.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {card.body}
                </p>
              </div>
              <div className="mt-space-md pt-space-sm flex items-center gap-space-xs">
                <span className={`w-2 h-2 rounded-full ${card.dot}`} />
                <span
                  className={`font-label-md text-label-md ${card.metaClass}`}
                >
                  {card.meta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
