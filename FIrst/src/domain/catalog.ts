import type { Category, Combo, MenuItem, MenuOptionGroup } from './types';

const images = {
  combos: '/images/combo-spread.webp',
  pizza: '/images/pizza.webp',
  pasta: '/images/pasta.webp',
  sandwiches: '/images/sandwiches.webp',
  breads: '/images/sandwiches.webp',
  sundaes: '/images/desserts.webp',
  smoothies: '/images/cold-drinks.webp',
  'iced-refreshers': '/images/cold-drinks.webp',
  'hot-beverages': '/images/coffee-matcha.webp',
  matcha: '/images/coffee-matcha.webp',
  frappes: '/images/cold-drinks.webp',
  pastries: '/images/desserts.webp',
} as const;

export const categories: Category[] = [
  { id: 'combos', name: 'Cafe Combos', description: 'A little more Luca, made for every table.', image: images.combos },
  { id: 'pizza', name: 'Pizza', description: 'Cheesy cafe-style favourites with your choice of topping.', image: images.pizza },
  { id: 'pasta', name: 'Pasta', description: 'Creamy and bold sauces tossed with penne or macaroni.', image: images.pasta },
  { id: 'sandwiches', name: 'Sandwiches', description: 'Pressed, stacked, and served warm.', image: images.sandwiches },
  { id: 'breads', name: 'Breads', description: 'Toasty sides for sharing—or keeping.', image: images.breads },
  { id: 'sundaes', name: 'Sundaes', description: 'Rich, cold, fudgy finales.', image: images.sundaes },
  { id: 'smoothies', name: 'Smoothies', description: 'Thick, chilled cafe classics.', image: images.smoothies },
  { id: 'iced-refreshers', name: 'Iced Refreshers', description: 'Mojitos, floats, tea, and coffee over ice.', image: images['iced-refreshers'] },
  { id: 'hot-beverages', name: 'Coffee & Tea', description: 'Comforting cups, brewed and poured fresh.', image: images['hot-beverages'] },
  { id: 'matcha', name: 'Matcha', description: 'Earthy green tea, softly sweetened.', image: images.matcha },
  { id: 'frappes', name: 'Frappes', description: 'Blended, creamy, and unapologetically indulgent.', image: images.frappes },
  { id: 'pastries', name: 'Pastries', description: 'The day’s fresh bake, while it lasts.', image: images.pastries },
];

const proteinOptions: MenuOptionGroup = {
  id: 'protein',
  name: 'Choose your topping',
  required: true,
  minimum: 1,
  maximum: 1,
  options: [
    { id: 'paneer', name: 'Paneer' },
    { id: 'chicken', name: 'Chicken' },
  ],
};

const pastaStyleOptions: MenuOptionGroup = {
  id: 'pasta-style',
  name: 'Choose your pasta',
  required: true,
  minimum: 1,
  maximum: 1,
  options: [
    { id: 'penne', name: 'Penne' },
    { id: 'macaroni', name: 'Macaroni' },
  ],
};

const makeItem = (
  id: string,
  name: string,
  price: number,
  categoryId: MenuItem['categoryId'],
  description: string,
  extra: Partial<MenuItem> = {},
): MenuItem => ({
  id,
  kind: 'item',
  name,
  price,
  categoryId,
  description,
  image: `/images/menu/${id}.webp`,
  available: true,
  ...extra,
});

