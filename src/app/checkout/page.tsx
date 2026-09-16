import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout — AuthorizeCheck",
  description:
    "Complete your AuthorizeCheck vehicle inspection order and proceed to secure payment.",
};

export default function CheckoutPage() {
  return (
    <main className="w-full pt-20 bg-background min-h-screen">
      <section className="w-full py-space-2xl md:py-space-3xl">
        <div className="max-w-[1240px] mx-auto px-gutter-desktop">
          <Suspense
            fallback={
              <div className="w-full max-w-xl mx-auto h-96 rounded-xl bg-surface-container-low animate-pulse" />
            }
          >
            <CheckoutForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
