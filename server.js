import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8089;

app.use(cors());
app.use(express.json());

// Serve static images directly from public/images
const imagesDir = path.join(__dirname, 'public', 'images');
app.use('/images', express.static(imagesDir));

// Luxury Catalog Database
const products = [
  {
    id: 'wild-edge',
    name: 'Wild Edge',
    subtitle: 'Eau De Parfum — Intense Extrait',
    category: 'Fresh & Woody',
    family: 'Woody',
    gender: 'Unisex / Masculine Leaning',
    badge: 'BESTSELLER',
    rating: 4.9,
    reviewCount: 184,
    inStock: true,
    image: '/images/wild-edge.jpg',
    prices: {
      '50ml': 1799,
      '100ml': 2499
    },
    originalPrices: {
      '50ml': 2299,
      '100ml': 3299
    },
    concentration: '25% Pure Extrait Oil',
    longevity: '14+ Hours Longevity',
    sillage: 'Strong & Commanding Sillage',
    description: 'A daring symphony of crisp Italian bergamot, frosted juniper berries, and wild cedarwood grounded by earthy Haitian vetiver. Crafted for the ambitious connoisseur who commands every room.',
    notes: {
      top: ['Calabrian Bergamot', 'Pink Peppercorn', 'Frosted Lemon Peel'],
      heart: ['Wild Juniper Berry', 'French Lavender', 'Nutmeg Essence'],
      base: ['Virginian Cedarwood', 'Haitian Vetiver', 'Warm Ambergris']
    },
    highlights: [
      'Handcrafted with certified French fragrance oils',
      'Long-lasting formulation with slow-release fixatives',
      'Signature heavy glass flacon with magnetic gold cap'
    ]
  },
  {
    id: 'elan',
    name: 'Élan',
    subtitle: 'Extrait De Parfum — Golden Reserve',
    category: 'Floral & Woody',
    family: 'Floral',
    gender: 'Unisex',
    badge: 'SIGNATURE BLEND',
    rating: 4.9,
    reviewCount: 212,
    inStock: true,
    image: '/images/elan.jpg',
    prices: {
      '50ml': 1999,
      '100ml': 2799
    },
    originalPrices: {
      '50ml': 2599,
      '100ml': 3599
    },
    concentration: '28% Pure Extrait Oil',
    longevity: '16+ Hours Longevity',
    sillage: 'Enchanting & Sophisticated Trail',
    description: 'The pinnacle of refined elegance. Sparkling Italian mandarin meets nocturnal jasmine sambac and creamy Madagascar bourbon vanilla, wrapped in opulent Mysore sandalwood.',
    notes: {
      top: ['Italian Mandarin', 'Golden Peach', 'White Freesia'],
      heart: ['Jasmine Sambac', 'Damask Rose Petals', 'Orange Blossom'],
      base: ['Madagascar Bourbon Vanilla', 'Creamy Sandalwood', 'White Amber']
    },
    highlights: [
      'Features nocturnal night-blooming jasmine extracts',
      'Ultra-smooth gourmand dry-down that lingers for days',
      'Ideal for evening galas, celebrations, and intimate moments'
    ]
  },
  {
    id: 'ruby-mist',
    name: 'Ruby Mist',
    subtitle: 'Eau De Parfum — Crystal Rose Edition',
    category: 'Floral & Fruity',
    family: 'Floral',
    gender: 'Feminine Leaning',
    badge: 'LIMITED EDITION',
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    image: '/images/ruby-mist.jpg',
    prices: {
      '50ml': 1899,
      '100ml': 2599
    },
    originalPrices: {
      '50ml': 2399,
      '100ml': 3499
    },
    concentration: '24% Pure Extrait Oil',
    longevity: '12+ Hours Longevity',
    sillage: 'Graceful & Radiant Sillage',
    description: 'An intoxicating celebration of romance and radiance. Velvety Turkish Damask roses and sparkling lychee intertwined with pink pepper and enveloped in sensual cashmere musk.',
    notes: {
      top: ['Sparkling Lychee', 'Crisp Red Berries', 'Pink Peppercorn'],
      heart: ['Turkish Damask Rose', 'Peony Blossom', 'Dewy Magnolia'],
      base: ['Cashmere Wood', 'Crystal Amber', 'Soft White Musk']
    },
    highlights: [
      'Distilled from morning-harvested Damask rose petals',
      'Luminous floral bouquet with sparkling effervescence',
      'Housed in an exquisite crystalline flacon with rose gold accents'
    ]
  },
  {
    id: 'oud-royale',
    name: 'Oud Royale',
    subtitle: 'Imperial Extrait — Royal Arabic Reserve',
    category: 'Intense Woody & Amber',
    family: 'Amber & Oud',
    gender: 'Unisex / Opulent',
    badge: 'CONNOISSEUR PICK',
    rating: 5.0,
    reviewCount: 268,
    inStock: true,
    image: '/images/oud-royale.jpg',
    prices: {
      '50ml': 2299,
      '100ml': 3199
    },
    originalPrices: {
      '50ml': 2999,
      '100ml': 4199
    },
    concentration: '30% Master Extrait Oil',
    longevity: '18+ Hours Longevity',
    sillage: 'Regal & Hypnotic Presence',
    description: 'An ode to Middle Eastern royalty. Rare aged Cambodian agarwood distilled with smoked golden amber, Kashmiri saffron, and rich worn leather. An extraordinary sensory jewel.',
    notes: {
      top: ['Kashmiri Saffron', 'Green Cardamom', 'Smoked Bergamot'],
      heart: ['Smoked Golden Amber', 'Rose Taif', 'Incense Smoke'],
      base: ['Aged Cambodian Oud', 'Birch Tar Leather', 'Rich Benzoin']
    },
    highlights: [
      'Aged 12-year Cambodian wild oud distillation',
      'Unsurpassed performance with hypnotic golden amber sillage',
      'Embossed with genuine 24K gold foil calligraphy emblem'
    ]
  },
  {
    id: 'discovery-vault',
    name: 'The Imperial Discovery Vault',
    subtitle: '4 x 10ml Extrait Coffret + Luxury Travel Case',
    category: 'Discovery Sets & Gifting',
    family: 'Discovery Sets',
    gender: 'All Fragrances Included',
    badge: 'LUXURY GIFTING',
    rating: 4.9,
    reviewCount: 340,
    inStock: true,
    image: '/images/hero-banner.jpg',
    prices: {
      'Coffret': 1499
    },
    originalPrices: {
      'Coffret': 2199
    },
    concentration: 'Full 25-30% Extrait Concentration',
    longevity: 'All 4 Signature Scents Included',
    sillage: 'Complete Wardrobe of Scent Profiles',
    description: 'Experience the complete olfactory universe of Raasven. Contains 10ml atomizers of Wild Edge, Élan, Ruby Mist, and Oud Royale in a gold-stamped emerald coffret with a complimentary ₹500 voucher on full bottles.',
    notes: {
      top: ['Wild Edge (Fresh/Woody)', 'Élan (Floral/Vanilla)'],
      heart: ['Ruby Mist (Rose/Fruity)', 'Oud Royale (Aged Oud/Amber)'],
      base: ['Includes Velvet Pouch', 'Complimentary ₹500 Gift Voucher']
    },
    highlights: [
      'All 4 signature perfumes in heavy-glass travel atomizers',
      'Includes ₹500 redeemable gift card for your favorite full-sized bottle',
      'Presented in our signature emerald & gold ribbon gift box'
    ]
  }
];

