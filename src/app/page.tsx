import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Newsletter } from "@/components/home/Newsletter";
import { Pricing } from "@/components/home/Pricing";
import { Reviews } from "@/components/home/Reviews";
import { SimpleSteps } from "@/components/home/SimpleSteps";
import { StrategicBenefits } from "@/components/home/StrategicBenefits";
import { WhatWeCheck } from "@/components/home/WhatWeCheck";
import { WhyBuyers } from "@/components/home/WhyBuyers";
import { WhyChoose } from "@/components/home/WhyChoose";
import { WhySellers } from "@/components/home/WhySellers";

export default function Home() {
  return (
    <main className="w-full pt-20 bg-background min-h-screen">
      <div className="flex flex-col w-full">
        <Hero />
        <WhatWeCheck />
        <WhyBuyers />
        <WhySellers />
        <StrategicBenefits />
        <SimpleSteps />
        <WhyChoose />
        <Pricing />
        <Faq />
        <Reviews />
        <Newsletter />
      </div>
    </main>
  );
}
