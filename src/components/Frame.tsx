import type { ReactNode } from "react";
import { Ornament } from "./icons";

/** Flash-sheet frame with gold corner ornaments. */
export function Frame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flash-frame ${className}`}>
      <Ornament className="orn orn-tl" />
      <Ornament className="orn orn-tr" />
      <Ornament className="orn orn-bl" />
      <Ornament className="orn orn-br" />
      {children}
    </div>
  );
}

/** Section eyebrow + heading with the needle underline. */
export function SectionHeading({
  eyebrow,
  children,
  id,
  className = "",
  dark = false,
}: {
  eyebrow?: string;
  children: ReactNode;
  id?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className={`eyebrow mb-5 ${dark ? "!text-ink" : ""}`} data-reveal>
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-[clamp(2.75rem,7vw,6.5rem)]">
        <span className="needle">{children}</span>
      </h2>
    </div>
  );
}
