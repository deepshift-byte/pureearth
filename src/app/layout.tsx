import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site, siteUrl } from "@/content";

const display = localFont({ src: "../fonts/gloock.woff2", variable: "--font-display", display: "swap" });
const body = localFont({
  src: [
    { path: "../fonts/hanken.woff2", style: "normal", weight: "100 900" },
    { path: "../fonts/hanken-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-body",
  display: "swap",
});

const description =
  "Pure Earth Organisation Uganda turns plastic waste into opportunity through recycling, climate education, tree planting and green skills for young people and women.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Pure Earth Organisation Uganda", template: "%s | Pure Earth Organisation Uganda" },
  description,
  openGraph: { title: "Pure Earth Organisation Uganda", description, type: "website", siteName: "Pure Earth Organisation Uganda", locale: "en_UG" },
  twitter: { card: "summary_large_image", title: "Pure Earth Organisation Uganda", description },
};
export const viewport: Viewport = { themeColor: "#0F5C38" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.org,
  slogan: site.tagline,
  foundingDate: "2022",
  founder: { "@type": "Person", name: site.team[0].name },
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  email: site.contact.email,
  telephone: site.contact.phoneHrefs,
  address: { "@type": "PostalAddress", addressLocality: "Luzira, Nakawa", addressRegion: "Kampala", addressCountry: "UG" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-UG" className={`${display.variable} ${body.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a className="skip" href="#main">Skip to content</a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
