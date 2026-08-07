// Manipal Restro-Bar Menu Data (Tailored for Manipal, Karnataka Nightlife & MAHE Student Dining)

export const initialMenu = [
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

export const initialCategories = [
  { id: 'all', label: 'All Items', icon: 'Utensils' },
  { id: 'coastal', label: 'Coastal Specials', icon: 'Flame' },
  { id: 'starters', label: 'Bar Bites & Snacks', icon: 'Beer' },
  { id: 'combos', label: 'Student Combos', icon: 'Zap' },
  { id: 'drinks', label: 'Cocktails & Beer', icon: 'Wine' }
];

export const initialTables = [
  { id: 1, name: 'Table 01 - Main Lounge', status: 'Available' },
  { id: 2, name: 'Table 02 - Rooftop Garden', status: 'Available' },
  { id: 3, name: 'Table 03 - Patio Booth', status: 'Available' },
  { id: 4, name: 'Table 04 - VIP Section', status: 'Available' },
  { id: 5, name: 'Table 05 - Bar Counter 1', status: 'Available' },
  { id: 6, name: 'Table 06 - Bar Counter 2', status: 'Available' }
];
