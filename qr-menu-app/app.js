// --- MANIPAL RESTRO-BAR MENU DATA ---
const initialMenu = [
  {
    id: 'm1',
    name: 'Mangalorean Chicken Ghee Roast',
    category: 'coastal',
    price: 340,
    isVeg: false,
    isSpicy: true,
    isBestSeller: true,
    description: 'Tender chicken cooked in Byadgi red chili masala & clarified ghee.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
    tags: ['Coastal', 'Bestseller', 'Spicy'],
    rating: 4.9,
    options: [{ name: 'Spice Level', choices: ['Authentic Fiery', 'Medium', 'Mild'] }]
  },
  {
    id: 'm2',
    name: 'Paneer Ghee Roast',
    category: 'coastal',
    price: 290,
    isVeg: true,
    isSpicy: true,
    isBestSeller: true,
    description: 'Cottage cheese tossed in Kundapura spices & pure ghee.',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
    tags: ['Veg', 'Bestseller'],
    rating: 4.8,
    options: [{ name: 'Spice Level', choices: ['Medium', 'Fiery'] }]
  },
  {
    id: 'm3',
    name: 'Anjal Tawa Fry (King Fish)',
    category: 'coastal',
    price: 420,
    isVeg: false,
    isSpicy: true,
    isBestSeller: false,
    description: 'King Fish slice coated in semolina & coast red masala.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    tags: ['Seafood', 'Fresh Catch'],
    rating: 4.7
  },
  {
    id: 'm4',
    name: 'Butter Garlic Prawns',
    category: 'coastal',
    price: 380,
    isVeg: false,
    isSpicy: false,
    isBestSeller: true,
    description: 'Prawns sauteed in rich garlic butter & herbs.',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80',
    tags: ['Seafood', 'Pub Classic'],
    rating: 4.9
  },
  {
    id: 'b1',
    name: 'Peri Peri Cheese Loaded Fries',
    category: 'starters',
    price: 210,
    isVeg: true,
    isSpicy: true,
    isBestSeller: true,
    description: 'Fries with peri-peri spice & warm cheddar cheese.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80',
    tags: ['Snack', 'Veg'],
    rating: 4.7
  },
  {
    id: 'b2',
    name: 'Draught Beer Pitcher (1.5L)',
    category: 'drinks',
    price: 650,
    isVeg: true,
    isSpicy: false,
    isBestSeller: true,
    description: 'Chilled premium draught beer pitcher.',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=600&q=80',
    tags: ['Alcoholic', 'Pitcher'],
    rating: 4.9
  }
];

const initialCategories = [
  { id: 'all', label: 'All Items' },
  { id: 'coastal', label: 'Coastal Specials' },
  { id: 'starters', label: 'Bar Bites & Snacks' },
  { id: 'drinks', label: 'Drinks & Beer' }
];

const initialTables = [
  { id: 1, name: 'Table 01 - Main Lounge', capacity: 4, status: 'Available', reservedFor: null, reservationTime: null },
  { id: 2, name: 'Table 02 - Rooftop Garden', capacity: 2, status: 'Occupied', reservedFor: null, reservationTime: null },
  { id: 3, name: 'Table 03 - Patio Booth', capacity: 6, status: 'Reserved', reservedFor: 'Rahul M (Ph: 9876543210)', reservationTime: '8:00 PM' },
  { id: 4, name: 'Table 04 - VIP Section', capacity: 8, status: 'Available', reservedFor: null, reservationTime: null },
  { id: 5, name: 'Table 05 - Bar Counter 1', capacity: 2, status: 'Cleaning', reservedFor: null, reservationTime: null },
  { id: 6, name: 'Table 06 - Bar Counter 2', capacity: 2, status: 'Available', reservedFor: null, reservationTime: null }
];

