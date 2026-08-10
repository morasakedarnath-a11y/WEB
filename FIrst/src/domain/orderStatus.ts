export type OrderStatus = 'received' | 'preparing' | 'ready' | 'delivered' | 'paid' | 'cancelled';

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  received: 'preparing',
  preparing: 'ready',
  ready: 'delivered',
  delivered: 'paid',
};

export function canTransition(from: OrderStatus, to: OrderStatus) {
  if (to === 'cancelled') return ['received', 'preparing', 'ready'].includes(from);
  return nextStatus[from] === to;
}

export const orderStatusLabel: Record<OrderStatus, string> = {
  received: 'Received',
  preparing: 'Preparing',
  ready: 'Ready to serve',
  delivered: 'Delivered',
  paid: 'Paid',
  cancelled: 'Cancelled',
};