export const combos: Combo[] = [
  {
    ...makeItem('combo-alone', 'I Am Alone', 249, 'combos', 'One cosy cafe spread, made just for you.', { featured: true }),
    kind: 'combo',
    contents: [
      { label: 'Paneer Ghee Roast Pizza', quantity: 1, categoryId: 'pizza' },
      { label: 'Iced Cold Coffee', quantity: 1, categoryId: 'iced-refreshers' },
      { label: 'Pastry of the Day', quantity: 1, categoryId: 'pastries' },
    ],
  },
  {
    ...makeItem('combo-together', 'We Are Together', 399, 'combos', 'A pasta date with drinks and something sweet.', { featured: true }),
    kind: 'combo',
    contents: [
      { label: 'Alfredo Penne Pasta (Veg)', quantity: 1, categoryId: 'pasta' },
      { label: 'Iced Cold Coffee', quantity: 2, categoryId: 'iced-refreshers' },
      { label: 'Pastry of the Day', quantity: 2, categoryId: 'pastries' },
    ],
  },
  {
    ...makeItem('combo-group', 'We Are a Group', 799, 'combos', 'The full table: pizza, pasta, drinks, and pastries.', { featured: true }),
    kind: 'combo',
    contents: [
      { label: 'Paneer Chilli Pizza', quantity: 1, categoryId: 'pizza' },
      { label: 'Arrabbiata Penne Pasta (Veg)', quantity: 1, categoryId: 'pasta' },
      { label: 'Classic Mojito', quantity: 4, categoryId: 'iced-refreshers' },
      { label: 'Assorted Pastries of the Day', quantity: 4, categoryId: 'pastries' },
    ],
  },
];

