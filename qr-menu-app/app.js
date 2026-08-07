// --- MANIPAL RESTRO-BAR MENU DATA (INLINED FOR ZERO-CORS FILE SYSTEM COMPATIBILITY) ---
const initialMenu = [
  // --- COASTAL & LOCAL SPECIALS ---
  {
    id: 'm1',
    name: 'Mangalorean Chicken Ghee Roast',
    category: 'coastal',
    price: 340,
    isVeg: false,
    isSpicy: true,
    isBestSeller: true,
    description: 'Tender chicken marinated in fiery Byadgi chilli paste & slow-cooked in rich pure ghee.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
    tags: ['Coastal', 'Bestseller', 'Spicy'],
    rating: 4.9,
    options: [
      { name: 'Spice Level', choices: ['Medium Hot', 'Authentic Fiery', 'Mild'] },
      { name: 'Add-on', choices: ['Extra Neer Dosa (3 pcs) (+₹60)', 'Flaky Parotta (+₹40)'] }
    ]
  },
  {
    id: 'm2',
    name: 'Paneer Ghee Roast',
    category: 'coastal',
    price: 290,
    isVeg: true,
    isSpicy: true,
    isBestSeller: true,
    description: 'Fresh cottage cheese cubes tossed in aromatic Kundapura spices & dollops of clarified butter.',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
    tags: ['Veg', 'Bestseller'],
    rating: 4.8,
    options: [
      { name: 'Spice Level', choices: ['Medium', 'Fiery Hot'] }
    ]
  },
  {
    id: 'm3',
    name: 'Anjal Tawa Fry (King Fish)',
    category: 'coastal',
    price: 420,
    isVeg: false,
    isSpicy: true,
    isBestSeller: false,
    description: 'Fresh catch King Fish slice coated in semolina & coast-style red masala, tava grilled.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    tags: ['Seafood', 'Fresh Catch'],
    rating: 4.7,
    options: []
  },
  {
    id: 'm4',
    name: 'Butter Garlic Prawns',
    category: 'coastal',
    price: 380,
    isVeg: false,
    isSpicy: false,
    isBestSeller: true,
    description: 'Juicy prawns sauteed in rich butter, roasted garlic, cracked black pepper & parsley.',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80',
    tags: ['Seafood', 'Pub Classic'],
    rating: 4.9,
    options: []
  },

  // --- BAR SNACKS & STARTERS ---
  {
    id: 'b1',
    name: 'Peri Peri Loaded Cheese Fries',
    category: 'starters',
    price: 210,
    isVeg: true,
    isSpicy: true,
    isBestSeller: true,
    description: 'Crispy skin-on fries dusted with African peri-peri spice and drenched in warm melted cheddar.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80',
    tags: ['Snack', 'Veg'],
    rating: 4.7,
    options: [
      { name: 'Dips', choices: ['Garlic Mayo', 'Chipotle Dip (+₹30)', 'Jalapeno Cheese (+₹40)'] }
    ]
  },
  {
    id: 'b2',
    name: 'Chicken Wings (6 pcs)',
    category: 'starters',
    price: 280,
    isVeg: false,
    isSpicy: true,
    isBestSeller: false,
    description: 'Double fried wings tossed in your choice of glaze with cool ranch dipping sauce.',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80',
    tags: ['Bar Classic'],
    rating: 4.6,
    options: [
      { name: 'Sauce Glaze', choices: ['Smoky BBQ', 'Hot Ghost Pepper', 'Honey Mustard'] }
    ]
  },
  {
    id: 'b3',
    name: 'Egg Bhurji & Buttered Pav',
    category: 'starters',
    price: 160,
    isVeg: false,
    isSpicy: true,
    isBestSeller: true,
    description: 'Street-style spiced scrambled eggs with onions, green chillies, coriander & toasted pavs.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    tags: ['Late Night', 'Student Fav'],
    rating: 4.8,
    options: [
      { name: 'Extra Pav', choices: ['No Extra Pav', 'Add 2 Pav (+₹30)'] }
    ]
  },

  // --- STUDENT & LATE NIGHT COMBOS ---
  {
    id: 's1',
    name: 'MAHE Exam Survival Combo',
    category: 'combos',
    price: 320,
    isVeg: true,
    isSpicy: false,
    isBestSeller: true,
    description: 'Double Cheese Maggi + Peri Peri Fries + Iced Cold Coffee. The ultimate study fuel.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80',
    tags: ['Combo', 'Student Special'],
    rating: 4.9,
    options: [
      { name: 'Maggi Type', choices: ['Classic Veg Cheese', 'Schezwan Egg Maggi (+₹20)'] }
    ]
  },
  {
    id: 's2',
    name: 'Night Owl Pitcher & Wings Deal',
    category: 'combos',
    price: 790,
    isVeg: false,
    isSpicy: true,
    isBestSeller: true,
    description: '1.5L Premium Draught Beer Pitcher + 8 pcs BBQ Chicken Wings + Masala Peanuts.',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80',
    tags: ['Group Deal', 'Pub Favorite'],
    rating: 4.9,
    options: []
  },

  // --- DRINKS & COCKTAILS ---
  {
    id: 'd1',
    name: 'Draught Beer Pitcher (1.5 Litre)',
    category: 'drinks',
    price: 550,
    isVeg: true,
    isSpicy: false,
    isBestSeller: true,
    description: 'Chilled freshly poured craft lager pitcher, perfect for sharing with your gang.',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80',
    tags: ['Chilled', 'Bar Special'],
    rating: 4.9,
    options: [
      { name: 'Type', choices: ['Pilsner Lager', 'Wheat Beer (+₹100)'] }
    ]
  },
  {
    id: 'd2',
    name: 'Manipal Sunrise Cocktail',
    category: 'drinks',
    price: 360,
    isVeg: true,
    isSpicy: false,
    isBestSeller: true,
    description: 'White Rum, Passionfruit syrup, fresh orange juice, dash of Grenadine & mint leaves.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
    tags: ['Signature Drink'],
    rating: 4.8,
    options: []
  },
  {
    id: 'd3',
    name: 'Long Island Iced Tea (LIIT)',
    category: 'drinks',
    price: 450,
    isVeg: true,
    isSpicy: false,
    isBestSeller: true,
    description: 'Vodka, Gin, Tequila, Rum, Triple Sec top up with cola and fresh lime juice.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    tags: ['Strong', 'Classic'],
    rating: 4.9,
    options: []
  },
  {
    id: 'd4',
    name: 'Mint Mojito (Mocktail)',
    category: 'drinks',
    price: 180,
    isVeg: true,
    isSpicy: false,
    isBestSeller: false,
    description: 'Crushed fresh mint, lime wedges, cane sugar syrup & chilled sparkling soda.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    tags: ['Non-Alcoholic'],
    rating: 4.6,
    options: []
  }
];

const initialCategories = [
  { id: 'all', label: 'All Items', icon: 'Utensils' },
  { id: 'coastal', label: 'Coastal Specials', icon: 'Flame' },
  { id: 'starters', label: 'Bar Bites & Snacks', icon: 'Beer' },
  { id: 'combos', label: 'Student Combos', icon: 'Zap' },
  { id: 'drinks', label: 'Cocktails & Beer', icon: 'Wine' }
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
  { id: 102, orderId: 1002, tableName: 'Table 04', rating: 5, comment: 'Cold Beer Pitchers and Anjal Fry made our evening. Great ambiance!', customerName: 'Sneha R', timestamp: '2 hours ago' },
  { id: 103, orderId: 1003, tableName: 'Table 02', rating: 4, comment: 'Paneer Tikka was fresh. Loved ordering directly from phone.', customerName: 'Amit K', timestamp: '3 hours ago' }
];

// --- STATE MANAGEMENT & LOCAL STORAGE ---
const CHANNEL_NAME = 'table_to_plate_channel';
const broadcastChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(CHANNEL_NAME) : null;

// Parse URL Parameters for Table ID & Mode
const urlParams = new URLSearchParams(window.location.search);
const paramTableId = parseInt(urlParams.get('table')) || null;
let rawMode = urlParams.get('mode') || (paramTableId ? 'customer' : 'customer');
if (rawMode === 'staff' || rawMode === 'kds') rawMode = 'kitchen';

// Initial State defaults
let state = {
  mode: rawMode, // 'customer' | 'kitchen' | 'waiter' | 'admin'
  activeView: rawMode === 'admin' ? 'admin' : (rawMode === 'waiter' ? 'waiter' : (rawMode === 'kitchen' ? 'kds' : 'menu')),
  currentTable: initialTables.find(t => t.id === paramTableId) || initialTables[0],
  menu: JSON.parse(localStorage.getItem('ttp_menu')) || initialMenu,
  categories: initialCategories,
  tables: JSON.parse(localStorage.getItem('ttp_tables')) || initialTables,
  waiters: JSON.parse(localStorage.getItem('ttp_waiters')) || initialWaiters,
  ratings: JSON.parse(localStorage.getItem('ttp_ratings')) || initialRatings,
  activeCategory: 'all',
  dietFilter: 'all', // 'all' | 'veg' | 'nonveg'
  searchQuery: '',
  cart: JSON.parse(localStorage.getItem('ttp_cart')) || [],
  orders: JSON.parse(localStorage.getItem('ttp_orders')) || [],
  serviceRequests: JSON.parse(localStorage.getItem('ttp_requests')) || [],
  brandConfig: JSON.parse(localStorage.getItem('ttp_brand')) || {
    name: 'Bacchus Restro Bar',
    location: 'Manipal, Karnataka',
    gstRate: 5,
    currency: '₹'
  },
  selectedItemForModal: null,
  isCartOpen: false,
  isScannerOpen: false,
  isWaiterModalOpen: false,
  isStaffPinModalOpen: false,
  isReservationModalOpen: false,
  selectedTableForReservation: null,
  staffPinInput: '',
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

// --- GLOBAL CLOUD REST DATABASE & REALTIME SSE STREAM ENGINE ---
const CLOUD_CHANNEL = 'bacchus_manipal_tabletop_orders_v2';
const CLOUD_URL = `https://ntfy.sh/${CLOUD_CHANNEL}`;
const REST_DB_URL = 'https://api.restful-api.dev/objects';

// Post Event to Realtime Stream & Cloud REST DB
async function sendCloudEvent(type, payload) {
  try {
    // 1. Post to Realtime Stream for instant <100ms push
    fetch(CLOUD_URL, {
      method: 'POST',
      headers: { 'Title': type },
      body: JSON.stringify({ type, payload, timestamp: Date.now() })
    }).catch(err => console.log('Cloud SSE post error:', err));

    // 2. Persist Order or Service Request to Global Cloud Database
    if (type === 'NEW_ORDER') {
      fetch(REST_DB_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `TTP_ORDER_${payload.id}`,
          data: payload
        })
      }).catch(e => console.log('REST DB save error:', e));
    } else if (type === 'SERVICE_REQUEST') {
      fetch(REST_DB_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `TTP_REQ_${payload.id}`,
          data: payload
        })
      }).catch(e => console.log('REST DB req error:', e));
    }
  } catch (e) {
    console.log('Cloud send error:', e);
  }
}

