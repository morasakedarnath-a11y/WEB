import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CafeProvider } from '../state/CafeStore';
import { createSeedSnapshot } from '../services/seed';
import type { CafeService } from '../services/contracts';
import { App } from './App';

const service = {
  getSnapshot: async () => createSeedSnapshot(),
  subscribe: () => () => undefined,
} as unknown as CafeService;

describe('application routes', () => {
  it.each([
    ['/', 'Luca Cafe'],
    ['/menu?table=1', 'Our menu'],
    ['/cart', 'Choose your table'],
    ['/orders', 'Track your order'],
    ['/staff', 'Demo staff access'],
    ['/staff/kitchen', 'Demo staff access'],
    ['/staff/waiter', 'Demo staff access'],
    ['/staff/admin', 'Demo staff access'],
    ['/staff/qr', 'Demo staff access'],
    ['/kitchen', 'Demo staff access'],
  ])('renders %s without a blank screen', async (route, heading) => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <CafeProvider service={service}><App /></CafeProvider>
      </MemoryRouter>,
    );

    expect(await screen.findByRole('heading', { name: heading })).toBeInTheDocument();
  });
});
