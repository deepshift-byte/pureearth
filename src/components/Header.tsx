"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { TLink } from "./TLink";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Our work" },
  { href: "/team", label: "Team" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 240 && y > last.current);
      last.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const overHero = pathname === "/" && !scrolled;
  return (
    <>
      <header className={`hdr ${scrolled ? "solid" : ""} ${hidden && !open ? "hidden" : ""} ${overHero ? "light on-dark" : "dark"}`} onFocusCapture={() => setHidden(false)}>
        <div className="wrap hdr-in">
          <TLink href="/" aria-label="Pure Earth Organisation, home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo" src={overHero ? "/logo-white.png" : "/logo.png"} alt="Pure Earth Organisation" width={1119} height={458} />
          </TLink>
          <nav className="nav" aria-label="Main">
            {links.map((l) => (
              <TLink key={l.href} href={l.href} aria-current={pathname.startsWith(l.href) ? "page" : undefined}>
                {l.label}
              </TLink>
            ))}
            <TLink href="/partner" className={`btn ${overHero ? "btn-lime" : "btn-primary"}`}>Partner with us</TLink>
          </nav>
          <button ref={menuBtn} className="burger" aria-expanded={open} onClick={() => setOpen(true)}>Menu</button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="menu on-dark" role="dialog" aria-modal="true" aria-label="Menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}>
            <div className="menu-top">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-white.png" alt="" style={{ height: 42, width: "auto" }} />
              <button ref={closeBtn} className="burger" onClick={() => { setOpen(false); menuBtn.current?.focus(); }}>Close</button>
            </div>
            <ul>
              {[{ href: "/", label: "Home" }, ...links, { href: "/partner", label: "Partner with us" }].map((l, i) => (
                <motion.li key={l.href} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.18 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                  <TLink href={l.href}>{l.label}</TLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
