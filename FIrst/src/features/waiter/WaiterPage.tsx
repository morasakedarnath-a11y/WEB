import { BellRing, Check, Clock3, Droplets, HandPlatter, ReceiptText, RefreshCw, Utensils } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';
import type { Order } from '../../domain/types';
import { useCafe } from '../../state/CafeStore';
import './waiter.css';

const requestMeta = {
  'call-waiter': { label: 'Waiter requested', icon: BellRing },
  water: { label: 'Water requested', icon: Droplets },
  bill: { label: 'Bill requested', icon: ReceiptText },
  cutlery: { label: 'Cutlery requested', icon: Utensils },
};

export function WaiterPage() {
  const { snapshot, loading, service, refresh } = useCafe();
  const [paymentOrder, setPaymentOrder] = useState<Order | null>(null);
  const openRequests = snapshot?.serviceRequests.filter((request) => request.status !== 'resolved').sort((a, b) => a.createdAt.localeCompare(b.createdAt)) ?? [];
  const readyOrders = snapshot?.orders.filter((order) => order.status === 'ready') ?? [];
  const activeOrders = snapshot?.orders.filter((order) => !['paid', 'cancelled'].includes(order.status)) ?? [];

  const resolve = async (id: string) => { if (!service) return; await service.resolveServiceRequest(id); await refresh(); };
  const transition = async (id: string, status: 'delivered' | 'paid') => { if (!service) return; await service.transitionOrder(id, status); await refresh(); };

  return (
    <main className="staff-page waiter-page">
      <header className="staff-page-header"><div><p className="eyebrow">Front of house</p><h1>Waiter dispatch</h1><p>Requests, pickups, and tables—ordered by what needs you now.</p></div><div className="staff-page-header__meta"><Badge tone={openRequests.length ? 'warning' : 'success'}>{openRequests.length} requests</Badge><button className="icon-button control-44" aria-label="Refresh waiter dispatch" onClick={() => void refresh()}><RefreshCw aria-hidden="true" /></button></div></header>
      {loading || !snapshot ? <LoadingSkeleton rows={5} /> : <div className="waiter-layout">
        <div className="waiter-primary">
          <section className="dispatch-section liquid-glass liquid-glass--dense"><div className="dispatch-heading"><div><span className="dispatch-icon dispatch-icon--urgent"><BellRing aria-hidden="true" /></span><div><h2>Needs attention</h2><p>Oldest guest requests first</p></div></div><span>{openRequests.length}</span></div><div className="dispatch-list">{openRequests.length ? openRequests.map((request) => { const meta = requestMeta[request.type]; const Icon = meta.icon; const table = snapshot.tables.find((candidate) => candidate.id === request.tableId); return <article className="request-card liquid-glass liquid-glass--dense" key={request.id}><span className="request-card__icon"><Icon aria-hidden="true" /></span><div><strong>{meta.label}</strong><span>Table {table?.number}</span><small><Clock3 aria-hidden="true" /> Waiting now</small></div><Button variant="secondary" aria-label={`Resolve ${request.type === 'water' ? 'water' : request.type} request for Table ${table?.number}`} onClick={() => void resolve(request.id)}><Check aria-hidden="true" /> Resolve</Button></article>; }) : <div className="dispatch-empty"><Check aria-hidden="true" /> No pending requests</div>}</div></section>
          <section className="dispatch-section liquid-glass liquid-glass--dense"><div className="dispatch-heading"><div><span className="dispatch-icon dispatch-icon--ready"><HandPlatter aria-hidden="true" /></span><div><h2>Ready for pickup</h2><p>From kitchen to table</p></div></div><span>{readyOrders.length}</span></div><div className="dispatch-list">{readyOrders.length ? readyOrders.map((order) => { const table = snapshot.tables.find((candidate) => candidate.id === order.tableId); return <article className="pickup-card liquid-glass liquid-glass--dense" key={order.id}><div><Badge tone="success">Ready</Badge><strong className="tabular">{order.id}</strong><span>Table {table?.number}</span></div><ul>{order.lines.map((line) => <li key={line.id}><b>{line.quantity}×</b>{line.name}</li>)}</ul><Button aria-label={`Deliver ${order.id} to Table ${table?.number}`} onClick={() => void transition(order.id, 'delivered')}>Mark delivered</Button></article>; }) : <div className="dispatch-empty"><HandPlatter aria-hidden="true" /> Nothing waiting at the pass</div>}</div></section>
        </div>
        <aside className="table-operations liquid-glass liquid-glass--dense" aria-label="Active table operations"><div className="dispatch-heading"><div><span className="dispatch-icon"><ReceiptText aria-hidden="true" /></span><div><h2>Active tables</h2><p>Open orders and bills</p></div></div><span>{activeOrders.length}</span></div><div className="active-table-list">{activeOrders.map((order) => { const table = snapshot.tables.find((candidate) => candidate.id === order.tableId); return <article className="liquid-glass liquid-glass--dense" key={order.id}><header><div><strong>Table {table?.number}</strong><span>{order.id}</span></div><Badge tone={order.status === 'delivered' ? 'warning' : 'neutral'}>{order.status}</Badge></header><div><span>{order.lines.reduce((sum, line) => sum + line.quantity, 0)} items</span><strong className="tabular">₹{order.total}</strong></div>{order.status === 'delivered' && <Button variant="secondary" onClick={() => setPaymentOrder(order)}>Record payment</Button>}</article>; })}</div></aside>
      </div>}
      <Dialog open={Boolean(paymentOrder)} title="Confirm payment" onClose={() => setPaymentOrder(null)}>{paymentOrder && <div className="confirm-payment"><ReceiptText aria-hidden="true" /><p>Mark <strong>{paymentOrder.id}</strong> as paid? This will settle the Table {snapshot?.tables.find((table) => table.id === paymentOrder.tableId)?.number} bill.</p><div><Button variant="secondary" onClick={() => setPaymentOrder(null)}>Cancel</Button><Button onClick={() => { void transition(paymentOrder.id, 'paid'); setPaymentOrder(null); }}>Confirm paid · ₹{paymentOrder.total}</Button></div></div>}</Dialog>
    </main>
  );
}
