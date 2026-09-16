const LAB_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC-9xGiPFuvA6WqTvAs_zyiL-ynv-g0-HSfHR4mDgtNd4VxFzOeODT9U4US1nNam3qAUEf67VO67BVdfh4nh0DJGIPtUQCodFnhI1cGMGBitdkvbwHyDLpf9GAn1DZGjFmOFPvrp43xXNt_M_BaF6QDa2fdCBztEkaNhnLKQtnWFSnZyYNjk-_iDXEutKSDlpOMGZKgpt42ZqqILUBDaFI4IIGEBOU2LkqOwy38uz67RNh-4osbz0JO";

const points = [
  {
    icon: "database",
    iconClass: "text-secondary",
    title: "Direct Commercial Registry Licensing",
    body: "Legally licensed access via DVLA commercial portals and certified automotive insurer exchanges under strict UK data governance.",
  },
  {
    icon: "enhanced_encryption",
    iconClass: "text-on-tertiary-container",
    title: "Bank-Grade 256-bit TLS Encryption",
    body: "All seller searches, payments, and generated vehicle certificates are protected through zero-knowledge cryptographic safeguards.",
  },
  {
    icon: "security",
    iconClass: "text-secondary",
    title: "Underwritten Financial Indemnity",
    body: "Every premium check is automatically bonded with a £40,000 compensation warranty covering undisclosed finance or hidden salvage status.",
  },
];

export function Engineering() {
  return (
    <section className="max-w-[1240px] mx-auto px-gutter-desktop py-space-3xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
        <div className="lg:col-span-6 relative">
          <div className="rounded-2xl overflow-hidden shadow-xl bg-surface-container-low aspect-[4/3] relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Modern automotive data engineering laboratory in London with digital vehicle diagnostics monitors"
              className="w-full h-full object-cover"
              src={LAB_IMAGE}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            <div className="absolute bottom-space-lg left-space-lg right-space-lg text-on-primary">
              <div className="flex items-center gap-space-xs mb-space-2xs">
                <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
                  lock_clock
                </span>
                <span className="font-label-md text-label-md text-secondary-fixed uppercase tracking-wider font-semibold">
                  Real-Time Core Gateway
                </span>
              </div>
              <p className="font-headline-sm text-headline-sm text-surface-container-lowest">
                99.99% Guaranteed Service Uptime across British Automotive APIs.
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 flex flex-col gap-space-lg">
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">
              Engineering Credibility
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary leading-tight">
              Institutional standards for every private car seller.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              AuthorizeCheck does not rely on third-party resale brokers. We
              maintain direct fiber-connected ingest pipelines with UK vehicle
              registries, ensuring our customers inspect raw, tamper-proof
              vehicle records.
            </p>
          </div>
          <div className="flex flex-col gap-space-md">
            {points.map((point) => (
              <div key={point.title} className="flex items-start gap-space-md">
                <div
                  className={`w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0 ${point.iconClass}`}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {point.icon}
                  </span>
                </div>
                <div className="flex flex-col gap-space-2xs">
                  <h4 className="font-headline-sm text-headline-sm text-primary">
                    {point.title}
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {point.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
