"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { artists, portfolio, portfolioFilters, type FilterKey } from "@/content/site";
import { ScrollTrigger } from "@/lib/gsap";
import { FILTER_EVENT } from "../FilterButton";
import { Lightbox } from "../Lightbox";

const james = artists.find((a) => a.key === "james")!;

export function Portfolio() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const items = useMemo(
    () => (filter === "all" ? portfolio : portfolio.filter((p) => p.artist === filter)),
    [filter],
  );

  useEffect(() => {
    const onFilter = (e: Event) => setFilter((e as CustomEvent<FilterKey>).detail);
    window.addEventListener(FILTER_EVENT, onFilter);
    return () => window.removeEventListener(FILTER_EVENT, onFilter);
  }, []);

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = portfolioFilters.length;
    const next =
      e.key === "ArrowRight" ? (i + 1) % n
      : e.key === "ArrowLeft" ? (i - 1 + n) % n
      : e.key === "Home" ? 0
      : e.key === "End" ? n - 1
      : null;
    if (next === null) return;
    e.preventDefault();
    setFilter(portfolioFilters[next].key);
    tabs.current[next]?.focus();
  };

  // Grid height changes with the filter; keep scroll-linked animations in sync.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [filter]);

  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="border-t border-gold/25 bg-ink">
      <div className="mx-auto max-w-[90rem] px-4 py-24 md:px-8 md:py-36">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-5" data-reveal>Portfolio</p>
            <h2 id="portfolio-title" className="text-[clamp(2.75rem,7vw,6.5rem)]">
              <span className="needle">See the work.</span>
            </h2>
          </div>

          <div role="tablist" aria-label="Filter by artist" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:px-0">
            {portfolioFilters.map((f, i) => {
              const selected = f.key === filter;
              return (
                <button
                  key={f.key}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${f.key}`}
                  aria-selected={selected}
                  aria-controls="portfolio-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setFilter(f.key)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`shrink-0 border px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
                    selected ? "border-blood bg-blood text-bone" : "border-bone/30 text-bone/80 hover:border-bone hover:text-bone"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        <div id="portfolio-panel" role="tabpanel" aria-labelledby={`tab-${filter}`} tabIndex={-1} className="mt-14">
          {items.length ? (
            <ul className="columns-2 gap-3 md:columns-3 md:gap-5 xl:columns-4">
              {items.map((p, i) => (
                <li key={p.src} className="mb-3 break-inside-avoid md:mb-5">
                  <button
                    type="button"
                    data-cursor-label="View"
                    onClick={() => setOpenIndex(i)}
                    aria-label={`View larger: ${p.alt}`}
                    className="ink-color group relative block w-full overflow-hidden bg-panel text-left"
                  >
                    <Image
                      src={p.src}
                      width={p.w}
                      height={p.h}
                      alt={p.alt}
                      sizes="(min-width: 1280px) 22vw, (min-width: 768px) 31vw, 48vw"
                      className="h-auto w-full"
                    />
                    {p.title && (
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/85 to-transparent px-3 pb-3 pt-10 md:px-4 md:pb-4">
                        <span className="font-display text-lg uppercase leading-none md:text-2xl">{p.title}</span>
                        <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold sm:block">Pinhead</span>
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="border border-dashed border-gold/40 px-6 py-16 text-center">
              <p className="font-display text-4xl uppercase md:text-5xl">James Smith</p>
              <p className="mx-auto mt-4 max-w-md text-bone/80">
                Come by the shop to see his work. He tattoos {james.hours}.
              </p>
              <a href="#visit" className="btn btn-ghost mt-8">Plan your visit</a>
            </div>
          )}
        </div>
      </div>

      <Lightbox items={items} index={openIndex} onIndex={setOpenIndex} onClose={close} />
    </section>
  );
}
