# Luca Cafe Transparent Liquid Glass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply a transparent, warm liquid-glass material system across Luca Cafe's public, customer, and staff interfaces without reducing readability or changing application behavior.

**Architecture:** Centralize opacity, blur, edge-lighting, reflection, fallback, and motion behavior in the existing design token and glass stylesheets. Feature components opt into light, dark, dense, or interactive glass modifiers through semantic class names, while feature CSS keeps responsibility for layout and component-specific states. Playwright validates real computed transparency and backdrop filtering in a browser; existing unit, accessibility, responsive, workflow, and build checks protect behavior.

**Tech Stack:** React 19, TypeScript, CSS custom properties and backdrop filters, Vitest, Testing Library, Playwright, axe-core, Vite

---

## File Map

- Modify `qr-menu-app/src/design/tokens.css`: define shared glass colors, borders, blur, saturation, shadows, and reflection tokens.
- Modify `qr-menu-app/src/design/glass.css`: implement the four reusable glass materials, browser fallback, mobile tuning, and reduced-motion behavior.
- Modify `qr-menu-app/src/app/styles.css`: move shared buttons, inputs, badges, icon controls, and dialogs onto interactive glass where appropriate.
- Modify `qr-menu-app/src/features/landing/LandingPage.tsx` and `LandingPage.css`: opt public content surfaces into transparent light/dark glass.
- Modify `qr-menu-app/src/features/menu/MenuCard.tsx`, `MenuPage.tsx`, `customer.css`, and cart components/styles: cover customer ordering surfaces with light, dense, and interactive glass.
- Modify `qr-menu-app/src/features/orders/OrderTracker.tsx` and `orders.css`: cover tracker summary and actions while preserving state contrast.
- Modify `qr-menu-app/src/components/layout/StaffShell.tsx`, staff feature TSX files, and their CSS: cover staff navigation, portal cards, operational panels, tickets, forms, and controls.
- Modify `qr-menu-app/src/features/qr/qr.css`: glassify builder controls while preserving the opaque printable standee.
- Modify `qr-menu-app/e2e/app.spec.ts`: verify representative computed glass properties and retain accessibility/responsive workflow coverage.
- Modify focused component tests where semantic class contracts are added.

### Task 1: Build the Shared Transparent Glass Foundation

**Files:**
- Modify: `qr-menu-app/e2e/app.spec.ts`
- Modify: `qr-menu-app/src/design/tokens.css`
- Modify: `qr-menu-app/src/design/glass.css`
- Modify: `qr-menu-app/src/app/styles.css`

- [ ] **Step 1: Add a failing real-browser material assertion**

Add this helper near `assertA11y` in `e2e/app.spec.ts`:

```ts
async function assertTransparentGlass(locator: Locator, maximumAlpha = 0.7) {
  const material = await locator.evaluate((element) => {
    const style = getComputedStyle(element);
    const alphaMatch = style.backgroundColor.match(/rgba?\([^,]+,[^,]+,[^,]+(?:,\s*([\d.]+))?\)/);
    return {
      alpha: alphaMatch?.[1] ? Number(alphaMatch[1]) : 1,
      backdrop: style.backdropFilter || (style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter,
    };
  });
  expect(material.alpha).toBeLessThanOrEqual(maximumAlpha);
  expect(material.backdrop).toContain('blur');
}
```

Import `Locator` from Playwright and add a browser test that checks the public header and landing hero content:

```ts
test('representative surfaces use transparent liquid glass', async ({ page }) => {
  await page.goto('/');
  await assertTransparentGlass(page.locator('.public-header'), 0.42);
  await assertTransparentGlass(page.locator('.landing-hero__content'), 0.42);
});
```

- [ ] **Step 2: Run the new browser test to verify it fails**

Run: `npx playwright test --project=desktop-1440 -g "representative surfaces use transparent liquid glass"`

Expected: FAIL because the current `.glass-panel` background alpha is `0.76`.

- [ ] **Step 3: Add exact material tokens**

Append the following variables inside `:root` in `src/design/tokens.css`:

