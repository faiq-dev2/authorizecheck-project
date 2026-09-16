const faqs = [
  {
    q: "What is AuthorizeCheck and how does it work?",
    a: "AuthorizeCheck is an institutional UK vehicle provenance intelligence platform. When you input a registration mark, our secure API immediately interrogates the DVLA, Police National Computer (PNC), MIAFTR (Motor Insurers Anti-Fraud and Theft Register), Experian, and salvage auction repositories to deliver an exhaustive forensic dossier on the vehicle's past.",
    open: true,
  },
  {
    q: "How fast will I receive my vehicle report?",
    a: "Your report is emailed within 3–4 hours of purchasing a vehicle check. Once payment is confirmed, we compile the vehicle audit and send a downloadable PDF to your email address.",
  },
  {
    q: "What if I only have the vehicle registration number?",
    a: "That's all you need! A valid UK number plate (VRM) allows us to resolve the Vehicle Identification Number (VIN), engine code, and cross-reference all 80+ national vehicle databases automatically.",
  },
  {
    q: "What official databases are included in the full check?",
    a: "Our Full Comprehensive Report interrogates DVLA vehicle registers, Driver and Vehicle Standards Agency (DVSA) MOT inspection histories, MIAFTR total-loss insurance claims, Police National Computer stolen archives, Experian automotive finance agreements, British Car Auctions (BCA), and Copart salvage logs.",
  },
  {
    q: "How can I contact customer support if I have questions about a vehicle?",
    a: "Our UK-based technical support team is available via live chat and email at support@authorizecheck.co.uk from 8:00 AM to 8:00 PM GMT Monday through Friday. We can assist with interpreting technical MOT advisories or finance settlement notes.",
  },
];

export function Faq() {
  return (
    <section className="w-full py-space-3xl bg-surface-container-low">
      <div className="max-w-[980px] mx-auto px-gutter-desktop">
        <div className="text-center max-w-xl mx-auto mb-space-2xl">
          <span className="font-label-md text-label-md text-secondary uppercase font-bold tracking-wider">
            Got Questions?
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mt-space-2xs tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
            Transparent answers about our data sources, delivery, and
            guarantees.
          </p>
        </div>
        <div className="flex flex-col gap-space-sm">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group p-space-md bg-surface-container-lowest rounded-xl shadow-sm cursor-pointer"
              open={faq.open || undefined}
            >
              <summary className="font-headline-sm text-[18px] leading-6 text-on-surface flex justify-between items-center list-none select-none">
                <span>{faq.q}</span>
                <span className="material-symbols-outlined text-on-surface-variant transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <p className="mt-space-sm font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