// In-Memory Orders and Inquiries Store
const orders = [];
const inquiries = [];
const newsletterSubscribers = new Set(['vip@raasven.com']);

// Coupons Dictionary
const coupons = {
  'RAASVEN10': { discountPercent: 10, minSpend: 0, description: '10% Off Entire Order' },
  'ROYAL20': { discountPercent: 20, minSpend: 3000, description: '20% Off Orders Above ₹3,000' },
  'GOLD500': { discountFlat: 500, minSpend: 2500, description: 'Flat ₹500 Off Orders Above ₹2,500' },
  'FREESHIP': { freeShipping: true, minSpend: 0, description: 'Complimentary Express Worldwide Shipping' }
};

// Dynamic Site Settings
let siteSettings = {
  announcementText: 'Complimentary 10ml Discovery Sample on orders over ₹1,999 • Code: RAASVEN10',
  supportPhone: '+91 98765 43210',
  supportEmail: 'export@kalpanaglobaleximm.com',
  heroTitle: 'The Signature of Your Presence.',
  heroSubtitle: 'Artisanal fragrances crafted with 25% French perfume oils and aged Oriental notes. Designed to linger for over 14 hours with unforgettable sillage.'
};

// API Routes
app.get('/api/products', (req, res) => {
  const { family, sort, search } = req.query;
  let result = [...products];

  if (family && family !== 'All') {
    result = result.filter(p => p.family.toLowerCase().includes(family.toLowerCase()) || p.category.toLowerCase().includes(family.toLowerCase()));
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q)
    );
  }

  if (sort === 'price-low') {
    result.sort((a, b) => Object.values(a.prices)[0] - Object.values(b.prices)[0]);
  } else if (sort === 'price-high') {
    result.sort((a, b) => Object.values(b.prices)[0] - Object.values(a.prices)[0]);
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  }

  res.json({ success: true, count: result.length, products: result });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, product });
});

