# Luca Cafe Full Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static prototype with a complete React/Vite Luca Cafe frontend covering the landing page, table ordering, kitchen, waiter, admin, and QR workflows in a warm brown/beige/cream liquid-glass design.

**Architecture:** A route-based React application shares typed domain models, pure pricing/status utilities, accessible UI primitives, and service interfaces. The first service adapter persists deterministic demo data locally; page components depend only on service/store contracts so a production API can replace it later.

**Tech Stack:** React, Vite, React Router, TypeScript, CSS modules/global tokens, Lucide React, Vitest, Testing Library, Playwright, axe-core, QRCode.

---

## File Structure

```text
qr-menu-app/
  index.html
  package.json
  vite.config.ts
  tsconfig.json
  playwright.config.ts
  public/
    images/
      cafe-hero.webp
      pizza.webp
      pasta.webp
      sandwiches.webp
      coffee-matcha.webp
      cold-drinks.webp
      desserts.webp
      combo-spread.webp
  src/
    main.tsx
    app/App.tsx
    app/AppProviders.tsx
    app/router.tsx
    app/styles.css
    design/tokens.css
    design/glass.css
    domain/types.ts
    domain/catalog.ts
    domain/pricing.ts
    domain/orderStatus.ts
    services/contracts.ts
    services/localAdapter.ts
    services/seed.ts
    state/CafeStore.tsx
    components/ui/
      Button.tsx
      IconButton.tsx
      Badge.tsx
      Dialog.tsx
      Sheet.tsx
      EmptyState.tsx
      ErrorState.tsx
      LoadingSkeleton.tsx
    components/layout/
      PublicHeader.tsx
      CustomerHeader.tsx
      StaffShell.tsx
    features/landing/LandingPage.tsx
    features/menu/MenuPage.tsx
    features/menu/MenuFilters.tsx
    features/menu/MenuCard.tsx
    features/menu/ProductSheet.tsx
    features/cart/CartBar.tsx
    features/cart/CartSheet.tsx
    features/orders/OrderTracker.tsx
    features/orders/ServiceRequestSheet.tsx
    features/auth/StaffGate.tsx
    features/kitchen/KitchenPage.tsx
    features/kitchen/KitchenTicket.tsx
    features/waiter/WaiterPage.tsx
    features/admin/AdminPage.tsx
    features/admin/MenuEditor.tsx
    features/qr/QrPage.tsx
    test/setup.ts
    test/render.tsx
    **/*.test.ts
    **/*.test.tsx
  e2e/
    full-order-flow.spec.ts
    routes.spec.ts
  README.md
  vercel.json
```

## Task 1: Scaffold the React/Vite Test Harness and Route Shell

**Files:**
- Replace: `qr-menu-app/index.html`
- Create: `qr-menu-app/package.json`
- Create: `qr-menu-app/tsconfig.json`
- Create: `qr-menu-app/vite.config.ts`
- Create: `qr-menu-app/src/main.tsx`
- Create: `qr-menu-app/src/app/App.tsx`
- Create: `qr-menu-app/src/app/router.tsx`
- Create: `qr-menu-app/src/test/setup.ts`
- Create: `qr-menu-app/src/app/App.test.tsx`

- [ ] **Step 1: Create package metadata and install the toolchain**

Run:

```bash
cd qr-menu-app
npm init -y
npm install react react-dom react-router-dom lucide-react qrcode
npm install -D vite typescript @vitejs/plugin-react vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/react @types/react-dom @types/qrcode playwright @playwright/test axe-core
```

Expected: dependencies install and `package-lock.json` is created.

- [ ] **Step 2: Add scripts and configuration**

