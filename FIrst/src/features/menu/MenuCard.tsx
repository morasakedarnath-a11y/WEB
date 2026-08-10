import { ArrowUpRight, Leaf } from 'lucide-react';
import type { MenuItem } from '../../domain/types';
import { FoodImage } from '../../components/ui/FoodImage';

export function MenuCard({ item, onSelect, orderingEnabled = true }: { item: MenuItem; onSelect: (item: MenuItem) => void; orderingEnabled?: boolean }) {
  return (
    <article className={`menu-card liquid-glass liquid-glass--dense liquid-glass--interactive ${!item.available ? 'is-sold-out' : ''}`}>
      <div className="menu-card__image"><FoodImage src={item.image} alt={`${item.name} at Luca Cafe`} loading="lazy" decoding="async" />{item.vegetarian && <span className="veg-mark" role="img" aria-label="Vegetarian"><Leaf aria-hidden="true" size={13} /></span>}</div>
      <div className="menu-card__body">
        <div className="menu-card__title"><h3>{item.name}</h3><strong className="tabular">{item.price > 0 ? `₹${item.price}` : 'As available'}</strong></div>
        <p>{item.description}</p>
        {item.availabilityNote && <small>{item.availabilityNote}</small>}
        <button aria-label={`${item.optionGroups?.length || item.kind === 'combo' ? 'Customize' : 'Add'} ${item.name}`} disabled={!item.available || !orderingEnabled} onClick={() => onSelect(item)}>
          {!orderingEnabled ? 'Ordering paused' : item.available ? (item.optionGroups?.length || item.kind === 'combo' ? 'Customize' : 'Add') : 'Sold out'} <ArrowUpRight aria-hidden="true" size={16} />
        </button>
      </div>
    </article>
  );
}