const initialWaiters = [
  { id: 1, name: 'Ramesh K', status: 'On Shift', clockInTime: '12:30 PM', tablesServed: 14 },
  { id: 2, name: 'Suresh P', status: 'Off Shift', clockInTime: null, tablesServed: 8 },
  { id: 3, name: 'Vikas N', status: 'On Shift', clockInTime: '01:15 PM', tablesServed: 11 }
];

const initialRatings = [
  { id: 101, orderId: 1001, tableName: 'Table 01', rating: 5, comment: 'Chicken Ghee Roast was incredible! Super fast service.', customerName: 'Varun S', timestamp: '1 hour ago' },
  { id: 102, orderId: 1002, tableName: 'Table 04', rating: 5, comment: 'Cold Beer Pitchers and Anjal Fry made our evening.', customerName: 'Sneha R', timestamp: '2 hours ago' }
];

// Helper for fail-safe LocalStorage parsing
function safeGetJSON(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    const parsed = JSON.parse(item);
    if (!parsed) return fallback;
    if (Array.isArray(fallback) && !Array.isArray(parsed)) return fallback;
    return parsed;
  } catch (e) {
    return fallback;
  }
}

// Parse URL Parameters
const urlParams = new URLSearchParams(window.location.search);
const paramTableId = parseInt(urlParams.get('table')) || null;
let rawMode = urlParams.get('mode') || (paramTableId ? 'customer' : 'customer');
if (rawMode === 'staff' || rawMode === 'kds') rawMode = 'kitchen';

let state = {
  mode: rawMode,
  activeView: rawMode === 'admin' ? 'admin' : (rawMode === 'waiter' ? 'waiter' : (rawMode === 'kitchen' ? 'kds' : 'menu')),
  currentTable: initialTables.find(t => t.id === paramTableId) || initialTables[0],
  menu: safeGetJSON('ttp_menu', initialMenu),
  categories: initialCategories,
  tables: safeGetJSON('ttp_tables', initialTables),
  waiters: safeGetJSON('ttp_waiters', initialWaiters),
  ratings: safeGetJSON('ttp_ratings', initialRatings),
  activeCategory: 'all',
  dietFilter: 'all',
  searchQuery: '',
  cart: safeGetJSON('ttp_cart', []),
  orders: safeGetJSON('ttp_orders', []),
  serviceRequests: safeGetJSON('ttp_requests', []),
  brandConfig: safeGetJSON('ttp_brand', {
    name: 'Bacchus Restro Bar',
    location: 'Manipal, Karnataka',
    gstRate: 5,
    currency: '₹'
  }),
  selectedItemForModal: null,
  isCartOpen: false,
  isScannerOpen: false,
  isWaiterModalOpen: false,
  isStaffPinModalOpen: false,
  isReservationModalOpen: false,
  selectedTableForReservation: null,
  activeOrder: null,
  qrConfig: {
    selectedTableId: 1,
    headerText: 'SCAN TO ORDER FOOD & DRINKS',
    subText: 'Point camera & order tableside',
    qrColor: '000000',
    borderColor: '#F59E0B',
    centerIcon: '🍹',
    wifiSSID: 'Bacchus_Guest_5G'
  }
};

// Global Cloud Sync Engine
const CLOUD_CHANNEL = 'bacchus_manipal_tabletop_orders_v3';
const CLOUD_URL = `https://ntfy.sh/${CLOUD_CHANNEL}`;
const REST_DB_URL = 'https://api.restful-api.dev/objects';

async function sendCloudEvent(type, payload) {
  try {
    fetch(CLOUD_URL, { method: 'POST', headers: { 'Title': type }, body: JSON.stringify({ type, payload, timestamp: Date.now() }) }).catch(e => {});
    if (type === 'NEW_ORDER') {
      fetch(REST_DB_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: `TTP_ORDER_${payload.id}`, data: payload }) }).catch(e => {});
    }
  } catch (e) {}
}

