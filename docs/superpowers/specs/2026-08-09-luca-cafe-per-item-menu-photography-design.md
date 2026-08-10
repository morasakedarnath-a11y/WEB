# Luca Cafe Per-Item Menu Photography Design

## Goal

Give every Luca Cafe menu item and combo a unique image that accurately matches its name and preparation, replacing the current category-level image reuse while preserving the website's warm editorial cafe art direction and responsive performance.

## Current Problem

The catalog currently assigns images through the item's category. Roughly seventy menu entries therefore reuse only eight source photographs. This makes visually different products such as Alfredo Pasta and Arrabbiata Pasta appear identical and reduces customer confidence in the menu.

## Photography Direction

Every generated asset will follow one shared visual language:

- realistic editorial cafe food photography;
- warm natural window light and soft directional shadows;
- espresso-brown wood or warm stone surfaces;
- cream ceramic, clear glass, or restrained dark serving ware;
- subtle film grain and natural food texture;
- landscape composition with the subject centered safely for responsive card crops;
- no people, hands, logos, packaging, watermarks, or text.

Each prompt will explicitly describe the named dish or drink, its defining ingredients, colour, garnish, vessel, and serving format. Images must distinguish variants within the same category. For example, Alfredo Pasta will be pale and creamy, Arrabbiata Pasta will be tomato-red, and Mac & Cheese will have a glossy golden cheese sauce.

## Asset Coverage

One unique image will be produced for every entry in `menuItems`, including the three fixed combos. Item IDs will become stable filenames:

```text
public/images/menu/<item-id>.webp
```

Examples:

- `public/images/menu/pizza-ghee-roast.webp`
- `public/images/menu/pasta-arrabbiata.webp`
- `public/images/menu/mojito-cranberry.webp`
- `public/images/menu/combo-group.webp`

`Pastry of the Day` will show a refined assortment of available pastries rather than a single fixed product. Combo images will show the exact included product types in a cohesive table spread.

Existing category photographs remain available for landing-page category previews and hero storytelling. They will no longer be the default images for individual menu cards.

## Generation Workflow

Assets will be generated in coherent category batches so closely related products can be compared for visual distinction. The order is:

1. combos, pizza, pasta, sandwiches, and breads;
2. sundaes, pastries, and smoothies;
3. iced tea, cold coffee, mojitos, and floats;
4. coffee, tea, hot chocolate, and matcha;
5. frappes.

Every generated image will be inspected for product accuracy, unwanted text or logos, composition, and duplication before integration. Failed images will be regenerated with a more explicit item prompt.

## Image Processing

Accepted source images will be converted to WebP at a consistent landscape size suitable for the current 210-pixel menu card image area and high-density displays. The target output is 1200 by 800 pixels with a practical quality setting that keeps individual assets visually clean while avoiding unnecessarily large downloads.

The browser will continue to load only visible images through the existing image component behavior. Width and aspect-ratio behavior in menu cards will remain unchanged.

## Catalog Architecture

The catalog will add a typed per-item image resolver keyed by stable item ID. `makeItem` will assign `/images/menu/<id>.webp` by default rather than resolving through the category image map. Category objects will continue using the existing category image map.

This keeps image naming deterministic and prevents future items from silently reusing an unrelated category photo. A catalog test will verify that:

- every menu item resolves to a unique image path;
- every path follows the `/images/menu/<item-id>.webp` convention;
- every referenced asset exists in `public/images/menu`;
- category preview images remain unchanged.

## Fallback and Error Handling

The existing `FoodImage` fallback remains responsible for broken or unavailable assets and will display the product name instead of a broken image icon. Generation or conversion failures must not be hidden by mapping an item back to a category image; the asset coverage test must fail until the correct item file exists.

## Accessibility

Menu card alternative text already uses the product name in the form `<item name> at Luca Cafe`. This behavior remains unchanged. Decorative admin thumbnails remain decorative where the surrounding text already names the product.

## Verification

- Run the catalog asset-coverage and uniqueness test.
- Run all existing menu, landing, admin, and customer-ordering tests.
- Build the production bundle.
- Exercise customer menu journeys at 1440, 1024, 768, and 375 pixel widths.
- Confirm no broken-image fallback appears for any catalog item.
- Inspect representative categories and closely related variants for product accuracy and visual distinction.

## Out of Scope

- Changing menu names, prices, descriptions, categories, or ordering options.
- Replacing the landing hero, story image, or category preview imagery.
- Adding an external image CDN or backend media service.
- Claiming that generated photographs depict the cafe's exact real-world plating.
