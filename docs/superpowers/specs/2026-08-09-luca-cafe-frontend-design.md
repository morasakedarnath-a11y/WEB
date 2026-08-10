# Luca Cafe Full Frontend Design

Date: 2026-08-09
Status: Approved design

## 1. Objective

Replace the existing static restaurant prototype with a production-quality, API-ready React frontend for Luca Cafe. The completed frontend covers the public landing page, table ordering, kitchen display, waiter dispatch, administration, and QR generation. It uses a brown, beige, and cream visual system with restrained Apple-style translucent glass.

The project remains frontend-only for this phase. Data operations pass through service interfaces backed by a local demo adapter, allowing a future backend adapter to replace local persistence without rewriting page components.

## 2. Confirmed Decisions

- Brand: Luca Cafe
- Framework: React with Vite
- Visual direction: Warm Liquid Glass Bistro
- Scope: landing page, customer ordering, kitchen KDS, waiter dispatch, admin dashboard, and QR builder
- Data mode: API-ready demo services with local persistence
- Imagery: cohesive generated café photography stored locally
- Combo behavior: fixed curated products, not build-your-own bundles
- Currency: Indian rupees
- Cafe phone: 0820 3559195
- Location copy: Manipal, Karnataka

## 3. Information Architecture

| Route | Audience | Purpose |
| --- | --- | --- |
| `/` | Public | Luca Cafe marketing and discovery landing page |
| `/menu?table=1` | Customer | Table-aware menu, cart, ordering, tracking, and service requests |
| `/kitchen` | Kitchen staff | Live order preparation workflow |
| `/waiter` | Floor staff | Ready-order pickup, service requests, bills, and table status |
| `/admin` | Managers | Business overview, menu, orders, tables, staff, and settings |
| `/qr` | Managers | Table QR and branded standee generation |

Staff routes use a demo authentication gate implemented behind an authentication service interface. The local PIN is explicitly demo-only and must not be represented as production security.

## 4. Application Architecture

The Vite application will use:

- React Router for route boundaries
- feature folders for landing, menu, cart, ordering, kitchen, waiter, admin, and QR
- shared UI primitives for buttons, fields, dialogs, sheets, badges, navigation, empty states, and feedback
- design tokens for color, type, spacing, radii, shadow, glass, and motion
- application providers for session, menu, cart, orders, tables, and notifications
- pure pricing and status-transition utilities
- service interfaces with a local-storage demo adapter

Components must not access `localStorage` directly. The adapters own serialization, recovery, versioning, and seed-data reset.

The existing static prototype remains available in Git history but is replaced as the shipped application. The obsolete duplicated HTML, JavaScript, CSS, and menu modules are removed only after the React implementation covers their required behavior.

## 5. Visual System

### Visual thesis

Luca Cafe should feel warm, tactile, appetizing, and quietly premium. Cream and natural paper tones create the base; espresso typography and caramel accents provide structure. Translucent glass suggests modern hospitality without making food cards or operational dashboards difficult to read.

### Core palette

| Role | Value |
| --- | --- |
| Page background | `#F7F0E6` |
| Primary surface | `#FFFDF8` |
| Espresso text | `#35241D` |
| Cocoa | `#624536` |
| Caramel accent | `#A66A3F` |
| Latte beige | `#D8C1A9` |
| Muted text | `#76675E` |
| Olive success | `#62734A` |
| Amber warning | `#A8662E` |
| Terracotta error | `#A84936` |

### Glass treatment

- translucent cream fills rather than blue-grey glass
- 20–28px backdrop blur on stable overlay layers
- subtle white top-edge highlight
- warm low-opacity border
- compact ambient shadow plus a tighter edge shadow
- fallback opaque cream surface when backdrop blur is unsupported

Glass is used for headers, floating navigation, category rails, sheets, dialogs, the cart bar, and selected landing overlays. Menu cards, ticket cards, dense lists, and forms use mostly opaque surfaces.

### Typography and iconography

- Editorial serif for large public-facing headlines
- Highly legible sans-serif for navigation, menu data, forms, and operations
- Tabular numerals for prices, timers, bills, and metrics
- Lucide icons with one consistent stroke style
- Emoji may appear in friendly copy but not as structural navigation icons

### Motion

- 150–250ms interaction transitions
- stable component geometry during hover and pressed states
- light sheet and dialog transitions
- no continuous decorative animation
- `prefers-reduced-motion` disables nonessential movement

## 6. Generated Image Set

Generate and store a cohesive local image family for:

1. landing-page café hero
2. pizza
3. pasta
4. sandwiches and breads
5. coffee, tea, and matcha
6. iced refreshers, smoothies, and frappes
7. sundaes and pastries
8. group combo spread

