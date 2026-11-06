import { site } from "@/content";
import { TLink } from "./TLink";
import { Wave } from "./Wave";

export function Footer() {
  const c = site.contact;
  return (
    <footer>
      <Wave fill="#0F5C38" className="ftr-wave" still />
      <div className="ftr on-dark">
        <div className="wrap">
          <div className="ftr-tag" aria-hidden="true">{site.tagline}</div>
          <div className="ftr-grid">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="logo" src="/logo-white.png" alt="Pure Earth Organisation" width={1119} height={458} />
              <p style={{ maxWidth: "26em" }}>{site.vision}</p>
            </div>
            <nav aria-label="Footer">
              <ul>
                <li><TLink href="/about">About</TLink></li>
                <li><TLink href="/work">Our work</TLink></li>
                <li><TLink href="/gallery">Gallery</TLink></li>
                <li><TLink href="/team">Team</TLink></li>
                <li><TLink href="/partner">Partner with us</TLink></li>
              </ul>
            </nav>
            <address style={{ fontStyle: "normal" }}>
              <a href={`mailto:${c.email}`} style={{ overflowWrap: "anywhere" }}>{c.email}</a><br />
              {c.phones.map((p, i) => (<span key={p}><a href={`tel:${c.phoneHrefs[i]}`}>{p}</a><br /></span>))}
              {c.address}
            </address>
          </div>
          <div className="ftr-end">© {new Date().getFullYear()} {site.org}</div>
        </div>
      </div>
    </footer>
  );
}
