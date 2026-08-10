# Luca Cafe Per-Item Menu Photography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate, optimize, and integrate one accurate, unique photograph for each of Luca Cafe's 64 menu entries.

**Architecture:** Generate each image independently with one shared art-direction prompt and a product-specific subject description, then store the optimized WebP under a deterministic item-ID filename. Keep category preview images unchanged; update `makeItem` to derive each menu-card image from its item ID. A filesystem-backed catalog test enforces unique paths, filename conventions, and complete asset coverage.

**Tech Stack:** OpenAI image generation, macOS `sips`, WebP, React 19, TypeScript, Vitest, Testing Library, Playwright, Vite

---

## File Map

- Create `qr-menu-app/public/images/menu/*.webp`: 64 unique item and combo photographs using the exact filenames enumerated in Tasks 1–5.
- Modify `qr-menu-app/src/domain/catalog.ts`: assign deterministic per-item image paths.
- Create `qr-menu-app/src/domain/catalogImages.test.ts`: enforce path uniqueness and file existence.
- Modify `qr-menu-app/e2e/app.spec.ts`: verify menu images load without invoking the fallback.

## Shared Generation Contract

Use the exact item description listed in each task as the second sentence of this shared art-direction prompt:

```text
Realistic editorial cafe food photography. One clear serving as the hero subject. Warm natural window light, soft directional shadows, espresso-brown wood or warm stone tabletop, cream ceramic or clear glass appropriate to the product, refined but believable Indian cafe presentation, tactile food texture, subtle film grain, appetizing natural colour. Landscape 3:2 composition, subject centered with safe crop space, slightly elevated three-quarter camera angle. No people, no hands, no logo, no branding, no packaging, no watermark, no menu, no letters, no words, no text.
```

For every accepted generation, save the source output temporarily, then convert and resize it:

```bash
sips -s format webp -z 800 1200 <source-image> --out qr-menu-app/public/images/menu/<item-id>.webp
```

Inspect the output before accepting it. The named product must be visually recognizable, contain no text, and remain distinct from every sibling in its category.

### Task 1: Generate Combos, Pizza, Pasta, Sandwiches, and Breads

**Files:**
- Create: `qr-menu-app/public/images/menu/combo-alone.webp`
- Create: `qr-menu-app/public/images/menu/combo-together.webp`
- Create: `qr-menu-app/public/images/menu/combo-group.webp`
- Create: `qr-menu-app/public/images/menu/pizza-*.webp`
- Create: `qr-menu-app/public/images/menu/pasta-*.webp`
- Create: `qr-menu-app/public/images/menu/sandwich-*.webp`
- Create: `qr-menu-app/public/images/menu/sliders-*.webp`
- Create: `qr-menu-app/public/images/menu/bread-*.webp`

- [ ] **Step 1: Create the destination directory**

Run: `mkdir -p qr-menu-app/public/images/menu`

Expected: the item-image directory exists without changing current catalog behavior.

- [ ] **Step 2: Generate the three combo photographs**

Generate these exact subjects with the shared contract:

- `combo-alone`: one small pizza, one iced cold coffee, and one pastry arranged as a single-person cafe set.
- `combo-together`: one creamy pasta plate, two cold cafe drinks, and two pastries arranged for two guests.
- `combo-group`: one pizza, one red-sauce pasta, four mojitos, and four assorted pastries arranged as a generous group spread.

- [ ] **Step 3: Generate the pizza and pasta photographs**

Generate:

- `pizza-ghee-roast`: cheese pizza topped with visible orange-red ghee-roast masala and paneer pieces.
- `pizza-chilli`: cheese pizza with green chilli, peppers, and paneer.
- `pizza-manchurian`: cheese pizza topped with glazed vegetable Manchurian pieces, scallions, and peppers.
- `pizza-peri-peri`: smoky peri-peri cheese pizza with red seasoning, peppers, and paneer.
- `pasta-alfredo`: creamy white Alfredo penne with herbs and parmesan.
- `pasta-mac-cheese`: golden macaroni in thick glossy cheese sauce with a lightly browned top.
- `pasta-arrabbiata`: penne in vivid tomato-red arrabbiata sauce with garlic, chilli, and basil.