Images share warm side lighting, cream ceramics, walnut surfaces, natural shadows, shallow depth of field, and editorial composition. They contain no text, logos, watermarks, or misleading portion labels. Responsive AVIF/WebP derivatives are used where practical.

## 7. Public Landing Page

The landing page contains:

1. floating glass navigation with Luca Cafe wordmark
2. editorial hero with `Explore Menu` and `Order at Your Table` actions
3. the three fixed combo offers
4. menu-category preview
5. café atmosphere/story section
6. visit/contact area using Manipal, Karnataka and 0820 3559195
7. footer with customer and discreet staff links

No unverified address, opening hours, social handle, rating, or service-time claim is displayed.

## 8. Customer Ordering Experience

The route reads the table number from the query string. Missing or invalid table identifiers produce a clear table-selection state rather than silently assigning a table.

The menu experience includes:

- compact header with Luca Cafe, current table, server request, and cart
- sticky search and horizontally scrollable category navigation
- vegetarian/non-vegetarian filter
- category sections with compact mobile-first menu cards
- availability, dietary, and bestseller indicators
- product sheet for required and optional choices
- quantity controls and cooking/allergy notes
- glass cart bar and cart sheet
- subtotal, GST, and total calculation
- duplicate-safe order submission
- order confirmation and status tracker
- additional ordering rounds
- call waiter, request water, and request bill actions

Required product choices must be completed before an item can be added. Customer-entered data remains intact after validation or storage failure.

## 9. Luca Cafe Menu Catalog

Spelling is normalized for the digital menu while preserving product meaning. The catalog contains every clearly readable menu item from the supplied photographs. Where two photographed boards conflict, the newer dedicated coffee/tea board price is used; distinct names remain separate products.

### Fixed combos

| Product | Price | Included items |
| --- | ---: | --- |
| I Am Alone | ₹249 | Paneer Ghee Roast Pizza, Ice Cold Coffee, 1 Pastry of the Day |
| We Are Together | ₹399 | Alfredo Penne Pasta (Veg), 2 Ice Cold Coffees, 2 Pastries of the Day |
| We Are a Group | ₹799 | Paneer Chilli Pizza, Arrabbiata Penne Pasta (Veg), 4 Classic Mojitos, 4 Pastries of the Day |

`Pastry of the Day` is marked as subject to availability. These products have no customer substitutions in this phase.

### Pizza — ₹159 each

- Ghee Roast Pizza — Paneer or Chicken
- Chilli Pizza — Paneer or Chicken
- Manchurian Pizza — Paneer or Chicken
- Peri-Peri Pizza — Paneer or Chicken

### Pasta — ₹189 each

Each pasta supports Penne or Macaroni and Veg or Chicken.

- Alfredo Pasta
- Mac & Cheese
- Arrabbiata Pasta

### Sandwiches and sliders

- Club Sandwich — ₹149
- Panino Veg Sandwich — ₹159
- Panino Chicken Sandwich — ₹179
- Zinger Chicken Sandwich — ₹179
- Veg Mini Sliders, 4 pieces — ₹99
- Chicken Mini Sliders, 4 pieces — ₹99

### Breads

- Cheese Chilli Toast — Veg or Chicken — ₹99
- Cheese Garlic Bread — ₹99
- Butter Garlic Bread — ₹99

### Sundaes

- Choco Lava Fudge — ₹120
- Death by Chocolate Sundae — ₹150
- Hot Chocolate Fudge — ₹120
- Hot Brownie Fudge — ₹160
- Red Velvet Fudge — ₹150
- Choco Doughnut Fudge — ₹140
- Mud Cake Fudge — ₹150
- Tiramisu — ₹150

### Smoothies

- Oreo — ₹120
- Vanilla — ₹120
- Red Velvet — ₹130
- Kit Kat — ₹130
- Butterscotch — ₹130
- Belgian Chocolate — ₹140
- Nutella — ₹140
- Brownie — ₹150

### Iced refreshers

- Iced Lemon Tea — ₹100
- Iced Cold Coffee — ₹110
- Cranberry Mojito — ₹130
- Orange Mojito — ₹130
- Pineapple Mojito — ₹130
- Mango Mojito — ₹130
- Classic Mojito — ₹130
- Cola Float — ₹130
- Orange Float — ₹130
- Lemonade Float — ₹130

### Coffee, tea, and hot chocolate

- Black Coffee — ₹50
- Americano — ₹60
- Cafe Latte — ₹90
- Cafe Mocha — ₹80
- Mocha Latte — ₹120
- Hot Chocolate — ₹90
- Black Tea — ₹60
- Green Tea — ₹70
- Lemon Tea — ₹70

### Matcha

