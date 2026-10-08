"use client";

import { useEffect, useRef } from "react";
import { marquee } from "@/content/site";
import { FULL_MOTION, gsap, ScrollTrigger } from "@/lib/gsap";

function Line() {
  return (
    <span className="marquee-text pr-[0.35em]">
      {marquee.split("✦").map((part, i, arr) => (
        <span key={i}>
          {part}
          {i < arr.length - 1 && <span className="star">✦</span>}
        </span>
      ))}
    </span>
  );
}

/** Giant outlined band whose speed and direction follow scroll velocity. */
export function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || !matchMedia(FULL_MOTION).matches) return;

    const tween = gsap.to(el, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
    let dir = 1;
    const st = ScrollTrigger.create({
      onUpdate(self) {
        const v = self.getVelocity();
        if (self.direction !== dir) dir = self.direction;
        const boost = 1 + Math.min(Math.abs(v) / 250, 8);
        gsap.to(tween, { timeScale: dir * boost, duration: 0.2, overwrite: true });
        gsap.to(tween, { timeScale: dir, duration: 1.2, delay: 0.2, ease: "power2.out", overwrite: false });
      },
    });

    return () => {
      st.kill();
      tween.kill();
      gsap.set(el, { clearProps: "transform" });
    };
  }, []);

  return (
    <div aria-hidden="true" className="relative overflow-hidden border-y border-gold/25 bg-ink py-6 md:py-8">
      <div ref={track} className="flex w-max">
        <Line />
        <Line />
      </div>
    </div>
  );
}
