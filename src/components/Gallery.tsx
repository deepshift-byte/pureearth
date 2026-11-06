"use client";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { img } from "@/content";

/** Rows of 7+5 then 4+4+4, with any leftovers stretched to fill their row. */
function spot(i: number, n: number): React.CSSProperties {
  if (n === 1) return { gridColumn: "span 6", aspectRatio: "4/5" };
  if (n === 3) return { gridColumn: "span 4", aspectRatio: "4/5" };
  const left = n % 5;
  if (left === 1 && i === n - 1) return { gridColumn: "span 12", aspectRatio: "21/9" };
  if (left === 4 && i >= n - 2) return { gridColumn: "span 6", aspectRatio: "4/3" };
  const r = i % 5;
  if (r === 0) return { gridColumn: "span 7", aspectRatio: "4/3" };
  if (r === 1) return { gridColumn: "span 5", aspectRatio: "auto" };
  return { gridColumn: "span 4", aspectRatio: "4/5" };
}

export function Gallery({ items }: { items: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => { setOpen(null); opener.current?.focus(); }, []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)), [items.length]);
  useEffect(() => {
    if (open === null) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, close, step]);
  const cur = open === null ? null : img(items[open]);
  return (
    <>
      <div className="gal">
        {items.map((k, i) => {
          const m = img(k);
          return (
            <button key={k} style={spot(i, items.length)} aria-label={`Open photo: ${m.alt}`} onClick={(e) => { opener.current = e.currentTarget; setOpen(i); }}>
              <Image src={m.src} width={m.width} height={m.height} alt="" sizes="(max-width: 640px) 50vw, 45vw" placeholder="blur" blurDataURL={m.blur} />
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {cur && (
          <motion.div className="lb on-dark" role="dialog" aria-modal="true" aria-label="Photo viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
            <AnimatePresence mode="wait">
              <motion.div key={cur.src} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <Image src={cur.src} width={cur.width} height={cur.height} alt={cur.alt} sizes="90vw" />
              </motion.div>
            </AnimatePresence>
            <p className="lb-cap">{cur.alt}</p>
            <button ref={closeBtn} className="lb-ctrl lb-close" onClick={close}>Close</button>
            {items.length > 1 && <><button className="lb-ctrl lb-prev" onClick={() => step(-1)}>Previous</button><button className="lb-ctrl lb-next" onClick={() => step(1)}>Next</button></>}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