async function fetchGlobalCloudData() {
  try {
    const res = await fetch(REST_DB_URL);
    if (!res.ok) return;
    const data = await res.json();
    let hasNew = false;
    data.filter(i => i.name && i.name.startsWith('TTP_ORDER_')).forEach(i => {
      if (i.data && i.data.id && !state.orders.some(o => o.id === i.data.id)) {
        state.orders.push(i.data);
        hasNew = true;
      }
    });
    if (hasNew) { saveState(); renderApp(); }
  } catch (e) {}
}

function initCloudSync() {
  fetchGlobalCloudData();
  if (typeof EventSource === 'undefined') return;
  try {
    const sse = new EventSource(`${CLOUD_URL}/sse`);
    sse.onmessage = (e) => {
      try {
        const raw = JSON.parse(e.data);
        if (!raw.message) return;
        const msg = JSON.parse(raw.message);
        if (msg.type === 'NEW_ORDER' && !state.orders.some(o => o.id === msg.payload.id)) {
          state.orders.push(msg.payload);
          saveState(); renderApp();
        } else if (msg.type === 'UPDATE_ORDER_STATUS') {
          const order = state.orders.find(o => o.id === msg.payload.orderId);
          if (order) { order.status = msg.payload.nextStatus; saveState(); renderApp(); }
        }
      } catch (err) {}
    };
  } catch (e) {}
}

initCloudSync();
setInterval(fetchGlobalCloudData, 4000);

function saveState() {
  localStorage.setItem('ttp_menu', JSON.stringify(state.menu));
  localStorage.setItem('ttp_cart', JSON.stringify(state.cart));
  localStorage.setItem('ttp_orders', JSON.stringify(state.orders));
  localStorage.setItem('ttp_requests', JSON.stringify(state.serviceRequests));
  localStorage.setItem('ttp_brand', JSON.stringify(state.brandConfig));
  localStorage.setItem('ttp_tables', JSON.stringify(state.tables));
  localStorage.setItem('ttp_waiters', JSON.stringify(state.waiters));
  localStorage.setItem('ttp_ratings', JSON.stringify(state.ratings));
}

function updateActiveOrder() {
  const now = Date.now();
  const tableOrders = state.orders.filter(o => {
    if (o.tableId !== state.currentTable.id) return false;
    if (['Paid', 'Delivered', 'Archived'].includes(o.status)) return false;
    const ageMins = (now - new Date(o.timestamp).getTime()) / (1000 * 60);
    return ageMins <= 120;
  });
  state.activeOrder = tableOrders.length > 0 ? tableOrders[tableOrders.length - 1] : null;
}

// DOM Renderer
function renderApp() {
  try {
    if (state.mode === 'customer' && state.activeView !== 'menu') state.activeView = 'menu';
    updateActiveOrder();
    const appContainer = document.getElementById('app');
    if (!appContainer) return;

    const cartCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
    const cartSubtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    appContainer.innerHTML = `
      ${renderHeader()}
      <main class="container">
        ${state.mode === 'customer' ? renderCustomerView() : ''}
        ${state.mode === 'kitchen' ? renderKDSView() : ''}
        ${state.mode === 'waiter' ? renderWaiterDispatchView() : ''}
        ${state.mode === 'admin' && state.activeView === 'admin' ? renderAdminView() : ''}
        ${state.mode === 'admin' && state.activeView === 'kds' ? renderKDSView() : ''}
        ${state.mode === 'admin' && state.activeView === 'waiter' ? renderWaiterDispatchView() : ''}
        ${state.mode === 'admin' && state.activeView === 'qr' ? renderQRView() : ''}
      </main>

      ${state.mode === 'customer' && cartCount > 0 && !state.isCartOpen ? `
        <div class="mobile-floating-cart" id="btn-open-cart-floating">
          <div>
            <span>🛒 ${cartCount} ITEMS (${state.brandConfig.currency}${cartSubtotal})</span>
          </div>
          <div>VIEW CART ➔</div>
        </div>
      ` : ''}

      ${state.isCartOpen ? renderCartDrawer() : ''}
      ${state.selectedItemForModal ? renderItemModal(state.selectedItemForModal) : ''}
      ${state.isStaffPinModalOpen ? renderStaffPinModal() : ''}
      ${state.isReservationModalOpen ? renderReservationModal() : ''}
    `;

    attachEventListeners();
  } catch (err) {
    console.error('Render error:', err);
  }
}