Set package scripts to:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "check": "npm run test && npm run build"
  }
}
```

Configure Vitest with `environment: 'jsdom'`, `setupFiles: './src/test/setup.ts'`, and React plugin support.

- [ ] **Step 3: Write the failing route-shell test**

```tsx
it.each([
  ['/', 'Luca Cafe'],
  ['/menu?table=1', 'Menu'],
  ['/kitchen', 'Kitchen'],
  ['/waiter', 'Waiter'],
  ['/admin', 'Admin'],
  ['/qr', 'QR Builder'],
])('renders %s', async (path, label) => {
  renderApp(path);
  expect(await screen.findByRole('heading', { name: new RegExp(label, 'i') })).toBeInTheDocument();
});
```

- [ ] **Step 4: Verify the test fails**

Run: `npm test -- src/app/App.test.tsx`

Expected: FAIL because the router and pages do not exist.

- [ ] **Step 5: Implement the minimal router and route placeholders**

Create route components with semantic `<h1>` elements and mount them through `createBrowserRouter`/`RouterProvider`.

- [ ] **Step 6: Verify and commit**

Run: `npm test -- src/app/App.test.tsx && npm run build`

Expected: route test PASS and production build succeeds.

```bash
git add qr-menu-app
git commit -m "build: scaffold Luca Cafe React application"
```

## Task 2: Define the Complete Menu Domain and Pricing Rules

**Files:**
- Create: `qr-menu-app/src/domain/types.ts`
- Create: `qr-menu-app/src/domain/catalog.ts`
- Create: `qr-menu-app/src/domain/pricing.ts`
- Create: `qr-menu-app/src/domain/orderStatus.ts`
- Create: `qr-menu-app/src/domain/catalog.test.ts`
- Create: `qr-menu-app/src/domain/pricing.test.ts`
- Create: `qr-menu-app/src/domain/orderStatus.test.ts`

- [ ] **Step 1: Write failing catalog tests**

Tests must assert:

```ts
expect(menuItems).toHaveLength(64);
expect(menuItems.find(item => item.name === 'Ghee Roast Pizza')?.price).toBe(159);
expect(menuItems.find(item => item.name === 'Cafe Latte')?.price).toBe(90);
expect(menuItems.find(item => item.name === 'Pastry of the Day')?.availabilityNote).toMatch(/availability/i);
expect(combos.map(combo => [combo.name, combo.price, combo.contents.length])).toEqual([
  ['I Am Alone', 249, 3],
  ['We Are Together', 399, 3],
  ['We Are a Group', 799, 4],
]);
```

Combo `contents.length` counts component lines; each component carries its approved quantity.

- [ ] **Step 2: Run and verify failure**

Run: `npm test -- src/domain/catalog.test.ts`

Expected: FAIL because the catalog is not defined.

- [ ] **Step 3: Implement typed catalog data**

Define `MenuItem`, `MenuOptionGroup`, `Combo`, `Category`, `CartLine`, `Order`, `Table`, `ServiceRequest`, and `CafeSettings`. Transcribe every item and price from the approved design spec. Use stable string IDs and local category-image paths.

- [ ] **Step 4: Write failing pricing and transition tests**

```ts
expect(calculateBill([{ unitPrice: 189, quantity: 2 }], 5)).toEqual({
  subtotal: 378,
  tax: 19,
  total: 397,
});
expect(canTransition('received', 'preparing')).toBe(true);
expect(canTransition('received', 'paid')).toBe(false);
```

- [ ] **Step 5: Implement pure pricing and status functions**

Use integer rupees, `Math.round` for GST, and the transition chain `received → preparing → ready → delivered → paid`, with `cancelled` allowed only before delivery.

- [ ] **Step 6: Verify and commit**

Run: `npm test -- src/domain`

Expected: all domain tests PASS.

```bash
git add qr-menu-app/src/domain
git commit -m "feat: add complete Luca Cafe menu domain"
```

## Task 3: Implement API-Ready Contracts and the Versioned Local Adapter

**Files:**
- Create: `qr-menu-app/src/services/contracts.ts`
- Create: `qr-menu-app/src/services/seed.ts`
- Create: `qr-menu-app/src/services/localAdapter.ts`
- Create: `qr-menu-app/src/services/localAdapter.test.ts`
- Create: `qr-menu-app/src/state/CafeStore.tsx`
- Create: `qr-menu-app/src/app/AppProviders.tsx`

- [ ] **Step 1: Write failing adapter tests**

Cover deterministic seed loading, invalid JSON recovery, menu availability persistence, duplicate-safe order creation, timestamped order transitions, service request resolution, and reset.

```ts
const first = await adapter.createOrder(draft);
const second = await adapter.createOrder({ ...draft, clientRequestId: draft.clientRequestId });
expect(second.id).toBe(first.id);
```

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/services/localAdapter.test.ts`

Expected: FAIL because service contracts and adapter are missing.

- [ ] **Step 3: Implement contracts and adapter**

