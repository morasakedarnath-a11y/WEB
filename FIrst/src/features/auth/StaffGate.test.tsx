import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { CafeService } from '../../services/contracts';
import { createSeedSnapshot } from '../../services/seed';
import { CafeProvider } from '../../state/CafeStore';
import { StaffGate, useStaffSession } from './StaffGate';

const service = {
  getSnapshot: async () => createSeedSnapshot(),
  subscribe: () => () => undefined,
  authenticateStaff: async (pin: string) => pin === '2490',
} as unknown as CafeService;

function ProtectedContent() {
  const { logout } = useStaffSession();
  return <><h1>Kitchen display</h1><button onClick={logout}>Log out</button></>;
}

describe('StaffGate', () => {
  beforeEach(() => window.sessionStorage.clear());

  it('protects staff content, reports invalid PINs, and supports session logout', async () => {
    render(<CafeProvider service={service}><StaffGate><ProtectedContent /></StaffGate></CafeProvider>);
    expect(screen.getByRole('heading', { name: 'Demo staff access' })).toBeInTheDocument();
    const pin = screen.getByLabelText('Staff PIN');
    fireEvent.change(pin, { target: { value: '1111' } });
    fireEvent.click(screen.getByRole('button', { name: 'Enter workspace' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('That demo PIN is not valid.');
    fireEvent.change(pin, { target: { value: '2490' } });
    fireEvent.click(screen.getByRole('button', { name: 'Enter workspace' }));
    expect(await screen.findByRole('heading', { name: 'Kitchen display' })).toBeInTheDocument();
    expect(window.sessionStorage.getItem('luca-staff-session')).toBe('active');
    fireEvent.click(screen.getByRole('button', { name: 'Log out' }));
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Demo staff access' })).toBeInTheDocument());
  });
});
