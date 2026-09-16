const badges = [
  {
    icon: "policy",
    iconWrap: "bg-secondary/10 text-secondary",
    title: "£40,000 Guarantee",
    sub: "Underwritten accuracy backing",
  },
  {
    icon: "database",
    iconWrap: "bg-on-tertiary-container/10 text-on-tertiary-container",
    title: "MIAFTR Insurer Hub",
    sub: "Direct write-off feeds",
  },
  {
    icon: "local_police",
    iconWrap: "bg-primary-container/10 text-primary-container",
    title: "Police PNC Stolen Log",
    sub: "Live hot-vehicle alert feeds",
  },
  {
    icon: "lock",
    iconWrap: "bg-secondary/10 text-secondary",
    title: "UK GDPR Compliant",
    sub: "Strict privacy protocols",
  },
];

export function ContactTrust() {
  return (
    <section className="w-full bg-surface-container-low py-space-xl">
      <div className="max-w-[1240px] mx-auto px-gutter-desktop">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-lg text-center md:text-left">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-lowest shadow-sm"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${badge.iconWrap}`}
              >
                <span className="material-symbols-outlined text-[22px]">
                  {badge.icon}
                </span>
              </div>
              <div>
                <div className="font-label-lg text-label-lg text-on-surface">
                  {badge.title}
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">
                  {badge.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
