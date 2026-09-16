import Link from "next/link";

export function ContactHero() {
  return (
    <section className="relative w-full bg-surface-container-low py-space-2xl overflow-hidden">
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 bottom-0 w-80 h-80 rounded-full bg-on-tertiary-container/5 blur-2xl pointer-events-none" />
      <div className="max-w-[1240px] mx-auto px-gutter-desktop relative z-10 flex flex-col gap-space-md">
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-space-2xs font-label-md text-label-md text-on-surface-variant"
        >
          <Link className="hover:text-secondary transition-colors" href="/">
            Home
          </Link>
          <span className="material-symbols-outlined text-[14px]">
            chevron_right
          </span>
          <span className="text-on-surface font-semibold">Contact Us</span>
        </nav>
        <div className="max-w-3xl flex flex-col gap-space-xs">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container-highest w-fit">
            <span className="material-symbols-outlined text-[16px] text-secondary">
              support_agent
            </span>
            <span className="font-label-md text-label-md text-secondary tracking-wide uppercase font-bold">
              24/7 Forensic Intelligence Support
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
            Get in Touch with Authorize
            <span className="text-secondary">Check</span> Support
          </h1>
          <p className="font-body-xl text-body-xl text-on-surface-variant leading-relaxed">
            Have a question about a vehicle audit, an unrecognized registration
            mark, or corporate fleet underwriting? Our London-based automotive
            specialists resolve cases rapidly with direct access to statutory
            databases.
          </p>
        </div>
      </div>
    </section>
  );
}
