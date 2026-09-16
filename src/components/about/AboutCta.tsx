"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AboutCta() {
  const router = useRouter();
  const [vrm, setVrm] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = vrm.trim().toUpperCase();
    if (!value) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      router.push("/#pricingSection");
    }, 600);
  }

  return (
    <section className="max-w-[1240px] mx-auto px-gutter-desktop py-space-3xl">
      <div className="relative bg-primary rounded-2xl overflow-hidden p-space-xl md:p-space-2xl text-on-primary shadow-2xl">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-secondary-container/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-10 w-64 h-64 bg-tertiary-fixed/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <div className="lg:col-span-7 flex flex-col gap-space-sm">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded bg-surface-container-lowest/10 w-fit">
              <span className="material-symbols-outlined text-secondary-fixed text-[18px]">
                speed
              </span>
              <span className="font-label-md text-label-md text-secondary-fixed font-semibold tracking-wider uppercase">
                Instant DVLA &amp; Police Verification
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-primary tracking-tight">
              Ready to list your car with proof?
            </h2>
            <p className="font-body-lg text-body-lg text-surface-dim max-w-lg">
              Don&apos;t list with hidden finance, a Category S write-off, or
              an undocumented mileage record. Enter any UK registration plate
              below.
            </p>
            <div className="flex flex-wrap items-center gap-space-md pt-space-2xs text-surface-dim font-body-sm text-body-sm">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">
                  check_circle
                </span>
                <span>Free Basic Details</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">
                  check_circle
                </span>
                <span>80+ Points Audited</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">
                  check_circle
                </span>
                <span>£40k Warranty Protection</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-space-xs">
            <form
              className="bg-surface-container-lowest p-space-sm rounded-xl shadow-lg flex flex-col sm:flex-row gap-space-xs items-center"
              onSubmit={handleSubmit}
            >
              <div className="relative flex items-center bg-[#FFD200] rounded-md h-[52px] w-full sm:w-auto sm:flex-1 overflow-hidden shadow-inner">
                <div className="w-9 h-full bg-[#003399] flex flex-col items-center justify-between py-1.5 shrink-0 select-none">
                  <span className="text-white text-[9px] font-bold">GB</span>
                  <span className="material-symbols-outlined text-white text-[14px]">
                    flag
                  </span>
                </div>
                <input
                  className="w-full h-full bg-transparent text-center font-label-vrm text-label-vrm text-black uppercase tracking-widest placeholder:text-black/40 focus:outline-none focus:ring-0"
                  maxLength={8}
                  onChange={(e) =>
                    setVrm(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))
                  }
                  placeholder="ENTER REG"
                  required
                  type="text"
                  value={vrm}
                />
              </div>
              <button
                className="w-full sm:w-auto h-[52px] px-space-lg rounded-lg bg-secondary-container hover:bg-secondary text-on-secondary font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs transition-all duration-200 shadow-md hover:shadow-lg shrink-0 disabled:opacity-70"
                disabled={loading}
                type="submit"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">
                      progress_activity
                    </span>
                    <span>Validating...</span>
                  </>
                ) : (
                  <>
                    <span>Check Vehicle</span>
                    <span className="material-symbols-outlined text-[20px]">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
            </form>
            <div className="flex items-center justify-center sm:justify-start gap-space-xs text-surface-dim font-body-sm text-body-sm px-space-xs">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              <span>Official DVLA &amp; MIAFTR Registry Synchronized</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
