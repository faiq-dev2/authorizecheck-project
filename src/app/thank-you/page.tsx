"use client";

import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string>("");
  const [regNumber, setRegNumber] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [status, setStatus] = useState<"initializing" | "processing" | "completed" | "failed">("initializing");
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [progressMsg, setProgressMsg] = useState<string>("Verifying payment settlement…");

  const generationTriggered = useRef(false);

  // 1. Resolve Order ID and Reg Number from query params or localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      const qOrder =
        searchParams.get("order") ||
        searchParams.get("ref") ||
        searchParams.get("orderId");

      let resolvedId = qOrder || "";
      let resolvedReg = "";
      let resolvedEmail = "";

      if (typeof window !== "undefined") {
        try {
          if (!resolvedId) {
            resolvedId = localStorage.getItem("vdg_order_id") || "";
          }
          resolvedReg = localStorage.getItem("vdg_reg_number") || "";
          resolvedEmail = localStorage.getItem("vdg_customer_email") || "";
        } catch {
          // Continue if storage inaccessible
        }
      }

      setOrderId(resolvedId);
      if (resolvedReg) setRegNumber(resolvedReg);
      if (resolvedEmail) setCustomerEmail(resolvedEmail);

      if (!resolvedId) {
        setStatus("failed");
        setErrorMessage(
          "No order reference was detected. If you completed payment, please check your email or contact support with your payment receipt."
        );
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [searchParams]);

  // Trigger report generation API
  const triggerGeneration = useCallback(async (id: string) => {
    try {
      setStatus("processing");
      setProgressMsg("Connecting to 80+ vehicle intelligence databases…");

      const res = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: id }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        if (data.status === "completed" && data.pdfUrl) {
          setStatus("completed");
          setPdfUrl(data.pdfUrl);
          return;
        }
        throw new Error(data.error || "Generation request failed");
      }

      if (data.pdfUrl) {
        setPdfUrl(data.pdfUrl);
      }
    } catch (err: unknown) {
      console.warn("[ThankYou] Background generation notice:", err);
      // Let polling continue or update if final
    }
  }, []);

  // 2. Once orderId is resolved, trigger generation and poll status
  useEffect(() => {
    if (!orderId || generationTriggered.current) return;
    generationTriggered.current = true;

    // Start background generation
    triggerGeneration(orderId);

    // Dynamic progress message cycling
    const msgs = [
      "Auditing DVLA and Police National Computer registers…",
      "Analyzing MOT test history and mileage timeline…",
      "Scanning insurance write-off (Cat S/N/C/D) and finance records…",
      "Compiling 20-page institutional vehicle dossier…",
      "Dispatching report copy to your email address…",
    ];
    let msgIndex = 0;
    const msgInterval = setInterval(() => {
      msgIndex = (msgIndex + 1) % msgs.length;
      setProgressMsg(msgs[msgIndex]);
    }, 4500);

    // Poll order status every 2.5s
    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`/api/order-status?orderId=${encodeURIComponent(orderId)}`);
        if (!res.ok) return;

        const data = await res.json();
        if (data.regNumber) setRegNumber(data.regNumber);
        if (data.customerEmail) setCustomerEmail(data.customerEmail);

        if (data.status === "completed") {
          setStatus("completed");
          setPdfUrl(data.pdfUrl || `/api/download-report?orderId=${encodeURIComponent(orderId)}`);
          clearInterval(pollInterval);
          clearInterval(msgInterval);
        } else if (data.status === "failed") {
          setStatus("failed");
          setErrorMessage(data.errorMessage || "Report compilation was interrupted. Please retry below.");
          clearInterval(pollInterval);
          clearInterval(msgInterval);
        }
      } catch (e) {
        console.error("Polling error:", e);
      }
    }, 2500);

    return () => {
      clearInterval(pollInterval);
      clearInterval(msgInterval);
    };
  }, [orderId, triggerGeneration]);

  function handleRetry() {
    if (!orderId) return;
    setStatus("processing");
    triggerGeneration(orderId);
  }

  const downloadHref = pdfUrl || (orderId ? `/api/download-report?orderId=${encodeURIComponent(orderId)}` : "#");

  return (
    <main className="w-full min-h-screen pt-24 pb-space-3xl bg-background text-on-surface">
      <div className="max-w-[800px] mx-auto px-gutter-desktop">
        
        {/* State 1: Processing / Generating */}
        {(status === "initializing" || status === "processing") && (
          <div className="bg-surface-container-lowest rounded-2xl p-space-xl sm:p-space-2xl shadow-xl border border-surface-container flex flex-col items-center text-center gap-space-lg">
            
            {/* Radar diagnostic spinner */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-secondary/20 border-t-secondary animate-spin" />
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[32px] animate-pulse">
                  directions_car
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-space-2xs">
              <span className="font-label-md text-label-md text-secondary font-bold tracking-widest uppercase">
                Payment Received &bull; Processing Report
              </span>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Generating Your Vehicle Intelligence Report
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mt-1">
                Your payment was received. We are now running an 80+ point audit on vehicle{" "}
                <strong className="text-on-surface uppercase tracking-wider font-mono font-bold bg-[#ffd200] text-black px-2 py-0.5 rounded">
                  {regNumber || "YOUR VEHICLE"}
                </strong>
                .
              </p>
            </div>

            {/* Diagnostic Progress Box */}
            <div className="w-full max-w-md bg-surface-container-low rounded-xl p-space-md border border-surface-container flex items-center gap-space-sm text-left">
              <span className="material-symbols-outlined text-secondary animate-spin text-[22px] shrink-0">
                progress_activity
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                {progressMsg}
              </span>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant/80">
              This process typically takes 15–25 seconds. Please keep this tab open while your document compiles.
            </p>
          </div>
        )}

        {/* State 2: Completed */}
        {status === "completed" && (
          <div className="bg-surface-container-lowest rounded-2xl p-space-xl sm:p-space-2xl shadow-2xl border border-surface-container flex flex-col items-center text-center gap-space-lg">
            
            {/* Success check badge */}
            <div className="w-20 h-20 rounded-full bg-tertiary-container/15 flex items-center justify-center text-on-tertiary-container shadow-inner">
              <span className="material-symbols-outlined text-[44px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                check_circle
              </span>
            </div>

            <div className="flex flex-col gap-space-2xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-label-md text-label-md font-bold tracking-wider uppercase mb-2 mx-auto">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Payment Received &bull; Report Dispatched</span>
              </div>
              
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                Your Report is Ready!
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto mt-2 leading-relaxed">
                Your comprehensive 20-page vehicle intelligence dossier for registration{" "}
                <strong className="text-black bg-[#ffd200] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                  {regNumber}
                </strong>{" "}
                has been generated and emailed to{" "}
                <strong className="text-secondary underline">{customerEmail || "your email"}</strong>.
              </p>
            </div>

            {/* License plate visual representation */}
            <div className="inline-flex items-center h-14 bg-[#ffd200] border-2 border-black rounded-lg overflow-hidden shadow-md my-1">
              <div className="w-10 h-full bg-[#003399] flex flex-col items-center justify-center text-white px-1 select-none">
                <span className="text-[10px] font-bold tracking-tighter leading-none">UK</span>
                <span className="text-[12px] leading-none mt-1">🇬🇧</span>
              </div>
              <div className="px-6 font-label-vrm text-[24px] font-extrabold text-black tracking-widest font-mono">
                {regNumber}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-space-md w-full max-w-md pt-space-xs">
              <a
                className="w-full sm:flex-1 h-13 inline-flex items-center justify-center gap-space-xs rounded-xl bg-secondary-container hover:bg-secondary text-on-secondary font-label-lg text-label-lg font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer"
                download={`Vehicle-Report-${regNumber}.pdf`}
                href={downloadHref}
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-[22px]">
                  download
                </span>
                <span>Download Report PDF</span>
              </a>

              <Link
                className="w-full sm:w-auto px-6 h-13 inline-flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg font-semibold transition-colors"
                href="/"
              >
                Return Home
              </Link>
            </div>

            {/* Reassurance Info Card */}
            <div className="w-full max-w-xl bg-surface-container-low rounded-xl p-space-md border border-surface-container text-left flex flex-col gap-2 mt-space-sm text-on-surface-variant font-body-sm text-body-sm">
              <div className="flex items-center gap-2 text-on-surface font-semibold">
                <span className="material-symbols-outlined text-secondary text-[18px]">
                  mark_email_read
                </span>
                <span>Can&apos;t find the email?</span>
              </div>
              <p className="leading-relaxed">
                Check your Spam or Junk folder for an email with subject: <strong>&ldquo;Your Vehicle Report for [{regNumber}] is ready&rdquo;</strong>. You can also click the <strong>&ldquo;Download Report PDF&rdquo;</strong> button above anytime to view and save your document directly.
              </p>
            </div>

          </div>
        )}

        {/* State 3: Failed / Error */}
        {status === "failed" && (
          <div className="bg-surface-container-lowest rounded-2xl p-space-xl sm:p-space-2xl shadow-xl border border-error/20 flex flex-col items-center text-center gap-space-lg">
            <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">
                error_outline
              </span>
            </div>

            <div className="flex flex-col gap-space-2xs">
              <h1 className="font-headline-lg text-headline-lg text-on-surface">
                Report Generation Pending
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                {errorMessage || "We encountered a temporary delay connecting to the vehicle data provider."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-space-md">
              <button
                className="px-space-xl h-12 inline-flex items-center justify-center gap-space-xs rounded-lg bg-secondary text-on-secondary font-label-lg text-label-lg font-bold shadow-md hover:bg-secondary-container transition-all cursor-pointer"
                onClick={handleRetry}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">refresh</span>
                <span>Retry Generation</span>
              </button>

              <Link
                className="px-space-lg h-12 inline-flex items-center justify-center rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg font-semibold transition-colors"
                href="/contact"
              >
                Contact Support
              </Link>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen pt-28 flex justify-center bg-background">
          <div className="w-full max-w-xl h-96 rounded-xl bg-surface-container-low animate-pulse" />
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
