"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ANY_MOTION, gsap } from "@/lib/gsap";

/** Logo bleeds in like ink, then the headline slams in letter by letter. */
export function HeroIntro({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !matchMedia(ANY_MOTION).matches) return;

    const ctx = gsap.context(() => {
      const displace = document.querySelector("#ink-rough feDisplacementMap");
      const ink = { r: 0, d: 70 };
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      gsap.set(".hero-fade", { opacity: 0, y: 24 });

      tl.to(ink, {
        r: 75,
        d: 0,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          gsap.set(".hero-logo", { clipPath: `circle(${ink.r}% at 50% 50%)` });
          displace?.setAttribute("scale", String(ink.d));
        },
        onComplete: () => {
          gsap.set(".hero-logo-wrap", { filter: "none" });
          gsap.set(".hero-logo", { clipPath: "none" });
        },
      })
        .fromTo(
          ".hero-char",
          { opacity: 0, yPercent: -60, scale: 2.2, rotate: () => gsap.utils.random(-8, 8) },
          { opacity: 1, yPercent: 0, scale: 1, rotate: 0, duration: 0.55, stagger: 0.04, ease: "back.out(2.2)" },
          "-=0.75",
        )
        .to(".hero-fade", { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, "-=0.3");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