// Fetch All Global Cloud Orders & Service Requests from Cloud REST DB
async function fetchGlobalCloudData() {
  try {
    const res = await fetch(REST_DB_URL);
    if (!res.ok) return;
    const data = await res.json();
    
    let hasNewData = false;

    // Process Orders
    const cloudOrders = data
      .filter(item => item.name && item.name.startsWith('TTP_ORDER_'))
      .map(item => item.data);

    cloudOrders.forEach(o => {
      if (o && o.id && !state.orders.some(existing => existing.id === o.id)) {
        state.orders.push(o);
        const currentTblObj = state.tables.find(t => t.id === o.tableId);
        if (currentTblObj) { currentTblObj.status = 'Occupied'; }
        hasNewData = true;
      }
    });

    // Process Service Requests
    const cloudReqs = data
      .filter(item => item.name && item.name.startsWith('TTP_REQ_'))
      .map(item => item.data);

    cloudReqs.forEach(r => {
      if (r && r.id && !state.serviceRequests.some(existing => existing.id === r.id)) {
        state.serviceRequests.push(r);
        hasNewData = true;
      }
    });

    if (hasNewData) {
      saveState();
      renderApp();
    }
  } catch (e) {
    console.log('Global cloud fetch error:', e);
  }
}

// Subscribe to Realtime SSE Stream
function initCloudSync() {
  // Initial Global REST DB fetch
  fetchGlobalCloudData();

  if (typeof EventSource === 'undefined') return;
  try {
    const sse = new EventSource(`${CLOUD_URL}/sse`);
    sse.onmessage = (event) => {
      try {
        const raw = JSON.parse(event.data);
        if (!raw.message) return;
        const msg = JSON.parse(raw.message);
        
        if (msg.type === 'NEW_ORDER') {
          const exists = state.orders.some(o => o.id === msg.payload.id);
          if (!exists) {
            state.orders.push(msg.payload);
            const currentTblObj = state.tables.find(t => t.id === msg.payload.tableId);
            if (currentTblObj) { currentTblObj.status = 'Occupied'; }
            saveState();
            renderApp();
          }
        } else if (msg.type === 'UPDATE_ORDER_STATUS') {
          const order = state.orders.find(o => o.id === msg.payload.orderId);
          if (order && order.status !== msg.payload.nextStatus) {
            order.status = msg.payload.nextStatus;
            if (msg.payload.nextStatus === 'Ready') {
              playWaiterChime();
            }
            saveState();
            renderApp();
          }
        } else if (msg.type === 'SERVICE_REQUEST') {
          const exists = state.serviceRequests.some(r => r.id === msg.payload.id);
          if (!exists) {
            state.serviceRequests.push(msg.payload);
            saveState();
            renderApp();
          }
        } else if (msg.type === 'RESOLVE_REQUEST') {
          const req = state.serviceRequests.find(r => r.id === msg.payload.reqId);
          if (req && req.status !== 'Resolved') {
            req.status = 'Resolved';
            saveState();
            renderApp();
          }
        }
      } catch (err) {
        // parse error
      }
    };
  } catch (e) {
    console.log('SSE connection error:', e);
  }
}

// Start Realtime Cloud Sync & REST DB Engine
initCloudSync();

// Auto-poll Global Cloud DB every 4 seconds for maximum reliability across 4G/5G/Wi-Fi
setInterval(() => {
  fetchGlobalCloudData();
}, 4000);

// Sync State across Tabs & LocalStorage & Cloud
function saveState() {
  localStorage.setItem('ttp_menu', JSON.stringify(state.menu));
  localStorage.setItem('ttp_cart', JSON.stringify(state.cart));
  localStorage.setItem('ttp_orders', JSON.stringify(state.orders));
  localStorage.setItem('ttp_requests', JSON.stringify(state.serviceRequests));
  localStorage.setItem('ttp_brand', JSON.stringify(state.brandConfig));
  localStorage.setItem('ttp_tables', JSON.stringify(state.tables));
  localStorage.setItem('ttp_waiters', JSON.stringify(state.waiters));
  localStorage.setItem('ttp_ratings', JSON.stringify(state.ratings));

  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage({ type: 'STATE_UPDATE', state: {
        orders: state.orders,
        serviceRequests: state.serviceRequests,
        menu: state.menu,
        tables: state.tables
      }});
    } catch (e) {
      console.log('Broadcast error:', e);
    }
  }
}

// 1. Cross-Tab Realtime Sync via BroadcastChannel
if (broadcastChannel) {
  broadcastChannel.onmessage = (event) => {
    if (event.data && event.data.type === 'STATE_UPDATE') {
      state.orders = event.data.state.orders || state.orders;
      state.serviceRequests = event.data.state.serviceRequests || state.serviceRequests;
      state.menu = event.data.state.menu || state.menu;
      state.tables = event.data.state.tables || state.tables;
      renderApp();
    }
  };
}

// 2. Cross-Tab Storage Event Listener
window.addEventListener('storage', (e) => {
  if (['ttp_orders', 'ttp_requests', 'ttp_menu', 'ttp_tables'].includes(e.key)) {
    state.orders = JSON.parse(localStorage.getItem('ttp_orders')) || [];
    state.serviceRequests = JSON.parse(localStorage.getItem('ttp_requests')) || [];
    state.menu = JSON.parse(localStorage.getItem('ttp_menu')) || initialMenu;
    state.tables = JSON.parse(localStorage.getItem('ttp_tables')) || initialTables;
    renderApp();
  }
});

// 3. Heartbeat Auto-Sync Interval for KDS & Admin View (Refreshes every 2s)
setInterval(() => {
  const latestOrders = JSON.parse(localStorage.getItem('ttp_orders')) || [];
  const latestRequests = JSON.parse(localStorage.getItem('ttp_requests')) || [];
  const latestMenu = JSON.parse(localStorage.getItem('ttp_menu')) || initialMenu;

  let hasChanged = false;
  if (JSON.stringify(latestOrders) !== JSON.stringify(state.orders)) {
    state.orders = latestOrders;
    hasChanged = true;
  }
  if (JSON.stringify(latestRequests) !== JSON.stringify(state.serviceRequests)) {
    state.serviceRequests = latestRequests;
    hasChanged = true;
  }
  if (JSON.stringify(latestMenu) !== JSON.stringify(state.menu)) {
    state.menu = latestMenu;
    hasChanged = true;
  }

  if (hasChanged) {
    renderApp();
  }
}, 1500);

// Check active order for current table (auto-expires orders older than 2 hours or marked Paid/Archived)
function updateActiveOrder() {
  const now = Date.now();
  const tableOrders = state.orders.filter(o => {
    if (o.tableId !== state.currentTable.id) return false;
    if (['Paid', 'Delivered', 'Archived'].includes(o.status)) return false;
    // Auto-archive orders older than 2 hours (120 mins) so new diners get a fresh menu
    const ageMins = (now - new Date(o.timestamp).getTime()) / (1000 * 60);
    if (ageMins > 120) return false;
    return true;
  });
  state.activeOrder = tableOrders.length > 0 ? tableOrders[tableOrders.length - 1] : null;
}

// Web Audio Chime for Waiters & Kitchen Staff
function playWaiterChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
    // audio context muted
  }
}

