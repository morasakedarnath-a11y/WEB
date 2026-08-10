import { BellRing, Coffee, Droplets, ReceiptText, UtensilsCrossed } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CustomerHeader } from '../../components/layout/CustomerHeader';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';
import { categories } from '../../domain/catalog';
import type { Combo, MenuItem, ServiceRequestType } from '../../domain/types';
import { useCafe } from '../../state/CafeStore';
import { CartBar } from '../cart/CartBar';
import { CartSheet } from '../cart/CartSheet';
import { MenuCard } from './MenuCard';
import { MenuFilters } from './MenuFilters';
import { ProductSheet } from './ProductSheet';
import './customer.css';

const normalizeSearchText = (value: string) => value
  .normalize('NFKD')
  .replace(/\p{Diacritic}/gu, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const isCombo = (item: MenuItem): item is Combo => item.kind === 'combo' && 'contents' in item;

const getSearchableText = (item: MenuItem) => normalizeSearchText([
  item.name,
  item.description,
  item.availabilityNote ?? '',
  categories.find((menuCategory) => menuCategory.id === item.categoryId)?.name ?? '',
  item.optionGroups?.flatMap((group) => [group.name, ...group.options.map((option) => option.name)]).join(' ') ?? '',
  isCombo(item) ? item.contents.map((content) => content.label).join(' ') : '',
  item.vegetarian ? 'vegetarian veg' : '',
].join(' '));

export function MenuPage() {
  const { snapshot, loading, cart, service } = useCafe();
  const [params] = useSearchParams();
  const tableNumber = Number(params.get('table'));
  const activeTable = snapshot?.tables.find((table) => table.number === tableNumber && table.active);
  const initialCategory = params.get('category');
  const [category, setCategory] = useState(categories.some((item) => item.id === initialCategory) ? initialCategory! : 'all');
  const [search, setSearch] = useState('');
  const [vegetarian, setVegetarian] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState('');
  const openedProductId = useRef<string | null>(null);
  const productId = params.get('product');

  useEffect(() => {
    if (!activeTable || !snapshot || !productId || openedProductId.current === productId) return;
    openedProductId.current = productId;
    setSelectedItem(snapshot.menuItems.find((item) => item.id === productId) ?? null);
  }, [activeTable, productId, snapshot]);

  const visibleItems = useMemo(() => {
    const searchTerms = normalizeSearchText(search).split(' ').filter(Boolean);
    return (snapshot?.menuItems ?? []).filter((item) => {
      const matchesCategory = category === 'all' || item.categoryId === category;
      const searchableText = getSearchableText(item);
      const matchesSearch = searchTerms.every((term) => searchableText.includes(term));
      return matchesCategory && matchesSearch && (!vegetarian || item.vegetarian);
    });
  }, [snapshot, category, search, vegetarian]);
  const grouped = categories.map((menuCategory) => ({ ...menuCategory, items: visibleItems.filter((item) => item.categoryId === menuCategory.id) })).filter((group) => group.items.length);
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const cartTotal = cart.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
  const tableHref = (number: number) => {
    const next = new URLSearchParams(params);
    next.set('table', String(number));
    return `/menu?${next.toString()}`;
  };

  if (loading || !snapshot) return <main className="customer-loading"><LoadingSkeleton rows={5} /></main>;
  if (!activeTable) {
    return (
      <main className="table-select-page">
        <div className="table-select-card glass-panel"><Coffee aria-hidden="true" /><p className="eyebrow">Welcome to Luca</p><h1>Choose your table</h1><p>Pick the number shown on your table standee to begin your order.</p><div className="table-grid">{snapshot.tables.filter((table) => table.active).map((table) => <Link className="liquid-glass liquid-glass--interactive control-44" aria-label={`Table ${table.number}`} key={table.id} to={tableHref(table.number)}>Table {table.number}<small>{table.seats} seats</small></Link>)}</div><Link to="/">Back to Luca Cafe</Link></div>
      </main>
    );
  }

  const requestService = async (type: ServiceRequestType) => {
    if (!service) return;
    await service.createServiceRequest(activeTable.id, type);
    setRequestStatus(type === 'water' ? 'Water is on the way.' : type === 'bill' ? 'We’ll bring your bill shortly.' : 'A team member will be with you soon.');
  };

  return (
    <div className="customer-page">
      <CustomerHeader tableNumber={tableNumber} cartCount={cartCount} onCart={() => setCartOpen(true)} onService={() => setServiceOpen(true)} />
      <main>
        <section className="menu-hero"><p className="eyebrow">Table {tableNumber} · take your time</p><h1>Our menu</h1><p>Comforting cafe plates, cheerful drinks, and a few Luca signatures.</p></section>
        {!snapshot.settings.acceptingOrders && <p className="request-success" role="status">Online ordering is paused. You can still browse the menu and ask our team for help.</p>}
        <MenuFilters categories={categories} activeCategory={category} onCategory={setCategory} search={search} onSearch={(value) => { setSearch(value); if (value.trim()) setCategory('all'); }} vegetarian={vegetarian} onVegetarian={() => setVegetarian((value) => !value)} />
        <div className="menu-content">
          {grouped.length ? grouped.map((group) => <section className="menu-category" id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}><div className="menu-category__heading"><div><p className="eyebrow">{group.items.length} choices</p><h2 id={`${group.id}-title`}>{group.name}</h2></div><p>{group.description}</p></div><div className="menu-grid">{group.items.map((item) => <MenuCard key={item.id} item={item} orderingEnabled={snapshot.settings.acceptingOrders} onSelect={setSelectedItem} />)}</div></section>) : <div className="menu-no-results"><UtensilsCrossed aria-hidden="true" /><h2>No matches yet</h2><p>Try another search or clear a filter.</p><Button variant="secondary" onClick={() => { setSearch(''); setCategory('all'); setVegetarian(false); }}>Clear filters</Button></div>}
        </div>
      </main>
      <ProductSheet item={selectedItem} open={Boolean(selectedItem)} orderingEnabled={snapshot.settings.acceptingOrders} onClose={() => setSelectedItem(null)} />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} tableId={activeTable.id} tableNumber={tableNumber} />
      {cartCount > 0 && !cartOpen && <CartBar count={cartCount} total={cartTotal} onClick={() => setCartOpen(true)} />}
      <Dialog open={serviceOpen} title="How can we help?" onClose={() => { setServiceOpen(false); setRequestStatus(''); }}>
        <div className="service-request-grid">
          <button className="liquid-glass liquid-glass--interactive" onClick={() => void requestService('call-waiter')}><BellRing aria-hidden="true" /><strong>Call a waiter</strong><span>We’ll come to Table {tableNumber}</span></button>
          <button className="liquid-glass liquid-glass--interactive" onClick={() => void requestService('water')}><Droplets aria-hidden="true" /><strong>Request water</strong><span>We’ll bring it over</span></button>
          <button className="liquid-glass liquid-glass--interactive" onClick={() => void requestService('bill')}><ReceiptText aria-hidden="true" /><strong>Request the bill</strong><span>Ready when you are</span></button>
          {requestStatus && <p className="request-success" role="status">{requestStatus}</p>}
        </div>
      </Dialog>
    </div>
  );
}
