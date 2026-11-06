import type { Metadata } from "next";
import { GalleryWall } from "@/components/GalleryWall";
import { CTA } from "@/components/Blocks";

export const metadata: Metadata = { title: "Gallery", description: "Photos of Pure Earth Organisation Uganda at work: bottle dustbins, tree planting, climate lessons, recycling messages and community outreach." };

export default function GalleryPage() {
  return (
    <>
      <header className="phead wrap">
        <h1>Gallery</h1>
        <p className="lede">Our work in pictures, from village meetings and school tree planting to bottle dustbins and the national stage.</p>
      </header>
      <section className="wrap" style={{ paddingBottom: "var(--section)" }} aria-label="Photos">
        <GalleryWall />
      </section>
      <CTA />
    </>
  );
}