- Flavored Matcha — ₹160
- Matcha Latte — ₹150
- Strawberry Matcha Latte — ₹160
- Caramel Matcha Latte — ₹180
- Spanish Matcha Latte — ₹180

### Frappes

- Choco Chip Frappe — ₹180
- Biscoff Cream Frappe — ₹190
- Nutella Frappe — ₹190
- Salted Caramel Frappe — ₹180

### Pastries

Pastries are represented as `Pastry of the Day`, with availability controlled by the admin interface. No individual pastry names or prices are invented because the supplied menu states only “as per availability.”

## 10. Kitchen Display System

The KDS provides New, Preparing, Ready, and Completed columns. Tickets show table, order ID, elapsed time, quantities, selected choices, and highly visible allergy/cooking notes. One primary action advances each ticket. Overdue orders gain stronger warning treatment without continuous animation.

## 11. Waiter Dispatch

The waiter interface combines:

- pending assistance requests
- ready-for-pickup orders
- active table bills
- table occupancy and status

Waiters can resolve requests, mark orders delivered, and request or record payment completion in demo state. Destructive or bill-clearing actions require confirmation.

## 12. Admin Dashboard

The admin experience includes:

- revenue, order count, average bill, and occupied-table metrics
- live order list and status controls
- menu search and availability controls
- create/edit menu item form in demo state
- table status and bill management
- staff overview
- cafe, tax, contact, and QR settings
- explicit demo-data reset

Metrics derive only from the local demo order data and are labelled accordingly.

## 13. QR Builder

The QR builder supports table selection, base URL, heading, instruction text, optional guest Wi-Fi fields, live standee preview, print, and download. It uses the same Luca Cafe design tokens and contains no external QR-image dependency. QR content resolves to `/menu?table=<id>`.

## 14. State and Service Interfaces

The frontend defines service contracts for:

- authentication
- menu and categories
- orders and status history
- tables
- service requests
- staff
- cafe and QR settings

The local adapter seeds deterministic demo data, persists versioned state, validates reads, and can reset to the initial seed. Cross-tab synchronization uses browser storage events or BroadcastChannel behind the adapter, not inside components.

Order IDs use collision-resistant browser-generated identifiers. Status changes are recorded with timestamps. Pricing calculations use integer rupees and pure functions.

## 15. Error and Empty States

Each asynchronous or persistence-backed action supports loading, empty, success, validation-error, storage-error, offline, and retry states. The application provides:

- route-level error boundary
- broken-image fallback
- empty search results
- invalid-table state
- cart validation
- order-submission lock
- storage recovery message
- reconnect indicator for a future network adapter

Failures never clear customer input or display a false success confirmation.

## 16. Accessibility and Responsive Behavior

- semantic landmarks and sequential headings
- labelled form controls and icon buttons
- dialog semantics, focus trap, Escape close, and focus restoration
- keyboard-operable menus, filters, tables, and sheets
- live-region announcements for order status and service feedback
- minimum 44 by 44 pixel touch targets
- pinch zoom enabled
- color-independent status communication
- WCAG AA text contrast
- reduced-motion support
- safe-area-aware fixed controls
- glass fallbacks for unsupported or reduced-transparency contexts

The interface is verified at 375px, 768px, 1024px, and wide desktop widths. Staff screens use dense desktop layouts and deliberate mobile recomposition.

## 17. Performance

- route-level code splitting
- lazy-loaded responsive imagery
- local image assets with optimized formats
- blur restricted to stable, limited layers
- memoized derived menu and dashboard data where measurement shows value
- no external menu-image, QR-image, font-icon, or demo-data API dependency

## 18. Testing and Acceptance Criteria

Automated coverage includes:

- unit tests for prices, GST, combo contents, cart quantities, table parsing, and valid order transitions
- component tests for filters, item choices, cart, dialogs, KDS actions, waiter actions, admin availability, and QR controls
- route tests for all six surfaces
- end-to-end customer order through kitchen, waiter delivery, and paid completion
- accessibility checks for critical screens
- successful production build

Acceptance requires:

1. all catalog items above are searchable and visible in the correct category
2. all three fixed combos contain the approved quantities and prices
3. each route renders and its primary interactions work from local demo data
4. refreshing restores demo state without corrupting the cart or orders
5. no customer action reports success after a failed write
6. all major controls are keyboard accessible
7. the layout is usable at the four target widths
8. generated images are local, optimized, coherent, and free of embedded text
9. the production build and automated tests pass

## 19. Delivery Boundaries

This phase delivers the complete frontend and local demo behavior. It does not deliver a production backend, real staff security, payment processing, SMS/push notifications, inventory accounting, or third-party POS integration. The service boundaries are designed so those capabilities can be added later.
