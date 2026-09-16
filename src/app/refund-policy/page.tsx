import type { Metadata } from "next";
import { RefundClaimForm } from "@/components/refund/RefundClaimForm";
import { RefundHero } from "@/components/refund/RefundHero";
import { RefundSections } from "@/components/refund/RefundSections";
import { RefundSidebar } from "@/components/refund/RefundSidebar";

export const metadata: Metadata = {
  title: "Refund Policy & Guarantee — AuthorizeCheck",
  description:
    "AuthorizeCheck refund policy covering eligibility, exclusions, timelines, payment method refunds, and how to submit a refund claim.",
};

export default function RefundPolicyPage() {
  return (
    <main className="w-full pt-20 bg-background min-h-screen">
      <div className="flex flex-col w-full">
        <RefundHero />
        <div className="max-w-[1240px] w-full mx-auto px-gutter-desktop py-space-2xl md:py-space-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
            <RefundSidebar />
            <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-space-2xl">
              <RefundSections />
              <RefundClaimForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