Expose typed methods for authentication, menu CRUD/availability, order CRUD/transitions, tables, service requests, staff, settings, QR settings, and reset. Persist one versioned envelope under `luca-cafe-demo-v1`; recover to seed on schema/version mismatch.

- [ ] **Step 4: Implement the provider/store boundary**

Provide state plus command methods. Subscribe to `storage` and `BroadcastChannel` changes through the adapter. Components consume hooks and never browser storage directly.

- [ ] **Step 5: Verify and commit**

Run: `npm test -- src/services src/state`

Expected: adapter tests PASS without network access.

```bash
git add qr-menu-app/src/services qr-menu-app/src/state qr-menu-app/src/app/AppProviders.tsx
git commit -m "feat: add API-ready local data services"
```

## Task 4: Build Design Tokens and Accessible UI Primitives

**Files:**
- Create: `qr-menu-app/src/design/tokens.css`
- Create: `qr-menu-app/src/design/glass.css`
- Create: `qr-menu-app/src/app/styles.css`
- Create: `qr-menu-app/src/components/ui/Button.tsx`
- Create: `qr-menu-app/src/components/ui/IconButton.tsx`
- Create: `qr-menu-app/src/components/ui/Badge.tsx`
- Create: `qr-menu-app/src/components/ui/Dialog.tsx`
- Create: `qr-menu-app/src/components/ui/Sheet.tsx`
- Create: `qr-menu-app/src/components/ui/EmptyState.tsx`
- Create: `qr-menu-app/src/components/ui/ErrorState.tsx`
- Create: `qr-menu-app/src/components/ui/LoadingSkeleton.tsx`
- Create: `qr-menu-app/src/components/ui/Dialog.test.tsx`

- [ ] **Step 1: Write failing accessibility tests for dialogs and controls**

Assert accessible names, initial focus, Escape close, focus restoration, disabled semantics, and 44px minimum control classes.

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/components/ui`

Expected: FAIL because primitives do not exist.

- [ ] **Step 3: Implement semantic primitives and tokens**

Use the approved palette, `clamp()` typography, 4/8px spacing rhythm, tabular number utility, glass/fallback classes, `:focus-visible`, safe-area variables, and reduced-motion media query. Use native buttons and the native dialog pattern or an equivalent focus-managed implementation.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- src/components/ui && npm run build`

Expected: primitive tests PASS and CSS builds.

```bash
git add qr-menu-app/src/design qr-menu-app/src/components/ui qr-menu-app/src/app/styles.css
git commit -m "feat: add Luca Cafe liquid-glass design system"
```

## Task 5: Generate and Integrate the Local Editorial Image Set

**Files:**
- Create: `qr-menu-app/public/images/cafe-hero.webp`
- Create: `qr-menu-app/public/images/pizza.webp`
- Create: `qr-menu-app/public/images/pasta.webp`
- Create: `qr-menu-app/public/images/sandwiches.webp`
- Create: `qr-menu-app/public/images/coffee-matcha.webp`
- Create: `qr-menu-app/public/images/cold-drinks.webp`
- Create: `qr-menu-app/public/images/desserts.webp`
- Create: `qr-menu-app/public/images/combo-spread.webp`
- Create: `qr-menu-app/src/components/ui/FoodImage.tsx`
- Create: `qr-menu-app/src/components/ui/FoodImage.test.tsx`

- [ ] **Step 1: Generate eight cohesive bitmap assets**

Use the image-generation workflow with the approved art direction: warm side light, cream ceramics, walnut surfaces, natural shadows, premium editorial café photography, no text, no logos, no watermarks.

- [ ] **Step 2: Optimize assets**

Convert outputs to WebP, preserve useful crop room, cap category images near 1600px, and keep each optimized asset under 350KB where visual quality permits.

- [ ] **Step 3: Write the failing fallback test**

Assert that `FoodImage` shows a neutral branded fallback when its source errors and preserves meaningful alt text.

- [ ] **Step 4: Implement and verify**

Run: `npm test -- src/components/ui/FoodImage.test.tsx && npm run build`

Expected: fallback test PASS and local assets resolve in the build.

- [ ] **Step 5: Commit**

```bash
git add qr-menu-app/public/images qr-menu-app/src/components/ui/FoodImage*
git commit -m "feat: add Luca Cafe editorial image system"
```

## Task 6: Build the Public Landing Page

