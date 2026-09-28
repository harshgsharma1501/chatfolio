# Harsh Sharma — ChatFolio-style portfolio

A React + Vite recreation inspired by the dark ChatFolio demo at:
https://slimhamdi.net/chatfolio/demos/index-dark.html

This version is built from scratch and uses a similar conversational portfolio structure, but the content, branding, avatar, and project visuals are customized for Harsh Sharma.

## 1. Prerequisites

Install Node.js 18+ (Node 20+ recommended).

Check:

```bash
node -v
npm -v
```

## 2. Run locally

```bash
cd chatfolio-harsh
npm install
npm run dev
```

Open the local URL Vite prints, usually:

```text
http://localhost:5173/
```

## 3. Create a production build

```bash
npm run build
npm run preview
```

## 4. Personalize it

Most content lives in:

```text
src/data/portfolio.js
```

Update your email, GitHub, LinkedIn, skills, stats, clients, and projects there.

### Add your CV

Put your PDF here:

```text
public/Harsh-Sharma-CV.pdf
```

The existing Download CV button will then work automatically.

### Replace the avatar

Replace:

```text
public/avatar.svg
```

with your own image, then update the `src` in `src/main.jsx` if the filename changes.

## 5. Deploy

The project is a static Vite build and can be deployed to Vercel, Netlify, GitHub Pages, Render static hosting, or any web server that can serve the `dist/` folder after `npm run build`.
