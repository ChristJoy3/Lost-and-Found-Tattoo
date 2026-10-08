import Image from "next/image";
import { about, site } from "@/content/site";
import { Frame, SectionHeading } from "../Frame";

export function About() {
  const [main, sign] = about.images;
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-[90rem] px-4 py-24 md:px-8 md:py-36">
      <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
        <div className="relative pb-16 sm:pb-20" data-reveal>
          <Frame className="ink-color w-[88%] overflow-hidden">
            <div className="overflow-hidden">
              <Image src={main.src} width={main.w} height={main.h} alt={main.alt} sizes="(min-width: 1024px) 45vw, 88vw" className="h-auto w-full" />
            </div>
          </Frame>
          <Frame className="ink-color absolute bottom-0 right-0 w-[58%] max-w-sm overflow-hidden">
            <div className="overflow-hidden">
              <Image src={sign.src} width={sign.w} height={sign.h} alt={sign.alt} sizes="(min-width: 1024px) 24rem, 58vw" className="h-auto w-full" />
            </div>
          </Frame>
        </div>

        <div>
          <SectionHeading eyebrow="About the shop" id="about-title">
            {about.heading}
          </SectionHeading>
          <hr className="gold-rule my-10 max-w-md" />
          <p data-reveal className="max-w-xl text-lg leading-relaxed text-bone/85 md:text-xl">
            {about.body}
          </p>
          <dl data-reveal className="mt-12 grid max-w-xl grid-cols-2 gap-px bg-gold/25">
            {[
              ["Opened", site.established],
              ["Hours", "7 days • 1–7pm"],
              ["Walk-ins", "Welcome"],
              ["Payment", "Cash only"],
            ].map(([k, v]) => (
              <div key={k} className="bg-ink p-5">
                <dt className="eyebrow !text-[0.68rem]">{k}</dt>
                <dd className="mt-2 font-display text-2xl uppercase">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