- [ ] **Step 4: Generate sandwich, slider, and bread photographs**

Generate:

- `sandwich-club`: toasted triangular triple-layer club sandwich with vegetables and fries.
- `sandwich-panino-veg`: pressed ridged panino filled with grilled vegetables and melted cheese.
- `sandwich-panino-chicken`: pressed ridged panino with chicken, peppers, and melted cheese.
- `sandwich-zinger`: crunchy chicken sandwich with lettuce and creamy sauce.
- `sliders-veg`: four small vegetable and cheese sliders in a row.
- `sliders-chicken`: four small chicken sliders in a row.
- `bread-chilli-toast`: cheese chilli toast with green chilli and browned bubbling cheese.
- `bread-cheese-garlic`: sliced garlic bread covered with melted cheese and herbs.
- `bread-butter-garlic`: golden butter garlic bread slices with parsley and crisp edges.

- [ ] **Step 5: Validate filenames, dimensions, and batch uniqueness**

Run: `find qr-menu-app/public/images/menu -type f -name '*.webp' | sort`

Expected: exactly 19 files from this task, each named above.

Run: `sips -g pixelWidth -g pixelHeight qr-menu-app/public/images/menu/*.webp`

Expected: every asset reports 1200 by 800 pixels.

- [ ] **Step 6: Commit the savoury assets**

```bash
git add qr-menu-app/public/images/menu
git commit -m "assets: add unique savoury menu photography"
```

### Task 2: Generate Sundaes, Pastries, and Smoothies

**Files:**
- Create: `qr-menu-app/public/images/menu/sundae-*.webp`
- Create: `qr-menu-app/public/images/menu/pastry-of-day.webp`
- Create: `qr-menu-app/public/images/menu/smoothie-*.webp`

- [ ] **Step 1: Generate the sundae photographs**

Generate:

- `sundae-choco-lava`: warm chocolate lava cake split open beside vanilla ice cream and fudge sauce.
- `sundae-death-chocolate`: tall chocolate sundae with chocolate ice cream, brownie pieces, sauce, and curls.
- `sundae-hot-chocolate`: vanilla ice cream sundae covered in glossy hot chocolate fudge.
- `sundae-hot-brownie`: warm brownie topped with vanilla ice cream and chocolate fudge.
- `sundae-red-velvet`: red velvet cake pieces, vanilla ice cream, and dark fudge in a dessert glass.
- `sundae-doughnut`: chocolate doughnut with vanilla ice cream and fudge drizzle.
- `sundae-mud-cake`: dense dark mud cake with ice cream and thick fudge sauce.
- `sundae-tiramisu`: neat cocoa-dusted tiramisu slice with visible mascarpone layers.

- [ ] **Step 2: Generate the smoothie photographs**

Generate eight thick chilled smoothies in distinct clear cafe glasses:

- `smoothie-oreo`: pale cookies-and-cream smoothie with dark cookie crumbs.
- `smoothie-vanilla`: ivory vanilla smoothie with a subtle vanilla-bean garnish.
- `smoothie-red-velvet`: deep red smoothie with cream and red cake crumbs.
- `smoothie-kit-kat`: chocolate smoothie with wafer pieces.
- `smoothie-butterscotch`: caramel-gold smoothie with butterscotch drizzle.
- `smoothie-belgian-chocolate`: deep dark chocolate smoothie with chocolate curls.
- `smoothie-nutella`: hazelnut-chocolate smoothie with toasted hazelnuts.
- `smoothie-brownie`: chocolate smoothie topped with brownie pieces.

- [ ] **Step 3: Generate the variable pastry photograph**

Generate `pastry-of-day` as a small refined assortment containing a chocolate pastry, fruit tart, croissant, and cream cake slice on one cream serving tray.

- [ ] **Step 4: Validate and commit the dessert batch**

Run: `find qr-menu-app/public/images/menu -type f -name '*.webp' | wc -l`

Expected: `36` total assets after Tasks 1 and 2.

