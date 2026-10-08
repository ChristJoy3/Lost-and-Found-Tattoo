"use client";

import { useEffect, useRef } from "react";
import { FULL_MOTION } from "@/lib/gsap";

const GLYPHS = "!@#$%&*+=?/<>01345789ABCDEFGHKMNPRSTVWXZ";

type Props = { text: string; label?: string; className?: string; as?: "span" | "p" | "div" };

/** Scrambles into `text` the first time it enters the viewport. */
export function Scramble({ text, label, className, as: Tag = "span" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia(FULL_MOTION).matches) return;

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const duration = 1100;
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const settled = Math.floor(p * text.length);
        let out = text.slice(0, settled);
        for (let i = settled; i < text.length; i++) {
          out += text[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        el.textContent = out;
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        run();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = text;
    };
  }, [text]);

  return (
    <Tag className={className}>
      <span className="sr-only">{label ?? text}</span>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </Tag>
  );
}