// --- DOM RENDERER ---
function renderApp() {
  // If in customer mode, strictly enforce menu view
  if (state.mode === 'customer' && state.activeView !== 'menu') {
    state.activeView = 'menu';
  }

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
      ${state.mode === 'admin' && state.activeView === 'menu' ? renderCustomerView() : ''}
    </main>

    ${state.mode === 'customer' && cartCount > 0 && !state.isCartOpen ? `
      <div class="mobile-floating-cart" id="btn-open-cart-floating">
        <div>
          <span>🛒 ${cartCount} ${cartCount === 1 ? 'ITEM' : 'ITEMS'}</span>
          <span style="margin-left:8px; opacity:0.8; font-weight:600;">(${state.brandConfig.currency}${cartSubtotal})</span>
        </div>
        <div>
          VIEW CART ➔
        </div>
      </div>
    ` : ''}

    ${state.mode === 'customer' ? `
      <div class="mobile-nav-bar">
        <button class="mobile-nav-item active">
          <span class="mobile-nav-icon">📖</span>
          <span>Menu</span>
        </button>
        <button class="mobile-nav-item" id="btn-mobile-nav-cart">
          <span class="mobile-nav-icon">🛒</span>
          <span>Cart ${cartCount > 0 ? `(${cartCount})` : ''}</span>
        </button>
        <button class="mobile-nav-item" id="btn-mobile-nav-waiter">
          <span class="mobile-nav-icon">🔔</span>
          <span>Server</span>
        </button>
      </div>
    ` : ''}

    ${state.isCartOpen ? renderCartDrawer() : ''}
    ${state.selectedItemForModal ? renderItemModal(state.selectedItemForModal) : ''}
    ${state.isScannerOpen ? renderScannerModal() : ''}
    ${state.isWaiterModalOpen ? renderWaiterModal() : ''}
    ${state.isStaffPinModalOpen ? renderStaffPinModal() : ''}
    ${state.isReservationModalOpen ? renderReservationModal() : ''}
  `;

  attachEventListeners();
}

// --- HEADER COMPONENT ---
function renderHeader() {
  const cartCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const activeRequestsCount = state.serviceRequests.filter(r => r.status === 'Pending').length;
  const readyOrdersCount = state.orders.filter(o => o.status === 'Ready').length;

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

        ${state.mode === 'kitchen' ? `
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-weight:800; font-size:1rem; color:var(--primary);">👨‍🍳 KITCHEN MODE</span>
          </div>
        ` : ''}

        ${state.mode === 'waiter' ? `
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-weight:800; font-size:1rem; color:var(--primary);">🏃 WAITER MODE</span>
          </div>
        ` : ''}

        ${state.mode === 'admin' ? `
          <nav class="view-nav">
            <button class="view-btn ${state.activeView === 'admin' ? 'active' : ''}" data-view="admin">
              📊 Admin
              ${activeRequestsCount > 0 ? `<span class="badge-count">${activeRequestsCount}</span>` : ''}
            </button>
            <button class="view-btn ${state.activeView === 'kds' ? 'active' : ''}" data-view="kds">
              👨‍🍳 Kitchen
            </button>
            <button class="view-btn ${state.activeView === 'waiter' ? 'active' : ''}" data-view="waiter" style="${readyOrdersCount > 0 ? 'border:1px solid var(--primary); font-weight:800;' : ''}">
              🏃 Waiters
              ${readyOrdersCount > 0 ? `<span class="badge-count" style="background:var(--primary); color:#000;">${readyOrdersCount}</span>` : ''}
            </button>
            <button class="view-btn ${state.activeView === 'qr' ? 'active' : ''}" data-view="qr">
              🔲 QRs
            </button>
          </nav>
        ` : ''}

        <div class="header-actions">
          <div class="table-badge" ${state.mode === 'admin' ? 'id="btn-open-scanner"' : ''}>
            <span>📍 ${state.currentTable.name.split('-')[0]}</span>
            ${state.mode === 'admin' ? `<span style="font-size:0.75rem; opacity:0.8;">[Change]</span>` : ''}
          </div>

          <button class="btn-icon" id="btn-open-waiter" title="Call Server">
            🔔
          </button>

          <button class="btn-icon" id="btn-open-cart" title="View Cart">
            🛒
            ${cartCount > 0 ? `<span class="badge-count">${cartCount}</span>` : ''}
          </button>
        </div>
      </div>
    </header>
  `;
}

// --- CUSTOMER MENU VIEW ---
function renderCustomerView() {
  const filteredMenu = state.menu.filter(item => {
    const matchesCat = state.activeCategory === 'all' || item.category === state.activeCategory;
    const matchesDiet = state.dietFilter === 'all' || 
      (state.dietFilter === 'veg' && item.isVeg) || 
      (state.dietFilter === 'nonveg' && !item.isVeg);
    const matchesSearch = item.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesCat && matchesDiet && matchesSearch;
  });

  const latestOrderForTable = state.orders.filter(o => o.tableId === state.currentTable.id).pop();
  const isPaidAndClosed = latestOrderForTable && latestOrderForTable.status === 'Paid' && !state.hasStartedNewSession;

  return `
    ${isPaidAndClosed ? `
      <div style="background:linear-gradient(135deg, rgba(16,185,129,0.2), rgba(245,158,11,0.2)); border:2px solid var(--accent-green); border-radius:var(--radius-md); padding:24px; text-align:center; margin-bottom:20px;">
        <div style="font-size:3rem; margin-bottom:6px;">🎉</div>
        <h3 style="font-size:1.3rem; font-weight:800; color:#fff;">BILL PAID & SESSION COMPLETED</h3>
        <p style="color:var(--text-muted); font-size:0.9rem; margin-top:4px;">
          Thank you for visiting <strong>${state.brandConfig.name}</strong>! Paid Receipt #${latestOrderForTable.id}: <strong>${state.brandConfig.currency}${latestOrderForTable.total}</strong>
        </p>
        <button class="btn-checkout btn-start-new-session" style="margin-top:16px; max-width:280px; margin-left:auto; margin-right:auto;">
          ✨ START NEW ORDERING SESSION
        </button>
      </div>
    ` : ''}

    ${state.activeOrder && state.activeOrder.status !== 'Paid' ? renderOrderTracker(state.activeOrder) : ''}

    <div class="hero-banner">
      <h2 style="font-size:1.6rem; font-weight:800; color:#fff;">Welcome to ${state.brandConfig.name}! 👋</h2>
      <p style="color:var(--text-muted); font-size:0.9rem; margin-top:4px;">
        Order directly from <strong>${state.currentTable.name}</strong>. Freshly prepped & served to your table.
      </p>
      
      <div class="search-box">
        <span>🔍</span>
        <input type="text" class="search-input" id="search-input" placeholder="Search ghee roast, draught beer, loaded fries..." value="${state.searchQuery}" />
      </div>
    </div>

    <div class="filter-section">
      <div class="category-pills">
        ${state.categories.map(cat => `
          <button class="category-pill ${state.activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
            ${cat.label}
          </button>
        `).join('')}
      </div>

      <div class="dietary-filters">
        <button class="diet-btn ${state.dietFilter === 'all' ? 'active' : ''}" data-diet="all">All</button>
        <button class="diet-btn ${state.dietFilter === 'veg' ? 'active-veg' : ''}" data-diet="veg">
          <span class="fssai-icon veg"></span> Veg
        </button>
        <button class="diet-btn ${state.dietFilter === 'nonveg' ? 'active-nonveg' : ''}" data-diet="nonveg">
          <span class="fssai-icon non-veg"></span> Non-Veg
        </button>
      </div>
    </div>

    <div class="menu-grid">
      ${filteredMenu.map(item => renderMenuItemCard(item)).join('')}
    </div>
  `;
}

function renderMenuItemCard(item) {
  return `
    <div class="menu-card ${item.isSoldOut ? 'sold-out' : ''}">
      <div class="card-img-wrap">
        <img src="${item.image}" class="card-img" alt="${item.name}" loading="lazy" />
        ${item.isBestSeller ? `<span class="badge-tag">🔥 BESTSELLER</span>` : ''}
        <span class="rating-tag">⭐ ${item.rating || 4.8}</span>
      </div>
      
      <div class="card-content">
        <div class="card-header">
          <span class="fssai-icon ${item.isVeg ? 'veg' : 'non-veg'}" style="margin-top:3px;"></span>
          <h3 class="card-title">${item.name}</h3>
        </div>
        
        <p class="card-desc">${item.description}</p>
        
        <div class="card-footer">
          <span class="price-text">${state.brandConfig.currency}${item.price}</span>
          
          ${item.isSoldOut ? `
            <span style="color:var(--accent-red); font-weight:700; font-size:0.85rem;">SOLD OUT</span>
          ` : `
            <button class="btn-add btn-open-item-modal" data-id="${item.id}">
              + ADD
            </button>
          `}
        </div>
      </div>
    </div>
  `;
}

