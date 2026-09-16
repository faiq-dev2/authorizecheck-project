import type { Metadata } from "next";
import { PrivacyBackToTop } from "@/components/privacy/PrivacyBackToTop";
import { PrivacyHero } from "@/components/privacy/PrivacyHero";
import { PrivacySections } from "@/components/privacy/PrivacySections";
import { PrivacySidebar } from "@/components/privacy/PrivacySidebar";

export const metadata: Metadata = {
  title: "Privacy Policy — AuthorizeCheck",
  description:
    "AuthorizeCheck Privacy Policy covering UK GDPR, Data Protection Act 2018, data collection, cookies, security, retention, and DPO contact.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full pt-20 bg-background min-h-screen">
      <div className="flex flex-col w-full">
        <PrivacyHero />
        <div className="max-w-[1240px] mx-auto px-gutter-desktop py-space-2xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            <PrivacySidebar />
            <PrivacySections />
          </div>
        </div>
        <PrivacyBackToTop />
      </div>
    </main>
  );
}