**Files:**
- Create: `qr-menu-app/src/components/layout/PublicHeader.tsx`
- Create: `qr-menu-app/src/features/landing/LandingPage.tsx`
- Create: `qr-menu-app/src/features/landing/LandingPage.css`
- Create: `qr-menu-app/src/features/landing/LandingPage.test.tsx`
- Modify: `qr-menu-app/src/app/router.tsx`

- [ ] **Step 1: Write failing landing tests**

Assert the Luca Cafe heading, both primary actions, three combo names/prices, category preview, phone link `tel:08203559195`, Manipal location copy, and absence of invented hours/address/ratings.

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/features/landing`

- [ ] **Step 3: Implement the responsive landing composition**

Build the glass header, editorial hero, fixed-combo section, category preview, story/atmosphere section, contact section, and footer. Use semantic sections and local images.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- src/features/landing && npm run build`

```bash
git add qr-menu-app/src/features/landing qr-menu-app/src/components/layout/PublicHeader.tsx qr-menu-app/src/app/router.tsx
git commit -m "feat: build Luca Cafe landing page"
```

## Task 7: Build the Table-Aware Menu Browser

**Files:**
- Create: `qr-menu-app/src/components/layout/CustomerHeader.tsx`
- Create: `qr-menu-app/src/features/menu/MenuPage.tsx`
- Create: `qr-menu-app/src/features/menu/MenuFilters.tsx`
- Create: `qr-menu-app/src/features/menu/MenuCard.tsx`
- Create: `qr-menu-app/src/features/menu/MenuPage.test.tsx`
- Modify: `qr-menu-app/src/app/router.tsx`

- [ ] **Step 1: Write failing tests**

Cover valid table display, invalid/missing table selection, search, category selection, dietary filtering, sold-out behavior, all catalog category headings, and visible prices.

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/features/menu/MenuPage.test.tsx`

- [ ] **Step 3: Implement menu browsing**

Use sticky glass filters, compact responsive cards, category images, semantic buttons, and memoized derived filtering. No item is hidden solely because it lacks a unique photograph.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- src/features/menu && npm run build`

```bash
git add qr-menu-app/src/features/menu qr-menu-app/src/components/layout/CustomerHeader.tsx qr-menu-app/src/app/router.tsx
git commit -m "feat: build table-aware Luca Cafe menu"
```

## Task 8: Implement Product Choices and Cart

**Files:**
- Create: `qr-menu-app/src/features/menu/ProductSheet.tsx`
- Create: `qr-menu-app/src/features/menu/ProductSheet.test.tsx`
- Create: `qr-menu-app/src/features/cart/CartBar.tsx`
- Create: `qr-menu-app/src/features/cart/CartSheet.tsx`
- Create: `qr-menu-app/src/features/cart/cart.test.tsx`

- [ ] **Step 1: Write failing cart tests**

Test required paneer/chicken selection, Penne/Macaroni selection, quantity changes, line merging only when option signatures match, removal, notes preservation, GST, totals, and fixed combo contents with no substitutions.

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/features/cart`

- [ ] **Step 3: Implement sheets and cart commands**

Render single-choice groups as radios, extras as checkboxes, keep the primary action sticky, show validation beside the incomplete group, and use the pricing utilities from Task 2.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- src/features/cart src/features/menu/ProductSheet.test.tsx`

```bash
git add qr-menu-app/src/features/cart qr-menu-app/src/features/menu/ProductSheet.tsx
git commit -m "feat: add product choices and cart workflow"
```

## Task 9: Implement Order Submission, Tracking, and Service Requests

**Files:**
- Create: `qr-menu-app/src/features/orders/OrderTracker.tsx`
- Create: `qr-menu-app/src/features/orders/ServiceRequestSheet.tsx`
- Create: `qr-menu-app/src/features/orders/orders.test.tsx`
- Modify: `qr-menu-app/src/features/cart/CartSheet.tsx`
- Modify: `qr-menu-app/src/features/menu/MenuPage.tsx`

- [ ] **Step 1: Write failing tests**

Test duplicate-click protection, failed-write retry with cart preservation, confirmation, ordered-item summary, status timeline, additional round behavior, and water/waiter/bill requests.

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/features/orders`

- [ ] **Step 3: Implement workflow states**

Use `clientRequestId` for idempotency, disable the submit control during writes, announce status changes through a polite live region, and show local success only after the adapter resolves.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- src/features/orders src/features/cart && npm run build`

