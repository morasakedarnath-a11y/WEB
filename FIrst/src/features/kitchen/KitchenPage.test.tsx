import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import type { CafeService } from '../../services/contracts';
import { createSeedSnapshot } from '../../services/seed';
import { CafeProvider } from '../../state/CafeStore';
import { KitchenPage } from './KitchenPage';

describe('KitchenPage', () => {
  it('sorts operational columns and advances a ticket one valid step', async () => {
    const snapshot = createSeedSnapshot();
    snapshot.orders[0].lines[0].notes = 'Allergy: no nuts';
    const transitionOrder = vi.fn(async () => snapshot.orders[0]);
    const service = { getSnapshot: async () => snapshot, subscribe: () => () => undefined, transitionOrder } as unknown as CafeService;
    render(<CafeProvider service={service}><KitchenPage now={() => new Date('2026-08-09T12:00:00.000Z')} /></CafeProvider>);
    expect(await screen.findByRole('heading', { name: 'Kitchen display' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'New' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Preparing' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ready' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Completed' })).toBeInTheDocument();
    expect(screen.getByText('Allergy: no nuts')).toBeInTheDocument();
    expect(screen.getByText('37 min')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Start LC-1042' }));
    await waitFor(() => expect(transitionOrder).toHaveBeenCalledWith('LC-1042', 'preparing'));
  });
});