```css
--glass-light: rgba(255, 253, 248, .34);
--glass-light-hover: rgba(255, 253, 248, .46);
--glass-dense: rgba(255, 253, 248, .68);
--glass-dark: rgba(45, 29, 24, .48);
--glass-dark-hover: rgba(45, 29, 24, .60);
--glass-border-light: rgba(255, 255, 255, .68);
--glass-border-warm: rgba(128, 84, 56, .22);
--glass-blur: 28px;
--glass-blur-mobile: 18px;
--glass-saturation: 1.22;
--glass-shadow: 0 18px 48px rgba(67, 45, 36, .14), 0 3px 10px rgba(67, 45, 36, .08);
```

- [ ] **Step 4: Replace the shared glass implementation**

Update `src/design/glass.css` so the base and modifiers are reusable:

```css
.glass-panel,
.liquid-glass {
  position: relative;
  isolation: isolate;
  background: var(--glass-light);
  border: 1px solid var(--glass-border-light);
  box-shadow: var(--glass-shadow), inset 1px 1px rgba(255,255,255,.64), inset -1px -1px rgba(128,84,56,.08);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
}

.glass-panel::before,
.liquid-glass::before {
  content: '';
  position: absolute;
  z-index: -1;
  inset: 1px 12% auto 5%;
  height: 34%;
  border-radius: inherit;
  background: linear-gradient(120deg, rgba(255,255,255,.42), rgba(255,255,255,0));
  pointer-events: none;
}

.glass-dark,
.liquid-glass--dark {
  background: var(--glass-dark);
  border-color: rgba(255,255,255,.18);
  box-shadow: 0 18px 50px rgba(45,29,24,.22), inset 1px 1px rgba(255,255,255,.16);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(1.12);
  backdrop-filter: blur(var(--glass-blur)) saturate(1.12);
}

.liquid-glass--dense { background: var(--glass-dense); }

.liquid-glass--interactive {
  transition: transform 180ms ease, background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.liquid-glass--interactive:hover {
  transform: translateY(-1px);
  background: var(--glass-light-hover);
  border-color: rgba(255,255,255,.82);
}

.liquid-glass--interactive:active {
  transform: translateY(0);
  box-shadow: 0 8px 20px rgba(67,45,36,.12), inset 1px 1px rgba(255,255,255,.5);
}
```

Retain solid fallbacks, reduce blur under `max-width: 640px`, and disable transforms under `prefers-reduced-motion`.

- [ ] **Step 5: Apply interactive glass to shared controls**

Update `src/app/styles.css` so `.button--secondary`, `.button--ghost`, `.icon-button`, `.badge`, and `.dialog-panel` use the shared transparent tokens and blur behavior. Keep primary, danger, success, warning, and error colors semantically explicit.

- [ ] **Step 6: Run the focused browser test and full unit suite**

Run: `npx playwright test --project=desktop-1440 -g "representative surfaces use transparent liquid glass"`

Expected: PASS with alpha at or below `0.42` and a computed blur.

Run: `npm test`

Expected: all existing Vitest tests PASS.

- [ ] **Step 7: Commit the foundation**

```bash
git add qr-menu-app/e2e/app.spec.ts qr-menu-app/src/design/tokens.css qr-menu-app/src/design/glass.css qr-menu-app/src/app/styles.css
git commit -m "feat: add transparent liquid glass foundation"
```

### Task 2: Glassify the Public and Customer Experience

**Files:**
- Modify: `qr-menu-app/src/features/landing/LandingPage.test.tsx`
- Modify: `qr-menu-app/src/features/landing/LandingPage.tsx`
- Modify: `qr-menu-app/src/features/landing/LandingPage.css`
- Modify: `qr-menu-app/src/features/menu/MenuPage.test.tsx`
- Modify: `qr-menu-app/src/features/menu/MenuPage.tsx`
- Modify: `qr-menu-app/src/features/menu/MenuCard.tsx`
- Modify: `qr-menu-app/src/features/menu/customer.css`
- Modify: `qr-menu-app/src/features/cart/CartSheet.tsx`
- Modify: `qr-menu-app/src/features/orders/OrderTracker.tsx`
- Modify: `qr-menu-app/src/features/orders/orders.css`

