import { Minus, Plus, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Combo, MenuItem } from '../../domain/types';
import { useCafe } from '../../state/CafeStore';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { IconButton } from '../../components/ui/IconButton';

export function ProductSheet({ item, open, onClose, orderingEnabled = true }: { item: MenuItem | null; open: boolean; onClose: () => void; orderingEnabled?: boolean }) {
  const { addToCart } = useCafe();
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    setSelections({}); setQuantity(1); setNotes(''); setShowErrors(false);
  }, [item?.id]);

  const missingGroups = useMemo(() => item?.optionGroups?.filter((group) => group.required && !selections[group.id]) ?? [], [item, selections]);
  if (!item) return null;

  const add = () => {
    if (missingGroups.length) { setShowErrors(true); return; }
    const selectedOptions = (item.optionGroups ?? []).flatMap((group) => {
      const option = group.options.find((candidate) => candidate.id === selections[group.id]);
      return option ? [{ groupId: group.id, optionId: option.id, label: option.name, priceDelta: option.priceDelta ?? 0 }] : [];
    });
    const optionTotal = selectedOptions.reduce((sum, option) => sum + option.priceDelta, 0);
    const signature = selectedOptions.map((option) => `${option.groupId}:${option.optionId}`).join('|');
    addToCart({
      id: `${item.id}::${signature}::${notes.trim()}`,
      menuItemId: item.id,
      name: item.name,
      quantity,
      unitPrice: item.price + optionTotal,
      selectedOptions,
      notes: notes.trim() || undefined,
    });
    onClose();
  };

  return (
    <Dialog open={open} title={item.name} onClose={onClose}>
      <div className="product-sheet">
        <IconButton className="product-sheet__close" label="Close item details" icon={<X aria-hidden="true" />} onClick={onClose} />
        <p className="product-sheet__description">{item.description}</p>
        {item.kind === 'combo' && <div className="combo-contents liquid-glass liquid-glass--dense"><strong>Fixed combo includes</strong><ul>{(item as Combo).contents.map((line) => <li key={line.label}><span>{line.quantity}×</span> {line.label}</li>)}</ul><small>Combo contents are fixed and cannot be substituted.</small></div>}
        {item.optionGroups?.map((group) => (
          <fieldset className="option-group" key={group.id}>
            <legend>{group.name} {group.required && <span>Required</span>}</legend>
            <div className="option-grid">
              {group.options.map((option) => (
                <label className="liquid-glass liquid-glass--interactive" key={option.id}><input type="radio" name={group.id} value={option.id} checked={selections[group.id] === option.id} onChange={() => setSelections((current) => ({ ...current, [group.id]: option.id }))} /><span>{option.name}</span>{option.priceDelta ? <small>+₹{option.priceDelta}</small> : null}</label>
              ))}
            </div>
            {showErrors && missingGroups.some((missing) => missing.id === group.id) && <p className="field-error">{group.name} to continue.</p>}
          </fieldset>
        ))}
        <label className="notes-field">Anything we should know?<textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Less spicy, allergy note…" maxLength={160} /></label>
        <div className="product-sheet__footer">
          <div className="quantity-stepper liquid-glass" aria-label="Quantity"><button aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus aria-hidden="true" /></button><span className="tabular">{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}><Plus aria-hidden="true" /></button></div>
          <Button disabled={!orderingEnabled} onClick={add}>{orderingEnabled ? 'Add to order' : 'Ordering paused'} <span className="tabular">₹{item.price * quantity}</span></Button>
        </div>
      </div>
    </Dialog>
  );
}
