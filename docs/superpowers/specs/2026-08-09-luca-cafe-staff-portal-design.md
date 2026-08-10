# Luca Cafe Staff Portal Design

Date: 2026-08-09
Status: Approved direction, pending written-spec review

## Objective

Make the existing kitchen, waiter, admin, and QR tools visibly connected within the Luca Cafe website through one dedicated staff entry point.

## Navigation

- Add a clearly visible `Staff Portal` link to the public header.
- Keep a `Staff Portal` link in the public footer.
- Add `/staff` as the shared staff landing route.
- Make the staff-shell Luca mark return to `/staff`.
- Retain the existing direct routes: `/staff/kitchen`, `/staff/waiter`, `/staff/admin`, and `/staff/qr`.

## Portal Experience

`/staff` uses the existing demo PIN gate. After entering PIN `2490`, staff see a warm cream workspace with four role cards:

1. Kitchen Display — manage received, preparing, and ready tickets.
2. Waiter Dispatch — resolve guest requests, deliver orders, and record payment.
3. Admin Dashboard — review operations, menu, tables, staff, and settings.
4. QR Builder — configure, print, and download branded table standees.

Each card has a Lucide icon, concise description, and direct link. The page uses the existing espresso, beige, cream, and restrained glass system. It introduces no new authentication or data model.

## Responsive and Accessible Behavior

- Four cards form a balanced desktop grid and a single-column mobile stack.
- Links retain the 44px minimum interactive target.
- Icons are decorative; card names provide accessible link names.
- Keyboard focus and hover states follow existing shared styles.
- Customers may open `/staff`, but operational content remains behind the explicit demo PIN gate.

## Verification

- A route test confirms `/staff` renders the protected staff entry.
- A portal component test confirms all four role links and descriptions.
- Landing tests confirm header and footer Staff Portal links.
- Existing unit, production-build, four-viewport Playwright, and accessibility suites remain green.
