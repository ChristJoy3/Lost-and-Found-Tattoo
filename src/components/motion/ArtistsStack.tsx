"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

// Matches the .stack-panel sticky media query in globals.css.
const STACK = "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";

/** As each sticky panel is covered by the next, push it back into the dark. */
export function ArtistsStack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add(STACK, () => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", root);
      panels.slice(0, -1).forEach((panel, i) => {
        gsap.to(panel.querySelector(".panel-inner"), {
          scale: 0.92,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: panels[i + 1],
            start: "top bottom",
            end: "top top+=72",
            scrub: true,
          },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