- [ ] **Step 1: Write failing semantic material tests**

Add assertions to the landing and menu tests:

```ts
expect(document.querySelectorAll('.combo-card.liquid-glass')).toHaveLength(3);
expect(document.querySelector('.menu-card')).toHaveClass('liquid-glass--dense');
```

- [ ] **Step 2: Run the focused tests to verify they fail**

Run: `npm test -- src/features/landing/LandingPage.test.tsx src/features/menu/MenuPage.test.tsx --reporter=verbose`

Expected: FAIL because combo and menu cards do not yet use liquid-glass classes.

- [ ] **Step 3: Apply semantic material classes in React**

Use these class patterns:

```tsx
<article className={`combo-card combo-card--${index + 1} liquid-glass liquid-glass--interactive`}>
```

```tsx
<article className="menu-card liquid-glass liquid-glass--dense liquid-glass--interactive" aria-labelledby={`menu-item-${item.id}`}>
```

```tsx
<section className="order-summary-card liquid-glass liquid-glass--dark">
```

Apply light or interactive variants to contact actions, table selectors, menu filters/search, category chips, cart sheet surfaces, quantity controls, service actions, and tracker actions. Preserve `.glass-dark` on the cart bar so the shared foundation upgrades it automatically.

- [ ] **Step 4: Remove conflicting opaque feature backgrounds**

In `LandingPage.css`, `customer.css`, and `orders.css`, replace feature-level opaque cream/espresso backgrounds only where the element now uses a liquid-glass class. Preserve food image areas, semantic state fills, and page-level background artwork. Add soft warm radial gradients behind customer pages so transparent surfaces have visible depth to refract.

- [ ] **Step 5: Run focused unit and customer browser journeys**

Run: `npm test -- src/features/landing src/features/menu src/features/cart src/features/orders --reporter=verbose`

Expected: all focused tests PASS.

Run: `npx playwright test --project=desktop-1440 --project=mobile-375 -g "landing and menu|customer can place"`

Expected: customer journeys, accessibility scans, fixed cart visibility, and horizontal-overflow checks PASS.

- [ ] **Step 6: Commit public and customer glass surfaces**

```bash
git add qr-menu-app/src/features/landing qr-menu-app/src/features/menu qr-menu-app/src/features/cart qr-menu-app/src/features/orders
git commit -m "feat: glassify customer cafe experience"
```

### Task 3: Glassify the Staff Portal and Operational Workspaces

**Files:**
- Modify: `qr-menu-app/src/features/staff/StaffPortalPage.test.tsx`
- Modify: `qr-menu-app/src/features/staff/StaffPortalPage.tsx`
- Modify: `qr-menu-app/src/features/staff/staffPortal.css`
- Modify: `qr-menu-app/src/components/layout/StaffShell.tsx`
- Modify: `qr-menu-app/src/features/auth/auth.css`
- Modify: `qr-menu-app/src/features/kitchen/KitchenTicket.tsx`
- Modify: `qr-menu-app/src/features/kitchen/kitchen.css`
- Modify: `qr-menu-app/src/features/waiter/WaiterPage.tsx`
- Modify: `qr-menu-app/src/features/waiter/waiter.css`
- Modify: `qr-menu-app/src/features/admin/AdminPage.tsx`
- Modify: `qr-menu-app/src/features/admin/MenuEditor.tsx`
- Modify: `qr-menu-app/src/features/admin/admin.css`
- Modify: `qr-menu-app/src/features/qr/QrPage.tsx`
- Modify: `qr-menu-app/src/features/qr/qr.css`
- Modify: `qr-menu-app/e2e/app.spec.ts`

- [ ] **Step 1: Extend failing staff material coverage**

Add to `StaffPortalPage.test.tsx`:

```ts
expect(document.querySelectorAll('.staff-workspace.liquid-glass--interactive')).toHaveLength(4);
```

Extend the Playwright glass test after staff login:

```ts
await page.goto('/staff');
await page.getByLabel('Staff PIN').fill('2490');
await page.getByRole('button', { name: 'Enter workspace' }).click();
await assertTransparentGlass(page.locator('.staff-portal__intro'), 0.42);
await assertTransparentGlass(page.locator('.staff-workspace').first(), 0.7);
```

- [ ] **Step 2: Run staff tests to verify they fail**

Run: `npm test -- src/features/staff/StaffPortalPage.test.tsx --reporter=verbose`

Expected: FAIL because staff workspace links do not yet use the interactive material modifier.

- [ ] **Step 3: Apply glass classes across staff React components**

Use dense glass on operational cards and interactive glass on controls:

```tsx
<Link className="staff-workspace liquid-glass liquid-glass--interactive" ...>
```

```tsx
<article className={`kitchen-ticket liquid-glass liquid-glass--dense ${overdue ? 'is-overdue' : ''}`}>
```

Add equivalent classes to waiter request/pickup/table cards, admin metrics/panels/menu rows/table/staff cards, and QR builder controls. Upgrade `.staff-sidebar` with the dark material class while keeping active navigation explicit.

- [ ] **Step 4: Resolve staff CSS conflicts and preserve dense-state clarity**

Remove opaque backgrounds from elements now controlled by liquid-glass utilities. Keep warning, overdue, ready, payment, and validation state colors. Add warm radial page backgrounds behind the workspaces. In `qr.css`, do not add glass classes to `#qr-standee`, `.qr-code`, or printed descendants; add a print override that removes backdrop filters from builder-only elements.

- [ ] **Step 5: Run focused staff tests and browser flows**

Run: `npm test -- src/features/staff src/features/auth src/features/kitchen src/features/waiter src/features/admin src/features/qr --reporter=verbose`

Expected: all focused staff tests PASS.

Run: `npx playwright test --project=desktop-1440 --project=mobile-375 -g "staff PIN|representative surfaces"`

Expected: staff login, portal, all four workspaces, accessibility scans, QR rendering, transparency checks, and overflow checks PASS.

- [ ] **Step 6: Commit staff glass surfaces**

```bash
git add qr-menu-app/src/components/layout/StaffShell.tsx qr-menu-app/src/features/auth qr-menu-app/src/features/staff qr-menu-app/src/features/kitchen qr-menu-app/src/features/waiter qr-menu-app/src/features/admin qr-menu-app/src/features/qr qr-menu-app/e2e/app.spec.ts
git commit -m "feat: glassify staff operations"
```

### Task 4: Complete Cross-Viewport Verification and Release Review

**Files:**
- Verify: `qr-menu-app/src/**/*`
- Verify: `qr-menu-app/e2e/app.spec.ts`

- [ ] **Step 1: Run the full verification command**

Run: `npm run check`

Expected: all Vitest tests PASS and `tsc -b && vite build` completes successfully.

- [ ] **Step 2: Run all configured browser acceptance projects**

Run: `npm run test:e2e`

Expected: all 12 existing journeys plus the four-viewport glass coverage PASS with no axe violations or overflow failures.

- [ ] **Step 3: Inspect representative screens**

Review `/`, `/menu?table=1`, `/orders`, `/staff`, `/staff/kitchen`, `/staff/waiter`, `/staff/admin`, and `/staff/qr` at 1440 and 375 pixels. Confirm transparent backgrounds reveal page depth, text remains readable, focus rings remain visible, dense tickets remain scannable, and the QR standee stays opaque.

- [ ] **Step 4: Validate the final diff**

Run: `git diff --check`

Expected: no whitespace errors.

Run: `git status --short`

Expected: only any explicitly preserved pre-existing user files remain outside the liquid-glass commits.

- [ ] **Step 5: Record any final verification-only adjustments**

If inspection requires a scoped contrast or overflow correction, update the responsible feature stylesheet, rerun the affected focused test and browser project, then commit:

```bash
git add qr-menu-app/src qr-menu-app/e2e
git commit -m "fix: refine liquid glass readability"
```
