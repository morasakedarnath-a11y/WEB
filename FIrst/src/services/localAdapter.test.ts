import type { CartLine } from '../domain/types';
import { LocalCafeAdapter, STORAGE_KEY } from './localAdapter';

const now = () => new Date('2026-08-09T12:00:00.000Z');
const orderLine: CartLine = {
  id: 'draft-line',
  menuItemId: 'pasta-alfredo',
  name: 'Alfredo Pasta',
  quantity: 2,
  unitPrice: 189,
  selectedOptions: [],
};

class MemoryStorage implements Storage {
  private data = new Map<string, string>();
  get length() { return this.data.size; }
  clear() { this.data.clear(); }
  getItem(key: string) { return this.data.get(key) ?? null; }
  key(index: number) { return [...this.data.keys()][index] ?? null; }
  removeItem(key: string) { this.data.delete(key); }
  setItem(key: string, value: string) { this.data.set(key, value); }
}

describe('LocalCafeAdapter', () => {
  let storage: Storage;

  beforeEach(() => {
    storage = new MemoryStorage();
  });

  it('loads deterministic seed data and recovers invalid storage', async () => {
    const adapter = new LocalCafeAdapter(storage, now);
    expect((await adapter.getSnapshot()).tables).toHaveLength(12);
    storage.setItem(STORAGE_KEY, '{bad json');
    expect((await new LocalCafeAdapter(storage, now).getSnapshot()).menuItems).toHaveLength(64);
  });

  it('persists menu availability between adapter instances', async () => {
    const adapter = new LocalCafeAdapter(storage, now);
    await adapter.setMenuAvailability('pizza-ghee-roast', false);
    const snapshot = await new LocalCafeAdapter(storage, now).getSnapshot();
    expect(snapshot.menuItems.find((item) => item.id === 'pizza-ghee-roast')?.available).toBe(false);
  });

  it('creates and updates menu items through the service boundary', async () => {
    const adapter = new LocalCafeAdapter(storage, now);
    const snapshot = await adapter.getSnapshot();
    const original = snapshot.menuItems[0];
    await adapter.upsertMenuItem({ ...original, id: 'seasonal-cocoa', name: 'Seasonal Cocoa' });
    expect((await adapter.getSnapshot()).menuItems.find((item) => item.id === 'seasonal-cocoa')?.name).toBe('Seasonal Cocoa');
  });

  it('creates orders idempotently by client request id', async () => {
    const adapter = new LocalCafeAdapter(storage, now);
    const draft = { clientRequestId: 'client-123', tableId: 'table-4', lines: [orderLine] };
    const first = await adapter.createOrder(draft);
    const second = await adapter.createOrder(draft);
    expect(second.id).toBe(first.id);
    expect((await adapter.getSnapshot()).orders.filter((order) => order.clientRequestId === 'client-123')).toHaveLength(1);
    expect(first.total).toBe(397);
  });

  it('rejects new orders while cafe ordering is paused', async () => {
    const adapter = new LocalCafeAdapter(storage, now);
    await adapter.updateSettings({ acceptingOrders: false });
    await expect(adapter.createOrder({ clientRequestId: 'paused-order', tableId: 'table-1', lines: [orderLine] }))
      .rejects.toThrow(/not accepting orders/i);
  });

  it('timestamps valid order transitions and resolves service requests', async () => {
    const adapter = new LocalCafeAdapter(storage, now);
    const transitioned = await adapter.transitionOrder('LC-1042', 'preparing');
    expect(transitioned.statusHistory.at(-1)).toEqual({ status: 'preparing', at: now().toISOString() });
    const resolved = await adapter.resolveServiceRequest('request-1');
    expect(resolved).toMatchObject({ status: 'resolved', resolvedAt: now().toISOString() });
  });

  it('resets mutated data back to the initial seed', async () => {
    const adapter = new LocalCafeAdapter(storage, now);
    await adapter.setMenuAvailability('pizza-ghee-roast', false);
    const snapshot = await adapter.reset();
    expect(snapshot.menuItems.find((item) => item.id === 'pizza-ghee-roast')?.available).toBe(true);
  });
});
