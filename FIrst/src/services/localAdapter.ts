import { canTransition, type OrderStatus } from '../domain/orderStatus';
import { calculateBill } from '../domain/pricing';
import type { Order, ServiceRequest } from '../domain/types';
import type { CafeService, CafeSnapshot, OrderDraft, QrSettings } from './contracts';
import { createSeedSnapshot } from './seed';

export const STORAGE_KEY = 'luca-cafe-demo-v1';

const isSnapshot = (value: unknown): value is CafeSnapshot => {
  if (!value || typeof value !== 'object') return false;
  const snapshot = value as Partial<CafeSnapshot>;
  return snapshot.version === 1
    && Array.isArray(snapshot.menuItems)
    && Array.isArray(snapshot.orders)
    && Array.isArray(snapshot.tables)
    && Array.isArray(snapshot.serviceRequests)
    && Boolean(snapshot.settings);
};

export class LocalCafeAdapter implements CafeService {
  private readonly listeners = new Set<(snapshot: CafeSnapshot) => void>();
  private channel?: BroadcastChannel;

  constructor(
    private readonly storage: Storage = window.localStorage,
    private readonly now: () => Date = () => new Date(),
  ) {
    if (typeof BroadcastChannel !== 'undefined') {
      this.channel = new BroadcastChannel('luca-cafe-demo');
      this.channel.onmessage = () => void this.emitFromStorage();
    }
  }

  async getSnapshot(): Promise<CafeSnapshot> {
    const raw = this.storage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed: unknown = JSON.parse(raw);
        if (isSnapshot(parsed)) return parsed;
      } catch {
        // Invalid demo state is intentionally recovered below.
      }
    }
    const seed = createSeedSnapshot();
    this.storage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }

  async authenticateStaff(pin: string) {
    return pin === '2490';
  }

  async setMenuAvailability(menuItemId: string, available: boolean) {
    return this.mutate((snapshot) => {
      const item = snapshot.menuItems.find((candidate) => candidate.id === menuItemId);
      if (!item) throw new Error(`Unknown menu item: ${menuItemId}`);
      item.available = available;
    });
  }

  async upsertMenuItem(item: CafeSnapshot['menuItems'][number]) {
    return this.mutate((snapshot) => {
      const index = snapshot.menuItems.findIndex((candidate) => candidate.id === item.id);
      if (index >= 0) snapshot.menuItems[index] = structuredClone(item);
      else snapshot.menuItems.push(structuredClone(item));
    });
  }

  async createOrder(draft: OrderDraft): Promise<Order> {
    const snapshot = await this.getSnapshot();
    const duplicate = snapshot.orders.find((order) => order.clientRequestId === draft.clientRequestId);
    if (duplicate) return duplicate;
    if (!snapshot.settings.acceptingOrders) throw new Error('Luca Cafe is not accepting orders right now.');

    const bill = calculateBill(draft.lines, snapshot.settings.gstPercent);
    const timestamp = this.now().toISOString();
    const nextNumber = Math.max(1042, ...snapshot.orders.map((order) => Number(order.id.replace(/\D/g, '')) || 0)) + 1;
    const order: Order = {
      id: `LC-${nextNumber}`,
      clientRequestId: draft.clientRequestId,
      tableId: draft.tableId,
      lines: structuredClone(draft.lines),
      ...bill,
      status: 'received',
      statusHistory: [{ status: 'received', at: timestamp }],
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    snapshot.orders.unshift(order);
    await this.persist(snapshot);
    return order;
  }

  async transitionOrder(orderId: string, status: OrderStatus): Promise<Order> {
    const snapshot = await this.getSnapshot();
    const order = snapshot.orders.find((candidate) => candidate.id === orderId);
    if (!order) throw new Error(`Unknown order: ${orderId}`);
    if (!canTransition(order.status, status)) {
      throw new Error(`Cannot transition ${order.status} to ${status}`);
    }
    const timestamp = this.now().toISOString();
    order.status = status;
    order.updatedAt = timestamp;
    order.statusHistory.push({ status, at: timestamp });
    await this.persist(snapshot);
    return order;
  }

  async createServiceRequest(tableId: string, type: ServiceRequest['type']): Promise<ServiceRequest> {
    const snapshot = await this.getSnapshot();
    const existing = snapshot.serviceRequests.find(
      (request) => request.tableId === tableId && request.type === type && request.status !== 'resolved',
    );
    if (existing) return existing;
    const request: ServiceRequest = {
      id: `request-${snapshot.serviceRequests.length + 1}`,
      tableId,
      type,
      status: 'open',
      createdAt: this.now().toISOString(),
    };
    snapshot.serviceRequests.unshift(request);
    await this.persist(snapshot);
    return request;
  }

  async resolveServiceRequest(requestId: string): Promise<ServiceRequest> {
    const snapshot = await this.getSnapshot();
    const request = snapshot.serviceRequests.find((candidate) => candidate.id === requestId);
    if (!request) throw new Error(`Unknown service request: ${requestId}`);
    request.status = 'resolved';
    request.resolvedAt = this.now().toISOString();
    await this.persist(snapshot);
    return request;
  }

  async updateSettings(settings: Partial<CafeSnapshot['settings']>) {
    return this.mutate((snapshot) => Object.assign(snapshot.settings, settings));
  }

  async updateQrSettings(settings: Partial<QrSettings>) {
    return this.mutate((snapshot) => Object.assign(snapshot.qrSettings, settings));
  }

  async reset() {
    const seed = createSeedSnapshot();
    await this.persist(seed);
    return seed;
  }

  subscribe(listener: (snapshot: CafeSnapshot) => void) {
    this.listeners.add(listener);
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) void this.emitFromStorage();
    };
    if (typeof window !== 'undefined') window.addEventListener('storage', onStorage);
    return () => {
      this.listeners.delete(listener);
      if (typeof window !== 'undefined') window.removeEventListener('storage', onStorage);
    };
  }

  private async mutate(change: (snapshot: CafeSnapshot) => void) {
    const snapshot = await this.getSnapshot();
    change(snapshot);
    await this.persist(snapshot);
    return snapshot;
  }

  private async persist(snapshot: CafeSnapshot) {
    this.storage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    const clone = structuredClone(snapshot);
    this.listeners.forEach((listener) => listener(clone));
    this.channel?.postMessage({ type: 'snapshot-updated' });
  }

  private async emitFromStorage() {
    const snapshot = await this.getSnapshot();
    this.listeners.forEach((listener) => listener(structuredClone(snapshot)));
  }
}
