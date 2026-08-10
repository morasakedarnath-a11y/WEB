import { AlertTriangle, ArrowRight, Clock3 } from 'lucide-react';
import type { Order, Table } from '../../domain/types';
import type { OrderStatus } from '../../domain/orderStatus';

const actionFor: Partial<Record<OrderStatus, { label: string; next: OrderStatus }>> = {
  received: { label: 'Start', next: 'preparing' },
  preparing: { label: 'Mark ready', next: 'ready' },
};

export function KitchenTicket({ order, table, now, onAdvance }: { order: Order; table?: Table; now: Date; onAdvance: (status: OrderStatus) => void }) {
  const elapsed = Math.max(0, Math.floor((now.getTime() - new Date(order.createdAt).getTime()) / 60_000));
  const action = actionFor[order.status];
  const overdue = !['delivered', 'paid', 'cancelled'].includes(order.status) && elapsed >= 20;
  return (
    <article className={`kitchen-ticket liquid-glass liquid-glass--dense ${overdue ? 'is-overdue' : ''}`}>
      <header><div><span>Table {table?.number ?? '?'}</span><strong>{order.id}</strong></div><span className="ticket-time tabular"><Clock3 aria-hidden="true" />{elapsed} min</span></header>
      <div className="ticket-lines">{order.lines.map((line) => <div key={line.id}><span className="ticket-quantity tabular">{line.quantity}×</span><div><strong>{line.name}</strong>{line.selectedOptions.length > 0 && <p>{line.selectedOptions.map((option) => option.label).join(' · ')}</p>}{line.notes && <p className="ticket-note"><AlertTriangle aria-hidden="true" />{line.notes}</p>}</div></div>)}</div>
      {action ? <button className="ticket-action control-44" aria-label={`${action.label} ${order.id}`} onClick={() => onAdvance(action.next)}><span>{action.label}</span><ArrowRight aria-hidden="true" /></button> : order.status === 'ready' ? <div className="ticket-waiting">Awaiting floor pickup</div> : null}
    </article>
  );
}
