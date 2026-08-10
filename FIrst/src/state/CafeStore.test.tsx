import { fireEvent, render, screen } from '@testing-library/react';
import { createSeedSnapshot } from '../services/seed';
import type { CafeService } from '../services/contracts';
import type { CartLine } from '../domain/types';
import { CafeProvider, useCafe } from './CafeStore';

const line: CartLine = {
  id: 'line-1',
  menuItemId: 'coffee-cafe-latte',
  name: 'Cafe Latte',
  quantity: 1,
  unitPrice: 90,
  selectedOptions: [],
};

const service = {
  getSnapshot: async () => createSeedSnapshot(),
  subscribe: () => () => undefined,
} as unknown as CafeService;

function StoreProbe() {
  const cafe = useCafe();
  return (
    <div>
      <span>tables {cafe.snapshot?.tables.length ?? 0}</span>
      <span>cart {cafe.cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
      <button onClick={() => cafe.addToCart(line)}>Add latte</button>
    </div>
  );
}

describe('CafeProvider', () => {
  it('loads the service snapshot and owns cart commands', async () => {
    render(
      <CafeProvider service={service}>
        <StoreProbe />
      </CafeProvider>,
    );
    expect(await screen.findByText('tables 12')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Add latte' }));
    expect(screen.getByText('cart 1')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Add latte' }));
    expect(screen.getByText('cart 2')).toBeInTheDocument();
  });
});
