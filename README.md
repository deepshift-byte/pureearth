# Pure Earth Organisation Uganda website

A Next.js site, ready to deploy on Vercel. No API keys or environment variables are required.

## Deploy on Vercel
1. Put this folder in a GitHub repository.
2. In Vercel, choose Add New, then Project, and import the repository.
3. Keep the default settings and press Deploy.

Or from a terminal in this folder: `npx vercel --prod`.

Once you have a domain, set `NEXT_PUBLIC_SITE_URL` in Vercel (for example `https://www.your-domain.org`) so links shared on social media and the sitemap use it.

## Run it on your computer
```
npm install
npm run dev
```
Then open http://localhost:3000.

## Common edits
- **Team names and roles:** `src/content/team.ts`. Fill in `name` and `role`, and they appear on the team page.
- **Text, projects, funding priorities, contact details:** `src/content/site.json`.
- **Photos on pages:** add a `.webp` to `public/img` and an entry in `src/content/images.json`.
- **Gallery page:** add a `.webp` to `public/gallery` and an entry in `src/content/gallery.json`.
- **Downloads:** replace the PDFs in `public/downloads`.

## Contact form
The form opens the visitor's own email app with the message filled in, addressed to the organisation's email. This needs no server. To receive messages directly on the site, connect a form service later.

## Design
See `DESIGN.md` for colours, type, spacing and motion rules.
