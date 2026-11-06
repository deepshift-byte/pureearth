import { TLink } from "@/components/TLink";
export default function NotFound() {
  return (
    <header className="phead wrap" style={{ minHeight: "60vh" }}>
      <h1>This page has been recycled.</h1>
      <p className="lede">The address may be out of date. Go back to the home page or see our work.</p>
      <div className="btn-row" style={{ marginTop: 26 }}>
        <TLink className="btn btn-primary" href="/">Go to the home page</TLink>
        <TLink className="btn btn-ghost-dark" href="/work">See our work</TLink>
      </div>
    </header>
  );
}