function renderHeader() {
  const cartCount = state.cart.reduce((sum, item) => sum + item.qty, 0);

  return `
    <header class="app-header">
      <div class="header-container">
        <div class="brand-title" id="btn-brand">
          <div class="brand-icon">🍹</div>
          <div>
            <div class="brand-name">${state.brandConfig.name}</div>
            <div class="brand-location">📍 ${state.brandConfig.location}</div>
          </div>
        </div>

        ${state.mode === 'customer' ? `
          <button class="view-btn" id="btn-open-staff-modal" style="font-size:0.75rem;">🔐 Staff Access</button>
        ` : ''}

        ${state.mode === 'admin' ? `
          <nav class="view-nav">
            <button class="view-btn ${state.activeView === 'admin' ? 'active' : ''}" data-view="admin">📊 Admin</button>
            <button class="view-btn ${state.activeView === 'kds' ? 'active' : ''}" data-view="kds">👨‍🍳 Kitchen</button>
            <button class="view-btn ${state.activeView === 'waiter' ? 'active' : ''}" data-view="waiter">🏃 Waiters</button>
            <button class="view-btn ${state.activeView === 'qr' ? 'active' : ''}" data-view="qr">🔲 QRs</button>
          </nav>
        ` : ''}

        <div class="header-actions">
          <div class="table-badge">📍 ${state.currentTable.name.split('-')[0]}</div>
          <button class="btn-icon" id="btn-open-cart">🛒 ${cartCount > 0 ? `<span class="badge-count">${cartCount}</span>` : ''}</button>
        </div>
      </div>
    </header>
  `;
}

