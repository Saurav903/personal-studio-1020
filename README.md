# personal Studio 1020

`personal Studio 1020` is a calm, local-first personal-finance rehearsal space. Instead of pushing users toward a rigid budget, it helps them see their daily runway before the next pay day and safely try upcoming spending decisions.

## Highlights

- A dashboard with daily runway, available cash, spending spaces, and recent movement
- A tactile **Spend rehearsal** dialog that immediately models the impact of a planned purchase
- Responsive sidebar navigation, mobile drawer, focusable controls, labelled dialogs, and status announcements
- Thoughtful empty states for future sections and polished local demo data on first load
- Light/dark surface toggle; no account, API key, or backend required

## Stack and architecture

- React 19 + TypeScript, built with Vite
- Plain CSS for the visual system and responsive layout
- `src/App.tsx` holds the composed experience and local UI state
- `src/finance.ts` contains small reusable finance helpers and demo data
- `src/finance.test.ts` covers the calculation helpers with Vitest

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Validate

```bash
npm run lint
npm run test
npm run build
```

## Screenshot / representation guidance

The strongest representative frame is the default desktop Studio dashboard: it shows the dark navigation rail, daily runway module, charcoal balance card, warm focus card, and money spaces together. For a second frame, open **Rehearse a spend** to demonstrate the core interaction. At mobile width, the menu becomes a slide-in drawer and the cards stack.

## Deployment

This is a static client-side app. Run `npm run build` and deploy the generated `dist/` directory to Vercel, Netlify, GitHub Pages (with the matching base path), or any static host. No server settings or secrets are required. `.env.example` reserves `VITE_INSIGHT_API_URL` for a future optional integration; it is intentionally unused today so demo mode remains complete offline.
