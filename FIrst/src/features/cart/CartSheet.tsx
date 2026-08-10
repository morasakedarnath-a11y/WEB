import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { EmptyState } from '../../components/ui/EmptyState';
import { calculateBill } from '../../domain/pricing';
import { useCafe } from '../../state/CafeStore';

export function CartSheet({ open, onClose, tableId, tableNumber }: { open: boolean; onClose: () => void; tableId: string; tableNumber: number }) {
  const { cart, updateCartQuantity, clearCart, snapshot, service } = useCafe();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const requestRef = useRef<{ signature: string; id: string } | null>(null);
  const navigate = useNavigate();
  const bill = calculateBill(cart, snapshot?.settings.gstPercent ?? 5);
  const submit = async () => {
    if (!service || !cart.length || submitting) return;
    setSubmitting(true); setError('');
    try {
      const signature = JSON.stringify({ tableId, lines: cart });
      if (requestRef.current?.signature !== signature) requestRef.current = { signature, id: `web-${Date.now()}-${Math.random().toString(36).slice(2)}` };
      const order = await service.createOrder({ clientRequestId: requestRef.current.id, tableId, lines: cart });
      requestRef.current = null; clearCart(); onClose();
      navigate(`/orders?table=${tableNumber}&order=${order.id}`);
    } catch {
      setError('We could not place that order. Your cart is safe—please try again.');
      setSubmitting(false);
    }
  };
  return (
    <Dialog open={open} title="Your order" onClose={onClose}>
      <div className="cart-sheet">
        {!cart.length ? <EmptyState icon={<ShoppingBag aria-hidden="true" />} title="Your tray is empty" description="Add something lovely from the menu." /> : <>
          <p className="cart-sheet__table">Ordering for <strong>Table {tableNumber}</strong></p>
          <div className="cart-lines">{cart.map((line) => <article className="cart-line liquid-glass liquid-glass--dense" key={line.id}><div><h3>{line.name}</h3>{line.selectedOptions.length > 0 && <p>{line.selectedOptions.map((option) => option.label).join(' · ')}</p>}{line.notes && <small>“{line.notes}”</small>}</div><strong className="tabular">₹{line.unitPrice * line.quantity}</strong><div className="quantity-stepper liquid-glass"><button aria-label={`Remove one ${line.name}`} onClick={() => updateCartQuantity(line.id, line.quantity - 1)}>{line.quantity === 1 ? <Trash2 aria-hidden="true" /> : <Minus aria-hidden="true" />}</button><span>{line.quantity}</span><button aria-label={`Add one ${line.name}`} onClick={() => updateCartQuantity(line.id, line.quantity + 1)}><Plus aria-hidden="true" /></button></div></article>)}</div>
          <dl className="cart-totals"><div><dt>Subtotal</dt><dd className="tabular">₹{bill.subtotal}</dd></div><div><dt>GST ({snapshot?.settings.gstPercent ?? 5}%)</dt><dd className="tabular">₹{bill.tax}</dd></div><div className="cart-total"><dt>Total</dt><dd className="tabular">₹{bill.total}</dd></div></dl>
          {error && <p className="field-error" role="alert">{error}</p>}
          {!snapshot?.settings.acceptingOrders && <p className="field-error" role="status">Ordering is paused at the moment. Please ask a team member for help.</p>}
          <Button className="cart-submit" disabled={submitting || !snapshot?.settings.acceptingOrders} onClick={submit}>{submitting ? 'Placing order…' : `Place order · ₹${bill.total}`}</Button>
        </>}
      </div>
    </Dialog>
  );
}
