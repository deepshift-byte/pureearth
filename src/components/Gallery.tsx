"use client";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { img } from "@/content";
import { Lightbox } from "./Lightbox";

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
  const close = useCallback(() => { setOpen(null); opener.current?.focus(); }, []);
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
      <Lightbox items={items.map(img)} index={open} onIndex={setOpen} onClose={close} />
    </>
  );
}
