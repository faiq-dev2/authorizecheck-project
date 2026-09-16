"use client";

import { FormEvent, useState } from "react";

export function ContactInquiryForm() {
  const [vrm, setVrm] = useState("");
  const [showToast, setShowToast] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 5000);
  }

  return (
    <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg sm:p-space-xl shadow-md flex flex-col gap-space-lg relative">
      <div className="flex items-center justify-between pb-space-xs">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Submit an Inquiry
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
            Complete the ticket parameters below for priority routing to
            specialized officers.
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-secondary text-[26px]">
            mark_email_unread
          </span>
        </div>
      </div>
      <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <div className="flex flex-col gap-space-2xs">
            <label
              className="font-label-lg text-label-lg text-on-surface"
              htmlFor="contact-name"
            >
              Full Name <span className="text-error">*</span>
            </label>
            <input
              className="h-11 px-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/50 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary font-body-md text-body-md transition-all shadow-inner"
              id="contact-name"
              name="fullname"
              placeholder="e.g. Richard Davenport"
              required
              type="text"
            />
          </div>
          <div className="flex flex-col gap-space-2xs">
            <label
              className="font-label-lg text-label-lg text-on-surface"
              htmlFor="contact-email"
            >
              Email Address <span className="text-error">*</span>
            </label>
            <input
              className="h-11 px-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/50 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary font-body-md text-body-md transition-all shadow-inner"
              id="contact-email"
              name="email"
              placeholder="richard@example.co.uk"
              required
              type="email"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md items-end">
          <div className="flex flex-col gap-space-2xs">
            <div className="flex items-center justify-between">
              <label
                className="font-label-lg text-label-lg text-on-surface"
                htmlFor="contact-vrm"
              >
                UK Vehicle VRM
              </label>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Optional Helper
              </span>
            </div>
            <div className="relative flex items-center h-12 rounded-lg overflow-hidden bg-[#FFD200] shadow-sm">
              <div className="w-10 h-full bg-[#0035bd] flex flex-col items-center justify-center text-white px-1 select-none">
                <span className="text-[10px] font-bold tracking-tighter leading-none">
                  UK
                </span>
                <span className="material-symbols-outlined text-[16px] leading-none mt-1">
                  directions_car
                </span>
              </div>
              <input
                className="w-full h-full bg-transparent px-space-sm text-center font-label-vrm text-label-vrm text-primary uppercase placeholder:text-primary/40 focus:outline-none tracking-wider"
                id="contact-vrm"
                maxLength={8}
                name="vrm"
                onChange={(e) =>
                  setVrm(
                    e.target.value.toUpperCase().replace(/[^A-Z0-9 ]/g, ""),
                  )
                }
                placeholder="AA19 XYZ"
                type="text"
                value={vrm}
              />
            </div>
          </div>
          <div className="flex flex-col gap-space-2xs">
            <label
              className="font-label-lg text-label-lg text-on-surface"
              htmlFor="inquiry-category"
            >
              Subject Category <span className="text-error">*</span>
            </label>
            <div className="relative">
              <select
                className="w-full h-12 px-space-sm rounded-lg bg-surface-container-low text-on-surface focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary font-body-md text-body-md appearance-none shadow-inner"
                defaultValue=""
                id="inquiry-category"
                required
              >
                <option disabled value="">
                  Select Inquiry Type...
                </option>
                <option value="report-inquiry">
                  Report Inconsistency or Query
                </option>
                <option value="billing-payment">
                  Billing, Receipts &amp; Guarantees
                </option>
                <option value="technical-api">
                  Technical &amp; Gateway Support
                </option>
                <option value="fleet-partnerships">
                  Corporate Dealership &amp; Fleet API
                </option>
                <option value="other">General Support &amp; Legal</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-on-surface-variant text-[20px]">
                expand_more
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-space-2xs">
          <label
            className="font-label-lg text-label-lg text-on-surface"
            htmlFor="contact-reference"
          >
            Report Reference / Order ID{" "}
            <span className="text-on-surface-variant font-normal text-body-sm">
              (if available)
            </span>
          </label>
          <input
            className="h-11 px-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/50 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary font-body-md text-body-md transition-all shadow-inner"
            id="contact-reference"
            name="reference"
            placeholder="e.g. AC-984210-UK"
            type="text"
          />
        </div>

        <div className="flex flex-col gap-space-2xs">
          <label
            className="font-label-lg text-label-lg text-on-surface"
            htmlFor="contact-message"
          >
            Detailed Message <span className="text-error">*</span>
          </label>
          <textarea
            className="p-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/50 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary font-body-md text-body-md transition-all shadow-inner resize-y"
            id="contact-message"
            placeholder="Please describe your query with any vehicle chassis context, plate details, or discrepancies observed..."
            required
            rows={5}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pt-space-2xs">
          <label className="flex items-center gap-space-xs cursor-pointer select-none">
            <input
              className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
              defaultChecked
              type="checkbox"
            />
            <span className="font-body-md text-body-md text-on-surface-variant">
              Send me a copy of this correspondence
            </span>
          </label>
          <div className="flex items-center gap-space-2xs text-on-surface-variant font-body-sm text-body-sm">
            <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
              lock
            </span>
            <span>256-bit TLS Protected</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pt-space-xs">
          <button
            className="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-sm rounded-lg bg-secondary-container text-on-secondary hover:bg-secondary font-label-lg text-label-lg shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            type="submit"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
            <span>Send Priority Message</span>
          </button>
          <div className="flex items-center gap-space-2xs font-body-sm text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-secondary">
              bolt
            </span>
            <span>
              Average response: <strong>&lt; 20 minutes</strong> during office
              hours
            </span>
          </div>
        </div>

        {showToast ? (
          <div className="mt-space-sm p-space-sm rounded-lg bg-tertiary-fixed-dim/20 text-on-surface flex items-start gap-space-sm">
            <span className="material-symbols-outlined text-on-tertiary-container text-[20px] mt-0.5">
              check_circle
            </span>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface">
                Ticket Dispatched Successfully
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Ref #AC-REQ-8491 created. A confirmation receipt has been
                dispatched to your inbox.
              </span>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
}
