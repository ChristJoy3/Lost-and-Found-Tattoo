"use client";

import type { ReactNode } from "react";
import type { FilterKey } from "@/content/site";
import { scrollToTarget } from "@/lib/lenis";

export const FILTER_EVENT = "portfolio:filter";

/** Filters the portfolio to one artist and scrolls to it. */
export function FilterButton({ filter, className, children }: { filter: FilterKey; className?: string; children: ReactNode }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        window.dispatchEvent(new CustomEvent<FilterKey>(FILTER_EVENT, { detail: filter }));
        // Filtering changes the page height; scroll once the new grid has laid out.
        requestAnimationFrame(() => requestAnimationFrame(() => scrollToTarget("#portfolio")));
      }}
    >
      {children}
    </button>
  );
}
