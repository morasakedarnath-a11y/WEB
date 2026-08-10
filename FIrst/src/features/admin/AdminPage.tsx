import { Banknote, ClipboardList, Coffee, RotateCcw, Settings, ShoppingBag, Table2, TrendingUp, Users } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';
import { orderStatusLabel } from '../../domain/orderStatus';
import { useCafe } from '../../state/CafeStore';
import { MenuEditor } from './MenuEditor';
import './admin.css';

type AdminTab = 'overview' | 'orders' | 'menu' | 'tables' | 'team';

const tabs: Array<{ id: AdminTab; label: string; icon: typeof TrendingUp }> = [
  { id: 'overview', label: 'Overview', icon: TrendingUp },
  { id: 'orders', label: 'Orders', icon: ClipboardList },
  { id: 'menu', label: 'Menu', icon: ShoppingBag },
  { id: 'tables', label: 'Tables', icon: Table2 },
  { id: 'team', label: 'Team & settings', icon: Users },
];

export function AdminPage() {
  const { snapshot, loading, service, refresh } = useCafe();
  const [tab, setTab] = useState<AdminTab>('overview');
  const [resetOpen, setResetOpen] = useState(false);
  const [settingsDraft, setSettingsDraft] = useState(snapshot?.settings);
  const metrics = useMemo(() => {
    if (!snapshot) return { revenue: 0, average: 0, occupied: 0 };
    const paid = snapshot.orders.filter((order) => order.status === 'paid');
    const revenue = paid.reduce((sum, order) => sum + order.total, 0);
    const average = snapshot.orders.length ? Math.round(snapshot.orders.reduce((sum, order) => sum + order.total, 0) / snapshot.orders.length) : 0;
    const occupied = new Set(snapshot.orders.filter((order) => !['paid', 'cancelled'].includes(order.status)).map((order) => order.tableId)).size;
    return { revenue, average, occupied };
  }, [snapshot]);
  const saveSettings = async (event: FormEvent) => { event.preventDefault(); if (!service || !settingsDraft) return; await service.updateSettings(settingsDraft); await refresh(); };
  const reset = async () => { if (!service) return; await service.reset(); await refresh(); setResetOpen(false); };

  return (
    <main className="staff-page admin-page">
      <header className="staff-page-header"><div><p className="eyebrow">Management</p><h1>Cafe overview</h1><p>A clear view of today’s local demo operation.</p></div><div className="staff-page-header__meta"><Badge>Demo data</Badge></div></header>
      <nav className="admin-tabs" aria-label="Admin sections">{tabs.map((item) => { const Icon = item.icon; return <button className={`liquid-glass liquid-glass--interactive ${tab === item.id ? 'is-active' : ''}`} key={item.id} onClick={() => setTab(item.id)}><Icon aria-hidden="true" />{item.label}</button>; })}</nav>
      {loading || !snapshot ? <LoadingSkeleton rows={5} /> : <div className="admin-content">
        {tab === 'overview' && <><section className="metric-grid" aria-label="Demo performance metrics"><article><span className="metric-icon"><Banknote aria-hidden="true" /></span><p>Settled revenue</p><strong className="tabular">₹{metrics.revenue}</strong><small>Paid demo orders</small></article><article><span className="metric-icon"><ClipboardList aria-hidden="true" /></span><p>Order volume</p><strong className="tabular">{snapshot.orders.length} orders</strong><small>All seeded orders</small></article><article><span className="metric-icon"><TrendingUp aria-hidden="true" /></span><p>Average bill</p><strong className="tabular">₹{metrics.average}</strong><small>Across demo orders</small></article><article><span className="metric-icon"><Table2 aria-hidden="true" /></span><p>Occupied tables</p><strong className="tabular">{metrics.occupied} / {snapshot.tables.length}</strong><small>With open orders</small></article></section><div className="overview-grid"><section className="admin-panel"><div className="admin-panel__heading"><div><p className="eyebrow">Live queue</p><h2>Recent orders</h2></div><Button variant="ghost" onClick={() => setTab('orders')}>View all</Button></div><div className="compact-orders">{snapshot.orders.slice(0, 5).map((order) => <article key={order.id}><div><strong>{order.id}</strong><span>Table {snapshot.tables.find((table) => table.id === order.tableId)?.number}</span></div><Badge tone={order.status === 'paid' ? 'success' : order.status === 'ready' ? 'warning' : 'neutral'}>{orderStatusLabel[order.status]}</Badge><strong className="tabular">₹{order.total}</strong></article>)}</div></section><section className="admin-panel"><div className="admin-panel__heading"><div><p className="eyebrow">At a glance</p><h2>Menu health</h2></div></div><div className="menu-health"><Coffee aria-hidden="true" /><strong>{snapshot.menuItems.length} items</strong><span>{snapshot.menuItems.filter((item) => item.available).length} available · {snapshot.menuItems.filter((item) => !item.available).length} sold out</span><Button variant="secondary" onClick={() => setTab('menu')}>Manage menu</Button></div></section></div></>}
        {tab === 'orders' && <section className="admin-panel"><div className="admin-panel__heading"><div><p className="eyebrow">Order history</p><h2>All demo orders</h2></div></div><div className="admin-table-wrap"><table><thead><tr><th>Order</th><th>Table</th><th>Status</th><th>Items</th><th>Total</th></tr></thead><tbody>{snapshot.orders.map((order) => <tr key={order.id}><td><strong>{order.id}</strong></td><td>Table {snapshot.tables.find((table) => table.id === order.tableId)?.number}</td><td><Badge>{orderStatusLabel[order.status]}</Badge></td><td>{order.lines.reduce((sum, line) => sum + line.quantity, 0)}</td><td className="tabular">₹{order.total}</td></tr>)}</tbody></table></div></section>}
        {tab === 'menu' && <MenuEditor items={snapshot.menuItems} service={service} refresh={refresh} />}
        {tab === 'tables' && <section className="admin-panel"><div className="admin-panel__heading"><div><p className="eyebrow">Floor plan</p><h2>Table status</h2><p>{snapshot.tables.length} configured tables</p></div></div><div className="admin-table-grid">{snapshot.tables.map((table) => { const orders = snapshot.orders.filter((order) => order.tableId === table.id && !['paid', 'cancelled'].includes(order.status)); const total = orders.reduce((sum, order) => sum + order.total, 0); return <article key={table.id}><header><strong>Table {table.number}</strong><Badge tone={orders.length ? 'warning' : 'success'}>{orders.length ? 'Occupied' : 'Available'}</Badge></header><p>{table.seats} seats · {table.zone}</p><div><span>{orders.length} open orders</span><strong className="tabular">₹{total}</strong></div></article>; })}</div></section>}
        {tab === 'team' && <div className="settings-grid"><section className="admin-panel"><div className="admin-panel__heading"><div><p className="eyebrow">People</p><h2>Staff overview</h2></div></div><div className="staff-list">{snapshot.staff.map((member) => <article key={member.id}><span>{member.name.slice(0, 1)}</span><div><strong>{member.name}</strong><small>{member.role}</small></div><Badge tone={member.active ? 'success' : 'neutral'}>{member.active ? 'Active' : 'Away'}</Badge></article>)}</div></section><section className="admin-panel"><div className="admin-panel__heading"><div><p className="eyebrow">Configuration</p><h2>Cafe settings</h2></div></div><form className="settings-form" onSubmit={(event) => void saveSettings(event)}><label>Cafe name<input value={(settingsDraft ?? snapshot.settings).cafeName} onChange={(event) => setSettingsDraft({ ...(settingsDraft ?? snapshot.settings), cafeName: event.target.value })} /></label><label>Phone<input value={(settingsDraft ?? snapshot.settings).phone} onChange={(event) => setSettingsDraft({ ...(settingsDraft ?? snapshot.settings), phone: event.target.value })} /></label><div className="form-row"><label>GST %<input type="number" min="0" max="28" value={(settingsDraft ?? snapshot.settings).gstPercent} onChange={(event) => setSettingsDraft({ ...(settingsDraft ?? snapshot.settings), gstPercent: Number(event.target.value) })} /></label><label>Prep estimate<input type="number" min="1" value={(settingsDraft ?? snapshot.settings).estimatedPrepMinutes} onChange={(event) => setSettingsDraft({ ...(settingsDraft ?? snapshot.settings), estimatedPrepMinutes: Number(event.target.value) })} /></label></div><label className="check-label"><input type="checkbox" checked={(settingsDraft ?? snapshot.settings).acceptingOrders} onChange={(event) => setSettingsDraft({ ...(settingsDraft ?? snapshot.settings), acceptingOrders: event.target.checked })} /> Accepting customer orders</label><Button type="submit"><Settings aria-hidden="true" /> Save settings</Button></form><div className="danger-zone"><div><strong>Reset local demo</strong><span>Restore seeded orders, menu, tables, and settings.</span></div><Button variant="danger" onClick={() => setResetOpen(true)}><RotateCcw aria-hidden="true" /> Reset</Button></div></section></div>}
      </div>}
      <Dialog open={resetOpen} title="Reset all demo data?" onClose={() => setResetOpen(false)}><div className="confirm-payment"><RotateCcw aria-hidden="true" /><p>This replaces all local changes with Luca Cafe’s original demo seed. It cannot be undone in this browser.</p><div><Button variant="secondary" onClick={() => setResetOpen(false)}>Cancel</Button><Button variant="danger" onClick={() => void reset()}>Reset demo data</Button></div></div></Dialog>
    </main>
  );
}
