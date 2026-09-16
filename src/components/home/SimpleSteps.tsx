const steps = [
  {
    num: "01",
    numClass: "bg-secondary text-white",
    title: "Enter Registration",
    body: "Input any active UK number plate to start your vehicle check. We confirm the registration before you purchase.",
  },
  {
    num: "02",
    numClass: "bg-secondary-container text-white",
    title: "Purchase a Vehicle Check",
    body: "Choose Basic or Full Comprehensive. You are buying a vehicle check; the compiled report follows by email.",
  },
  {
    num: "03",
    numClass: "bg-tertiary-container text-tertiary-fixed",
    title: "Receive Your Report",
    body: "Your comprehensive PDF report is emailed within 3–4 hours, backed by a £40,000 data guarantee.",
  },
];

export function SimpleSteps() {
  return (
    <section className="w-full py-space-3xl bg-surface">
      <div className="max-w-[1240px] mx-auto px-gutter-desktop">
        <div className="text-center max-w-2xl mx-auto mb-space-2xl">
          <span className="font-label-md text-label-md text-secondary uppercase font-bold tracking-wider">
            Frictionless Process
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mt-space-2xs tracking-tight">
            3 Simple Steps to Clarity
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
            From registration lookup to a full vehicle report in 3–4 hours.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-xl relative">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative p-space-xl rounded-xl bg-surface-container-lowest shadow-md flex flex-col items-center text-center"
            >
              <div
                className={`w-14 h-14 rounded-full font-headline-sm text-headline-sm flex items-center justify-center mb-space-md shadow-md ${step.numClass}`}
              >
                {step.num}
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                {step.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
