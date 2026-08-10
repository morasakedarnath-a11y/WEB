import { ChefHat, Clock3, RefreshCw } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';
import type { OrderStatus } from '../../domain/orderStatus';
import { useCafe } from '../../state/CafeStore';
import { KitchenTicket } from './KitchenTicket';
import './kitchen.css';

const columns: Array<{ id: string; title: string; statuses: OrderStatus[] }> = [
  { id: 'new', title: 'New', statuses: ['received'] },
  { id: 'preparing', title: 'Preparing', statuses: ['preparing'] },
  { id: 'ready', title: 'Ready', statuses: ['ready'] },
  { id: 'completed', title: 'Completed', statuses: ['delivered', 'paid', 'cancelled'] },
];

export function KitchenPage({ now = () => new Date() }: { now?: () => Date }) {
  const { snapshot, loading, service, refresh } = useCafe();
  const advance = async (orderId: string, status: OrderStatus) => {
    if (!service) return;
    await service.transitionOrder(orderId, status);
    await refresh();
  };
  return (
    <main className="staff-page kitchen-page">
      <header className="staff-page-header"><div><p className="eyebrow">Back of house</p><h1>Kitchen display</h1><p>Oldest tickets first. Keep the line moving one clear step at a time.</p></div><div className="staff-page-header__meta"><Badge tone="success">Live demo</Badge><span><Clock3 aria-hidden="true" />{now().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span><button className="icon-button control-44" aria-label="Refresh kitchen" onClick={() => void refresh()}><RefreshCw aria-hidden="true" /></button></div></header>
      {loading || !snapshot ? <LoadingSkeleton rows={5} /> : <div className="kitchen-board">{columns.map((column) => { const orders = snapshot.orders.filter((order) => column.statuses.includes(order.status)).sort((a, b) => a.createdAt.localeCompare(b.createdAt)); return <section className={`kitchen-column kitchen-column--${column.id}`} key={column.id}><header><span className="column-dot" /><h2>{column.title}</h2><span className="column-count tabular">{orders.length}</span></header><div className="kitchen-column__tickets">{orders.length ? orders.map((order) => <KitchenTicket key={order.id} order={order} table={snapshot.tables.find((table) => table.id === order.tableId)} now={now()} onAdvance={(status) => void advance(order.id, status)} />) : <div className="empty-column"><ChefHat aria-hidden="true" /><span>All clear</span></div>}</div></section>; })}</div>}
    </main>
  );
}
