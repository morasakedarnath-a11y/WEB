# Luca Cafe Transparent Liquid Glass Design

## Goal

Extend Luca Cafe's existing brown, beige, and cream interface into a transparent liquid-glass material system across the customer and staff experiences. The result should feel tactile and atmospheric while preserving food photography, operational readability, accessibility, and mobile performance.

## Visual Direction

The interface will use genuinely transparent glass rather than opaque frosted cards. Warm cream and espresso tints will keep the material connected to the cafe palette. Glass depth will come from backdrop refraction, tonal borders, curved edge highlights, and restrained shadows—not decorative glow or excessive floating animation.

The system will use three related materials:

1. **Light liquid glass:** a 34% warm cream base for public headers, hero content, filters, dialogs, selectors, and light content panels.
2. **Dark liquid glass:** a 48% espresso base for floating calls to action, dark navigation, and high-contrast overlays.
3. **Dense liquid glass:** a 68% warm cream base for operational tickets and text-heavy panels.
4. **Interactive liquid glass:** a compact variation for buttons, chips, navigation links, and workspace controls, with quiet hover and pressed-state refraction.

## Surface Coverage

The upgraded materials will apply throughout the website:

- public, customer, order-tracker, and staff navigation;
- landing hero content, category labels, combo surfaces, and contact actions;
- table selector, menu filter controls, menu cards, and cart bar;
- dialogs, checkout surfaces, order tracking, and service actions;
- staff login, staff portal, kitchen, waiter, admin, and QR-builder controls;
- staff workspace cards and major dashboard panels.

Dense operational content such as kitchen tickets, order line items, editable admin data, and payment controls will use a higher-opacity glass variant. This keeps text and states legible without visually breaking the system. The QR standee's printable region will remain opaque so printed codes and copy stay reliable.

## Material Architecture

The shared design layer will define reusable glass tokens and utilities rather than duplicating blur and transparency rules across feature stylesheets. Existing `.glass-panel` and `.glass-dark` classes will be upgraded, then additional modifiers will cover dense and interactive surfaces.

Each glass surface will combine:

- a transparent warm tint;
- backdrop blur and restrained saturation;
- a light-facing top/left edge and quieter opposite edge;
- a subtle inset highlight that suggests material thickness;
- a grounded shadow appropriate to its elevation;
- a curved liquid reflection on large and floating surfaces; compact dense controls omit this reflection to preserve scan clarity.

Feature styles will opt into these shared materials while keeping their existing layout and component responsibilities unchanged.

## Interaction and Motion

Interactive glass will respond with small tint, border, and highlight changes. Hover movement will be limited to one or two pixels and will never delay navigation or operational actions. Pressed states will reduce elevation and strengthen the near edge for clear tactile feedback.

All nonessential movement will be disabled under `prefers-reduced-motion`. No cursor-following effects, continuous shimmer, or large parallax animations will be introduced.

## Responsive and Compatibility Rules

Mobile devices will use slightly reduced blur and simpler reflections to limit rendering cost. The composition will continue to reflow using the existing responsive layouts rather than shrinking desktop glass panels.

Browsers without backdrop-filter support will receive high-opacity warm cream or espresso surfaces with the same borders and hierarchy. Text contrast must remain compliant in both enhanced and fallback modes.

## Accessibility and Readability

Transparency will not carry meaning by itself. Status colors, labels, borders, and icons remain explicit. Focus rings must remain visible over every glass material. Text-heavy and high-consequence operational surfaces may use greater opacity than decorative public surfaces.

Automated accessibility scans, horizontal-overflow checks, and browser journeys will run at 1440, 1024, 768, and 375 pixel viewports. The full unit and production build checks must also remain green.

## Testing Strategy

- Add focused tests only where new class or structural contracts need protection.
- Keep existing route, ordering, staff workflow, and accessibility acceptance tests.
- Extend browser assertions to verify the shared glass classes are present on representative public, customer, and staff surfaces.
- Run the full unit suite, TypeScript production build, browser acceptance suite, and whitespace validation before completion.

## Out of Scope

- Changing Luca Cafe's approved palette, typography, menu, content, roles, or application flows.
- Adding WebGL, canvas distortion, cursor-tracking refraction, or third-party visual-effect libraries.
- Making QR print output transparent.
- Implementing backend authentication or persistence changes.
