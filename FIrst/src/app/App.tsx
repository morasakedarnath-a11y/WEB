import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import type { ReactNode } from 'react';
import { StaffShell } from '../components/layout/StaffShell';
import { AdminPage } from '../features/admin/AdminPage';
import { StaffGate } from '../features/auth/StaffGate';
import { KitchenPage } from '../features/kitchen/KitchenPage';
import { LandingPage } from '../features/landing/LandingPage';
import { MenuPage } from '../features/menu/MenuPage';
import { OrderTracker } from '../features/orders/OrderTracker';
import { QrPage } from '../features/qr/QrPage';
import { StaffPortalPage } from '../features/staff/StaffPortalPage';
import { WaiterPage } from '../features/waiter/WaiterPage';

function StaffRoute({ children }: { children: ReactNode }) {
  return <StaffGate><StaffShell>{children}</StaffShell></StaffGate>;
}

function LegacyProductRoute() {
  const { productId } = useParams();
  return <Navigate to={`/menu?product=${encodeURIComponent(productId ?? '')}`} replace />;
}

const staffRoutes = [
  { path: '/staff/kitchen', alias: '/kitchen', element: <KitchenPage /> },
  { path: '/staff/waiter', alias: '/waiter', element: <WaiterPage /> },
  { path: '/staff/admin', alias: '/admin', element: <AdminPage /> },
  { path: '/staff/qr', alias: '/qr', element: <QrPage /> },
] as const;

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/menu/:productId" element={<LegacyProductRoute />} />
      <Route path="/cart" element={<Navigate to="/menu" replace />} />
      <Route path="/orders" element={<OrderTracker />} />
      <Route path="/staff" element={<StaffRoute><StaffPortalPage /></StaffRoute>} />
      {staffRoutes.flatMap((route) => [
        <Route key={route.path} path={route.path} element={<StaffRoute>{route.element}</StaffRoute>} />,
        <Route key={route.alias} path={route.alias} element={<Navigate to={route.path} replace />} />,
      ])}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
