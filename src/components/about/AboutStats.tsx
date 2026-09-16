"use client";

import { useEffect, useRef } from "react";

const stats = [
  {
    target: 14.2,
    suffix: "M+",
    suffixClass: "text-tertiary-fixed-dim",
    label: "UK Records Monitored",
    sub: "DVLA, PNC & MIAFTR daily feeds",
    prefix: "",
  },
  {
    target: 850,
    suffix: "K+",
    suffixClass: "text-secondary-fixed",
    label: "Reports Delivered",
    sub: "Guarding private & fleet motorists",
    prefix: "",
  },
  {
    target: 99.8,
    suffix: "%",
    suffixClass: "text-tertiary-fixed-dim",
    label: "Data Accuracy Rating",
    sub: "Dual-node algorithmic validation",
    prefix: "",
  },
  {
    target: 40000,
    suffix: "",
    suffixClass: "text-tertiary-fixed",
    label: "Protection Backing",
    sub: "Independent financial indemnity cover",
    prefix: "£",
  },
];

export function AboutStats() {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const counters = refs.current.filter(Boolean) as HTMLSpanElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLSpanElement;
          const targetVal = parseFloat(el.dataset.target || "0");
          const isFloat = targetVal % 1 !== 0;
          const duration = 1200;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = targetVal / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= targetVal) {
              el.innerText = isFloat
                ? targetVal.toFixed(1)
                : Math.round(targetVal).toLocaleString();
              clearInterval(timer);
            } else {
              el.innerText = isFloat
                ? current.toFixed(1)
                : Math.round(current).toLocaleString();
            }
          }, stepTime);
          observer.unobserve(el);
        });
      },
      { threshold: 0.2 },
    );

    counters.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-primary-container text-on-primary py-space-xl">
      <div className="max-w-[1240px] mx-auto px-gutter-desktop">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-lg text-center md:text-left divide-y md:divide-y-0 md:divide-x-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex flex-col gap-space-2xs py-space-xs"
            >
              <div className="flex items-baseline justify-center md:justify-start gap-1">
                {stat.prefix ? (
                  <span
                    className={`font-headline-md text-headline-md font-bold ${stat.suffixClass}`}
                  >
                    {stat.prefix}
                  </span>
                ) : null}
                <span
                  className="font-display-hero-mobile text-display-hero-mobile font-extrabold text-surface-container-lowest tracking-tight"
                  data-target={stat.target}
                  ref={(node) => {
                    refs.current[index] = node;
                  }}
                >
                  {stat.target % 1 !== 0
                    ? stat.target.toFixed(1)
                    : stat.target.toLocaleString()}
                </span>
                {stat.suffix ? (
                  <span
                    className={`font-headline-md text-headline-md font-bold ${stat.suffixClass}`}
                  >
                    {stat.suffix}
                  </span>
                ) : null}
              </div>
              <p className="font-label-md text-label-md text-on-primary-container uppercase tracking-wider">
                {stat.label}
              </p>
              <span className="font-body-sm text-body-sm text-surface-dim">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
