"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Full motion: pinning, scramble, velocity marquee, cursor.
export const FULL_MOTION = "(prefers-reduced-motion: no-preference) and (min-width: 768px)";
export const ANY_MOTION = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger };
