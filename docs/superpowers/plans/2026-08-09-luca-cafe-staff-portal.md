# Luca Cafe Staff Portal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one clearly linked, PIN-protected staff portal that connects Luca Cafe’s kitchen, waiter, admin, and QR workspaces.

**Architecture:** A focused `StaffPortalPage` feature renders role metadata as accessible React Router links inside the existing `StaffGate` and `StaffShell`. Public and staff navigation point to `/staff`; no service contract, authentication behavior, or operational data flow changes.

**Tech Stack:** React, TypeScript, React Router, Lucide React, CSS, Vitest, Testing Library, Playwright, Axe.

---

## File Structure

- Create `qr-menu-app/src/features/staff/StaffPortalPage.tsx` for portal content and role-link metadata.
- Create `qr-menu-app/src/features/staff/staffPortal.css` for responsive portal composition.
- Create `qr-menu-app/src/features/staff/StaffPortalPage.test.tsx` for card-link coverage.
- Modify `qr-menu-app/src/app/App.tsx` to register protected `/staff`.
- Modify `qr-menu-app/src/app/App.test.tsx` to cover the portal route.
- Modify `qr-menu-app/src/components/layout/PublicHeader.tsx` and `StaffShell.tsx` to expose the portal.
- Modify `qr-menu-app/src/features/landing/LandingPage.tsx` and its test to retain a clear footer entry.
- Modify `qr-menu-app/e2e/app.spec.ts` to verify public-to-staff navigation and portal accessibility.

### Task 1: Build the Protected Staff Portal

**Files:**
- Create: `qr-menu-app/src/features/staff/StaffPortalPage.test.tsx`
- Create: `qr-menu-app/src/features/staff/StaffPortalPage.tsx`
- Create: `qr-menu-app/src/features/staff/staffPortal.css`
- Modify: `qr-menu-app/src/app/App.tsx`
- Modify: `qr-menu-app/src/app/App.test.tsx`

- [ ] **Step 1: Write the failing portal test**

Render `StaffPortalPage` in a `MemoryRouter` and assert the heading `Staff Portal` plus exact links to `/staff/kitchen`, `/staff/waiter`, `/staff/admin`, and `/staff/qr`.

```tsx
expect(screen.getByRole('link', { name: /Open kitchen display/i })).toHaveAttribute('href', '/staff/kitchen');
expect(screen.getByRole('link', { name: /Open waiter dispatch/i })).toHaveAttribute('href', '/staff/waiter');
expect(screen.getByRole('link', { name: /Open admin dashboard/i })).toHaveAttribute('href', '/staff/admin');
expect(screen.getByRole('link', { name: /Open QR builder/i })).toHaveAttribute('href', '/staff/qr');
```

- [ ] **Step 2: Verify the test fails**

Run: `npm test -- src/features/staff/StaffPortalPage.test.tsx --reporter=verbose`

Expected: FAIL because `StaffPortalPage` does not exist.

- [ ] **Step 3: Implement the portal**

Create a semantic page with an eyebrow, `Staff Portal` heading, introductory copy, and four card links. Use `ChefHat`, `HandPlatter`, `LayoutDashboard`, and `QrCode`; set icons `aria-hidden="true"`. Each card includes role purpose and a visible `Open workspace` action. Use a two-column desktop grid and one-column mobile stack with opaque cream cards and restrained glass only in the page introduction.

- [ ] **Step 4: Wire the protected route**

Import `StaffPortalPage` into `App.tsx` and add:

```tsx
<Route path="/staff" element={<StaffRoute><StaffPortalPage /></StaffRoute>} />
```

Add `['/staff', 'Demo staff access']` to the unauthenticated route smoke test so the PIN boundary is verified.

- [ ] **Step 5: Verify portal tests pass**

Run: `npm test -- src/features/staff src/app --reporter=verbose`

Expected: portal and route tests PASS.

### Task 2: Connect Public and Staff Navigation

**Files:**
- Modify: `qr-menu-app/src/components/layout/PublicHeader.tsx`
- Modify: `qr-menu-app/src/components/layout/StaffShell.tsx`
- Modify: `qr-menu-app/src/features/landing/LandingPage.tsx`
- Modify: `qr-menu-app/src/features/landing/LandingPage.test.tsx`

- [ ] **Step 1: Extend the failing landing test**

Assert that both public navigation regions expose `/staff` without changing the customer menu links:

```tsx
expect(screen.getByRole('link', { name: 'Staff Portal' })).toHaveAttribute('href', '/staff');
expect(screen.getByRole('contentinfo').getByRole('link', { name: 'Staff Portal' })).toHaveAttribute('href', '/staff');
```

Use `getAllByRole` or scoped `within` queries where the same accessible name intentionally occurs twice.

- [ ] **Step 2: Verify the navigation test fails**

Run: `npm test -- src/features/landing/LandingPage.test.tsx --reporter=verbose`

Expected: FAIL because the header has no portal link and the footer still says `Staff access`.

- [ ] **Step 3: Implement all portal links**

Add `Staff Portal` linking to `/staff` in `PublicHeader`. Rename the footer’s `Staff access` link to `Staff Portal` and point it to `/staff`. Change the `StaffShell` brand destination from `/` to `/staff`, keeping the public site accessible through normal browser navigation and the staff logout flow.

- [ ] **Step 4: Verify navigation tests pass**

Run: `npm test -- src/features/landing src/features/staff src/app --reporter=verbose`

Expected: all selected tests PASS.

### Task 3: Browser Acceptance and Final Verification

**Files:**
- Modify: `qr-menu-app/e2e/app.spec.ts`

- [ ] **Step 1: Extend the browser test**

From the public landing page, follow `Staff Portal`, enter PIN `2490`, assert all four portal cards, run the existing Axe helper, and open Kitchen from its role card. Confirm the existing sidebar can still navigate among Waiter, Admin, and QR Builder.

- [ ] **Step 2: Run the exact browser matrix**

Run: `npm run test:e2e`

Expected: 12/12 tests PASS at 1440×900, 1024×768, 768×1024, and 375×812.

- [ ] **Step 3: Run the complete command gate**

Run: `npm run check && git diff --check`

Expected: 0 unit/component failures, successful TypeScript/Vite build, and no whitespace errors.

- [ ] **Step 4: Commit**

```bash
git add qr-menu-app
git commit -m "feat: add connected Luca Cafe staff portal"
```
