export function PrivacySections() {
  return (
    <div className="lg:col-span-8 flex flex-col gap-space-xl">
      <article
        className="scroll-mt-28 bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col gap-space-md"
        id="section-1"
      >
        <div className="flex items-center gap-space-sm">
          <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-headline-sm text-headline-sm text-secondary">
            01
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Introduction &amp; Scope
          </h2>
        </div>
        <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
          AuthorizeCheck Ltd (&quot;AuthorizeCheck&quot;, &quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;) is deeply committed to protecting
          the privacy, accuracy, and security of individuals using our vehicle
          provenance and background verification services across the United
          Kingdom.
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          This document outlines how we collect, process, disclose, and
          safeguard both personal identification information and automotive
          intelligence queries when you interact with{" "}
          <strong className="text-on-surface">authorizecheck.co.uk</strong>.
          AuthorizeCheck operates in strict conformity with the{" "}
          <strong className="text-on-surface">Data Protection Act 2018</strong>{" "}
          and the{" "}
          <strong className="text-on-surface">
            United Kingdom General Data Protection Regulation (UK GDPR)
          </strong>
          . We are registered with the Information Commissioner&apos;s Office
          (ICO) under corporate data registration certificate{" "}
          <span className="font-semibold text-on-surface">ZA892104</span>.
        </p>
        <div className="bg-surface-container-low p-space-md rounded-lg flex gap-space-md items-start">
          <span className="material-symbols-outlined text-secondary text-[24px] shrink-0 mt-0.5">
            verified_user
          </span>
          <div className="flex flex-col gap-1">
            <span className="font-headline-sm text-headline-sm text-on-surface">
              Institutional Safeguard
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              As a designated Vehicle Identity &amp; Integrity verification
              pipeline, AuthorizeCheck holds data controller responsibility for
              direct customer service delivery, and acts as a lawful processor
              regarding UK registry querying.
            </p>
          </div>
        </div>
      </article>

      <article
        className="scroll-mt-28 bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col gap-space-md"
        id="section-2"
      >
        <div className="flex items-center gap-space-sm">
          <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-headline-sm text-headline-sm text-secondary">
            02
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Information We Collect
          </h2>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          We collect only the technical, transactional, and automotive details
          strictly essential to conduct forensic verification, combat motor
          fraud, and fulfill your order requests.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <div className="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-2xs text-on-surface">
              <span className="material-symbols-outlined text-[20px] text-secondary">
                person
              </span>
              <span className="font-headline-sm text-headline-sm">
                Personal Identifier Data
              </span>
            </div>
            <ul className="font-body-sm text-body-sm text-on-surface-variant space-y-1 list-disc list-inside">
              <li>Legal name and customer communication email</li>
              <li>Billing address provided during checkout</li>
              <li>
                Tokenized payment credentials via Stripe (PCI-DSS Level 1)
              </li>
              <li>Customer support correspondence and ticket records</li>
            </ul>
          </div>
          <div className="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-2xs text-on-surface">
              <span className="material-symbols-outlined text-[20px] text-secondary">
                directions_car
              </span>
              <span className="font-headline-sm text-headline-sm">
                Automotive Intelligence Data
              </span>
            </div>
            <ul className="font-body-sm text-body-sm text-on-surface-variant space-y-1 list-disc list-inside">
              <li>Vehicle Registration Mark (VRM / UK licence plate)</li>
              <li>
                Vehicle Identification Number (VIN chassis check queries)
              </li>
              <li>Odometer records and declared mileage markers</li>
              <li>V5C logbook serial reference checkpoints</li>
            </ul>
          </div>
        </div>
        <div className="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-2xs text-on-surface">
            <span className="material-symbols-outlined text-[20px] text-secondary">
              devices
            </span>
            <span className="font-headline-sm text-headline-sm">
              Device &amp; Telemetry Data
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            When accessing our portal, automated servers register your Internet
            Protocol (IP) address, operating system, browser engine version,
            device timezone, and referral source to combat brute-force automated
            scraping of registration databases.
          </p>
        </div>
      </article>

      <article
        className="scroll-mt-28 bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col gap-space-md"
        id="section-3"
      >
        <div className="flex items-center gap-space-sm">
          <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-headline-sm text-headline-sm text-secondary">
            03
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            How We Use Your Information
          </h2>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Every operation carried out with your information relies upon defined
          legal grounds under UK GDPR Article 6:
        </p>
        <div className="space-y-space-xs">
          <div className="p-space-sm bg-surface-container-low rounded-lg flex items-start gap-space-sm">
            <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface font-label-md text-label-md shrink-0">
              Contract
            </span>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface">
                Fulfilling Vehicle Provenance Audits
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Generating and delivering comprehensive multi-point history
                reports to the registered owner or seller&apos;s verified email
                address within 3–4 hours of purchasing a vehicle check.
              </span>
            </div>
          </div>
          <div className="p-space-sm bg-surface-container-low rounded-lg flex items-start gap-space-sm">
            <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface font-label-md text-label-md shrink-0">
              Legal Duty
            </span>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface">
                Financial Accounting &amp; Fraud Prevention
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Complying with HMRC tax regulations, anti-money laundering (AML)
                protocols, and reporting stolen vehicle patterns to law
                enforcement.
              </span>
            </div>
          </div>
          <div className="p-space-sm bg-surface-container-low rounded-lg flex items-start gap-space-sm">
            <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface font-label-md text-label-md shrink-0">
              Legitimate
            </span>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface">
                Platform Integrity &amp; Diagnostic Quality
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Detecting scraping bots, optimizing server uptime, and verifying
                discrepancy reports on vehicle status alerts with insurance
                databases.
              </span>
            </div>
          </div>
        </div>
      </article>

      <article
        className="scroll-mt-28 bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col gap-space-md"
        id="section-4"
      >
        <div className="flex items-center gap-space-sm">
          <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-headline-sm text-headline-sm text-secondary">
            04
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Cookies &amp; Tracking Technologies
          </h2>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          AuthorizeCheck uses strictly necessary, performance, and operational
          cookies to keep your active vehicle lookup session secure and remember
          your search state.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm">
            <thead className="bg-surface-container text-on-surface font-label-md text-label-md">
              <tr>
                <th className="p-space-sm rounded-l-lg">Cookie Category</th>
                <th className="p-space-sm">Classification</th>
                <th className="p-space-sm">Purpose</th>
                <th className="p-space-sm rounded-r-lg">Retention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              <tr>
                <td className="p-space-sm font-semibold text-on-surface">
                  __ac_session
                </td>
                <td className="p-space-sm text-secondary font-medium">
                  Essential
                </td>
                <td className="p-space-sm text-on-surface-variant">
                  Maintains secure authenticated report sessions
                </td>
                <td className="p-space-sm text-on-surface-variant">
                  Session (Close)
                </td>
              </tr>
              <tr>
                <td className="p-space-sm font-semibold text-on-surface">
                  __ac_vrm_cache
                </td>
                <td className="p-space-sm text-secondary font-medium">
                  Functional
                </td>
                <td className="p-space-sm text-on-surface-variant">
                  Preserves user plate lookup while browsing bundles
                </td>
                <td className="p-space-sm text-on-surface-variant">24 Hours</td>
              </tr>
              <tr>
                <td className="p-space-sm font-semibold text-on-surface">
                  __ga_telemetry
                </td>
                <td className="p-space-sm text-on-surface-variant font-medium">
                  Analytics
                </td>
                <td className="p-space-sm text-on-surface-variant">
                  Aggregated anonymous usage metrics via cookieless proxies
                </td>
                <td className="p-space-sm text-on-surface-variant">12 Months</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          You can change your cookie preferences at any time via the footer link
          or by disabling non-essential cookies directly within your internet
          browser configuration.
        </p>
      </article>

      <article
        className="scroll-mt-28 bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col gap-space-md"
        id="section-5"
      >
        <div className="flex items-center gap-space-sm">
          <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-headline-sm text-headline-sm text-secondary">
            05
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Data Sharing &amp; Third Parties
          </h2>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          To generate reliable automotive audits, AuthorizeCheck cross-references
          queries against vetted official and commercial registers under
          statutory or licensed data contracts:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
          <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">
              account_balance
            </span>
            <div>
              <span className="font-label-lg text-label-lg text-on-surface">
                Driver &amp; Vehicle Standards Agency (DVSA)
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                MOT inspection pass/fail status, test logs, advisory flags, and
                recorded odometer readings.
              </p>
            </div>
          </div>
          <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">
              car_crash
            </span>
            <div>
              <span className="font-label-lg text-label-lg text-on-surface">
                MIAFTR (Motor Insurers Bureau)
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Salvage category notifications, written-off insurance
                classifications (Cat A, B, S, N).
              </p>
            </div>
          </div>
          <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">
              local_police
            </span>
            <div>
              <span className="font-label-lg text-label-lg text-on-surface">
                Police National Computer (PNC)
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Active stolen markers and reported police automotive theft
                tracking feeds.
              </p>
            </div>
          </div>
          <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">
              payments
            </span>
            <div>
              <span className="font-label-lg text-label-lg text-on-surface">
                Finance Repositories (Experian / Equifax)
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Outstanding automotive finance agreements, hire purchase
                contracts, and unit stocking loans.
              </p>
            </div>
          </div>
        </div>
        <div className="p-space-md rounded-lg bg-surface-container-low flex items-center gap-space-sm">
          <span className="material-symbols-outlined text-on-tertiary-container text-[24px]">
            verified
          </span>
          <span className="font-body-sm text-body-sm text-on-surface">
            We guarantee AuthorizeCheck does not monetize consumer lookup
            histories to marketing affiliates or insurance brokers.
          </span>
        </div>
      </article>

      <article
        className="scroll-mt-28 bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col gap-space-md"
        id="section-6"
      >
        <div className="flex items-center gap-space-sm">
          <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-headline-sm text-headline-sm text-secondary">
            06
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Data Security &amp; Encryption
          </h2>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          All data flows through an uncompromising enterprise security
          architecture, ensuring end-to-end data integrity from initial search to
          report delivery:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
          <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-xs text-center items-center">
            <span className="material-symbols-outlined text-[32px] text-secondary">
              lock
            </span>
            <span className="font-label-lg text-label-lg text-on-surface">
              TLS 1.3 Encryption
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              256-bit dynamic tunnel safeguarding data in transit.
            </span>
          </div>
          <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-xs text-center items-center">
            <span className="material-symbols-outlined text-[32px] text-secondary">
              dns
            </span>
            <span className="font-label-lg text-label-lg text-on-surface">
              ISO 27001 Cloud
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              AWS London Region hosting with physical failover arrays.
            </span>
          </div>
          <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-xs text-center items-center">
            <span className="material-symbols-outlined text-[32px] text-secondary">
              credit_card
            </span>
            <span className="font-label-lg text-label-lg text-on-surface">
              PCI-DSS Tokenized
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Direct Stripe processing. We never store raw card numbers.
            </span>
          </div>
        </div>
        <div className="p-space-md rounded-lg bg-surface-container-low flex items-start gap-space-sm">
          <span className="material-symbols-outlined text-on-tertiary-container text-[24px] shrink-0 mt-0.5">
            verified_user
          </span>
          <div className="flex flex-col gap-1">
            <span className="font-headline-sm text-headline-sm text-on-surface">
              Reports issued only to the registered owner or seller
            </span>
            <div className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed flex flex-col gap-space-xs">
              <p>
                For security and privacy reasons, we only provide the vehicle
                details report to the registered owner of the vehicle. This
                policy helps protect owners from scammers who may attempt to
                obtain or misuse their personal information.
              </p>
              <p>
                Once a payment is made, we verify that you are the registered
                owner. If the ownership cannot be verified, the payment will
                be declined or refunded.
              </p>
              <p>
                Your privacy and security are our top priorities, and our
                platform uses strict security measures to protect your
                information.
              </p>
            </div>
          </div>
        </div>
      </article>

      <article
        className="scroll-mt-28 bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col gap-space-md"
        id="section-7"
      >
        <div className="flex items-center gap-space-sm">
          <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-headline-sm text-headline-sm text-secondary">
            07
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Your Rights under UK GDPR
          </h2>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          As a UK resident, you possess distinct statutory rights concerning your
          personal information. You may exercise any of the following without
          cost:
        </p>
        <div className="space-y-space-xs">
          <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-sm">
            <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
              manage_search
            </span>
            <div>
              <span className="font-label-lg text-label-lg text-on-surface">
                Right to Access (Subject Access Request - SAR)
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Obtain confirmation of whether we process personal data
                concerning you, alongside a portable digital copy within 30 days.
              </p>
            </div>
          </div>
          <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-sm">
            <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
              edit_square
            </span>
            <div>
              <span className="font-label-lg text-label-lg text-on-surface">
                Right to Rectification
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Request correction of inaccurate or incomplete billing details or
                personal identifiers.
              </p>
            </div>
          </div>
          <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-sm">
            <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
              delete_forever
            </span>
            <div>
              <span className="font-label-lg text-label-lg text-on-surface">
                Right to Erasure (&quot;Right to be Forgotten&quot;)
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Demand complete deletion of account identity records where
                retention is no longer justified under statutory law.
              </p>
            </div>
          </div>
          <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-sm">
            <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
              sync_problem
            </span>
            <div>
              <span className="font-label-lg text-label-lg text-on-surface">
                Right to Object &amp; Restrict Processing
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Halt processing of specific analytical data logs or dispute
                specific records pending verification.
              </p>
            </div>
          </div>
        </div>
      </article>

      <article
        className="scroll-mt-28 bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col gap-space-md"
        id="section-8"
      >
        <div className="flex items-center gap-space-sm">
          <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-headline-sm text-headline-sm text-secondary">
            08
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Data Retention Periods
          </h2>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          We do not retain information longer than is legally required. In
          accordance with the{" "}
          <strong className="text-on-surface">Limitation Act 1980</strong> and
          our{" "}
          <strong className="text-on-surface">
            £30,000 Data Guarantee Warranty
          </strong>
          :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-1">
            <span className="font-headline-sm text-headline-sm text-on-surface">
              Generated Audit Reports
            </span>
            <span className="font-label-md text-label-md text-secondary">
              Retained for 6 Years
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Archived in encrypted cold storage to honor multi-year dispute
              representations and insurance claims.
            </p>
          </div>
          <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-1">
            <span className="font-headline-sm text-headline-sm text-on-surface">
              Unfinished Plate Lookups
            </span>
            <span className="font-label-md text-label-md text-secondary">
              Retained for 48 Hours
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Temporary memory cache automatically wiped after unfinalized check
              interactions.
            </p>
          </div>
        </div>
      </article>

      <article
        className="scroll-mt-28 bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col gap-space-md"
        id="section-9"
      >
        <div className="flex items-center gap-space-sm">
          <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-headline-sm text-headline-sm text-secondary">
            09
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Changes to This Policy
          </h2>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          AuthorizeCheck reserves the prerogative to revise this policy to
          reflect emerging regulatory standards, ICO directives, or technical
          additions to our registry integrations.
        </p>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Registered account holders will receive a prominent notification banner
          or direct electronic dispatch at least 14 days prior to any material
          alterations affecting your privacy entitlements.
        </p>
      </article>

      <article
        className="scroll-mt-28 bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col gap-space-md"
        id="section-10"
      >
        <div className="flex items-center gap-space-sm">
          <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-headline-sm text-headline-sm text-secondary">
            10
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Data Protection Officer (DPO) Contact
          </h2>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          If you wish to submit a Subject Access Request (SAR), inquire about our
          regulatory filings, or file a complaint regarding our data handling
          procedures, please contact our designated DPO team:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md bg-surface-container-low p-space-md rounded-xl">
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-lg text-label-lg text-on-surface">
              Corporate Headquarters
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              AuthorizeCheck Ltd
              <br />
              10 Fenchurch Avenue, Level 14
              <br />
              London, EC3M 5BN
              <br />
              United Kingdom
            </p>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Company No: 14289104
            </span>
          </div>
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-lg text-label-lg text-on-surface">
              Direct Compliance Channels
            </span>
            <div className="flex items-center gap-space-2xs text-body-sm">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                mail
              </span>
              <a
                className="text-secondary font-semibold hover:underline"
                href="mailto:dpo@authorizecheck.co.uk"
              >
                dpo@authorizecheck.co.uk
              </a>
            </div>
            <div className="flex items-center gap-space-2xs text-body-sm">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                phone
              </span>
              <span className="text-on-surface-variant">
                +44 (0) 20 7946 0912
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              You also maintain the right to register concerns directly with the
              UK Information Commissioner&apos;s Office (ICO) via{" "}
              <a
                className="text-secondary hover:underline"
                href="https://ico.org.uk"
                rel="noopener noreferrer"
                target="_blank"
              >
                ico.org.uk
              </a>
              .
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
