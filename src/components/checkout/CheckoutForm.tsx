"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

const PLANS = [
  {
    id: "basic",
    label: "Basic Check — £49.99",
    name: "Basic Check",
    price: "£49.99",
    paymentUrl: "https://buy.stripe.com/bJe9ASant8WmexggdJgw001",
  },
  {
    id: "full",
    label: "Full Comprehensive — £54.99",
    name: "Full Comprehensive",
    price: "£54.99",
    paymentUrl: "https://buy.stripe.com/4gMbJ09jpb4u3SC2mTgw000",
  },
] as const;

type PlanId = (typeof PLANS)[number]["id"];

function resolvePlan(value: string | null): PlanId {
  if (value === "basic" || value === "full") return value;
  return "full";
}

export function CheckoutForm() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const planParam = resolvePlan(searchParams.get("plan"));
  const vrmParam = (searchParams.get("vrm") || "").toUpperCase().replace(/[^A-Z0-9 ]/g, "");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vrm, setVrm] = useState(() => {
    if (vrmParam) return vrmParam;
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem("vdg_reg_number") || "";
      } catch {
        return "";
      }
    }
    return "";
  });
  const [plan, setPlan] = useState<PlanId>(planParam);
  const [prevParams, setPrevParams] = useState({ plan: planParam, vrm: vrmParam });
  const [terms, setTerms] = useState({
    volition: false,
    delivery: false,
    policy: false,
  });
  const [submitting, setSubmitting] = useState(false);

  if (prevParams.plan !== planParam || prevParams.vrm !== vrmParam) {
    setPrevParams({ plan: planParam, vrm: vrmParam });
    setPlan(planParam);
    if (vrmParam) {
      setVrm(vrmParam);
    }
  }

  const selected = PLANS.find((item) => item.id === plan) ?? PLANS[1];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanVrm = vrm.trim().toUpperCase();
    if (!cleanVrm) {
      showToast("Please enter your Vehicle Registration Mark (VRM).", "error");
      return;
    }

    if (!terms.volition || !terms.delivery || !terms.policy) {
      showToast(
        "Please accept all terms and conditions before continuing.",
        "error",
      );
      return;
    }

    setSubmitting(true);

    try {
      // 1. Create order in database
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          regNumber: cleanVrm,
          planId: selected.id,
          planName: selected.name,
          price: selected.price,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        showToast(orderData.error || "Failed to initialize order.", "error");
        setSubmitting(false);
        return;
      }

      const orderId = orderData.orderId;

      // 2. Persist order details to localStorage for return fallback
      try {
        localStorage.setItem("vdg_order_id", orderId);
        localStorage.setItem("vdg_reg_number", cleanVrm);
        localStorage.setItem("vdg_customer_email", email.trim());
      } catch {
        // Continue if localStorage blocked
      }

      // 3. Asynchronously send email notification to checkauthorize@gmail.com
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          vrm: cleanVrm,
          planId: selected.id,
          planName: selected.name,
          price: selected.price,
          paymentUrl: selected.paymentUrl,
          terms,
        }),
      }).catch((err) => console.warn("Admin notification dispatch note:", err));

      showToast("Order initialized! Redirecting to secure payment…", "success");

      // 4. Redirect customer to payment URL with order ref appended
      const returnUrl = encodeURIComponent(
        `${window.location.origin}/thank-you?order=${encodeURIComponent(orderId)}`
      );
      const separator = selected.paymentUrl.includes("?") ? "&" : "?";
      const paymentRedirect = `${selected.paymentUrl}${separator}ref=${encodeURIComponent(orderId)}&redirect=${returnUrl}`;

      // Redirect to external payment provider checkout
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = paymentRedirect;
    } catch (err: unknown) {
      console.error("Order creation error:", err);
      showToast(
        "Unable to submit order. Please check your connection and try again.",
        "error",
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-surface-container-lowest rounded-xl p-space-lg sm:p-space-xl shadow-md flex flex-col gap-space-lg">
      <div className="flex items-start justify-between gap-space-md">
        <div>
          <span className="font-label-md text-label-md text-secondary uppercase font-bold tracking-wider">
            Secure Checkout
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mt-space-2xs tracking-tight">
            Complete Your Order
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
            Enter your details, confirm your vehicle check, and accept the
            purchase terms. Your report is emailed within 3–4 hours.
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-secondary text-[26px]">
            shopping_cart_checkout
          </span>
        </div>
      </div>

      <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-space-2xs">
          <label
            className="font-label-lg text-label-lg text-on-surface"
            htmlFor="checkout-name"
          >
            Full Name <span className="text-error">*</span>
          </label>
          <input
            className="h-11 px-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/50 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary font-body-md text-body-md transition-all shadow-inner"
            id="checkout-name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Richard Davenport"
            required
            type="text"
            value={name}
          />
        </div>

        <div className="flex flex-col gap-space-2xs">
          <label
            className="font-label-lg text-label-lg text-on-surface"
            htmlFor="checkout-email"
          >
            Email Address <span className="text-error">*</span>
          </label>
          <input
            className="h-11 px-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/50 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary font-body-md text-body-md transition-all shadow-inner"
            id="checkout-email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="richard@example.co.uk"
            required
            type="email"
            value={email}
          />
        </div>

        <div className="flex flex-col gap-space-2xs">
          <div className="flex items-center justify-between">
            <label
              className="font-label-lg text-label-lg text-on-surface"
              htmlFor="checkout-vrm"
            >
              Vehicle Registration Mark (VRM) <span className="text-error">*</span>
            </label>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              UK Number Plate
            </span>
          </div>
          <div className="relative flex items-center h-12 rounded-lg overflow-hidden bg-[#FFD200] shadow-sm border border-black/10">
            <div className="w-10 h-full bg-[#0035bd] flex flex-col items-center justify-center text-white px-1 select-none shrink-0">
              <span className="text-[10px] font-bold tracking-tighter leading-none">
                UK
              </span>
              <span className="material-symbols-outlined text-[16px] leading-none mt-1">
                directions_car
              </span>
            </div>
            <input
              className="w-full h-full bg-transparent px-space-sm text-center font-label-vrm text-label-vrm text-primary uppercase placeholder:text-primary/40 focus:outline-none tracking-wider font-extrabold"
              id="checkout-vrm"
              maxLength={8}
              name="vrm"
              onChange={(e) =>
                setVrm(e.target.value.toUpperCase().replace(/[^A-Z0-9 ]/g, ""))
              }
              placeholder="e.g. AB21 XYZ"
              required
              type="text"
              value={vrm}
            />
          </div>
        </div>

        <div className="flex flex-col gap-space-2xs">
          <label
            className="font-label-lg text-label-lg text-on-surface"
            htmlFor="checkout-price"
          >
            Package / Price <span className="text-error">*</span>
          </label>
          <div className="relative">
            <select
              className="w-full h-12 px-space-sm pr-10 rounded-lg bg-surface-container-low text-on-surface focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary font-body-md text-body-md appearance-none shadow-inner"
              id="checkout-price"
              name="price"
              onChange={(e) => setPlan(e.target.value as PlanId)}
              required
              value={plan}
            >
              {PLANS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              expand_more
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-space-sm pt-space-xs">
          <span className="font-label-lg text-label-lg text-on-surface">
            Terms &amp; Acknowledgements <span className="text-error">*</span>
          </span>

          <label className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
            <input
              checked={terms.volition}
              className="mt-1 w-4 h-4 accent-secondary shrink-0"
              onChange={(e) =>
                setTerms((prev) => ({ ...prev, volition: e.target.checked }))
              }
              required
              type="checkbox"
            />
            <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              We don&apos;t pressure any visitor to buy the product; you choose
              to buy it on your own volition.
            </span>
          </label>

          <label className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
            <input
              checked={terms.delivery}
              className="mt-1 w-4 h-4 accent-secondary shrink-0"
              onChange={(e) =>
                setTerms((prev) => ({ ...prev, delivery: e.target.checked }))
              }
              required
              type="checkbox"
            />
            <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              I am purchasing a vehicle check from AuthorizeCheck. The full
              report will be emailed within 3–4 hours using the provided
              payment method. I acknowledge that once the report is delivered,
              I am not eligible for a refund.
            </span>
          </label>

          <label className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
            <input
              checked={terms.policy}
              className="mt-1 w-4 h-4 accent-secondary shrink-0"
              onChange={(e) =>
                setTerms((prev) => ({ ...prev, policy: e.target.checked }))
              }
              required
              type="checkbox"
            />
            <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              I have read and accepted the{" "}
              <Link
                className="text-secondary underline hover:text-primary"
                href="/terms-and-conditions"
              >
                terms and conditions
              </Link>{" "}
              as well as the{" "}
              <Link
                className="text-secondary underline hover:text-primary"
                href="/privacy-policy"
              >
                privacy statement
              </Link>
              .
            </span>
          </label>
        </div>

        <div className="flex items-center justify-between gap-space-sm pt-space-2xs rounded-lg bg-surface-container-low px-space-md py-space-sm">
          <span className="font-body-md text-body-md text-on-surface-variant">
            Order total
          </span>
          <span className="font-headline-sm text-headline-sm text-on-surface">
            {selected.price}
          </span>
        </div>

        <button
          className="w-full h-12 inline-flex items-center justify-center gap-space-xs rounded-lg bg-secondary-container hover:bg-secondary text-on-secondary font-label-lg text-label-lg font-bold shadow-md hover:shadow-xl transition-all disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
          disabled={submitting}
          type="submit"
        >
          {submitting ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[20px]">
                progress_activity
              </span>
              <span>Submitting Order &amp; Redirecting…</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">
                payments
              </span>
              <span>Process to Payment</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
