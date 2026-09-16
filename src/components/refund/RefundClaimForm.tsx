"use client";

import { FormEvent, useState } from "react";

export function RefundClaimForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <section
      className="p-space-xl rounded-xl bg-primary text-on-primary shadow-lg flex flex-col gap-space-lg relative overflow-hidden"
      id="claim-action-card"
    >
      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-secondary opacity-20 blur-2xl pointer-events-none" />
      <div className="flex flex-col gap-space-xs relative z-10">
        <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container-lowest/10 backdrop-blur-md self-start text-surface-bright font-label-md text-label-md">
          <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">
            bolt
          </span>
          <span>Fast-Track Submission Portal</span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-surface-bright">
          Submit a Refund Claim
        </h2>
        <p className="font-body-md text-body-md text-on-primary-container max-w-xl">
          Enter your order details below to register an immediate claim ticket.
          Our automated system generates an tracking token instantly.
        </p>
      </div>

      {!submitted ? (
        <form
          className={`grid grid-cols-1 md:grid-cols-2 gap-space-md relative z-10 ${
            loading ? "opacity-50 pointer-events-none" : ""
          }`}
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-space-2xs">
            <label
              className="font-label-md text-label-md text-surface-bright"
              htmlFor="order-id"
            >
              Order Reference Number
            </label>
            <input
              className="h-11 px-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline outline-none focus:ring-2 focus:ring-secondary transition-all"
              id="order-id"
              placeholder="e.g. AC-984210"
              required
              type="text"
            />
          </div>
          <div className="flex flex-col gap-space-2xs">
            <label
              className="font-label-md text-label-md text-surface-bright"
              htmlFor="claim-email"
            >
              Email Address on Order
            </label>
            <input
              className="h-11 px-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline outline-none focus:ring-2 focus:ring-secondary transition-all"
              id="claim-email"
              placeholder="name@domain.co.uk"
              required
              type="email"
            />
          </div>
          <div className="flex flex-col gap-space-2xs">
            <label
              className="font-label-md text-label-md text-surface-bright"
              htmlFor="vrm-plate"
            >
              Vehicle Registration Mark (VRM)
            </label>
            <input
              className="h-11 px-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md uppercase placeholder:text-outline outline-none focus:ring-2 focus:ring-secondary transition-all"
              id="vrm-plate"
              placeholder="e.g. EA71 WXJ"
              required
              type="text"
            />
          </div>
          <div className="flex flex-col gap-space-2xs">
            <label
              className="font-label-md text-label-md text-surface-bright"
              htmlFor="claim-reason"
            >
              Primary Reason
            </label>
            <select
              className="h-11 px-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-secondary transition-all"
              defaultValue=""
              id="claim-reason"
              required
            >
              <option disabled value="">
                Select qualifying category
              </option>
              <option value="report_not_received">
                Technical: Report not delivered within 3–4 hours
              </option>
              <option value="duplicate_charge">
                Billing: Duplicate billing detected
              </option>
              <option value="registry_omission">
                Audit: Critical registry record omitted
              </option>
              <option value="system_mismatch">
                Audit: Platform registration mismatch
              </option>
              <option value="other">Other qualifying enquiry</option>
            </select>
          </div>
          <div className="flex flex-col gap-space-2xs md:col-span-2">
            <label
              className="font-label-md text-label-md text-surface-bright"
              htmlFor="claim-notes"
            >
              Additional Details &amp; Discrepancy Description
            </label>
            <textarea
              className="p-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline outline-none focus:ring-2 focus:ring-secondary transition-all"
              id="claim-notes"
              placeholder="Provide context or specific details to expedite your evaluation..."
              rows={3}
            />
          </div>
          <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-xs">
            <div className="flex items-center gap-space-xs text-on-primary-container font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">
                shield_lock
              </span>
              <span>Protected by UK Data Protection Act &amp; GDPR</span>
            </div>
            <button
              className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-space-xs rounded-lg bg-secondary-container text-on-secondary hover:bg-secondary font-label-lg text-label-lg shadow-md transition-all"
              type="submit"
            >
              <span>Submit Refund Claim</span>
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </button>
          </div>
        </form>
      ) : (
        <div className="p-space-md rounded-lg bg-tertiary-container text-on-tertiary font-body-md text-body-md flex items-center gap-space-sm relative z-10">
          <span className="material-symbols-outlined text-on-tertiary-container text-[24px]">
            task_alt
          </span>
          <div>
            <p className="font-semibold">Claim Submitted Successfully.</p>
            <p className="text-on-tertiary/80 text-body-sm font-body-sm">
              Your claim ticket has been created (#RC-77821). A confirmation has
              been dispatched to your email address.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
