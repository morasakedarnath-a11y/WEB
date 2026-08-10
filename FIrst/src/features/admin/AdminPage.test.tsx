import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import type { CafeService } from '../../services/contracts';
import { createSeedSnapshot } from '../../services/seed';
import { CafeProvider } from '../../state/CafeStore';
import { AdminPage } from './AdminPage';

describe('AdminPage', () => {
  it('derives demo metrics and manages menu availability', async () => {
    const snapshot = createSeedSnapshot();
    const setMenuAvailability = vi.fn(async () => snapshot);
    const service = { getSnapshot: async () => snapshot, subscribe: () => () => undefined, setMenuAvailability } as unknown as CafeService;
    render(<CafeProvider service={service}><AdminPage /></CafeProvider>);
    expect(await screen.findByRole('heading', { name: 'Cafe overview' })).toBeInTheDocument();
    expect(screen.getAllByText('₹261')).toHaveLength(2);
    expect(screen.getByText('5 orders')).toBeInTheDocument();
    expect(screen.getByText('64 items')).toBeInTheDocument();
    expect(screen.getByText('Demo data')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(screen.getByRole('heading', { name: 'Menu management' })).toBeInTheDocument();
    fireEvent.change(screen.getByRole('searchbox', { name: 'Search menu items' }), { target: { value: 'Ghee Roast' } });
    fireEvent.click(screen.getByRole('button', { name: 'Mark Ghee Roast Pizza sold out' }));
    await waitFor(() => expect(setMenuAvailability).toHaveBeenCalledWith('pizza-ghee-roast', false));
  });
});
