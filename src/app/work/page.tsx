import type { Metadata } from "next";
import { Pic } from "@/components/Pic";
import { RevealPic } from "@/components/Reveal";
import { TLink } from "@/components/TLink";
import { CTA } from "@/components/Blocks";
import { site } from "@/content";

export const metadata: Metadata = { title: "Our work", description: "Projects and past work by Pure Earth Organisation Uganda, on our own and with partners, from 2023 to 2026." };
const cls = ["a", "b", "c", "d", "a", "b"];

export default function Work() {
  return (
    <>
      <header className="phead wrap">
        <h1>Our work so far</h1>
        <p className="lede">Some of it we lead ourselves. Some of it we do alongside partners. All of it happens with communities and schools.</p>
      </header>
      <section className="wrap" style={{ paddingBottom: "var(--section)" }} aria-label="Projects">
        <div className="work-grid">
          {site.projects.map((p, i) => (
            <TLink key={p.slug} href={`/work/${p.slug}`} className={`wk ${cls[i]}`}>
              <RevealPic><Pic k={p.cover} pos={p.coverPos} sizes="(max-width: 760px) 100vw, 60vw" priority={i === 0} /></RevealPic>
              <div className="meta">{p.date}</div>
              <h3>{p.title}</h3>
              <p>{p.lede}</p>
            </TLink>
          ))}
        </div>
      </section>
      <section className="wrap" style={{ paddingBottom: "var(--section)" }} aria-labelledby="tl-title">
        <h2 id="tl-title" style={{ color: "var(--forest)", marginBottom: "clamp(24px,3vw,44px)" }}>Year by year</h2>
        <div className="tl">
          {site.timeline.map((t) => (
            <TLink key={t.when} href={`/work/${t.slug}`}><b>{t.when}</b><span>{t.what}</span></TLink>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
