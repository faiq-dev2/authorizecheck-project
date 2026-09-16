export function ContactStatusBar() {
  return (
    <section className="w-full bg-surface-container-lowest shadow-sm">
      <div className="max-w-[1240px] mx-auto px-gutter-desktop py-space-xs flex flex-wrap items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-xs">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-on-tertiary-container opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-on-tertiary-container" />
          </span>
          <span className="font-label-md text-label-md text-on-surface font-semibold">
            DVLA, PNC &amp; MIAFTR Feeds: Operational
          </span>
          <span className="hidden sm:inline-block text-on-surface-variant font-body-sm text-body-sm">
            • 99.98% Gateway Uptime Today
          </span>
        </div>
        <div className="flex items-center gap-space-sm font-label-md text-label-md text-on-surface-variant">
          <span className="flex items-center gap-space-2xs text-secondary font-medium">
            <span className="material-symbols-outlined text-[16px]">
              schedule
            </span>
            Avg. Queue Time: &lt; 2 mins
          </span>
          <span className="hidden md:inline-block text-outline-variant">|</span>
          <span className="hidden md:inline-flex items-center gap-space-2xs text-on-surface">
            <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
              verified
            </span>
            UK GDPR Encrypted Dispatch
          </span>
        </div>
      </div>
    </section>
  );
}
