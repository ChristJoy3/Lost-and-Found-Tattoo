import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square" as const,
  "aria-hidden": true,
  ...p,
});

export const ClockIcon = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const DoorIcon = (p: P) => (
  <svg {...base(p)}><path d="M5 21V3h11v18M3 21h18M13 12h.01" /><path d="M16 5h3v16" /></svg>
);
export const NeedleIcon = (p: P) => (
  <svg {...base(p)}><path d="M3 21l7-7M10 14l2 2 7-7-2-2-7 7zM15 5l4 4M17 3l4 4" /></svg>
);
export const ShieldIcon = (p: P) => (
  <svg {...base(p)}><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3z" /><path d="M8.5 12l2.5 2.5L15.5 10" /></svg>
);
export const PhoneIcon = (p: P) => (
  <svg {...base(p)}><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" /></svg>
);
export const PinIcon = (p: P) => (
  <svg {...base(p)}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const MailIcon = (p: P) => (
  <svg {...base(p)}><path d="M3 5h18v14H3z" /><path d="M3 6l9 7 9-7" /></svg>
);
export const CashIcon = (p: P) => (
  <svg {...base(p)}><path d="M2 6h20v12H2z" /><circle cx="12" cy="12" r="3" /><path d="M6 9v.01M18 15v.01" /></svg>
);
export const ArrowIcon = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const CheckIcon = (p: P) => (
  <svg {...base({ strokeWidth: 3, ...p })}><path d="M4 12.5l5 5L20 6.5" /></svg>
);
export const PlusIcon = (p: P) => (
  <svg {...base(p)}><path d="M12 4v16M4 12h16" /></svg>
);
export const CloseIcon = (p: P) => (
  <svg {...base(p)}><path d="M5 5l14 14M19 5L5 19" /></svg>
);
export const ChevronIcon = (p: P) => (
  <svg {...base(p)}><path d="M15 5l-7 7 7 7" /></svg>
);
export const MenuIcon = (p: P) => (
  <svg {...base(p)}><path d="M3 7h18M3 12h18M3 17h18" /></svg>
);

const solid = (p: P) => ({ width: 20, height: 20, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, ...p });

export const FacebookIcon = (p: P) => (
  <svg {...solid(p)}><path d="M14 8V6.2c0-.8.2-1.2 1.4-1.2H17V2h-2.7C11.2 2 10 3.5 10 6v2H8v3h2v11h4V11h2.7L17 8h-3z" /></svg>
);
export const InstagramIcon = (p: P) => (
  <svg {...solid(p)}><path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM21.9 7c-.1-1.6-.4-3-1.6-4.2S17.6 1.2 16 1.1C14.4 1 9.6 1 8 1.1 6.4 1.2 5 1.5 3.8 2.7S2.2 5.4 2.1 7C2 8.6 2 15.4 2.1 17c.1 1.6.4 3 1.6 4.2s2.6 1.5 4.2 1.6c1.6.1 6.4.1 8 0 1.6-.1 3-.4 4.2-1.6s1.5-2.6 1.6-4.2c.1-1.6.1-8.4 0-10zm-2.1 12c-.3.9-1 1.5-1.9 1.9-1.3.5-4.4.4-5.9.4s-4.6.1-5.9-.4a3.3 3.3 0 0 1-1.9-1.9c-.5-1.3-.4-4.4-.4-5.9s-.1-4.6.4-5.9c.3-.9 1-1.5 1.9-1.9C7.4 4.8 10.5 4.9 12 4.9s4.6-.1 5.9.4c.9.3 1.5 1 1.9 1.9.5 1.3.4 4.4.4 5.9s.1 4.6-.4 5.9z" /></svg>
);
export const TwitterIcon = (p: P) => (
  <svg {...solid(p)}><path d="M17.8 2.5h3.3l-7.2 8.2 8.5 10.8h-6.6l-5.2-6.6-5.9 6.6H1.4l7.7-8.8L1 2.5h6.8l4.7 6 5.3-6zm-1.2 17.1h1.8L7.1 4.3H5.1l11.5 15.3z" /></svg>
);

/** Small flash-sheet corner flourish (top-left orientation). */
export const Ornament = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M1 19V1h18" />
    <path d="M4 16V4h12" opacity=".6" />
    <path d="M1 1l5 5" />
    <rect x="5" y="5" width="3" height="3" transform="rotate(45 6.5 6.5)" fill="currentColor" stroke="none" />
  </svg>
);
