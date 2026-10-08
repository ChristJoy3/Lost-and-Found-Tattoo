"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { logos, nav, site } from "@/content/site";
import { lockScroll } from "@/lib/lenis";
import { CloseIcon, MenuIcon, PhoneIcon } from "../icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const toggle = toggleRef.current;
    const menu = menuRef.current;
    const focusables = () =>
      Array.from(menu?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = [toggle!, ...focusables()];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
      toggle?.focus();
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-gold/25 bg-ink/80 backdrop-blur-md" : "border-transparent bg-ink/40 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-[var(--header-h)] max-w-[90rem] items-center justify-between gap-6 px-4 md:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label={`${site.name}, back to top`}>
          <Image src={logos.main.src} width={52} height={52} alt="" className="size-12 md:size-[3.25rem]" />
          <span className="hidden font-display text-xl uppercase leading-none tracking-wide sm:block">
            Lost &amp; Found
            <span className="block text-[0.62rem] font-sans font-semibold tracking-[0.32em] text-gold">Tattoo Co.</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.8rem] font-semibold uppercase tracking-[0.18em]">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="relative py-2 text-bone/85 transition-colors hover:text-bone after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-blood-bright after:transition-transform after:duration-300 hover:after:scale-x-100">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={site.phoneHref} className="btn btn-red !hidden !min-h-11 !px-4 sm:!inline-flex">
            <PhoneIcon width={16} height={16} />
            Call {site.phone}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-11 place-items-center border border-bone/30 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-ink px-6 pb-10 pt-8 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.href} className="border-b border-gold/20">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-5 font-display text-5xl uppercase"
                >
                  {item.label}
                  <span className="font-sans text-xs tracking-[0.3em] text-gold">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={site.phoneHref} className="btn btn-red mt-8 w-full">
          <PhoneIcon width={18} height={18} /> Call {site.phone}
        </a>
        <p className="mt-6 text-sm text-bone-dim">{site.hours} • Walk-ins welcome • Cash only</p>
      </div>
    </header>
  );
}
