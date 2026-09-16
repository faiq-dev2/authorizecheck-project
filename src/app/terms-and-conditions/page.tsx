import type { Metadata } from "next";
import { TermsHero } from "@/components/terms/TermsHero";
import { TermsSections } from "@/components/terms/TermsSections";
import { TermsSidebar } from "@/components/terms/TermsSidebar";

export const metadata: Metadata = {
  title: "Terms & Conditions — AuthorizeCheck",
  description:
    "AuthorizeCheck Terms & Conditions covering vehicle history checks, payment, £40,000 data indemnity guarantee, and UK consumer rights.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="w-full pt-20 bg-background min-h-screen">
      <div className="flex flex-col w-full">
        <TermsHero />
        <div className="w-full max-w-[1240px] mx-auto px-gutter-desktop pb-space-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            <TermsSidebar />
            <TermsSections />
          </div>
        </div>
      </div>
    </main>
  );
}
