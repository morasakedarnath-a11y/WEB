import { ChefHat, Coffee, LayoutDashboard, LogOut, QrCode, Utensils } from 'lucide-react';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useStaffSession } from '../../features/auth/StaffGate';

const navItems = [
  { to: '/staff/kitchen', label: 'Kitchen', icon: ChefHat },
  { to: '/staff/waiter', label: 'Waiter', icon: Utensils },
  { to: '/staff/admin', label: 'Admin', icon: LayoutDashboard },
  { to: '/staff/qr', label: 'QR builder', icon: QrCode },
];

export function StaffShell({ children }: { children: ReactNode }) {
  const { logout } = useStaffSession();
  return (
    <div className="staff-shell">
      <aside className="staff-sidebar glass-dark" aria-label="Staff workspace navigation">
        <NavLink className="staff-brand" to="/staff" aria-label="Staff Portal"><Coffee aria-hidden="true" /><span>Luca<small>staff</small></span></NavLink>
        <nav aria-label="Staff tools">{navItems.map((item) => { const Icon = item.icon; return <NavLink key={item.to} to={item.to}><Icon aria-hidden="true" /><span>{item.label}</span></NavLink>; })}</nav>
        <button className="staff-logout control-44" aria-label="Log out" onClick={logout}><LogOut aria-hidden="true" /><span>Log out</span></button>
      </aside>
      <div className="staff-main">{children}</div>
    </div>
  );
}
