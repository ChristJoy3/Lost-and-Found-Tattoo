"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Piece } from "@/content/site";
import { lockScroll } from "@/lib/lenis";
import { ChevronIcon, CloseIcon } from "./icons";

type Props = {
  items: Piece[];
  index: number | null;
  onIndex: (i: number) => void;
  onClose: () => void;
};

/** Full-screen viewer: native <dialog> (focus trap + Esc), arrows, swipe. */
export function Lightbox({ items, index, onIndex, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const opener = useRef<Element | null>(null);
  const open = index !== null;
  const piece = open ? items[index] : null;

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      opener.current = document.activeElement;
      dlg.showModal();
      lockScroll(true);
    } else if (!open && dlg.open) {
      dlg.close();
    }
  }, [open]);

  const go = (d: number) => {
    if (index === null) return;
    onIndex((index + d + items.length) % items.length);
  };

  return (
    <dialog
      ref={ref}
      aria-label="Portfolio viewer"
      onClose={() => {
        lockScroll(false);
        onClose();
        (opener.current as HTMLElement | null)?.focus();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onPointerDown={(e) => (start.current = { x: e.clientX, y: e.clientY })}
      onPointerUp={(e) => {
        const s = start.current;
        start.current = null;
        if (!s) return;
        const dx = e.clientX - s.x;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - s.y)) go(dx < 0 ? 1 : -1);
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none touch-pan-y bg-ink/95 p-0 text-bone backdrop:bg-black/80 open:flex open:flex-col"
    >
      {piece && (
        <>
          <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold" aria-live="polite">
              {index! + 1} / {items.length}
              <span className="sr-only">: {piece.alt}</span>
            </p>
            <button type="button" onClick={() => ref.current?.close()} className="grid size-11 place-items-center border border-bone/30 hover:border-blood-bright" aria-label="Close viewer">
              <CloseIcon />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-4 md:px-24">
            <Image
              key={piece.src}
              src={piece.src}
              width={piece.w}
              height={piece.h}
              alt={piece.alt}
              sizes="100vw"
              draggable={false}
              className="max-h-full w-auto max-w-full object-contain"
            />
            <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center border border-bone/30 bg-ink/70 hover:border-blood-bright md:left-6 md:grid">
              <ChevronIcon />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center border border-bone/30 bg-ink/70 hover:border-blood-bright md:right-6 md:grid">
              <ChevronIcon className="rotate-180" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-gold/20 px-4 py-3 md:px-8">
            <p className="font-display text-xl uppercase md:text-2xl">{piece.title ?? (piece.artist === "pinhead" ? "Pinhead" : "Hot Sauce")}</p>
            <div className="flex gap-2 md:hidden">
              <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="grid size-11 place-items-center border border-bone/30">
                <ChevronIcon />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next image" className="grid size-11 place-items-center border border-bone/30">
                <ChevronIcon className="rotate-180" />
              </button>
            </div>
            <p className="hidden text-xs uppercase tracking-[0.2em] text-bone-dim md:block">← → to browse • Esc to close</p>
          </div>
        </>
      )}
    </dialog>
  );
}
