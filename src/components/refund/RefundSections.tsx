const eligibility = [
  {
    icon: "check_circle",
    title: "Technical Delivery Failure",
    body: "If an internal gateway latency or cloud network disruption prevented your generated vehicle audit from arriving in your designated email inbox within 3–4 hours of purchase confirmation.",
  },
  {
    icon: "content_copy",
    title: "Duplicate Transactions",
    body: "If accidental rapid clicks or checkout retries generated duplicate merchant settlement authorizations for the same vehicle VRM within a 60-minute window, extra transactions are refunded automatically.",
  },
  {
    icon: "database",
    title: "Verified Primary Registry Omission",
    body: "If our report failed to display an active police stolen flag, logged total loss insurance category (Cat A, B, S, or N), or recorded outstanding finance agreement already recorded on official databases at the precise time of the lookup.",
  },
  {
    icon: "flaky",
    title: "Platform Registration Mismatch",
    body: 'If the AuthorizeCheck parsing engine matched your input VRM against an incorrect vehicle identity (e.g. system returned details for a Ford Focus when a confirmed BMW was queried) due to an internal index error.',
  },
];

const nonRefundable = [
  {
    title: "User Input Registration Errors",
    body: 'Entering an incorrect registration plate manually (e.g., mistyping "O" for "0" or mixing characters). We display a mandatory verification screen showing vehicle make, model, and year prior to checkout.',
  },
  {
    title: "Clean or Unfavourable Results",
    body: "Dissatisfaction with the actual history revealed. Whether a report confirms a completely clean history, exposes hidden finance, or flags major write-off markers, the lookup was executed and the data delivered accurately.",
  },
  {
    title: "Change of Mind After Report Generation",
    body: "Under Regulation 37 of the Consumer Contracts Regulations 2013, once your vehicle report has been furnished by email within the 3–4 hour delivery window, you expressly acknowledge that the digital service has been executed and waive normal cancellation rights.",
  },
  {
    title: "Third-Party Dealership Negotiation Outcomes",
    body: "AuthorizeCheck cannot be held liable if a vehicle seller declines an offer or changes their asking price after an AuthorizeCheck report has been presented to them.",
  },
];