```bash
git add qr-menu-app/public/images/menu
git commit -m "assets: add unique dessert menu photography"
```

### Task 3: Generate Iced Refreshers

**Files:**
- Create: `qr-menu-app/public/images/menu/iced-*.webp`
- Create: `qr-menu-app/public/images/menu/mojito-*.webp`
- Create: `qr-menu-app/public/images/menu/float-*.webp`

- [ ] **Step 1: Generate iced tea and coffee**

Generate:

- `iced-lemon-tea`: amber iced tea with lemon wheels, condensation, and ice.
- `iced-cold-coffee`: creamy tan cold coffee over ice in a tall clear glass.

- [ ] **Step 2: Generate five visually distinct mojitos**

Each uses a tall clear glass, crushed ice, mint, lime, and soda, with the named fruit visibly defining the colour:

- `mojito-cranberry`: ruby-red cranberry.
- `mojito-orange`: bright orange citrus.
- `mojito-pineapple`: pale golden pineapple.
- `mojito-mango`: saturated mango-yellow.
- `mojito-classic`: clear sparkling lime and mint.

- [ ] **Step 3: Generate three floats**

Generate:

- `float-cola`: dark cola with a large vanilla ice cream scoop and foam.
- `float-orange`: bright orange soda with vanilla ice cream and orange foam.
- `float-lemonade`: pale lemon soda with vanilla ice cream and lemon garnish.

- [ ] **Step 4: Validate and commit the refresher batch**

Run: `find qr-menu-app/public/images/menu -type f -name '*.webp' | wc -l`

Expected: `46` total assets after Tasks 1 through 3.

```bash
git add qr-menu-app/public/images/menu
git commit -m "assets: add unique iced drink photography"
```

### Task 4: Generate Hot Beverages and Matcha

**Files:**
- Create: `qr-menu-app/public/images/menu/coffee-*.webp`
- Create: `qr-menu-app/public/images/menu/drink-hot-chocolate.webp`
- Create: `qr-menu-app/public/images/menu/tea-*.webp`
- Create: `qr-menu-app/public/images/menu/matcha-*.webp`

- [ ] **Step 1: Generate the coffee and hot chocolate photographs**

Generate each in a distinct cream ceramic cup:

- `coffee-black`: near-black filter coffee without milk.
- `coffee-americano`: black Americano with a light crema ring.
- `coffee-cafe-latte`: pale cafe latte with classic leaf latte art.
- `coffee-cafe-mocha`: mocha topped with a small milk-foam pattern and cocoa dust.
- `coffee-mocha-latte`: layered extra-chocolate mocha latte with dark chocolate drizzle.
- `drink-hot-chocolate`: thick hot chocolate topped with soft cream and cocoa.

- [ ] **Step 2: Generate the tea photographs**

Generate:

- `tea-black`: clear amber-black tea in a glass cup without milk.
- `tea-green`: light green-gold tea with loose green leaves nearby.
- `tea-lemon`: amber hot tea with a fresh lemon wheel.

- [ ] **Step 3: Generate five matcha photographs**

Generate:

- `matcha-flavored`: green iced matcha with a subtle vanilla cream accent.
- `matcha-latte`: smooth green hot matcha latte with simple white foam art.
- `matcha-strawberry`: layered pink strawberry puree, milk, and green matcha.
- `matcha-caramel`: green matcha latte with restrained caramel ribbon.
- `matcha-spanish`: rich pale-green matcha latte with condensed-milk layer.

- [ ] **Step 4: Validate and commit the hot beverage batch**

Run: `find qr-menu-app/public/images/menu -type f -name '*.webp' | wc -l`

Expected: `60` total assets after Tasks 1 through 4.

```bash
git add qr-menu-app/public/images/menu
git commit -m "assets: add unique hot beverage photography"
```

### Task 5: Generate Frappes

**Files:**
- Create: `qr-menu-app/public/images/menu/frappe-*.webp`

- [ ] **Step 1: Generate four frappe photographs**

Use tall clear glasses with a thick blended texture:

