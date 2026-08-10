import { Bell, Check, ChefHat, CircleDot, Clock3, Coffee, ReceiptText, Utensils } from 'lucide-react';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';
import { orderStatusLabel, type OrderStatus } from '../../domain/orderStatus';
import { useCafe } from '../../state/CafeStore';
import { ServiceRequestSheet } from './ServiceRequestSheet';
import './orders.css';

const stages: Array<{ status: OrderStatus; icon: typeof CircleDot; copy: string }> = [
  { status: 'received', icon: CircleDot, copy: 'The kitchen has your order.' },
  { status: 'preparing', icon: ChefHat, copy: 'Your favourites are being made.' },
  { status: 'ready', icon: Utensils, copy: 'It is ready to come to your table.' },
  { status: 'delivered', icon: Check, copy: 'Served. Enjoy every bite.' },
  { status: 'paid', icon: ReceiptText, copy: 'All settled. Thank you.' },
];

export function OrderTracker() {
  const { snapshot, loading, service } = useCafe();
  const [params] = useSearchParams();
  const tableNumber = Number(params.get('table'));
  const requestedOrderId = params.get('order');
  const [serviceOpen, setServiceOpen] = useState(false);
  const table = snapshot?.tables.find((candidate) => candidate.number === tableNumber);
  const tableOrders = snapshot?.orders.filter((order) => order.tableId === table?.id) ?? [];
  const order = tableOrders.find((candidate) => candidate.id === requestedOrderId) ?? tableOrders[0];
  const currentIndex = order ? stages.findIndex((stage) => stage.status === order.status) : -1;

  return (
    <div className="tracker-page">
      <header className="tracker-header glass-panel"><Link className="wordmark" to="/"><Coffee aria-hidden="true" size={21} /><span>Luca</span><small>cafe</small></Link>{table && <><span className="table-chip">Table {table.number}</span><button className="icon-button control-44" aria-label="Request table service" onClick={() => setServiceOpen(true)}><Bell aria-hidden="true" size={18} /></button></>}</header>
      <main>
        <div className="tracker-title"><p className="eyebrow">Your Luca moment</p><h1>Track your order</h1><p>We’ll keep this page in step with the kitchen.</p></div>
        {loading ? <LoadingSkeleton rows={4} /> : !order ? <div className="tracker-empty"><Clock3 aria-hidden="true" /><h2>No active order found</h2><p>Choose your table and place an order to follow it here.</p><Link className="button button--primary control-44" to={tableNumber ? `/menu?table=${tableNumber}` : '/menu'}>Browse the menu</Link></div> : <>
          <section className="order-summary-card liquid-glass liquid-glass--dark">
            <div className="order-summary-card__top"><div><p>Order</p><strong className="tabular">{order.id}</strong></div><Badge tone={order.status === 'paid' ? 'success' : order.status === 'cancelled' ? 'danger' : 'warning'}>{order.status === 'paid' ? 'All settled' : `Currently ${orderStatusLabel[order.status].toLowerCase()}`}</Badge></div>
            <div className="order-lines">{order.lines.map((line) => <div key={line.id}><span className="line-quantity tabular">{line.quantity}×</span><div><strong>{line.name}</strong>{line.selectedOptions.length > 0 && <small>{line.selectedOptions.map((option) => option.label).join(' · ')}</small>}</div><span className="tabular">₹{line.quantity * line.unitPrice}</span></div>)}</div>
            <div className="order-summary-card__total"><span>Total</span><strong className="tabular">₹{order.total}</strong></div>
          </section>
          <section className="order-timeline" aria-labelledby="timeline-title"><div><p className="eyebrow">Live progress</p><h2 id="timeline-title">From our kitchen to your table</h2></div><ol>{stages.map((stage, index) => { const Icon = stage.icon; const complete = currentIndex >= index; const active = currentIndex === index; return <li className={`${complete ? 'is-complete' : ''} ${active ? 'is-active' : ''}`} key={stage.status}><span className="timeline-icon"><Icon aria-hidden="true" /></span><div><strong>{orderStatusLabel[stage.status]}</strong><p>{stage.copy}</p></div>{complete && index < currentIndex && <Check className="timeline-check" aria-label="Complete" />}</li>; })}</ol></section>
          <div className="tracker-actions liquid-glass liquid-glass--dense"><div><h2>Still hungry?</h2><p>Add another round to this table whenever you like.</p></div><Link className="button button--primary control-44" to={`/menu?table=${tableNumber}`}>Order another round</Link></div>
        </>}
      </main>
      {table && <ServiceRequestSheet open={serviceOpen} onClose={() => setServiceOpen(false)} service={service} tableId={table.id} tableNumber={table.number} />}
    </div>
  );
}
