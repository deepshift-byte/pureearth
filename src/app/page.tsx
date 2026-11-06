import { Hero, Statement, Facts, BottleStory } from "@/components/Home";
import { Pic } from "@/components/Pic";
import { RevealPic } from "@/components/Reveal";
import { TLink } from "@/components/TLink";
import { CTA, VisionMission } from "@/components/Blocks";
import { projectBySlug } from "@/content";

const feature = [
  { slug: "bottle-bins", cls: "a", k: "kayunga-group", pos: "50% 70%" },
  { slug: "trees-and-lessons", cls: "b", k: "plant-girls" },
  { slug: "community-adaptation", cls: "c", k: "adapt-placard", pos: "50% 20%" },
  { slug: "waste-to-value", cls: "d", k: "upcycle-planter-2" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Facts />
      <BottleStory />
      <section className="section wrap" aria-labelledby="work-title">
        <div className="work-head">
          <h2 id="work-title">Work you can visit</h2>
          <TLink className="tlink" href="/work">See all our projects</TLink>
        </div>
        <div className="work-grid">
          {feature.map((f) => {
            const p = projectBySlug(f.slug)!;
            return (
              <TLink key={f.slug} href={`/work/${f.slug}`} className={`wk ${f.cls}`}>
                <RevealPic><Pic k={f.k} pos={f.pos} sizes="(max-width: 760px) 100vw, 60vw" /></RevealPic>
                <div className="meta">{p.date}</div>
                <h3>{p.title}</h3>
                <p>{p.lede}</p>
              </TLink>
            );
          })}
        </div>
      </section>
      <VisionMission />
      <CTA />
    </>
  );
}