```bash
git add qr-menu-app/src/features/orders qr-menu-app/src/features/cart/CartSheet.tsx qr-menu-app/src/features/menu/MenuPage.tsx
git commit -m "feat: add customer ordering and live tracking"
```

## Task 10: Build the Demo Staff Gate and Shared Staff Shell

**Files:**
- Create: `qr-menu-app/src/features/auth/StaffGate.tsx`
- Create: `qr-menu-app/src/features/auth/StaffGate.test.tsx`
- Create: `qr-menu-app/src/components/layout/StaffShell.tsx`
- Modify: `qr-menu-app/src/app/router.tsx`

- [ ] **Step 1: Write failing tests**

Assert protected staff routes, accessible PIN input, invalid feedback, session-only authentication, logout, and visible “Demo access” labelling.

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/features/auth`

- [ ] **Step 3: Implement the service-backed demo gate**

Do not display PINs on landing cards. Use a seeded demo PIN through `authService`, store only a session flag, and make no production-security claims.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- src/features/auth && npm run build`

```bash
git add qr-menu-app/src/features/auth qr-menu-app/src/components/layout/StaffShell.tsx qr-menu-app/src/app/router.tsx
git commit -m "feat: add demo staff access shell"
```

## Task 11: Build the Kitchen Display System

**Files:**
- Create: `qr-menu-app/src/features/kitchen/KitchenPage.tsx`
- Create: `qr-menu-app/src/features/kitchen/KitchenTicket.tsx`
- Create: `qr-menu-app/src/features/kitchen/KitchenPage.test.tsx`

- [ ] **Step 1: Write failing KDS tests**

Assert New/Preparing/Ready/Completed columns, elapsed time, quantities/options, visible allergy notes, valid one-step transitions, and overdue styling based on deterministic test time.

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/features/kitchen`

- [ ] **Step 3: Implement KDS**

Use opaque ticket surfaces, tabular timers, large actions, and derived column ordering by oldest active ticket first.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- src/features/kitchen && npm run build`

```bash
git add qr-menu-app/src/features/kitchen
git commit -m "feat: build kitchen display workflow"
```

## Task 12: Build Waiter Dispatch and Table Operations

**Files:**
- Create: `qr-menu-app/src/features/waiter/WaiterPage.tsx`
- Create: `qr-menu-app/src/features/waiter/WaiterPage.test.tsx`

- [ ] **Step 1: Write failing waiter tests**

Cover pending assistance requests, ready pickups, request resolution, delivery, active table totals, confirmation before payment completion, and table availability after payment.

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/features/waiter`

- [ ] **Step 3: Implement waiter operations**

Group urgent requests before ready pickups, keep bills separate from service actions, and use confirmation dialogs for paid/clear operations.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- src/features/waiter && npm run build`

```bash
git add qr-menu-app/src/features/waiter
git commit -m "feat: build waiter dispatch workflow"
```

## Task 13: Build the Admin Dashboard and Menu Editor

**Files:**
- Create: `qr-menu-app/src/features/admin/AdminPage.tsx`
- Create: `qr-menu-app/src/features/admin/MenuEditor.tsx`
- Create: `qr-menu-app/src/features/admin/AdminPage.test.tsx`

- [ ] **Step 1: Write failing admin tests**

Assert derived demo metrics, live order list, menu search, availability toggle, validated create/edit form, table/bill controls, staff overview, settings persistence, and confirmed reset.

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/features/admin`

- [ ] **Step 3: Implement admin modules**

Label metrics as demo data. Align numerical values for comparison. Keep create/edit in a focused sheet and validate name, category, price, dietary type, and availability before saving.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- src/features/admin && npm run build`

```bash
git add qr-menu-app/src/features/admin
git commit -m "feat: build Luca Cafe admin dashboard"
```

## Task 14: Build the Local QR Standee Generator

**Files:**
- Create: `qr-menu-app/src/features/qr/QrPage.tsx`
- Create: `qr-menu-app/src/features/qr/QrPage.test.tsx`
- Modify: `qr-menu-app/src/services/contracts.ts`
- Modify: `qr-menu-app/src/services/localAdapter.ts`

- [ ] **Step 1: Write failing QR tests**

