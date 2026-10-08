import { Cursor } from "@/components/motion/Cursor";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { About } from "@/components/sections/About";
import { Artists } from "@/components/sections/Artists";
import { Contact } from "@/components/sections/Contact";
import { CtaBand } from "@/components/sections/CtaBand";
import { Events } from "@/components/sections/Events";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Marquee } from "@/components/sections/Marquee";
import { MobileStickyCta } from "@/components/sections/MobileStickyCta";
import { Portfolio } from "@/components/sections/Portfolio";
import { TopBar } from "@/components/sections/TopBar";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhyUs } from "@/components/sections/WhyUs";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <RevealObserver />
      <Cursor />
      <TopBar />
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <TrustStrip />
        <About />
        <Artists />
        <HowItWorks />
        <Portfolio />
        <WhyUs />
        <Events />
        <Faq />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
