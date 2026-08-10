import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { StaffPortalPage } from './StaffPortalPage';

describe('StaffPortalPage', () => {
  it('connects every staff role to its operational workspace', () => {
    render(<MemoryRouter><StaffPortalPage /></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1, name: 'Staff Portal' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Open kitchen display/i })).toHaveAttribute('href', '/staff/kitchen');
    expect(screen.getByRole('link', { name: /Open waiter dispatch/i })).toHaveAttribute('href', '/staff/waiter');
    expect(screen.getByRole('link', { name: /Open admin dashboard/i })).toHaveAttribute('href', '/staff/admin');
    expect(screen.getByRole('link', { name: /Open QR builder/i })).toHaveAttribute('href', '/staff/qr');
    expect(document.querySelectorAll('.staff-workspace.liquid-glass--interactive')).toHaveLength(4);
  });
});
