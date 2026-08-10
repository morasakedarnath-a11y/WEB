import { Bell, Coffee, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IconButton } from '../ui/IconButton';

export function CustomerHeader({ tableNumber, cartCount, onCart, onService }: { tableNumber: number; cartCount: number; onCart: () => void; onService: () => void }) {
  return (
    <header className="customer-header glass-panel">
      <Link className="wordmark" to="/" aria-label="Luca Cafe home"><Coffee aria-hidden="true" size={21} /><span>Luca</span><small>cafe</small></Link>
      <div className="customer-header__actions">
        <span className="table-chip liquid-glass">Table {tableNumber}</span>
        <IconButton label="Request table service" icon={<Bell aria-hidden="true" size={19} />} onClick={onService} />
        <button className="cart-icon glass-dark liquid-glass--interactive control-44" aria-label={`Open cart, ${cartCount} items`} onClick={onCart}>
          <ShoppingBag aria-hidden="true" size={19} />{cartCount > 0 && <span>{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}
