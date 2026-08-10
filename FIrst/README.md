# Luca Cafe

A responsive React and TypeScript frontend for Luca Cafe, designed in espresso brown, beige, and cream with a restrained glass depth system.

## Experiences

- Editorial landing page with the approved combo offers and all menu categories
- QR-aware table selection, searchable menu, dietary filter, item choices, cart, GST, checkout, order tracking, and service requests
- PIN-gated kitchen KDS, waiter dispatch, admin dashboard, menu availability/editor, cafe settings, and table QR standee builder
- 64 photographed-menu entries with the prices supplied by the cafe
- Local browser persistence behind an API-ready `CafeService` contract

## Commands

```bash
npm install
npm run dev
npm test
npm run build
npm run test:e2e
```

`npm run test:e2e` checks desktop and mobile Chromium journeys, including ordering, staff navigation, QR rendering, and an automated accessibility scan.

## Demo access

- Customer menu: `/menu` or `/menu?table=1`
- Kitchen: `/staff/kitchen`
- Waiter: `/staff/waiter`
- Admin: `/staff/admin`
- QR builder: `/staff/qr`
- Staff PIN: `2490`

This PIN is intentionally a frontend-demo gate, not production authentication.

## Data and backend integration

The app currently uses `LocalCafeAdapter`, which persists state in `localStorage`. All screens depend on the typed `CafeService` boundary in `src/services/contracts.ts`; replace the adapter in `src/app/AppProviders.tsx` with an HTTP/WebSocket implementation when the backend is available.

The QR builder exports real SVG QR codes locally. Set its base URL to the deployed customer site before printing table standees.

## Deployment

For Vercel, set the project root directory to `qr-menu-app`. The included `vercel.json` sends deep links back to the React entry point.

## Image system

The eight WebP assets in `public/images` were generated with the built-in image workflow using a unified prompt set: warm editorial cafe photography, espresso-brown wood, cream linen and ceramic, soft window light, subtle film grain, tactile food styling, no text, no logos, and no people. Each category prompt changes only the featured food or drink, keeping the visual art direction coherent across the site.
