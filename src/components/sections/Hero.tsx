import Image from "next/image";
import { hero, logos } from "@/content/site";
import { HeroIntro } from "../motion/HeroIntro";
import { ArrowIcon } from "../icons";

export function Hero() {
  const words = hero.headline.split(" ");

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[calc(100svh-var(--header-h)-2.25rem)] items-end overflow-hidden">
      <Image
        src={hero.image.src}
        alt=""
        fill
        sizes="100vw"
        fetchPriority="high"
        loading="eager"
        className="-z-20 scale-110 object-cover object-[50%_40%] grayscale contrast-125 brightness-[0.38]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_30%,transparent_0%,rgba(11,11,11,.55)_55%,#0b0b0b_100%),linear-gradient(to_top,#0b0b0b_8%,rgba(11,11,11,.35)_55%,rgba(11,11,11,.7))]"
      />

      {/* Rough "ink on skin" edge for the logo reveal. */}
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <filter id="ink-rough" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <HeroIntro className="relative mx-auto grid w-full max-w-[90rem] gap-10 px-4 pb-16 pt-14 md:px-8 md:pb-24 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="hero-fade eyebrow mb-6">{hero.label}</p>
          <h1 id="hero-title" aria-label={hero.headline} className="text-[clamp(3.6rem,13vw,12.5rem)] leading-[0.86]">
            {words.map((word, wi) => (
              <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap">
                {Array.from(word).map((ch, ci) => (
                  <span key={ci} className={`hero-char inline-block ${ch === "&" ? "text-blood-bright" : ""}`}>
                    {ch}
                  </span>
                ))}
                {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
              </span>
            ))}
          </h1>
          <p className="hero-fade mt-6 max-w-xl text-lg text-bone/85 md:text-xl">{hero.sub}</p>
          <div className="hero-fade mt-9 flex flex-wrap gap-3">
            <a href="#visit" className="btn btn-red">
              Walk In Today <ArrowIcon width={18} height={18} />
            </a>
            <a href="#portfolio" className="btn btn-ghost">
              See the Work
            </a>
          </div>
        </div>

        <div className="hero-logo-wrap order-first justify-self-start lg:order-none lg:justify-self-end">
          <Image
            src={logos.main.src}
            width={logos.main.w}
            height={logos.main.h}
            alt={logos.main.alt}
            preload
            sizes="(min-width: 1024px) 340px, 150px"
            className="hero-logo size-[150px] drop-shadow-[0_20px_50px_rgba(0,0,0,.6)] sm:size-[200px] lg:size-[340px]"
          />
        </div>
      </HeroIntro>
    </section>
  );
}
