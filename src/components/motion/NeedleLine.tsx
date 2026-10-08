"use client";

import { useEffect, useRef } from "react";
import { ANY_MOTION, gsap } from "@/lib/gsap";

/** Connector between steps that draws itself in as you scroll. */
export function NeedleLine() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const horizontal = matchMedia("(min-width: 1024px)").matches;
      gsap.fromTo(
        el,
        { [horizontal ? "scaleX" : "scaleY"]: 0 },
        {
          [horizontal ? "scaleX" : "scaleY"]: 1,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute bottom-0 left-[11px] top-0 w-[2px] origin-top bg-[repeating-linear-gradient(to_bottom,var(--color-blood-bright)_0_10px,transparent_10px_16px)]
        lg:bottom-auto lg:left-0 lg:right-0 lg:top-[11px] lg:h-[2px] lg:w-auto lg:origin-left lg:bg-[repeating-linear-gradient(to_right,var(--color-blood-bright)_0_10px,transparent_10px_16px)]"
    />
  );
}
