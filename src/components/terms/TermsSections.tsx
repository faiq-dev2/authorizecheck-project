"use client";

import Link from "next/link";

export function TermsSections() {
  return (
    <article className="lg:col-span-8 flex flex-col gap-space-xl">
      <section
        className="scroll-mt-28 p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md"
        id="section-01"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="px-space-xs py-space-2xs rounded bg-surface-container text-secondary font-label-md text-label-md font-bold">
              01
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Acceptance of Terms
            </h2>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant">
            Clause 1.0–1.4
          </span>
        </div>
        <div className="flex flex-col gap-space-sm text-body-lg text-on-surface-variant leading-relaxed">
          <p>
            By accessing the website at{" "}
            <strong className="text-on-surface">authorizecheck.co.uk</strong> (the
            “Site”), inputting any United Kingdom Vehicle Registration Mark
            (“VRM”), purchasing a vehicle check, or creating an
            enterprise API integration, you irrevocably agree to be legally
            bound by these Terms &amp; Conditions.
          </p>
          <p>
            If you do not accept these terms in full without modification, you
            must immediately terminate use of our services. These terms
            constitute an enforceable digital contract between you (“User”,
            “Seller”, or “Commercial Partner”) and{" "}
            <strong className="text-on-surface">AuthorizeCheck Ltd</strong>{" "}
            (Company Registration No. 14285910), incorporated under the
            Companies Act 2006 of England and Wales.
          </p>
          <div className="p-space-md rounded-lg bg-surface-container-low text-on-surface flex items-start gap-space-sm">
            <span className="material-symbols-outlined text-secondary text-[22px] shrink-0">
              info
            </span>
            <div className="font-body-md text-body-md flex flex-col gap-space-2xs">
              <span className="font-semibold text-on-surface">
                Statutory Consumer Rights Notice
              </span>
              <span>
                Nothing within these terms affects your non-excludable statutory
                rights under the <em>Consumer Rights Act 2015</em> or the{" "}
                <em>
                  Consumer Contracts (Information, Cancellation and Additional
                  Charges) Regulations 2013
                </em>
                .
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="scroll-mt-28 p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md"
        id="section-02"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="px-space-xs py-space-2xs rounded bg-surface-container text-secondary font-label-md text-label-md font-bold">
              02
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Description of Service
            </h2>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant">
            Clause 2.0–2.3
          </span>
        </div>
        <div className="flex flex-col gap-space-sm text-body-lg text-on-surface-variant leading-relaxed">
          <p>
            AuthorizeCheck provides automated vehicle provenance lookups,
            forensic specification aggregates, and recorded safety histories.
            Reports are generated in real-time by collating data across public
            and licensed proprietary databases, including but not limited to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm my-space-xs">
            <div className="p-space-md rounded-lg bg-surface-container flex flex-col gap-space-2xs">
              <span className="font-label-lg text-label-lg text-on-surface flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-on-tertiary-container text-[18px]">
                  verified
                </span>
                DVLA &amp; DVSA
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Tax status, full digital MOT inspection history, historic
                advisories, emission brackets, V5C logbook issuance issue dates.
              </span>
            </div>
            <div className="p-space-md rounded-lg bg-surface-container flex flex-col gap-space-2xs">
              <span className="font-label-lg text-label-lg text-on-surface flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[18px]">
                  car_crash
                </span>
                MIAFTR Register
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Motor Insurers&apos; Anti-Fraud and Theft Register data
                identifying Category A, B, S, and N write-offs, and salvage
                auction declarations.
              </span>
            </div>
            <div className="p-space-md rounded-lg bg-surface-container flex flex-col gap-space-2xs">
              <span className="font-label-lg text-label-lg text-on-surface flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-on-primary-fixed text-[18px]">
                  security
                </span>
                Police National Computer (PNC)
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Active alerts flagged for stolen vehicles, cross-referenced
                against UK police and Interpol border records.
              </span>
            </div>
            <div className="p-space-md rounded-lg bg-surface-container flex flex-col gap-space-2xs">
              <span className="font-label-lg text-label-lg text-on-surface flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary-container text-[18px]">
                  receipt_long
                </span>
                Finance Registers &amp; HP Agreements
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Outstanding conditional sale, hire purchase (HP), and personal
                contract purchase (PCP) encumbrances.
              </span>
            </div>
          </div>
          <p>
            Delivery of reports occurs by email within 3–4 hours of purchasing
            a vehicle check, as a downloadable PDF dispatched to your
            designated electronic mail address.
          </p>
        </div>
      </section>

      <section
        className="scroll-mt-28 p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md"
        id="section-03"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="px-space-xs py-space-2xs rounded bg-surface-container text-secondary font-label-md text-label-md font-bold">
              03
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              User Responsibilities &amp; Legitimate Interest
            </h2>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant">
            Clause 3.0–3.5
          </span>
        </div>
        <div className="flex flex-col gap-space-sm text-body-lg text-on-surface-variant leading-relaxed">
          <p>
            To maintain compliance with UK Data Protection Acts and sovereign
            automotive security treaties, your access to our lookup system is
            strictly contingent upon your agreement that:
          </p>
          <ul className="list-disc pl-space-lg flex flex-col gap-space-xs text-on-surface">
            <li>
              You possess a lawful, legitimate interest in performing a vehicle
              history search (e.g., registered owner, seller, insurance
              provider, or qualified motor trader).
            </li>
            <li>
              You will not employ automated web-crawlers, bots, headless
              browsers, or distributed scripts to scrape or batch-harvest
              registration numbers from AuthorizeCheck.
            </li>
            <li>
              You will not misrepresent report status to third parties or redact
              adverse warnings (such as Category S structural damage or recorded
              mileage rollback).
            </li>
            <li>
              You are solely responsible for ensuring the VRM entered
              corresponds precisely to the physical number plates of the motor
              car under inspection.
            </li>
          </ul>
        </div>
      </section>

      <section
        className="scroll-mt-28 p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md"
        id="section-04"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="px-space-xs py-space-2xs rounded bg-surface-container text-secondary font-label-md text-label-md font-bold">
              04
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Payment Terms &amp; Transparent Billing
            </h2>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant">
            Clause 4.0–4.4
          </span>
        </div>
        <div className="flex flex-col gap-space-sm text-body-lg text-on-surface-variant leading-relaxed">
          <p>
            AuthorizeCheck adheres to an uncompromising, consumer-first pricing
            policy:
          </p>
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-xs text-on-surface font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-on-tertiary-container">
                lock
              </span>
              <span>
                Fixed One-Off Purchases — Strictly No Subscription Traps
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              We do not enroll customers into rolling monthly subscriptions,
              hidden periodic renewals, or retention clubs. Every single-vehicle
              or multi-check bundle payment is executed as a standalone, one-off
              card transaction processed via 256-bit encrypted Stripe gateways.
            </p>
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <span className="px-space-xs py-space-2xs rounded bg-surface-container-lowest font-label-md text-label-md text-on-surface">
                20% UK VAT Included
              </span>
              <span className="px-space-xs py-space-2xs rounded bg-surface-container-lowest font-label-md text-label-md text-on-surface">
                Instant Digital VAT Invoices
              </span>
              <span className="px-space-xs py-space-2xs rounded bg-surface-container-lowest font-label-md text-label-md text-on-surface">
                Major Debit &amp; Credit Cards
              </span>
            </div>
          </div>
          <p>
            After you purchase a vehicle check, the compiled report is emailed
            within 3–4 hours. Pursuant to Regulation 37(1) of the Consumer
            Contracts Regulations 2013, you acknowledge that the digital service
            commences upon confirmation of payment, thereby waiving standard
            14-day statutory cancellation rights once the report has been
            furnished.
          </p>
        </div>
      </section>

      <section
        className="scroll-mt-28 p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md"
        id="section-05"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="px-space-xs py-space-2xs rounded bg-surface-container text-secondary font-label-md text-label-md font-bold">
              05
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Report Accuracy &amp; Data Disclaimer
            </h2>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant">
            Clause 5.0–5.3
          </span>
        </div>
        <div className="flex flex-col gap-space-sm text-body-lg text-on-surface-variant leading-relaxed">
          <p>
            While AuthorizeCheck exercises rigorous data verification pipelines
            with sub-second API syncs, all vehicle intelligence reflects the
            records furnished by statutory agencies (DVLA, DVSA, MIAFTR members,
            and finance houses).
          </p>
          <p>
            Users recognize that there may occasionally be latent processing
            latency between an insurance total-loss settlement or finance
            clearance event and the formal registry update by the issuing
            institution (typically 24 to 72 business hours). AuthorizeCheck does
            not execute physical on-site mechanical appraisals.
          </p>
        </div>
      </section>

      <section
        className="scroll-mt-28 p-space-xl rounded-xl bg-primary text-on-primary shadow-xl flex flex-col gap-space-lg relative overflow-hidden"
        id="section-06"
      >
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-secondary/30 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm">
            <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-secondary text-[26px]">
                verified_user
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md uppercase tracking-wider text-secondary-fixed">
                Forensic Financial Shield
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-primary">
                06. £40,000 Data Indemnity Guarantee
              </h2>
            </div>
          </div>
          <span className="self-start md:self-auto px-space-sm py-space-xs rounded-full bg-surface-container-high text-on-primary-fixed font-label-md text-label-md">
            Primary Protection Policy
          </span>
        </div>
        <div className="flex flex-col gap-space-md font-body-lg text-body-lg text-inverse-on-surface leading-relaxed">
          <p>
            To provide categorical peace of mind for UK motorists and trade
            sellers, every{" "}
            <strong className="text-on-primary">
              Comprehensive Vehicle Audit
            </strong>{" "}
            generated by AuthorizeCheck is insured with our{" "}
            <strong className="text-on-primary">
              £40,000 Financial Guarantee
            </strong>
            .
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
            <div className="p-space-md rounded-lg bg-surface-container-lowest/10 backdrop-blur flex flex-col gap-space-xs">
              <div className="flex items-center gap-space-xs font-headline-sm text-headline-sm text-on-primary">
                <span className="material-symbols-outlined text-secondary-fixed">
                  done_all
                </span>
                <span>Covered Scenarios</span>
              </div>
              <ul className="font-body-md text-body-md text-inverse-on-surface flex flex-col gap-space-2xs pl-space-sm list-disc">
                <li>
                  Undisclosed active finance (HP/PCP) resulting in lender
                  repossession.
                </li>
                <li>
                  Undetected write-off category recorded prior to report
                  purchase date.
                </li>
                <li>
                  Stolen vehicle status recorded on PNC before lookup
                  generation.
                </li>
                <li>
                  Direct financial loss capped up to the lower of vehicle market
                  value or £40,000.
                </li>
              </ul>
            </div>
            <div className="p-space-md rounded-lg bg-surface-container-lowest/10 backdrop-blur flex flex-col gap-space-xs">
              <div className="flex items-center gap-space-xs font-headline-sm text-headline-sm text-on-primary">
                <span className="material-symbols-outlined text-error-container">
                  warning
                </span>
                <span>Exclusions &amp; Requirements</span>
              </div>
              <ul className="font-body-md text-body-md text-inverse-on-surface flex flex-col gap-space-2xs pl-space-sm list-disc">
                <li>
                  Vehicle purchase must take place within 60 calendar days of
                  check.
                </li>
                <li>
                  Physical VIN and V5C serial must be cross-referenced prior to
                  money transfer.
                </li>
                <li>
                  Private transactions must have verified proof of seller
                  identity &amp; address.
                </li>
                <li>
                  Excludes mechanical wear-and-tear or unrecorded private
                  damage.
                </li>
              </ul>
            </div>
          </div>
          <p className="font-body-sm text-body-sm text-on-primary-container">
            Formal indemnity claims must be lodged via
            claims@authorizecheck.co.uk within 14 calendar days of lender notice
            or police intervention, providing purchase invoice, V5C logbook
            copy, and registered police crime reference if applicable.
          </p>
        </div>
      </section>

      <section
        className="scroll-mt-28 p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md"
        id="section-07"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="px-space-xs py-space-2xs rounded bg-surface-container text-secondary font-label-md text-label-md font-bold">
              07
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Intellectual Property &amp; Copyright
            </h2>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant">
            Clause 7.0–7.2
          </span>
        </div>
        <div className="flex flex-col gap-space-sm text-body-lg text-on-surface-variant leading-relaxed">
          <p>
            The visual presentation, interactive VRM lookup modules, algorithmic
            “AuthorizeCheck Vehicle Health Matrix”, and digital PDF report
            arrangements are proprietary intellectual property belonging
            exclusively to AuthorizeCheck Ltd.
          </p>
          <p>
            Purchasing a vehicle check confers a non-exclusive, non-transferable
            license to view, store, and present the resulting report solely for the
            personal evaluation or transaction of the specific motor vehicle
            detailed within. Commercial reproduction or syndication without
            written consent is strictly prohibited.
          </p>
        </div>
      </section>

      <section
        className="scroll-mt-28 p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md"
        id="section-08"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="px-space-xs py-space-2xs rounded bg-surface-container text-secondary font-label-md text-label-md font-bold">
              08
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Suspension &amp; Account Termination
            </h2>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant">
            Clause 8.0–8.3
          </span>
        </div>
        <div className="flex flex-col gap-space-sm text-body-lg text-on-surface-variant leading-relaxed">
          <p>
            AuthorizeCheck reserves the unrestricted right to immediately
            freeze, terminate, or void API credentials, dealer accounts, or user
            access where we detect fraudulent transactions, stolen payment
            instruments, automated query abuse, or bad-faith cancellation
            chargebacks.
          </p>
        </div>
      </section>

      <section
        className="scroll-mt-28 p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md"
        id="section-09"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="px-space-xs py-space-2xs rounded bg-surface-container text-secondary font-label-md text-label-md font-bold">
              09
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Governing Law &amp; Jurisdiction
            </h2>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant">
            Clause 9.0–9.2
          </span>
        </div>
        <div className="flex flex-col gap-space-sm text-body-lg text-on-surface-variant leading-relaxed">
          <p>
            These Terms, their subject matter, and formation (including
            non-contractual disputes or claims) shall be construed and governed
            in all respects in accordance with the substantive laws of England
            and Wales.
          </p>
          <p>
            The courts located within London, England, shall maintain sole and
            exclusive jurisdiction over any proceeding or dispute arising out of
            or in connection with our services.
          </p>
        </div>
      </section>

      <section
        className="scroll-mt-28 p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md"
        id="section-10"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="px-space-xs py-space-2xs rounded bg-surface-container text-secondary font-label-md text-label-md font-bold">
              10
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Contact Information &amp; Legal Notices
            </h2>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant">
            Clause 10.0–10.2
          </span>
        </div>
        <div className="flex flex-col gap-space-md text-body-lg text-on-surface-variant leading-relaxed">
          <p>
            Formal legal notices, claims regarding data discrepancies, or
            statutory cancellation communications must be delivered in writing
            to:
          </p>
          <div className="p-space-lg rounded-xl bg-surface-container flex flex-col sm:flex-row justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-on-surface">
                AuthorizeCheck Ltd
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant">
                Attn: Legal Directorate &amp; Compliance
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant">
                10 Fenchurch Avenue
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant">
                London, EC3M 5AG
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant">
                United Kingdom
              </span>
            </div>
            <div className="flex flex-col gap-space-sm sm:items-end">
              <div className="flex flex-col sm:items-end">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Direct Electronic Mail
                </span>
                <a
                  className="font-label-lg text-label-lg text-secondary hover:underline"
                  href="mailto:legal@authorizecheck.co.uk"
                >
                  legal@authorizecheck.co.uk
                </a>
              </div>
              <div className="flex flex-col sm:items-end">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Company Registration No.
                </span>
                <span className="font-label-lg text-label-lg text-on-surface">
                  14285910
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md p-space-lg rounded-xl bg-surface-container-high">
        <div className="flex items-center gap-space-sm">
          <span className="material-symbols-outlined text-secondary text-[24px]">
            verified
          </span>
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg text-on-primary-fixed">
              Ready to run a vehicle audit?
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Purchase a vehicle check. Report emailed within 3–4 hours. £40,000
              protection guarantee.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
          <button
            className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-lg text-label-lg shadow-sm transition-all"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_upward
            </span>
            <span>Back to Top</span>
          </button>
          <Link
            className="inline-flex items-center gap-space-xs px-space-lg py-space-xs rounded-lg bg-secondary text-on-secondary hover:bg-primary transition-all font-label-lg text-label-lg shadow-md"
            href="/#pricingSection"
          >
            <span>Check Vehicle Now</span>
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
