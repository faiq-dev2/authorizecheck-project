import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-low mt-space-3xl">
      <div className="max-w-[1240px] mx-auto px-gutter-desktop pt-space-3xl pb-space-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl">
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <Link className="inline-flex items-center shrink-0" href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="AuthorizeCheck"
                className="h-11 sm:h-12 w-auto max-w-[220px] object-contain object-left"
                src="/logo.png"
              />
            </Link>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              The UK&apos;s trusted vehicle intelligence platform providing
              MOT, finance, write-off, and mileage checks before you sell.
              You purchase a vehicle check; your report is emailed within
              3–4 hours.
            </p>
            <div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
              <div className="flex items-center gap-space-2xs px-space-sm py-space-2xs rounded bg-surface-container-lowest shadow-[0_1px_3px_rgba(11,31,58,0.04)]">
                <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                  security
                </span>
                <span className="font-label-md text-label-md text-on-surface">
                  DVLA Compliant
                </span>
              </div>
              <div className="flex items-center gap-space-2xs px-space-sm py-space-2xs rounded bg-surface-container-lowest shadow-[0_1px_3px_rgba(11,31,58,0.04)]">
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  local_police
                </span>
                <span className="font-label-md text-label-md text-on-surface">
                  PNC Integrated
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-space-sm">
            <div className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider">
              Quick Links
            </div>
            <ul className="flex flex-col gap-space-xs font-body-md text-body-md text-on-surface-variant">
              <li>
                <Link className="hover:text-on-surface transition-colors" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-on-surface transition-colors"
                  href="/about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-on-surface transition-colors"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-on-surface transition-colors"
                  href="/#pricingSection"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors" href="#">
                  Sample Report
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-space-sm">
            <div className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider">
              Support &amp; Help
            </div>
            <ul className="flex flex-col gap-space-xs font-body-md text-body-md text-on-surface-variant">
              <li>
                <a
                  className="hover:text-on-surface transition-colors"
                  href="mailto:support@authorizecheck.co.uk"
                >
                  support@authorizecheck.co.uk
                </a>
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant">
                Mon-Fri 8am-8pm GMT
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors" href="#">
                  Help Center &amp; FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-space-sm">
            <div className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider">
              Legal &amp; Compliance
            </div>
            <ul className="flex flex-col gap-space-xs font-body-md text-body-md text-on-surface-variant">
              <li>
                <Link
                  className="hover:text-on-surface transition-colors"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-on-surface transition-colors"
                  href="/terms-and-conditions"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-on-surface transition-colors"
                  href="/refund-policy"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors" href="#">
                  Cookie Preferences
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-space-2xl pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-[0_1px_3px_rgba(11,31,58,0.04)]">
          <div className="flex flex-wrap items-center gap-space-md">
            <div className="flex items-center gap-space-2xs text-on-surface">
              <span className="material-symbols-outlined text-[20px] text-on-tertiary-container">
                shield
              </span>
              <span className="font-label-md text-label-md">Norton Secured</span>
            </div>
            <div className="flex items-center gap-space-2xs text-on-surface">
              <span className="material-symbols-outlined text-[20px] text-secondary">
                policy
              </span>
              <span className="font-label-md text-label-md">
                UK GDPR Compliant
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-space-sm font-label-md text-label-md text-on-surface-variant">
            {["SumUp", "Visa", "Mastercard", "Apple Pay", "PayPal"].map(
              (label) => (
                <span
                  key={label}
                  className="px-space-xs py-space-2xs rounded bg-surface-container text-on-surface font-semibold"
                >
                  {label}
                </span>
              ),
            )}
          </div>
        </div>
        <div className="mt-space-lg text-center font-body-sm text-body-sm text-on-surface-variant">
          © 2025 AuthorizeCheck Ltd. Registered in England &amp; Wales. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
