import type { Metadata } from "next";
import { Pic } from "@/components/Pic";
import { RevealPic } from "@/components/Reveal";
import { Areas } from "@/components/Areas";
import { CTA, VisionMission } from "@/components/Blocks";
import { site } from "@/content";

export const metadata: Metadata = { title: "About us", description: "Who Pure Earth Organisation Uganda is, what we work on and how we work." };

export default function About() {
  return (
    <>
      <header className="phead wrap">
        <h1>We see waste as a place to begin.</h1>
        <p className="lede">{site.about[3]}</p>
      </header>
      <RevealPic className="wrap"><Pic k="kayunga-group" className="wide-pic" priority pos="50% 70%" /></RevealPic>
      <section className="section wrap read">
        {site.about.slice(0, 3).map((t) => <p key={t}>{t}</p>)}
      </section>
      <VisionMission />
      <section className="section wrap" aria-labelledby="areas-title">
        <h2 id="areas-title" style={{ marginBottom: "clamp(30px,4vw,60px)", color: "var(--forest)" }}>What we work on</h2>
        <Areas />
      </section>
      <section className="cta on-dark" aria-labelledby="how-title" style={{ background: "var(--forest)" }}>
        <div className="wrap section">
          <h2 id="how-title" style={{ marginBottom: "clamp(30px,4vw,56px)", fontSize: "clamp(38px,5.6vw,76px)" }}>How we work</h2>
          {site.principles.map((p) => (
            <div className="princ" key={p.title}><h3>{p.title}</h3><p>{p.text}</p></div>
          ))}
        </div>
      </section>
      <section className="section wrap read" aria-labelledby="future-title">
        <h2 id="future-title" style={{ color: "var(--forest)", marginBottom: 24 }}>Our commitment</h2>
        <p>{site.impact}</p>
        <p>{site.future}</p>
      </section>
      <CTA />
    </>
  );
}
