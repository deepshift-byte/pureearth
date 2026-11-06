"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform, animate, type MotionValue } from "motion/react";
import { Pic } from "./Pic";
import { TLink } from "./TLink";
import { Wave } from "./Wave";
import { img, site } from "@/content";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const lines = ["Turning plastic", "waste into a", "cleaner Uganda."];
  return (
    <section className="hero on-dark" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">
          {lines.map((l, i) => (
            <span className="ln" key={l}>
              <motion.span initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ duration: 1.05, delay: 0.25 + i * 0.12, ease }}>{l}</motion.span>
            </span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.85, ease }}>
          <p className="hero-sub">We build dustbins from used bottles, plant trees with pupils, and train young people and women in green skills. Partner with us to reach more schools and communities.</p>
          <div className="btn-row" style={{ marginTop: 26 }}>
            <TLink className="btn btn-lime" href="/partner">Fund a project</TLink>
            <TLink className="btn btn-ghost" href="/work">See our work</TLink>
          </div>
        </motion.div>
      </div>
      <motion.div className="hero-pic" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 1.35, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}>
        <Pic k="cover-flier" priority sizes="(max-width: 860px) 100vw, 50vw" />
      </motion.div>
      <Wave fill="#F6FAF7" className="hero-wave" />
    </section>
  );
}

function Word({ w, range, p }: { w: string; range: [number, number]; p: MotionValue<number> }) {
  const o = useTransform(p, range, [0.16, 1]);
  return <motion.span className="w" style={{ opacity: o }}>{w}</motion.span>;
}

export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 55%"] });
  const words = site.about[3].split(" ");
  return (
    <section className="statement section">
      <div className="wrap">
        <p ref={ref} aria-label={site.about[3]}>
          {words.map((w, i) => (
            <Word key={i} w={w} p={scrollYProgress} range={[i / words.length, (i + 2) / words.length]} />
          ))}
        </p>
      </div>
    </section>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const from = to > 1000 ? to - 8 : 0;
  const v = useMotionValue(from);
  const [t, setT] = useState(String(to));
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(v, to, { duration: 1.5, ease: "easeOut", onUpdate: (x) => setT(String(Math.round(x))) });
    return c.stop;
  }, [inView, reduce, to, v]);
  return <b ref={ref}>{t}{suffix}</b>;
}

export function Facts() {
  return (
    <section className="wrap" style={{ paddingBottom: "var(--section)" }}>
      <div className="facts">
        <div className="fact"><Counter to={2022} /><span>The year Pure Earth was established in Uganda.</span></div>
        <div className="fact"><Counter to={100} suffix="+" /><span>Young people engaged and trained in environmental action.</span></div>
        <div className="fact"><Counter to={5} /><span>Connected areas of work, from plastic recycling to inclusion.</span></div>
      </div>
    </section>
  );
}

const steps = [
  { k: "green-bin", t: "Bottles are collected", d: "Used plastic bottles stop being rubbish the moment someone picks them up. Our first bins used green and clear bottles fixed around metal rings." },
  { k: "women-frames", t: "Hands build the frame", d: "Women build taller bins around wooden frames, adding row after row of bottle mesh until the frame is covered." },
  { k: "kayunga-mentor-bin", t: "A bin takes shape", d: "The finished bin is impossible to ignore, and anyone can see exactly what it is made from." },
  { k: "kayunga-girls-bin", t: "It goes to school", d: "With TARD Foundation and Gufasha Girls Foundation, the bins reached Kayunga Mixed Primary School in April 2026, each carrying a simple message: use it, respect it." },
  { k: "stage", t: "The idea travels", d: "In 2026 a bottle dustbin stood on stage at the 3rd CEO's Breakfast Meeting, in front of business and policy leaders." },
];

export function BottleStory() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: pin, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  useEffect(() => {
    const measure = () => {
      const pinned = window.matchMedia("(min-width: 901px) and (min-height: 561px)").matches;
      setDist(pinned && track.current ? Math.max(0, track.current.scrollWidth - window.innerWidth) : 0);
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    return () => { window.removeEventListener("resize", measure); ro.disconnect(); };
  }, []);
  return (
    <section className="story on-dark" aria-labelledby="story-title">
      <div className="story-head">
        <h2 id="story-title">From bottle to bin</h2>
        <p className="lede">Follow one simple idea from a discarded bottle to a national stage.</p>
      </div>
      <div className="story-pin" ref={pin} style={{ ["--n" as string]: steps.length * 0.9 }}>
        <div className="story-sticky">
          <motion.div className="story-track" ref={track} style={{ x }}>
            {steps.map((s, i) => {
              const m = img(s.k);
              return (
                <article className="step" key={s.k}>
                  <div className="pic" style={{ aspectRatio: `${m.width}/${m.height}` }}>
                    <Image src={m.src} width={m.width} height={m.height} alt={m.alt} sizes="(max-width: 900px) 100vw, 60vw" placeholder="blur" blurDataURL={m.blur} />
                  </div>
                  <div>
                    <div className="n" aria-hidden="true">{i + 1}</div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </article>
              );
            })}
          </motion.div>
          <div className="story-progress" aria-hidden="true"><motion.i style={{ scaleX: scrollYProgress }} /></div>
        </div>
      </div>
    </section>
  );
}