export function RefundSections() {
  return (
    <>
      <section
        className="scroll-mt-28 p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md"
        id="section-01"
      >
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider">
            Section 01
          </span>
          <span className="px-space-xs py-space-2xs rounded bg-surface-container-high text-on-surface font-body-sm text-body-sm font-medium">
            Core Standards
          </span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">
          Overview &amp; Institutional Commitment
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          At AuthorizeCheck, we understand that listing a pre-owned vehicle
          involves significant disclosure and financial exposure. Our mission
          is to deliver unequivocal clarity via authentic DVLA, MIAFTR
          (write-off and stolen records), and Experian-backed automotive
          finance registers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-xs">
          <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-xs">
            <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-on-tertiary-container">
              <span className="material-symbols-outlined text-[20px]">
                thumb_up
              </span>
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface">
              Fair Assessment
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              We assess all refund requests with an objective, customer-first
              mindset under UK consumer laws.
            </p>
          </div>
          <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-xs">
            <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">timer</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface">
              24h Evaluation
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Every inquiry receives direct forensic triage by a member of our
              specialist auditing staff within 24 hours.
            </p>
          </div>
          <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-xs">
            <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-on-tertiary-container">
              <span className="material-symbols-outlined text-[20px]">gavel</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface">
              CRA 2015 Compliant
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Aligned in full with digital content provisions outlined in the
              United Kingdom Consumer Rights Act 2015.
            </p>
          </div>
        </div>
      </section>

      <section
        className="scroll-mt-28 p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md"
        id="section-02"
      >
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider">
            Section 02
          </span>
          <span className="px-space-xs py-space-2xs rounded bg-surface-container-high text-on-surface font-body-sm text-body-sm font-medium">
            Clear Coverage
          </span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">
          Eligibility for Refunds
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          You are fully entitled to a prompt 100% refund under any of the
          following verified conditions:
        </p>
        <div className="flex flex-col gap-space-sm">
          {eligibility.map((item) => (
            <div
              key={item.title}
              className="p-space-md rounded-lg bg-surface-container-low flex items-start gap-space-md"
            >
              <div className="mt-1 w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center text-on-tertiary-container shrink-0">
                <span className="material-symbols-outlined text-[18px]">
                  {item.icon}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  {item.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="scroll-mt-28 p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md"
        id="section-03"
      >
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-error font-semibold uppercase tracking-wider">
            Section 03
          </span>
          <span className="px-space-xs py-space-2xs rounded bg-error-container text-on-error-container font-body-sm text-body-sm font-medium">
            Exclusions
          </span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">
          Non-Refundable Situations
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          AuthorizeCheck incurs instantaneous data query costs across UK
          governmental and private financial registries. Consequently, refunds
          cannot be issued in the following instances:
        </p>
        <div className="flex flex-col gap-space-sm">
          {nonRefundable.map((item) => (
            <div
              key={item.title}
              className="p-space-md rounded-lg bg-surface-container-low flex items-start gap-space-md"
            >
              <div className="mt-1 w-7 h-7 rounded-full bg-error-container flex items-center justify-center text-error shrink-0">
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-label-lg text-label-lg text-on-surface">
                  {item.title}
                </span>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="scroll-mt-28 p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md"
        id="section-04"
      >
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider">
            Section 04
          </span>
          <span className="px-space-xs py-space-2xs rounded bg-surface-container-high text-on-surface font-body-sm text-body-sm font-medium">
            Simple 3 Steps
          </span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">
          How to Request a Refund
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          We operate a friction-free refund claim pipeline. Follow these three
          simple stages to submit your claim directly to our verification team:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-xs">
          <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between gap-space-md relative overflow-hidden">
            <span className="absolute top-2 right-3 font-headline-xl text-headline-xl text-surface-container-high select-none font-bold">
              1
            </span>
            <div className="flex flex-col gap-space-xs relative z-10">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-on-secondary">
                <span className="material-symbols-outlined text-[20px]">pin</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Locate Reference
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Retrieve your Order ID (format:{" "}
                <strong className="text-on-surface font-semibold">
                  AC-849204
                </strong>
                ) from your email payment confirmation or bank transaction
                statement.
              </p>
            </div>
            <span className="font-label-md text-label-md text-secondary font-semibold">
              Step One
            </span>
          </div>
          <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between gap-space-md relative overflow-hidden">
            <span className="absolute top-2 right-3 font-headline-xl text-headline-xl text-surface-container-high select-none font-bold">
              2
            </span>
            <div className="flex flex-col gap-space-xs relative z-10">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-on-secondary">
                <span className="material-symbols-outlined text-[20px]">
                  description
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Provide Evidence
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Outline the exact discrepancy or delivery issue. Attach
                screenshots or supplementary documentation if querying record
                omissions.
              </p>
            </div>
            <span className="font-label-md text-label-md text-secondary font-semibold">
              Step Two
            </span>
          </div>
          <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between gap-space-md relative overflow-hidden">
            <span className="absolute top-2 right-3 font-headline-xl text-headline-xl text-surface-container-high select-none font-bold">
              3
            </span>
            <div className="flex flex-col gap-space-xs relative z-10">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-on-secondary">
                <span className="material-symbols-outlined text-[20px]">
                  send
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Submit Dispatch
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Send your claim to{" "}
                <a
                  className="text-secondary underline font-medium"
                  href="mailto:refunds@authorizecheck.co.uk"
                >
                  refunds@authorizecheck.co.uk
                </a>{" "}
                or use our fast-track submission card below.
              </p>
            </div>
            <span className="font-label-md text-label-md text-secondary font-semibold">
              Step Three
            </span>
          </div>
        </div>
      </section>

      <section
        className="scroll-mt-28 p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md"
        id="section-05"
      >
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider">
            Section 05
          </span>
          <span className="px-space-xs py-space-2xs rounded bg-surface-container-high text-on-surface font-body-sm text-body-sm font-medium">
            Service SLA
          </span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">
          Refund Processing Timelines
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          We hold ourselves to strict operational SLAs to ensure your capital is
          never locked in limbo:
        </p>
        <div className="relative flex flex-col gap-space-md pl-6 border-l-2 border-surface-container mt-space-xs">
          <div className="relative flex flex-col gap-1">
            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-secondary ring-4 ring-surface-container-lowest" />
            <span className="font-label-lg text-label-lg text-on-surface">
              0 – 24 Hours: Claim Investigation
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Our verification desk audits system error traces and
              cross-references data logs with the central server registry. You
              receive written confirmation via email once verified.
            </p>
          </div>
          <div className="relative flex flex-col gap-1">
            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-on-tertiary-container ring-4 ring-surface-container-lowest" />
            <span className="font-label-lg text-label-lg text-on-surface">
              Instant: Gateway Dispatch
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Upon approval, our automated financial gateway immediately triggers
              the settlement reversal. An ARN (Acquirer Reference Number) is
              generated for your banking reference.
            </p>
          </div>
          <div className="relative flex flex-col gap-1">
            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-on-surface-variant ring-4 ring-surface-container-lowest" />
            <span className="font-label-lg text-label-lg text-on-surface">
              3 – 5 Business Days: Account Settlement
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Depending on your UK clearing bank or card issuer (e.g. Barclays,
              HSBC, Monzo, Lloyds), funds will reflect in your account balance
              within 3 to 5 clearing cycles.
            </p>
          </div>
        </div>
      </section>

      <section
        className="scroll-mt-28 p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md"
        id="section-06"
      >
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider">
            Section 06
          </span>
          <span className="px-space-xs py-space-2xs rounded bg-surface-container-high text-on-surface font-body-sm text-body-sm font-medium">
            Reversal Policy
          </span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">
          Payment Method Refunds
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          All refunds are returned solely to the original method used during
          checkout to prevent anti-money laundering (AML) compliance
          infringements. AuthorizeCheck charges zero administrative fees on
          approved refunds.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-sm">
          <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-1">
            <div className="flex items-center gap-space-xs text-on-surface font-semibold font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">
                credit_card
              </span>
              <span>Debit / Credit</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Visa &amp; Mastercard. Funds returned directly to card balance in
              3-5 working days.
            </p>
          </div>
          <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-1">
            <div className="flex items-center gap-space-xs text-on-surface font-semibold font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-on-tertiary-container">
                smartphone
              </span>
              <span>Apple &amp; Google Pay</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Tokens decrypted immediately; shows as refund credit linked to your
              default pass.
            </p>
          </div>
          <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-1">
            <div className="flex items-center gap-space-xs text-on-surface font-semibold font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">
                account_balance_wallet
              </span>
              <span>PayPal</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Funds appear instantaneously in your PayPal balance or 2-3 days for
              linked cards.
            </p>
          </div>
        </div>
      </section>

      <section
        className="scroll-mt-28 p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md"
        id="section-07"
      >
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider">
            Section 07
          </span>
          <span className="px-space-xs py-space-2xs rounded bg-surface-container-high text-on-surface font-body-sm text-body-sm font-medium">
            Claims Desk
          </span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">
          Contact for Refund Queries &amp; Escalation
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Need urgent guidance regarding a pending transaction or disagree with
          an initial claim determination? You can escalate your ticket directly
          to our compliance officer.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-2xs">
          <div className="p-space-md rounded-lg bg-surface-container-low flex items-start gap-space-sm">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary shrink-0">
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase">
                Claims Email
              </span>
              <a
                className="font-headline-sm text-headline-sm text-secondary hover:underline font-semibold"
                href="mailto:refunds@authorizecheck.co.uk"
              >
                refunds@authorizecheck.co.uk
              </a>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Mon-Fri 8:00am – 8:00pm GMT
              </span>
            </div>
          </div>
          <div className="p-space-md rounded-lg bg-surface-container-low flex items-start gap-space-sm">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-tertiary-container shrink-0">
              <span className="material-symbols-outlined text-[20px]">call</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase">
                Toll-Free Priority Line
              </span>
              <a
                className="font-headline-sm text-headline-sm text-on-surface hover:text-secondary transition-colors font-semibold"
                href="tel:08004840219"
              >
                0800 484 0219
              </a>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Free from UK landlines and mobiles
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
