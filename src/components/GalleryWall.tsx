"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import photos from "@/content/gallery.json";
import { Lightbox } from "./Lightbox";

const ALL = "All photos";
const cats = [ALL, ...Array.from(new Set(photos.map((p) => p.cat)))];

export function GalleryWall() {
  const [cat, setCat] = useState(ALL);
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const shown = useMemo(() => (cat === ALL ? photos : photos.filter((p) => p.cat === cat)), [cat]);
  const items = useMemo(() => shown.map((p) => ({ ...p, note: p.cat === "Our team" ? "" : `${p.cat}, ${p.when}` })), [shown]);
  const close = useCallback(() => { setOpen(null); opener.current?.focus(); }, []);
  return (
    <>
      <div className="gf" role="group" aria-label="Filter photos by project">
        {cats.map((c) => (
          <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)}>
            {c}<span>{c === ALL ? photos.length : photos.filter((p) => p.cat === c).length}</span>
          </button>
        ))}
      </div>
      <p className="small grey" role="status" style={{ marginBottom: 16 }}>Showing {shown.length} {shown.length === 1 ? "photo" : "photos"}. Select a photo to enlarge it.</p>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={cat} className="wall" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
          {shown.map((p, i) => (
            <button key={p.src} aria-label={`Open photo: ${p.alt}`} onClick={(e) => { opener.current = e.currentTarget; setOpen(i); }}>
              <Image src={p.src} width={p.width} height={p.height} alt="" sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 25vw" placeholder="blur" blurDataURL={p.blur} priority={i < 4} />
            </button>
          ))}
        </motion.div>
      </AnimatePresence>
      <Lightbox items={items} index={open} onIndex={setOpen} onClose={close} />
    </>
  );
}
