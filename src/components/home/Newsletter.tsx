"use client";

import { FormEvent } from "react";

export function Newsletter() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Subscribed! You will receive vehicle market updates.");
  }

  return (
    <section className="w-full py-space-2xl bg-primary text-on-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2d5bff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative max-w-[1240px] mx-auto px-gutter-desktop flex flex-col lg:flex-row items-center justify-between gap-space-xl">
        <div className="max-w-xl text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-space-xs mb-space-xs text-secondary-fixed">
            <span className="material-symbols-outlined text-[20px]">
              notifications_active
            </span>
            <span className="font-label-md text-label-md uppercase font-bold tracking-wider">
              Automotive Market Alerts
            </span>
          </div>
          <h3 className="font-headline-lg text-headline-lg text-white tracking-tight">
            Stay Ahead of Used Vehicle Market Trends
          </h3>
          <p className="font-body-md text-body-md text-primary-fixed-dim mt-space-xs">
            Subscribe for instant alerts on used vehicle market valuations,
            common MOT failure advisories by model, and exclusive report
            discounts.
          </p>
        </div>
        <div className="w-full max-w-md">
          <form
            className="flex flex-col sm:flex-row items-stretch gap-space-xs"
            onSubmit={handleSubmit}
          >
            <input
              className="flex-1 px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary-container"
              placeholder="Enter your email address"
              required
              type="email"
            />
            <button
              className="px-space-lg py-space-sm rounded-lg bg-secondary-container hover:bg-secondary text-white font-label-lg text-label-lg font-bold transition-colors whitespace-nowrap shadow-md"
              type="submit"
            >
              Subscribe
            </button>
          </form>
          <span className="block mt-2 text-center lg:text-left font-body-sm text-[11px] text-primary-fixed-dim">
            No spam. Unsubscribe at any time. UK GDPR Compliant.
          </span>
        </div>
      </div>
    </section>
  );
}