Assert URL output `/menu?table=<id>`, table selection, settings persistence, optional Wi-Fi fields, accessible preview, and print/download controls without an external QR image URL.

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/features/qr`

- [ ] **Step 3: Implement QR generation**

Use the local `qrcode` package to create a data URL or canvas. Sanitize base URLs, update preview without losing field focus, and isolate printable standee styles.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- src/features/qr && npm run build`

```bash
git add qr-menu-app/src/features/qr qr-menu-app/src/services
git commit -m "feat: add branded Luca Cafe QR builder"
```

## Task 15: Add End-to-End, Accessibility, Responsive, and Failure Verification

**Files:**
- Create: `qr-menu-app/playwright.config.ts`
- Create: `qr-menu-app/e2e/full-order-flow.spec.ts`
- Create: `qr-menu-app/e2e/routes.spec.ts`
- Create: `qr-menu-app/e2e/accessibility.spec.ts`
- Modify: relevant components found by failures

- [ ] **Step 1: Write the full-flow E2E test**

The test must select Table 1, add a customized pasta, place an order, authenticate to kitchen, advance it to Ready, authenticate to waiter, deliver and mark it paid, then confirm the customer completion state.

- [ ] **Step 2: Add route and responsive checks**

Visit all routes at 375x812, 768x1024, 1024x768, and 1440x900. Assert no horizontal document overflow and no primary action hidden under fixed navigation.

- [ ] **Step 3: Add accessibility checks**

Run axe on landing, menu, open product sheet, open cart, kitchen, waiter, admin, and QR pages. Fail on serious or critical violations.

- [ ] **Step 4: Verify initial failures and fix product code**

Run: `npm run test:e2e`

Expected before fixes: failures identify remaining integration, focus, overflow, or contrast issues. Fix each issue in its owning component; do not weaken assertions.

- [ ] **Step 5: Run the complete suite and commit**

Run: `npm run check && npm run test:e2e`

Expected: unit/component tests PASS, production build succeeds, and E2E suite passes.

```bash
git add qr-menu-app
git commit -m "test: verify complete Luca Cafe frontend workflows"
```

## Task 16: Deployment, Documentation, and Legacy Cleanup

**Files:**
- Replace: `qr-menu-app/README.md`
- Modify: `qr-menu-app/vercel.json`
- Remove after coverage verification: `qr-menu-app/app.js`
- Remove after coverage verification: `qr-menu-app/styles.css`
- Remove after coverage verification: `qr-menu-app/index_standalone.html`
- Remove after coverage verification: `qr-menu-app/manipalMenuData.js`
- Remove after coverage verification: `qr-menu-app/build.ps1`
- Remove after coverage verification: `qr-menu-app/server.ps1`
- Deduplicate after usage verification: `qr-menu-app/logo.png`, `qr-menu-app/assets/logo.png`, `qr-menu-app/images/logo.png`

- [ ] **Step 1: Document local development and demo behavior**

README must include install, dev, test, build, E2E, route list, demo-auth notice, local-storage reset, deployment root, menu source notes, and the production-backend boundary.

- [ ] **Step 2: Configure Vercel SPA routing**

Set the Vercel project root to `qr-menu-app`, build command to `npm run build`, output directory to `dist`, and rewrite non-asset routes to `/index.html`.

- [ ] **Step 3: Verify React coverage before removing legacy files**

Run: `npm run check && npm run test:e2e`

Expected: all six routes and the full order flow pass without loading any legacy source.

- [ ] **Step 4: Remove obsolete sources and duplicate logos**

Delete only the listed legacy files after Step 3 passes. Retain one logo only if the new frontend uses it; otherwise remove all three identical copies.

- [ ] **Step 5: Run final verification**

Run:

```bash
npm run check
npm run test:e2e
git status --short
```

Expected: tests PASS, build succeeds, E2E passes, and only intentional final changes are present.

- [ ] **Step 6: Commit**

```bash
git add qr-menu-app README.md docs/superpowers
git commit -m "feat: complete Luca Cafe frontend rebuild"
```

## Execution Order and Checkpoints

1. Tasks 1–4: foundation checkpoint
2. Task 5: visual-assets checkpoint
3. Tasks 6–9: public/customer checkpoint
4. Tasks 10–12: staff-operations checkpoint
5. Tasks 13–14: management checkpoint
6. Tasks 15–16: release checkpoint

At every checkpoint, run `npm run check`. From Task 15 onward, also run `npm run test:e2e`.
