import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import type { CafeService } from '../../services/contracts';
import { createSeedSnapshot } from '../../services/seed';
import { CafeProvider } from '../../state/CafeStore';
import { WaiterPage } from './WaiterPage';

describe('WaiterPage', () => {
  it('prioritizes requests and ready pickups with service-backed actions', async () => {
    const snapshot = createSeedSnapshot();
    const resolveServiceRequest = vi.fn(async () => snapshot.serviceRequests[0]);
    const transitionOrder = vi.fn(async () => snapshot.orders[2]);
    const service = { getSnapshot: async () => snapshot, subscribe: () => () => undefined, resolveServiceRequest, transitionOrder } as unknown as CafeService;
    render(<CafeProvider service={service}><WaiterPage /></CafeProvider>);
    expect(await screen.findByRole('heading', { name: 'Waiter dispatch' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Needs attention' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ready for pickup' })).toBeInTheDocument();
    expect(screen.getByText('Table 6')).toBeInTheDocument();
    expect(screen.getAllByText('LC-1040')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Resolve water request for Table 6' }));
    await waitFor(() => expect(resolveServiceRequest).toHaveBeenCalledWith('request-1'));
    fireEvent.click(screen.getByRole('button', { name: 'Deliver LC-1040 to Table 2' }));
    await waitFor(() => expect(transitionOrder).toHaveBeenCalledWith('LC-1040', 'delivered'));
  });
});
