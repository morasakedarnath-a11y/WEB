import { calculateBill } from '../domain/pricing';
import { menuItems } from '../domain/catalog';
import type { CartLine, Order, ServiceRequest, Table } from '../domain/types';
import type { CafeSnapshot } from './contracts';

const line = (id: string, menuItemId: string, name: string, quantity: number, unitPrice: number): CartLine => ({
  id,
  menuItemId,
  name,
  quantity,
  unitPrice,
  selectedOptions: [],
});

const seededOrder = (
  id: string,
  tableId: string,
  status: Order['status'],
  minutesAgo: number,
  lines: CartLine[],
): Order => {
  const createdAt = new Date(Date.UTC(2026, 7, 9, 11, 30) - minutesAgo * 60_000).toISOString();
  const bill = calculateBill(lines, 5);
  return {
    id,
    clientRequestId: `seed-${id}`,
    tableId,
    lines,
    ...bill,
    status,
    statusHistory: [{ status: 'received', at: createdAt }, ...(status === 'received' ? [] : [{ status, at: createdAt }])],
    createdAt,
    updatedAt: createdAt,
  };
};

export function createSeedSnapshot(): CafeSnapshot {
  const tables: Table[] = Array.from({ length: 12 }, (_, index) => ({
    id: `table-${index + 1}`,
    number: index + 1,
    seats: index % 3 === 0 ? 4 : 2,
    zone: index < 6 ? 'Window' : 'Courtyard',
    active: true,
  }));

  const orders: Order[] = [
    seededOrder('LC-1042', 'table-3', 'received', 7, [line('seed-line-1', 'pizza-ghee-roast', 'Ghee Roast Pizza', 1, 159), line('seed-line-2', 'iced-cold-coffee', 'Iced Cold Coffee', 2, 110)]),
    seededOrder('LC-1041', 'table-7', 'preparing', 16, [line('seed-line-3', 'pasta-alfredo', 'Alfredo Pasta', 2, 189)]),
    seededOrder('LC-1040', 'table-2', 'ready', 22, [line('seed-line-4', 'combo-together', 'We Are Together', 1, 399)]),
    seededOrder('LC-1039', 'table-5', 'delivered', 41, [line('seed-line-5', 'matcha-latte', 'Matcha Latte', 2, 150)]),
    seededOrder('LC-1038', 'table-1', 'paid', 68, [line('seed-line-6', 'combo-alone', 'I Am Alone', 1, 249)]),
  ];

  const serviceRequests: ServiceRequest[] = [
    { id: 'request-1', tableId: 'table-6', type: 'water', status: 'open', createdAt: '2026-08-09T11:20:00.000Z' },
    { id: 'request-2', tableId: 'table-9', type: 'bill', status: 'open', createdAt: '2026-08-09T11:24:00.000Z' },
  ];

  return {
    version: 1,
    menuItems: structuredClone(menuItems),
    orders,
    tables,
    serviceRequests,
    staff: [
      { id: 'staff-1', name: 'Asha', role: 'kitchen', active: true },
      { id: 'staff-2', name: 'Rohan', role: 'waiter', active: true },
      { id: 'staff-3', name: 'Mira', role: 'admin', active: true },
    ],
    settings: {
      cafeName: 'Luca Cafe',
      phone: '0820 3559195',
      gstPercent: 5,
      currency: 'INR',
      acceptingOrders: true,
      estimatedPrepMinutes: 18,
    },
    qrSettings: {
      baseUrl: 'https://lucacafe.example',
      heading: 'A lovely table awaits',
      instruction: 'Scan to browse the menu and order from your table.',
      wifiName: '',
      wifiPassword: '',
    },
  };
}
