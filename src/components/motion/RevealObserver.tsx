"use client";

import { useEffect } from "react";

/**
 * Adds `.is-in` to [data-reveal], .needle and .ink-color elements the first
 * time they enter the viewport. CSS owns the actual transitions.
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );

    const observeAll = () =>
      document
        .querySelectorAll("[data-reveal]:not(.is-in), .needle:not(.is-in), .ink-color:not(.is-in)")
        .forEach((el) => io.observe(el));
    observeAll();

    // Portfolio filtering adds new nodes.
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
