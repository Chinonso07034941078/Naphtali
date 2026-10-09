# Naphtali — Graphic Design Portfolio

A responsive React portfolio powered by Vite and Tailwind CSS v4. Project artwork is delivered from the public Cloudinary library.

## Start locally

Requires Node.js 20.19+.

```bash
npm install
npm run dev
```

Create the production build with `npm run build`; preview it with `npm run preview`.

## Personalize before publishing

Edit `siteConfig` near the top of `src/App.jsx`:

- Set `whatsappNumber` to the designer’s WhatsApp number using digits only, including the country code.
- Edit Erumaka’s introduction and service descriptions in `src/App.jsx`.
- Update the project titles, descriptions and categories in `src/projects.js` to match the final portfolio selection.

Images use public Cloudinary delivery URLs from cloud `dnvgl9k4i`, so the site needs internet access to display the artwork.

## Publish

Run `npm run build` and deploy the generated `dist` folder to Vercel, Netlify, GitHub Pages or another static host.
