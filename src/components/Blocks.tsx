import { site } from "@/content";
import { TLink } from "./TLink";
import { Rise } from "./Reveal";

export function VisionMission() {
  return (
    <section aria-label="Vision and mission">
      <svg className="water-wave" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true" style={{ background: "var(--paper)" }}>
        <defs><linearGradient id="wg" x1="0" x2="1"><stop offset="0" stopColor="#00A2E6" /><stop offset=".55" stopColor="#0B7CC7" /><stop offset="1" stopColor="#233A97" /></linearGradient></defs>
        <path d="M0,70 C130,15 270,10 400,50 C520,88 640,95 760,60 C850,34 930,25 1000,40 L1000,120 L0,120 Z" fill="url(#wg)" />
      </svg>
      <div className="water on-dark">
        <div className="wrap section vm" style={{ paddingTop: "clamp(30px,5vw,70px)" }}>
          <Rise><span className="k">Our vision</span><p className="v">{site.vision}</p></Rise>
          <Rise delay={0.12}><span className="k">Our mission</span><p className="m">{site.mission}</p></Rise>
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="cta on-dark" aria-labelledby="cta-title">
      <div className="wrap section">
        <h2 id="cta-title">Help us reach the next school.</h2>
        <div className="cta-grid">
          <div>
            <p className="lede">We have shown what works at small scale. Your support helps us bring bins, trees, skills and environmental clubs to more schools and communities.</p>
            <div className="btn-row" style={{ marginTop: 26 }}>
              <TLink className="btn btn-lime" href="/partner">See funding priorities</TLink>
              <a className="btn btn-ghost" href={`mailto:${site.contact.email}?subject=Partnering%20with%20Pure%20Earth`}>Email us</a>
            </div>
          </div>
          <ul>{site.priorities.map((p) => <li key={p.title}>{p.title}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
