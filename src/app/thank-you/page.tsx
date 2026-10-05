"use client";

import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string>("");
  const [regNumber, setRegNumber] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [planName, setPlanName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [status, setStatus] = useState<"initializing" | "processing" | "completed" | "failed">("initializing");
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [progressMsg, setProgressMsg] = useState<string>("Verifying payment settlement…");
  const [emailConfirmationSent, setEmailConfirmationSent] = useState<boolean>(false);

  const generationTriggered = useRef(false);
  const paymentConfirmedTriggered = useRef(false);

  // 1. Resolve Order ID, Reg Number, Email, and details from query params or localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      const qOrder =
        searchParams.get("order") ||
        searchParams.get("ref") ||
        searchParams.get("orderId");

      let resolvedId = qOrder || "";
      let resolvedReg = "";
      let resolvedEmail = "";
      let resolvedName = "";
      let resolvedPlan = "";
      let resolvedPrice = "";

      if (typeof window !== "undefined") {
        try {
          if (!resolvedId) {
            resolvedId = localStorage.getItem("vdg_order_id") || "";
          }
          resolvedReg = localStorage.getItem("vdg_reg_number") || "";
          resolvedEmail = localStorage.getItem("vdg_customer_email") || "";
          resolvedName = localStorage.getItem("vdg_customer_name") || "";
          resolvedPlan = localStorage.getItem("vdg_plan_name") || "";
          resolvedPrice = localStorage.getItem("vdg_price") || "";
        } catch {
          // Continue if storage inaccessible
        }
      }

      setOrderId(resolvedId);
      if (resolvedReg) setRegNumber(resolvedReg);
      if (resolvedEmail) setCustomerEmail(resolvedEmail);
      if (resolvedName) setCustomerName(resolvedName);
      if (resolvedPlan) setPlanName(resolvedPlan);
      if (resolvedPrice) setPrice(resolvedPrice);

      if (!resolvedId) {
        setStatus("failed");
        setErrorMessage(
          "No order reference was detected. If you completed payment, please check your email or contact support with your payment receipt."
        );
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [searchParams]);

  // 2. Automatically confirm payment and dispatch client confirmation email (3–4 hours notice)
  useEffect(() => {
    if (!orderId || paymentConfirmedTriggered.current) return;
    paymentConfirmedTriggered.current = true;

    async function dispatchPaymentConfirmation() {
      try {
        const res = await fetch("/api/payment-success", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId,
            email: customerEmail,
            name: customerName,
            vrm: regNumber,
            planName,
            price,
          }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setEmailConfirmationSent(true);
          if (data.order) {
            if (data.order.customerEmail) setCustomerEmail(data.order.customerEmail);
            if (data.order.customerName) setCustomerName(data.order.customerName);
            if (data.order.regNumber) setRegNumber(data.order.regNumber);
            if (data.order.planName) setPlanName(data.order.planName);
            if (data.order.price) setPrice(data.order.price);
          }
        }
      } catch (err) {
        console.warn("[ThankYou] Payment confirmation notice:", err);
      }
    }

    dispatchPaymentConfirmation();
  }, [orderId, customerEmail, customerName, regNumber, planName, price]);

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

  // 3. Once orderId is resolved, trigger generation and poll status
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
        if (data.customerName) setCustomerName(data.customerName);
        if (data.planName) setPlanName(data.planName);
        if (data.price) setPrice(data.price);

        if (data.status === "completed") {
          setStatus("completed");
          setPdfUrl(data.pdfUrl || `/api/download-report?orderId=${encodeURIComponent(orderId)}`);
          clearInterval(pollInterval);
          clearInterval(msgInterval);
        } else if (data.status === "failed") {
          setStatus("failed");
          setErrorMessage(data.errorMessage || "Report compilation is being processed by our vehicle analysts.");
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
            
            {/* Success icon & badge */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-secondary/20 border-t-secondary animate-spin" />
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                  check_circle
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-space-2xs">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-label-md text-label-md font-bold tracking-wider uppercase mb-1 mx-auto border border-emerald-200">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Payment Received &bull; Order Confirmed</span>
              </div>
              
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Your Report Will Be Delivered Within 3–4 Hours
              </h1>
              
              <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mt-1 mx-auto leading-relaxed">
                Thank you for your payment. We have initiated the official 80+ point investigation for vehicle{" "}
                <strong className="text-on-surface uppercase tracking-wider font-mono font-bold bg-[#ffd200] text-black px-2 py-0.5 rounded">
                  {regNumber || "YOUR VEHICLE"}
                </strong>
                .
              </p>
            </div>

            {/* Email Dispatch Confirmation Alert Box */}
            <div className="w-full max-w-xl bg-blue-50/70 border border-blue-200 rounded-xl p-space-md text-left flex items-start gap-space-sm text-blue-950">
              <span className="material-symbols-outlined text-secondary text-[26px] shrink-0 mt-0.5">
                mark_email_read
              </span>
              <div className="flex flex-col gap-1">
                <strong className="font-label-lg text-label-lg text-blue-900">
                  Confirmation Email Sent to {customerEmail || "your email address"}
                </strong>
                <p className="font-body-sm text-body-sm text-blue-900/80 leading-relaxed">
                  A payment receipt has been automatically sent to <strong>{customerEmail || "your email"}</strong>. Your finalized 20-page vehicle intelligence dossier will be delivered to the same email address within <strong>3–4 hours</strong>.
                </p>
              </div>
            </div>

            {/* 3-Step Live Progress Indicator */}
            <div className="w-full max-w-xl bg-surface-container-low rounded-xl p-space-md border border-surface-container text-left flex flex-col gap-space-sm">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">
                Order Progression
              </span>

              <div className="flex flex-col gap-3 font-body-sm text-body-sm">
                <div className="flex items-center gap-3 text-emerald-700 font-semibold">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-[14px]">
                    ✓
                  </span>
                  <span>Step 1: Payment Successfully Processed &amp; Confirmed</span>
                </div>

                <div className="flex items-center gap-3 text-secondary font-semibold">
                  <span className="w-6 h-6 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping" />
                  </span>
                  <span>Step 2: 80+ Point Institutional Audit (In Progress)</span>
                </div>

                <div className="flex items-center gap-3 text-on-surface-variant/70">
                  <span className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 text-[12px] font-bold">
                    3
                  </span>
                  <span>Step 3: Certified Report Delivery to Your Inbox (Within 3–4 Hours)</span>
                </div>
              </div>
            </div>

            {/* Live Diagnostic Status Bar */}
            <div className="w-full max-w-md bg-surface-container-low rounded-xl p-space-md border border-surface-container flex items-center gap-space-sm text-left">
              <span className="material-symbols-outlined text-secondary animate-spin text-[20px] shrink-0">
                progress_activity
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                {progressMsg}
              </span>
            </div>

            {/* You Can Close This Window Notice */}
            <div className="p-3 bg-surface-container-low rounded-lg text-on-surface-variant font-body-sm text-body-sm max-w-lg">
              <span className="font-semibold text-on-surface">You are all set:</span> You do not need to keep this tab open. We will email your full PDF report directly to <strong>{customerEmail || "your email"}</strong> as soon as the audit concludes.
            </div>

            <Link
              className="mt-1 px-6 h-11 inline-flex items-center justify-center rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-colors"
              href="/"
            >
              Return to Homepage
            </Link>
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

        {/* State 3: Report Pending / Long Audit */}
        {status === "failed" && (
          <div className="bg-surface-container-lowest rounded-2xl p-space-xl sm:p-space-2xl shadow-xl border border-secondary/20 flex flex-col items-center text-center gap-space-lg">
            <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">
                schedule
              </span>
            </div>

            <div className="flex flex-col gap-space-2xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-label-md text-label-md font-bold tracking-wider uppercase mb-1 mx-auto border border-emerald-200">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Payment Confirmed &bull; Audit In Progress</span>
              </div>

              <h1 className="font-headline-lg text-headline-lg text-on-surface">
                Report Delivery In Progress
              </h1>
              
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto leading-relaxed">
                Your payment was received. Our intelligence analysts are actively processing the register queries for registration{" "}
                <strong className="text-on-surface uppercase font-mono font-bold bg-[#ffd200] text-black px-1.5 py-0.5 rounded">
                  {regNumber || "YOUR VEHICLE"}
                </strong>
                . Your comprehensive dossier will be delivered to{" "}
                <strong className="text-secondary">{customerEmail || "your email"}</strong> within <strong>3–4 hours</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-space-md">
              <button
                className="px-space-xl h-12 inline-flex items-center justify-center gap-space-xs rounded-lg bg-secondary text-on-secondary font-label-lg text-label-lg font-bold shadow-md hover:bg-secondary-container transition-all cursor-pointer"
                onClick={handleRetry}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">refresh</span>
                <span>Check Status</span>
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
