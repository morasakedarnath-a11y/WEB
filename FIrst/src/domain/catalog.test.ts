import { combos, menuItems } from './catalog';

describe('Luca Cafe catalog', () => {
  it('contains every approved menu line and its photographed prices', () => {
    expect(menuItems).toHaveLength(64);
    expect(menuItems.find((item) => item.name === 'Ghee Roast Pizza')?.price).toBe(159);
    expect(menuItems.find((item) => item.name === 'Cafe Latte')?.price).toBe(90);
    expect(menuItems.find((item) => item.name === 'Pastry of the Day')?.availabilityNote).toMatch(
      /availability/i,
    );
  });

  it('models the three approved combos with quantified component lines', () => {
    expect(combos.map((combo) => [combo.name, combo.price, combo.contents.length])).toEqual([
      ['I Am Alone', 249, 3],
      ['We Are Together', 399, 3],
      ['We Are a Group', 799, 4],
    ]);
    expect(combos.map((combo) => combo.contents.map((line) => line.quantity))).toEqual([
      [1, 1, 1],
      [1, 2, 2],
      [1, 1, 4, 4],
    ]);
    expect(combos.map((combo) => combo.contents.map((line) => line.label))).toEqual([
      ['Paneer Ghee Roast Pizza', 'Iced Cold Coffee', 'Pastry of the Day'],
      ['Alfredo Penne Pasta (Veg)', 'Iced Cold Coffee', 'Pastry of the Day'],
      ['Paneer Chilli Pizza', 'Arrabbiata Penne Pasta (Veg)', 'Classic Mojito', 'Assorted Pastries of the Day'],
    ]);
  });
});
