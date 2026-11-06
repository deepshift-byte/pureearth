import type { MetadataRoute } from "next";
import { site, siteUrl } from "@/content";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/work", "/team", "/partner", ...site.projects.map((p) => `/work/${p.slug}`)].map((p) => ({ url: `${siteUrl}${p}` }));
}
