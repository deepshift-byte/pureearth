"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import Lenis from "lenis";

type Ctx = { go: (href: string) => void };
const NavCtx = createContext<Ctx>({ go: () => {} });
export const useNav = () => useContext(NavCtx);

const EDGE = "M0,70 C130,15 270,10 400,50 C520,88 640,95 760,60 C850,34 930,25 1000,40 L1000,120 L0,120 Z";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [covering, setCovering] = useState(false);
  const lenis = useRef<Lenis | null>(null);
  const pending = useRef<string | null>(null);
  const failSafe = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Smooth scrolling, skipped for people who prefer reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true });
    lenis.current = l;
    let id = requestAnimationFrame(function raf(t) {
      l.raf(t);
      id = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(id);
      l.destroy();
      lenis.current = null;
    };
  }, []);

  // The new page has arrived: go to the top and lift the curtain.
  useEffect(() => {
    if (failSafe.current) clearTimeout(failSafe.current);
    pending.current = null;
    if (covering) {
      lenis.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
      const t = setTimeout(() => setCovering(false), 90);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const go = useCallback(
    (href: string) => {
      if (reduce) {
        router.push(href);
        return;
      }
      pending.current = href;
      setCovering(true);
      failSafe.current = setTimeout(() => setCovering(false), 5000);
    },
    [reduce, router],
  );

  return (
    <NavCtx.Provider value={{ go }}>
      <MotionConfig reducedMotion="user">
        {children}
        <div className="curtain" aria-hidden="true">
          <AnimatePresence>
            {covering && (
              <motion.div
                className="curtain-panel"
                initial={{ y: "118%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-118%" }}
                transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
                onAnimationComplete={() => {
                  if (pending.current) router.push(pending.current);
                }}
              >
                <svg className="edge t" viewBox="0 0 1000 120" preserveAspectRatio="none"><path d={EDGE} fill="#0F5C38" /></svg>
                <svg className="edge b" viewBox="0 0 1000 120" preserveAspectRatio="none"><path d={EDGE} fill="#0F5C38" /></svg>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/emblem-white.png" alt="" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MotionConfig>
    </NavCtx.Provider>
  );
}