- `frappe-choco-chip`: chocolate frappe with visible mini chocolate chips.
- `frappe-biscoff`: caramel-beige frappe with biscuit crumb and one caramelised biscuit.
- `frappe-nutella`: hazelnut-chocolate frappe with toasted hazelnuts and cocoa.
- `frappe-salted-caramel`: caramel frappe with a restrained salted caramel ribbon.

- [ ] **Step 2: Validate complete asset coverage by count**

Run: `find qr-menu-app/public/images/menu -type f -name '*.webp' | wc -l`

Expected: `61` standard-item assets plus `3` combo assets, `64` total.

- [ ] **Step 3: Commit the frappe assets**

```bash
git add qr-menu-app/public/images/menu
git commit -m "assets: add unique frappe photography"
```

### Task 6: Enforce and Integrate Per-Item Image Mapping

**Files:**
- Create: `qr-menu-app/src/domain/catalogImages.test.ts`
- Modify: `qr-menu-app/src/domain/catalog.ts`

- [ ] **Step 1: Write the failing catalog asset test**

Create `catalogImages.test.ts`:

```ts
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { categories, menuItems } from './catalog';

describe('menu photography', () => {
  it('assigns every item a unique deterministic image that exists', () => {
    const paths = menuItems.map((item) => item.image);
    expect(new Set(paths).size).toBe(menuItems.length);
    for (const item of menuItems) {
      expect(item.image).toBe(`/images/menu/${item.id}.webp`);
      expect(existsSync(join(process.cwd(), 'public', item.image))).toBe(true);
    }
  });

  it('keeps category preview photography separate', () => {
    expect(categories.every((category) => !category.image.startsWith('/images/menu/'))).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails for category-level reuse**

Run: `npm test -- src/domain/catalogImages.test.ts --reporter=verbose`

Expected: FAIL because existing item paths are shared category images.

- [ ] **Step 3: Change `makeItem` to resolve by item ID**

In `catalog.ts`, replace the image assignment inside `makeItem`:

```ts
image: `/images/menu/${id}.webp`,
```

Keep the `images` category map and every category object's `image` unchanged.

- [ ] **Step 4: Run the focused test and catalog consumers**

Run: `npm test -- src/domain/catalogImages.test.ts src/features/menu src/features/landing src/features/admin --reporter=verbose`

Expected: all tests PASS, including 64 unique existing asset assertions.

- [ ] **Step 5: Commit the catalog integration**

```bash
git add qr-menu-app/src/domain/catalog.ts qr-menu-app/src/domain/catalogImages.test.ts
git commit -m "feat: map every menu item to unique photography"
```

### Task 7: Verify Image Loading, Performance, and Responsive Presentation

**Files:**
- Modify: `qr-menu-app/e2e/app.spec.ts`

- [ ] **Step 1: Add a failing browser assertion for fallback-free menu images**

After opening `/menu?table=1`, add:

```ts
await expect(page.locator('.menu-card img')).toHaveCount(64);
await expect(page.locator('.menu-card .food-image-fallback')).toHaveCount(0);
const failedImages = await page.locator('.menu-card img').evaluateAll((images) =>
  images.filter((image) => !(image as HTMLImageElement).complete || (image as HTMLImageElement).naturalWidth === 0).length,
);
expect(failedImages).toBe(0);
```

- [ ] **Step 2: Run the focused browser journey**

Run: `npx playwright test --project=desktop-1440 -g "landing and menu"`

Expected: PASS only when all 64 images decode successfully and no branded fallback appears.

- [ ] **Step 3: Run full verification**

Run: `npm run check`

Expected: all Vitest tests and the production build PASS.

Run: `npm run test:e2e`

Expected: all Chromium journeys PASS at 1440, 1024, 768, and 375 pixels with no accessibility or overflow failures.

- [ ] **Step 4: Inspect representative sibling products**

Visually compare pizza variants, all three pasta dishes, the eight sundaes, the five mojitos, coffee versus tea, all five matchas, smoothies, and frappes. Confirm each picture matches its label and no two files show the same composition.

- [ ] **Step 5: Commit the browser coverage**

```bash
git add qr-menu-app/e2e/app.spec.ts
git commit -m "test: verify unique menu photography loads"
```
