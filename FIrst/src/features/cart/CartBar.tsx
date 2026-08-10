import { ArrowRight } from 'lucide-react';

export function CartBar({ count, total, onClick }: { count: number; total: number; onClick: () => void }) {
  return <button className="cart-bar glass-dark liquid-glass--interactive control-44" aria-label={`Review order, ${count} ${count === 1 ? 'item' : 'items'}, ₹${total}`} onClick={onClick}><span><strong>{count}</strong> {count === 1 ? 'item' : 'items'}</span><span>Review order</span><span className="tabular">₹{total} <ArrowRight aria-hidden="true" size={17} /></span></button>;
}
