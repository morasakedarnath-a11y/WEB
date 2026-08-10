import { ArrowUpRight, ChefHat, HandPlatter, LayoutDashboard, QrCode, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import './staffPortal.css';

type Workspace = {
  title: string;
  eyebrow: string;
  description: string;
  to: string;
  icon: LucideIcon;
};

const workspaces: Workspace[] = [
  {
    title: 'Kitchen Display',
    eyebrow: 'Back of house',
    description: 'See incoming tickets, preparation times, and orders ready for service.',
    to: '/staff/kitchen',
    icon: ChefHat,
  },
  {
    title: 'Waiter Dispatch',
    eyebrow: 'Floor service',
    description: 'Track tables, deliver ready orders, and keep every guest updated.',
    to: '/staff/waiter',
    icon: HandPlatter,
  },
  {
    title: 'Admin Dashboard',
    eyebrow: 'Cafe overview',
    description: 'Review today’s activity, manage the menu, and monitor operations.',
    to: '/staff/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'QR Builder',
    eyebrow: 'Table setup',
    description: 'Create and download table QR codes for direct guest ordering.',
    to: '/staff/qr',
    icon: QrCode,
  },
];

export function StaffPortalPage() {
  return (
    <main className="staff-page staff-portal">
      <header className="staff-portal__intro glass-panel">
        <div>
          <p className="eyebrow">Luca Cafe team</p>
          <h1>Staff Portal</h1>
          <p>Everything your team needs to run a smooth service, connected in one place.</p>
        </div>
        <div className="staff-portal__status">
          <Sparkles aria-hidden="true" />
          <span><strong>Four connected tools</strong><small>One shared cafe workflow</small></span>
        </div>
      </header>

      <section className="staff-portal__workspaces" aria-labelledby="workspace-title">
        <div className="staff-portal__section-title">
          <p className="eyebrow">Start your shift</p>
          <h2 id="workspace-title">Choose your workspace</h2>
        </div>
        <div className="staff-portal__grid">
          {workspaces.map((workspace) => {
            const Icon = workspace.icon;
            return (
              <Link
                className="staff-workspace liquid-glass liquid-glass--interactive"
                to={workspace.to}
                aria-label={`Open ${workspace.title}`}
                key={workspace.to}
              >
                <span className="staff-workspace__icon"><Icon aria-hidden="true" /></span>
                <span className="staff-workspace__copy">
                  <small>{workspace.eyebrow}</small>
                  <strong>{workspace.title}</strong>
                  <span>{workspace.description}</span>
                </span>
                <ArrowUpRight className="staff-workspace__arrow" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
