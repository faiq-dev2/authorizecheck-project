import Link from "next/link";

export function AboutHero() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[480px] bg-gradient-to-b from-secondary-fixed/30 via-surface-container-low/20 to-transparent blur-3xl -z-10 pointer-events-none" />
      <div className="max-w-[1240px] mx-auto px-gutter-desktop pt-space-xl pb-space-2xl">
        <nav className="flex items-center gap-space-xs text-on-surface-variant mb-space-md">
          <Link
            className="font-label-md text-label-md hover:text-secondary transition-colors"
            href="/"
          >
            Home
          </Link>
          <span className="material-symbols-outlined text-[14px]">
            chevron_right
          </span>
          <span className="font-label-md text-label-md text-secondary font-semibold">
            About AuthorizeCheck
          </span>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-end">
          <div className="lg:col-span-8 flex flex-col gap-space-sm">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-secondary-fixed text-on-secondary-fixed w-fit shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                verified
              </span>
              <span className="font-label-md text-label-md tracking-wide uppercase font-semibold">
                Institutional Provenance Standard
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight">
              About AuthorizeCheck — <br className="hidden sm:inline" />
              <span className="text-secondary">UK Vehicle Intelligence</span>
            </h1>
            <p className="font-body-xl text-body-xl text-on-surface-variant max-w-2xl">
              Empowering British car sellers, registered owners, and motor
              finance underwriters with unfiltered vehicle history, forensic
              data cross-referencing, and complete peace of mind.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-md flex items-center gap-space-md w-full sm:w-auto">
              <div className="w-12 h-12 rounded-lg bg-tertiary-fixed/30 flex items-center justify-center text-on-tertiary-container">
                <span className="material-symbols-outlined text-[28px]">
                  shield_with_heart
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary">
                  £40,000
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Data Guarantee per Check
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