const standardItems: MenuItem[] = [
  makeItem('pizza-ghee-roast', 'Ghee Roast Pizza', 159, 'pizza', 'A bold, buttery South Indian-inspired pizza.', { optionGroups: [proteinOptions], featured: true }),
  makeItem('pizza-chilli', 'Chilli Pizza', 159, 'pizza', 'Sweet heat, peppers, and bubbling cheese.', { optionGroups: [proteinOptions] }),
  makeItem('pizza-manchurian', 'Manchurian Pizza', 159, 'pizza', 'Tangy Indo-Chinese flavours on a crisp base.', { optionGroups: [proteinOptions] }),
  makeItem('pizza-peri-peri', 'Peri-Peri Pizza', 159, 'pizza', 'Smoky peri-peri spice with melted cheese.', { optionGroups: [proteinOptions] }),

  makeItem('pasta-alfredo', 'Alfredo Pasta', 189, 'pasta', 'Silky cream sauce with herbs and parmesan notes.', { optionGroups: [pastaStyleOptions, proteinOptions], featured: true }),
  makeItem('pasta-mac-cheese', 'Mac & Cheese', 189, 'pasta', 'Rich, comforting cheese sauce with a golden finish.', { optionGroups: [pastaStyleOptions, proteinOptions] }),
  makeItem('pasta-arrabbiata', 'Arrabbiata Pasta', 189, 'pasta', 'Bright tomato, garlic, chilli, and Italian herbs.', { optionGroups: [pastaStyleOptions, proteinOptions] }),

  makeItem('sandwich-club', 'Club Sandwich', 149, 'sandwiches', 'A crisp, generously layered cafe classic.'),
  makeItem('sandwich-panino-veg', 'Panino Veg Sandwich', 159, 'sandwiches', 'Pressed vegetables, cheese, and herb spread.', { vegetarian: true }),
  makeItem('sandwich-panino-chicken', 'Panino Chicken Sandwich', 179, 'sandwiches', 'Warm pressed chicken panino with melty cheese.'),
  makeItem('sandwich-zinger', 'Zinger Chicken Sandwich', 179, 'sandwiches', 'Crunchy chicken with a lively, creamy sauce.'),
  makeItem('sliders-veg', 'Veg Mini Sliders — 4 pcs', 99, 'sandwiches', 'Four bite-sized vegetable sliders.', { vegetarian: true }),
  makeItem('sliders-chicken', 'Chicken Mini Sliders — 4 pcs', 99, 'sandwiches', 'Four bite-sized chicken sliders.'),

  makeItem('bread-chilli-toast', 'Cheese Chilli Toast', 99, 'breads', 'Golden toast with cheese and green chilli.', { optionGroups: [proteinOptions] }),
  makeItem('bread-cheese-garlic', 'Cheese Garlic Bread', 99, 'breads', 'Garlicky, cheesy, and oven-toasted.', { vegetarian: true }),
  makeItem('bread-butter-garlic', 'Butter Garlic Bread', 99, 'breads', 'A warm, buttery garlic side.', { vegetarian: true }),

  makeItem('sundae-choco-lava', 'Choco Lava Fudge', 120, 'sundaes', 'Warm chocolate lava with a cold fudge finish.', { vegetarian: true }),
  makeItem('sundae-death-chocolate', 'Death by Chocolate Sundae', 150, 'sundaes', 'Layers of deep chocolate indulgence.', { vegetarian: true, featured: true }),
  makeItem('sundae-hot-chocolate', 'Hot Chocolate Fudge', 120, 'sundaes', 'Classic hot fudge over creamy ice cream.', { vegetarian: true }),
  makeItem('sundae-hot-brownie', 'Hot Brownie Fudge', 160, 'sundaes', 'Warm brownie, ice cream, and glossy fudge.', { vegetarian: true }),
  makeItem('sundae-red-velvet', 'Red Velvet Fudge', 150, 'sundaes', 'Velvety cake notes with rich fudge.', { vegetarian: true }),
  makeItem('sundae-doughnut', 'Choco Doughnut Fudge', 140, 'sundaes', 'Chocolate doughnut with ice cream and fudge.', { vegetarian: true }),
  makeItem('sundae-mud-cake', 'Mud Cake Fudge', 150, 'sundaes', 'Dense chocolate cake with a fudgy finish.', { vegetarian: true }),
  makeItem('sundae-tiramisu', 'Tiramisu', 150, 'sundaes', 'Coffee, cocoa, and a softly creamy finish.', { vegetarian: true }),

  makeItem('smoothie-oreo', 'Oreo Smoothie', 120, 'smoothies', 'Cookies-and-cream blended thick and cold.', { vegetarian: true }),
  makeItem('smoothie-vanilla', 'Vanilla Smoothie', 120, 'smoothies', 'Simple, fragrant vanilla creaminess.', { vegetarian: true }),
  makeItem('smoothie-red-velvet', 'Red Velvet Smoothie', 130, 'smoothies', 'Dessert-like red velvet in a chilled glass.', { vegetarian: true }),
  makeItem('smoothie-kit-kat', 'Kit Kat Smoothie', 130, 'smoothies', 'Chocolate wafer crunch blended smooth.', { vegetarian: true }),
  makeItem('smoothie-butterscotch', 'Butterscotch Smoothie', 130, 'smoothies', 'Buttery caramel sweetness with a cold finish.', { vegetarian: true }),
  makeItem('smoothie-belgian-chocolate', 'Belgian Chocolate Smoothie', 140, 'smoothies', 'Full-bodied chocolate, blended extra creamy.', { vegetarian: true }),
  makeItem('smoothie-nutella', 'Nutella Smoothie', 140, 'smoothies', 'Hazelnut cocoa blended into a rich shake.', { vegetarian: true }),
  makeItem('smoothie-brownie', 'Brownie Smoothie', 150, 'smoothies', 'Fudgy brownie pieces blended with ice cream.', { vegetarian: true }),

  makeItem('iced-lemon-tea', 'Iced Lemon Tea', 100, 'iced-refreshers', 'Bright tea with lemon over ice.', { vegetarian: true }),
  makeItem('iced-cold-coffee', 'Iced Cold Coffee', 110, 'iced-refreshers', 'Chilled, creamy coffee with a smooth finish.', { vegetarian: true, featured: true }),
  makeItem('mojito-cranberry', 'Cranberry Mojito', 130, 'iced-refreshers', 'Tart cranberry, mint, lime, and fizz.', { vegetarian: true }),
  makeItem('mojito-orange', 'Orange Mojito', 130, 'iced-refreshers', 'Citrus, mint, lime, and sparkling soda.', { vegetarian: true }),
  makeItem('mojito-pineapple', 'Pineapple Mojito', 130, 'iced-refreshers', 'Tropical pineapple with mint and lime.', { vegetarian: true }),
  makeItem('mojito-mango', 'Mango Mojito', 130, 'iced-refreshers', 'Mango, mint, lime, and a lively fizz.', { vegetarian: true }),
  makeItem('mojito-classic', 'Classic Mojito', 130, 'iced-refreshers', 'Fresh lime and mint topped with soda.', { vegetarian: true }),
  makeItem('float-cola', 'Cola Float', 130, 'iced-refreshers', 'Cola poured over a creamy scoop.', { vegetarian: true }),
  makeItem('float-orange', 'Orange Float', 130, 'iced-refreshers', 'Orange soda and ice cream, joyfully retro.', { vegetarian: true }),
  makeItem('float-lemonade', 'Lemonade Float', 130, 'iced-refreshers', 'Zesty lemonade softened with ice cream.', { vegetarian: true }),

  makeItem('coffee-black', 'Black Coffee', 50, 'hot-beverages', 'Clean, dark, and freshly brewed.', { vegetarian: true }),
  makeItem('coffee-americano', 'Americano', 60, 'hot-beverages', 'Espresso lengthened with hot water.', { vegetarian: true }),
  makeItem('coffee-cafe-latte', 'Cafe Latte', 90, 'hot-beverages', 'Espresso with silky steamed milk.', { vegetarian: true, featured: true }),
  makeItem('coffee-cafe-mocha', 'Cafe Mocha', 80, 'hot-beverages', 'Coffee, milk, and chocolate in harmony.', { vegetarian: true }),
  makeItem('coffee-mocha-latte', 'Mocha Latte', 120, 'hot-beverages', 'An extra-chocolatey latte with a soft finish.', { vegetarian: true }),
  makeItem('drink-hot-chocolate', 'Hot Chocolate', 90, 'hot-beverages', 'Comforting cocoa with steamed milk.', { vegetarian: true }),
  makeItem('tea-black', 'Black Tea', 60, 'hot-beverages', 'A straightforward, warming black tea.', { vegetarian: true }),
  makeItem('tea-green', 'Green Tea', 70, 'hot-beverages', 'Light, clean, and gently vegetal.', { vegetarian: true }),
  makeItem('tea-lemon', 'Lemon Tea', 70, 'hot-beverages', 'Hot tea brightened with lemon.', { vegetarian: true }),

  makeItem('matcha-flavored', 'Flavored Matcha', 160, 'matcha', 'Matcha with a rotating flavoured accent.', { vegetarian: true }),
  makeItem('matcha-latte', 'Matcha Latte', 150, 'matcha', 'Stone-green matcha mellowed with milk.', { vegetarian: true, featured: true }),
  makeItem('matcha-strawberry', 'Strawberry Matcha Latte', 160, 'matcha', 'Fruity strawberry layered with matcha milk.', { vegetarian: true }),
  makeItem('matcha-caramel', 'Caramel Matcha Latte', 180, 'matcha', 'Matcha and milk with caramel sweetness.', { vegetarian: true }),
  makeItem('matcha-spanish', 'Spanish Matcha Latte', 180, 'matcha', 'A richer, condensed-milk style matcha latte.', { vegetarian: true }),

  makeItem('frappe-choco-chip', 'Choco Chip Frappe', 180, 'frappes', 'Cold blended chocolate with tiny chip crunch.', { vegetarian: true }),
  makeItem('frappe-biscoff', 'Biscoff Cream Frappe', 190, 'frappes', 'Caramelised biscuit and cream, blended cold.', { vegetarian: true, featured: true }),
  makeItem('frappe-nutella', 'Nutella Frappe', 190, 'frappes', 'Hazelnut cocoa blended with ice and milk.', { vegetarian: true }),
  makeItem('frappe-salted-caramel', 'Salted Caramel Frappe', 180, 'frappes', 'Sweet caramel balanced with a pinch of salt.', { vegetarian: true }),

  makeItem('pastry-of-day', 'Pastry of the Day', 0, 'pastries', 'Ask your server about today’s fresh selection.', {
    vegetarian: true,
    availabilityNote: 'Selection and price vary as per availability.',
  }),
];

export const menuItems: MenuItem[] = [...combos, ...standardItems];

export const getMenuItem = (id: string) => menuItems.find((item) => item.id === id);
