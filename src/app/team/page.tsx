import type { Metadata } from "next";
import Image from "next/image";
import { Pic } from "@/components/Pic";
import { Rise, RevealPic } from "@/components/Reveal";
import { CTA } from "@/components/Blocks";
import { TLink } from "@/components/TLink";
import { team } from "@/content/team";

export const metadata: Metadata = { title: "Our team", description: "The people behind Pure Earth Organisation Uganda." };

export default function Team() {
  return (
    <>
      <header className="phead wrap">
        <h1>Our team</h1>
        <p className="lede">Behind every bin, tree and lesson is a team that shows up, works with teachers and community leaders, and comes back.</p>
      </header>
      <section className="wrap" style={{ paddingBottom: "var(--section)" }} aria-label="Team members">
        <div className="team-grid">
          {team.map((m, i) => (
            <Rise key={m.photo} delay={i * 0.08} className="tm">
              <div className="pic">
                <Image src={m.photo} width={960} height={1200} alt={`Portrait of ${m.name}, ${m.role}`} sizes="(max-width: 860px) 50vw, 33vw" priority={i < 3} />
              </div>
              <h2 className="tm-name">{m.name}</h2>
              <p className="grey tm-role">{m.role}</p>
            </Rise>
          ))}
          <Rise delay={0.4} className="tm-cta on-dark">
            <p className="tm-cta-t">Talk to the team</p>
            <p>Tell us how you would like to work with us.</p>
            <TLink className="btn btn-lime" href="/partner">Partner with us</TLink>
          </Rise>
        </div>
      </section>
      <RevealPic className="wrap" style={{ paddingBottom: "var(--section)" }}><Pic k="tent-board" className="wide-pic" pos="50% 55%" /></RevealPic>
      <CTA />
    </>
  );
}
