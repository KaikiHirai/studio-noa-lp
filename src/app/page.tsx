import { Hero } from "@/components/sections/Hero";
import { Empathy } from "@/components/sections/Empathy";
import { Reasons } from "@/components/sections/Reasons";
import { Voices } from "@/components/sections/Voices";
import { Trainers } from "@/components/sections/Trainers";
import { Pricing } from "@/components/sections/Pricing";
import { Flow } from "@/components/sections/Flow";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { StickyCta } from "@/components/StickyCta";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        {/* FVの終端。SP追従CTAはこの位置を通過したら出現する */}
        <div id="hero-sentinel" aria-hidden="true" className="h-0" />
        <Empathy />
        <Reasons />
        <Voices />
        <Trainers />
        <Pricing />
        <Flow />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