// Validate Coupon
app.post('/api/cart/validate-coupon', (req, res) => {
  const { code, subtotal } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: 'Coupon code required' });
  }

  const cleanCode = code.trim().toUpperCase();
  const coupon = coupons[cleanCode];

  if (!coupon) {
    return res.status(404).json({ success: false, message: 'Invalid or expired coupon code' });
  }

  if (coupon.minSpend && subtotal < coupon.minSpend) {
    return res.status(400).json({
      success: false,
      message: `Coupon requires minimum order value of ₹${coupon.minSpend.toLocaleString()}`
    });
  }

  let discountAmount = 0;
  if (coupon.discountPercent) {
    discountAmount = Math.round((subtotal * coupon.discountPercent) / 100);
  } else if (coupon.discountFlat) {
    discountAmount = Math.min(coupon.discountFlat, subtotal);
  }

  res.json({
    success: true,
    code: cleanCode,
    description: coupon.description,
    discountAmount,
    freeShipping: !!coupon.freeShipping
  });
});

// Create Order (E-Commerce Checkout)
app.post('/api/orders', (req, res) => {
  const { customer, items, paymentMethod, couponCode, notes } = req.body;

  if (!customer || !customer.fullName || !customer.phone || !customer.address) {
    return res.status(400).json({ success: false, message: 'Incomplete shipping details' });
  }

  if (!items || !items.length) {
    return res.status(400).json({ success: false, message: 'Order contains no items' });
  }

  // Calculate Subtotal
  let subtotal = 0;
  items.forEach(item => {
    subtotal += (item.price * item.quantity);
  });

  // Calculate Discount
  let discount = 0;
  if (couponCode && coupons[couponCode.toUpperCase()]) {
    const c = coupons[couponCode.toUpperCase()];
    if (!c.minSpend || subtotal >= c.minSpend) {
      if (c.discountPercent) discount = Math.round((subtotal * c.discountPercent) / 100);
      else if (c.discountFlat) discount = Math.min(c.discountFlat, subtotal);
    }
  }

  // Free shipping threshold ₹1999
  const shippingFee = (subtotal >= 1999 || (couponCode && coupons[couponCode.toUpperCase()]?.freeShipping)) ? 0 : 150;
  const total = subtotal - discount + shippingFee;

  const orderId = `RSV-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

  const newOrder = {
    orderId,
    createdAt: new Date().toISOString(),
    customer,
    items,
    pricing: {
      subtotal,
      discount,
      shippingFee,
      total
    },
    paymentMethod: paymentMethod || 'Cash on Delivery (COD)',
    status: 'Confirmed & In Preparation',
    trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
    estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    notes
  };

  orders.push(newOrder);

  res.status(201).json({
    success: true,
    message: 'Order placed successfully',
    order: newOrder
  });
});

// Order Lookup
app.get('/api/orders/:orderId', (req, res) => {
  const order = orders.find(o => o.orderId === req.params.orderId);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order ID not found' });
  }
  res.json({ success: true, order });
});

// B2B Inquiry (Private Label & Export)
app.post('/api/inquiry', (req, res) => {
  const { name, company, email, phone, country, interest, estimatedUnits, message } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and phone' });
  }

  const inquiryRecord = {
    id: `INQ-${Date.now().toString().slice(-5)}`,
    createdAt: new Date().toISOString(),
    name,
    company: company || 'Individual Trader',
    email,
    phone,
    country: country || 'Not Specified',
    interest: interest || 'Private Label / Custom Perfumery',
    estimatedUnits: estimatedUnits || '500 - 2,000 units',
    message
  };

  inquiries.push(inquiryRecord);

  res.status(201).json({
    success: true,
    message: 'Your inquiry has been received. Our export division will reach out within 24 hours.',
    inquiry: inquiryRecord
  });
});

// Newsletter Subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
  }

  newsletterSubscribers.add(email.toLowerCase());
  res.json({
    success: true,
    message: 'Welcome to the Raasven Connoisseurs Circle. Use promo code RAASVEN10 for 10% off your first order!',
    welcomeCoupon: 'RAASVEN10'
  });
});

// Admin Settings
app.get('/api/admin/settings', (req, res) => {
  res.json({ success: true, settings: siteSettings });
});

app.put('/api/admin/settings', (req, res) => {
  siteSettings = { ...siteSettings, ...req.body };
  res.json({ success: true, message: 'Settings updated successfully', settings: siteSettings });
});

// Admin Orders
app.get('/api/admin/orders', (req, res) => {
  res.json({ success: true, count: orders.length, orders });
});

app.patch('/api/admin/orders/:id', (req, res) => {
  const order = orders.find(o => o.orderId === req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  if (req.body.status) order.status = req.body.status;
  res.json({ success: true, order });
});

// Admin Inquiries
app.get('/api/admin/inquiries', (req, res) => {
  res.json({ success: true, count: inquiries.length, inquiries });
});

// Admin Coupons
app.get('/api/admin/coupons', (req, res) => {
  res.json({ success: true, coupons });
});

app.post('/api/admin/coupons', (req, res) => {
  const { code, discountPercent, discountFlat, minSpend, description } = req.body;
  if (!code) return res.status(400).json({ success: false, message: 'Coupon code required' });
  const cleanCode = code.trim().toUpperCase();
  coupons[cleanCode] = {
    discountPercent: Number(discountPercent) || 0,
    discountFlat: Number(discountFlat) || 0,
    minSpend: Number(minSpend) || 0,
    description: description || `${discountPercent || discountFlat}% off discount`
  };
  res.json({ success: true, message: `Coupon ${cleanCode} created`, coupons });
});

app.delete('/api/admin/coupons/:code', (req, res) => {
  const code = req.params.code.trim().toUpperCase();
  delete coupons[code];
  res.json({ success: true, message: `Coupon ${code} removed`, coupons });
});

// Admin Products CRUD
app.post('/api/admin/products', (req, res) => {
  const newProduct = {
    ...req.body,
    id: req.body.id || req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(100 + Math.random() * 900)
  };
  products.unshift(newProduct);
  res.status(201).json({ success: true, message: 'Product created', product: newProduct, products });
});

app.put('/api/admin/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Product not found' });
  products[idx] = { ...products[idx], ...req.body };
  res.json({ success: true, message: 'Product updated', product: products[idx], products });
});

app.delete('/api/admin/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Product not found' });
  const deleted = products.splice(idx, 1)[0];
  res.json({ success: true, message: 'Product deleted', deleted, products });
});

// Currency Conversion Rates
app.get('/api/currencies', (req, res) => {
  res.json({
    base: 'INR',
    rates: {
      INR: { symbol: '₹', rate: 1, name: 'Indian Rupee' },
      USD: { symbol: '$', rate: 0.012, name: 'US Dollar' },
      AED: { symbol: 'AED ', rate: 0.044, name: 'UAE Dirham' },
      EUR: { symbol: '€', rate: 0.011, name: 'Euro' },
      GBP: { symbol: '£', rate: 0.0095, name: 'British Pound' }
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime(), time: new Date().toISOString() });
});

// Serve frontend build in production
const distDir = fs.existsSync(path.join(__dirname, 'client', 'dist'))
  ? path.join(__dirname, 'client', 'dist')
  : (fs.existsSync(path.join(__dirname, 'dist')) ? path.join(__dirname, 'dist') : null);

if (distDir) {
  app.use(express.static(distDir));
  app.get('/admin', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
  app.use((req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('RAASVEN Node.js API is running. Client build in progress...');
  });
}

if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`⚜️ RAASVEN Luxury Perfumes Server active on http://0.0.0.0:${PORT}`);
  });
}

export default app;
