import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createSeedSnapshot } from '../../services/seed';
import type { CafeService } from '../../services/contracts';
import { CafeProvider } from '../../state/CafeStore';
import { MenuPage } from '../menu/MenuPage';

const service = {
  getSnapshot: async () => createSeedSnapshot(),
  subscribe: () => () => undefined,
} as unknown as CafeService;

describe('customer cart workflow', () => {
  it('requires item choices and calculates the cart bill', async () => {
    render(
      <MemoryRouter initialEntries={['/menu?table=1']}>
        <CafeProvider service={service}><MenuPage /></CafeProvider>
      </MemoryRouter>,
    );
    fireEvent.click(await screen.findByRole('button', { name: 'Customize Ghee Roast Pizza' }));
    fireEvent.click(screen.getByRole('button', { name: /^Add to order/ }));
    expect(screen.getByText('Choose your topping to continue.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('radio', { name: 'Paneer' }));
    fireEvent.click(screen.getByRole('button', { name: /^Add to order/ }));
    expect(screen.getByRole('button', { name: /Review order, 1 item, ₹159/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Review order/ }));
    expect(screen.getByRole('dialog', { name: 'Your order' })).toBeInTheDocument();
    expect(screen.getByText('₹167')).toBeInTheDocument();
  });

  it('reuses the same submission key when a failed checkout is retried', async () => {
    const snapshot = createSeedSnapshot();
    const createdOrder = { ...snapshot.orders[0], id: 'LC-1043', tableId: 'table-1' };
    const createOrder = vi.fn()
      .mockRejectedValueOnce(new Error('response lost'))
      .mockResolvedValueOnce(createdOrder);
    const retryService = { getSnapshot: async () => snapshot, subscribe: () => () => undefined, createOrder } as unknown as CafeService;
    render(<MemoryRouter initialEntries={['/menu?table=1']}><CafeProvider service={retryService}><MenuPage /></CafeProvider></MemoryRouter>);
    fireEvent.click(await screen.findByRole('button', { name: 'Customize I Am Alone' }));
    fireEvent.click(screen.getByRole('button', { name: /^Add to order/ }));
    fireEvent.click(screen.getByRole('button', { name: /Review order/ }));
    const submit = screen.getByRole('button', { name: /Place order/ });
    fireEvent.click(submit);
    expect(await screen.findByRole('alert')).toHaveTextContent(/could not place/i);
    fireEvent.click(submit);
    await waitFor(() => expect(createOrder).toHaveBeenCalledTimes(2));
    expect(createOrder.mock.calls[1][0].clientRequestId).toBe(createOrder.mock.calls[0][0].clientRequestId);
  });

  it('regenerates the submission key when the cart changes after a failure', async () => {
    const snapshot = createSeedSnapshot();
    const createOrder = vi.fn().mockRejectedValueOnce(new Error('response lost')).mockResolvedValueOnce({ ...snapshot.orders[0], id: 'LC-1043', tableId: 'table-1' });
    const retryService = { getSnapshot: async () => snapshot, subscribe: () => () => undefined, createOrder } as unknown as CafeService;
    render(<MemoryRouter initialEntries={['/menu?table=1']}><CafeProvider service={retryService}><MenuPage /></CafeProvider></MemoryRouter>);
    fireEvent.click(await screen.findByRole('button', { name: 'Customize I Am Alone' }));
    fireEvent.click(screen.getByRole('button', { name: /^Add to order/ }));
    fireEvent.click(screen.getByRole('button', { name: /Review order/ }));
    fireEvent.click(screen.getByRole('button', { name: /Place order/ }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/could not place/i);
    fireEvent.click(screen.getByRole('button', { name: 'Add one I Am Alone' }));
    fireEvent.click(screen.getByRole('button', { name: /Place order/ }));
    await waitFor(() => expect(createOrder).toHaveBeenCalledTimes(2));
    expect(createOrder.mock.calls[1][0].clientRequestId).not.toBe(createOrder.mock.calls[0][0].clientRequestId);
  });
});
