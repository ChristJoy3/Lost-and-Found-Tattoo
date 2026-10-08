"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { PhoneIcon, PinIcon } from "../icons";

/** Fixed Walk In / Call bar on small screens; hides over the CTA band and footer. */
export function MobileStickyCta() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = ["#cta", "#visit", "#footer"].map((s) => document.querySelector(s)).filter(Boolean) as Element[];
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setHidden(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-gold/30 bg-ink/90 p-2 backdrop-blur-md transition-transform duration-300 md:hidden ${
        hidden ? "translate-y-full" : ""
      }`}
      inert={hidden}
    >
      <a href="#visit" className="btn btn-ghost !min-h-12 !border-0">
        <PinIcon width={18} height={18} /> Walk In
      </a>
      <a href={site.phoneHref} className="btn btn-red !min-h-12">
        <PhoneIcon width={18} height={18} /> Call
      </a>
    </div>
  );
}
