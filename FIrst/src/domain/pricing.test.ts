import { calculateBill } from './pricing';

describe('bill pricing', () => {
  it('calculates GST with integer rupee rounding', () => {
    expect(calculateBill([{ unitPrice: 189, quantity: 2 }], 5)).toEqual({
      subtotal: 378,
      tax: 19,
      total: 397,
    });
  });

  it('ignores invalid negative quantities and prices', () => {
    expect(calculateBill([{ unitPrice: -100, quantity: 2 }, { unitPrice: 90, quantity: -1 }], 5)).toEqual({
      subtotal: 0,
      tax: 0,
      total: 0,
    });
  });
});
