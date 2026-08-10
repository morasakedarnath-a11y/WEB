import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CafeProvider } from '../../state/CafeStore';
import type { CafeService } from '../../services/contracts';
import { createSeedSnapshot } from '../../services/seed';
import { OrderTracker } from './OrderTracker';

const service = {
  getSnapshot: async () => createSeedSnapshot(),
  subscribe: () => () => undefined,
} as unknown as CafeService;

describe('OrderTracker', () => {
  it('shows the ordered items, current status, and complete progression', async () => {
    render(
      <MemoryRouter initialEntries={['/orders?table=7&order=LC-1041']}>
        <CafeProvider service={service}><OrderTracker /></CafeProvider>
      </MemoryRouter>,
    );
    expect(await screen.findByRole('heading', { name: 'Track your order' })).toBeInTheDocument();
    expect(screen.getByText('LC-1041')).toBeInTheDocument();
    expect(screen.getByText('Preparing')).toBeInTheDocument();
    expect(screen.getByText('2×')).toBeInTheDocument();
    expect(screen.getByText('Alfredo Pasta')).toBeInTheDocument();
    expect(screen.getByText('Ready to serve')).toBeInTheDocument();
    expect(screen.getByText('Delivered')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Order another round' })).toHaveAttribute('href', '/menu?table=7');
  });
});