// --- LIVE ORDER TRACKER ---
function renderOrderTracker(order) {
  const steps = [
    { label: 'Received', status: 'Received', icon: '📥' },
    { label: 'Preparing', status: 'Preparing', icon: '👨‍🍳' },
    { label: 'Ready', status: 'Ready', icon: '🔔' },
    { label: 'Served', status: 'Delivered', icon: '🎉' }
  ];

  const getStepClass = (stepStatus) => {
    const orderStatuses = ['Received', 'Preparing', 'Ready', 'Delivered'];
    const currentIndex = orderStatuses.indexOf(order.status);
    const stepIndex = orderStatuses.indexOf(stepStatus);

    if (stepIndex < currentIndex) return 'done';
    if (stepIndex === currentIndex) return 'active';
    return '';
  };

  return `
    <div class="tracker-card">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="color:var(--primary); font-weight:800; font-size:0.85rem; letter-spacing:1px; text-transform:uppercase;">
              Table Order #${order.id}
            </span>
            <button class="btn-clear-active-order" data-order-id="${order.id}" style="background:rgba(255,255,255,0.1); border:1px solid var(--border); color:var(--text-muted); padding:3px 8px; border-radius:10px; font-size:0.75rem; cursor:pointer;">
              ✕ New Session
            </button>
          </div>
          <h3 style="font-size:1.1rem; font-weight:700; color:#fff; margin-top:2px;">
            Status: <span style="color:var(--primary);">${order.status}</span>
          </h3>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Total Bill Payable</div>
          <div style="font-size:1.2rem; font-weight:800; color:var(--primary);">
            ${state.brandConfig.currency}${order.total}
          </div>
        </div>
      </div>

      <div style="margin:12px 0; padding:10px 14px; background:rgba(255,255,255,0.04); border-radius:var(--radius-sm); border:1px solid var(--border);">
        <div style="font-size:0.8rem; font-weight:700; color:var(--text-muted); margin-bottom:6px;">ORDERED ITEMS:</div>
        ${order.items.map(item => `
          <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:3px;">
            <span><strong>${item.qty}x</strong> ${item.name}</span>
            <span>${state.brandConfig.currency}${item.price * item.qty}</span>
          </div>
        `).join('')}
        <div style="border-top:1px dashed var(--border); margin-top:6px; padding-top:6px; display:flex; justify-content:space-between; font-size:0.8rem; color:var(--text-muted);">
          <span>Includes GST (${state.brandConfig.gstRate}%)</span>
          <span>${state.brandConfig.currency}${order.gst}</span>
        </div>
      </div>

      <div class="tracker-timeline">
        ${steps.map(step => `
          <div class="tracker-step ${getStepClass(step.status)}">
            <div class="step-icon">${step.icon}</div>
            <span>${step.label}</span>
          </div>
        `).join('')}
      </div>

      <div style="margin-top:16px; padding-top:12px; border-top:1px solid var(--border); text-align:center;">
        <div style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Rate your dining experience</div>
        <div style="display:flex; justify-content:center; gap:8px; margin:6px 0;">
          ${[1, 2, 3, 4, 5].map(star => `
            <span class="rating-star-interactive btn-rate-meal" data-stars="${star}">⭐</span>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// --- CART DRAWER ---
function renderCartDrawer() {
  const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const gst = Math.round(subtotal * (state.brandConfig.gstRate / 100));
  const grandTotal = subtotal + gst;

  return `
    <div class="modal-overlay">
      <div class="cart-drawer">
        <div class="cart-header">
          <h3 style="font-size:1.2rem; font-weight:800;">Your Cart 🛒</h3>
          <button class="modal-close" id="btn-close-cart">✕</button>
        </div>

        <div class="cart-body">
          ${state.cart.length === 0 ? `
            <div style="text-align:center; padding:40px 20px; color:var(--text-muted);">
              <div style="font-size:3rem; margin-bottom:10px;">🍔</div>
              <p>Your cart is empty!</p>
              <p style="font-size:0.85rem; margin-top:4px;">Select some delicious dishes from the menu to start ordering.</p>
            </div>
          ` : state.cart.map(item => `
            <div class="cart-item">
              <div style="flex-grow:1;">
                <div style="font-weight:700; font-size:0.95rem;">${item.name}</div>
                ${item.selectedOptions ? `
                  <div style="font-size:0.75rem; color:var(--primary); margin-top:2px;">
                    ${Object.values(item.selectedOptions).join(', ')}
                  </div>
                ` : ''}
                <div style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">
                  ${state.brandConfig.currency}${item.price} each
                </div>
              </div>

              <div class="quantity-controls">
                <button class="btn-qty btn-dec-qty" data-cart-id="${item.cartId}">-</button>
                <span style="font-weight:700; font-size:0.9rem;">${item.qty}</span>
                <button class="btn-qty btn-inc-qty" data-cart-id="${item.cartId}">+</button>
              </div>
            </div>
          `).join('')}
        </div>

        ${state.cart.length > 0 ? `
          <div class="cart-footer">
            <div class="bill-row">
              <span>Subtotal</span>
              <span>${state.brandConfig.currency}${subtotal}</span>
            </div>
            <div class="bill-row">
              <span>GST (${state.brandConfig.gstRate}%)</span>
              <span>${state.brandConfig.currency}${gst}</span>
            </div>
            <div class="bill-row total">
              <span>Grand Total</span>
              <span>${state.brandConfig.currency}${grandTotal}</span>
            </div>

            <button class="btn-checkout" id="btn-place-order">
              PLACE ORDER FOR ${state.currentTable.name.split('-')[0].toUpperCase()}
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// --- ITEM DETAIL MODAL ---
function renderItemModal(item) {
  return `
    <div class="modal-overlay">
      <div class="modal-card">
        <button class="modal-close" id="btn-close-modal">✕</button>
        <img src="${item.image}" style="width:100%; height:200px; object-fit:cover;" alt="${item.name}" />

        <div style="padding:20px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="fssai-icon ${item.isVeg ? 'veg' : 'non-veg'}"></span>
            <h3 style="font-size:1.3rem; font-weight:800;">${item.name}</h3>
          </div>
          <p style="color:var(--text-muted); font-size:0.9rem; margin-top:8px;">${item.description}</p>
          <div style="font-size:1.3rem; font-weight:800; color:var(--primary); margin-top:12px;">
            ${state.brandConfig.currency}${item.price}
          </div>

          ${item.options ? item.options.map(opt => `
            <div style="margin-top:16px;">
              <label style="font-weight:700; font-size:0.85rem; color:var(--text-muted); text-transform:uppercase;">
                ${opt.name}
              </label>
              <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:8px;">
                ${opt.choices.map((choice, idx) => `
                  <button class="option-pill ${idx === 0 ? 'selected' : ''}" data-opt-name="${opt.name}" data-choice="${choice}">
                    ${choice}
                  </button>
                `).join('')}
              </div>
            </div>
          `).join('') : ''}

          <button class="btn-checkout" id="btn-add-to-cart-confirm" style="margin-top:24px;">
            ADD TO CART • ${state.brandConfig.currency}${item.price}
          </button>
        </div>
      </div>
    </div>
  `;
}

// --- KITCHEN DISPLAY SYSTEM (KDS) & WAITER DISPATCH VIEW ---
function renderKDSView() {
  const newOrders = state.orders.filter(o => o.status === 'Received');
  const preppingOrders = state.orders.filter(o => o.status === 'Preparing');
  const readyOrders = state.orders.filter(o => o.status === 'Ready');
  const deliveredOrders = state.orders.filter(o => o.status === 'Delivered');

  return `
    <div style="margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <h2 style="font-size:1.5rem; font-weight:800;">👨‍🍳 Kitchen & Waiter Command Center</h2>
        <p style="color:var(--text-muted); font-size:0.9rem;">Real-time communication between Kitchen, Waiters, and Customers.</p>
      </div>
      <div style="display:flex; gap:10px;">
        ${readyOrders.length > 0 ? `
          <button class="btn-add" onclick="playWaiterChime()" style="background:var(--primary); color:#000;">
            🔔 Ring Waiter Alert Chime
          </button>
        ` : ''}
        <button class="btn-add" id="btn-refresh-kds">🔄 Refresh</button>
      </div>
    </div>

    <div class="kds-board" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));">
      <div class="kds-column">
        <div class="kds-col-header">
          <span>📥 NEW ORDERS</span>
          <span>${newOrders.length}</span>
        </div>
        ${newOrders.length === 0 ? '<p style="color:var(--text-muted); font-size:0.85rem;">No new orders</p>' : 
          newOrders.map(order => renderKDSTicket(order, 'Start Prep ➔', 'Preparing')).join('')}
      </div>

      <div class="kds-column">
        <div class="kds-col-header" style="border-color:#F59E0B;">
          <span>🔥 PREPARING</span>
          <span>${preppingOrders.length}</span>
        </div>
        ${preppingOrders.length === 0 ? '<p style="color:var(--text-muted); font-size:0.85rem;">Nothing cooking</p>' : 
          preppingOrders.map(order => renderKDSTicket(order, 'Mark Ready for Waiter 🔔', 'Ready')).join('')}
      </div>

      <div class="kds-column" style="background:rgba(245,158,11,0.08); border-color:var(--primary);">
        <div class="kds-col-header" style="border-color:#10B981; color:var(--primary);">
          <span>🔔 READY FOR WAITER</span>
          <span>${readyOrders.length}</span>
        </div>
        ${readyOrders.length === 0 ? '<p style="color:var(--text-muted); font-size:0.85rem;">No items ready for pickup</p>' : 
          readyOrders.map(order => renderKDSTicket(order, 'Deliver to Table 🏃', 'Delivered', true)).join('')}
      </div>

      <div class="kds-column">
        <div class="kds-col-header" style="border-color:var(--text-muted); color:var(--text-muted);">
          <span>🎉 SERVED (${deliveredOrders.length})</span>
        </div>
        ${deliveredOrders.length === 0 ? '<p style="color:var(--text-muted); font-size:0.85rem;">No completed orders</p>' : 
          deliveredOrders.slice(-3).map(order => `
            <div class="ticket-card" style="opacity:0.7;">
              <div style="font-weight:700; font-size:0.85rem;">Order #${order.id} • ${order.tableName}</div>
              <div style="font-size:0.75rem; color:var(--accent-green); margin-top:2px;">Delivered ✓</div>
            </div>
          `).join('')}
      </div>
    </div>
  `;
}

// Dedicated Waiter Dispatch View
function renderWaiterDispatchView() {
  const readyOrders = state.orders.filter(o => o.status === 'Ready');
  const activeRequests = state.serviceRequests.filter(r => r.status === 'Pending');

  return `
    <div style="margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <h2 style="font-size:1.5rem; font-weight:800; color:var(--primary);">🏃 Floor Waiter Dispatch Board</h2>
        <p style="color:var(--text-muted); font-size:0.9rem;">Shows food ready to serve to tables & customer service requests.</p>
      </div>
      ${readyOrders.length > 0 ? `
        <span class="badge-tag" style="font-size:0.9rem; padding:8px 16px; background:var(--primary); color:#000;">
          🚨 ${readyOrders.length} ORDERS READY FOR PICKUP!
        </span>
      ` : ''}
    </div>

    <!-- Waiter Shift Attendance Check-In / Check-Out Bar -->
    <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-md); padding:14px 18px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-weight:800; font-size:0.95rem; color:#fff;">🏃 WAITERS ON SHIFT:</span>
        ${state.waiters.map(w => `
          <span style="font-size:0.8rem; padding:4px 10px; border-radius:12px; background:${w.status === 'On Shift' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.05)'}; color:${w.status === 'On Shift' ? '#10B981' : 'var(--text-muted)'}; border:1px solid ${w.status === 'On Shift' ? '#10B981' : 'var(--border)'};">
            ${w.name} (${w.status})
          </span>
        `).join('')}
      </div>

      <div style="display:flex; gap:8px;">
        ${state.waiters.map(w => `
          <button class="btn-add btn-toggle-waiter-shift" data-waiter-id="${w.id}" style="padding:4px 10px; font-size:0.75rem; background:${w.status === 'On Shift' ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'}; color:${w.status === 'On Shift' ? '#EF4444' : '#10B981'}; border:1px solid ${w.status === 'On Shift' ? '#EF4444' : '#10B981'};">
            ${w.name}: ${w.status === 'On Shift' ? 'Check-Out' : 'Check-In'}
          </button>
        `).join('')}
      </div>
    </div>

    ${activeRequests.length > 0 ? `
      <div style="background:rgba(239,68,68,0.15); border:1px solid var(--accent-red); border-radius:var(--radius-md); padding:16px; margin-bottom:24px;">
        <h3 style="color:var(--accent-red); font-size:1.05rem; font-weight:800;">🔔 CUSTOMER TABLE ASSISTANCE REQUESTS (${activeRequests.length})</h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:12px; margin-top:12px;">
          ${activeRequests.map(req => `
            <div style="background:var(--bg-card); border:1px solid var(--accent-red); padding:12px; border-radius:var(--radius-sm); display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-weight:800; font-size:1rem; color:#fff;">📍 ${req.tableName}</div>
                <div style="color:var(--primary); font-size:0.9rem; font-weight:700;">Needs: ${req.requestType}</div>
              </div>
              <button class="btn-add btn-resolve-request" data-req-id="${req.id}" style="padding:6px 12px; background:var(--accent-red); color:#fff;">
                Served ✓
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <h3 style="font-size:1.2rem; font-weight:800; margin-bottom:14px; color:#fff;">
      🔔 FOOD READY TO SERVE (${readyOrders.length})
    </h3>

    ${readyOrders.length === 0 ? `
      <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-md); padding:40px; text-align:center; color:var(--text-muted);">
        <div style="font-size:3rem; margin-bottom:10px;">✨</div>
        <p style="font-size:1.1rem; font-weight:700; color:#fff;">All food is served!</p>
        <p style="font-size:0.85rem; margin-top:4px;">When the kitchen marks a dish as ready, it will flash here with table details.</p>
      </div>
    ` : `
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:20px;">
        ${readyOrders.map(order => `
          <div class="ticket-card waiter-alert-card">
            <div class="waiter-table-header">
              <span>📍 ${order.tableName.toUpperCase()}</span>
              <span>Order #${order.id}</span>
            </div>
            
            <div style="margin:10px 0;">
              <div style="font-weight:700; font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; margin-bottom:6px;">DISHER TO SERVE:</div>
              ${order.items.map(item => `
                <div style="display:flex; justify-content:space-between; font-size:0.95rem; font-weight:700; margin-bottom:4px; color:#fff;">
                  <span><strong>${item.qty}x</strong> ${item.name}</span>
                  ${item.selectedOptions ? `<span style="font-size:0.75rem; color:var(--primary);">${Object.values(item.selectedOptions).join(', ')}</span>` : ''}
                </div>
              `).join('')}
            </div>

            <button class="btn-status btn-update-order-status" data-order-id="${order.id}" data-next-status="Delivered" style="padding:12px; font-size:1rem; background:linear-gradient(135deg, var(--accent-green), #059669); color:#fff; box-shadow:0 4px 15px rgba(16,185,129,0.4);">
              DELIVERED TO ${order.tableName.split('-')[0].toUpperCase()} ✓
            </button>
    <h3 style="font-size:1.2rem; font-weight:800; margin-top:24px; margin-bottom:14px; color:#fff;">
      💳 TABLE CHECKOUT & BILL SETTLEMENT
    </h3>

    ${state.orders.filter(o => o.status !== 'Paid').length === 0 ? `
      <p style="color:var(--text-muted); font-size:0.85rem;">No active table checks pending payment.</p>
    ` : `
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:16px;">
        ${state.orders.filter(o => o.status !== 'Paid').map(order => `
          <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-sm); padding:16px;">
            <div style="display:flex; justify-content:space-between; font-weight:800;">
              <span>📍 ${order.tableName}</span>
              <span style="color:var(--primary);">${state.brandConfig.currency}${order.total}</span>
            </div>
            <div style="font-size:0.85rem; color:var(--text-muted); margin-top:4px;">
              Order #${order.id} • Status: <strong style="color:var(--primary);">${order.status}</strong>
            </div>
            <button class="btn-checkout btn-mark-paid" data-order-id="${order.id}" style="margin-top:10px; font-size:0.85rem; padding:8px 12px; background:linear-gradient(135deg, var(--accent-green), #059669);">
              💳 MARK BILL PAID & CLEAR TABLE ➔
            </button>
          </div>
        `).join('')}
      </div>
    `}
  `;
}

function renderKDSTicket(order, btnText, nextStatus) {
  return `
    <div class="ticket-card">
      <div class="ticket-header">
        <span>Order #${order.id}</span>
        <span>${order.tableName}</span>
      </div>
      <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:8px;">
        Time: ${new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      
      <div style="margin:10px 0; border-top:1px solid var(--border); padding-top:8px;">
        ${order.items.map(item => `
          <div style="display:flex; justify-content:space-between; font-size:0.9rem; margin-bottom:4px;">
            <span><strong>${item.qty}x</strong> ${item.name}</span>
            <span>${state.brandConfig.currency}${item.price * item.qty}</span>
          </div>
        `).join('')}
      </div>

      <button class="btn-status btn-update-order-status" data-order-id="${order.id}" data-next-status="${nextStatus}">
        ${btnText}
      </button>
    </div>
  `;
}

// --- ADMIN DASHBOARD VIEW ---
function renderAdminView() {
  const totalRevenue = state.orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = state.orders.length;
  const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const activeRequests = state.serviceRequests.filter(r => r.status === 'Pending');

  // Compute Bestsellers / Most Ordered Food from orders
  const itemCounts = {};
  state.orders.forEach(o => {
    o.items.forEach(item => {
      if (!itemCounts[item.name]) {
        itemCounts[item.name] = { count: 0, revenue: 0 };
      }
      itemCounts[item.name].count += item.qty;
      itemCounts[item.name].revenue += item.price * item.qty;
    });
  });

  const bestSellers = Object.keys(itemCounts)
    .map(name => ({ name, ...itemCounts[name] }))
    .sort((a, b) => b.count - a.count);

  const maxCount = bestSellers.length > 0 ? bestSellers[0].count : 1;

  // Compute Customer Rating Average
  const avgRating = state.ratings.length > 0 
    ? (state.ratings.reduce((sum, r) => sum + r.rating, 0) / state.ratings.length).toFixed(1)
    : '4.8';

  return `
    <div style="margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <h2 style="font-size:1.5rem; font-weight:800;">📊 Restaurant Admin Command Center</h2>
        <p style="color:var(--text-muted); font-size:0.9rem;">Table management, service statistics, reports & waiter attendance.</p>
      </div>
    </div>

    <!-- Top Key Metrics -->
    <div class="stats-grid">
      <div class="stat-card">
        <div style="color:var(--text-muted); font-size:0.85rem; font-weight:700;">TOTAL REVENUE</div>
        <div class="stat-val">${state.brandConfig.currency}${totalRevenue}</div>
        <div style="font-size:0.75rem; color:var(--accent-green);">Live today</div>
      </div>

      <div class="stat-card">
        <div style="color:var(--text-muted); font-size:0.85rem; font-weight:700;">TOTAL ORDERS</div>
        <div class="stat-val">${totalOrders}</div>
        <div style="font-size:0.75rem; color:var(--primary);">Table tickets</div>
      </div>

      <div class="stat-card">
        <div style="color:var(--text-muted); font-size:0.85rem; font-weight:700;">AVERAGE CHECK (AOV)</div>
        <div class="stat-val">${state.brandConfig.currency}${aov}</div>
        <div style="font-size:0.75rem; color:var(--secondary);">Per table</div>
      </div>

      <div class="stat-card">
        <div style="color:var(--text-muted); font-size:0.85rem; font-weight:700;">CUSTOMER SATISFACTION</div>
        <div class="stat-val" style="color:#F59E0B;">⭐ ${avgRating} / 5.0</div>
        <div style="font-size:0.75rem; color:var(--text-muted);">${state.ratings.length} customer reviews</div>
      </div>
    </div>

    ${activeRequests.length > 0 ? `
      <div style="background:rgba(239,68,68,0.15); border:1px solid var(--accent-red); border-radius:var(--radius-md); padding:16px; margin-bottom:24px;">
        <h3 style="color:var(--accent-red); font-size:1.05rem; font-weight:800;">⚠️ PENDING SERVICE REQUESTS (${activeRequests.length})</h3>
        <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:12px;">
          ${activeRequests.map(req => `
            <div style="background:var(--bg-card); border:1px solid var(--border); padding:10px 14px; border-radius:var(--radius-sm); display:flex; align-items:center; gap:10px;">
              <span>🚨 <strong>${req.tableName}</strong> requested <strong>${req.requestType}</strong></span>
              <button class="btn-add btn-resolve-request" data-req-id="${req.id}" style="padding:4px 10px; font-size:0.75rem;">Done ✓</button>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- 1. TABLE MANAGEMENT (Reservations, Capacity, Availability) -->
    <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-md); padding:20px; margin-bottom:24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <div>
          <h3 style="font-size:1.2rem; font-weight:800; color:#fff;">🪑 Table Management & Reservations</h3>
          <p style="color:var(--text-muted); font-size:0.85rem;">Manage capacity, live availability status, and guest bookings.</p>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:16px;">
        ${state.tables.map(tbl => `
          <div style="background:var(--surface); border:1px solid var(--border); padding:16px; border-radius:var(--radius-sm);">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <div style="font-weight:800; font-size:1rem; color:#fff;">${tbl.name}</div>
                <span class="table-cap-pill" style="margin-top:4px; display:inline-block;">👥 ${tbl.capacity} Seats</span>
              </div>
              <span class="table-cap-pill status-badge-${tbl.status.toLowerCase()}">
                ${tbl.status}
              </span>
            </div>

            ${tbl.status === 'Reserved' && tbl.reservedFor ? `
              <div style="margin-top:10px; padding:8px; background:rgba(245,158,11,0.1); border:1px dashed #F59E0B; border-radius:var(--radius-sm); font-size:0.8rem; color:#F59E0B;">
                📅 <strong>${tbl.reservedFor}</strong> @ ${tbl.reservationTime}
              </div>
            ` : ''}

            <div style="display:flex; gap:8px; margin-top:12px;">
              ${tbl.status === 'Available' ? `
                <button class="btn-add btn-open-reserve-modal" data-tbl-id="${tbl.id}" style="padding:6px 12px; font-size:0.8rem; background:rgba(245,158,11,0.2); color:#F59E0B; border:1px solid #F59E0B;">
                  📅 Book Table
                </button>
              ` : `
                <button class="btn-add btn-change-tbl-status" data-tbl-id="${tbl.id}" data-status="Available" style="padding:6px 12px; font-size:0.8rem; background:rgba(16,185,129,0.2); color:#10B981; border:1px solid #10B981;">
                  🟢 Mark Free
                </button>
              `}

              ${tbl.status !== 'Cleaning' ? `
                <button class="btn-add btn-change-tbl-status" data-tbl-id="${tbl.id}" data-status="Cleaning" style="padding:6px 12px; font-size:0.8rem; background:rgba(59,130,246,0.2); color:#3B82F6; border:1px solid #3B82F6;">
                  🧹 Cleaning
                </button>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 2. REPORTS & STATISTICS (Service Speed, Bestsellers & Ratings) -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(340px, 1fr)); gap:24px; margin-bottom:24px;">
      <!-- Bestsellers Chart -->
      <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-md); padding:20px;">
        <h3 style="font-size:1.1rem; font-weight:800; margin-bottom:14px; color:#fff;">🔥 Most Ordered Food & Dishes</h3>
        ${bestSellers.length === 0 ? `
          <p style="color:var(--text-muted); font-size:0.85rem;">Place orders to see bestselling rankings.</p>
        ` : `
          <div>
            ${bestSellers.slice(0, 5).map(item => `
              <div class="bestseller-item">
                <div style="flex:1;">
                  <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; margin-bottom:4px;">
                    <span>${item.name}</span>
                    <span style="color:var(--primary);">${item.count} orders (${state.brandConfig.currency}${item.revenue})</span>
                  </div>
                  <div style="background:rgba(255,255,255,0.06); border-radius:4px; overflow:hidden;">
                    <div class="bestseller-bar-fill" style="width:${Math.round((item.count / maxCount) * 100)}%;"></div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <!-- Service Performance & Ratings -->
      <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-md); padding:20px;">
        <h3 style="font-size:1.1rem; font-weight:800; margin-bottom:14px; color:#fff;">⏱️ Kitchen & Service Performance</h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px;">
          <div style="background:var(--surface); padding:12px; border-radius:var(--radius-sm); text-align:center;">
            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">AVG KITCHEN PREP</div>
            <div style="font-size:1.4rem; font-weight:800; color:var(--primary); margin-top:2px;">11.5 mins</div>
            <div style="font-size:0.7rem; color:var(--accent-green);">⚡ 2 mins faster than avg</div>
          </div>
          <div style="background:var(--surface); padding:12px; border-radius:var(--radius-sm); text-align:center;">
            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">AVG WAITER DELIVERY</div>
            <div style="font-size:1.4rem; font-weight:800; color:var(--secondary); margin-top:2px;">3.8 mins</div>
            <div style="font-size:0.7rem; color:var(--accent-green);">🎯 On target</div>
          </div>
        </div>

        <h4 style="font-size:0.95rem; font-weight:700; color:#fff; margin-bottom:10px;">⭐ Recent Customer Ratings</h4>
        <div style="max-height:160px; overflow-y:auto;">
          ${state.ratings.map(r => `
            <div style="background:var(--surface); padding:10px; border-radius:var(--radius-sm); margin-bottom:8px; font-size:0.85rem;">
              <div style="display:flex; justify-content:space-between;">
                <strong>${r.customerName} (${r.tableName})</strong>
                <span style="color:#F59E0B;">${'⭐'.repeat(r.rating)}</span>
              </div>
              <p style="color:var(--text-muted); margin-top:4px;">"${r.comment}"</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- 3. WAITERS CHECK-IN & CHECK-OUT ATTENDANCE -->
    <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-md); padding:20px; margin-bottom:24px;">
      <h3 style="font-size:1.2rem; font-weight:800; margin-bottom:6px; color:#fff;">🏃 Waiter Shift Check-In / Check-Out</h3>
      <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:16px;">Track active floor staff attendance and tables served during shifts.</p>

      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:16px;">
        ${state.waiters.map(waiter => `
          <div class="waiter-shift-card">
            <div>
              <div style="font-weight:800; font-size:1rem; color:#fff;">
                <span class="waiter-status-dot ${waiter.status === 'On Shift' ? 'on-shift' : 'off-shift'}"></span>
                ${waiter.name}
              </div>
              <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">
                Status: <strong style="color:${waiter.status === 'On Shift' ? '#10B981' : '#6B7280'};">${waiter.status}</strong>
                ${waiter.clockInTime ? ` • Since ${waiter.clockInTime}` : ''}
              </div>
              <div style="font-size:0.75rem; color:var(--primary); margin-top:2px;">
                Served: ${waiter.tablesServed} tables
              </div>
            </div>

            <button class="btn-add btn-toggle-waiter-shift" data-waiter-id="${waiter.id}" style="padding:8px 14px; font-size:0.85rem; background:${waiter.status === 'On Shift' ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'}; color:${waiter.status === 'On Shift' ? '#EF4444' : '#10B981'}; border:1px solid ${waiter.status === 'On Shift' ? '#EF4444' : '#10B981'};">
              ${waiter.status === 'On Shift' ? '🔴 Check-Out' : '🟢 Check-In'}
            </button>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Stock Control -->
    <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-md); padding:20px; margin-bottom:24px;">
      <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:16px;">🍔 Menu Management (Instant Stock Toggle)</h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:12px;">
        ${state.menu.map(item => `
          <div style="background:var(--surface); border:1px solid var(--border); padding:12px; border-radius:var(--radius-sm); display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-weight:700; font-size:0.9rem;">${item.name}</div>
              <div style="color:var(--primary); font-size:0.85rem;">${state.brandConfig.currency}${item.price}</div>
            </div>
            <button class="diet-btn btn-toggle-stock" data-item-id="${item.id}">
              ${item.isSoldOut ? '🔴 Mark Available' : '🟢 In Stock'}
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Modal for Table Reservation
function renderReservationModal() {
  const tbl = state.selectedTableForReservation || state.tables[0];

  return `
    <div class="modal-overlay">
      <div class="modal-card" style="padding:24px; max-width:420px;">
        <button class="modal-close" id="btn-close-reservation">✕</button>
        <h3 style="font-size:1.2rem; font-weight:800; margin-bottom:6px;">📅 Reserve Table - ${tbl.name}</h3>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:16px;">
          Capacity: 👥 ${tbl.capacity} Guests
        </p>

        <div class="form-group">
          <label class="form-label">Guest Name</label>
          <input type="text" class="form-input" id="res-guest-name" placeholder="e.g. Rahul M" />
        </div>

        <div class="form-group">
          <label class="form-label">Mobile Number</label>
          <input type="text" class="form-input" id="res-guest-phone" placeholder="e.g. 9876543210" />
        </div>

        <div class="form-group">
          <label class="form-label">Reservation Time Slot</label>
          <input type="text" class="form-input" id="res-time-slot" placeholder="e.g. Today @ 8:30 PM" />
        </div>

        <button class="btn-checkout" id="btn-confirm-reservation" data-tbl-id="${tbl.id}" style="margin-top:16px;">
          CONFIRM RESERVATION ➔
        </button>
      </div>
    </div>
  `;
}

// --- TABLE QR CODE GENERATOR & STANDEE BUILDER ---
function renderQRView() {
  const selectedTable = state.tables.find(t => t.id === state.qrConfig.selectedTableId) || state.tables[0];
  const targetUrl = window.location.origin + window.location.pathname + '?table=' + selectedTable.id + '&mode=customer';
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=${state.qrConfig.qrColor}&data=${encodeURIComponent(targetUrl)}`;

  return `
    <div style="margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <h2 style="font-size:1.5rem; font-weight:800;">🔲 Custom QR Standee Builder</h2>
        <p style="color:var(--text-muted); font-size:0.9rem;">Design & print customer-locked QR codes for each table.</p>
      </div>
    </div>

    <div class="qr-builder-container">
      <div class="qr-controls-card">
        <h3 style="font-size:1.1rem; font-weight:800; border-bottom:1px solid var(--border); padding-bottom:8px;">🎨 Customizer Controls</h3>

        <div class="form-group">
          <label class="form-label">Target Table</label>
          <select class="form-select" id="qr-table-select">
            ${state.tables.map(tbl => `
              <option value="${tbl.id}" ${tbl.id === state.qrConfig.selectedTableId ? 'selected' : ''}>
                ${tbl.name}
              </option>
            `).join('')}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Header Headline</label>
          <input type="text" class="form-input" id="qr-header-text" value="${state.qrConfig.headerText}" />
        </div>

        <div class="form-group">
          <label class="form-label">Sub-headline</label>
          <input type="text" class="form-input" id="qr-sub-text" value="${state.qrConfig.subText}" />
        </div>

        <div class="form-group">
          <label class="form-label">Center Emblem Logo</label>
          <select class="form-select" id="qr-logo-select">
            <option value="🍹" ${state.qrConfig.centerIcon === '🍹' ? 'selected' : ''}>🍹 Cocktail Glass</option>
            <option value="🍺" ${state.qrConfig.centerIcon === '🍺' ? 'selected' : ''}>🍺 Beer Mug</option>
            <option value="🍕" ${state.qrConfig.centerIcon === '🍕' ? 'selected' : ''}>🍕 Pizza Slice</option>
            <option value="🍔" ${state.qrConfig.centerIcon === '🍔' ? 'selected' : ''}>🍔 Burger</option>
            <option value="👑" ${state.qrConfig.centerIcon === '👑' ? 'selected' : ''}>👑 Crown VIP</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Accent Border Color</label>
          <div class="color-pickers">
            ${['#F59E0B', '#8B5CF6', '#10B981', '#EF4444', '#EC4899'].map(c => `
              <div class="color-option ${state.qrConfig.borderColor === c ? 'selected' : ''}" data-color="${c}" style="background:${c};"></div>
            `).join('')}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Wi-Fi Info Badge</label>
          <input type="text" class="form-input" id="qr-wifi-text" value="${state.qrConfig.wifiSSID}" placeholder="Guest Wi-Fi SSID" />
        </div>

        <button class="btn-checkout" onclick="window.print()" style="margin-top:10px;">
          🖨️ PRINT CUSTOMER QR STANDEE CARD
        </button>
      </div>

      <div class="qr-preview-area print-area">
        <div class="standee-card" style="border-color:${state.qrConfig.borderColor};">
          <div class="standee-header" style="color:${state.qrConfig.borderColor};">${state.qrConfig.headerText}</div>
          <div class="standee-sub">${state.qrConfig.subText}</div>

          <div class="standee-qr-frame">
            <img src="${qrImageUrl}" alt="Custom QR" />
            <div class="standee-logo-overlay">${state.qrConfig.centerIcon}</div>
          </div>

          <div>
            <span class="standee-table-badge" style="background:${state.qrConfig.borderColor};">
              📍 ${selectedTable.name.split('-')[0].toUpperCase()}
            </span>
          </div>

          <div class="standee-sub" style="margin-top:4px; font-weight:700; color:#fff;">
            ${state.brandConfig.name}
          </div>

          <div class="standee-footer">
            <div>📶 Free Wi-Fi: <strong>${state.qrConfig.wifiSSID}</strong></div>
            <div style="margin-top:4px;">No App Install Needed • Scan to Order Food</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// --- STAFF AUTHORIZATION MODAL ---
function renderStaffPinModal() {
  return `
    <div class="modal-overlay">
      <div class="modal-card" style="padding:24px; max-width:400px;">
        <button class="modal-close" id="btn-close-staff">✕</button>
        <h3 style="font-size:1.2rem; font-weight:800; margin-bottom:6px;">🔐 Staff Role Unlock</h3>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:16px;">
          Select staff portal and enter Manager PIN (Default: <code>1234</code>).
        </p>

        <div class="form-group" style="margin-bottom:12px;">
          <label class="form-label">Target Role Portal</label>
          <select class="form-select" id="staff-role-select">
            <option value="kitchen">👨‍🍳 Kitchen Display System (KDS)</option>
            <option value="waiter">🏃 Floor Waiter Dispatch</option>
            <option value="admin">📊 Manager Admin Command Center</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Manager PIN</label>
          <input type="password" class="form-input" id="staff-pin-input" placeholder="Enter PIN (1234)" style="font-size:1.2rem; text-align:center; letter-spacing:4px;" />
        </div>

        <button class="btn-checkout" id="btn-submit-staff-pin" style="margin-top:16px;">
          UNLOCK ROLE PORTAL ➔
        </button>
      </div>
    </div>
  `;
}

// --- TABLE SCANNER / SELECTOR MODAL ---
function renderScannerModal() {
  return `
    <div class="modal-overlay">
      <div class="modal-card" style="padding:24px;">
        <button class="modal-close" id="btn-close-scanner">✕</button>
        <h3 style="font-size:1.2rem; font-weight:800; margin-bottom:12px;">📱 Scan or Select Table</h3>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:16px;">
          Choose your current table to simulate scanning a table QR code.
        </p>

        <div style="display:flex; flex-direction:column; gap:10px;">
          ${state.tables.map(tbl => `
            <button class="view-btn btn-select-table" data-tbl-id="${tbl.id}" style="width:100%; justify-content:flex-start; padding:12px 16px; border:1px solid var(--border);">
              🪑 ${tbl.name}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// --- WAITER CALL MODAL ---
function renderWaiterModal() {
  return `
    <div class="modal-overlay">
      <div class="modal-card" style="padding:24px;">
        <button class="modal-close" id="btn-close-waiter">✕</button>
        <h3 style="font-size:1.2rem; font-weight:800; margin-bottom:6px;">🔔 Table Assistance</h3>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:16px;">
          Need help at <strong>${state.currentTable.name}</strong>? Tap below to send instant alert to floor staff.
        </p>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <button class="btn-add btn-send-request" data-type="Water" style="padding:16px; flex-direction:column; background:var(--surface); color:#fff; border:1px solid var(--border);">
            <span style="font-size:1.8rem;">💧</span>
            <span>Bring Water</span>
          </button>

          <button class="btn-add btn-send-request" data-type="Call Waiter" style="padding:16px; flex-direction:column; background:var(--surface); color:#fff; border:1px solid var(--border);">
            <span style="font-size:1.8rem;">🙋‍♂️</span>
            <span>Call Server</span>
          </button>

          <button class="btn-add btn-send-request" data-type="Request Bill" style="padding:16px; flex-direction:column; background:var(--surface); color:#fff; border:1px solid var(--border); grid-column:span 2;">
            <span style="font-size:1.8rem;">🧾</span>
            <span>Get Bill (UPI / Card / Cash)</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// --- EVENT HANDLERS ---
function attachEventListeners() {
  // Navigation Tabs
  document.querySelectorAll('.view-btn[data-view]').forEach(btn => {
    btn.onclick = () => {
      state.activeView = btn.dataset.view;
      renderApp();
    };
  });

  // Search Input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      state.searchQuery = e.target.value;
      renderApp();
    };
  }

  // Category Pills
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.onclick = () => {
      state.activeCategory = pill.dataset.cat;
      renderApp();
    };
  });

  // Dietary Filters
  document.querySelectorAll('.diet-btn[data-diet]').forEach(btn => {
    btn.onclick = () => {
      state.dietFilter = btn.dataset.diet;
      renderApp();
    };
  });

  // Mobile Floating Cart & Bottom Nav Listeners
  const btnFloatingCart = document.getElementById('btn-open-cart-floating');
  if (btnFloatingCart) btnFloatingCart.onclick = () => { state.isCartOpen = true; renderApp(); };

  const btnMobileNavCart = document.getElementById('btn-mobile-nav-cart');
  if (btnMobileNavCart) btnMobileNavCart.onclick = () => { state.isCartOpen = true; renderApp(); };

  const btnMobileNavWaiter = document.getElementById('btn-mobile-nav-waiter');
  if (btnMobileNavWaiter) btnMobileNavWaiter.onclick = () => { state.isWaiterModalOpen = true; renderApp(); };

  // Open Cart
  const btnCart = document.getElementById('btn-open-cart');
  if (btnCart) btnCart.onclick = () => { state.isCartOpen = true; renderApp(); };

  // Close Cart
  const btnCloseCart = document.getElementById('btn-close-cart');
  if (btnCloseCart) btnCloseCart.onclick = () => { state.isCartOpen = false; renderApp(); };

  // Open Scanner
  const btnScanner = document.getElementById('btn-open-scanner');
  if (btnScanner) btnScanner.onclick = () => { state.isScannerOpen = true; renderApp(); };

  // Close Scanner
  const btnCloseScanner = document.getElementById('btn-close-scanner');
  if (btnCloseScanner) btnCloseScanner.onclick = () => { state.isScannerOpen = false; renderApp(); };

  // Select Table
  document.querySelectorAll('.btn-select-table').forEach(btn => {
    btn.onclick = () => {
      const tblId = parseInt(btn.dataset.tblId);
      state.currentTable = state.tables.find(t => t.id === tblId) || state.tables[0];
      state.isScannerOpen = false;
      renderApp();
    };
  });

  // Open Waiter Modal
  const btnWaiter = document.getElementById('btn-open-waiter');
  if (btnWaiter) btnWaiter.onclick = () => { state.isWaiterModalOpen = true; renderApp(); };

  // Close Waiter Modal
  const btnCloseWaiter = document.getElementById('btn-close-waiter');
  if (btnCloseWaiter) btnCloseWaiter.onclick = () => { state.isWaiterModalOpen = false; renderApp(); };

  // Send Waiter Request
  document.querySelectorAll('.btn-send-request').forEach(btn => {
    btn.onclick = () => {
      const type = btn.dataset.type;
      const newReq = {
        id: Date.now(),
        tableId: state.currentTable.id,
        tableName: state.currentTable.name,
        requestType: type,
        status: 'Pending',
        timestamp: new Date().toISOString()
      };
      state.serviceRequests.push(newReq);
      state.isWaiterModalOpen = false;
      saveState();
      sendCloudEvent('SERVICE_REQUEST', newReq);
      alert(`Request for "${type}" sent to floor staff!`);
      renderApp();
    };
  });

  // Open Item Detail Modal
  document.querySelectorAll('.btn-open-item-modal').forEach(btn => {
    btn.onclick = () => {
      const item = state.menu.find(m => m.id === btn.dataset.id);
      if (item) {
        state.selectedItemForModal = item;
        renderApp();
      }
    };
  });

  // Close Item Modal
  const btnCloseModal = document.getElementById('btn-close-modal');
  if (btnCloseModal) btnCloseModal.onclick = () => { state.selectedItemForModal = null; renderApp(); };

  // Option pill toggles inside item modal
  document.querySelectorAll('.option-pill').forEach(pill => {
    pill.onclick = () => {
      const container = pill.parentElement;
      container.querySelectorAll('.option-pill').forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
    };
  });

  // Add to Cart Confirm
  const btnConfirmAdd = document.getElementById('btn-add-to-cart-confirm');
  if (btnConfirmAdd && state.selectedItemForModal) {
    btnConfirmAdd.onclick = () => {
      const selectedOpts = {};
      document.querySelectorAll('.option-pill.selected').forEach(p => {
        selectedOpts[p.dataset.optName] = p.dataset.choice;
      });

      const itemToAdd = {
        ...state.selectedItemForModal,
        cartId: `${state.selectedItemForModal.id}-${Date.now()}`,
        selectedOptions: selectedOpts,
        qty: 1
      };

      state.cart.push(itemToAdd);
      state.selectedItemForModal = null;
      saveState();
      renderApp();
    };
  }

  // Cart Qty Controls
  document.querySelectorAll('.btn-inc-qty').forEach(btn => {
    btn.onclick = () => {
      const item = state.cart.find(i => i.cartId === btn.dataset.cartId);
      if (item) { item.qty++; saveState(); renderApp(); }
    };
  });

  document.querySelectorAll('.btn-dec-qty').forEach(btn => {
    btn.onclick = () => {
      const idx = state.cart.findIndex(i => i.cartId === btn.dataset.cartId);
      if (idx !== -1) {
        if (state.cart[idx].qty > 1) {
          state.cart[idx].qty--;
        } else {
          state.cart.splice(idx, 1);
        }
        saveState();
        renderApp();
      }
    };
  });

  // Place Order
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
        subtotal,
        gst,
        total: grandTotal,
        status: 'Received',
        timestamp: new Date().toISOString()
      };

      state.orders.push(newOrder);

      // Update table occupancy status
      const currentTblObj = state.tables.find(t => t.id === state.currentTable.id);
      if (currentTblObj) { currentTblObj.status = 'Occupied'; }

      state.cart = [];
      state.isCartOpen = false;
      saveState();
      sendCloudEvent('NEW_ORDER', newOrder);
      alert(`🎉 Order #${newOrder.id} placed successfully for ${state.currentTable.name}! Kitchen has been notified.`);
      renderApp();
    };
  }

  // Update KDS Order Status
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

  // Resolve Service Request
  document.querySelectorAll('.btn-resolve-request').forEach(btn => {
    btn.onclick = () => {
      const reqId = parseInt(btn.dataset.reqId);
      const req = state.serviceRequests.find(r => r.id === reqId);
      if (req) {
        req.status = 'Resolved';
        saveState();
        sendCloudEvent('RESOLVE_REQUEST', { reqId });
        renderApp();
      }
    };
  });

  // Table Status Toggles
  document.querySelectorAll('.btn-change-tbl-status').forEach(btn => {
    btn.onclick = () => {
      const tblId = parseInt(btn.dataset.tblId);
      const newStatus = btn.dataset.status;
      const tbl = state.tables.find(t => t.id === tblId);
      if (tbl) {
        tbl.status = newStatus;
        if (newStatus === 'Available') {
          tbl.reservedFor = null;
          tbl.reservationTime = null;
        }
        saveState();
        renderApp();
      }
    };
  });

  // Open Table Reservation Modal
  document.querySelectorAll('.btn-open-reserve-modal').forEach(btn => {
    btn.onclick = () => {
      const tblId = parseInt(btn.dataset.tblId);
      state.selectedTableForReservation = state.tables.find(t => t.id === tblId) || state.tables[0];
      state.isReservationModalOpen = true;
      renderApp();
    };
  });

  // Close Reservation Modal
  const btnCloseRes = document.getElementById('btn-close-reservation');
  if (btnCloseRes) {
    btnCloseRes.onclick = () => {
      state.isReservationModalOpen = false;
      renderApp();
    };
  }

  // Confirm Reservation
  const btnConfirmRes = document.getElementById('btn-confirm-reservation');
  if (btnConfirmRes) {
    btnConfirmRes.onclick = () => {
      const tblId = parseInt(btnConfirmRes.dataset.tblId);
      const guestName = document.getElementById('res-guest-name')?.value || 'Guest';
      const guestPhone = document.getElementById('res-guest-phone')?.value || '';
      const timeSlot = document.getElementById('res-time-slot')?.value || '8:00 PM';

      const tbl = state.tables.find(t => t.id === tblId);
      if (tbl) {
        tbl.status = 'Reserved';
        tbl.reservedFor = `${guestName} (${guestPhone})`;
        tbl.reservationTime = timeSlot;
        state.isReservationModalOpen = false;
        saveState();
        alert(`🎉 ${tbl.name} successfully reserved for ${guestName} at ${timeSlot}!`);
        renderApp();
      }
    };
  }

  // Toggle Waiter Shift Attendance
  document.querySelectorAll('.btn-toggle-waiter-shift').forEach(btn => {
    btn.onclick = () => {
      const waiterId = parseInt(btn.dataset.waiterId);
      const waiter = state.waiters.find(w => w.id === waiterId);
      if (waiter) {
        if (waiter.status === 'On Shift') {
          waiter.status = 'Off Shift';
          waiter.clockInTime = null;
        } else {
          waiter.status = 'On Shift';
          waiter.clockInTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        saveState();
        renderApp();
      }
    };
  });

  // Mark Bill Paid & Reset Table Session
  document.querySelectorAll('.btn-mark-paid').forEach(btn => {
    btn.onclick = () => {
      const orderId = parseInt(btn.dataset.orderId);
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.status = 'Paid';
        const tbl = state.tables.find(t => t.id === order.tableId);
        if (tbl) {
          tbl.status = 'Available';
          tbl.reservedFor = null;
          tbl.reservationTime = null;
        }
        saveState();
        sendCloudEvent('UPDATE_ORDER_STATUS', { orderId, nextStatus: 'Paid' });
        alert(`💳 Order #${orderId} marked as PAID! ${order.tableName} session cleared and set to Available.`);
        renderApp();
      }
    };
  });

  // Start New Session (Customer View Reset)
  document.querySelectorAll('.btn-start-new-session, .btn-clear-active-order').forEach(btn => {
    btn.onclick = () => {
      if (btn.dataset.orderId) {
        const orderId = parseInt(btn.dataset.orderId);
        const order = state.orders.find(o => o.id === orderId);
        if (order) { order.status = 'Archived'; }
      }
      state.hasStartedNewSession = true;
      state.cart = [];
      saveState();
      renderApp();
    };
  });

  // Customer Meal Rating Submission
  document.querySelectorAll('.btn-rate-meal').forEach(btn => {
    btn.onclick = () => {
      const stars = parseInt(btn.dataset.stars);
      const comment = prompt(`⭐ Thank you for rating ${stars}/5 stars! Leave a quick feedback comment (optional):`) || 'Great food and quick service!';
      state.ratings.unshift({
        id: Date.now(),
        orderId: state.activeOrder ? state.activeOrder.id : 1000,
        tableName: state.currentTable.name.split('-')[0],
        rating: stars,
        comment: comment,
        customerName: 'Guest',
        timestamp: 'Just now'
      });
      saveState();
      alert(`⭐ Thank you for rating us ${stars}/5 stars! Your feedback helps us improve.`);
      renderApp();
    };
  });

  // Toggle Item Stock (86 control)
  document.querySelectorAll('.btn-toggle-stock').forEach(btn => {
    btn.onclick = () => {
      const itemId = btn.dataset.itemId;
      const item = state.menu.find(m => m.id === itemId);
      if (item) {
        item.isSoldOut = !item.isSoldOut;
        saveState();
        renderApp();
      }
    };
  });
  // Staff PIN Modal Listeners
  const btnOpenStaff = document.getElementById('btn-open-staff-modal');
  if (btnOpenStaff) {
    btnOpenStaff.onclick = () => {
      state.isStaffPinModalOpen = true;
      renderApp();
    };
  }

  const btnCloseStaff = document.getElementById('btn-close-staff');
  if (btnCloseStaff) {
    btnCloseStaff.onclick = () => {
      state.isStaffPinModalOpen = false;
      renderApp();
    };
  }

  const btnLockCustomer = document.getElementById('btn-lock-customer');
  if (btnLockCustomer) {
    btnLockCustomer.onclick = () => {
      state.mode = 'customer';
      state.activeView = 'menu';
      renderApp();
    };
  }

  const btnSubmitStaffPin = document.getElementById('btn-submit-staff-pin');
  if (btnSubmitStaffPin) {
    const handlePin = () => {
      const pinVal = document.getElementById('staff-pin-input')?.value;
      const roleVal = document.getElementById('staff-role-select')?.value || 'admin';
      if (pinVal === '1234') {
        state.mode = roleVal;
        state.activeView = roleVal === 'admin' ? 'admin' : (roleVal === 'waiter' ? 'waiter' : 'kds');
        state.isStaffPinModalOpen = false;
        renderApp();
      } else {
        alert('❌ Invalid Manager PIN! Default PIN is 1234');
      }
    };

    btnSubmitStaffPin.onclick = handlePin;
    const pinInput = document.getElementById('staff-pin-input');
    if (pinInput) {
      pinInput.onkeydown = (e) => { if (e.key === 'Enter') handlePin(); };
    }
  }

  // Custom QR Builder Listeners
  const qrTableSelect = document.getElementById('qr-table-select');
  if (qrTableSelect) {
    qrTableSelect.onchange = (e) => {
      state.qrConfig.selectedTableId = parseInt(e.target.value);
      renderApp();
    };
  }

  const qrHeaderText = document.getElementById('qr-header-text');
  if (qrHeaderText) {
    qrHeaderText.oninput = (e) => {
      state.qrConfig.headerText = e.target.value;
      renderApp();
    };
  }

  const qrSubText = document.getElementById('qr-sub-text');
  if (qrSubText) {
    qrSubText.oninput = (e) => {
      state.qrConfig.subText = e.target.value;
      renderApp();
    };
  }

  const qrLogoSelect = document.getElementById('qr-logo-select');
  if (qrLogoSelect) {
    qrLogoSelect.onchange = (e) => {
      state.qrConfig.centerIcon = e.target.value;
      renderApp();
    };
  }

  const qrWifiText = document.getElementById('qr-wifi-text');
  if (qrWifiText) {
    qrWifiText.oninput = (e) => {
      state.qrConfig.wifiSSID = e.target.value;
      renderApp();
    };
  }

  document.querySelectorAll('.color-option').forEach(opt => {
    opt.onclick = () => {
      state.qrConfig.borderColor = opt.dataset.color;
      renderApp();
    };
  });
}

// Initial Boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => renderApp());
} else {
  renderApp();
}