function renderCustomerView() {
  const filteredMenu = state.menu.filter(item => {
    const matchesCat = state.activeCategory === 'all' || item.category === state.activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const latestOrderForTable = state.orders.filter(o => o.tableId === state.currentTable.id).pop();
  const isPaidAndClosed = latestOrderForTable && latestOrderForTable.status === 'Paid' && !state.hasStartedNewSession;

  return `
    ${isPaidAndClosed ? `
      <div style="background:rgba(16,185,129,0.15); border:2px solid var(--accent-green); border-radius:var(--radius-md); padding:20px; text-align:center; margin-bottom:20px;">
        <div style="font-size:2.5rem;">🎉</div>
        <h3 style="font-size:1.2rem; font-weight:800;">BILL PAID & SESSION COMPLETED</h3>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">Thank you for dining at ${state.brandConfig.name}! Paid Receipt #${latestOrderForTable.id}: ${state.brandConfig.currency}${latestOrderForTable.total}</p>
        <button class="btn-checkout btn-start-new-session" style="margin-top:14px; max-width:260px; margin-left:auto; margin-right:auto;">✨ START NEW ORDER</button>
      </div>
    ` : ''}

    ${state.activeOrder && state.activeOrder.status !== 'Paid' ? renderOrderTracker(state.activeOrder) : ''}

    <div class="hero-banner">
      <h2 style="font-size:1.4rem; font-weight:800;">Welcome to ${state.brandConfig.name}! 👋</h2>
      <p style="color:var(--text-muted); font-size:0.85rem; margin-top:2px;">Ordering from <strong>${state.currentTable.name}</strong></p>
      <div class="search-box">
        <span>🔍</span>
        <input type="text" class="search-input" id="search-input" placeholder="Search menu..." value="${state.searchQuery}" />
      </div>
    </div>

    <div class="category-pills">
      ${state.categories.map(cat => `
        <button class="category-pill ${state.activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">${cat.label}</button>
      `).join('')}
    </div>

    <div class="menu-grid">
      ${filteredMenu.map(item => `
        <div class="menu-card">
          <div class="card-img-wrap"><img src="${item.image}" class="card-img" /></div>
          <div class="card-content">
            <div class="card-header"><span class="fssai-icon ${item.isVeg ? 'veg' : 'non-veg'}"></span><h3 class="card-title">${item.name}</h3></div>
            <p class="card-desc">${item.description}</p>
            <div class="card-footer">
              <span class="price-text">${state.brandConfig.currency}${item.price}</span>
              <button class="btn-add btn-open-item-modal" data-id="${item.id}">+ ADD</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderOrderTracker(order) {
  return `
    <div style="background:var(--bg-card); border:1px solid var(--primary); border-radius:var(--radius-md); padding:16px; margin-bottom:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span style="color:var(--primary); font-weight:800; font-size:0.85rem;">ORDER #${order.id} • ${order.tableName}</span>
          <h3 style="font-size:1.1rem; font-weight:800;">Status: <span style="color:var(--primary);">${order.status}</span></h3>
        </div>
        <button class="btn-clear-active-order" data-order-id="${order.id}" style="background:rgba(255,255,255,0.1); border:1px solid var(--border); color:var(--text-muted); padding:4px 10px; border-radius:12px; font-size:0.75rem; cursor:pointer;">✕ New Session</button>
      </div>
      <div style="margin-top:10px; font-size:0.85rem;">
        <strong>Total Bill Payable: ${state.brandConfig.currency}${order.total}</strong> (Includes GST)
      </div>
    </div>
  `;
}

function renderCartDrawer() {
  const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const gst = Math.round(subtotal * (state.brandConfig.gstRate / 100));
  const total = subtotal + gst;

  return `
    <div class="modal-overlay">
      <div class="modal-card" style="padding:20px;">
        <button class="modal-close" id="btn-close-cart">✕</button>
        <h3 style="font-size:1.2rem; font-weight:800; margin-bottom:16px;">🛒 Your Table Cart</h3>
        ${state.cart.length === 0 ? '<p style="color:var(--text-muted);">Your cart is empty.</p>' : `
          ${state.cart.map(item => `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <div><strong>${item.name}</strong> (${state.brandConfig.currency}${item.price})</div>
              <div>
                <button class="btn-dec-qty" data-cart-id="${item.cartId}">-</button>
                <span style="margin:0 8px;">${item.qty}</span>
                <button class="btn-inc-qty" data-cart-id="${item.cartId}">+</button>
              </div>
            </div>
          `).join('')}
          <div style="border-top:1px solid var(--border); margin-top:14px; padding-top:10px; font-weight:800; font-size:1.1rem; color:var(--primary);">
            Total Payable: ${state.brandConfig.currency}${total}
          </div>
          <button class="btn-checkout" id="btn-place-order" style="margin-top:16px;">CONFIRM ORDER ➔</button>
        `}
      </div>
    </div>
  `;
}

function renderKDSView() {
  const newOrders = state.orders.filter(o => o.status === 'Received');
  const preppingOrders = state.orders.filter(o => o.status === 'Preparing');
  const readyOrders = state.orders.filter(o => o.status === 'Ready');

  return `
    <div style="margin-bottom:20px;"><h2>👨‍🍳 Kitchen Display System</h2></div>
    <div class="kds-board">
      <div class="kds-column">
        <div class="kds-col-header"><span>📥 NEW ORDERS</span><span>${newOrders.length}</span></div>
        ${newOrders.map(o => `<div class="ticket-card"><div><strong>#${o.id} • ${o.tableName}</strong></div><button class="btn-add btn-update-order-status" data-order-id="${o.id}" data-next-status="Preparing" style="margin-top:8px;">Start Prep ➔</button></div>`).join('')}
      </div>
      <div class="kds-column">
        <div class="kds-col-header"><span>🔥 PREPARING</span><span>${preppingOrders.length}</span></div>
        ${preppingOrders.map(o => `<div class="ticket-card"><div><strong>#${o.id} • ${o.tableName}</strong></div><button class="btn-add btn-update-order-status" data-order-id="${o.id}" data-next-status="Ready" style="margin-top:8px;">Mark Ready 🔔</button></div>`).join('')}
      </div>
      <div class="kds-column">
        <div class="kds-col-header"><span>🔔 READY TO SERVE</span><span>${readyOrders.length}</span></div>
        ${readyOrders.map(o => `<div class="ticket-card"><div><strong>#${o.id} • ${o.tableName}</strong></div><button class="btn-add btn-update-order-status" data-order-id="${o.id}" data-next-status="Delivered" style="margin-top:8px;">Deliver 🏃</button></div>`).join('')}
      </div>
    </div>
  `;
}

function renderWaiterDispatchView() {
  const readyOrders = state.orders.filter(o => o.status === 'Ready');
  return `
    <div style="margin-bottom:20px;"><h2>🏃 Waiter Dispatch Board</h2></div>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:16px;">
      ${readyOrders.map(o => `
        <div class="ticket-card waiter-alert-card">
          <div style="font-weight:800;">📍 ${o.tableName} • Order #${o.id}</div>
          <button class="btn-checkout btn-update-order-status" data-order-id="${o.id}" data-next-status="Delivered" style="margin-top:12px;">DELIVERED TO TABLE ✓</button>
        </div>
      `).join('')}
    </div>
  `;
}

function renderAdminView() {
  const totalRevenue = state.orders.reduce((sum, o) => sum + o.total, 0);
  return `
    <div style="margin-bottom:20px;"><h2>📊 Manager Admin Command Center</h2></div>
    <div style="background:var(--bg-card); padding:16px; border-radius:var(--radius-md); font-weight:800; font-size:1.2rem; color:var(--primary);">
      Total Sales Revenue: ${state.brandConfig.currency}${totalRevenue}
    </div>
  `;
}

function renderItemModal(item) {
  return `
    <div class="modal-overlay">
      <div class="modal-card" style="padding:20px;">
        <button class="modal-close" id="btn-close-modal">✕</button>
        <h3 style="font-size:1.2rem; font-weight:800;">${item.name}</h3>
        <p style="color:var(--text-muted); margin-top:4px;">${item.description}</p>
        <button class="btn-checkout" id="btn-add-to-cart-confirm" style="margin-top:16px;">ADD TO CART • ${state.brandConfig.currency}${item.price}</button>
      </div>
    </div>
  `;
}

function renderStaffPinModal() {
  return `
    <div class="modal-overlay">
      <div class="modal-card" style="padding:20px; max-width:360px;">
        <button class="modal-close" id="btn-close-staff">✕</button>
        <h3 style="font-size:1.1rem; font-weight:800; margin-bottom:12px;">🔐 Unlock Staff Portal</h3>
        <select class="form-select" id="staff-role-select" style="margin-bottom:12px;">
          <option value="kitchen">👨‍🍳 Kitchen Display (KDS)</option>
          <option value="waiter">🏃 Floor Waiter Dispatch</option>
          <option value="admin">📊 Manager Admin Dashboard</option>
        </select>
        <input type="password" class="form-input" id="staff-pin-input" placeholder="Enter PIN (1234)" style="text-align:center; font-size:1.2rem; margin-bottom:12px;" />
        <button class="btn-checkout" id="btn-submit-staff-pin">UNLOCK ➔</button>
      </div>
    </div>
  `;
}

function renderReservationModal() {
  return `<div></div>`;
}

function renderQRView() {
  return `<div><h2>QR Builder</h2></div>`;
}

function attachEventListeners() {
  const btnOpenStaff = document.getElementById('btn-open-staff-modal');
  if (btnOpenStaff) btnOpenStaff.onclick = () => { state.isStaffPinModalOpen = true; renderApp(); };

  const btnCloseStaff = document.getElementById('btn-close-staff');
  if (btnCloseStaff) btnCloseStaff.onclick = () => { state.isStaffPinModalOpen = false; renderApp(); };

  const btnSubmitStaffPin = document.getElementById('btn-submit-staff-pin');
  if (btnSubmitStaffPin) {
    btnSubmitStaffPin.onclick = () => {
      const pinVal = document.getElementById('staff-pin-input')?.value;
      const roleVal = document.getElementById('staff-role-select')?.value || 'admin';
      if (pinVal === '1234') {
        state.mode = roleVal;
        state.activeView = roleVal === 'admin' ? 'admin' : (roleVal === 'waiter' ? 'waiter' : 'kds');
        state.isStaffPinModalOpen = false;
        renderApp();
      } else { alert('Invalid PIN! Default is 1234'); }
    };
  }

  const btnOpenCart = document.getElementById('btn-open-cart');
  if (btnOpenCart) btnOpenCart.onclick = () => { state.isCartOpen = true; renderApp(); };

  const btnCloseCart = document.getElementById('btn-close-cart');
  if (btnCloseCart) btnCloseCart.onclick = () => { state.isCartOpen = false; renderApp(); };

  const btnPlaceOrder = document.getElementById('btn-place-order');
  if (btnPlaceOrder) {
    btnPlaceOrder.onclick = () => {
      const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
      const gst = Math.round(subtotal * (state.brandConfig.gstRate / 100));
      const grandTotal = subtotal + gst;
      const newOrder = {
        id: Math.floor(1000 + Math.random() * 9000),
        tableId: state.currentTable.id,
        tableName: state.currentTable.name,
        items: [...state.cart],
        subtotal, gst, total: grandTotal,
        status: 'Received', timestamp: new Date().toISOString()
      };
      state.orders.push(newOrder);
      state.cart = [];
      state.isCartOpen = false;
      saveState();
      sendCloudEvent('NEW_ORDER', newOrder);
      alert(`🎉 Order #${newOrder.id} placed for ${state.currentTable.name}!`);
      renderApp();
    };
  }

  document.querySelectorAll('.btn-open-item-modal').forEach(btn => {
    btn.onclick = () => {
      const item = state.menu.find(m => m.id === btn.dataset.id);
      if (item) { state.selectedItemForModal = item; renderApp(); }
    };
  });

  const btnCloseModal = document.getElementById('btn-close-modal');
  if (btnCloseModal) btnCloseModal.onclick = () => { state.selectedItemForModal = null; renderApp(); };

  const btnConfirmAdd = document.getElementById('btn-add-to-cart-confirm');
  if (btnConfirmAdd && state.selectedItemForModal) {
    btnConfirmAdd.onclick = () => {
      state.cart.push({ ...state.selectedItemForModal, cartId: `${state.selectedItemForModal.id}-${Date.now()}`, qty: 1 });
      state.selectedItemForModal = null;
      saveState(); renderApp();
    };
  }

  document.querySelectorAll('.btn-update-order-status').forEach(btn => {
    btn.onclick = () => {
      const orderId = parseInt(btn.dataset.orderId);
      const nextStatus = btn.dataset.nextStatus;
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.status = nextStatus;
        saveState();
        sendCloudEvent('UPDATE_ORDER_STATUS', { orderId, nextStatus });
        renderApp();
      }
    };
  });

  document.querySelectorAll('.view-nav .view-btn').forEach(btn => {
    btn.onclick = () => {
      state.activeView = btn.dataset.view;
      renderApp();
    };
  });
}

// Fail-safe initial boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => renderApp());
} else {
  renderApp();
}
