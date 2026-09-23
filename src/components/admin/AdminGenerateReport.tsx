"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export function AdminGenerateReport() {
  const [password, setPassword] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [downloadFilename, setDownloadFilename] = useState("");
  const [orderId, setOrderId] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");
    setDownloadUrl("");
    setDownloadFilename("");
    setOrderId("");

    try {
      const response = await fetch("/api/admin/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ regNumber }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        if (response.status === 401) setAuthenticated(false);
        setError(data.error || "Unable to generate report.");
        return;
      }

      setAuthenticated(true);
      setOrderId(data.orderId);

      const filename = data.filename || `AuthorizeCheck-Report-${regNumber.trim().toUpperCase()}.pdf`;
      setDownloadFilename(filename);

      let targetUrl = data.downloadUrl;

      // When the server sends back the PDF binary as base64, construct a local Blob URL
      // and trigger automatic browser download so the user gets the PDF immediately
      if (data.pdfBase64) {
        try {
          const binaryString = window.atob(data.pdfBase64);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const blob = new Blob([bytes], { type: "application/pdf" });
          const blobUrl = window.URL.createObjectURL(blob);
          targetUrl = blobUrl;

          // Auto-trigger browser download
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          link.remove();
        } catch (blobErr) {
          console.error("Error creating direct blob download:", blobErr);
        }
      }

      setDownloadUrl(targetUrl);
      setMessage("Report generated successfully! Download has started automatically.");
    } catch (requestError: unknown) {
      setError(requestError instanceof Error ? requestError.message : "Unable to generate report.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="w-full min-h-screen pt-24 pb-20 bg-background text-on-surface">
      <div className="max-w-[900px] mx-auto px-gutter-desktop">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-space-lg border-b border-surface-container">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-secondary uppercase font-bold tracking-widest">
                AuthorizeCheck Control Center
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-white">ADMIN</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">
              Generate Vehicle Report
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Generate a report directly from a vehicle registration number.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-colors" href="/admin/orders">
              Orders
            </Link>
            <Link className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-container font-label-md text-label-md font-semibold transition-colors" href="/">
              Back to Site
            </Link>
          </div>
        </div>

        <section className="max-w-xl mx-auto mt-12 bg-surface-container-lowest p-space-lg sm:p-space-xl rounded-2xl shadow-xl border border-surface-container">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
            <span className="material-symbols-outlined text-[26px]">description</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface">Vehicle report generator</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 mb-6">
            This creates the full comprehensive report without taking payment or sending an email.
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="admin-reg-number">
                Vehicle registration number
              </label>
              <input
                className="h-14 px-4 rounded-lg bg-[#ffd200] border border-black/20 text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-secondary font-mono text-xl font-extrabold uppercase tracking-wider"
                id="admin-reg-number"
                onChange={(event) => setRegNumber(event.target.value.toUpperCase())}
                placeholder="AB12 CDE"
                required
                maxLength={10}
                type="text"
                value={regNumber}
              />
            </div>

            {!authenticated && (
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="admin-generate-password">
                  Admin password
                </label>
                <input
                  className="h-11 px-4 rounded-lg bg-surface-container-low border border-surface-container text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-body-md"
                  id="admin-generate-password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter admin password"
                  type="password"
                  value={password}
                />
              </div>
            )}

            {error && <div className="p-3 rounded-lg bg-error/10 text-error font-body-sm text-body-sm">{error}</div>}
            {message && <div className="p-3 rounded-lg bg-emerald-50 text-emerald-700 font-body-sm text-body-sm">{message}</div>}

            <button className="w-full h-12 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-bold shadow hover:bg-secondary-container transition-all disabled:opacity-50 cursor-pointer inline-flex items-center justify-center gap-2" disabled={submitting} type="submit">
              {submitting ? (
                <><span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>Generating report…</>
              ) : (
                <><span className="material-symbols-outlined text-[20px]">bolt</span>Generate report</>
              )}
            </button>
          </form>

          {downloadUrl && (
            <div className="mt-6 pt-5 border-t border-surface-container flex flex-col gap-3">
              <div className="font-body-sm text-body-sm text-on-surface-variant">Order reference: <strong className="text-on-surface">{orderId}</strong></div>
              <a
                className="w-full h-12 rounded-lg bg-primary text-white font-label-md text-label-md font-bold inline-flex items-center justify-center gap-2 hover:bg-primary-container transition-colors"
                href={downloadUrl}
                download={downloadFilename || `AuthorizeCheck-Report-${regNumber.trim().toUpperCase()}.pdf`}
              >
                <span className="material-symbols-outlined text-[20px]">download</span>Download PDF report
              </a>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}