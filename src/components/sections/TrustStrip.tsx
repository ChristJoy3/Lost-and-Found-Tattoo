import type { CSSProperties } from "react";
import { trust } from "@/content/site";
import { ClockIcon, DoorIcon, NeedleIcon, ShieldIcon } from "../icons";

const icons = { clock: ClockIcon, door: DoorIcon, needle: NeedleIcon, shield: ShieldIcon };

export function TrustStrip() {
  return (
    <section aria-label="Why walk in" className="border-b border-gold/25 bg-panel">
      <ul className="mx-auto grid max-w-[90rem] grid-cols-2 lg:grid-cols-4">
        {trust.map((item, i) => {
          const Icon = icons[item.icon];
          return (
            <li
              key={item.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 0.08}s` } as CSSProperties}
              className="flex flex-col gap-4 border-gold/20 px-5 py-8 md:flex-row md:items-center md:px-8 md:py-10 [&:not(:last-child)]:border-r max-lg:[&:nth-child(2)]:border-r-0 max-lg:[&:nth-child(-n+2)]:border-b"
            >
              <span className="grid size-12 shrink-0 place-items-center border border-blood-bright/70 text-blood-text">
                <Icon />
              </span>
              <span>
                <span className="block font-display text-xl uppercase leading-tight md:text-2xl">{item.title}</span>
                <span className="mt-1 block text-sm text-bone-dim">{item.text}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
