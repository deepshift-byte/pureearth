import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Pic } from "@/components/Pic";
import { Gallery } from "@/components/Gallery";
import { TLink } from "@/components/TLink";
import { Wave } from "@/components/Wave";
import { CTA } from "@/components/Blocks";
import { projectBySlug, site } from "@/content";

export function generateStaticParams() {
  return site.projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug(slug);
  return p ? { title: p.short, description: p.lede } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();
  const i = site.projects.findIndex((x) => x.slug === slug);
  const next = site.projects[(i + 1) % site.projects.length];
  return (
    <>
      <header className="phead wrap">
        <p className="meta" style={{ marginBottom: 14 }}>{p.date}, {p.place}</p>
        <h1 style={{ fontSize: "clamp(44px,7.4vw,112px)" }}>{p.title}</h1>
      </header>
      <div className={`proj-hero ${p.hero.length > 1 ? "two" : ""}`}>
        {p.hero.map((k) => <Pic key={k} k={k} priority sizes={p.hero.length > 1 ? "50vw" : "100vw"} />)}
        <Wave fill="#F6FAF7" still style={{ position: "absolute", left: 0, bottom: -1, width: "100%", height: "clamp(40px,7vw,100px)" }} />
      </div>
      <section className="section wrap proj-body">
        <div>
          {p.partners.length > 0 && (
            <div>
              <p className="meta">With our partners</p>
              {p.partners.map((x) => <p key={x}>{x}</p>)}
            </div>
          )}
        </div>
        <div className="read">
          <p className="lede" style={{ color: "var(--forest)", marginBottom: "1em" }}>{p.lede}</p>
          {p.body.map((t) => <p key={t}>{t}</p>)}
        </div>
      </section>
      <section className="wrap" style={{ paddingBottom: "var(--section)" }} aria-label="Photos">
        <Gallery items={p.gallery} />
      </section>
      <TLink href={`/work/${next.slug}`} className="next-proj">
        <div className="wrap" style={{ paddingBlock: "clamp(40px,6vw,84px)" }}>
          <p className="meta">Next project</p>
          <h2 style={{ fontSize: "clamp(32px,5vw,70px)", color: "var(--forest)" }}>{next.title}</h2>
        </div>
      </TLink>
      <CTA />
    </>
  );
}
