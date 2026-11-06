"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content";
import { Pic } from "./Pic";

export function Areas() {
  const [active, setActive] = useState(0);
  return (
    <div className="areas">
      <div>
        {site.areas.map((a, i) => (
          <div key={a.title}>
            <button className="area-btn" aria-expanded={active === i} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}>
              <h3>{a.title}</h3>
            </button>
            <AnimatePresence initial={false}>
              {active === i && (
                <motion.div className="area-text" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                  <p style={{ paddingBottom: 22 }}>{a.text}</p>
                  <div className="area-inline"><Pic k={a.img} sizes="100vw" style={{ height: "100%" }} /></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="area-pic">
        <AnimatePresence initial={false}>
          <motion.div key={active} style={{ position: "absolute", inset: 0 }} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
            <Pic k={site.areas[active].img} sizes="50vw" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
