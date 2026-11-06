import type { Metadata } from "next";
import { Pic } from "@/components/Pic";
import { Rise, RevealPic } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content";

export const metadata: Metadata = { title: "Partner with us", description: "Fund a project, sponsor a school, donate equipment or share your skills with Pure Earth Organisation Uganda." };

const downloads = [
  { href: "/downloads/Pure-Earth-Organisational-Profile.pdf", label: "Organisational profile" },
  { href: "/downloads/Pure-Earth-Brochure.pdf", label: "Three-fold brochure" },
  { href: "/downloads/Pure-Earth-Flier.pdf", label: "Flier" },
];

export default function Partner() {
  const c = site.contact;
  return (
    <>
      <header className="phead wrap">
        <h1>Help us reach the next school.</h1>
        <p className="lede">We have shown what works at small scale. Your support helps us reach more schools and communities. Tell us which priority interests you, and we will prepare a costed proposal for your review.</p>
        <div className="btn-row" style={{ marginTop: 28 }}>
          <a className="btn btn-primary" href="#contact">Talk to us</a>
          <a className="btn btn-ghost-dark" href={downloads[0].href} download>Download our profile</a>
        </div>
      </header>
      <section className="wrap" style={{ paddingBottom: "var(--section)" }} aria-labelledby="prio-title">
        <h2 id="prio-title" style={{ color: "var(--forest)", marginBottom: "clamp(30px,4vw,60px)" }}>Our funding priorities</h2>
        <div className="prio">
          {site.priorities.map((p) => (
            <article key={p.title}>
              <RevealPic><Pic k={p.img} sizes="(max-width: 560px) 100vw, 33vw" /></RevealPic>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="cta on-dark" aria-labelledby="ways-title">
        <div className="wrap section">
          <h2 id="ways-title" style={{ fontSize: "clamp(38px,5.6vw,76px)", marginBottom: "clamp(30px,4vw,56px)" }}>Ways to get involved</h2>
          <div className="ways">
            {site.ways.map((w, i) => <Rise key={w.title} delay={i * 0.07}><b>{w.title}</b><p>{w.text}</p></Rise>)}
          </div>
        </div>
      </section>
      <section className="section wrap" aria-labelledby="partners-title">
        <h2 id="partners-title" style={{ color: "var(--forest)", marginBottom: 24 }}>Who we have worked with</h2>
        <p className="lede read" style={{ marginBottom: 26 }}>Our projects are stronger when they are shared. We run some of our work ourselves and deliver other work jointly with organisations and schools, including:</p>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,3vw,40px)", lineHeight: 1.25, color: "var(--forest)" }}>{site.partners.join(", ")}.</p>
      </section>
      <section id="contact" className="wrap contact" style={{ paddingBottom: "var(--section)", scrollMarginTop: 100 }} aria-labelledby="contact-title">
        <div>
          <h2 id="contact-title" style={{ color: "var(--forest)", marginBottom: 20 }}>Talk to us</h2>
          <p style={{ fontWeight: 600 }}><a className="tlink" href={`mailto:${c.email}`} style={{ overflowWrap: "anywhere" }}>{c.email}</a></p>
          {c.phones.map((p, i) => <p key={p}><a className="tlink" href={`tel:${c.phoneHrefs[i]}`}>{p}</a></p>)}
          <p style={{ marginTop: 8 }}>{c.address}</p>
          <div className="dl" style={{ marginTop: 40 }}>
            {downloads.map((d) => <a key={d.href} href={d.href} download>{d.label}<span>PDF</span></a>)}
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
