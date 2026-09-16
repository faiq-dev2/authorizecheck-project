"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";
import { HERO_WIREFRAME_URL } from "./assets";

export function Hero() {
  const [vrm, setVrm] = useState("");
  const router = useRouter();
  const { showToast } = useToast();

  function handleLookup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = vrm.trim().toUpperCase();
    if (!value) {
      showToast(
        "Please enter a valid UK registration plate number (e.g. AB21 XYZ)",
        "error",
      );
      return;
    }
    router.push("/checkout");
  }

  return (
    <section className="relative w-full overflow-hidden bg-primary py-space-3xl md:py-space-4xl text-on-primary">
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top_right,#2d5bff,transparent_55%)]" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-on-tertiary-container/10 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center">
        <div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(45,91,255,0.25) 0%, rgba(11,31,58,0) 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Automotive Wireframe X-Ray Diagnostic"
          className="h-[110%] w-auto max-w-none object-contain pointer-events-none select-none -rotate-90 md:rotate-0 transition-opacity duration-300"
          src={HERO_WIREFRAME_URL}
          style={{ mixBlendMode: "screen", opacity: 0.16 }}
        />
      </div>
      <div className="relative max-w-[1240px] mx-auto px-gutter-desktop flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container-lowest/10 backdrop-blur-md shadow-sm mb-space-lg">
          <span
            className="material-symbols-outlined text-secondary-fixed text-[18px]"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            verified
          </span>
          <span className="font-label-md text-label-md tracking-wide text-primary-fixed uppercase font-semibold">
            Official DVLA, Police National Computer &amp; MIAFTR Data Source
          </span>
        </div>
        <h1 className="font-display-hero text-display-hero max-w-4xl tracking-tight text-white mb-space-md">
          Check Any Car&apos;s History <br className="hidden sm:inline" />
          by Registration Number
        </h1>
        <p className="font-body-xl text-body-xl text-primary-fixed-dim max-w-2xl mb-space-2xl">
          Mileage discrepancies, MOT history, accident write-off records (Cat
          S/N/C/D), outstanding finance, stolen vehicle flags, and legal status
          before you list or hand over the keys. Your report is emailed within
          3–4 hours.
        </p>
        <div className="w-full max-w-2xl bg-surface-container-lowest p-space-sm rounded-xl shadow-xl">
          <form
            className="flex flex-col sm:flex-row items-stretch gap-space-sm"
            onSubmit={handleLookup}
          >
            <div className="relative flex-1 flex items-stretch h-[60px] rounded-lg overflow-hidden bg-[#FFD200] shadow-inner">
              <div className="w-14 bg-secondary flex flex-col items-center justify-between py-1.5 px-1 text-white select-none">
                <svg
                  className="w-6 h-3.5 rounded-sm"
                  fill="none"
                  viewBox="0 0 60 30"
                >
                  <clipPath id="ukFlag">
                    <rect height="30" rx="1" width="60" />
                  </clipPath>
                  <g clipPath="url(#ukFlag)">
                    <rect fill="#012169" height="30" width="60" />
                    <path
                      d="M0 0L60 30M60 0L0 30"
                      stroke="#fff"
                      strokeWidth="6"
                    />
                    <path
                      d="M0 0L60 30M60 0L0 30"
                      stroke="#C8102E"
                      strokeWidth="2"
                    />
                    <path
                      d="M30 0v30M0 15h60"
                      stroke="#fff"
                      strokeWidth="10"
                    />
                    <path
                      d="M30 0v30M0 15h60"
                      stroke="#C8102E"
                      strokeWidth="6"
                    />
                  </g>
                </svg>
                <span className="font-label-md text-[11px] font-bold tracking-widest text-surface-container-lowest">
                  UK
                </span>
              </div>
              <input
                aria-label="Vehicle Registration Mark"
                className="flex-1 bg-transparent px-space-md text-center font-label-vrm text-label-vrm text-black uppercase placeholder-black/40 focus:outline-none tracking-widest selection:bg-black selection:text-[#FFD200]"
                maxLength={8}
                onChange={(e) => setVrm(e.target.value)}
                placeholder="e.g. AB21 XYZ"
                type="text"
                value={vrm}
              />
            </div>
            <button
              className="h-[60px] px-space-xl bg-secondary-container hover:bg-secondary text-on-secondary rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-space-xs shadow-md hover:shadow-xl transition-all duration-200"
              type="submit"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                shield_with_heart
              </span>
              <span className="font-bold uppercase tracking-wider">
                Check Now
              </span>
            </button>
          </form>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-space-lg mt-space-lg text-primary-fixed-dim font-body-sm text-body-sm">
          <div className="flex items-center gap-space-2xs">
            <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
              check_circle
            </span>
            <span>Report in 3–4 Hours</span>
          </div>
          <div className="flex items-center gap-space-2xs">
            <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
              verified_user
            </span>
            <span>£40,000 Data Guarantee</span>
          </div>
          <div className="flex items-center gap-space-2xs">
            <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
              credit_card_off
            </span>
            <span>No Subscription Required</span>
          </div>
        </div>
      </div>
    </section>
  );
}
