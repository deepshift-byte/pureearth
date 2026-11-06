"use client";
import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

export type LightboxItem = { src: string; width: number; height: number; alt: string; note?: string };

/** Full-screen photo viewer. Arrow keys move between photos and Escape closes it. */
export function Lightbox({ items, index, onIndex, onClose }: { items: LightboxItem[]; index: number | null; onIndex: (i: number) => void; onClose: () => void }) {
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const step = useCallback(
    (d: number) => {
      if (index !== null) onIndex((index + d + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );
  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab" && dialog.current) {
        const f = Array.from(dialog.current.querySelectorAll<HTMLElement>("button"));
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, step]);
  const cur = index === null ? null : items[index];
  return (
    <AnimatePresence>
      {cur && (
        <motion.div ref={dialog} className="lb on-dark" role="dialog" aria-modal="true" aria-label="Photo viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <AnimatePresence mode="wait">
            <motion.div key={cur.src} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
              <Image src={cur.src} width={cur.width} height={cur.height} alt={cur.alt} sizes="90vw" />
            </motion.div>
          </AnimatePresence>
          <p className="lb-cap" aria-live="polite">{cur.note ? `${cur.note}. ` : ""}{cur.alt}. Photo {index! + 1} of {items.length}.</p>
          <button ref={closeBtn} className="lb-ctrl lb-close" onClick={onClose}>Close</button>
          {items.length > 1 && (
            <>
              <button className="lb-ctrl lb-prev" onClick={() => step(-1)}>Previous</button>
              <button className="lb-ctrl lb-next" onClick={() => step(1)}>Next</button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
