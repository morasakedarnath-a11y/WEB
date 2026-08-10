import type { OrderStatus } from './orderStatus';

export type CategoryId =
  | 'combos'
  | 'pizza'
  | 'pasta'
  | 'sandwiches'
  | 'breads'
  | 'sundaes'
  | 'smoothies'
  | 'iced-refreshers'
  | 'hot-beverages'
  | 'matcha'
  | 'frappes'
  | 'pastries';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  image: string;
}

export interface MenuOption {
  id: string;
  name: string;
  priceDelta?: number;
}

export interface MenuOptionGroup {
  id: string;
  name: string;
  required: boolean;
  minimum: number;
  maximum: number;
  options: MenuOption[];
}

export interface MenuItem {
  id: string;
  kind: 'item' | 'combo';
  name: string;
  description: string;
  price: number;
  categoryId: CategoryId;
  image: string;
  vegetarian?: boolean;
  available: boolean;
  featured?: boolean;
  availabilityNote?: string;
  optionGroups?: MenuOptionGroup[];
}

export interface ComboContent {
  label: string;
  quantity: number;
  categoryId: CategoryId;
}

export interface Combo extends MenuItem {
  kind: 'combo';
  contents: ComboContent[];
}

export interface CartLine {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  selectedOptions: Array<{ groupId: string; optionId: string; label: string; priceDelta: number }>;
  notes?: string;
}

export interface OrderStatusEvent {
  status: OrderStatus;
  at: string;
}

export interface Order {
  id: string;
  clientRequestId: string;
  tableId: string;
  lines: CartLine[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  statusHistory: OrderStatusEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface Table {
  id: string;
  number: number;
  seats: number;
  zone: string;
  active: boolean;
}

export type ServiceRequestType = 'call-waiter' | 'water' | 'bill' | 'cutlery';

export interface ServiceRequest {
  id: string;
  tableId: string;
  type: ServiceRequestType;
  status: 'open' | 'acknowledged' | 'resolved';
  createdAt: string;
  resolvedAt?: string;
}

export interface CafeSettings {
  cafeName: string;
  phone: string;
  gstPercent: number;
  currency: 'INR';
  acceptingOrders: boolean;
  estimatedPrepMinutes: number;
}
