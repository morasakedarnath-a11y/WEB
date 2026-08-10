import { canTransition } from './orderStatus';

describe('order status transitions', () => {
  it('allows only the operational progression', () => {
    expect(canTransition('received', 'preparing')).toBe(true);
    expect(canTransition('preparing', 'ready')).toBe(true);
    expect(canTransition('ready', 'delivered')).toBe(true);
    expect(canTransition('delivered', 'paid')).toBe(true);
    expect(canTransition('received', 'paid')).toBe(false);
  });

  it('allows cancellation only before delivery', () => {
    expect(canTransition('received', 'cancelled')).toBe(true);
    expect(canTransition('preparing', 'cancelled')).toBe(true);
    expect(canTransition('ready', 'cancelled')).toBe(true);
    expect(canTransition('delivered', 'cancelled')).toBe(false);
    expect(canTransition('paid', 'cancelled')).toBe(false);
  });
});
