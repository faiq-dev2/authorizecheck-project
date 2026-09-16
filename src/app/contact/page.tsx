import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactInquiryForm } from "@/components/contact/ContactInquiryForm";
import { ContactSidebar } from "@/components/contact/ContactSidebar";
import { ContactStatusBar } from "@/components/contact/ContactStatusBar";
import { ContactTrust } from "@/components/contact/ContactTrust";

export const metadata: Metadata = {
  title: "Contact AuthorizeCheck Support",
  description:
    "Get in touch with AuthorizeCheck support for vehicle audit questions, registration issues, billing, and fleet underwriting.",
};

export default function ContactPage() {
  return (
    <main className="w-full pt-20 bg-background min-h-screen">
      <div className="flex flex-col w-full">
        <ContactStatusBar />
        <ContactHero />
        <section className="w-full py-space-3xl">
          <div className="max-w-[1240px] mx-auto px-gutter-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
              <ContactInquiryForm />
              <ContactSidebar />
            </div>
          </div>
        </section>
        <ContactTrust />
      </div>
    </main>
  );
}
