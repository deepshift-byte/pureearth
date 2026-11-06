import site from "./site.json";
import images from "./images.json";
export { site };
export type ImageKey = keyof typeof images;
export const img = (k: string) => (images as Record<string, { src: string; width: number; height: number; alt: string; blur: string }>)[k];
export type Project = (typeof site.projects)[number];
export const projectBySlug = (s: string) => site.projects.find((p) => p.slug === s);
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
