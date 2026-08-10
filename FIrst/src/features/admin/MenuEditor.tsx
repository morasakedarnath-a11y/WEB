import { Edit3, ImageOff, Plus, Search, ToggleLeft, ToggleRight } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { categories } from '../../domain/catalog';
import type { MenuItem } from '../../domain/types';
import type { CafeService } from '../../services/contracts';

const blankItem = (): MenuItem => ({ id: '', kind: 'item', name: '', description: '', price: 0, categoryId: 'pizza', image: '/images/pizza.webp', available: true, vegetarian: true });

export function MenuEditor({ items, service, refresh }: { items: MenuItem[]; service: CafeService | null; refresh: () => Promise<void> }) {
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const filtered = useMemo(() => items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())), [items, search]);
  const setAvailability = async (item: MenuItem) => { if (!service) return; await service.setMenuAvailability(item.id, !item.available); await refresh(); };
  const save = async (event: FormEvent) => {
    event.preventDefault();
    if (!editing || !service) return;
    const validation = [!editing.name.trim() ? 'Name is required.' : '', editing.price < 0 ? 'Price cannot be negative.' : '', !editing.description.trim() ? 'Description is required.' : ''].filter(Boolean);
    if (validation.length) { setErrors(validation); return; }
    const category = categories.find((candidate) => candidate.id === editing.categoryId)!;
    const item = { ...editing, id: editing.id || `custom-${editing.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`, image: editing.image || category.image };
    await service.upsertMenuItem(item); await refresh(); setEditing(null); setErrors([]);
  };
  return (
    <section className="admin-panel menu-editor liquid-glass liquid-glass--dense" aria-labelledby="menu-management-title">
      <div className="admin-panel__heading"><div><p className="eyebrow">Catalog control</p><h2 id="menu-management-title">Menu management</h2><p>{items.length} items across {categories.length} categories</p></div><Button onClick={() => setEditing(blankItem())}><Plus aria-hidden="true" /> Add item</Button></div>
      <label className="admin-search"><Search aria-hidden="true" /><input type="search" aria-label="Search menu items" placeholder="Search menu items…" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
      <div className="menu-admin-list">{filtered.map((item) => <article className="liquid-glass liquid-glass--dense" key={item.id}><div className="menu-admin-thumb">{item.image ? <img src={item.image} alt="" /> : <ImageOff aria-hidden="true" />}</div><div><strong>{item.name}</strong><span>{categories.find((category) => category.id === item.categoryId)?.name}</span></div><strong className="tabular">{item.price ? `₹${item.price}` : 'Variable'}</strong><Badge tone={item.available ? 'success' : 'danger'}>{item.available ? 'Available' : 'Sold out'}</Badge><button className="menu-admin-action liquid-glass--interactive control-44" aria-label={`Mark ${item.name} ${item.available ? 'sold out' : 'available'}`} onClick={() => void setAvailability(item)}>{item.available ? <ToggleRight aria-hidden="true" /> : <ToggleLeft aria-hidden="true" />}</button><button className="menu-admin-action liquid-glass--interactive control-44" aria-label={`Edit ${item.name}`} onClick={() => setEditing(structuredClone(item))}><Edit3 aria-hidden="true" /></button></article>)}</div>
      <Dialog open={Boolean(editing)} title={editing?.id ? 'Edit menu item' : 'Add menu item'} onClose={() => { setEditing(null); setErrors([]); }}>{editing && <form className="menu-item-form" onSubmit={(event) => void save(event)}><label>Name<input value={editing.name} onChange={(event) => setEditing({ ...editing, name: event.target.value })} /></label><label>Description<textarea value={editing.description} onChange={(event) => setEditing({ ...editing, description: event.target.value })} /></label><div className="form-row"><label>Category<select value={editing.categoryId} onChange={(event) => { const categoryId = event.target.value as MenuItem['categoryId']; setEditing({ ...editing, categoryId, image: categories.find((category) => category.id === categoryId)?.image ?? editing.image }); }}>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label><label>Price ₹<input type="number" min="0" value={editing.price} onChange={(event) => setEditing({ ...editing, price: Number(event.target.value) })} /></label></div><label className="check-label"><input type="checkbox" checked={editing.vegetarian ?? false} onChange={(event) => setEditing({ ...editing, vegetarian: event.target.checked })} /> Vegetarian</label><label className="check-label"><input type="checkbox" checked={editing.available} onChange={(event) => setEditing({ ...editing, available: event.target.checked })} /> Available to order</label>{errors.length > 0 && <ul className="form-errors" role="alert">{errors.map((error) => <li key={error}>{error}</li>)}</ul>}<Button type="submit">Save menu item</Button></form>}</Dialog>
    </section>
  );
}
