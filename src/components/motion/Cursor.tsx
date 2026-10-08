"use client";

import { useEffect, useRef } from "react";
import { FULL_MOTION, gsap } from "@/lib/gsap";

/** Small red dot that grows into a "VIEW" ring over [data-cursor="view"]. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia(`${FULL_MOTION} and (pointer: fine)`).matches) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");
    const x = gsap.quickTo(el, "x", { duration: 0.18, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.18, ease: "power3" });

    const move = (e: PointerEvent) => {
      el.style.opacity = "1";
      x(e.clientX);
      y(e.clientY);
      const view = (e.target as Element | null)?.closest?.('[data-cursor="view"]');
      el.dataset.mode = view ? "view" : "dot";
    };
    const leave = () => (el.style.opacity = "0");

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-mode="dot"
      className="group pointer-events-none fixed left-0 top-0 z-[90] opacity-0 transition-opacity"
    >
      <div
        className="flex size-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blood-bright transition-all duration-300 ease-[var(--ease-ink)]
          group-data-[mode=view]:size-24 group-data-[mode=view]:border group-data-[mode=view]:border-bone group-data-[mode=view]:bg-blood/30 group-data-[mode=view]:backdrop-blur-[2px]"
      >
        <span className="text-[0.7rem] font-bold tracking-[0.3em] text-bone opacity-0 transition-opacity group-data-[mode=view]:opacity-100">
          VIEW
        </span>
      </div>
    </div>
  );
}
