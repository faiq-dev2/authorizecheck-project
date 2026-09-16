const team = [
  {
    name: "Marcus Vance",
    role: "Chief Executive Officer & Co-Founder",
    bio: "Former Head of Automotive Operations at top UK motor groups. 18 years pioneering used vehicle remarketing standards and transparency protocols.",
    badgeIcon: "verified",
    badge: "Ex-SMMT Advisory Member",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALcQVdkWd3aHq2TnysdD9McgpBhGGtfKT8NOphLRbP0BgV_DPrGX8Fm2M0oV5vlpgy5EGqtDmSDUlEJIur8LjlllgRUY43jbhDOOfO_dK6HvteQQ6UDtZpkcREG3kgRfKJb9mZJABtO_9HT9RMxXYk9A26gS2BCkuMmJKW2pplds21-xSXRuXBxQCjGLVP6rw_o_oukJm1jJq9cNcEkWfrw0v1BmIEuuoQ2c5QVESaVxf6k63jHNkR",
    alt: "Professional portrait of Marcus Vance, Chief Executive Officer",
  },
  {
    name: "Dr. Aris Thorne",
    role: "Chief Technology Officer",
    bio: "PhD in High-Throughput Distributed Systems (Cambridge). Architect of AuthorizeCheck’s asynchronous querying engine connecting to DVLA and PNC node networks.",
    badgeIcon: "lock",
    badge: "Fintech Security Specialist",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBFCXQEixnk1Dr9Knobb4XCOMpCM-299a6vXrXGMBLFWNjyy077TQqC6IxomJWWpeiysXqPekBm8t7sIzuw--g94ST8pJA6iIOKCCs19vkESdgytr4nco4JC6eeUdb83EluMIO4IwiYaHOIiWdTFyVukkcUWECQbvL8q_WyIBg4JDXJ5-ymCImGvzriL14PyeG5Lu5GuwyeH_Vyfx1GzBU0MJ5F-SsHUUQ7c-9MHNCQZaBsFufIbi_i",
    alt: "Professional portrait of Dr. Aris Thorne, Chief Technology Officer",
  },
  {
    name: "Eleanor Sterling",
    role: "Head of Consumer Advocacy",
    bio: "UK trading standards and motor fraud investigator with 14 years supporting British vehicle sellers in dispute resolution and salvage identification.",
    badgeIcon: "gavel",
    badge: "Chartered Trading Standards",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCH48Jld6s6rdysrsB6FB38upO6jFJvtv5j4cj16RdA1hG8Lf5hlBho9mUMgrUXNjXlWx7dLE3FWy35eT7EZqHvhPw9v4wAhgc8iK-JLhYq2DgU8ALQINBnjJXxrE4G0Z1GwYnq0M9LAVuIb9f_6aN9ROQlLiOqKPIDUpRvNuT26_zLuahRbhfyKx60_W1fSIsTodyPC9wLnMUGDl6KkK87jRgBt0NeHgU7pGmjAQhps7qxVGj1MQaY",
    alt: "Professional studio portrait of Eleanor Sterling, Head of Consumer Advocacy",
  },
];

export function Leadership() {
  return (
    <section className="w-full bg-surface-container-low py-space-3xl">
      <div className="max-w-[1240px] mx-auto px-gutter-desktop flex flex-col gap-space-2xl">
        <div className="flex flex-col text-center max-w-2xl mx-auto gap-space-xs">
          <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">
            Leadership Team
          </span>
          <h2 className="font-headline-xl text-headline-xl text-primary tracking-tight">
            Built by automotive veterans &amp; data scientists
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Bringing decades of combined experience from British automotive
            retail, cyber intelligence, and consumer financial advocacy.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col"
            >
              <div className="aspect-[4/3] bg-surface-container relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={member.alt}
                  className="w-full h-full object-cover"
                  src={member.image}
                />
              </div>
              <div className="p-space-lg flex flex-col gap-space-xs flex-1">
                <span className="font-label-md text-label-md text-secondary font-semibold uppercase">
                  {member.role}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  {member.name}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-1">
                  {member.bio}
                </p>
                <div className="pt-space-sm flex items-center gap-space-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">
                    {member.badgeIcon}
                  </span>
                  <span className="font-label-md text-label-md">
                    {member.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
