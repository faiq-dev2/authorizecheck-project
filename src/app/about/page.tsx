import type { Metadata } from "next";
import { AboutCta } from "@/components/about/AboutCta";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStats } from "@/components/about/AboutStats";
import { Engineering } from "@/components/about/Engineering";
import { Leadership } from "@/components/about/Leadership";
import { ProvenanceCrisis } from "@/components/about/ProvenanceCrisis";
import { RegistryMatrix } from "@/components/about/RegistryMatrix";

export const metadata: Metadata = {
  title: "About AuthorizeCheck — UK Vehicle Intelligence",
  description:
    "Learn how AuthorizeCheck delivers institutional UK vehicle history checks from DVLA, PNC, MIAFTR, and motor finance registers.",
};

export default function AboutPage() {
  return (
    <main className="w-full pt-20 bg-background min-h-screen">
      <div className="flex flex-col w-full">
        <AboutHero />
        <AboutStats />
        <ProvenanceCrisis />
        <RegistryMatrix />
        <Engineering />
        <Leadership />
        <AboutCta />
      </div>
    </main>
  );
}
