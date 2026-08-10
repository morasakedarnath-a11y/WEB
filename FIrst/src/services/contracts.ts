import type { CafeSettings, CartLine, MenuItem, Order, OrderStatusEvent, ServiceRequest, Table } from '../domain/types';
import type { OrderStatus } from '../domain/orderStatus';

export interface StaffMember {
  id: string;
  name: string;
  role: 'kitchen' | 'waiter' | 'admin';
  active: boolean;
}

export interface QrSettings {
  baseUrl: string;
  heading: string;
  instruction: string;
  wifiName: string;
  wifiPassword: string;
}

export interface CafeSnapshot {
  version: 1;
  menuItems: MenuItem[];
  orders: Order[];
  tables: Table[];
  serviceRequests: ServiceRequest[];
  staff: StaffMember[];
  settings: CafeSettings;
  qrSettings: QrSettings;
}

export interface OrderDraft {
  clientRequestId: string;
  tableId: string;
  lines: CartLine[];
}

export interface CafeService {
  getSnapshot(): Promise<CafeSnapshot>;
  authenticateStaff(pin: string): Promise<boolean>;
  setMenuAvailability(menuItemId: string, available: boolean): Promise<CafeSnapshot>;
  upsertMenuItem(item: MenuItem): Promise<CafeSnapshot>;
  createOrder(draft: OrderDraft): Promise<Order>;
  transitionOrder(orderId: string, status: OrderStatus): Promise<Order>;
  createServiceRequest(tableId: string, type: ServiceRequest['type']): Promise<ServiceRequest>;
  resolveServiceRequest(requestId: string): Promise<ServiceRequest>;
  updateSettings(settings: Partial<CafeSettings>): Promise<CafeSnapshot>;
  updateQrSettings(settings: Partial<QrSettings>): Promise<CafeSnapshot>;
  reset(): Promise<CafeSnapshot>;
  subscribe(listener: (snapshot: CafeSnapshot) => void): () => void;
}

export type { OrderStatusEvent };
